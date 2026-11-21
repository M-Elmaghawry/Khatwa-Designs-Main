import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';
import { createStaticServer } from '../scripts/serve.mjs';
import pages from '../src/content/pages.json' with { type: 'json' };
import manifest from '../src/content/manifest.json' with { type: 'json' };
import services from '../src/content/services.json' with { type: 'json' };
import socials from '../src/content/socials.json' with { type: 'json' };
import { SITE_BASE, SITE_ORIGIN, languageHref } from '../src/lib/paths.js';
import { metadataFor, indexableRoutes, canonicalFor, applyMetadata, SOCIAL_IMAGE } from '../src/lib/metadata.js';

const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const routes = indexableRoutes();
const documents = Object.entries(pages).flatMap(([file, page]) => ['', 'ar/', 'en/'].map(prefix => {
  const dom = new JSDOM(read('dist/' + prefix + file), { url: SITE_ORIGIN + SITE_BASE + prefix + file });
  return { file, page, prefix, language: prefix === 'en/' ? 'en' : 'ar', d: dom.window.document };
}));
const xml = new JSDOM(read('dist/sitemap.xml'), { contentType: 'application/xml' }).window.document;
const locations = [...xml.getElementsByTagName('loc')].map(node => node.textContent);
const pageDocument = (file, language) => documents.find(row => row.file === file && row.prefix === (language === 'en' ? 'en/' : '')).d;

test('SEO 1: indexable canonical URLs are absolute, self-referencing and unique', () => {
  assert.equal(routes.length, 25);
  assert.equal(new Set(routes.map(r => r.metadata.canonical)).size, routes.length);
  for (const { file, language, metadata } of routes) {
    assert.equal(metadata.canonical, canonicalFor(file, language));
    assert.equal(pageDocument(file, language).querySelector('link[rel="canonical"]').href, metadata.canonical);
    assert.equal(new URL(metadata.canonical).origin, SITE_ORIGIN);
  }
});

test('SEO 2: all 11 translation pairs have reciprocal canonical ar/en alternates; legal pages have none', () => {
  assert.equal(routes.filter(r => r.language === 'ar').length, 11);
  assert.equal(routes.filter(r => r.language === 'en').length, 14);
  for (const { file, language, metadata } of routes) {
    if (pages[file].languageGap) { assert.deepEqual(metadata.alternates, {}); continue; }
    for (const lang of ['ar', 'en']) {
      assert.equal(metadata.alternates[lang], canonicalFor(file, lang));
      assert.equal(pageDocument(file, lang).querySelector(`link[hreflang="${language}"]`).href, metadata.canonical);
    }
  }
});

test('SEO 3: x-default intentionally selects Arabic only for indexable bilingual content', () => {
  for (const row of documents.filter(row => !row.page.redirect)) {
    const links = row.d.querySelectorAll('link[hreflang="x-default"]');
    const eligible = !row.page.languageGap && !row.page.robots.includes('noindex');
    assert.equal(links.length, eligible ? 1 : 0);
    if (eligible) assert.equal(links[0].href, canonicalFor(row.file, 'ar'));
  }
});

test('SEO 4: sitemap is well-formed XML and exactly matches all indexable canonicals', () => {
  assert.equal(xml.documentElement.namespaceURI, 'http://www.sitemaps.org/schemas/sitemap/0.9');
  assert.deepEqual([...locations].sort(), routes.map(r => r.metadata.canonical).sort());
  for (const url of xml.getElementsByTagName('url')) {
    const loc = url.getElementsByTagName('loc')[0].textContent;
    const expected = routes.find(r => r.metadata.canonical === loc).metadata.alternates;
    const actual = Object.fromEntries([...url.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'link')].map(e => [e.getAttribute('hreflang'), e.getAttribute('href')]));
    assert.deepEqual(actual, expected);
  }
});

test('SEO 5: canonicals, alternates, sitemap and new internal links have no language query variants', () => {
  for (const row of documents.filter(row => !row.page.redirect)) {
    for (const link of row.d.querySelectorAll('link[rel="canonical"], link[hreflang]')) {
      const url = new URL(link.href);
      assert.equal(url.search, ''); assert.equal(url.hash, '');
      assert.ok(url.pathname.endsWith('.html') || url.pathname.endsWith('/'));
    }
    for (const anchor of row.d.querySelectorAll('a[href]')) {
      if (anchor.href.startsWith(SITE_ORIGIN + SITE_BASE)) assert.equal(new URL(anchor.href).searchParams.has('lang'), false, anchor.href);
    }
  }
  assert.equal(languageHref('contact.html?lang=ar&service=brand#contact-form', 'en'), SITE_BASE + 'en/contact.html?service=brand#contact-form');
});

