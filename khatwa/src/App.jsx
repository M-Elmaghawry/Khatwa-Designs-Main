import { Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageProvider.jsx';
import { AppLayout } from './components/AppLayout.jsx';
import { HomePage, AboutPage, ServicesPage, ServicePage, ReviewsPage, ContactPage, PortfolioPage, LegalPage } from './pages/ContentPages.jsx';
import { ResultPage } from './pages/ResultPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { LegacyRedirectPage } from './pages/LegacyRedirectPage.jsx';
import pages from './content/pages.json';

function Page({ file }) {
  const page = pages[file];
  let content;
  if (page.redirect) content = <LegacyRedirectPage target={page.redirect} />;
  else if (file === 'index.html') content = <HomePage />;
  else if (file === 'about.html') content = <AboutPage />;
  else if (file === 'services.html') content = <ServicesPage />;
  else if (file === 'portfolio.html') content = <PortfolioPage />;
  else if (file === 'customer-stories.html') content = <ReviewsPage />;
  else if (file === 'contact.html') content = <ContactPage />;
  else if (file === 'thank-you.html') content = <ResultPage />;
  else if (file === '404.html') content = <NotFoundPage />;
  else if (page.languageGap) content = <LegalPage file={file} />;
  else content = <ServicePage file={file} />;
  return <AppLayout file={file}>{content}</AppLayout>;
}

export function App({ initialLanguage = 'ar' }) {
  return <LanguageProvider initialLanguage={initialLanguage}><Routes>
    {['', 'ar/', 'en/'].flatMap(prefix => [
      <Route key={prefix + 'root'} path={'/' + prefix} element={<Page file="index.html" />} />,
      ...Object.keys(pages).map(file => <Route key={prefix + file} path={'/' + prefix + file} element={<Page file={file} />} />)
    ])}
    <Route path="*" element={<AppLayout file="404.html"><NotFoundPage /></AppLayout>} />
  </Routes></LanguageProvider>;
}
