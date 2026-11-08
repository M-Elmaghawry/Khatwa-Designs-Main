import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider.jsx';
import { useGsap } from '../../motion/useGsap.js';
import { createSectionMotion } from '../../motion/patterns.js';
import { assetUrl } from '../../lib/paths.js';
import { featuredProjects, homeReviews } from '../../content/home-model.js';
import services from '../../content/services.json';
import { Button, Container, SiteLink } from '../primitives.jsx';

export function Arrow() {
  return <svg className="home-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Heading({ id, children }) {
  // Whole words, never individual Arabic glyphs. Normal spaces and the complete
  // accessible label preserve reading and ligatures across both languages.
  return <h2 id={id} className="home-heading" data-motion-heading aria-label={children}>
    {children.split(' ').map((word, i) => <span key={i} aria-hidden="true"><span className="home-heading-word" data-motion-word>{word}</span>{' '}</span>)}
  </h2>;
}
function useSection(dependencies = []) {
  const scope = useRef(null);
  const { language } = useLanguage();
  useGsap(scope, tools => createSectionMotion(tools, scope.current), [language, ...dependencies]);
  return scope;
}
function Rule() { return <div className="home-rule" data-motion-rule aria-hidden="true" />; }

export function HomeServices() {
  const { t } = useLanguage();
  const scope = useSection();
  return <section id="services" className="home-section home-services" ref={scope} aria-labelledby="services-heading">
    <Container className="home-container">
      <div className="home-section-intro"><Heading id="services-heading">{t('home_services_title')}</Heading><p>{t('home_services_intro')}</p></div>
      <Rule />
      <ol className="home-service-list">
        {services.map((service, i) => <li key={service.id} className={'home-service' + (i < 3 ? ' home-service--primary' : '')}>
          <SiteLink href={service.file} className="home-service-link" aria-labelledby={`service-${service.id}-title service-${service.id}-cta`}>
            <span className="home-service-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3 id={`service-${service.id}-title`}>{t(`home_svc${i + 1}_title`)}</h3>
            <p>{t(`home_svc${i + 1}_text`)}</p>
            <span className="home-service-action"><span id={`service-${service.id}-cta`}>{t('link_service')}</span><Arrow /></span>
          </SiteLink>
        </li>)}
      </ol>
    </Container>
  </section>;
}

export function BrandMarquee() {
  const { t, language } = useLanguage();
  const [paused, setPaused] = useState(false);
  const scope = useRef(null);
  useEffect(() => {
    const element = scope.current;
    let visible = true;
    const update = () => { element.dataset.running = String(visible && !document.hidden); };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      update();
    });
    observer?.observe(element);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  const labels = services.slice(0, 3).map((_, i) => t(`home_svc${i + 1}_title`));
  const pauseLabel = language === 'ar' ? 'إيقاف حركة الشريط' : 'Pause marquee';
  return <div className="brand-marquee" data-paused={paused} ref={scope} dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <p className="sr-only">{labels.join(' / ')}</p>
    <div className="marquee-window" aria-hidden="true"><div className="marquee-track">
      {[0, 1].map(copy => <div className="marquee-group" key={copy}>{labels.map(label => <span key={label}>{label}<span className="marquee-separator" /></span>)}</div>)}
    </div></div>
    <button type="button" className="marquee-pause" onClick={() => setPaused(value => !value)} aria-label={pauseLabel} aria-pressed={paused}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">{paused ? <path d="m5 3 10 6-10 6Z" /> : <path d="M4 3h3v12H4zm7 0h3v12h-3z" />}</svg>
    </button>
  </div>;
}

export function HomeWhy() {
  const { t } = useLanguage();
  const scope = useSection();
  return <section id="why-khatwa" className="home-section home-why" ref={scope} aria-labelledby="why-heading">
    <Container className="home-container home-why-layout">
      <Heading id="why-heading">{t('home_why_title')}</Heading>
      <div className="home-why-points">{[1, 2, 3].map(i => <article key={i} data-motion-reveal><h3>{t(`home_why${i}_title`)}</h3><p>{t(`home_why${i}_text`)}</p></article>)}</div>
    </Container>
    <BrandMarquee />
  </section>;
}

function ProjectGrid({ projects, filter }) {
  const scope = useSection([filter]);
  const { t } = useLanguage();
  return <div className="home-work-grid" ref={scope} data-motion-scope>
    {projects.map(project => <article key={project.id} className="khatwa-project-card home-project" data-project={project.id} data-cat={project.category}>
      <a className="home-project-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-labelledby={`project-${project.id}-title project-${project.id}-cta`}>
        <div className="home-project-image" data-motion-image><div className="home-project-depth" data-motion-parallax><img src={assetUrl(project.image)} alt="" width="800" height="600" loading="lazy" decoding="async" /></div><span className="home-project-corner" aria-hidden="true"><Arrow /></span></div>
        <div className="home-project-info"><p className="home-project-category">{t(project.categoryKey)}</p><h3 id={`project-${project.id}-title`}>{t(project.titleKey)}</h3><span className="home-project-cta" id={`project-${project.id}-cta`}>{t('home_work_view')}<Arrow /></span></div>
      </a>
    </article>)}
  </div>;
}

