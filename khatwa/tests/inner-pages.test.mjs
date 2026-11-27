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
          if (file === 'customer-stories.html' && /^cs_date\d+$/.test(node.attrs['data-i18n'])) {
            assert.ok(!content.includes(normalized(textFor(node, dictionary))), 'review dates stay hidden');
            continue;
          }
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

test('homepage retains the approved hero, review and marquee refinements', () => {
  const expected = {"ar":"aac9dad1b0b1c37f92d8c5cbf635c803dd0b4eaf65c0ecdb09f3b6694166a3a2","en":"edaf104cfb5428773e5a3cbc7d12a4f06dbd1cc751300bf5f5cc3131dfc060f7"};
  for (const language of ['ar', 'en']) {
    const dom = new JSDOM(render(SITE_BASE + 'index.html?lang=' + language, language));
    try {
      dom.window.document.querySelector('.home-work').remove();
      // Compare the original visual/content snapshot after restoring only the
      // historical URL spelling; clean language links are covered by SEO tests.
      for (const anchor of dom.window.document.querySelectorAll('.home-page a[href]')) {
        const href = anchor.getAttribute('href');
        if (!href.startsWith(SITE_BASE)) continue;
        const url = new URL(href, 'https://example.test');
        url.pathname = '/Khatwa-Designs-Main/' + url.pathname.slice(SITE_BASE.length);
        if (url.pathname.endsWith('/')) url.pathname += 'index.html';
        url.searchParams.set('lang', language);
        anchor.setAttribute('href', url.pathname + url.search + url.hash);
      }
      for (const image of dom.window.document.querySelectorAll('.home-page img[src]')) {
        const src = image.getAttribute('src');
        if (src.startsWith(SITE_BASE)) image.setAttribute('src', '/Khatwa-Designs-Main/' + src.slice(SITE_BASE.length));
      }
      assert.equal(crypto.createHash('sha256').update(dom.window.document.querySelector('.home-page').outerHTML).digest('hex'), expected[language]);
    }
    finally { dom.window.close(); }
  }
  for (const file of ['src/components/CinematicHero.jsx', 'src/components/home/HomeSections.jsx', 'src/styles/home.css', 'src/styles/hero.css', 'src/styles/tokens.css']) {
    const baseline = execFileSync('git', ['show', 'a329052:khatwa/' + file], { encoding: 'utf8' }).replaceAll('\r\n', '\n');
    const current = fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8').replaceAll('\r\n', '\n');
    assert.equal(current, baseline, file);
  }
});
