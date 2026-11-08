import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { SiteLink } from './primitives.jsx';
import services from '../content/services.json';

export const navigation = [['index.html', 'nav_home'], ['about.html', 'nav_about'], ['services.html', 'nav_services'], ['portfolio.html', 'nav_work'], ['customer-stories.html', 'nav_testimonials'], ['contact.html', 'nav_contact']];
export function Navigation() {
  const { t } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const current = location.pathname.replace(/^\/(?:ar|en)(?:\/|$)/, '/').replace(/^\//, '') || 'index.html';
  return <nav aria-label={t('footer_company_title')}>
    <button className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{t(open ? 'nav_close' : 'nav_toggle')}</button>
    <ul className={'navigation ' + (open ? 'is-open' : '')} id="primary-navigation">
      {navigation.map(([file, key]) => <li key={file}>
        <SiteLink href={file} aria-current={current === file ? 'page' : undefined} onClick={() => setOpen(false)}>{t(key)}</SiteLink>
        {file === 'services.html' && <details className="service-navigation"><summary aria-label={t('nav_services_toggle')}>⌄</summary><ul>{services.map(service => <li key={service.id}><SiteLink href={service.file} onClick={event => { setOpen(false); event.currentTarget.closest('details')?.removeAttribute('open'); }}>{t(service.labelKey)}</SiteLink></li>)}</ul></details>}
      </li>)}
    </ul>
  </nav>;
}
