async page => {
    const checks = [];
    await page.evaluate(() => localStorage.setItem('khatwa_lang', 'en'));
    for (const [path, expected] of [['index.html', 'ar'], ['contact.html', 'ar'], ['index.html?lang=en', 'en'], ['index.html?lang=invalid', 'ar']]) {
        await page.goto('http://127.0.0.1:4173/' + path, { waitUntil: 'domcontentloaded' });
        const state = await page.evaluate(() => ({ lang: document.documentElement.lang, dir: document.documentElement.dir, url: location.search }));
        if (state.lang !== expected || state.dir !== (expected === 'ar' ? 'rtl' : 'ltr')) throw new Error(JSON.stringify({ path, expected, state }));
        checks.push({ path, ...state });
    }
    return checks;
}
