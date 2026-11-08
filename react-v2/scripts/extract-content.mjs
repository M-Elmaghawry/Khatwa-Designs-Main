import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { parse, parseFragment } from 'parse5';

const directory = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(directory, '../..');
const output = path.resolve(directory, '../src/content');
const require = createRequire(import.meta.url);
const { redirects, excludedPages } = require(path.join(root, 'scripts/site-config.js'));
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const attr = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
const children = node => node.childNodes || [];
const all = (node, predicate) => [ ...(predicate(node) ? [node] : []), ...children(node).flatMap(child => all(child, predicate)) ];
const first = (node, predicate) => all(node, predicate)[0];
const text = node => node.nodeName === '#text' ? node.value : children(node).map(text).join('');
const classHas = (node, value) => (attr(node, 'class') || '').split(/\s+/).includes(value);
const isKey = (node, key) => attr(node, 'data-i18n') === key;
const sourceFiles = fs.readdirSync(root).filter(name => name.endsWith('.html')).sort();
const context = { window: {}, document: { addEventListener() {} } };
const translationsSource = read('js/khatwa-i18n.js');
const marker = '    function getPathLang()';
if (!translationsSource.includes(marker)) throw new Error('Translation extraction marker changed; review the extractor.');
vm.runInNewContext(translationsSource.replace(marker, '    globalThis.catalogs = translations;\n' + marker), context);
const catalogs = JSON.parse(JSON.stringify(context.catalogs));

