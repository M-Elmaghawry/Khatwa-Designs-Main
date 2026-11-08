import { useState } from 'react';
import pages from '../content/pages.json';
import services from '../content/services.json';
import reviews from '../content/reviews.json';
import socials from '../content/socials.json';
import { findNodes, sourceBlocks, sectionGroups, heroModel, sourceText, galleryProjects, innerUi } from '../content/inner-model.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { ContentRenderer } from '../components/ContentRenderer.jsx';
import { ContactForm } from '../components/ContactForm.jsx';
import { Button, SiteLink } from '../components/primitives.jsx';
import { AnimatedPageHeading, EditorialSection, SourceHero, ServiceFeatureSection, ProgressiveTimeline, PageCTA, ProjectShowcase, RelatedServices, InnerArrow } from '../components/inner/InnerPageSystem.jsx';

export function InnerAboutPage() {
  const { t } = useLanguage();
  const sections = pages['about.html'].sections;
  const story = sourceBlocks(sections[1]);
  return <div className="inner-page inner-about source-content">
    <SourceHero model={heroModel('about.html')} breadcrumb={t('nav_about')} />
    <EditorialSection className="inner-story"><div className="inner-story-lead"><ContentRenderer nodes={story.slice(0, 1)} /></div><div className="inner-story-body"><ContentRenderer nodes={story.slice(1, -1)} /></div><div className="inner-story-statement" data-motion-reveal><ContentRenderer nodes={story.slice(-1)} /></div></EditorialSection>
    {sectionGroups(sections[2]).map((group, index) => <ServiceFeatureSection key={index} heading={group.heading} className={index === 2 ? 'inner-values' : ''}><ContentRenderer nodes={group.nodes} /></ServiceFeatureSection>)}
    <PageCTA title={t('home_cta_title')} text={t('home_cta_text')} actions={<><Button href="contact.html" variant="accent">{t('cta_quote')}<InnerArrow /></Button><Button href="services.html" variant="outline">{t('cta_services')}<InnerArrow /></Button><SiteLink href="portfolio.html" className="inner-text-link">{t('cta_work')}<InnerArrow /></SiteLink></>} />
  </div>;
}

export function InnerServicesPage() {
  const { t } = useLanguage();
  return <div className="inner-page inner-services source-content">
    <SourceHero model={heroModel('services.html')} breadcrumb={t('nav_services')} />
    <EditorialSection className="inner-service-directory" id="services"><h2>{t('nav_services')}</h2><ol>
      {services.map((service, index) => <li key={service.id} className={index < 3 ? 'inner-service-primary' : ''}><SiteLink href={service.file} aria-labelledby={`directory-${service.id} directory-${service.id}-cta`}>
        <span className="inner-service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h3 id={`directory-${service.id}`}>{t(`home_svc${index + 1}_title`)}</h3><p>{t(`home_svc${index + 1}_text`)}</p><span className="inner-service-cta" id={`directory-${service.id}-cta`}>{t('link_service')}<InnerArrow /></span>
      </SiteLink></li>)}
    </ol></EditorialSection>
    <ServiceFeatureSection heading={findNodes(pages['services.html'].sections[2], node => node.tag === 'h2')[0]}><ProgressiveTimeline items={[1, 2, 3, 4].map(index => ({ content: <><h3>{t(`home_step${index}_title`)}</h3><p>{t(`home_step${index}_text`)}</p></> }))} /></ServiceFeatureSection>
    <PageCTA title={t('home_cta_title')} text={t('home_cta_text')} />
  </div>;
}

function DetailBody({ nodes }) {
  return nodes.map((node, index) => {
    if (node.tag !== 'ol') return <ContentRenderer key={index} nodes={[node]} />;
    return <ProgressiveTimeline key={index} items={node.children.filter(child => typeof child !== 'string').map(item => {
      const [number, ...content] = item.children;
      return { number: <ContentRenderer nodes={[number]} />, content: <ContentRenderer nodes={content} /> };
    })} />;
  });
}
function FAQSection({ group }) {
  const { t } = useLanguage();
  const entries = [];
  for (const node of group.nodes) {
    if (node.tag === 'h3') entries.push({ question: node, answer: [] });
    else if (entries.length) entries.at(-1).answer.push(node);
  }
  return <EditorialSection className="inner-faq"><div className="inner-feature-layout"><AnimatedPageHeading>{sourceText(group.heading, t)}</AnimatedPageHeading><div>
    {entries.map((entry, index) => <article key={index}><ContentRenderer nodes={[entry.question, ...entry.answer]} /></article>)}
  </div></div></EditorialSection>;
}
export function InnerServicePage({ file }) {
  const { t, language } = useLanguage();
  const service = services.find(item => item.file === file);
  const sections = pages[file].sections;
  const cta = sourceBlocks(sections.at(-1));
  const related = galleryProjects.filter(project => project.category === service.id).slice(0, 2);
  return <div className={'inner-page inner-service-detail inner-service-' + service.id + ' source-content'}>
    <SourceHero model={heroModel(file)} breadcrumb={t(service.labelKey)} service />
    {sections.slice(1, -1).flatMap(sectionGroups).map((group, index) => group.heading?.attrs['data-i18n'] === 'svc_faq_title'
      ? <FAQSection key={index} group={group} />
      : <ServiceFeatureSection key={index} heading={group.heading}><DetailBody nodes={group.nodes} /></ServiceFeatureSection>)}
    {related.length > 0 && <ProjectShowcase projects={related} title={innerUi[language].relatedProjects} />}
    <RelatedServices current={service.id} />
    <PageCTA title={sourceText(cta.find(node => node.tag === 'h2'), t)} />
  </div>;
}