export function HomeWorks() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const scope = useSection();
  const shown = featuredProjects.filter(project => filter === 'all' || project.category === filter);
  const coverNote = language === 'ar' ? 'الأغلفة المعروضة مؤقتة؛ شاهد تفاصيل الأعمال الأصلية على Behance.' : 'Temporary project covers; view the original work on Behance.';
  return <section id="work" className="home-section home-work" ref={scope} aria-labelledby="work-heading">
    <Container className="home-container">
      <div className="home-section-intro"><Heading id="work-heading">{t('home_work_title')}</Heading><div><p>{t('home_work_intro')}</p><SiteLink href="portfolio.html" className="home-text-link">{t('home_work_all')}<Arrow /></SiteLink></div></div>
      <Rule />
      <div className="home-work-filters" role="group" aria-label={t('pf_filters_label')}>
        {['all', 'profiles', 'websites', 'presentations'].map(category => <button key={category} type="button" data-filter={category} aria-pressed={filter === category} aria-controls="home-project-results" onClick={() => setFilter(category)}>{t('pf_f_' + category)}</button>)}
      </div>
      <p className="home-cover-note">{coverNote}</p>
      <p className="sr-only" role="status" aria-live="polite">{language === 'ar' ? `عدد المشروعات: ${shown.length}` : `${shown.length} projects`}</p>
      <div id="home-project-results"><ProjectGrid projects={shown} filter={filter} /></div>
      <div className="home-section-end"><Button href="portfolio.html" variant="accent">{t('home_work_all')}<Arrow /></Button></div>
    </Container>
  </section>;
}

export function HomeProcess() {
  const { t } = useLanguage();
  const scope = useSection();
  return <section id="process" className="home-section home-process" ref={scope} aria-labelledby="process-heading">
    <Container className="home-container home-process-layout"><Heading id="process-heading">{t('home_process_title')}</Heading>
      <ol className="home-timeline" data-motion-timeline>{[1, 2, 3, 4].map(i => <li key={i} data-motion-step><span className="home-step-number" data-step-number aria-hidden="true">{String(i).padStart(2, '0')}</span><div data-step-copy><h3>{t(`home_step${i}_title`)}</h3><p>{t(`home_step${i}_text`)}</p></div></li>)}</ol>
    </Container>
  </section>;
}

export function HomeTestimonials() {
  const { t } = useLanguage();
  const scope = useSection();
  return <section id="testimonials" className="home-section home-testimonials" ref={scope} aria-labelledby="reviews-heading">
    <Container className="home-container">
      <div className="home-section-intro"><Heading id="reviews-heading">{t('home_reviews_title')}</Heading><p>{t('home_reviews_intro')}</p></div><Rule />
      <div className="home-review-grid">{homeReviews.map((review, i) => <figure key={review.name} className={'home-review' + (i === 0 ? ' home-review--lead' : '')} data-motion-reveal>
        <svg className="home-quote-mark" width="48" height="36" viewBox="0 0 48 36" fill="currentColor" aria-hidden="true"><path d="M0 20C0 8 6 2 18 0v6C11 8 8 12 8 18h10v18H0zm28 0C28 8 34 2 46 0v6c-7 2-10 6-10 12h10v18H28z" /></svg>
        {i === 3 ? <p className="home-review-text">{t(review.quoteKey)}</p> : <blockquote><p>{t(review.quoteKey)}</p></blockquote>}
        <figcaption><span className="home-review-name">{review.name}</span><span>{t(review.dateKey)}</span></figcaption>
      </figure>)}</div>
      <div className="home-reviews-end"><p>{t('home_reviews_note')}</p><SiteLink href="customer-stories.html" className="home-text-link">{t('home_reviews_btn')}<Arrow /></SiteLink></div>
    </Container>
  </section>;
}

export function HomeClosingCTA() {
  const { t } = useLanguage();
  const scope = useSection();
  return <section id="closing-cta" className="home-section home-closing" data-motion-cta ref={scope} aria-labelledby="closing-heading">
    <div className="home-cta-glow" data-cta-glow aria-hidden="true" />
    <Container className="home-container" ><div data-cta-copy><h2 id="closing-heading">{t('home_cta_title')}</h2><p>{t('home_cta_text')}</p><Button href="contact.html" variant="accent">{t('cta_quote')}<Arrow /></Button></div></Container>
  </section>;
}
