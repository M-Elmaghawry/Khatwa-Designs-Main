import { CinematicHero } from '../components/CinematicHero.jsx';
import { HomeServices, HomeWhy, HomeWorks, HomeProcess, HomeTestimonials, HomeClosingCTA } from '../components/home/HomeSections.jsx';
export { InnerAboutPage as AboutPage, InnerServicesPage as ServicesPage, InnerServicePage as ServicePage, InnerReviewsPage as ReviewsPage, InnerContactPage as ContactPage, InnerPortfolioPage as PortfolioPage, InnerLegalPage as LegalPage } from './InnerPages.jsx';

export function HomePage() { return <div className="source-content home-page"><CinematicHero /><HomeServices /><HomeWhy /><HomeWorks /><HomeProcess /><HomeTestimonials /><HomeClosingCTA /></div>; }
