async page=>{
 const checks=[];
 const check=(name,pass,detail)=>checks.push({name,pass,detail});
 const context=await page.context().browser().newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 const touch=await context.newPage();
 try {
  await touch.goto('http://127.0.0.1:4173/index.html?lang=ar',{waitUntil:'domcontentloaded'});
  await touch.locator('header .navbar-toggler').tap();
  await touch.waitForTimeout(800);
  await touch.locator('.navbar-modern-inner .services-toggle').tap();
  await touch.waitForTimeout(250);
  const style=await touch.locator('.navbar-modern-inner .dropdown-menu a').first().evaluate(e=>({color:getComputedStyle(e).color,opacity:getComputedStyle(e).opacity,background:getComputedStyle(e.closest('.dropdown-menu')).backgroundColor}));
  check('touch-open-submenu-contrast',style.color==='rgb(255, 255, 255)'&&style.opacity==='1'&&style.background==='rgb(22, 35, 64)',style);
  await touch.screenshot({path:'docs/audit-2026-11-07/after/menu-services-ar.png'});
  await touch.locator('.navbar-modern-inner a[href*="company-portfolio.html"]').tap();
  await touch.waitForURL('**/company-portfolio.html?lang=ar');
  check('touch-service-navigation',touch.url().includes('company-portfolio.html?lang=ar'));
 } finally {await context.close();}
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:4173/index.html?lang=ar',{waitUntil:'domcontentloaded'});
 await page.locator('header .navbar-toggler').click();
 await page.waitForTimeout(750);
 await page.locator('.navbar-modern-inner [data-lang=en]').click();
 check('language-switch-in-menu',await page.evaluate(()=>document.documentElement.lang==='en'&&document.querySelector('.navbar-modern-inner .nav-link').textContent==='Home'));
 await page.setViewportSize({width:1440,height:900});
 await page.waitForTimeout(800);
 check('resize-releases-focus',await page.evaluate(()=>!document.querySelector('main').inert&&!document.body.classList.contains('navbar-collapse-show')));
 await page.goto('http://127.0.0.1:4173/contact.html?lang=ar',{waitUntil:'domcontentloaded'});
 await page.keyboard.press('Tab');
 check('skip-link-first',await page.evaluate(()=>document.activeElement.matches('.khatwa-skip-link')));
 await page.keyboard.press('Enter');
 check('skip-focuses-main',await page.evaluate(()=>document.activeElement.id==='main-content'));
 await page.locator('[name=name]').fill('Local test');
 await page.locator('[name=email]').fill('incorrect');
 await page.locator('#contact-form button[type=submit]').click();
 check('email-error-announced',await page.locator('[name=email]').getAttribute('aria-invalid')==='true'&&await page.locator('#exampleInputEmail2-error').isVisible());
 await page.locator('header .header-icon [data-lang=en]').click();
 check('error-translates',await page.locator('#exampleInputEmail2-error').textContent()==='Enter a valid email address, such as name@company.com.');
 check('input-preserved-across-language',await page.locator('[name=name]').inputValue()==='Local test');
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'docs/audit-2026-11-07/after/contact-validation-en.png',fullPage:true});
 return {total:checks.length,failed:checks.filter(c=>!c.pass),checks};
}
