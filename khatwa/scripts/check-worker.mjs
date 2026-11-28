// Read-only audit against `wrangler dev --local --port 4173` after a preview build.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import pages from '../src/content/pages.json' with { type: 'json' };
const local = 'http://127.0.0.1:4173';
const resources = new Set(['/legacy/normalize-url.js', '/legacy/emailjs-config.js', '/legacy/redirect.js']);
let checked = 0;
for (const file of Object.keys(pages)) for (const prefix of ['', 'ar/', 'en/']) {
  const pathname = '/' + prefix + file;
  const response = await fetch(local + pathname, { redirect: 'manual' });
  assert.equal(response.status, 200, pathname);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow', pathname);
  const html = await response.text();
  assert.equal(html, fs.readFileSync(new URL('../dist' + pathname, import.meta.url), 'utf8'));
  const d = new JSDOM(html).window.document;
  for (const element of d.querySelectorAll('script[src], link[rel="stylesheet"], link[rel="modulepreload"], img[src]')) {
    const url = new URL(element.getAttribute('src') || element.getAttribute('href'), local + pathname);
    if (url.origin === local) resources.add(url.pathname);
  }
  checked++;
}
for (const pathname of ['/', '/ar/', '/en/']) {
  const response = await fetch(local + pathname + '?service=brand', { redirect: 'manual' });
  assert.equal(response.status, 200, pathname);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  checked++;
}
for (const resource of resources) {
  const response = await fetch(local + resource);
  assert.equal(response.status, 200, resource);
  const expected = resource.endsWith('.css') ? 'text/css' : resource.endsWith('.js') ? 'application/javascript' : 'image/';
  const actual = response.headers.get('content-type');
  assert.ok(actual.startsWith(expected) || (resource.endsWith('.js') && actual.startsWith('text/javascript')), resource + ': ' + actual);
  checked++;
}
for (const pathname of ['/missing.html', '/assets/missing.css', '/missing.js', '/images/missing.png']) {
  assert.equal((await fetch(local + pathname)).status, 404, pathname);
  checked++;
}
assert.equal((await fetch(local + '/robots.txt')).status, 200);
assert.equal((await fetch(local + '/robots.txt')).headers.get('x-robots-tag'), 'noindex, nofollow');
console.log(`Workers local audit passed: ${checked} HTTP checks; 63 exact HTML entries, 3 directory rewrites, ${resources.size} assets with correct MIME types, 4 missing paths return 404; preview X-Robots-Tag verified.`);
