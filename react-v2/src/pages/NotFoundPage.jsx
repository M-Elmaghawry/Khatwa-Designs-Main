import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Button } from '../components/primitives.jsx';
import { InnerPageHero } from '../components/inner/InnerPageSystem.jsx';
export function NotFoundPage() {
  const { t } = useLanguage();
  return <div className="inner-page inner-state not-found"><InnerPageHero title={t('page404_title')} intro={<><p className="inner-error-code">{t('page404_kicker')} · 404</p><p>{t('page404_text')}</p></>} actions={<Button href="index.html" variant="accent">{t('page404_home')}</Button>} /></div>;
}
