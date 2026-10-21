import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './src/index.js';

const env = { ASSETS: { fetch: async () => new Response('asset') } };

test('health endpoint reports API and configuration state', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/health'), env);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, database: false, adminConfigured: false });
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
