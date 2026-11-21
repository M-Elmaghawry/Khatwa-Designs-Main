import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';
import pages from '../src/content/pages.json' with { type: 'json' };
import manifest from '../src/content/manifest.json' with { type: 'json' };
import { SITE_BASE, SITE_ORIGIN } from '../src/lib/paths.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const docs = path.join(root, 'docs');
const base = SITE_ORIGIN + SITE_BASE;
const normalizeScript = fs.readFileSync(path.join(root, 'js/normalize-url.js'), 'utf8');
const redirectScript = fs.readFileSync(path.join(root, 'js/redirect.js'), 'utf8');
function browserDestination(input) {
  let url = input;
  const visited = new Set();
  for (let hop = 0; hop < 5; hop++) {
    if (visited.has(url)) return { browserFinalUrl: url, redirectLoop: true };
    visited.add(url);
    const current = new URL(url);
    if (current.pathname === SITE_BASE.slice(0, -1)) { current.pathname = SITE_BASE; url = current.href; continue; }
    if (!current.pathname.startsWith(SITE_BASE)) return { browserFinalUrl: url, redirectLoop: false };
    const key = current.pathname.slice(SITE_BASE.length).replace(/^(?:ar|en)\//, '') || 'index.html';
    if (!pages[key]) return { browserFinalUrl: url, redirectLoop: false };
    let next;
    const target = pages[key].redirect;
    vm.runInNewContext(target ? redirectScript : normalizeScript, { URL, document: { getElementById: () => ({ getAttribute: () => target }) }, window: { location: { href: url, search: current.search, hash: current.hash, replace(value) { next = value; } } } });
    if (!next) return { browserFinalUrl: url, redirectLoop: false };
    url = next;
  }
  return { browserFinalUrl: url, redirectLoop: true };
}
const mode = process.argv.includes('--live') ? 'live' : process.argv.includes('--baseline') ? 'baseline' : 'generated';
const urls = new Set();
for (const prefix of ['', 'ar/', 'en/']) {
  for (const file of ['', ...Object.keys(pages)]) {
    const url = base + prefix + file;
    urls.add(url);
    for (const lang of ['ar', 'en']) urls.add(url + '?lang=' + lang);
  }
}
for (const file of [...manifest.archivedFiles, 'missing/unknown.html']) urls.add(base + file);
urls.add(base.slice(0, -1));
function inspect(html, url) {
  const dom = new JSDOM(html, { url });
  const d = dom.window.document;
  const meta = selector => Object.fromEntries([...d.querySelectorAll(selector)].map(e => [e.name || e.getAttribute('property'), e.content]));
  const data = {
    lang: d.documentElement.lang, dir: d.documentElement.dir, title: d.title,
    description: d.querySelector('meta[name="description"]')?.content ?? null,
    robots: d.querySelector('meta[name="robots"]')?.content ?? null,
    canonical: d.querySelector('link[rel="canonical"]')?.href ?? null,
    hreflang: Object.fromEntries([...d.querySelectorAll('link[hreflang]')].map(e => [e.hreflang, e.href])),
    openGraph: meta('meta[property^="og:"]'), twitter: meta('meta[name^="twitter:"]'),
    jsonLd: [...d.querySelectorAll('script[type="application/ld+json"]')].map(e => { try { return JSON.parse(e.textContent); } catch { return { parseError: true }; } }),
    redirectDestination: d.querySelector('#redirect-link')?.href ?? null,
    metaRefresh: d.querySelector('meta[http-equiv="refresh"]')?.content ?? null,
    bodySha256: createHash('sha256').update(d.querySelector('#root')?.innerHTML || d.body.innerHTML).digest('hex'),
    htmlSha256: createHash('sha256').update(html.replaceAll('\r\n', '\n')).digest('hex')
  };
  dom.window.close();
  return data;
}
let sitemap;
if (mode === 'live') {
  const response = await fetch(base + 'sitemap.xml', { signal: AbortSignal.timeout(20000) });
  sitemap = await response.text();
} else sitemap = fs.readFileSync(path.join(root, 'khatwa/dist/sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replaceAll('&amp;', '&'));
const rows = [];
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    let row = { url, finalHttpUrl: null, httpStatus: null };
    try {
      if (mode === 'live') {
        const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
        row = { ...row, finalHttpUrl: response.url, httpStatus: response.status, ...inspect(await response.text(), response.url) };
      } else {
        const pathname = new URL(url).pathname;
        let file = pathname.slice(SITE_BASE.length);
        if (!file || pathname.endsWith('/')) file += 'index.html';
        const location = path.join(root, 'khatwa/dist', file);
        const exists = fs.existsSync(location) && fs.statSync(location).isFile();
        row = { ...row, generatedFile: exists ? 'khatwa/dist/' + file : null, expectedStaticStatus: pathname === SITE_BASE.slice(0, -1) ? 301 : exists ? 200 : 404,
          ...inspect(fs.readFileSync(exists ? location : path.join(root, 'khatwa/dist/404.html'), 'utf8'), url) };
      }
      row.inSitemap = sitemapUrls.includes(url);
      row.indexability = row.httpStatus >= 400 || row.expectedStaticStatus >= 400 ? 'http-error' : row.redirectDestination ? 'redirect-only' : /noindex/i.test(row.robots || '') ? 'noindex' : row.canonical !== url ? 'noncanonical-alias' : 'indexable-canonical';
      if (mode === 'generated') Object.assign(row, browserDestination(url));
      row.queryCaveat = new URL(url).search ? 'Static HTTP HTML ignores query language; browser compatibility normalization may change destination.' : null;
    } catch (error) { row.error = error.message; }
    rows.push(row);
  }
}
await Promise.all(Array.from({ length: mode === 'live' ? 6 : 1 }, worker));
rows.sort((a, b) => a.url.localeCompare(b.url));
const result = { mode, capturedAt: new Date().toISOString(), sitemapUrls, rows };
if (mode === 'live') {
  result.resources = [];
  for (const relative of ['robots.txt', 'sitemap.xml', 'images/khatwa-logo.png']) {
    const r = await fetch(base + relative, { signal: AbortSignal.timeout(20000) });
    result.resources.push({ url: r.url, status: r.status, contentType: r.headers.get('content-type'), ...(relative.endsWith('.txt') ? { body: await r.text() } : {}) });
  }
  const r = await fetch('https://m-elmaghawry.github.io/robots.txt', { signal: AbortSignal.timeout(20000) });
  result.originRobots = { url: r.url, status: r.status, body: await r.text() };
  const runs = await fetch('https://api.github.com/repos/M-Elmaghawry/Khatwa-Designs-Main/actions/runs?per_page=5');
  result.workflowRunsStatus = runs.status;
  if (runs.ok) result.workflowRuns = (await runs.json()).workflow_runs.map(r => ({ sha: r.head_sha, conclusion: r.conclusion, status: r.status, url: r.html_url }));
}
fs.writeFileSync(path.join(docs, `TECHNICAL-SEO-URL-INVENTORY${mode === 'generated' ? '' : '-' + mode.toUpperCase()}.json`), JSON.stringify(result, null, 2) + '\n');
if (mode === 'generated') {
  const detail = rows.filter(r => r.indexability === 'indexable-canonical').map(r => `### ${r.url}\n\n- HTML: ${r.lang}, ${r.dir}; robots: ${r.robots}; sitemap: ${r.inSitemap}.\n- Title: ${r.title}\n- Description: ${r.description}\n- Canonical: ${r.canonical}\n- Hreflang: ${JSON.stringify(r.hreflang)}\n- Open Graph: ${JSON.stringify(r.openGraph)}\n- Twitter: ${JSON.stringify(r.twitter)}\n- JSON-LD types: ${r.jsonLd.flatMap(block => block['@graph'] || []).map(item => item['@type']).join(', ')}\n`).join('\n');
  fs.writeFileSync(path.join(docs, 'TECHNICAL-SEO-URL-INVENTORY.md'), `# Technical SEO URL inventory\n\nGenerated from production HTML by \`node khatwa/scripts/seo-inventory.mjs\`. Full metadata for every observation is in [the JSON inventory](TECHNICAL-SEO-URL-INVENTORY.json); baseline and live observations are separate JSON files. HTTP statuses below are expected static statuses, not production observations. Query URLs receive the same static HTML as their path; inspect the query caveat in JSON. The origin redirects the bare project path to its slash form (live final HTTP status: 200); the static preview emits HTTP 301 for that normalization. Client redirect destinations are simulated from the actual compatibility scripts in the generated JSON, separately from HTTP destinations.\n\n| URL (relative to production base) | Static status | Indexability | Language/direction | Canonical | Sitemap |\n|---|---|---|---|---|---|\n` + rows.map(r => `| ${r.url.replace(base, './')} | ${r.expectedStaticStatus} | ${r.indexability} | ${r.lang}/${r.dir} | ${r.canonical?.replace(base, './') || '—'} | ${r.inSitemap ? 'yes' : 'no'} |`).join('\n') + '\n\n## Canonical page metadata\n\n' + detail);
}
console.log(`${mode}: ${rows.length} URL observations; ${sitemapUrls.length} sitemap URLs; ${rows.filter(r => r.error).length} errors`);
