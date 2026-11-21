import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { assetUrl } from '../lib/paths.js';
import { useGsap } from '../motion/useGsap.js';
import { createHeroMotion } from '../motion/heroMotion.js';
import { headlineLines, heroUi } from '../content/hero-ui.js';
import { Button, Container, SiteLink } from './primitives.jsx';
import { Surface, Card, EditorialHeading } from './design-system.jsx';

function Arrow({ down = false }) {
  return <svg className={down ? 'hero-arrow hero-arrow--down' : 'hero-arrow'} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CinematicHero() {
  const { t, language } = useLanguage();
  const scope = useRef(null);
  const labels = heroUi[language];
  const title = t('home_hero_title');
  useGsap(scope, tools => createHeroMotion(tools, scope.current), [language]);
  return <Surface as="section" tone="dark" className="cinematic-hero" aria-labelledby="hero-title" ref={scope}>
    <div className="hero-atmosphere" aria-hidden="true"><div className="hero-grid" /><div className="hero-glow hero-glow--one" data-hero-glow="one" /><div className="hero-glow hero-glow--two" data-hero-glow="two" /><div className="hero-orbit hero-orbit--outer" /><div className="hero-orbit hero-orbit--inner" /></div>
    <Container className="hero-composition">
      <div className="hero-copy">
        <div className="hero-kicker" data-hero-reveal><span className="hero-kicker-mark" aria-hidden="true" /><span>{t('home_hero_kicker')}</span></div>
        <EditorialHeading as="h1" id="hero-title" className="hero-heading" aria-label={title}>
          {headlineLines(title, language).map((line, index) => <span className="hero-line-mask" key={line} aria-hidden="true"><span className={'hero-line' + (index === 2 ? ' hero-line--accent' : '')} data-hero-line>{line}{index < 2 ? ' ' : ''}</span></span>)}
        </EditorialHeading>
        <p className="hero-description" data-hero-reveal>{t('home_hero_text')}</p>
        <div className="hero-actions" data-hero-reveal>
          <Button href="contact.html" variant="accent"><span>{t('cta_quote')}</span><Arrow /></Button>
          <Button href="#work" variant="outline"><span>{t('cta_work')}</span><Arrow /></Button>
        </div>
      </div>
      <div className="hero-visual" data-hero-visual>
        <div className="hero-brand-stage" data-hero-depth>
          <div className="hero-stage-coordinate hero-stage-coordinate--top" aria-hidden="true">{labels.index}<span>+</span></div>
          <div className="hero-wireframe hero-wireframe--back" aria-hidden="true" />
          <div className="hero-wireframe hero-wireframe--front" aria-hidden="true" />
          <Card as="figure" className="hero-identity-card">
            <div className="hero-card-header"><span>{labels.board}</span><span className="hero-card-marker" aria-hidden="true" /></div>
            <div className="hero-logo-well"><img src={assetUrl('images/khatwa-logo@2x.png')} alt={labels.identity} width="8334" height="2096" fetchPriority="high" decoding="async" /></div>
            <figcaption className="hero-card-footer"><span dir="ltr">Khatwa Designs</span><span>{labels.since}</span></figcaption>
          </Card>
          <div className="hero-brand-seal" aria-hidden="true"><span>KH</span><span className="hero-seal-cross">+</span></div>
          <div className="hero-stage-coordinate hero-stage-coordinate--bottom" aria-hidden="true"><span>+</span><span dir="ltr">CONTENT / DESIGN / DELIVERY</span></div>
        </div>
      </div>
      <div className="hero-bottom" data-hero-reveal>
        <span className="hero-signature" dir="ltr">KHATWA DESIGNS <span aria-hidden="true">/</span> 2021</span>
        <SiteLink href="#work" className="hero-scroll"><span>{labels.scroll}</span><span className="hero-scroll-track" aria-hidden="true"><span data-hero-scroll-mark><Arrow down /></span></span></SiteLink>
      </div>
    </Container>
  </Surface>;
}
