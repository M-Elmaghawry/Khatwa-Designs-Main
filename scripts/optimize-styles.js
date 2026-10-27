'use strict';

const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const cssnano = require('cssnano');

const styleFiles = [
  'css/vendors.min.css', 'css/icon.min.css', 'css/style.min.css',
  'css/responsive.min.css', 'css/corporate.css'
];

async function optimizeStyles() {
  // Include retained demo pages and JS-created markup so their icons remain safe.
  const contentFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'))
    .concat(fs.readdirSync('js').filter(file => file.endsWith('.js'))
      .map(file => path.join('js', file)));
  const usedIcons = new Set(contentFiles.flatMap(file =>
    fs.readFileSync(file, 'utf8').match(/(?:line-icon-|icon-feather-|ti-)[\w-]+/g) || []));
  const bundle = postcss.root();
  const imports = [];
  const seenImports = new Set();

  for (const file of styleFiles) {
    const sheet = postcss.parse(fs.readFileSync(file, 'utf8'), { from: file });
    if (file === 'css/icon.min.css') {
      sheet.walkRules(rule => {
        const glyphs = rule.selectors.map(selector =>
          /^\.((?:line-icon-|icon-feather-|ti-)[\w-]+)::?before$/.exec(selector.trim()));
        // Keep font faces, shared rules, Font Awesome and any complex selectors.
        if (glyphs.every(Boolean) && glyphs.every(match => !usedIcons.has(match[1]))) rule.remove();
      });
    }
    sheet.walkAtRules('charset', rule => rule.remove());
    sheet.walkAtRules('import', rule => {
      if (!seenImports.has(rule.params)) {
        seenImports.add(rule.params);
        imports.push(rule.clone());
      }
      rule.remove();
    });
    bundle.append(sheet.nodes);
  }
  // CSS imports must precede all style rules; relative asset paths stay in css/.
  bundle.prepend(imports);
  const result = await postcss([cssnano({ preset: ['default', {
    mergeRules: false, discardUnused: false, reduceIdents: false, normalizeUrl: false
  }] })]).process(bundle, { from: undefined, to: 'css/site.min.css', map: false });
  fs.writeFileSync('css/site.min.css', result.css + '\n');
  console.log('Styles: ' + styleFiles.reduce((total, file) => total + fs.statSync(file).size, 0) +
    ' -> ' + Buffer.byteLength(result.css) + ' bytes; 5 requests -> 1.');
}

module.exports = { optimizeStyles, styleFiles };
