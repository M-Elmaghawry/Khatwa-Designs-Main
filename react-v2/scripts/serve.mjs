import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { SITE_BASE } from '../src/lib/paths.js';

export const output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain' };
export function createStaticServer() {
  if (!fs.existsSync(path.join(output, 'index.html'))) throw new Error('Run npm run react:build before preview.');
  return http.createServer((request, response) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); } catch { response.writeHead(400); return response.end(); }
    if (pathname === SITE_BASE.slice(0, -1)) { response.writeHead(301, { Location: SITE_BASE }); return response.end(); }
    if (!pathname.startsWith(SITE_BASE)) { response.writeHead(404); return response.end('Use ' + SITE_BASE); }
    const relative = pathname.slice(SITE_BASE.length) + (pathname.endsWith('/') ? 'index.html' : '');
    let file = path.resolve(output, relative);
    if (!file.startsWith(output + path.sep)) { response.writeHead(403); return response.end(); }
    let status = 200;
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { file = path.join(output, '404.html'); status = 404; }
    response.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(response);
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createStaticServer();
  server.listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173' + SITE_BASE));
}
