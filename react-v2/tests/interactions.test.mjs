import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act, StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { App, render } from '../.ssr/entry-server.js';
import { SITE_BASE } from '../src/lib/paths.js';
import { DRAFT_KEY } from '../src/lib/inquiry.js';
import en from '../src/content/en.json' with { type: 'json' };
import ar from '../src/content/ar.json' with { type: 'json' };

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const originalFetch = globalThis.fetch;
async function mount(location, { initialLanguage = 'ar', hydrated = false, storage = {} } = {}) {
  const dom = new JSDOM('<!doctype html><html lang="ar"><head><title>Preview</title></head><body><div id="root"></div></body></html>', { url: 'https://example.test' + SITE_BASE });
  for (const name of ['window', 'document', 'HTMLElement', 'Node', 'Event', 'MouseEvent', 'CustomEvent']) globalThis[name] = name === 'window' ? dom.window : dom.window[name];
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
  globalThis.localStorage = dom.window.localStorage;
  globalThis.sessionStorage = dom.window.sessionStorage;
  dom.window.scrollTo = () => {};
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  dom.window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
  dom.window.KhatwaEmailJSConfig = { serviceId: 'test-service', templateId: 'test-template', publicKey: 'test-public' };
  for (const [key, value] of Object.entries(storage)) dom.window.sessionStorage.setItem(key, value);
  const container = dom.window.document.getElementById('root');
  const { createRoot, hydrateRoot } = await import('react-dom/client');
  const app = React.createElement(StrictMode, null, React.createElement(MemoryRouter, { initialEntries: [location], basename: SITE_BASE.slice(0, -1) }, React.createElement(App, { initialLanguage })));
  if (hydrated) container.innerHTML = render(location, initialLanguage);
  let root;
  const hydrationErrors = [];
  await act(async () => { root = hydrated ? hydrateRoot(container, app, { onRecoverableError: error => hydrationErrors.push(error.message) }) : createRoot(container); if (!hydrated) root.render(app); });
  return { document: dom.window.document, window: dom.window, hydrationErrors, async unmount() { await act(async () => root.unmount()); dom.window.close(); globalThis.fetch = originalFetch; } };
}
const click = async element => { assert.ok(element, 'click target exists'); await act(async () => element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }))); };
async function input(element, value) {
  const prototype = element.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
  await act(async () => element.dispatchEvent(new window.Event('input', { bubbles: true })));
}
async function submit(form) { await act(async () => form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))); }

test('Arabic default hydrates without mismatch; switching language updates direction, metadata, links and storage', async () => {
  const ui = await mount(SITE_BASE + 'about.html', { hydrated: true });
  try {
    assert.deepEqual(ui.hydrationErrors, []);
    assert.equal(ui.document.documentElement.lang, 'ar');
    assert.equal(ui.document.documentElement.dir, 'rtl');
    assert.equal(ui.document.querySelector('h1').textContent, ar.ab_title);
    await click(ui.document.querySelector('.language-switcher [lang="en"]'));
    assert.equal(ui.document.documentElement.lang, 'en');
    assert.equal(ui.document.documentElement.dir, 'ltr');
    assert.equal(ui.document.querySelector('h1').textContent, en.ab_title);
    assert.equal(ui.document.title, en.ab_meta_title);
    assert.equal(ui.window.localStorage.getItem('khatwa_lang'), 'en');
    assert.ok(ui.document.querySelector('nav a[href*="en/portfolio.html?lang=en"]'));
    await click(ui.document.querySelector('.language-switcher [lang="ar"]'));
    assert.equal(ui.document.querySelector('h1').textContent, ar.ab_title);
  } finally { await ui.unmount(); }
});

test('direct English route, mobile navigation and native portfolio filters work', async () => {
  const ui = await mount(SITE_BASE + 'en/portfolio.html');
  try {
    assert.equal(ui.document.querySelector('h1').textContent, en.pf_title);
    assert.equal(ui.document.documentElement.dir, 'ltr');
    const toggle = ui.document.querySelector('.menu-toggle');
    await click(toggle);
    assert.equal(toggle.getAttribute('aria-expanded'), 'true');
    assert.equal(ui.document.querySelectorAll('.work-item').length, 12);
    await click(ui.document.querySelector('[data-filter="websites"]'));
    assert.equal(ui.document.querySelectorAll('.work-item').length, 3);
    assert.equal(ui.document.querySelector('[data-filter="websites"]').getAttribute('aria-pressed'), 'true');
    await click(ui.document.querySelector('[data-filter="all"]'));
    assert.equal(ui.document.querySelectorAll('.work-item').length, 12);
  } finally { await ui.unmount(); }
});

