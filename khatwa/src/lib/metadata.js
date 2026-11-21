import ar from '../content/ar.json' with { type: 'json' };
import en from '../content/en.json' with { type: 'json' };
import pages from '../content/pages.json' with { type: 'json' };
import { SITE_BASE, SITE_ORIGIN } from './paths.js';

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
  const suffix = file === 'index.html' ? '' : file;
  const canonical = `${SITE_ORIGIN}${SITE_BASE}${language === 'en' ? 'en/' : ''}${suffix}?lang=${language}`;
  return { title, description, canonical, robots: page.robots, image: page.socialImage, alternates: { ar: `${SITE_ORIGIN}${SITE_BASE}${suffix}?lang=ar`, en: `${SITE_ORIGIN}${SITE_BASE}en/${suffix}?lang=en`, 'x-default': `${SITE_ORIGIN}${SITE_BASE}${suffix}?lang=ar` } };
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
  for (const [key, value] of Object.entries({ 'og:title': metadata.title, 'og:description': metadata.description, 'og:url': metadata.canonical, 'og:locale': language === 'ar' ? 'ar_EG' : 'en_US', 'og:type': 'website' })) upsert('meta', 'property', key, value);
  if (metadata.image) upsert('meta', 'property', 'og:image', metadata.image);
  upsert('meta', 'name', 'twitter:card', 'summary_large_image');
  upsert('meta', 'name', 'twitter:title', metadata.title);
  upsert('meta', 'name', 'twitter:description', metadata.description);
  for (const [lang, href] of Object.entries(metadata.alternates)) {
    let link = document.head.querySelector(`link[hreflang="${lang}"]`);
    if (!link) { link = document.createElement('link'); link.rel = 'alternate'; link.hreflang = lang; document.head.append(link); }
    link.href = href;
  }
}
