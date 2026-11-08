import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Button, SectionWrapper } from '../components/primitives.jsx';
export function LegacyRedirectPage({ target }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.has('lang')) params.set('lang', language);
    navigate('/' + (language === 'en' ? 'en/' : '') + target + '?' + params.toString() + location.hash, { replace: true });
  }, [target, language, location.search, location.hash, navigate]);
  return <SectionWrapper className="inner-redirect"><Button href={target + location.search + location.hash} variant="accent">{t('nav_services')}</Button></SectionWrapper>;
}
