export const SITE_BASE = '/Khatwa-Designs-Main/';
export const SITE_ORIGIN = 'https://m-elmaghawry.github.io';
export const SUPPORTED_LANGUAGES = ['ar', 'en'];
export const isLanguage = value => SUPPORTED_LANGUAGES.includes(value);

export function assetUrl(value) {
  if (/^(?:https?:|data:|mailto:|tel:|#)/i.test(value)) return value;
  return SITE_BASE + value.replace(/^\/?(?:Khatwa-Designs-Main\/)?/, '');
}

export function languageHref(href, language) {
  if (!href || /^(?:[a-z]+:|\/\/)/i.test(href)) return href;
  if (href.startsWith('#')) return href;
  const url = new URL(href, SITE_ORIGIN + SITE_BASE);
  if (url.origin !== SITE_ORIGIN || !url.pathname.startsWith(SITE_BASE)) return href;
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    const relative = url.pathname.slice(SITE_BASE.length).replace(/^(?:ar|en)\//, '');
    url.pathname = SITE_BASE + (language === 'en' ? 'en/' : '') + relative;
    url.searchParams.set('lang', language);
  }
  return url.pathname + url.search + url.hash;
}

export function routeFile(pathname) {
  const relative = pathname.startsWith(SITE_BASE) ? pathname.slice(SITE_BASE.length) : pathname.replace(/^\//, '');
  const file = relative.replace(/^(?:ar|en)(?:\/|$)/, '');
  return file === '' ? 'index.html' : file;
}

export function resolveLanguage(search, storage) {
  const explicit = new URLSearchParams(search).get('lang');
  if (isLanguage(explicit)) return explicit;
  try { const saved = storage?.getItem('khatwa_lang'); if (isLanguage(saved)) return saved; } catch { /* Private storage is optional. */ }
  return 'ar';
}
