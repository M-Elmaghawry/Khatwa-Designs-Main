// Run with Playwright CLI against npm run preview; never submits a form.
async page => {
  const local = 'http://127.0.0.1:4173/Khatwa-Designs-Main/';
  const production = 'https://m-elmaghawry.github.io/Khatwa-Designs-Main/';
  const failures = [], errors = [];
  const onError = error => errors.push(error.message);
  page.on('pageerror', onError);
  const blockExternal = route => route.request().url().startsWith('http://127.0.0.1:4173/') ? route.continue() : route.abort();
  await page.route('**/*', blockExternal);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const xml = await (await fetch(local + 'sitemap.xml')).text();
  const canonicals = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  const cases = canonicals.map(canonical => ({ input: canonical.replace(production, local), final: canonical.replace(production, local), canonical }));
  for (const language of ['ar', 'en']) {
    const prefix = language === 'en' ? 'en/' : '';
    for (const file of ['index.html', 'about.html', 'contact.html']) cases.push({ input: local + file + '?lang=' + language + '&service=brand#details', final: local + prefix + (file === 'index.html' ? '' : file) + '?service=brand#details', canonical: production + prefix + (file === 'index.html' ? '' : file) });
    for (const [file, target] of [['logo-design.html', 'brand-identity.html'], ['services-details.html', 'services.html'], ['social-media-management.html', 'services.html'], ['video-presentations.html', 'services.html'], ['n8n-ai-automations.html', 'services.html']]) cases.push({ input: local + file + '?lang=' + language + '&service=brand#details', final: local + prefix + target + '?service=brand#details', canonical: production + prefix + target });
    cases.push({ input: local + 'ar/index.html?lang=' + language, final: local + prefix, canonical: production + prefix });
  }
  try {
    for (const entry of cases) {
      try {
        await page.goto(entry.input, { waitUntil: 'domcontentloaded' });
        await page.waitForURL(entry.final);
        await page.locator('main h1').waitFor();
        await page.waitForFunction(expected => document.querySelector('link[rel="canonical"]')?.href === expected, entry.canonical);
        const result = await page.evaluate(() => ({
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          lang: document.documentElement.lang, dir: document.documentElement.dir,
          canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
          schemaCount: document.querySelectorAll('script[type="application/ld+json"]').length,
          ogUrl: document.querySelector('meta[property="og:url"]')?.content
        }));
        const language = entry.canonical.startsWith(production + 'en/') ? 'en' : 'ar';
        if (result.canonical !== entry.canonical || result.ogUrl !== entry.canonical || result.lang !== language || result.dir !== (language === 'ar' ? 'rtl' : 'ltr') || result.canonicalCount !== 1 || result.schemaCount !== 1) failures.push({ entry, result });
      } catch (error) { failures.push({ entry, error: error.message }); }
    }
    // A saved English preference must not change the default URL's language.
    await page.evaluate(() => localStorage.setItem('khatwa_lang', 'en'));
    await page.goto(local, { waitUntil: 'domcontentloaded' });
    await page.locator('main h1').waitFor();
    if (await page.getAttribute('html', 'lang') !== 'ar') failures.push('Saved preference changed the Arabic canonical');
    return { checked: cases.length + 1, failures, errors, externalRequests: 'blocked; no real form submission' };
  } finally {
    page.off('pageerror', onError);
    await page.unroute('**/*', blockExternal);
  }
}
