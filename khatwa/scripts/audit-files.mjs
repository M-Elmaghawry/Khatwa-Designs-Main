import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(app, '..');
const files = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? files(file) : [file];
});
const sources = [...files(path.join(app, 'src')), path.join(app, 'index.html')];
const source = sources.map(file => fs.readFileSync(file, 'utf8')).join('\n');
const assets = ['images', 'projects'].flatMap(name => files(path.join(root, name))).filter(file => !file.endsWith('.md'));
const unused = assets.filter(file => !source.includes(path.relative(root, file).replaceAll('\\', '/')));
assert.deepEqual(unused, [], 'Unreferenced public assets; inspect before removing');
for (const directory of ['images', 'projects']) {
  for (const [, reference] of source.matchAll(new RegExp(`"(${directory}/[^"\\n]+)"`, 'g'))) {
    assert.ok(fs.existsSync(path.join(root, reference)), 'Missing public asset: ' + reference);
  }
}
const modules = files(path.join(app, 'src')).filter(file => /\.(?:js|jsx|json|css)$/.test(file));
const reachable = new Set();
function visit(file) {
  if (reachable.has(file)) return;
  reachable.add(file);
  const text = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.json')) return;
  for (const [, relative] of text.matchAll(/(?:from\s*|import\s*|@import\s*)['"](\.[^'"]+)['"]/g)) {
    let target = path.resolve(path.dirname(file), relative);
    if (!fs.existsSync(target)) target = ['.js', '.jsx', '.json', '.css'].map(extension => target + extension).find(candidate => fs.existsSync(candidate));
    assert.ok(target, `${file}: missing import ${relative}`);
    visit(target);
  }
}
visit(path.join(app, 'src/main.jsx'));
visit(path.join(app, 'src/entry-server.jsx'));
// The build-time publication manifest is intentionally outside the browser module graph.
reachable.add(path.join(app, 'src/content/manifest.json'));
assert.deepEqual(modules.filter(file => !reachable.has(file)), [], 'Unused application modules');
console.log(`File audit passed: ${assets.length} public assets; ${modules.length} application files; no orphan modules or missing assets.`);
