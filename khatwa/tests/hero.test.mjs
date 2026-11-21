import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { headlineLines } from '../src/content/hero-ui.js';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(directory, '..');
test('hero phrase splitting preserves every original Arabic word and English word without breaking ligatures', () => {
  for (const language of ['ar', 'en']) {
    const catalog = JSON.parse(fs.readFileSync(path.join(directory, 'src/content/' + language + '.json'), 'utf8'));
    const lines = headlineLines(catalog.home_hero_title, language);
    assert.equal(lines.join(' '), catalog.home_hero_title);
    assert.equal(lines.length, 3);
    for (const line of lines) assert.ok(line.length > 1);
  }
});

test('final application preserves the reviewed content, form integration and route components', () => {
  const files = [
    'khatwa/src/content/form.json', 'khatwa/src/content/reviews.json',
    'khatwa/src/components/ContentRenderer.jsx', 'khatwa/src/components/ContactForm.jsx', 'khatwa/src/lib/inquiry.js',
    'khatwa/src/App.jsx'
  ];
  for (const file of files) {
    const preserved = execFileSync('git', ['show', '68782cf:' + file.replace(/^khatwa\//, 'react-v2/')], { cwd: root, encoding: 'utf8' }).replaceAll('\r\n', '\n');
    assert.equal(fs.readFileSync(path.join(root, file), 'utf8').replaceAll('\r\n', '\n'), preserved, file);
  }
});

test('shared contact configuration contains the owner-supplied EmailJS public identifiers', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/khatwa-emailjs-config.js'), 'utf8'), context);
  assert.deepEqual({ ...context.window.KhatwaEmailJSConfig }, {
    serviceId: 'service_pzjv8g8',
    templateId: 'template_nhgwlgj',
    publicKey: 'UdJErrWWJNphl0QbO'
  });
});