// Preserve semantic content as data, without executing legacy scripts or carrying
// animation/layout engine attributes into the new React application.
const allowed = new Set('section div article aside h1 h2 h3 h4 h5 h6 p ul ol li a span strong em b small blockquote img br hr button label'.split(' '));
const allowedAttributes = new Set('id class href src alt width height loading decoding target rel lang dir type role tabindex aria-label aria-hidden aria-pressed data-i18n data-i18n-aria-label data-cat data-filter'.split(' '));
function toNode(node) {
  if (node.nodeName === '#text') return node.value.trim() ? node.value : null;
  if (node.tagName === 'form' && attr(node, 'id') === 'contact-form') return { tag: 'contact-form', attrs: {}, children: [] };
  if (!allowed.has(node.tagName) || classHas(node, 'scroll-progress')) return null;
  const attrs = Object.fromEntries((node.attrs || []).filter(item => allowedAttributes.has(item.name)).map(item => [item.name, item.value]));
  return { tag: node.tagName, attrs, children: children(node).map(toNode).filter(item => item !== null) };
}
function outerSections(node) {
  if (['header', 'footer', 'script', 'style'].includes(node.tagName)) return [];
  if (node.tagName === 'section') return [node];
  return children(node).flatMap(outerSections);
}
const documents = Object.fromEntries(sourceFiles.map(file => [file, parse(read(file))]));
const pages = {};
for (const [file, document] of Object.entries(documents)) {
  const body = first(document, node => node.tagName === 'body');
  const meta = name => attr(first(document, node => node.tagName === 'meta' && attr(node, 'name') === name), 'content') || '';
  const title = text(first(document, node => node.tagName === 'title'));
  pages[file] = {
    file,
    status: excludedPages.has(file) ? 'archived' : redirects[file] ? 'redirect' : 'migrated',
    redirect: redirects[file] || null,
    title,
    description: meta('description'),
    robots: meta('robots') || (file === '404.html' ? 'noindex,follow' : 'index,follow'),
    titleKey: attr(body, 'data-meta-title') || (file === 'index.html' ? 'home_meta_title' : null),
    descriptionKey: attr(body, 'data-meta-desc') || (file === 'index.html' ? 'home_meta_desc' : null),
    socialImage: attr(first(document, node => attr(node, 'property') === 'og:image'), 'content') || null,
    languageGap: ['privacy-policy.html', 'terms-and-conditions.html', 'copyright.html'].includes(file),
    sections: outerSections(body).map(toNode).filter(Boolean)
  };
}
const portfolio = documents['portfolio.html'];
const projects = all(portfolio, node => classHas(node, 'work-item')).map(node => {
  const heading = first(node, item => /^h[1-6]$/.test(item.tagName));
  const image = first(node, item => item.tagName === 'img');
  const link = first(node, item => item.tagName === 'a');
  return { id: path.basename(attr(image, 'src'), '.svg'), category: attr(node, 'data-cat'), titleKey: attr(heading, 'data-i18n'), image: attr(image, 'src'), url: attr(link, 'href'), temporaryCover: true };
});
const reviewDocument = documents['customer-stories.html'];
const reviews = all(reviewDocument, node => /^cs_rev\d+$/.test(attr(node, 'data-i18n') || '')).map(node => {
  const number = attr(node, 'data-i18n').slice(6);
  const parent = node.parentNode;
  const author = first(parent, item => item.tagName === 'span' && classHas(item, 'alt-font'));
  return { id: number, author: text(author).trim(), textKey: 'cs_rev' + number, dateKey: 'cs_date' + number, source: 'Owner-provided Facebook recommendations, cited in content master (KH-002.pdf)', wordingCaution: number === '6' };
});
const form = first(documents['contact.html'], node => node.tagName === 'form' && attr(node, 'id') === 'contact-form');
const fields = all(form, node => ['input', 'textarea', 'select'].includes(node.tagName) && attr(node, 'type') !== 'hidden').map(node => {
  const id = attr(node, 'id');
  const label = first(form, item => item.tagName === 'label' && attr(item, 'for') === id);
  return {
    name: attr(node, 'name'), id, tag: node.tagName, type: attr(node, 'type') || 'text',
    required: attr(node, 'required') !== undefined, maxLength: Number(attr(node, 'maxlength')) || null,
    autoComplete: attr(node, 'autocomplete') || null, inputMode: attr(node, 'inputmode') || null,
    labelKey: attr(label, 'data-i18n') || attr(node, 'data-i18n-aria-label'),
    placeholderKey: attr(node, 'data-i18n-placeholder') || null,
    options: children(node).filter(item => item.tagName === 'option').map(item => ({ value: attr(item, 'value'), key: attr(item, 'data-i18n'), text: text(item) }))
  };
});
const layoutContext = { document: { addEventListener() {}, readyState: 'loading' }, window: {} };
vm.runInNewContext(read('js/khatwa-layout.js').replace('    function injectSharedHeader()', '    globalThis.templates = { headerTemplate, footerTemplate }; return;\n    function injectSharedHeader()'), layoutContext);
const footer = parseFragment(layoutContext.templates.footerTemplate);
const socials = all(footer, node => node.tagName === 'a' && attr(node, 'aria-label')).map(node => ({ label: attr(node, 'aria-label'), url: attr(node, 'href') }));
const services = [
  ['profiles', 'company-portfolio.html', 'service_profiles', 'cp', 'Company portfolio'],
  ['presentations', 'powerpoint-presentations.html', 'service_presentations', 'pp', 'PowerPoint presentations'],
  ['websites', 'web-design.html', 'service_web', 'wd', 'Web design'],
  ['brand', 'brand-identity.html', 'service_brand', 'bi', 'Brand identity'],
  ['social', 'social-media-design.html', 'service_social', 'sm', 'Social media design']
].map(([id, file, labelKey, prefix, formValue]) => ({ id, file, labelKey, prefix, formValue }));
const inputs = [...sourceFiles, 'js/khatwa-i18n.js', 'js/khatwa-layout.js', 'js/khatwa-contact.js', 'scripts/site-config.js', 'docs/Khatwa_Designs_Content_Master_AR_EN_v1.md'];
const manifest = {
  baseline: 'a831f3d456767b5c4116c3477f9f79726e296f51',
  inputs: Object.fromEntries(inputs.map(file => [file, crypto.createHash('sha256').update(read(file).replaceAll('\r\n', '\n')).digest('hex')])),
  company: { name: 'Khatwa Designs', founded: 2021, headquarters: 'Mansoura, Egypt', markets: ['Egypt', 'Saudi Arabia'] },
  archivedFiles: [...excludedPages], redirects,
  masterOnlyProjects: [{ name: 'Bank Albilad Vision booklet', url: 'https://www.behance.net/gallery/149628683/_', status: 'Preserved in master; not a current public portfolio card' }]
};
const publicPages = Object.fromEntries(Object.entries(pages).filter(([, page]) => page.status !== 'archived').map(([file, page]) => [file, page.status === 'redirect' ? { ...page, sections: [] } : page]));
const archive = Object.fromEntries(Object.entries(pages).filter(([, page]) => page.status !== 'migrated'));
const files = { 'ar.json': catalogs.ar, 'en.json': catalogs.en, 'pages.json': publicPages, 'archive.json': archive, 'projects.json': projects, 'reviews.json': reviews, 'services.json': services, 'form.json': fields, 'socials.json': socials, 'manifest.json': manifest };
fs.mkdirSync(output, { recursive: true });
for (const [name, value] of Object.entries(files)) {
  const serialized = JSON.stringify(value, null, 2) + '\n';
  const target = path.join(output, name);
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8').replaceAll('\r\n', '\n') !== serialized) throw new Error(`Stale content: ${name}. Review source changes and run npm run content:sync.`);
  } else fs.writeFileSync(target, serialized);
}
console.log(`Content ${process.argv.includes('--check') ? 'verified' : 'extracted'}: ${sourceFiles.length} source pages, ${projects.length} projects, ${reviews.length} reviews, ${Object.keys(catalogs.ar).length} keys per locale.`);
