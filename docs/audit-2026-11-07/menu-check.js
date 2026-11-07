async page=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:4173/index.html?lang=ar',{waitUntil:'domcontentloaded'});
 await page.waitForTimeout(1000);
 await page.locator('header .navbar-toggler').click();
 await page.waitForTimeout(1300);
 const result=await page.evaluate(()=>({scrollX,scrollY,body:document.body.className,elements:[document.querySelector('.navbar-modern-inner'),document.querySelector('.navbar-modern-inner .navbar-nav'),document.querySelector('.navbar-modern-inner .nav-link'),document.querySelector('.navbar-modern-inner .navbar-toggler')].map(e=>({tag:e?.tagName,cls:e?.className,rect:e?.getBoundingClientRect().toJSON(),style:e?{transform:getComputedStyle(e).transform,visibility:getComputedStyle(e).visibility,display:getComputedStyle(e).display,opacity:getComputedStyle(e).opacity,color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor}:null}))}));
 await page.screenshot({path:'docs/audit-2026-11-07/menu-ar-390.png'});
 await page.keyboard.press('Tab');
 result.tab=await page.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent.trim(),rect:document.activeElement.getBoundingClientRect().toJSON()}));
 await page.keyboard.press('Escape');
 result.escape=await page.locator('header .navbar-toggler').getAttribute('aria-expanded');
 return result;
}
