'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise the actual theme handlers without loading animation or network code.
function formHarness(lang = 'en') {
  const source = fs.readFileSync('js/main.js', 'utf8');
  const section = source.slice(source.indexOf('    // Shared by submit and blur;'),
    source.indexOf('    // Reinit skroller after revolution slider loaded'));
  const handlers = new Map();
  const document = { documentElement: { lang } };
  const window = { location: { href: '' } };
  const state = { requests: [] };
  class Elements {
    constructor(attributes = {}, value = '', length = 1) {
      this.attributes = attributes; this.value = value; this.length = length;
      this.classes = new Set(); this.content = ''; this.visible = false;
    }
    each(callback) { if (this.items) this.items.forEach(item => callback.call(item)); return this; }
    attr(name, value) { if (value === undefined) return this.attributes[name]; this.attributes[name] = value; return this; }
    val(value) { if (value === undefined) return this.value; this.value = value; return this; }
    addClass(value) { value.split(' ').filter(Boolean).forEach(x => this.classes.add(x)); return this; }
    removeClass(value) { value.split(' ').forEach(x => this.classes.delete(x)); return this; }
    hasClass(value) { return this.classes.has(value); }
    parents() { return form; }
    find(selector) {
      if (selector === '.required') return required;
      if (selector === '.form-results') return results;
      if (selector === '[name="redirect"]') return redirect;
      if (selector.startsWith('input[type=text]')) return required;
      return empty;
    }
    serialize() { return 'name=Client&email=' + encodeURIComponent(email.value); }
    is() { return false; }
    prop() { return this; }
    stop() { return this; }
    hide() { this.visible = false; return this; }
    show() { this.visible = true; return this; }
    text(value) { this.content = value; this.textOnly = true; return this; }
    html(value) { this.content = value; this.textOnly = false; return this; }
    fadeIn() { return this.show(); }
    fadeOut() { return this; }
    delay() { return this; }
  }
  const empty = new Elements({}, '', 0);
  const form = new Elements({ action: '/send' });
  const name = new Elements({ type: 'text' }, 'Client');
  const email = new Elements({ type: 'email' }, 'client+quote@company.technology');
  const redirect = new Elements({}, '');
  const button = new Elements();
  const results = new Elements();
  const required = new Elements(); required.items = [name, email];
  function $(element) {
    if (element === document) return { on(event, selector, handler) { handlers.set(event + ':' + selector, handler); } };
    return element;
  }
  $.ajax = options => state.requests.push(options);
  const context = { $, document, window };
  vm.runInNewContext(section, context);
  return {
    ...state, button, email, name, results, redirect, window,
    submit() { return handlers.get('click:.submit').call(button); },
    blur() { return handlers.get('blur:.required').call(email); },
    respond(kind, payload) {
      const request = state.requests.at(-1);
      try { request[kind](payload); } finally { request.complete(); }
    }
  };
}

test('submit and blur accept long TLDs, subdomains and plus addressing', () => {
  for (const email of ['client+quote@company.technology', 'first.last@sub.company.international', 'a@company.com']) {
    const form = formHarness(); form.email.value = email;
    form.blur(); assert.equal(form.email.hasClass('is-invalid'), false, email);
    form.submit(); assert.equal(form.requests.length, 1, email);
  }
});

test('invalid email addresses cannot submit and are marked on blur', () => {
  for (const email of ['', 'missing-at.example.com', 'a@@company.com', 'a@company..com', 'a@-company.com', 'a b@company.com']) {
    const form = formHarness(); form.email.value = email;
    form.blur(); assert.equal(form.email.hasClass('is-invalid'), true, email);
    form.submit(); assert.equal(form.requests.length, 0, email);
  }
});

test('network failure and timeout restore loading, keep fields and allow retry in both languages', () => {
  for (const lang of ['ar', 'en']) {
    const form = formHarness(lang); form.submit();
    assert.equal(form.requests[0].timeout, 20000);
    assert.equal(form.button.hasClass('loading'), true);
    form.respond('error', { status: 0 });
    assert.equal(form.button.hasClass('loading'), false);
    assert.equal(form.name.value, 'Client');
    assert.equal(form.email.value, 'client+quote@company.technology');
    assert.equal(form.results.hasClass('alert-danger'), true);
    assert.equal(form.results.visible, true);
    assert.equal(form.results.attributes.role, 'alert');
    assert.equal(/[\u0600-\u06ff]/.test(form.results.content), lang === 'ar');
    form.submit(); assert.equal(form.requests.length, 2);
  }
});

test('duplicate clicks do not start additional requests', () => {
  const form = formHarness(); form.submit(); form.submit();
  assert.equal(form.requests.length, 1);
});

test('malformed responses and server rejection preserve fields and do not redirect', () => {
  for (const response of ['not json', null, {}, { alert: 'alert-danger', message: 'Rejected' }]) {
    const form = formHarness(); form.redirect.value = 'thank-you.html';
    form.submit(); form.respond('success', response);
    assert.equal(form.email.value, 'client+quote@company.technology');
    assert.equal(form.results.hasClass('alert-danger'), true);
    assert.equal(form.button.hasClass('loading'), false);
    assert.equal(form.window.location.href, '');
  }
});

test('confirmed success accepts JSON or objects and renders response as text', () => {
  const payload = { alert: 'alert-success', message: '<img src=x onerror=alert(1)>' };
  for (const response of [payload, JSON.stringify(payload)]) {
    const form = formHarness(); form.submit(); form.respond('success', response);
    assert.equal(form.email.value, '');
    assert.equal(form.results.content, payload.message);
    assert.equal(form.results.textOnly, true);
    assert.equal(form.results.hasClass('alert-success'), true);
    assert.equal(form.button.hasClass('loading'), false);
  }
});

test('confirmed success follows configured redirect', () => {
  const form = formHarness(); form.redirect.value = 'thank-you.html';
  form.submit(); form.respond('success', { alert: 'alert-success', message: 'Sent' });
  assert.equal(form.window.location.href, 'thank-you.html');
});
