async page=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:4173/index.html?lang=ar',{waitUntil:'domcontentloaded'});
 await page.locator('header .navbar-toggler').click();
 await page.waitForTimeout(1200);
 const data=await page.evaluate(()=>{
  const style=e=>({tag:e.tagName,cls:e.className,rect:e.getBoundingClientRect().toJSON(),style:{background:getComputedStyle(e).backgroundColor,transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity,visibility:getComputedStyle(e).visibility,z:getComputedStyle(e).zIndex,position:getComputedStyle(e).position,overflow:getComputedStyle(e).overflow},inert:e.inert});
  const menu=document.querySelector('.navbar-modern-inner');
  let ancestors=[],e=menu;while(e){ancestors.push(style(e));e=e.parentElement;}
  return {scrollY,ancestors,top:document.elementsFromPoint(200,200).map(style),background:style(document.querySelector('.navbar-show-modern-bg')),menuHtml:menu.outerHTML.slice(0,800)};
 });
 await page.screenshot({path:'docs/audit-2026-11-07/after/menu-debug.png'});
 return data;
}
