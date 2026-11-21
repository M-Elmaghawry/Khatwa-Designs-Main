import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import projects from '../src/content/projects.json' with { type: 'json' };
import { galleryProjects } from '../src/content/inner-model.js';
import { JSDOM } from 'jsdom';
import { render } from '../.ssr/entry-server.js';

test('portfolio uses exactly the 23 owner-approved Behance projects in their supplied categories', () => {
  const approved = {
    websites: ['215345183', '203874479', '195189457', '194950199', '189475113'],
    profiles: ['202594407', '193903091', '192450545', '192151991', '149628627'],
    presentations: ['149311089', '149311977', '149312263', '149309225'],
    brand: ['186010277', '185519875', '126865569', '149607461'],
    social: ['186383121', '186382111', '127171397', '126865999', '130734157']
  };
  assert.equal(projects.length, 23);
  assert.equal(galleryProjects.length, 23);
  for (const [category, ids] of Object.entries(approved)) {
    assert.deepEqual(projects.filter(project => project.category === category).map(project => project.url.split('/')[4]), ids);
  }
  const instructions = fs.readFileSync(new URL('../../projects/README.md', import.meta.url), 'utf8');
  for (const project of galleryProjects) {
    assert.ok(projects.some(approvedProject => approvedProject.url === project.url));
    assert.ok(instructions.includes(project.url));
    assert.ok(fs.existsSync(new URL('../../' + project.image, import.meta.url)));
  }
  const dom = new JSDOM(render('/Khatwa-Designs-Main/index.html?lang=en', 'en'));
  try {
    const cards = Array.from(dom.window.document.querySelectorAll('.home-project'));
    assert.equal(cards.length, 6);
    assert.equal(dom.window.document.querySelector('.home-cover-note'), null);
    assert.deepEqual(new Set(cards.map(card => card.dataset.cat)), new Set(Object.keys(approved)));
    for (const card of cards) assert.ok(projects.some(project => project.url === card.querySelector('a').href));
  } finally { dom.window.close(); }
  assert.ok(projects.every(project => project.temporaryCover === false));
});