test('SEO 6: errors, results, redirects, Arabic legal wrappers and archived pages stay outside sitemap', () => {
  for (const file of ['404.html', 'thank-you.html', ...Object.keys(manifest.redirects), ...manifest.archivedFiles]) assert.ok(!locations.some(url => url.endsWith('/' + file)));
  for (const row of documents.filter(row => row.page.redirect || row.page.robots.includes('noindex') || (row.page.languageGap && row.language === 'ar'))) {
    assert.match(row.d.querySelector('meta[name="robots"]').content, /noindex/);
  }
});

test('SEO 7: every generated entry, canonical, social image and legacy fallback is served by strict static hosting', async t => {
  const server = createStaticServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const origin = 'http://127.0.0.1:' + server.address().port;
  for (const row of documents) {
    const response = await fetch(origin + SITE_BASE + row.prefix + row.file);
    assert.equal(response.status, 200);
    if (row.page.redirect) {
      const target = row.d.querySelector('#redirect-link').href;
      assert.equal((await fetch(origin + new URL(target).pathname)).status, 200);
      assert.equal(row.d.querySelector('script').getAttribute('src'), SITE_BASE + 'legacy/redirect.js');
    }
  }
  for (const pathname of [...locations.map(url => new URL(url).pathname), new URL(SOCIAL_IMAGE.url).pathname]) assert.equal((await fetch(origin + pathname)).status, 200);
  for (const prefix of ['', 'en/', 'ar/']) assert.equal((await fetch(origin + SITE_BASE + prefix)).status, 200);
  assert.equal((await fetch(origin + SITE_BASE + 'missing/unknown.html')).status, 404);
});

