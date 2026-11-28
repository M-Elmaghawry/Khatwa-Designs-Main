// Open the selected local preview URL, then run via playwright-cli run-code.
async page => {
  const localOrigin = 'http://127.0.0.1:4173';
  const base = page.url().includes('/Khatwa-Designs-Main/') ? '/Khatwa-Designs-Main/' : '/';
  const preview = base === '/';
  const failures = [], errors = [], failedAssets = [];
  const responses = new Set();
  const onError = error => errors.push(error.message);
  const onResponse = response => {
    if (!response.url().startsWith(localOrigin)) return;
    responses.add(response.url());
    if (response.status() >= 400) failedAssets.push({ url: response.url(), status: response.status() });
  };
  page.on('pageerror', onError);
  page.on('response', onResponse);
  const blockSend = route => route.abort();
  await page.route('https://api.emailjs.com/**', blockSend);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  let checked = 0;
  try {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const language of ['ar', 'en']) for (const file of ['index.html', 'about.html', 'services.html', 'portfolio.html', 'contact.html']) {
        await page.goto(localOrigin + base + (language === 'en' ? 'en/' : '') + file, { waitUntil: 'networkidle' });
        await page.locator('main h1').waitFor();
        const result = await page.evaluate(async () => {
          const images = [...document.querySelectorAll('header img, main img')];
          await Promise.all(images.map(async img => { img.loading = 'eager'; try { await img.decode(); } catch {} }));
          return {
            language: document.documentElement.lang,
            dir: document.documentElement.dir,
            styles: [...document.styleSheets].filter(sheet => sheet.href?.startsWith(location.origin) && sheet.cssRules.length > 0).length,
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            robots: document.querySelector('meta[name="robots"]')?.content,
            alternates: document.querySelectorAll('link[hreflang]').length,
            brokenImages: images.filter(img => !img.naturalWidth).map(img => img.src)
          };
        });
        const canonical = 'https://m-elmaghawry.github.io/Khatwa-Designs-Main/' + (language === 'en' ? 'en/' : '') + (file === 'index.html' ? '' : file);
        if (result.language !== language || result.dir !== (language === 'ar' ? 'rtl' : 'ltr') || !result.styles || result.canonical !== canonical || result.brokenImages.length || (preview && (result.robots !== 'noindex,nofollow' || result.alternates))) failures.push({ file, language, width, result });
        checked++;
      }
    }
    for (const language of ['ar', 'en']) {
      await page.goto(localOrigin + base + 'logo-design.html?lang=' + language + '&service=brand#details');
      await page.waitForURL(localOrigin + base + (language === 'en' ? 'en/' : '') + 'brand-identity.html?service=brand#details');
      await page.locator('main h1').waitFor();
      checked++;
    }
    // A real client-side navigation and locale switch verify the browser bundle's target.
    await page.goto(localOrigin + base + 'about.html');
    await page.locator('.language-switcher [lang="en"]').click();
    await page.waitForURL(localOrigin + base + 'en/about.html');
    await page.waitForFunction(() => document.documentElement.lang === 'en');
    const state = await page.evaluate(() => ({ canonical: document.querySelector('link[rel="canonical"]').href, robots: document.querySelector('meta[name="robots"]').content, links: [...document.querySelectorAll('nav a[href]')].map(a => a.getAttribute('href')) }));
    if (state.canonical !== 'https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/about.html' || (preview && state.robots !== 'noindex,nofollow') || !state.links.some(href => href === base + 'en/contact.html')) failures.push({ state });
    checked++;
    return { target: preview ? 'cloudflare-preview' : 'github', checked, localResponses: responses.size, failures, errors, failedAssets };
  } finally {
    page.off('pageerror', onError);
    page.off('response', onResponse);
    await page.unroute('https://api.emailjs.com/**', blockSend);
  }
}
