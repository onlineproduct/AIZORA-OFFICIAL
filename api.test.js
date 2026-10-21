import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './src/index.js';

const env = { ASSETS: { fetch: async () => new Response('asset') } };

test('health endpoint reports API is alive without D1', async () => {
  const res = await worker.fetch(new Request('https://example.test/api/health'), env);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, database: false });
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
