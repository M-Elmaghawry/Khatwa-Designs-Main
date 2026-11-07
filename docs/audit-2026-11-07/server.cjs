const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
http.createServer((req, res) => {
  const pathname = decodeURIComponent(req.url.split('?')[0]);
  const target = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!target.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(target, (err, bytes) => {
    if (err) { res.writeHead(404); return res.end(); }
    const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
    res.setHeader('Content-Type', types[path.extname(target)] || 'application/octet-stream');
    res.end(bytes);
  });
}).listen(4173, '127.0.0.1');
