import ar from '../content/ar.json' with { type: 'json' };
import en from '../content/en.json' with { type: 'json' };
import pages from '../content/pages.json' with { type: 'json' };
import services from '../content/services.json' with { type: 'json' };
import socials from '../content/socials.json' with { type: 'json' };
import { SITE_BASE, SITE_ORIGIN } from './paths.js';

export const SITE_URL = SITE_ORIGIN + SITE_BASE;
export const SOCIAL_IMAGE = { url: SITE_URL + 'images/khatwa-logo.png', width: 4167, height: 1048, alt: 'Khatwa Designs' };
export function canonicalFor(file, language) {
  return SITE_URL + (language === 'en' ? 'en/' : '') + (file === 'index.html' ? '' : file);
}
export function isIndexable(file, language) {
  const page = pages[file];
  return Boolean(page && !page.redirect && !page.robots.includes('noindex') && !(page.languageGap && language === 'ar'));
}
export const indexableRoutes = () => Object.keys(pages).flatMap(file => ['ar', 'en'].filter(language => isIndexable(file, language)).map(language => ({ file, language, metadata: metadataFor(file, language) })));

function structuredData(file, language, metadata, dictionary) {
  if (!isIndexable(file, language)) return null;
  const organization = { '@type': 'Organization', '@id': SITE_URL + '#organization', name: 'Khatwa Designs', url: SITE_URL, logo: SOCIAL_IMAGE.url, sameAs: socials.map(social => social.url) };
  const graph = [organization, { '@type': 'WebSite', '@id': SITE_URL + '#website', url: SITE_URL, name: 'Khatwa Designs', inLanguage: ['ar', 'en'], publisher: { '@id': organization['@id'] } }];
  const service = services.find(service => service.file === file);
  if (file !== 'index.html') {
    const crumbs = [{ name: dictionary.nav_home, item: canonicalFor('index.html', language) }];
    if (service) crumbs.push({ name: dictionary.nav_services, item: canonicalFor('services.html', language) });
    crumbs.push({ name: service ? dictionary[service.labelKey] : metadata.title, item: metadata.canonical });
    graph.push({ '@type': 'BreadcrumbList', '@id': metadata.canonical + '#breadcrumb', itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })) });
  }
  if (service) graph.push({ '@type': 'Service', '@id': metadata.canonical + '#service', name: dictionary[service.labelKey], description: metadata.description, url: metadata.canonical, provider: { '@id': organization['@id'] } });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function metadataFor(file, language, search = '') {
  const page = pages[file] || pages['404.html'];
  const dictionary = language === 'en' ? en : ar;
  let title = dictionary[page.titleKey] || page.title;
  let description = dictionary[page.descriptionKey] || page.description;
  if (file === '404.html') title = dictionary.page404_title + ' | Khatwa Designs';
  if (file === 'thank-you.html') {
    const requested = new URLSearchParams(search).get('status');
    const status = ['success', 'error'].includes(requested) ? requested : 'neutral';
    title = dictionary[status === 'success' ? 'thankyou_meta_title' : `contact_result_${status}_meta`];
    description = dictionary[status === 'success' ? 'thankyou_text' : `contact_result_${status}_text`];
  }
  const legalTitles = { 'privacy-policy.html': 'سياسة الخصوصية', 'terms-and-conditions.html': 'الشروط والأحكام', 'copyright.html': 'حقوق النشر' };
  if (language === 'ar' && legalTitles[file]) title = legalTitles[file] + ' | خطوة للتصميمات';
  const canonical = canonicalFor(file, page.languageGap ? 'en' : language);
  const alternates = isIndexable(file, language) && !page.languageGap ? { ar: canonicalFor(file, 'ar'), en: canonicalFor(file, 'en'), 'x-default': canonicalFor(file, 'ar') } : {};
  const metadata = { title, description, canonical, robots: page.redirect || (page.languageGap && language === 'ar') ? 'noindex,follow' : page.robots, image: SOCIAL_IMAGE.url, alternates };
  metadata.openGraph = { 'og:title': title, 'og:description': description, 'og:type': 'website', 'og:url': canonical, 'og:image': metadata.image, 'og:image:alt': SOCIAL_IMAGE.alt, 'og:image:width': String(SOCIAL_IMAGE.width), 'og:image:height': String(SOCIAL_IMAGE.height), 'og:locale': language === 'ar' ? 'ar_EG' : 'en_US', ...(!page.languageGap && Object.keys(alternates).length ? { 'og:locale:alternate': language === 'ar' ? 'en_US' : 'ar_EG' } : {}) };
  metadata.twitter = { 'twitter:card': 'summary', 'twitter:title': title, 'twitter:description': description, 'twitter:image': metadata.image, 'twitter:image:alt': SOCIAL_IMAGE.alt };
  metadata.jsonLd = structuredData(file, language, metadata, dictionary);
  return metadata;
}

export const escapeHtml = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export const serializeJsonLd = value => JSON.stringify(value).replaceAll('<', '\\u003c');
export function renderMetadataHead(metadata) {
  return `<meta name="description" content="${escapeHtml(metadata.description)}"><meta name="robots" content="${escapeHtml(metadata.robots)}"><link rel="canonical" href="${escapeHtml(metadata.canonical)}">` +
    Object.entries(metadata.alternates).map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${escapeHtml(href)}">`).join('') +
    Object.entries(metadata.openGraph).map(([name, value]) => `<meta property="${name}" content="${escapeHtml(value)}">`).join('') +
    Object.entries(metadata.twitter).map(([name, value]) => `<meta name="${name}" content="${escapeHtml(value)}">`).join('') +
    (metadata.jsonLd ? `<script id="khatwa-jsonld" type="application/ld+json">${serializeJsonLd(metadata.jsonLd)}</script>` : '');
}

export function applyMetadata(metadata, language) {
  document.title = metadata.title;
  const upsert = (tag, attribute, name, value) => {
    let element = document.head.querySelector(`${tag}[${attribute}="${name}"]`);
    if (!element) { element = document.createElement(tag); element.setAttribute(attribute, name); document.head.append(element); }
    element.setAttribute(tag === 'link' ? 'href' : 'content', value || '');
  };
  upsert('meta', 'name', 'description', metadata.description);
  upsert('meta', 'name', 'robots', metadata.robots);
  upsert('link', 'rel', 'canonical', metadata.canonical);
  document.head.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], link[hreflang]').forEach(element => element.remove());
  for (const [key, value] of Object.entries(metadata.openGraph)) upsert('meta', 'property', key, value);
  for (const [key, value] of Object.entries(metadata.twitter)) upsert('meta', 'name', key, value);
  document.getElementById('khatwa-jsonld')?.remove();
  if (metadata.jsonLd) {
    const script = document.createElement('script');
    script.id = 'khatwa-jsonld'; script.type = 'application/ld+json'; script.textContent = serializeJsonLd(metadata.jsonLd);
    document.head.append(script);
  }
  for (const [lang, href] of Object.entries(metadata.alternates)) {
    let link = document.head.querySelector(`link[hreflang="${lang}"]`);
    if (!link) { link = document.createElement('link'); link.rel = 'alternate'; link.hreflang = lang; document.head.append(link); }
    link.href = href;
  }
}
