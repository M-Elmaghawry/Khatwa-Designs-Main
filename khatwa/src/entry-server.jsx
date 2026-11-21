import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { SITE_BASE } from './lib/paths.js';
export { App };
export function render(url, language = 'ar') {
  return renderToString(<StaticRouter location={url} basename={SITE_BASE.slice(0, -1)}><App initialLanguage={language} /></StaticRouter>);
}
