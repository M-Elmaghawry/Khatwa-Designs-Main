import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { resolveDeployTarget } from '../src/lib/deploy-target.js';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

test('deploy targets default to GitHub, explicitly select Cloudflare and reject mistakes', () => {
  assert.deepEqual(resolveDeployTarget(), resolveDeployTarget({ DEPLOY_TARGET: 'github' }));
  assert.equal(resolveDeployTarget().base, '/Khatwa-Designs-Main/');
  assert.equal(resolveDeployTarget().origin, 'https://m-elmaghawry.github.io');
  const preview = resolveDeployTarget({ DEPLOY_TARGET: 'cloudflare-preview' });
  assert.equal(preview.base, '/');
  assert.equal(preview.preview, true);
  assert.equal(preview.seoOrigin + preview.seoBase, 'https://m-elmaghawry.github.io/Khatwa-Designs-Main/');
  assert.throws(() => resolveDeployTarget({ DEPLOY_TARGET: 'cloudflare' }), /Unknown/);
});

test('production stays locked; simulated verified config uses only the future domain', () => {
  for (const value of [undefined, '', 'false', '1']) {
    assert.throws(() => resolveDeployTarget({ DEPLOY_TARGET: 'cloudflare-production', KHATWA_PRODUCTION_VERIFIED: value }), /Production is locked/);
  }
  // Pure configuration test only. Does not enable a production build or deployment.
  const future = resolveDeployTarget({ DEPLOY_TARGET: 'cloudflare-production', KHATWA_PRODUCTION_VERIFIED: 'true' });
  assert.equal(future.base, '/');
  assert.equal(future.origin, 'https://khatwa-designs.com');
  assert.equal(future.seoOrigin, future.origin);
  assert.equal(future.seoBase, '/');
  assert.equal(future.preview, false);
  execFileSync(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    import { indexableRoutes, SITE_URL, SOCIAL_IMAGE } from './src/lib/metadata.js';
    assert.equal(SITE_URL, 'https://khatwa-designs.com/');
    assert.ok(SOCIAL_IMAGE.url.startsWith(SITE_URL));
    const routes = indexableRoutes();
    assert.equal(routes.length, 25);
    for (const {metadata} of routes) {
      assert.ok(metadata.canonical.startsWith(SITE_URL));
      assert.equal(metadata.openGraph['og:url'], metadata.canonical);
      for (const url of Object.values(metadata.alternates)) assert.ok(url.startsWith(SITE_URL));
      assert.ok(!JSON.stringify(metadata.jsonLd).includes('github.io'));
    }
  `], { cwd: new URL('../', import.meta.url), env: { ...process.env, DEPLOY_TARGET: 'cloudflare-production', KHATWA_PRODUCTION_VERIFIED: 'true' }, stdio: 'pipe' });
});

test('an actual unverified production build fails before touching dist', () => {
  const file = new URL('../dist/index.html', import.meta.url);
  const before = fs.readFileSync(file);
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], {
    cwd: new URL('../', import.meta.url), env: { ...process.env, DEPLOY_TARGET: 'cloudflare-production', KHATWA_PRODUCTION_VERIFIED: '' }, encoding: 'utf8'
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Production is locked/);
  assert.deepEqual(fs.readFileSync(file), before);
});

for (const target of ['github', 'cloudflare-preview']) {
  test(`${target}: Node path helpers preserve assets, language, queries and fragments`, () => {
    const source = `
      import assert from 'node:assert/strict';
      import { SITE_BASE as base, assetUrl, languageHref, routeFile } from './src/lib/paths.js';
      import { metadataFor, indexableRoutes } from './src/lib/metadata.js';
      for (const value of ['images/khatwa-logo.png', '/images/khatwa-logo.png', '/Khatwa-Designs-Main/images/khatwa-logo.png']) assert.equal(assetUrl(value), base + 'images/khatwa-logo.png');
      for (const value of ['https://example.test/a', 'data:image/png;base64,a', 'mailto:a@example.test', 'tel:123', '#details']) assert.equal(assetUrl(value), value);
      assert.equal(languageHref('contact.html?lang=ar&service=brand#details', 'en'), base + 'en/contact.html?service=brand#details');
      assert.equal(languageHref(base + 'en/about.html?retry=1#details', 'ar'), base + 'about.html?retry=1#details');
      assert.equal(routeFile(base + 'en/about.html'), 'about.html');
      assert.equal(routeFile(base), 'index.html');
      const metadata = metadataFor('about.html', 'en');
      assert.equal(metadata.canonical, 'https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/about.html');
      assert.equal(metadata.robots, ${JSON.stringify(target === 'github' ? 'index,follow' : 'noindex,nofollow')});
      assert.equal(indexableRoutes().length, ${target === 'github' ? 25 : 0});
    `;
    execFileSync(process.execPath, ['--input-type=module', '-e', source], {
      cwd: new URL('../', import.meta.url), env: { ...process.env, DEPLOY_TARGET: target }, stdio: 'pipe'
    });
  });
}
