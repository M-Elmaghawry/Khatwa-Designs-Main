import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ar from '../content/ar.json';
import en from '../content/en.json';
import { isLanguage } from '../lib/paths.js';

export const messages = { ar, en };
const LanguageContext = createContext(null);

export function LanguageProvider({ initialLanguage = 'ar', children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const requested = new URLSearchParams(location.search).get('lang');
  const pathLanguage = /^\/(ar|en)(?:\/|$)/.exec(location.pathname)?.[1];
  const language = isLanguage(requested) ? requested : pathLanguage || initialLanguage;
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('khatwa_lang', language); } catch { /* Optional preference. */ }
  }, [language]);
  const value = useMemo(() => ({
    language,
    dir: language === 'ar' ? 'rtl' : 'ltr',
    t(key) { return messages[language][key] ?? messages.en[key] ?? key; },
    setLanguage(next) {
      if (!isLanguage(next)) return;
      const params = new URLSearchParams(location.search);
      params.set('lang', next);
      const relative = location.pathname.replace(/^\/(?:ar|en)(?:\/|$)/, '/');
      const pathname = next === 'en' ? '/en' + (relative.startsWith('/') ? relative : '/' + relative) : relative;
      navigate({ pathname, search: '?' + params.toString(), hash: location.hash }, { replace: true });
    }
  }), [language, location.pathname, location.search, location.hash, navigate]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider.');
  return value;
}