test('English static entry hydrates and language switching preserves form values, query parameters and fragments', async () => {
  const english = await mount(SITE_BASE + 'en/about.html', { initialLanguage: 'en', hydrated: true });
  try { assert.deepEqual(english.hydrationErrors, []); assert.equal(english.document.querySelector('h1').textContent, en.ab_title); }
  finally { await english.unmount(); }
  const formPage = await mount(SITE_BASE + 'contact.html?service=brand&lang=ar#contact-form');
  try {
    await input(formPage.document.querySelector('[name="name"]'), 'Client');
    await click(formPage.document.querySelector('.language-switcher [lang="en"]'));
    assert.equal(formPage.document.querySelector('[name="name"]').value, 'Client');
    assert.equal(formPage.document.querySelector('[name="subject"]').value, 'Brand identity');
    assert.equal(formPage.document.querySelector('h1').textContent, en.contact_title);
  } finally { await formPage.unmount(); }
});

test('React form validates and focuses invalid fields, prevents duplicate sends, and shows success only after mocked confirmation', async () => {
  const ui = await mount(SITE_BASE + 'contact.html?lang=en&service=profiles');
  try {
    let calls = 0;
    let confirm;
    globalThis.fetch = async () => { calls++; return new Promise(resolve => { confirm = resolve; }); };
    const form = ui.document.querySelector('form');
    assert.equal(form.elements.subject.value, 'Company portfolio');
    await submit(form);
    assert.equal(calls, 0);
    assert.equal(ui.document.activeElement, form.elements.name);
    assert.equal(form.elements.name.getAttribute('aria-invalid'), 'true');
    await input(form.elements.name, 'Client');
    await input(form.elements.email, 'client+quote@company.technology');
    await submit(form);
    await submit(form);
    assert.equal(calls, 1);
    assert.equal(form.getAttribute('aria-busy'), 'true');
    assert.equal(form.querySelector('[type="submit"]').disabled, true);
    await act(async () => confirm({ status: 200 }));
    assert.equal(ui.document.querySelector('main h1').textContent, en.thankyou_title);
    assert.equal(ui.window.sessionStorage.getItem(DRAFT_KEY), null);
  } finally { await ui.unmount(); }
});

test('failed inquiry uses localized error result and retry restores session draft without losing fields', async () => {
  const ui = await mount(SITE_BASE + 'contact.html?lang=ar');
  try {
    globalThis.fetch = async () => { throw new Error('mock offline'); };
    const form = ui.document.querySelector('form');
    await input(form.elements.name, 'Client');
    await input(form.elements.email, 'client@example.test');
    await input(form.elements.comment, 'Private project context');
    await submit(form);
    assert.equal(ui.document.querySelector('main h1').textContent, ar.contact_result_error_title);
    assert.equal(ui.document.title, ar.contact_result_error_meta);
    await click(ui.document.querySelector('main a[href*="retry=1"]'));
    const restored = ui.document.querySelector('form');
    assert.equal(restored.elements.name.value, 'Client');
    assert.equal(restored.elements.comment.value, 'Private project context');
  } finally { await ui.unmount(); }
});

test('direct result URLs stay neutral without a recognized state; unknown routes render an accessible not-found page', async () => {
  const ui = await mount(SITE_BASE + 'thank-you.html?lang=en&status=untrusted');
  try { assert.equal(ui.document.querySelector('main h1').textContent, en.contact_result_neutral_title); }
  finally { await ui.unmount(); }
  const missing = await mount(SITE_BASE + 'unknown.html?lang=en');
  try { assert.equal(missing.document.querySelector('main h1').textContent, en.page404_title); assert.ok(missing.document.querySelector('main a[href*="index.html"]')); }
  finally { await missing.unmount(); }
});

test('reduced-motion preference prevents GSAP setup; unmount removes the preference listener', async () => {
  const ui = await mount(SITE_BASE);
  try {
    const { useGsap } = await import('../src/motion/useGsap.js');
    const { createRoot } = await import('react-dom/client');
    let setups = 0, added = 0, removed = 0;
    ui.window.matchMedia = () => ({ matches: true, addEventListener() { added++; }, removeEventListener() { removed++; } });
    function Probe() { const scope = React.useRef(null); useGsap(scope, () => { setups++; }); return React.createElement('div', { ref: scope }); }
    const host = ui.document.createElement('div'); ui.document.body.append(host);
    const root = createRoot(host);
    await act(async () => root.render(React.createElement(StrictMode, null, React.createElement(Probe))));
    assert.equal(setups, 0);
    await act(async () => root.unmount());
    assert.equal(added, removed);
  } finally { await ui.unmount(); }
});
