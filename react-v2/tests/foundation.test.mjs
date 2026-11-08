import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import { createStaticServer } from '../scripts/serve.mjs';
import { SITE_BASE, languageHref, resolveLanguage, routeFile } from '../src/lib/paths.js';
import { metadataFor } from '../src/lib/metadata.js';
import { sendInquiry, inquiryParameters, parameterNames, restoreDraft, saveDraft, DRAFT_KEY } from '../src/lib/inquiry.js';
import { render } from '../.ssr/entry-server.js';
import { assetFingerprint, expectedAssetFingerprint } from './asset-fingerprints.mjs';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(directory, '..');
const read = file => fs.readFileSync(path.join(directory, file), 'utf8');
const data = name => JSON.parse(read('src/content/' + name + '.json'));
const pages = data('pages');
const baseline = 'a831f3d456767b5c4116c3477f9f79726e296f51';
const hash = buffer => crypto.createHash('sha256').update(buffer).digest('hex');

test('all published routes and source-only archives match the legacy publication contract', () => {
  const require = createRequire(import.meta.url);
  const { redirects, excludedPages } = require(path.join(root, 'scripts/site-config.js'));
  const files = fs.readdirSync(root).filter(file => file.endsWith('.html'));
  assert.equal(files.length, 26);
  assert.deepEqual(Object.keys(pages).sort(), files.filter(file => !excludedPages.has(file)).sort());
  assert.equal(Object.values(pages).filter(page => page.status === 'migrated').length, 16);
  assert.deepEqual(Object.fromEntries(Object.entries(pages).filter(([, page]) => page.redirect).map(([file, page]) => [file, page.redirect])), redirects);
  assert.equal(Object.keys(data('archive')).length, 10);
});

