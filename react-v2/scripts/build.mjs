import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import { metadataFor } from '../src/lib/metadata.js';
import { SITE_BASE } from '../src/lib/paths.js';
import pages from '../src/content/pages.json' with { type: 'json' };
import { spawnSync } from 'node:child_process';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(directory);
const check = spawnSync(process.execPath, ['scripts/extract-content.mjs', '--check'], { stdio: 'inherit' });
if (check.status !== 0) throw new Error('Content integrity check failed before build.');
await build({ configFile: path.join(directory, 'vite.config.js') });
await build({ configFile: path.join(directory, 'vite.config.js'), build: { ssr: 'src/entry-server.jsx', outDir: '.ssr', emptyOutDir: true } });
const { render } = await import(pathToFileURL(path.join(directory, '.ssr/entry-server.js')));
const output = path.join(directory, 'dist');
const template = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
const escape = value => String(value || '').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const write = (file, html) => { const destination = path.join(output, file); fs.mkdirSync(path.dirname(destination), { recursive: true }); fs.writeFileSync(destination, html); };

for (const [file, page] of Object.entries(pages)) {
  for (const [prefix, language] of [['', 'ar'], ['ar/', 'ar'], ['en/', 'en']]) {
    if (page.redirect) {
      write(prefix + file, `<!doctype html><html lang="${language}" dir="${language === 'ar' ? 'rtl' : 'ltr'}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Khatwa Designs</title></head><body><a id="redirect-link" href="${escape(page.redirect)}">الخدمات الحالية / Current services</a><script src="${SITE_BASE}legacy/redirect.js"></script></body></html>`);
      continue;
    }
    const metadata = metadataFor(file, language);
    const head = `<meta name="description" content="${escape(metadata.description)}"><meta name="robots" content="${escape(metadata.robots)}"><link rel="canonical" href="${escape(metadata.canonical)}">` +
      Object.entries(metadata.alternates).map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${escape(href)}">`).join('') +
      Object.entries({ 'og:title': metadata.title, 'og:description': metadata.description, 'og:url': metadata.canonical, 'og:locale': language === 'ar' ? 'ar_EG' : 'en_US', 'og:type': 'website', ...(metadata.image ? { 'og:image': metadata.image } : {}) }).map(([name, value]) => `<meta property="${name}" content="${escape(value)}">`).join('') +
      `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(metadata.title)}"><meta name="twitter:description" content="${escape(metadata.description)}">`;
    const html = template.replace('<html lang="ar" dir="rtl">', `<html lang="${language}" dir="${language === 'ar' ? 'rtl' : 'ltr'}">`).replace(/<title>.*?<\/title>/s, `<title>${escape(metadata.title)}</title>`).replace('</head>', head + '</head>').replace('<div id="root"></div>', '<div id="root">' + render(SITE_BASE + prefix + file, language) + '</div>');
    write(prefix + file, html);
  }
}
const indexed = Object.values(pages).filter(page => page.status === 'migrated' && !page.robots.includes('noindex') && !page.languageGap && !['404.html', 'thank-you.html'].includes(page.file));
const entries = indexed.flatMap(page => ['ar', 'en'].map(language => {
  const metadata = metadataFor(page.file, language);
  return `<url><loc>${escape(metadata.canonical)}</loc>${Object.entries(metadata.alternates).map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${escape(href)}"/>`).join('')}</url>`;
}));
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`);
write('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: https://m-elmaghawry.github.io/Khatwa-Designs-Main/sitemap.xml\n');
write('.nojekyll', '');
console.log(`Prerendered ${Object.keys(pages).length} existing routes with Arabic/default and explicit ar/en static entries. Output: react-v2/dist (local only).`);
