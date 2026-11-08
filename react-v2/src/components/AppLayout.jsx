import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { PageTransitionWrapper } from './primitives.jsx';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { applyMetadata, metadataFor } from '../lib/metadata.js';

export function AppLayout({ file, children }) {
  const { t, language } = useLanguage();
  const location = useLocation();
  const main = useRef(null);
  const previousPath = useRef(location.pathname);
  useEffect(() => { applyMetadata(metadataFor(file, language, location.search), language); }, [file, language, location.search]);
  useEffect(() => {
    if (location.hash) {
      try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(); } catch { /* Malformed legacy fragments must not break a page. */ }
    } else if (previousPath.current !== location.pathname) {
      window.scrollTo?.(0, 0);
      main.current?.focus({ preventScroll: true });
    }
    previousPath.current = location.pathname;
  }, [location.pathname, location.hash]);
  return <><a className="skip-link" href="#main-content">{t('skip_content')}</a><Header cinematic={file === 'index.html'} /><main id="main-content" tabIndex={-1} ref={main}><PageTransitionWrapper>{children}</PageTransitionWrapper></main><Footer /></>;
}