export function InnerPortfolioPage() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const shown = galleryProjects.filter(project => filter === 'all' || project.category === filter);
  return <div className="inner-page inner-portfolio source-content">
    <SourceHero model={heroModel('portfolio.html')} breadcrumb={t('nav_work')} />
    <ProjectShowcase projects={shown} filter={filter}>
      <div className="inner-filters" id="work-filters" role="group" aria-label={t('pf_filters_label')}>{['all', ...services.map(service => service.id)].map(category => <button key={category} type="button" data-filter={category} aria-pressed={filter === category} aria-controls="project-results" onClick={() => setFilter(category)}>{t('pf_f_' + category)}</button>)}</div>
      <p className="sr-only" role="status" aria-live="polite">{innerUi[language].results(shown.length)}</p>
    </ProjectShowcase>
    <PageCTA title={t('home_cta_title')} text={t('home_cta_text')} />
  </div>;
}

export function InnerReviewsPage() {
  const { t } = useLanguage();
  return <div className="inner-page inner-reviews source-content">
    <SourceHero model={heroModel('customer-stories.html')} breadcrumb={t('nav_testimonials')} />
    <EditorialSection><div className="inner-review-grid">{reviews.map((review, index) => <figure key={review.id} className={index === 0 ? 'inner-review inner-review-lead' : 'inner-review'}>
      <svg className="inner-quote" width="40" height="32" viewBox="0 0 48 36" fill="currentColor" aria-hidden="true"><path d="M0 20C0 8 6 2 18 0v6C11 8 8 12 8 18h10v18H0zm28 0C28 8 34 2 46 0v6c-7 2-10 6-10 12h10v18H28z" /></svg>
      {review.wordingCaution ? <p>{t(review.textKey)}</p> : <blockquote><p>{t(review.textKey)}</p></blockquote>}
      <figcaption><span>{review.author}</span><span>{t(review.dateKey)}</span></figcaption>
    </figure>)}</div><p className="inner-review-note">{t('cs_note')}</p></EditorialSection>
    <PageCTA title={t('home_cta_title')} text={t('home_cta_text')} />
  </div>;
}

export function ContactPanel() {
  const sections = pages['contact.html'].sections;
  const blocks = sourceBlocks(sections[1]);
  const aside = blocks.find(node => node.tag === 'aside');
  return <EditorialSection className="inner-contact-panel"><div className="inner-contact-layout"><div className="inner-form-panel">
    {/* ContactForm already renders the exact required-fields note; show it once. */}
    <ContentRenderer nodes={blocks.filter(node => node.tag !== 'aside' && node.tag !== 'contact-form' && node.attrs?.['data-i18n'] !== 'contact_required_note')} /><ContactForm />
  </div><aside className="inner-contact-aside"><ContentRenderer nodes={sourceBlocks({ ...aside, tag: 'div' })} /><ul className="inner-contact-socials">{socials.map(social => <li key={social.label}><a href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<InnerArrow /></a></li>)}</ul></aside></div></EditorialSection>;
}
export function InnerContactPage() {
  const { t } = useLanguage();
  return <div className="inner-page inner-contact source-content"><SourceHero model={heroModel('contact.html')} breadcrumb={t('nav_contact')} /><ContactPanel /></div>;
}

function legalHeadings(node) {
  if (typeof node === 'string') return node;
  return { ...node, tag: node.tag === 'h4' ? 'h2' : node.tag, children: node.children.map(legalHeadings) };
}
export function InnerLegalPage({ file }) {
  const { language } = useLanguage();
  return <div className="inner-page inner-legal source-content">
    {language === 'ar' && <div className="inner-legal-notice" lang="ar" dir="rtl"><p>نص هذا المستند الأصلي متاح بالإنجليزية. احتُفظ به دون تغيير؛ الترجمة العربية تحتاج إلى مراجعة واعتماد.</p></div>}
    <div lang="en" dir="ltr"><SourceHero model={heroModel(file)} labelLanguage="en" /><EditorialSection className="inner-legal-body"><div className="inner-reading"><ContentRenderer nodes={pages[file].sections.slice(1).flatMap(sourceBlocks).map(legalHeadings)} /></div></EditorialSection></div>
  </div>;
}
