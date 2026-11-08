import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { languageHref, SITE_BASE } from '../lib/paths.js';
import { useGsap } from '../motion/useGsap.js';

export function SiteLink({ href, children, ...props }) {
  const { language } = useLanguage();
  const destination = languageHref(href, language);
  if (!destination || /^(?:[a-z]+:|\/\/|#)/i.test(destination) || !destination.startsWith(SITE_BASE)) {
    return <a href={destination} {...props}>{children}</a>;
  }
  // React Router applies basename itself; avoid applying the project prefix twice.
  return <Link to={destination.slice(SITE_BASE.length - 1)} {...props}>{children}</Link>;
}
export function Container({ as: Tag = 'div', className = '', ...props }) { return <Tag className={'container ' + className} {...props} />; }
export function SectionWrapper({ children, className = '', ...props }) { return <section className={'section ' + className} {...props}><Container>{children}</Container></section>; }
export function Button({ href, className = '', children, ...props }) {
  return href ? <SiteLink href={href} className={'button ' + className} {...props}>{children}</SiteLink> : <button className={'button ' + className} {...props}>{children}</button>;
}
// A stable lifecycle boundary for Phase 3. No entrance animation hides content.
const scaffoldMotion = () => {};
export function PageTransitionWrapper({ children }) {
  const scope = useRef(null);
  useGsap(scope, scaffoldMotion, []);
  return <div className="page-transition" ref={scope}>{children}</div>;
}
