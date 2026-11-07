async page => {
 const checks=[],errors=[];
 const check=(name,pass,detail)=>checks.push({name,pass,detail});
 page.on('pageerror',e=>errors.push(e.message));
 const config={serviceId:'test_service',templateId:'test_template',publicKey:'test_public'};
 async function fill(){
  await page.locator('[name=name]').fill('Local verification');
  await page.locator('[name=email]').fill('audit@example.design');
  await page.locator('[name=comment]').fill('Test data — never sent to a real email service.');
 }
 for(const lang of ['ar','en']) {
  for(const outcome of ['success','error']) {
   await page.setViewportSize({width:1440,height:900});
   await page.goto(`http://127.0.0.1:4173/contact.html?lang=${lang}`,{waitUntil:'domcontentloaded'});
   await page.evaluate(c=>window.KhatwaEmailJSConfig=c,config);
   let count=0,body;
   await page.route('https://api.emailjs.com/**',async route=>{
    count++;body=route.request().postDataJSON();
    await new Promise(r=>setTimeout(r,350));
    await route.fulfill({status:outcome==='success'?200:422,contentType:'text/plain',body:outcome==='success'?'OK':'Rejected'});
   });
   await fill();
   await page.locator('#contact-form button[type=submit]').click();
   check(`pending-${lang}-${outcome}`,await page.locator('#contact-form button[type=submit]').isDisabled());
   await page.waitForURL(`**/thank-you.html?status=${outcome}&lang=${lang}`);
   const state=await page.evaluate(()=>({lang:document.documentElement.lang,dir:document.documentElement.dir,state:document.body.dataset.contactResult,title:document.querySelector('h1').textContent,text:document.querySelector('[data-contact-result-text]').textContent,action:document.querySelector('[data-contact-result-action]').textContent,href:document.querySelector('[data-contact-result-action]').getAttribute('href'),draft:sessionStorage.getItem('khatwa_contact_retry')}));
   check(`redirect-${lang}-${outcome}`,state.lang===lang&&state.state===outcome&&count===1,state);
   check(`payload-${lang}-${outcome}`,body.template_params.name==='Local verification'&&body.template_params.email==='audit@example.design'&&body.service_id===config.serviceId);
   check(`copy-${lang}-${outcome}`,state.title===(lang==='ar'?(outcome==='success'?'تم إرسال رسالتك بنجاح':'فشل الإرسال'):(outcome==='success'?'Your message was sent successfully':'Message not sent')));
   for(const width of [1440,390,320]) {
    await page.setViewportSize({width,height:width<768?844:900});
    await page.waitForTimeout(350);
    check(`layout-${lang}-${outcome}-${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(width!==320) await page.screenshot({path:`docs/contact-result-check/${lang}-${outcome}-${width}.png`,fullPage:true});
   }
   if(outcome==='success') check(`clear-draft-${lang}`,state.draft===null);
   else {
    await page.locator('[data-contact-result-action]').click();
    await page.waitForURL(`**/contact.html?lang=${lang}&retry=1*`);
    check(`retry-data-${lang}`,await page.locator('[name=name]').inputValue()==='Local verification'&&await page.locator('[name=comment]').inputValue()==='Test data — never sent to a real email service.');
   }
   await page.unroute('https://api.emailjs.com/**');
  }
 }
 await page.setViewportSize({width:1440,height:900});
 await page.goto('http://127.0.0.1:4173/contact.html?lang=ar',{waitUntil:'domcontentloaded'});
 let sent=0;
 await page.route('https://api.emailjs.com/**',r=>{sent++;return r.abort();});
 await page.locator('#contact-form button[type=submit]').click();
 check('invalid-stays-on-form',page.url().includes('contact.html')&&await page.locator('[aria-invalid=true]').count()===2);
 await fill();
 await page.locator('#contact-form button[type=submit]').click();
 await page.waitForURL('**/thank-you.html?status=error&lang=ar');
 check('missing-config-fails-without-request',sent===0);
 await page.unroute('https://api.emailjs.com/**');
 await page.locator('header .header-icon [data-lang=en]').click();
 check('result-language-switch',await page.locator('h1').textContent()==='Message not sent'&&(await page.locator('[data-contact-result-action]').getAttribute('href')).includes('lang=en'));
 await page.goto('http://127.0.0.1:4173/contact.html?lang=en',{waitUntil:'domcontentloaded'});
 await page.evaluate(c=>window.KhatwaEmailJSConfig=c,config);
 await page.route('https://api.emailjs.com/**',r=>r.abort());
 await fill();
 await page.locator('#contact-form button[type=submit]').click();
 await page.waitForURL('**/thank-you.html?status=error&lang=en');
 check('network-failure-routes-to-error',await page.locator('h1').textContent()==='Message not sent');
 await page.unroute('https://api.emailjs.com/**');
 await page.goto('http://127.0.0.1:4173/thank-you.html?lang=ar',{waitUntil:'domcontentloaded'});
 check('direct-visit-no-false-success',await page.evaluate(()=>document.body.dataset.contactResult==='neutral'));
 check('no-javascript-errors',errors.length===0,errors);
 return {total:checks.length,failed:checks.filter(c=>!c.pass),checks};
}
