import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Button, SectionWrapper } from '../components/primitives.jsx';
export function NotFoundPage() {
  const { t } = useLanguage();
  return <SectionWrapper className="not-found"><p className="eyebrow">{t('page404_kicker')} · 404</p><h1>{t('page404_title')}</h1><p>{t('page404_text')}</p><Button href="index.html">{t('page404_home')}</Button></SectionWrapper>;
}
