import { Container, SiteLink } from './primitives.jsx';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { navigation } from './Navigation.jsx';
import services from '../content/services.json';
import socials from '../content/socials.json';
export function Footer() {
  const { t } = useLanguage();
  return <footer className="site-footer"><Container><div className="footer-grid">
    <div><SiteLink href="index.html" className="footer-brand">Khatwa Designs / خطوة للتصميمات</SiteLink><p>{t('footer_intro')}</p><ul className="social-links">{socials.map(social => <li key={social.label}><a href={social.url} target="_blank" rel="noopener noreferrer">{social.label}</a></li>)}</ul></div>
    <div><h2>{t('footer_company_title')}</h2><ul>{navigation.map(([file, key]) => <li key={file}><SiteLink href={file}>{t(key)}</SiteLink></li>)}</ul></div>
    <div><h2>{t('footer_services_title')}</h2><ul>{services.map(service => <li key={service.id}><SiteLink href={service.file}>{t(service.labelKey)}</SiteLink></li>)}</ul></div>
  </div><div className="footer-bottom"><a href="https://www.behance.net/khatwadesigns2" target="_blank" rel="noopener noreferrer">{t('footer_copy')}</a><ul>{[['privacy-policy.html', 'footer_privacy'], ['terms-and-conditions.html', 'footer_terms'], ['copyright.html', 'footer_copyright_link']].map(([file, key]) => <li key={file}><SiteLink href={file}>{t(key)}</SiteLink></li>)}</ul></div></Container></footer>;
}