test('SEO 8: real compatibility scripts preserve language, form queries and fragments without redirect loops', () => {
  const normalize = fs.readFileSync(new URL('../../js/normalize-url.js', import.meta.url), 'utf8');
  const legacy = fs.readFileSync(new URL('../../js/redirect.js', import.meta.url), 'utf8');
  for (const prefix of ['', 'ar/', 'en/']) for (const file of ['', ...Object.keys(pages)]) for (const query of ['', '?lang=ar', '?lang=en', '?lang=bad']) {
    let url = SITE_ORIGIN + SITE_BASE + prefix + file + (query ? query + '&' : '?') + 'service=brand&retry=1#details';
    const language = query === '?lang=en' ? 'en' : query === '?lang=ar' ? 'ar' : prefix === 'en/' ? 'en' : 'ar';
    const target = pages[file]?.redirect || file || 'index.html';
    const visited = new Set();
    for (let hop = 0; hop < 5; hop++) {
      assert.ok(!visited.has(url), 'redirect loop: ' + url); visited.add(url);
      let destination;
      const current = new URL(url);
      const key = current.pathname.slice(SITE_BASE.length).replace(/^(?:ar|en)\//, '') || 'index.html';
      const redirect = pages[key]?.redirect;
      const link = { getAttribute: () => redirect };
      vm.runInNewContext(redirect ? legacy : normalize, { URL, document: { getElementById: () => link }, window: { location: { href: url, search: current.search, hash: current.hash, replace(value) { destination = value; } } } });
      if (!destination) break;
      url = destination;
      assert.ok(hop < 3, 'unexpected redirect chain');
    }
    assert.equal(url, canonicalFor(target, language) + '?service=brand&retry=1#details');
  }
});

test('SEO 9: prerendered and runtime metadata use the same values and remove stale schema/alternates', () => {
  const dom = new JSDOM('<html><head><title>Test</title></head><body></body></html>');
  const previous = globalThis.document; globalThis.document = dom.window.document;
  try {
    for (const { file, language, d, page } of [...documents.filter(r => !r.page.redirect), ...documents.filter(r => !r.page.redirect).reverse()]) {
      applyMetadata(metadataFor(file, language), language);
      assert.equal(document.title, d.title, file);
      assert.equal(document.querySelector('meta[name="description"]').content, d.querySelector('meta[name="description"]').content);
      for (const selector of ['link[rel="canonical"]', 'link[hreflang]', 'meta[property^="og:"]', 'meta[name^="twitter:"]', 'script[type="application/ld+json"]']) {
        const values = document => [...document.querySelectorAll(selector)].map(e => e.outerHTML).sort();
        assert.deepEqual(values(document), values(d), page.file + ' ' + selector);
      }
    }
  } finally { globalThis.document = previous; dom.window.close(); }
});

test('SEO 10: JSON-LD parses with expected schema types, identity, breadcrumb fields and actual services', () => {
  for (const { file, language, metadata } of routes) {
    const scripts = pageDocument(file, language).querySelectorAll('script[type="application/ld+json"]');
    assert.equal(scripts.length, 1);
    const data = JSON.parse(scripts[0].textContent);
    assert.equal(data['@context'], 'https://schema.org');
    const organization = data['@graph'].find(item => item['@type'] === 'Organization');
    assert.equal(organization.name, 'Khatwa Designs'); assert.equal(organization.url, SITE_ORIGIN + SITE_BASE);
    assert.equal(organization.logo, SOCIAL_IMAGE.url); assert.deepEqual(organization.sameAs, socials.map(s => s.url));
    const expected = ['Organization', 'WebSite', ...(file !== 'index.html' ? ['BreadcrumbList'] : []), ...(services.some(s => s.file === file) ? ['Service'] : [])];
    assert.deepEqual(data['@graph'].map(item => item['@type']), expected);
    for (const item of data['@graph']) {
      for (const forbidden of ['aggregateRating', 'review', 'address', 'price', 'offers']) assert.equal(item[forbidden], undefined);
      if (item['@type'] === 'BreadcrumbList') {
        assert.ok(item.itemListElement.length >= 2);
        item.itemListElement.forEach((crumb, i) => { assert.equal(crumb['@type'], 'ListItem'); assert.equal(crumb.position, i + 1); assert.ok(crumb.name); assert.ok(new URL(crumb.item)); });
        assert.equal(item.itemListElement.at(-1).item, metadata.canonical);
      }
      if (item['@type'] === 'Service') { assert.ok(item.name); assert.equal(item.description, metadata.description); assert.equal(item.url, metadata.canonical); assert.equal(item.provider['@id'], organization['@id']); }
    }
  }
});

test('SEO 11: Open Graph URL, title and description match the page and canonical', () => {
  for (const { d, file, language } of documents.filter(r => !r.page.redirect)) {
    const metadata = metadataFor(file, language);
    for (const [name, value] of Object.entries(metadata.openGraph)) assert.equal(d.querySelector(`meta[property="${name}"]`).content, value);
    assert.equal(d.querySelector('meta[property="og:url"]').content, d.querySelector('link[rel="canonical"]').href);
  }
});

test('SEO 12: social image is an existing approved PNG with accurate dimensions and complete Twitter metadata', () => {
  const bytes = fs.readFileSync(new URL('../dist/images/khatwa-logo.png', import.meta.url));
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
  assert.equal(bytes.readUInt32BE(16), SOCIAL_IMAGE.width); assert.equal(bytes.readUInt32BE(20), SOCIAL_IMAGE.height);
  for (const { d, file, language } of documents.filter(r => !r.page.redirect)) {
    assert.equal(d.querySelector('meta[property="og:image"]').content, SOCIAL_IMAGE.url);
    for (const [name, value] of Object.entries(metadataFor(file, language).twitter)) assert.equal(d.querySelector(`meta[name="${name}"]`).content, value);
  }
});

test('SEO 13: every generated HTML entry uses the correct lang and dir', () => {
  for (const { d, language } of documents) { assert.equal(d.documentElement.lang, language); assert.equal(d.documentElement.dir, language === 'ar' ? 'rtl' : 'ltr'); }
});

test('SEO 14: no duplicate title, canonical, robots, social or hreflang tags', () => {
  for (const { d, page } of documents) {
    assert.equal(d.querySelectorAll('title').length, 1); assert.equal(d.querySelectorAll('meta[name="robots"]').length, 1);
    assert.equal(d.querySelectorAll('link[rel="canonical"]').length, page.redirect ? 0 : 1);
    for (const selector of ['meta[property^="og:"]', 'meta[name^="twitter:"]', 'link[hreflang]']) {
      const keys = [...d.querySelectorAll(selector)].map(e => e.name || e.getAttribute('property') || e.hreflang);
      assert.equal(new Set(keys).size, keys.length);
    }
  }
});

test('SEO 15: intended canonical pages stay indexable and robots references the canonical sitemap without disallows', () => {
  for (const { file, language } of routes) assert.equal(pageDocument(file, language).querySelector('meta[name="robots"]').content, 'index,follow');
  const robots = read('dist/robots.txt');
  assert.match(robots, /User-agent: \*/); assert.ok(!/^Disallow:\s*\S/m.test(robots));
  assert.ok(robots.includes('Sitemap: ' + SITE_ORIGIN + SITE_BASE + 'sitemap.xml'));
});
