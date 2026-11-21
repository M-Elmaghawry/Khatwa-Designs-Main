// GitHub Pages cannot vary static HTML or HTTP redirects by query parameter.
// Keep old incoming language links usable, preserving form queries and fragments.
(function () {
    'use strict';
    var url = new URL(window.location.href);
    var base = '/Khatwa-Designs-Main/';
    if (!url.pathname.startsWith(base)) return;
    var relative = url.pathname.slice(base.length);
    var pathLanguage = /^(ar|en)(?:\/|$)/.exec(relative);
    var requested = url.searchParams.get('lang');
    var language = requested === 'ar' || requested === 'en' ? requested : pathLanguage ? pathLanguage[1] : 'ar';
    relative = relative.replace(/^(?:ar|en)(?:\/|$)/, '');
    if (relative === 'index.html') relative = '';
    url.pathname = base + (language === 'en' ? 'en/' : '') + relative;
    url.searchParams.delete('lang');
    if (url.href !== window.location.href) window.location.replace(url.href);
})();
