import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { Button, SectionWrapper } from '../components/primitives.jsx';
export function ResultPage() {
  const { t } = useLanguage();
  const requested = new URLSearchParams(useLocation().search).get('status');
  const status = ['success', 'error'].includes(requested) ? requested : 'neutral';
  const success = status === 'success';
  return <SectionWrapper className="result-page"><h1>{t(success ? 'thankyou_title' : `contact_result_${status}_title`)}</h1><p role={status === 'error' ? 'alert' : 'status'}>{t(success ? 'thankyou_text' : `contact_result_${status}_text`)}</p>
    <div className="actions"><Button href={success ? 'index.html' : status === 'error' ? 'contact.html?retry=1#contact-form' : 'contact.html'}>{t(success ? 'thankyou_home' : status === 'error' ? 'contact_result_retry' : 'contact_result_new')}</Button>{!success && <Button href="index.html" className="button-secondary">{t('thankyou_home')}</Button>}</div>
  </SectionWrapper>;
}