test('all extracted inputs and original assets remain unchanged; main, backup tag and deployment workflow untouched', () => {
  for (const [file, expected] of Object.entries(data('manifest').inputs)) {
    assert.equal(hash(fs.readFileSync(path.join(root, file), 'utf8').replaceAll('\r\n', '\n')), expected, file);
  }
  const inventory = fs.readFileSync(path.join(root, 'docs/CONTENT-AND-ROUTES-INVENTORY.md'), 'utf8');
  const assetRecords = [...inventory.matchAll(/\| `((?:images|fonts|projects)\/[^`]+)` \| `([a-f0-9]{64})` \|/g)];
  assert.equal(assetRecords.length, 127);
  for (const [, file, expected] of assetRecords) {
    const canonicalExpected = expectedAssetFingerprint(file, expected);
    assert.equal(assetFingerprint(file, fs.readFileSync(path.join(root, file))), canonicalExpected, file);
    assert.equal(assetFingerprint(file, fs.readFileSync(path.join(directory, 'dist', file))), canonicalExpected, 'build/' + file);
  }
  for (const ref of ['main', 'pre-react-v2^{commit}']) assert.equal(execFileSync('git', ['rev-parse', ref], { cwd: root, encoding: 'utf8' }).trim(), baseline);
  assert.equal(execFileSync('git', ['branch', '--show-current'], { cwd: root, encoding: 'utf8' }).trim(), 'redesign/react-v2');
  const preparedWorkflow = execFileSync('git', ['show', 'e4c2d2d:.github/workflows/deploy-pages.yml'], { cwd: root, encoding: 'utf8' }).replaceAll('\r\n', '\n');
  assert.equal(fs.readFileSync(path.join(root, '.github/workflows/deploy-pages.yml'), 'utf8').replaceAll('\r\n', '\n'), preparedWorkflow);
  const yaml = requireFromRoot('yaml');
  const workflow = yaml.parse(preparedWorkflow);
  assert.deepEqual(workflow.on, { push: { branches: ['main'] }, workflow_dispatch: null });
  assert.deepEqual(workflow.permissions, { contents: 'read' });
  for (const job of ['build', 'deploy']) {
    for (const event_name of ['push', 'workflow_dispatch']) {
      for (const ref of ['refs/heads/main', 'refs/heads/redesign/react-v2', 'refs/tags/pre-react-v2']) {
        assert.equal(vm.runInNewContext(workflow.jobs[job].if.slice(3, -2), { github: { ref, event_name } }), ref === 'refs/heads/main');
      }
    }
  }
});
function requireFromRoot(name) { return createRequire(path.join(root, 'package.json'))(name); }

test('every preserved translation, project, review and Behance destination matches the source', () => {
  const context = { window: {}, document: { addEventListener() {} } };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/khatwa-i18n.js'), 'utf8').replace('    function getPathLang()', '    globalThis.catalogs = translations;\n    function getPathLang()'), context);
  for (const language of ['ar', 'en']) {
    assert.equal(Object.keys(data(language)).length, 394);
    assert.deepEqual(data(language), JSON.parse(JSON.stringify(context.catalogs[language])));
  }
  assert.equal(data('projects').length, 12);
  assert.equal(data('reviews').length, 12);
  const source = fs.readFileSync(path.join(root, 'portfolio.html'), 'utf8');
  for (const project of data('projects')) {
    assert.ok(source.includes(`href="${project.url}"`));
    assert.ok(source.includes(`src="${project.image}"`));
  }
  assert.equal(data('manifest').masterOnlyProjects.length, 1);
  const reviews = render(SITE_BASE + 'customer-stories.html?lang=en', 'en');
  for (const review of data('reviews')) { assert.ok(reviews.includes(review.author)); assert.ok(reviews.includes(data('en')[review.dateKey])); }
});

test('all content routes render real Arabic and English content, accessible navigation and valid static entry metadata', () => {
  for (const [file, page] of Object.entries(pages).filter(([, page]) => !page.redirect)) {
    for (const [prefix, language] of [['', 'ar'], ['ar/', 'ar'], ['en/', 'en']]) {
      const html = read('dist/' + prefix + file);
      const document = new JSDOM(html).window.document;
      assert.equal(document.documentElement.lang, language, file);
      assert.equal(document.documentElement.dir, language === 'ar' ? 'rtl' : 'ltr');
      assert.ok(document.querySelector('main h1'), prefix + file + ' needs an h1');
      assert.equal(document.title, metadataFor(file, language).title);
      assert.equal(document.querySelector('link[rel="canonical"]').href, metadataFor(file, language).canonical);
      assert.equal(document.querySelector('link[hreflang="x-default"]').href, metadataFor(file, language).alternates.ar);
      assert.ok(document.querySelector('a[href="#main-content"]'));
      assert.ok(document.querySelector('nav'));
      const live = new JSDOM(render(SITE_BASE + prefix + file + '?lang=' + language, language)).window.document;
      assert.ok(live.querySelector('main').textContent.trim().length > 25);
      if (page.languageGap && language === 'ar') assert.ok(live.querySelector('main [lang="en"][dir="ltr"]'));
    }
  }
});

test('built HTML and CSS references resolve under the project base without a server rewrite', () => {
  for (const [file, page] of Object.entries(pages)) {
    for (const prefix of ['', 'ar/', 'en/']) {
      const current = new URL(SITE_BASE + prefix + file, 'https://example.test');
      const document = new JSDOM(read('dist/' + prefix + file)).window.document;
      for (const element of document.querySelectorAll('[href],[src],[srcset]')) {
        for (const raw of [element.getAttribute('href'), element.getAttribute('src'), ...(element.getAttribute('srcset')?.split(',').map(value => value.trim().split(/\s+/)[0]) || [])].filter(Boolean)) {
          const target = new URL(raw, current);
          if (target.origin !== current.origin || raw.startsWith('#')) continue;
          assert.ok(target.pathname.startsWith(SITE_BASE), file + ' incorrect base: ' + raw);
          const relative = target.pathname.slice(SITE_BASE.length) + (target.pathname.endsWith('/') ? 'index.html' : '');
          assert.ok(fs.existsSync(path.join(directory, 'dist', relative)), file + ' missing ' + raw);
        }
      }
      if (page.redirect) assert.equal(document.querySelector('a#redirect-link').getAttribute('href'), page.redirect);
    }
  }
  assert.ok(fs.existsSync(path.join(directory, 'dist/.nojekyll')));
  for (const file of data('manifest').archivedFiles) assert.equal(fs.existsSync(path.join(directory, 'dist', file)), false);
  for (const file of fs.readdirSync(path.join(directory, 'dist/assets')).filter(file => file.endsWith('.css'))) {
    for (const [, raw] of read('dist/assets/' + file).matchAll(/url\(([^)]+)\)/g)) {
      const value = raw.replace(/^["']|["']$/g, '');
      if (/^(?:https?:|data:|#)/.test(value)) continue;
      const resolved = new URL(value, 'https://example.test' + SITE_BASE + 'assets/' + file);
      assert.ok(fs.existsSync(path.join(directory, 'dist', resolved.pathname.slice(SITE_BASE.length))), 'CSS asset ' + value);
    }
  }
});

test('direct HTTP requests and repeated refreshes work on a strict static server; unknown routes return 404', async t => {
  const server = createStaticServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const origin = 'http://127.0.0.1:' + server.address().port;
  for (const file of Object.keys(pages)) {
    for (const prefix of ['', 'en/']) {
      const url = origin + SITE_BASE + prefix + file + '?lang=' + (prefix ? 'en' : 'ar');
      assert.equal((await fetch(url)).status, 200, url);
      assert.equal((await fetch(url)).status, 200, 'refresh ' + url);
    }
  }
  assert.equal((await fetch(origin + SITE_BASE)).status, 200);
  assert.equal((await fetch(origin + SITE_BASE + 'missing/unknown.html')).status, 404);
  assert.equal((await fetch(origin + SITE_BASE + 'blog.html')).status, 404);
});

test('language resolution and links preserve valid explicit language, preferences, useful queries and fragments', () => {
  assert.equal(resolveLanguage('', null), 'ar');
  assert.equal(resolveLanguage('?lang=en', { getItem: () => 'ar' }), 'en');
  assert.equal(resolveLanguage('', { getItem: () => 'en' }), 'en');
  assert.equal(resolveLanguage('?lang=bad', { getItem() { throw Error(); } }), 'ar');
  const link = languageHref('contact.html?service=profiles&retry=1#contact-form', 'en');
  assert.equal(link, SITE_BASE + 'en/contact.html?service=profiles&retry=1&lang=en#contact-form');
  assert.equal(languageHref('https://www.behance.net/gallery/192450545/_', 'ar'), 'https://www.behance.net/gallery/192450545/_');
  assert.equal(routeFile(SITE_BASE + 'en/about.html'), 'about.html');
  assert.equal(routeFile(SITE_BASE), 'index.html');
});

test('legacy redirects retain exact query, language and fragments using the unchanged redirect handler', () => {
  const code = fs.readFileSync(path.join(root, 'js/redirect.js'), 'utf8');
  for (const page of Object.values(pages).filter(page => page.redirect)) {
    let redirected;
    vm.runInNewContext(code, { URL, document: { getElementById: () => ({ getAttribute: () => page.redirect }) }, window: { location: { href: 'https://example.test' + SITE_BASE + page.file, search: '?lang=en&service=brand', hash: '#details', replace(value) { redirected = value; } } } });
    assert.equal(redirected, 'https://example.test' + SITE_BASE + page.redirect + '?lang=en&service=brand#details');
  }
});

test('inquiry adapter preserves exact parameters, confirms HTTP 200 only, rejects failures and times out using mocked transport', async () => {
  const values = { name: 'Client', email: 'client@example.test', country_code: '+20', phone_number: '123', subject: 'Company portfolio', comment: 'Private inquiry', rogue: 'drop' };
  assert.deepEqual(Object.keys(inquiryParameters(values)), parameterNames);
  let request;
  const config = { serviceId: 'test-service', templateId: 'test-template', publicKey: 'test-public' };
  await sendInquiry(values, config, { fetcher: async (url, options) => { request = { url, ...options }; return { status: 200 }; } });
  const body = JSON.parse(request.body);
  assert.equal(request.url, 'https://api.emailjs.com/api/v1.0/email/send');
  assert.deepEqual(body.template_params, inquiryParameters(values));
  assert.equal(body.service_id, config.serviceId);
  await assert.rejects(sendInquiry(values, config, { fetcher: async () => ({ status: 201 }) }));
  await assert.rejects(sendInquiry(values, config, { fetcher: async () => { throw new Error('offline'); } }));
  await assert.rejects(sendInquiry(values, {}, { fetcher: async () => { throw new Error('must not reach network'); } }));
  await assert.rejects(sendInquiry(values, config, { timeout: 5, fetcher: (_, options) => new Promise((_, reject) => options.signal.addEventListener('abort', () => reject(new Error('aborted')))) }), /aborted/);
});

test('retry storage restores only known string fields and expires without leaking inquiry data into URLs', () => {
  const map = new Map();
  const storage = { getItem: key => map.get(key), setItem: (key, value) => map.set(key, value), removeItem: key => map.delete(key) };
  saveDraft(storage, { name: 'Client', email: 'client@example.test' });
  assert.equal(restoreDraft(storage).name, 'Client');
  map.set(DRAFT_KEY, JSON.stringify({ savedAt: Date.now() - 31 * 60 * 1000, fields: { name: 'Old' } }));
  assert.equal(restoreDraft(storage), null);
  assert.equal(map.has(DRAFT_KEY), false);
  map.set(DRAFT_KEY, '{broken');
  assert.equal(restoreDraft(storage), null);
  assert.equal(restoreDraft({ getItem() { throw Error(); } }), null);
});
