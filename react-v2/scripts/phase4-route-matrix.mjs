import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import pages from '../src/content/pages.json' with { type: 'json' };
import { metadataFor } from '../src/lib/metadata.js';
import { SITE_BASE } from '../src/lib/paths.js';
import services from '../src/content/services.json' with { type: 'json' };
import { galleryProjects } from '../src/content/inner-model.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(import.meta.url);
const { excludedPages, redirects } = require(path.join(root, 'scripts/site-config.js'));
const nodes = node => typeof node === 'string' ? [] : [node, ...node.children.flatMap(nodes)];
const components = { 'index.html': 'HomePage (Phase 3; unchanged)', 'about.html': 'InnerAboutPage', 'services.html': 'InnerServicesPage', 'portfolio.html': 'InnerPortfolioPage', 'customer-stories.html': 'InnerReviewsPage', 'contact.html': 'InnerContactPage / ContactPanel / unchanged ContactForm', '404.html': 'NotFoundPage / InnerPageHero', 'thank-you.html': 'ResultPage / InnerPageHero' };
const report = [
  '# Phase 4 route-by-route matrix', '',
  'Generated from the preserved `pages.json`, actual `App.jsx` routing strategy and legacy publication config. Source authority: `CONTENT-AND-ROUTES-INVENTORY.md`. All paths below include the existing project base. No route is removed or newly published.', '',
  'The router iterates every key in `pages.json` under root, `ar/`, and `en/`, plus locale root aliases and a catch-all. There are 21 published source routes (16 content/error, five redirects), 63 emitted named locale entry documents, and three root aliases. The five excluded source documents remain source-only. Arabic defaults; explicit language queries, useful parameters and fragments remain supported.', '',
  'Shared assets on all published pages: original Khatwa logo/favicons, existing fonts and unchanged EmailJS public configuration. All 127 inventoried assets are retained. Header/footer links remain centralized and unchanged. All canonical/hreflang/robots/Open Graph/Twitter behavior remains in the original metadata/build modules.', '',
  '## Root aliases and fallback', '',
  '- ' + [SITE_BASE, SITE_BASE + 'ar/', SITE_BASE + 'en/'].map(value => '`' + value + '`').join(', ') + ': homepage aliases; Phase 3 composition retained. Each also resolves through its physical index.html file.',
  '- Unknown paths: React catch-all → NotFoundPage; strict static server returns 404 with the dedicated built 404 document. No SPA rewrite dependency.', '',
  '## Published route overview', '',
  '| Source | Component | Status |', '| --- | --- | --- |'
];
for (const [file, page] of Object.entries(pages)) {
  const component = page.redirect ? 'LegacyRedirectPage / unchanged static redirect handler' : components[file] || (page.languageGap ? 'InnerLegalPage' : 'InnerServicePage');
  report.push(`| ${file} | ${component} | ${page.redirect ? 'Redirect preserved → ' + page.redirect : file === 'index.html' ? 'Phase 3 preserved' : 'Phase 4 redesigned; content retained'} |`);
}
for (const [file, page] of Object.entries(pages)) {
  const all = page.sections.flatMap(nodes);
  const unique = values => [...new Set(values.filter(Boolean))];
  const keys = unique(all.map(node => node.attrs['data-i18n']));
  const assets = unique(all.map(node => node.attrs.src));
  const links = unique(all.filter(node => node.tag === 'a').map(node => node.attrs.href));
  const headings = unique(all.filter(node => /^h[1-6]$/.test(node.tag)).map(node => node.attrs['data-i18n'] || node.children.filter(child => typeof child === 'string').join('')));
  const service = services.find(service => service.file === file);
  const related = service ? galleryProjects.filter(project => project.category === service.id).slice(0, 2) : [];
  const behavior = page.redirect ? 'Replacement navigation and static fallback preserve query/language/fragment; no legacy service reintroduced.'
    : file === 'portfolio.html' ? 'All twelve source projects; six native category filters; visible Behance links; keyboard/touch; reserved images; scoped mask/parallax cleanup.'
    : file === 'contact.html' ? 'Unchanged six-field EmailJS form, service query preselection, validation/focus, loading, duplicate prevention, mocked transport, retry storage and privacy link; existing official social channels.'
    : file === 'thank-you.html' ? 'Neutral/success/error query states; live status/error announcement; existing retry and home destinations. SEO remains state-specific.'
    : page.languageGap ? 'Entire English legal body and legal links preserved; Arabic availability notice remains. Source h4 sections promoted to h2 without copy changes.'
    : file === '404.html' ? 'Accessible home action, source message and preserved noindex; direct/unknown fallback.'
    : 'Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.';
  report.push('', `## ${file}`, '', `- Component: ${page.redirect ? 'LegacyRedirectPage' : components[file] || (page.languageGap ? 'InnerLegalPage' : 'InnerServicePage')}.`,
    `- Direct static URLs: ${['', 'ar/', 'en/'].map(prefix => '`' + SITE_BASE + prefix + file + '`').join(', ')}.`,
    `- Original headings/topics: ${headings.join('; ') || 'Redirect replacement; original source content retained in archive.json'}.`,
    `- Preserved copy keys: ${keys.join(', ') || 'Literal source body / runtime result messages / redirect fallback; no copy removed'}.`,
    `- Original page-specific assets: ${assets.join(', ') || 'No page-specific img nodes; shared brand assets retained'}.`,
    `- Grounded additions: ${related.length ? related.map(project => project.image + ' → ' + project.url).join('; ') + '; related-service links: ' + services.filter(item => item.id !== service.id).map(item => item.file).join(', ') : file === 'about.html' ? 'Existing portfolio destination added alongside original service/contact CTAs' : file === 'contact.html' ? 'Existing official social links from socials.json; no new contact claims' : 'Shared existing contact messaging where useful; no new assets or claims'}.`,
    `- Original internal/external destinations: ${links.join(', ') || (page.redirect ? page.redirect : 'Shared navigation / runtime state actions')}.`,
    `- Functional behavior: ${behavior}`, `- SEO source keys: title=${page.titleKey || 'literal/state-specific'}, description=${page.descriptionKey || 'literal/state-specific'}; robots=${page.robots}.`,
    `- Arabic metadata title: ${metadataFor(file, 'ar').title}`, `- English metadata title: ${metadataFor(file, 'en').title}`,
    `- Canonicals: ${metadataFor(file, 'ar').canonical} ; ${metadataFor(file, 'en').canonical}.`,
    `- Descriptions (AR / EN): ${metadataFor(file, 'ar').description} / ${metadataFor(file, 'en').description}`);
}
report.push('', '## Excluded and archived source routes', '', '| Source | Published status | Phase 4 action |', '| --- | --- | --- |');
for (const file of excludedPages) report.push(`| ${file} | Excluded before/after; remains absent from React routes and public build | Source HTML and archive.json retained; no redesign/publication |`);
report.push('', 'All five redirect sources also retain historical content in archive.json. Actual redirect configuration: ' + JSON.stringify(redirects) + '.', '',
  '## Validation and remaining review', '',
  'The existing foundation suite validates route/config equality, all locale static metadata/links, strict direct-entry/refresh/404 behavior and every redirect destination/fragment/query. Phase 4 preservation tests compare all source-backed page copy and literal legal blocks in both languages. Browser results and visual limitations are recorded separately in PHASE-4-VISUAL-QA.md.', '');
fs.writeFileSync(path.join(root, 'docs/PHASE-4-ROUTE-MATRIX.md'), report.join('\n'), 'utf8');
console.log(`Route matrix: ${Object.keys(pages).length} published routes, ${excludedPages.size} exclusions.`);
