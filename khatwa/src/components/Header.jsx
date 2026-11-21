import { Container, SiteLink } from './primitives.jsx';
import { Navigation } from './Navigation.jsx';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';
import { assetUrl } from '../lib/paths.js';
export function Header({ cinematic = false }) {
  return <header className={'site-header' + (cinematic ? ' site-header--cinematic' : '')}><Container className="header-inner">
    <SiteLink href="index.html" className="brand"><img src={assetUrl('images/khatwa-logo.png')} srcSet={assetUrl('images/khatwa-logo@2x.png') + ' 2x'} alt="Khatwa Designs / خطوة للتصميمات" width="150" height="60" /></SiteLink>
    <Navigation /><LanguageSwitcher />
  </Container></header>;
}
