// Invoke via playwright-cli run-code --filename=react-v2/scripts/phase4-browser-qa.cjs
// Uses only local :4173. EmailJS is intercepted and aborted; no live sends.
async page => {
  const base = 'http://127.0.0.1:4173/Khatwa-Designs-Main/';
  const routes = ['about.html', 'services.html', 'company-portfolio.html', 'powerpoint-presentations.html', 'web-design.html', 'brand-identity.html', 'social-media-design.html', 'portfolio.html', 'customer-stories.html', 'contact.html', 'privacy-policy.html', 'terms-and-conditions.html', 'copyright.html', 'thank-you.html', '404.html'];
  const rows = [], interactions = [], errors = [], failedResources = [];
  const onConsole = message => { if (message.type() === 'error') errors.push(message.text()); };
  const onError = error => errors.push(error.message);
  const onResponse = response => { if (response.status() >= 400 && !response.url().includes('unknown-review')) failedResources.push({ url: response.url(), status: response.status() }); };
  let emailRequests = 0;
  const emailHandler = async route => { emailRequests++; await route.abort(); };
  page.on('console', onConsole); page.on('pageerror', onError); page.on('response', onResponse);
  await page.route('https://api.emailjs.com/**', emailHandler);
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const language of ['ar', 'en']) {
      for (const file of routes) {
        const prefix = language === 'en' ? 'en/' : '';
        await page.goto(base + prefix + file + '?lang=' + language, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(value => document.documentElement.lang === value, language);
        await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 4000))]));
        for (const width of [320, 390, 768, 1024, 1440]) {
          await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
          const measures = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            viewport: innerWidth,
            direction: document.documentElement.dir,
            h1s: document.querySelectorAll('main h1').length,
            title: document.title,
            hiddenWords: [...document.querySelectorAll('.inner-page [data-motion-word]')].filter(element => getComputedStyle(element).opacity !== '1').length,
            imagesReserved: [...document.querySelectorAll('.inner-project img')].every(image => image.width > 0 && image.height > 0),
            formFields: document.querySelectorAll('#contact-form .field').length
          }));
          rows.push({ file, language, width, ...measures });
          const capture = (language === 'ar' && width === 1440 && ['about.html', 'company-portfolio.html', 'services.html'].includes(file))
            || (language === 'en' && width === 1440 && ['portfolio.html', 'contact.html'].includes(file))
            || (language === 'ar' && width === 390 && ['web-design.html', 'customer-stories.html', 'contact.html', '404.html'].includes(file))
            || (language === 'en' && width === 390 && file === 'social-media-design.html')
            || (language === 'ar' && width === 768 && file === 'privacy-policy.html');
          if (capture) {
            for (const image of await page.locator('.inner-project img').all()) await image.scrollIntoViewIfNeeded();
            await page.evaluate(() => Promise.all([...document.querySelectorAll('img')].map(image => image.decode().catch(() => {}))));
            await page.screenshot({ path: `docs/phase4-qa/${file.replace('.html','')}-${language}-${width}.png`, fullPage: true });
          }
        }
      }
      await page.goto(base + (language === 'en' ? 'en/' : '') + 'portfolio.html?lang=' + language);
      for (const [category, expected] of [['profiles', 5], ['presentations', 1], ['websites', 3], ['brand', 2], ['social', 1], ['all', 12]]) {
        await page.locator(`.inner-filters [data-filter="${category}"]`).click();
        interactions.push({ language, category, expected, actual: await page.locator('.work-item').count(), pressed: await page.locator(`.inner-filters [data-filter="${category}"]`).getAttribute('aria-pressed') });
      }
      await page.goto(base + (language === 'en' ? 'en/' : '') + 'contact.html?service=profiles&lang=' + language + '#contact-form');
      await page.locator('#contact-form [type="submit"]').click();
      interactions.push({ language, invalidFocus: await page.evaluate(() => document.activeElement.name), invalid: await page.locator('[name="name"]').getAttribute('aria-invalid') });
      await page.locator('[name="name"]').fill('Local QA');
      const nextLanguage = language === 'ar' ? 'en' : 'ar';
      await page.locator(`.language-switcher [lang="${nextLanguage}"]`).click();
      await page.waitForFunction(value => document.documentElement.lang === value, nextLanguage);
      interactions.push({ languageSwitchFrom: language, actual: await page.locator('html').getAttribute('lang'), preservedName: await page.locator('[name="name"]').inputValue(), selectedService: await page.locator('[name="subject"]').inputValue(), url: page.url() });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + 'about.html?lang=ar');
    await page.locator('.menu-toggle').click();
    interactions.push({ mobileMenuOpen: await page.locator('.menu-toggle').getAttribute('aria-expanded') });
    await page.locator('.navigation > li > a[href*="/services.html"]').click();
    await page.waitForURL('**/services.html?lang=ar');
    interactions.push({ mobileMenuClosedAfterNavigation: await page.locator('.menu-toggle').getAttribute('aria-expanded') });
    await page.goto(base + 'portfolio.html?lang=ar');
    await page.locator('.inner-filters [data-filter="websites"]').focus();
    await page.keyboard.press('Enter');
    await page.locator('.inner-project-link').first().focus();
    interactions.push({ keyboardFilterProjects: await page.locator('.work-item').count(), focusOutline: await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle) });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(base + 'company-portfolio.html?lang=ar');
    await page.locator('.inner-faq').evaluate(element => element.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(900);
    await page.screenshot({ path: 'docs/phase4-qa/faq-ar-mobile-motion.png' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    interactions.push({ afterReducedMotion: await page.evaluate(() => [...document.querySelectorAll('.inner-page [data-motion-word]')].every(element => getComputedStyle(element).opacity === '1')) });
    for (const [from, to] of [['logo-design.html','brand-identity.html'], ['services-details.html','services.html'], ['social-media-management.html','services.html'], ['video-presentations.html','services.html'], ['n8n-ai-automations.html','services.html']]) {
      await page.goto(base + from + '?lang=en&review=1#scope');
      await page.waitForURL(url => url.pathname.endsWith('/' + to));
      interactions.push({ redirect: from, expected: to, actual: page.url() });
    }
    const unknown = await page.goto(base + 'unknown-review.html?lang=ar');
    interactions.push({ unknownStatus: unknown.status(), unknownHasHeading: await page.locator('main h1').count() });
    const context = await page.context().browser().newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
    try {
      const touch = await context.newPage();
      await touch.goto(base + 'portfolio.html?lang=ar');
      await touch.locator('.inner-filters [data-filter="brand"]').tap();
      interactions.push({ touchFilterProjects: await touch.locator('.work-item').count(), touchCTA: await touch.locator('.inner-project-action').first().isVisible() });
    } finally { await context.close(); }
    const staticContext = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    try {
      const staticPage = await staticContext.newPage();
      for (const file of ['about.html', 'portfolio.html', 'contact.html', 'privacy-policy.html']) {
        await staticPage.goto(base + file);
        interactions.push({ noJS: file, h1: await staticPage.locator('main h1').count(), textLength: (await staticPage.locator('main').textContent()).length, projectLinks: await staticPage.locator('.inner-project-link').count() });
      }
    } finally { await staticContext.close(); }
    return { rows, interactions, emailRequests, errors, failedResources };
  } finally {
    page.off('console', onConsole); page.off('pageerror', onError); page.off('response', onResponse);
    await page.unroute('https://api.emailjs.com/**', emailHandler);
  }
}
