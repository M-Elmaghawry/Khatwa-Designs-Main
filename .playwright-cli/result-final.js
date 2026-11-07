async page=>{
 await page.setViewportSize({width:390,height:844});
 await page.waitForTimeout(500);
 await page.screenshot({path:'docs/contact-result-check/ar-success-390.png',fullPage:true});
 return page.locator('header .navbar-toggler').evaluate(e=>({x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}));
}
