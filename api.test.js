import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './src/index.js';

const env = { ASSETS: { fetch: async () => new Response('asset') } };

test('health endpoint reports API and configuration state', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/health'), env);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, database: false, adminConfigured: false, mediaConfigured: false });
});

test('products endpoint returns demo products without D1', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/products'), env);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.mode, 'demo');
  assert.equal(body.products.length, 4);
});

test('products endpoint rejects invalid type', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/products?type=unknown'), env);
  assert.equal(res.status, 400);
});

test('checkout safely refuses when D1 is not configured', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/orders', {
    method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({items:[{product_id:1,quantity:1}]})
  }), env);
  assert.equal(res.status, 503);
});

test('admin routes require a configured token', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/admin/orders'), env);
  assert.equal(res.status, 401);
});

test('admin reports require a token', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/admin/reports'), env);
  assert.equal(res.status, 401);
});

test('admin reports safely refuse when D1 is not configured', async () => {
  const securedEnv = { ...env, ADMIN_TOKEN: 'test-token' };
  const res = await worker.fetch(new Request('https://example.test/api/admin/reports', {
    headers: { authorization: 'Bearer test-token' }
  }), securedEnv);
  assert.equal(res.status, 503);
});

test('admin image upload requires authorization before storage access', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/admin/uploads', { method: 'POST' }), env);
  assert.equal(res.status, 401);
  assert.deepEqual(await res.json(), { error: 'Unauthorized' });
});

test('digital download refuses safely when D1 is not configured', async () => {
  const token = 'a'.repeat(64);
  const res = await worker.fetch(new Request('https://example.test/api/digital/download/' + token), env);
  assert.equal(res.status, 503);
  assert.deepEqual(await res.json(), { error: 'Digital download storage unavailable' });
});

test('digital download rejects malformed tokens before database access', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/digital/download/not-a-token'), env);
  assert.equal(res.status, 400);
});

test('digital asset administration requires authorization', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/admin/digital-assets'), env);
  assert.equal(res.status, 401);
  assert.deepEqual(await res.json(), { error: 'Unauthorized' });
});

test('digital asset administration refuses safely without D1', async () => {
  const securedEnv = { ...env, ADMIN_TOKEN: 'test-token' };
  const res = await worker.fetch(new Request('https://example.test/api/admin/digital-assets', {
    headers: { authorization: 'Bearer test-token' }
  }), securedEnv);
  assert.equal(res.status, 503);
  assert.deepEqual(await res.json(), { error: 'D1 not configured' });
});

test('customer account routes fail closed without D1', async () => {
  const paths = ['/api/account/register', '/api/account/login', '/api/account/me', '/api/account/orders'];
  for (const path of paths) {
    const res = await worker.fetch(new Request('https://example.test' + path, {
      method: path.endsWith('/register') || path.endsWith('/login') ? 'POST' : 'GET',
      headers: {'content-type':'application/json'},
      body: path.endsWith('/register') || path.endsWith('/login') ? JSON.stringify({name:'Test User',email:'test@example.com',password:'long-test-password'}) : undefined
    }), env);
    assert.equal(res.status, 503, path);
  }
});

test('registration cannot claim an existing checkout email without ownership verification', async () => {
  const existingCustomerDb = {
    prepare: (sql) => ({
      bind: (...args) => ({
        first: async () => sql === 'SELECT id,password_hash FROM customers WHERE email=?'
          ? { id: 7, password_hash: null }
          : null
      })
    })
  };
  const securedEnv = { ...env, DB: existingCustomerDb };
  const res = await worker.fetch(new Request('https://example.test/api/account/register', {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify({name:'Test User',email:'buyer@example.com',password:'long-test-password'})
  }), securedEnv);
  assert.equal(res.status, 409);
  assert.match((await res.json()).error, /মালিকানা যাচাই/);
});

test('customer logout clears the browser session cookie even if D1 is missing', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/account/logout', {
    method: 'POST'
  }), env);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('set-cookie') || '', /Max-Age=0/);
});


test('order tracking requires the email used at checkout', async () => {
  const db = {
    prepare: (sql) => ({
      bind: (...args) => ({
        first: async () => sql.includes('FROM orders WHERE id=?')
          ? { id: args[0], status: 'Pending', total: 450, currency: 'BDT', payment_status: 'pending', created_at: '2026-10-22', customer_email: 'buyer@example.com' }
          : null,
        all: async () => ({ results: [] })
      })
    })
  };
  const securedEnv = { ...env, DB: db };
  const missing = await worker.fetch(new Request('https://example.test/api/orders/AZ-ABC123'), securedEnv);
  assert.equal(missing.status, 400);
  const wrong = await worker.fetch(new Request('https://example.test/api/orders/AZ-ABC123?email=other@example.com'), securedEnv);
  assert.equal(wrong.status, 404);
  const correct = await worker.fetch(new Request('https://example.test/api/orders/AZ-ABC123?email=BUYER@example.com'), securedEnv);
  assert.equal(correct.status, 200);
  const body = await correct.json();
  assert.equal(body.order.id, 'AZ-ABC123');
  assert.equal(Object.hasOwn(body.order, 'customer_email'), false);
});
