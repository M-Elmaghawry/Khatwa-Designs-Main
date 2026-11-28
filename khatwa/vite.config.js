import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_BASE } from './src/lib/paths.js';
import { DEPLOY } from './src/lib/deploy-target.js';

const directory = path.dirname(fileURLToPath(import.meta.url));
const legacyRoot = path.resolve(directory, '..');
const types = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.js': 'text/javascript', '.txt': 'text/plain' };
const normalizeScript = () => fs.readFileSync(path.join(legacyRoot, 'js/normalize-url.js'), 'utf8').replace("var base = '/Khatwa-Designs-Main/';", `var base = '${SITE_BASE}';`);
export function legacyAssets() {
  let config;
  return {
    name: 'khatwa-preserved-assets',
    configResolved(resolved) { config = resolved; },
    transformIndexHtml: {
      order: 'post',
      handler() { return [{ tag: 'script', attrs: { src: SITE_BASE + 'legacy/normalize-url.js' }, injectTo: 'head-prepend' }, { tag: 'script', attrs: { src: SITE_BASE + 'legacy/emailjs-config.js' }, injectTo: 'body-prepend' }]; }
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        let relative;
        try { relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); } catch { return next(); }
        if (relative.startsWith(SITE_BASE)) relative = relative.slice(SITE_BASE.length);
        else relative = relative.replace(/^\//, '');
        let source;
        if (relative === 'legacy/emailjs-config.js') source = path.join(legacyRoot, 'js/khatwa-emailjs-config.js');
        else if (relative === 'legacy/normalize-url.js') { response.setHeader('Content-Type', types['.js']); return response.end(normalizeScript()); }
        else if (/^(images|projects)\//.test(relative)) {
          source = path.resolve(legacyRoot, relative);
          const allowed = path.resolve(legacyRoot, relative.split('/')[0]) + path.sep;
          if (!source.startsWith(allowed)) { response.statusCode = 403; return response.end(); }
        } else return next();
        if (!fs.existsSync(source) || !fs.statSync(source).isFile()) { response.statusCode = 404; return response.end(); }
        response.setHeader('Content-Type', types[path.extname(source)] || 'application/octet-stream');
        fs.createReadStream(source).pipe(response);
      });
    },
    closeBundle() {
      if (config.build.ssr) return;
      const output = path.resolve(directory, config.build.outDir);
      for (const name of ['images', 'projects']) fs.cpSync(path.join(legacyRoot, name), path.join(output, name), { recursive: true });
      fs.mkdirSync(path.join(output, 'legacy'), { recursive: true });
      fs.copyFileSync(path.join(legacyRoot, 'js/khatwa-emailjs-config.js'), path.join(output, 'legacy/emailjs-config.js'));
      fs.copyFileSync(path.join(legacyRoot, 'js/redirect.js'), path.join(output, 'legacy/redirect.js'));
      fs.writeFileSync(path.join(output, 'legacy/normalize-url.js'), normalizeScript());
    }
  };
}
export default defineConfig({
  root: directory,
  base: SITE_BASE,
  define: { __KHATWA_DEPLOY__: JSON.stringify(DEPLOY) },
  plugins: [react(), legacyAssets()],
  publicDir: false,
  build: {
    outDir: 'dist', emptyOutDir: true,
    rolldownOptions: { output: { codeSplitting: { groups: [
      { name: 'motion', test: /node_modules[\\/]gsap[\\/]/, priority: 20 },
      { name: 'site-content', test: /src[\\/]content[\\/].*\.json$/, priority: 10 }
    ] } } }
  },
  server: { fs: { strict: true, allow: [directory] } }
});
