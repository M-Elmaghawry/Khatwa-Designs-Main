'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { redirects, excludedPages } = require('./site-config');

function redirectPage(target) {
  return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,follow">' +
    '<title>Khatwa Designs</title></head><body>' +
    '<a id="redirect-link" href="' + target + '">الخدمات الحالية / Current services</a>' +
    '<script src="js/redirect.js"></script></body></html>\n';
}

function prepareSite(destination = '_site') {
  // Only replace the exact, marked build directory in this workspace.
  if (fs.existsSync(destination)) {
    const resolved = path.resolve(destination);
    if (resolved !== path.resolve('_site') ||
        !fs.existsSync(path.join(resolved, '.khatwa-generated'))) {
      throw new Error('Refusing to replace an unrecognized output directory: ' + resolved);
    }
    fs.rmSync(resolved, { recursive: true, force: true });
  }
  fs.mkdirSync(destination, { recursive: true });
  for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
    if (excludedPages.has(file)) continue;
    const output = path.join(destination, file);
    if (redirects[file]) fs.writeFileSync(output, redirectPage(redirects[file]));
    else fs.copyFileSync(file, output);
  }
  for (const dir of ['images', 'fonts']) fs.cpSync(dir, path.join(destination, dir), { recursive: true });
  for (const file of ['robots.txt', 'sitemap.xml', 'css/site.min.css', 'js/jquery.js',
    'js/vendors.min.js', 'js/khatwa-layout.js', 'js/min/main.js', 'js/min/khatwa-i18n.js', 'js/redirect.js']) {
    fs.mkdirSync(path.dirname(path.join(destination, file)), { recursive: true });
    fs.copyFileSync(file, path.join(destination, file));
  }
  fs.writeFileSync(path.join(destination, '.nojekyll'), '');
  fs.writeFileSync(path.join(destination, '.khatwa-generated'), 'Generated site output.\n');
}

if (require.main === module) prepareSite();
module.exports = { prepareSite, redirectPage };
