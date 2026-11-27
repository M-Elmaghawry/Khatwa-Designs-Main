import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';
import { DEPLOY } from '../src/lib/deploy-target.js';
import { SITE_BASE } from '../src/lib/paths.js';
import { metadataFor, applyMetadata } from '../src/lib/metadata.js';
import { createStaticServer, output } from '../scripts/serve.mjs';
import { render } from '../.ssr/entry-server.js';
import pages from '../src/content/pages.json' with { type: 'json' };

const read = name => fs.readFileSync(path.join(output, name), 'utf8');
const origin = 'https://example.test';
const resources = new Set();

test(`${DEPLOY.target}: all 63 prerendered entries, SSR router, links and assets match the selected base`, () => {
  for (const [file, page] of Object.entries(pages)) for (const prefix of ['', 'ar/', 'en/']) {
    const document = new JSDOM(read(prefix + file)).window.document;
    const current = new URL(SITE_BASE + prefix + file, origin);
    assert.equal(document.documentElement.lang, prefix === 'en/' ? 'en' : 'ar');
    if (!page.redirect) {
      assert.ok(document.querySelector('main h1'));
      assert.ok(render(current.pathname, prefix === 'en/' ? 'en' : 'ar').includes('<main'));
      const metadata = metadataFor(file, prefix === 'en/' ? 'en' : 'ar');
      assert.equal(document.querySelector('link[rel="canonical"]').href, metadata.canonical);
      assert.equal(document.querySelector('meta[name="robots"]').content, metadata.robots);
      assert.equal(document.querySelector('meta[property="og:url"]').content, metadata.canonical);
    }
    for (const element of document.querySelectorAll('[href],[src],[srcset]')) {
      const values = [element.getAttribute('href'), element.getAttribute('src'), ...(element.getAttribute('srcset')?.split(',').map(part => part.trim().split(/\s+/)[0]) || [])].filter(Boolean);
      for (const raw of values) {
        const url = new URL(raw, current);
        if (url.origin !== origin || raw.startsWith('#')) continue;
        assert.ok(url.pathname.startsWith(SITE_BASE), raw);
        const relative = decodeURIComponent(url.pathname.slice(SITE_BASE.length)) + (url.pathname.endsWith('/') ? 'index.html' : '');
        assert.ok(fs.existsSync(path.join(output, relative)), `${prefix + file}: ${raw}`);
        if (element.matches('script, img, link[rel="stylesheet"], link[rel="modulepreload"]')) resources.add(url.pathname);
      }
    }
  }
  for (const file of fs.readdirSync(path.join(output, 'assets'))) {
    resources.add(SITE_BASE + 'assets/' + file);
    if (!file.endsWith('.css')) continue;
    for (const [, raw] of read('assets/' + file).matchAll(/url\(([^)]+)\)/g)) {
      const value = raw.replace(/^["']|["']$/g, '');
      if (/^(https?:|data:|#)/.test(value)) continue;
      const url = new URL(value, origin + SITE_BASE + 'assets/' + file);
      assert.ok(fs.existsSync(path.join(output, decodeURIComponent(url.pathname.slice(SITE_BASE.length)))), value);
      resources.add(url.pathname);
    }
  }
  const css = fs.readdirSync(path.join(output, 'assets')).filter(file => file.endsWith('.css')).map(file => read('assets/' + file)).join('');
  assert.match(css, /https:\/\/fonts.googleapis.com/); // Existing external font provider stays unchanged.
});

test(`${DEPLOY.target}: CSS, JS, images and legacy assets return HTTP 200 with correct MIME types`, async t => {
  const server = createStaticServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const local = 'http://127.0.0.1:' + server.address().port;
  for (const resource of resources) {
    const response = await fetch(local + resource);
    assert.equal(response.status, 200, resource);
    const expected = resource.endsWith('.css') ? 'text/css' : resource.endsWith('.js') ? 'text/javascript' : /\.(png|webp|jpg|svg)$/.test(resource) ? 'image/' : null;
    if (expected) assert.ok(response.headers.get('content-type').startsWith(expected), resource);
  }
  for (const prefix of ['', 'ar/', 'en/']) assert.equal((await fetch(local + SITE_BASE + prefix)).status, 200);
  assert.equal((await fetch(local + SITE_BASE + 'assets/missing.css')).status, 404);
  assert.equal((await fetch(local + SITE_BASE + 'missing.html')).status, 404);
});

test(`${DEPLOY.target}: copied URL normalizer and redirect scripts preserve languages, queries and hashes`, () => {
  for (const prefix of ['', 'ar/', 'en/']) for (const file of ['', ...Object.keys(pages)]) for (const language of ['ar', 'en']) {
    let url = origin + SITE_BASE + prefix + file + '?lang=' + language + '&service=brand&retry=1#details';
    const visited = new Set();
    for (let hop = 0; hop < 5; hop++) {
      assert.ok(!visited.has(url), 'redirect loop: ' + url); visited.add(url);
      const current = new URL(url);
      const key = current.pathname.slice(SITE_BASE.length).replace(/^(?:ar|en)\//, '') || 'index.html';
      const redirect = pages[key]?.redirect;
      let destination;
      vm.runInNewContext(read('legacy/' + (redirect ? 'redirect.js' : 'normalize-url.js')), { URL,
        document: { getElementById: () => ({ getAttribute: () => redirect }) },
        window: { location: { href: url, search: current.search, hash: current.hash, replace(value) { destination = value; } } } });
      if (!destination) break;
      url = destination;
      assert.ok(hop < 3);
    }
    const target = pages[file]?.redirect || file || 'index.html';
    assert.equal(url, origin + SITE_BASE + (language === 'en' ? 'en/' : '') + (target === 'index.html' ? '' : target) + '?service=brand&retry=1#details');
  }
});

test(`${DEPLOY.target}: preview SEO stays excluded after prerender and runtime updates; GitHub retains its sitemap`, () => {
  if (!DEPLOY.preview) {
    assert.equal((read('sitemap.xml').match(/<loc>/g) || []).length, 25);
    assert.equal(fs.existsSync(path.join(output, '_headers')), false);
    return;
  }
  assert.equal((read('sitemap.xml').match(/<loc>/g) || []).length, 0);
  assert.equal(read('robots.txt'), 'User-agent: *\nDisallow: /\n');
  assert.match(read('_headers'), /X-Robots-Tag: noindex, nofollow/);
  const dom = new JSDOM('<html><head></head><body></body></html>');
  const previous = globalThis.document;
  globalThis.document = dom.window.document;
  try {
    for (const [file, page] of Object.entries(pages)) for (const prefix of ['', 'ar/', 'en/']) {
      const d = new JSDOM(read(prefix + file)).window.document;
      assert.match(d.querySelector('meta[name="robots"]').content, /noindex/);
      assert.equal(d.querySelectorAll('link[hreflang], script[type="application/ld+json"]').length, 0);
      if (page.redirect) continue;
      applyMetadata(metadataFor(file, prefix === 'en/' ? 'en' : 'ar'));
      assert.equal(document.querySelector('meta[name="robots"]').content, 'noindex,nofollow');
      assert.equal(document.querySelectorAll('link[hreflang], script[type="application/ld+json"]').length, 0);
      assert.ok(document.querySelector('link[rel="canonical"]').href.startsWith('https://m-elmaghawry.github.io/Khatwa-Designs-Main/'));
      assert.equal(document.querySelector('link[rel="canonical"]').href, d.querySelector('link[rel="canonical"]').href);
      assert.ok(!d.head.innerHTML.includes('workers.dev'));
      assert.ok(!d.head.innerHTML.includes('https://khatwa-designs.com'));
    }
  } finally { globalThis.document = previous; dom.window.close(); }
});

test('Workers config keeps exact .html URLs and strict 404s', () => {
  const config = JSON.parse(fs.readFileSync(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));
  assert.deepEqual(config.assets, { directory: './dist', html_handling: 'none', not_found_handling: '404-page' });
  assert.equal(config.routes, undefined); // No future custom domain activated.
  if (DEPLOY.target !== 'github') assert.equal(read('_redirects'), '/ /index.html 200\n/ar/ /ar/index.html 200\n/en/ /en/index.html 200\n');
});
