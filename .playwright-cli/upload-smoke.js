async page=>{
 const checks=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const check=(name,pass)=>{checks.push({name,pass});if(!pass)throw new Error(name);};
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:4173/index.html',{waitUntil:'domcontentloaded'});
 check('Arabic default',await page.evaluate(()=>document.documentElement.lang==='ar'));
 await page.locator('header .navbar-toggler').click();
 await page.waitForTimeout(800);
 check('Mobile menu',await page.locator('.navbar-modern-inner').evaluate(e=>getComputedStyle(e).backgroundColor==='rgb(28, 54, 100)'&&e.getAttribute('aria-modal')==='true'));
 await page.screenshot({path:'.playwright-cli/upload-menu.png'});
 await page.keyboard.press('Escape');
 await page.goto('http://127.0.0.1:4173/services.html?lang=ar',{waitUntil:'domcontentloaded'});
 check('Five services',await page.locator('[data-service-card]').count()===5);
 check('Arabic services',await page.locator('h1').textContent().then(t=>/[\u0600-\u06ff]/.test(t)));
 await page.goto('http://127.0.0.1:4173/contact.html?lang=ar',{waitUntil:'domcontentloaded'});
 await page.locator('[name=name]').fill('Upload verification');
 await page.locator('[name=email]').fill('audit@example.design');
 await page.locator('#contact-form button[type=submit]').click();
 await page.waitForURL('**/thank-you.html?status=error&lang=ar');
 check('Honest result without configuration',await page.locator('h1').textContent()==='فشل الإرسال');
 await page.locator('[data-contact-result-action]').click();
 await page.waitForURL('**/contact.html?lang=ar&retry=1*');
 check('Retry retains input',await page.locator('[name=name]').inputValue()==='Upload verification');
 await page.goto('http://127.0.0.1:4173/thank-you.html?status=success&lang=en',{waitUntil:'domcontentloaded'});
 check('English result',await page.locator('h1').textContent()==='Your message was sent successfully');
 check('No JavaScript errors',!errors.length);
 return checks;
}
