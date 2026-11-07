async page => {
  const out = 'docs/audit-2026-11-07';
  const pages = ['index','about','services','portfolio','customer-stories','company-portfolio','powerpoint-presentations','web-design','brand-identity','social-media-design','contact','privacy-policy','terms-and-conditions','copyright'];
  const results = [];
  const errors = [];
  page.on('pageerror', e => errors.push({ url:page.url(), message:e.message }));
  for (const name of pages) {
    for (const lang of ['ar','en']) {
      await page.setViewportSize({ width:1440,height:900 });
      await page.goto(`http://127.0.0.1:4173/${name}.html?lang=${lang}`, {waitUntil:'domcontentloaded'});
      await page.waitForTimeout(350);
      for (const width of [1440,390]) {
        await page.setViewportSize({width,height:width===390?844:900});
        await page.waitForTimeout(100);
        const data=await page.evaluate(() => {
          const visible=e=>e.getClientRects().length && getComputedStyle(e).visibility!=='hidden';
          const box=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
          const main=document.querySelector('main') || document.querySelector('.box-layout') || document.body;
          return {
            title:document.title, lang:document.documentElement.lang,dir:document.documentElement.dir,
            width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,
            headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(e=>({level:e.tagName,text:e.textContent.trim(),...box(e)})),
            sections:[...document.querySelectorAll('section')].map(e=>({id:e.id,...box(e)})),
            images:[...document.images].filter(visible).map(e=>({src:e.getAttribute('src'),alt:e.getAttribute('alt'),loaded:e.complete&&e.naturalWidth>0,...box(e)})),
            unnamed:[...document.querySelectorAll('a,button,input,select,textarea,[role=button]')].filter(visible).filter(e=>!((e.innerText||'').trim()||e.getAttribute('aria-label')||e.getAttribute('aria-labelledby')||e.querySelector('img[alt]:not([alt=""])')||e.labels?.length||e.type==='hidden')).map(e=>({tag:e.tagName,href:e.getAttribute('href'),class:e.className,...box(e)})),
            smallTargets:[...document.querySelectorAll('a,button')].filter(visible).filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0&&(b.width<24||b.height<24)}).map(e=>({text:e.innerText.trim().slice(0,60),class:e.className,...box(e)})),
            overflow:[...main.querySelectorAll('h1,h2,h3,p,a,input,select,textarea')].filter(visible).filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.left< -2||b.right>innerWidth+2)}).slice(0,15).map(e=>({tag:e.tagName,text:e.textContent.trim().slice(0,70),...box(e)})),
            main:!!document.querySelector('main'),skip:!!document.querySelector('a[href="#main"],a[href="#main-content"],.skip-link'),
            forms:[...document.forms].map(f=>({action:f.getAttribute('action'),fields:[...f.querySelectorAll('input,select,textarea')].map(e=>({name:e.name,type:e.type,required:e.required,label:[...e.labels||[]].map(l=>l.textContent.trim()).join(' / ')}))})),
            fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),
            resources:performance.getEntriesByType('resource').filter(e=>e.initiatorType==='script'||e.initiatorType==='link').map(e=>({name:e.name.split('/').pop(),bytes:e.transferSize,duration:Math.round(e.duration)}))
          };
        });
        results.push({page:name,lang,width,...data});
        if (lang==='ar' && ['index','portfolio','company-portfolio','contact','about','services'].includes(name)) {
          // Scroll through once so entry animations have the same opportunity as normal browsing.
          await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=650){scrollTo(0,y);await new Promise(r=>setTimeout(r,35));}scrollTo(0,0);});
          await page.waitForTimeout(600);
          await page.screenshot({path:`${out}/${name}-${lang}-${width}.png`,fullPage:true});
        }
      }
    }
  }
  return {results,errors};
}
