import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import { render } from '../.ssr/entry-server.js';
import pages from '../src/content/pages.json' with { type: 'json' };
import ar from '../src/content/ar.json' with { type: 'json' };
import en from '../src/content/en.json' with { type: 'json' };
import { SITE_BASE, languageHref } from '../src/lib/paths.js';

const normalized = text => text.replace(/\s+/gu, ' ').trim();
const walk = node => typeof node === 'string' ? [] : [node, ...node.children.flatMap(walk)];
const textFor = (node, dictionary) => typeof node === 'string' ? node : node.attrs['data-i18n'] ? dictionary[node.attrs['data-i18n']] : node.children.map(child => textFor(child, dictionary)).join('');

test('every redesigned source-backed inner page retains original bilingual copy, legal literals, links and images', () => {
  for (const [file, page] of Object.entries(pages).filter(([file, page]) => file !== 'index.html' && !page.redirect && !['404.html', 'thank-you.html'].includes(file))) {
    for (const [language, dictionary] of [['ar', ar], ['en', en]]) {
      const dom = new JSDOM(render(SITE_BASE + (language === 'en' ? 'en/' : '') + file + '?lang=' + language, language));
      try {
        const main = dom.window.document.querySelector('main');
        assert.equal(main.querySelectorAll('h1').length, 1, file);
        assert.ok(main.querySelector('.inner-page'), file);
        const content = normalized(main.textContent);
        const source = page.sections.flatMap(walk);
        for (const node of source.filter(node => node.attrs['data-i18n'] || (page.languageGap && /^(p|h[1-6]|li)$/.test(node.tag)))) {
          assert.ok(content.includes(normalized(textFor(node, dictionary))), `${language}/${file}: preserved ${node.attrs['data-i18n'] || node.tag}`);
        }
        const hrefs = Array.from(main.querySelectorAll('a'), link => link.getAttribute('href'));
        for (const node of source.filter(node => node.tag === 'a')) {
          assert.ok(hrefs.includes(languageHref(node.attrs.href, language)), `${language}/${file}: ${node.attrs.href}`);
        }
        for (const node of source.filter(node => node.tag === 'img')) assert.ok(main.querySelector(`img[src="${SITE_BASE + node.attrs.src}"]`), file);
        if (page.languageGap) {
          assert.ok(main.querySelector('[lang="en"][dir="ltr"]'));
          assert.equal(main.querySelectorAll('.inner-reading h4').length, 0, 'legal heading levels corrected without text changes');
        }
      } finally { dom.window.close(); }
    }
  }
});

test('homepage markup and approved visual source stay unchanged from the reviewed Phase 3 baseline', () => {
  const expected = { ar: '831915703b5d2743c7acd652fb7ce94f85bcfd79988a35c02b50e5d039355a35', en: '4eccd5ff6eb588af323503ed5a2c74d82f8f06153ed787482bc16012256cd07d' };
  for (const language of ['ar', 'en']) {
    const dom = new JSDOM(render(SITE_BASE + 'index.html?lang=' + language, language));
    try { assert.equal(crypto.createHash('sha256').update(dom.window.document.querySelector('.home-page').outerHTML).digest('hex'), expected[language]); }
    finally { dom.window.close(); }
  }
  for (const file of ['src/components/CinematicHero.jsx', 'src/components/home/HomeSections.jsx', 'src/content/home-model.js', 'src/styles/home.css', 'src/styles/hero.css', 'src/styles/tokens.css']) {
    const baseline = execFileSync('git', ['show', '1e53ac5:react-v2/' + file], { encoding: 'utf8' }).replaceAll('\r\n', '\n');
    assert.equal(fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8').replaceAll('\r\n', '\n'), baseline, file);
  }
});
