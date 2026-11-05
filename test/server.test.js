import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

test('landing page and all local assets are served successfully', async () => {
  const server = spawn(process.execPath, ['server.js'], { env: { ...process.env, PORT: '3188' }, stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    await Promise.race([once(server.stdout, 'data'), once(server, 'exit').then(() => { throw new Error('Server exited before startup'); }), new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('Startup timeout')), 5000); timer.unref(); })]);
    const page = await fetch('http://127.0.0.1:3188/');
    assert.equal(page.status, 200);
    assert.match(page.headers.get('content-type'), /text\/html/);
    const html = await page.text();
    assert.match(html, /Your clients first/);
    const assets = [...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(match => match[1]);
    assert.ok(assets.length >= 4);
    for (const asset of assets) {
      const response = await fetch(`http://127.0.0.1:3188${asset}`);
      assert.equal(response.status, 200, asset);
      assert.ok((await response.arrayBuffer()).byteLength > 0, asset);
    }
    assert.equal((await fetch('http://127.0.0.1:3188/missing-page')).status, 404);
    assert.equal((await fetch('http://127.0.0.1:3188/%2e%2e%2fpackage.json')).status, 403);
  } finally { server.kill(); await once(server, 'exit'); }
});
