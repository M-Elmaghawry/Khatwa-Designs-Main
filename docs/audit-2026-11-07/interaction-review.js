async page => {
  const checks=[];
  await page.route('**/*',route=>route.request().method()==='GET'?route.continue():route.abort());
  for(const lang of ['ar','en']) {
    await page.goto(`http://127.0.0.1:4173/index.html?lang=${lang}`,{waitUntil:'domcontentloaded'});
    for(const width of [320,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      await page.waitForTimeout(250);
      checks.push(await page.evaluate(()=>({type:'responsive',lang:document.documentElement.lang,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,languageButtons:[...document.querySelectorAll('[data-lang]')].filter(e=>e.getBoundingClientRect().width>0&&getComputedStyle(e).visibility!=='hidden').map(e=>({text:e.innerText,...(()=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height}})()})),headerHeight:document.querySelector('header').getBoundingClientRect().height})));
    }
  }
  await page.goto('http://127.0.0.1:4173/index.html?lang=ar',{waitUntil:'domcontentloaded'});
  await page.setViewportSize({width:1440,height:900});
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  checks.push(await page.locator('#services [data-khatwa-reveal]').evaluateAll(els=>({type:'service-reveal',cards:els.map(e=>({opacity:getComputedStyle(e).opacity,classes:e.className,rect:e.getBoundingClientRect().toJSON()}))})));
  await page.screenshot({path:'docs/audit-2026-11-07/services-visible-1440.png'});
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'docs/audit-2026-11-07/home-header-1440.png'});
  await page.setViewportSize({width:390,height:844});
  await page.locator('header .navbar-toggler').click();
  await page.waitForTimeout(700);
  checks.push(await page.evaluate(()=>({type:'menu-open',expanded:document.querySelector('.navbar-toggler').getAttribute('aria-expanded'),bodyOverflow:getComputedStyle(document.body).overflow,active:document.activeElement.outerHTML.slice(0,250),text:document.querySelector('.navbar-modern-inner')?.innerText})));
  await page.screenshot({path:'docs/audit-2026-11-07/menu-ar-390.png'});
  await page.keyboard.press('Escape');
  checks.push(await page.evaluate(()=>({type:'menu-escape',expanded:document.querySelector('.navbar-toggler').getAttribute('aria-expanded'),bodyClass:document.body.className})));
  await page.goto('http://127.0.0.1:4173/portfolio.html?lang=ar',{waitUntil:'domcontentloaded'});
  for(const filter of ['all','websites','brand','social']) {
    await page.locator(`[data-filter="${filter}"]`).click();
    checks.push(await page.evaluate(()=>({type:'filter',active:[...document.querySelectorAll('[data-filter]')].filter(e=>e.getAttribute('aria-pressed')==='true').map(e=>e.dataset.filter),visible:[...document.querySelectorAll('.work-item')].filter(e=>e.getBoundingClientRect().height>0).map(e=>e.dataset.cat)})));
  }
  await page.goto('http://127.0.0.1:4173/contact.html?lang=ar',{waitUntil:'domcontentloaded'});
  const requests=[];
  page.on('request',r=>requests.push({method:r.method(),url:r.url()}));
  await page.locator('[name="name"]').fill('Local audit test');
  await page.locator('[name="email"]').fill('audit@example.invalid');
  await page.locator('#projectDetails').fill('Local verification only');
  await page.locator('#contact-form .submit').click();
  await page.waitForTimeout(500);
  checks.push({type:'form-submit',requests,state:await page.locator('#contact-form').evaluate(e=>({text:e.querySelector('.form-results').textContent,classes:e.querySelector('.form-results').className,name:e.querySelector('[name="name"]').value}))});
  await page.screenshot({path:'docs/audit-2026-11-07/form-result-ar-390.png'});
  return checks;
}
