import { useState } from 'react';
import pages from '../content/pages.json';
import { ContentRenderer } from '../components/ContentRenderer.jsx';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import { SectionWrapper } from '../components/primitives.jsx';
import { CinematicHero } from '../components/CinematicHero.jsx';
import { HomeServices, HomeWhy, HomeWorks, HomeProcess, HomeTestimonials, HomeClosingCTA } from '../components/home/HomeSections.jsx';

function SourcePage({ file }) { return <div className="source-content"><ContentRenderer nodes={pages[file].sections} /></div>; }
export function HomePage() { return <div className="source-content home-page"><CinematicHero /><HomeServices /><HomeWhy /><HomeWorks /><HomeProcess /><HomeTestimonials /><HomeClosingCTA /></div>; }
export function AboutPage() { return <SourcePage file="about.html" />; }
export function ServicesPage() { return <SourcePage file="services.html" />; }
export function ServicePage({ file }) { return <SourcePage file={file} />; }
export function ReviewsPage() { return <SourcePage file="customer-stories.html" />; }
export function ContactPage() { return <SourcePage file="contact.html" />; }
export function PortfolioPage() {
  const [filter, setFilter] = useState('all');
  return <div className="source-content"><ContentRenderer nodes={pages['portfolio.html'].sections} filter={filter} onFilter={setFilter} /></div>;
}
export function LegalPage({ file }) {
  const { language } = useLanguage();
  return <>{language === 'ar' && <SectionWrapper className="document-notice"><p>نص هذا المستند الأصلي متاح بالإنجليزية. احتُفظ به دون تغيير؛ الترجمة العربية تحتاج إلى مراجعة واعتماد.</p></SectionWrapper>}<div lang="en" dir="ltr"><SourcePage file={file} /></div></>;
}
