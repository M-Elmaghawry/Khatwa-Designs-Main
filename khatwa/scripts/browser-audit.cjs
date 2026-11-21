// Run after npm run build and npm run preview:
// playwright-cli -s=khatwa-audit run-code --filename=khatwa/scripts/browser-audit.cjs
// No form submission; outbound EmailJS requests are blocked.
async page => {
  const base = 'http://127.0.0.1:4173/Khatwa-Designs-Main/';
  const routes = ['index.html', 'about.html', 'services.html', 'company-portfolio.html', 'powerpoint-presentations.html', 'web-design.html', 'brand-identity.html', 'social-media-design.html', 'portfolio.html', 'customer-stories.html', 'contact.html', 'privacy-policy.html', 'terms-and-conditions.html', 'copyright.html', 'thank-you.html', '404.html'];
  const failures = [], errors = [], localResponses = [];
  const onError = error => errors.push(error.message);
  const onResponse = response => { if (response.url().startsWith(base) && response.status() >= 400) localResponses.push({ url: response.url(), status: response.status() }); };
  const blockSend = route => route.abort();
  page.on('pageerror', onError);
  page.on('response', onResponse);
  await page.route('https://api.emailjs.com/**', blockSend);
  let checked = 0;
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const language of ['ar', 'en']) {
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        for (const file of routes) {
          await page.goto(base + (language === 'en' ? 'en/' : '') + file + '?lang=' + language);
          await page.locator('main h1').waitFor();
          const result = await page.evaluate(async () => {
            const images = [...document.querySelectorAll('main img, header img, footer img')];
            await Promise.all(images.map(async image => { image.loading = 'eager'; try { await image.decode(); } catch {} }));
            return {
              direction: document.documentElement.dir,
              h1s: document.querySelectorAll('main h1').length,
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              broken: images.filter(image => !image.naturalWidth).map(image => image.src)
            };
          });
          checked++;
          if (result.h1s !== 1 || result.direction !== (language === 'ar' ? 'rtl' : 'ltr') || result.overflow || result.broken.length) failures.push({ file, language, width, ...result });
          if (language === 'ar' && ['index.html', 'portfolio.html'].includes(file)) await page.screenshot({ path: `.local-backup/audit-${file.replace('.html', '')}-${width}.png`, fullPage: false });
        }
      }
    }
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(base + 'portfolio.html');
    await page.locator('.menu-toggle').click();
    const mobileMenu = await page.locator('.menu-toggle').getAttribute('aria-expanded');
    await page.locator('.inner-filters [data-filter="websites"]').click();
    const filteredProjects = await page.locator('.work-item').count();
    await page.goto(base + 'services.html');
    await page.locator('.menu-toggle').click();
    await page.locator('.service-navigation summary').click();
    const dropdown = await page.locator('.service-navigation').getAttribute('open') !== null;
    return { checked, failures, errors, localResponses, interactions: { mobileMenu, filteredProjects, dropdown } };
  } finally {
    page.off('pageerror', onError);
    page.off('response', onResponse);
    await page.unroute('https://api.emailjs.com/**', blockSend);
  }
}
