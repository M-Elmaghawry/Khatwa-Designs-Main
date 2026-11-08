// Run through playwright-cli run-code --filename=react-v2/scripts/homepage-browser-qa.cjs
// Requires the local static preview on :4173. No form submission or external messages.
async page => {
  const base = 'http://127.0.0.1:4173/Khatwa-Designs-Main/';
  const errors = [];
  const failedResponses = [];
  const consoleHandler = message => { if (message.type() === 'error') errors.push(message.text()); };
  const errorHandler = error => errors.push(error.message);
  const responseHandler = response => { if (response.status() >= 400) failedResponses.push({ url: response.url(), status: response.status() }); };
  page.on('console', consoleHandler);
  page.on('pageerror', errorHandler);
  page.on('response', responseHandler);
  const rows = [];
  const interactions = [];
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const language of ['ar', 'en']) {
      await page.goto(base + (language === 'en' ? 'en/' : '') + '?lang=' + language);
      await page.evaluate(() => document.fonts.ready);
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
        const result = await page.evaluate(() => ({
          viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          direction: document.documentElement.dir,
          sections: document.querySelectorAll('.home-page > section').length,
          h1s: document.querySelectorAll('h1').length,
          projects: document.querySelectorAll('.home-project').length,
          imageDimensions: [...document.querySelectorAll('.home-project img')].every(image => image.width > 0 && image.height > 0),
          marquee: getComputedStyle(document.querySelector('.marquee-track')).animationName,
          hiddenWords: [...document.querySelectorAll('[data-motion-word]')].filter(word => getComputedStyle(word).opacity !== '1').length
        }));
        rows.push({ language, width, ...result });
        if (width === 390 || width === 1440) {
          // Scroll through lazy images before capturing a complete static page.
          for (const image of await page.locator('.home-project img').all()) await image.scrollIntoViewIfNeeded();
          await page.evaluate(() => Promise.all([...document.querySelectorAll('img')].map(image => image.decode().catch(() => {}))));
          await page.screenshot({ path: `docs/qa/home-${language}-${width}.png`, fullPage: true });
        }
      }
      for (const [category, expected] of [['profiles', 4], ['websites', 1], ['presentations', 1], ['all', 6]]) {
        await page.locator(`.home-work-filters [data-filter="${category}"]`).click();
        interactions.push({ language, category, expected, actual: await page.locator('.home-project').count() });
      }
      const nextLanguage = language === 'ar' ? 'en' : 'ar';
      await page.locator('.language-switcher [lang="' + nextLanguage + '"]').click();
      await page.waitForFunction(value => document.documentElement.lang === value, nextLanguage);
      interactions.push({ languageSwitchFrom: language, actual: await page.locator('html').getAttribute('lang') });
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(base + '?lang=ar');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#work').evaluate(element => element.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: 'docs/qa/work-ar-desktop.png' });
    await page.locator('#why-khatwa').evaluate(element => element.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(1000);
    await page.locator('.marquee-pause').click();
    interactions.push({ marqueePaused: await page.locator('.marquee-pause').getAttribute('aria-pressed') });
    await page.screenshot({ path: 'docs/qa/why-ar-desktop.png' });
    // Keyboard traversal starts at the skip link, then the section controls.
    await page.goto(base + '?lang=ar');
    await page.keyboard.press('Tab');
    interactions.push({ firstTab: await page.evaluate(() => document.activeElement.className) });
    await page.keyboard.press('Enter');
    interactions.push({ skipTarget: await page.evaluate(() => document.activeElement.id) });
    await page.locator('.home-work-filters [data-filter="websites"]').focus();
    await page.keyboard.press('Enter');
    interactions.push({ keyboardFilterProjects: await page.locator('.home-project').count() });
    await page.locator('.home-project-link').focus();
    interactions.push({ projectFocus: await page.evaluate(() => ({
      element: document.activeElement.className,
      outline: getComputedStyle(document.activeElement).outlineStyle,
      width: getComputedStyle(document.activeElement).outlineWidth,
      visible: document.activeElement.getBoundingClientRect().width > 0
    })) });
    // Touch layout: the complete project link/title/CTA remains present.
    const context = await page.context().browser().newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    try {
      const touch = await context.newPage();
      await touch.goto(base + '?lang=ar');
      await touch.locator('.home-work-filters [data-filter="websites"]').tap();
      interactions.push({ touchProjects: await touch.locator('.home-project').count(), touchCTAVisible: await touch.locator('.home-project-cta').isVisible() });
    } finally { await context.close(); }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    interactions.push({ reducedMotionAfterToggle: await page.locator('.marquee-track').evaluate(element => getComputedStyle(element).animationName) });
    // Check static default Arabic with JavaScript disabled, from prerendered HTML.
    const staticContext = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    try {
      const staticPage = await staticContext.newPage();
      await staticPage.goto(base);
      interactions.push({ noJS: { headings: await staticPage.locator('.home-page h2').count(), projectLinks: await staticPage.locator('.home-project-link').count(), title: await staticPage.title() } });
    } finally { await staticContext.close(); }
    return { rows, interactions, errors, failedResponses };
  } finally {
    page.off('console', consoleHandler);
    page.off('pageerror', errorHandler);
    page.off('response', responseHandler);
  }
}
