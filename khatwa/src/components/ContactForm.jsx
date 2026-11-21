import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import fields from '../content/form.json';
import services from '../content/services.json';
import { Button, SiteLink } from './primitives.jsx';
import { DRAFT_KEY, restoreDraft, saveDraft, sendInquiry } from '../lib/inquiry.js';

export function ContactForm() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const form = useRef(null);
  const pending = useRef(false);
  const activeController = useRef(null);
  const mounted = useRef(true);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(() => {
    const params = new URLSearchParams(location.search);
    const defaults = Object.fromEntries(fields.map(field => [field.name, field.options[0]?.value || '']));
    defaults.subject = services.find(service => service.id === params.get('service'))?.formValue || '';
    let restored;
    if (params.get('retry') === '1' && typeof window !== 'undefined') {
      try { restored = restoreDraft(window.sessionStorage); } catch { /* Storage unavailable. */ }
    }
    return { ...defaults, ...restored };
  });
  useEffect(() => {
    mounted.current = true;
    const restorePage = event => { if (event.persisted) { pending.current = false; setSending(false); } };
    window.addEventListener('pageshow', restorePage);
    return () => { mounted.current = false; activeController.current?.abort(); window.removeEventListener('pageshow', restorePage); };
  }, []);
  const errorFor = element => element.validity.valueMissing ? 'contact_error_required' : element.validity.typeMismatch ? 'contact_error_email' : '';
  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    const nextErrors = {};
    for (const field of fields) { const error = errorFor(form.current.elements[field.name]); if (error) nextErrors[field.name] = error; }
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) { form.current.elements[first].focus(); return; }
    pending.current = true;
    setSending(true);
    try { saveDraft(window.sessionStorage, values); } catch { /* Optional retry support. */ }
    activeController.current = new AbortController();
    let status = 'success';
    try {
      await sendInquiry(values, window.KhatwaEmailJSConfig, { signal: activeController.current.signal });
      try { window.sessionStorage.removeItem(DRAFT_KEY); } catch { /* Optional storage. */ }
    } catch { status = 'error'; }
    finally { pending.current = false; if (mounted.current) setSending(false); }
    if (mounted.current) navigate(`/thank-you.html?status=${status}&lang=${language}`);
  }
  return <form id="contact-form" ref={form} onSubmit={submit} noValidate aria-busy={sending}>
    <p>{t('contact_required_note')}</p><div className="form-grid">{fields.map(field => {
      const Tag = field.tag;
      const error = errors[field.name];
      return <div className={'field field-' + field.name} key={field.name}>
        <label htmlFor={field.id}>{t(field.labelKey)}</label>
        <Tag id={field.id} name={field.name} type={Tag === 'input' ? field.type : undefined} required={field.required} maxLength={field.maxLength || undefined} autoComplete={field.autoComplete || undefined} inputMode={field.inputMode || undefined} placeholder={field.placeholderKey ? t(field.placeholderKey) : undefined} rows={Tag === 'textarea' ? 5 : undefined} value={values[field.name]} aria-invalid={Boolean(error)} aria-describedby={error ? field.id + '-error' : undefined}
          onChange={event => { setValues(current => ({ ...current, [field.name]: event.target.value })); if (error) setErrors(current => ({ ...current, [field.name]: errorFor(event.target) })); }}
          onBlur={event => setErrors(current => ({ ...current, [field.name]: errorFor(event.target) }))}>
          {Tag === 'select' ? field.options.map(option => <option key={option.value} value={option.value}>{option.key ? t(option.key) : option.text}</option>) : undefined}
        </Tag>{error && <span className="field-error" id={field.id + '-error'} role="alert">{t(error)}</span>}
      </div>;
    })}</div><p>{t('contact_privacy_note')} <SiteLink href="privacy-policy.html">{t('footer_privacy')}</SiteLink></p>
    <Button type="submit" disabled={sending}>{t(sending ? 'contact_sending' : 'contact_submit')}</Button><span className="sr-only" role="status" aria-live="polite">{sending ? t('contact_sending') : ''}</span>
  </form>;
}
