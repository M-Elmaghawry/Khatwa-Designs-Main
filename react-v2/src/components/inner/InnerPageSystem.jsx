import { useId, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { useGsap } from '../../motion/useGsap.js';
import { createSectionMotion } from '../../motion/patterns.js';
import { sourceText, innerUi } from '../../content/inner-model.js';
import services from '../../content/services.json';
import { assetUrl } from '../../lib/paths.js';
import { Button, Container, SiteLink } from '../primitives.jsx';
import { ContentRenderer } from '../ContentRenderer.jsx';

export function useInnerMotion(dependencies = []) {
  const scope = useRef(null);
  const { language } = useLanguage();
  useGsap(scope, tools => createSectionMotion(tools, scope.current), [language, ...dependencies]);
  return scope;
}
export function InnerArrow() {
  return <svg className="inner-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function AnimatedPageHeading({ as: Tag = 'h2', children, className = '', ...props }) {
  return <Tag className={'inner-heading ' + className} data-motion-heading aria-label={children} {...props}>
    {children.split(' ').map((word, index) => <span aria-hidden="true" key={index}><span className="inner-word" data-motion-word>{word}</span>{index < children.split(' ').length - 1 ? ' ' : ''}</span>)}
  </Tag>;
}
export function BreadcrumbNavigation({ label, service, labelLanguage }) {
  const { t, language, dir } = useLanguage();
  return <nav className="inner-breadcrumb" aria-label={innerUi[language].breadcrumb} lang={language} dir={dir}><ol>
    <li><SiteLink href="index.html">{t('nav_home')}</SiteLink></li>
    {service && <li><SiteLink href="services.html">{t('nav_services')}</SiteLink></li>}
    <li><span aria-current="page" lang={labelLanguage || language}>{label}</span></li>
  </ol></nav>;
}
export function InnerPageHero({ title, intro, actions, breadcrumb, service, labelLanguage, children }) {
  const scope = useInnerMotion();
  const headingId = useId();
  return <section className="inner-hero" ref={scope} data-motion-scope aria-labelledby={headingId}>
    <Container className="inner-container">
      <BreadcrumbNavigation label={breadcrumb || title} service={service} labelLanguage={labelLanguage} />
      <div className="inner-hero-layout"><AnimatedPageHeading as="h1" id={headingId}>{title}</AnimatedPageHeading>
        <div className="inner-hero-support">{intro}{actions && <div className="inner-actions">{actions}</div>}{children}</div>
      </div>
      <SectionDivider />
    </Container>
  </section>;
}
export function SourceHero({ model, breadcrumb, service, labelLanguage }) {
  const { t } = useLanguage();
  return <InnerPageHero title={sourceText(model.heading, t)} breadcrumb={breadcrumb} service={service} labelLanguage={labelLanguage}
    intro={<ContentRenderer nodes={model.intro} />}
    actions={model.actions.length ? model.actions.map((node, index) => <Button key={index} href={node.attrs.href} variant={index === 0 ? 'accent' : 'outline'}>{sourceText(node, t)}<InnerArrow /></Button>) : null} />;
}
export function SectionDivider() { return <div className="inner-divider" data-motion-rule aria-hidden="true" />; }
export function EditorialSection({ children, className = '', dependencies = [], ...props }) {
  const scope = useInnerMotion(dependencies);
  return <section className={'inner-section ' + className} ref={scope} data-motion-scope {...props}><Container className="inner-container">{children}</Container></section>;
}
export function ServiceFeatureSection({ heading, children, className = '' }) {
  const { t } = useLanguage();
  return <EditorialSection className={'inner-feature ' + className}><div className="inner-feature-layout">
    {heading && <AnimatedPageHeading>{sourceText(heading, t)}</AnimatedPageHeading>}
    <div className="inner-copy">{children}</div>
  </div></EditorialSection>;
}
export function ProgressiveTimeline({ items }) {
  return <ol className="inner-timeline" data-motion-timeline>{items.map((item, index) => <li key={index} data-motion-step>
    <span className="inner-step-number" data-step-number aria-hidden="true">{item.number || String(index + 1).padStart(2, '0')}</span>
    <div className="inner-step-copy" data-step-copy>{item.content}</div>
  </li>)}</ol>;
}
export function PageCTA({ title, text, actions }) {
  const { t } = useLanguage();
  return <EditorialSection className="inner-cta" data-motion-cta>
    <div className="inner-cta-glow" data-cta-glow aria-hidden="true" />
    <div data-cta-copy><h2>{title || t('home_cta_title')}</h2>{text && <p>{text}</p>}
      <div className="inner-actions">{actions || <Button href="contact.html" variant="accent">{t('cta_quote')}<InnerArrow /></Button>}</div>
    </div>
  </EditorialSection>;
}
export function AnimatedImageReveal({ image }) {
  return <div className="inner-project-media" data-motion-image><div className="inner-image-depth" data-motion-parallax><img src={assetUrl(image)} alt="" width="800" height="600" loading="lazy" decoding="async" /></div><span className="inner-project-corner" aria-hidden="true"><InnerArrow /></span></div>;
}
export function ProjectShowcase({ projects, filter = 'all', title, children }) {
  const { t, language } = useLanguage();
  return <EditorialSection className="inner-showcase" dependencies={[filter]} id="work">
    {title && <AnimatedPageHeading>{title}</AnimatedPageHeading>}{children}
    <p className="inner-cover-note">{innerUi[language].covers}</p>
    <div className="inner-project-grid" id="project-results">{projects.map(project => <article key={project.id} className="inner-project work-item khatwa-project-card" data-cat={project.category} data-project={project.id}>
      <a className="inner-project-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-labelledby={`inner-project-${project.id}-title inner-project-${project.id}-cta`}>
        <AnimatedImageReveal image={project.image} />
        <div className="inner-project-info"><p>{t(project.categoryKey)}</p><h3 id={`inner-project-${project.id}-title`}>{t(project.titleKey)}</h3><span className="inner-project-action" id={`inner-project-${project.id}-cta`}>{t(project.ctaKey)}<InnerArrow /></span></div>
      </a>
    </article>)}</div>
  </EditorialSection>;
}
export function RelatedServices({ current }) {
  const { t, language } = useLanguage();
  return <EditorialSection className="inner-related"><h2>{innerUi[language].relatedServices}</h2><ul>
    {services.filter(service => service.id !== current).map(service => <li key={service.id}><SiteLink href={service.file}>{t(service.labelKey)}<InnerArrow /></SiteLink></li>)}
  </ul></EditorialSection>;
}
