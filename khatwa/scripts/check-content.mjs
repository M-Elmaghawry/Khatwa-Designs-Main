import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(directory, '..');
const read = name => JSON.parse(fs.readFileSync(path.join(directory, 'src/content', name + '.json'), 'utf8'));
const ar = read('ar');
const en = read('en');
const pages = read('pages');
const manifest = read('manifest');
assert.deepEqual(Object.keys(ar).sort(), Object.keys(en).sort(), 'Locale keys must match');
const key = value => {
  if (!value) return;
  for (const catalog of [ar, en]) assert.equal(typeof catalog[value], 'string', 'Missing translation: ' + value);
};
const walk = node => {
  if (typeof node === 'string') return;
  assert.ok(node && typeof node.tag === 'string' && Array.isArray(node.children), 'Invalid content node');
  for (const [name, value] of Object.entries(node.attrs)) if (name.startsWith('data-i18n')) key(value);
  node.children.forEach(walk);
};
for (const [file, page] of Object.entries(pages)) {
  assert.equal(page.file, file);
  assert.ok(!manifest.archivedFiles.includes(file), 'Archived route published: ' + file);
  if (page.redirect) assert.ok(pages[page.redirect] && !pages[page.redirect].redirect, 'Invalid redirect: ' + file);
  key(page.titleKey);
  key(page.descriptionKey);
  page.sections.forEach(walk);
}
assert.deepEqual(Object.fromEntries(Object.entries(pages).filter(([, page]) => page.redirect).map(([file, page]) => [file, page.redirect])), manifest.redirects);
for (const project of read('projects')) {
  key(project.titleKey);
  assert.ok(fs.existsSync(path.join(root, project.image)), 'Missing project image: ' + project.image);
  assert.equal(new URL(project.url).hostname, 'www.behance.net');
}
for (const review of read('reviews')) { key(review.textKey); key(review.dateKey); }
for (const service of read('services')) { key(service.labelKey); assert.ok(pages[service.file]); }
for (const field of read('form')) {
  key(field.labelKey); key(field.placeholderKey);
  field.options.forEach(option => key(option.key));
}
for (const social of read('socials')) new URL(social.url);
console.log(`React content verified: ${Object.keys(pages).length} routes; ${Object.keys(ar).length} keys per locale.`);
