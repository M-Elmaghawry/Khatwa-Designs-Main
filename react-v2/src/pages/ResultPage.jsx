import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Button } from '../components/primitives.jsx';
import { InnerPageHero } from '../components/inner/InnerPageSystem.jsx';
export function ResultPage() {
  const { t } = useLanguage();
  const requested = new URLSearchParams(useLocation().search).get('status');
  const status = ['success', 'error'].includes(requested) ? requested : 'neutral';
  const success = status === 'success';
  return <div className="inner-page inner-state result-page"><InnerPageHero title={t(success ? 'thankyou_title' : `contact_result_${status}_title`)}
    breadcrumb={t('nav_contact')} intro={<p role={status === 'error' ? 'alert' : 'status'}>{t(success ? 'thankyou_text' : `contact_result_${status}_text`)}</p>}
    actions={<><Button variant="accent" href={success ? 'index.html' : status === 'error' ? 'contact.html?retry=1#contact-form' : 'contact.html'}>{t(success ? 'thankyou_home' : status === 'error' ? 'contact_result_retry' : 'contact_result_new')}</Button>{!success && <Button href="index.html" variant="outline">{t('thankyou_home')}</Button>}</>} /></div>;
}
