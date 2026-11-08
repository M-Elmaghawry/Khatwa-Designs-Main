import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';
import { SITE_BASE, resolveLanguage } from './lib/paths.js';
import './styles/foundation.css';
import './styles/design-system.css';
import './styles/hero.css';
import './styles/home.css';

let storage;
try { storage = window.localStorage; } catch { /* Arabic works without storage. */ }
const pathLanguage = /^\/(?:Khatwa-Designs-Main\/)?(ar|en)(?:\/|$)/.exec(location.pathname)?.[1];
const language = new URLSearchParams(location.search).has('lang') ? resolveLanguage(location.search, storage) : pathLanguage || resolveLanguage('', storage);
const app = <StrictMode><BrowserRouter basename={SITE_BASE.slice(0, -1)}><App initialLanguage={language} /></BrowserRouter></StrictMode>;
const root = document.getElementById('root');
// Static snapshots use their own locale and a neutral result state. An explicit
// query/storage override is mounted freshly to avoid a hydration mismatch.
const dynamicResult = new URLSearchParams(location.search).has('status');
if (root.hasChildNodes() && document.documentElement.lang === language && !dynamicResult && !location.search.includes('retry=1')) hydrateRoot(root, app);
else createRoot(root).render(app);
