async page => {
 const checks=[],errors=[];
 const check=(name,pass,detail)=>checks.push({name,pass,detail});
 page.on('pageerror',e=>errors.push({url:page.url(),message:e.message}));
 const pages=['index','services','portfolio','company-portfolio','powerpoint-presentations','web-design','brand-identity','social-media-design','contact','about','customer-stories','privacy-policy','terms-and-conditions','copyright'];
 for(const name of pages) for(const lang of ['ar','en']) {
  await page.goto(`http://127.0.0.1:4173/${name}.html?lang=${lang}`,{waitUntil:'domcontentloaded'});
  for(const width of [320,390,768,1024,1440]) {
   await page.setViewportSize({width,height:width<768?844:900});
   await page.waitForTimeout(80);
   const state=await page.evaluate(()=>({lang:document.documentElement.lang,dir:document.documentElement.dir,width:innerWidth,scroll:document.documentElement.scrollWidth,main:document.querySelectorAll('main#main-content').length,skip:!!document.querySelector('.khatwa-skip-link'),navy:getComputedStyle(document.documentElement).getPropertyValue('--base-color').trim(),yellow:getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim(),visibleLanguage:[...document.querySelectorAll('header [data-lang]')].filter(e=>e.getBoundingClientRect().width>0).length,badImages:[...document.images].filter(i=>i.loading!=='lazy'&&i.complete&&!i.naturalWidth).map(i=>i.src)}));
   check(`${name}/${lang}/${width}`,state.lang===lang&&state.scroll<=width&&state.main===1&&state.skip&&state.navy==='#1C3664'&&state.yellow==='#FFCD05'&&(width<1200||state.visibleLanguage===2)&&!state.badImages.length,state);
  }
  if(lang==='ar'&&['index','portfolio','services','contact'].includes(name)) {
   for(const width of [1440,390]) {
    await page.setViewportSize({width,height:width===1440?900:844});
    await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=550){scrollTo(0,y);await new Promise(r=>setTimeout(r,320));}scrollTo(0,0);});
    await page.waitForTimeout(650);
    check(`project-images/${name}/${width}`,await page.locator('.khatwa-project-cover img').evaluateAll(es=>es.every(e=>e.complete&&e.naturalWidth>0)));
    await page.screenshot({path:`docs/audit-2026-11-07/after/${name}-${width}.png`,fullPage:true});
   }
  }
 }
 for(const lang of ['ar','en']) {
  await page.setViewportSize({width:390,height:844});
  await page.goto(`http://127.0.0.1:4173/index.html?lang=${lang}`,{waitUntil:'domcontentloaded'});
  await page.locator('header .navbar-toggler').click();
  await page.waitForTimeout(900);
  const state=await page.evaluate(()=>{const m=document.querySelector('.navbar-modern-inner');return {rect:m.getBoundingClientRect().toJSON(),background:getComputedStyle(m).backgroundColor,modal:m.getAttribute('aria-modal'),expanded:document.querySelector('header .navbar-toggler').getAttribute('aria-expanded'),focus:document.activeElement.className,mainInert:document.querySelector('main').inert,foreground:!!document.elementFromPoint(innerWidth/2,250)?.closest('.navbar-modern-inner')};});
  check(`menu/${lang}`,state.rect.x===0&&state.background==='rgb(28, 54, 100)'&&state.modal==='true'&&state.expanded==='true'&&state.mainInert&&state.foreground,state);
  await page.screenshot({path:`docs/audit-2026-11-07/after/menu-${lang}.png`});
  await page.locator('.navbar-modern-inner .services-toggle').click();
  await page.waitForTimeout(300);
  check(`menu-services/${lang}`,await page.locator('.navbar-modern-inner .dropdown-menu').evaluate(e=>getComputedStyle(e).display!=='none'));
  await page.screenshot({path:`docs/audit-2026-11-07/after/menu-services-${lang}.png`});
  await page.locator('.navbar-modern-inner .services-toggle').click();
  await page.keyboard.press('Shift+Tab');
  check(`menu-focus-wrap/${lang}`,await page.evaluate(()=>!!document.activeElement.closest('.navbar-modern-inner')));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(700);
  check(`menu-close/${lang}`,await page.evaluate(()=>!document.querySelector('main').inert&&document.activeElement.matches('header .navbar-toggler')&&!document.body.classList.contains('navbar-collapse-show')));
 }
 await page.setViewportSize({width:1440,height:900});
 await page.goto('http://127.0.0.1:4173/index.html?lang=ar',{waitUntil:'domcontentloaded'});
 await page.locator('header .services-toggle').focus();
 await page.keyboard.press('Enter');
 await page.waitForTimeout(300);
 check('desktop-dropdown-keyboard',await page.locator('header .services-toggle').getAttribute('aria-expanded')==='true');
 await page.goto('http://127.0.0.1:4173/company-portfolio.html?lang=ar',{waitUntil:'domcontentloaded'});
 check('contextual-quote',(await page.locator('section a.btn[href*="contact.html"]').first().getAttribute('href')).includes('service=profiles'));
 await page.goto('http://127.0.0.1:4173/portfolio.html?lang=ar',{waitUntil:'domcontentloaded'});
 for(const [filter,count] of [['all',12],['websites',3],['brand',2],['social',1]]) {
  await page.locator(`[data-filter=${filter}]`).click();
  check(`filter/${filter}`,await page.locator('.work-item:visible').count()===count);
 }
 await page.goto('http://127.0.0.1:4173/contact.html?lang=ar&service=profiles',{waitUntil:'domcontentloaded'});
 check('service-preselected',await page.locator('#serviceNeed').inputValue()==='Company portfolio');
 const nonGet=[];
 await page.route('**/*',r=>{if(r.request().method()!=='GET'){nonGet.push(r.request().url());return r.abort();}return r.continue();});
 await page.locator('#contact-form button[type=submit]').click();
 check('required-field-errors',await page.locator('#contact-form [aria-invalid=true]').count()===2);
 await page.locator('[name=name]').fill('Local audit');
 await page.locator('[name=email]').fill('audit@example.design');
 await page.locator('[name=comment]').fill('Local test, do not send.');
 await page.locator('#contact-form button[type=submit]').click();
 check('unconfigured-form-truthful',await page.evaluate(()=>({message:document.querySelector('.form-results').textContent,preserved:document.querySelector('[name=name]').value,errors:document.querySelectorAll('#contact-form [aria-invalid=true]').length})).then(s=>s.preserved==='Local audit'&&s.errors===0&&s.message.includes('تعذر')));
 check('no-outgoing-form-requests',nonGet.length===0,nonGet);
 await page.screenshot({path:'docs/audit-2026-11-07/after/form-error.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:4173/index.html?lang=ar',{waitUntil:'domcontentloaded'});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload({waitUntil:'domcontentloaded'});
 check('reduced-motion-content-visible',await page.locator('[data-khatwa-reveal]').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1')));
 await page.emulateMedia({reducedMotion:'no-preference'});
 check('no-js-errors',errors.length===0,errors);
 return {total:checks.length,failed:checks.filter(c=>!c.pass),checks};
}
