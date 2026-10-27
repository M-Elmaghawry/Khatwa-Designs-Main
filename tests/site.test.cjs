'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const postcss = require('postcss');
const terser = require(require.resolve('terser', { paths: [require.resolve('gulp-terser')] }));
const { prepareSite } = require('../scripts/prepare-site');
const { redirects, excludedPages } = require('../scripts/site-config');
const { styleFiles } = require('../scripts/optimize-styles');

test('deployment artifact has no missing local HTML/CSS assets or retired-service links', t => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'khatwa-site-test-'));
  t.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const output = path.join(parent, '_site'); prepareSite(output);
  for (const file of excludedPages) assert.equal(fs.existsSync(path.join(output, file)), false);
  for (const file of fs.readdirSync(output).filter(file => file.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(output, file), 'utf8');
    assert.equal(html.includes('YOUR_API_KEY'), false, file);
    for (const [, href] of html.matchAll(/(?:href|src|data-at2x)=["']([^"']+)["']/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(href)) continue;
      const target = href.split(/[?#]/)[0];
      assert.ok(fs.existsSync(path.join(output, target)), file + ' -> ' + target);
      assert.equal(Object.hasOwn(redirects, target), false, file + ' links to retired service ' + target);
    }
  }
  const css = fs.readFileSync(path.join(output, 'css/site.min.css'), 'utf8');
  for (const [, raw] of css.matchAll(/url\(([^)]+)\)/g)) {
    const url = raw.replace(/^["']|["']$/g, '').split(/[?#]/)[0];
    if (/^(?:[a-z]+:|\/\/|#)/i.test(url) || !url) continue;
    assert.ok(fs.existsSync(path.resolve(output, 'css', url)), 'CSS asset: ' + url);
  }
  assert.equal(fs.existsSync(path.join(output, 'js/main.js')), false);
  assert.equal(fs.existsSync(path.join(output, 'js/vendors')), false);
});

test('legacy service redirects preserve query, language and fragment on project subpaths', () => {
  const source = fs.readFileSync('js/redirect.js', 'utf8');
  for (const [page, target] of Object.entries(redirects)) {
    let redirected;
    const link = { getAttribute: () => target };
    vm.runInNewContext(source, {
      URL, document: { getElementById: () => link },
      window: { location: {
        href: 'https://example.com/Khatwa-Designs-Main/' + page + '?lang=ar#details',
        search: '?lang=ar', hash: '#details', replace(url) { redirected = url; }
      } }
    });
    assert.equal(redirected, 'https://example.com/Khatwa-Designs-Main/' + target + '?lang=ar#details');
    assert.equal(link.href, redirected);
  }
});

test('minified site scripts match the current sources', async () => {
  for (const name of ['main', 'khatwa-i18n']) {
    const source = fs.readFileSync('js/' + name + '.js', 'utf8');
    const output = await terser.minify(source);
    assert.ok(fs.readFileSync('js/min/' + name + '.js', 'utf8').trim() === output.code.trim(),
      name + ': rebuild the minified script');
  }
});

test('style bundle is smaller, keeps imports valid and preserves used icon glyphs', () => {
  const bundled = fs.readFileSync('css/site.min.css', 'utf8');
  const originalBytes = styleFiles.reduce((sum, file) => sum + fs.statSync(file).size, 0);
  assert.ok(Buffer.byteLength(bundled) < originalBytes * 0.95, 'At least 5% fewer CSS bytes');
  const sheet = postcss.parse(bundled); let hasRules = false;
  for (const node of sheet.nodes) {
    if (node.type === 'rule') hasRules = true;
    if (node.type === 'atrule' && node.name === 'import') assert.equal(hasRules, false);
  }
  const fullIcons = fs.readFileSync('css/icon.min.css', 'utf8');
  const content = fs.readdirSync('.').filter(file => file.endsWith('.html'))
    .concat(['js/main.js', 'js/khatwa-layout.js', 'js/khatwa-i18n.js'])
    .map(file => fs.readFileSync(file, 'utf8')).join('\n');
  for (const icon of new Set(content.match(/(?:line-icon-|icon-feather-|ti-)[\w-]+/g))) {
    if (fullIcons.includes('.' + icon + ':before')) assert.ok(bundled.includes('.' + icon + ':before'), icon);
  }
});

test('service directory advertises only the five approved services in priority order', () => {
  const html = fs.readFileSync('services.html', 'utf8');
  const cards = [...html.matchAll(/data-service-card>([\s\S]*?)<\/figure>/g)];
  assert.equal(cards.length, 5);
  assert.deepEqual(cards.map(card => /href="([^"]+)"/.exec(card[1])[1]), [
    'company-portfolio.html', 'powerpoint-presentations.html', 'web-design.html',
    'brand-identity.html', 'social-media-design.html'
  ]);
});

test('HTML translation keys exist in Arabic and English', () => {
  const source = fs.readFileSync('js/khatwa-i18n.js', 'utf8')
    .replace('    function getPathLang()', '    globalThis.auditTranslations = translations;\n    function getPathLang()');
  const context = { document: { addEventListener() {} } };
  vm.runInNewContext(source, context);
  for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
    const html = fs.readFileSync(file, 'utf8');
    for (const [, key] of html.matchAll(/data-(?:i18n(?:-placeholder)?|meta-title|meta-desc)="([^"]+)"/g)) {
      for (const lang of ['ar', 'en']) assert.ok(context.auditTranslations[lang][key], file + ': ' + lang + '.' + key);
    }
  }
});

test('rebuilt navigation retains the existing 1199px mobile breakpoint and XL toggler', () => {
  const css = postcss.parse(fs.readFileSync('css/responsive.min.css', 'utf8'));
  let found = false;
  css.walkRules(rule => {
    if (!rule.selectors.includes('.navbar-expand-xl .navbar-toggler')) return;
    if (rule.parent.type === 'atrule' && /max-width:\s*1199px/.test(rule.parent.params) &&
        rule.nodes.some(node => node.prop === 'display' && node.value === 'flex')) found = true;
  });
  assert.ok(found, 'The source must preserve the previously customized mobile navigation');
});
