(function () {
    'use strict';

    var headerTemplate = '' +
        '<header>' +
        '    <nav class="navbar navbar-expand-xl header-light bg-white disable-fixed">' +
        '        <div class="container-fluid">' +
        '            <div class="col-auto col-xl-3 me-lg-0 me-auto">' +
        '                <a class="navbar-brand" href="index.html">' +
        '                    <img src="images/khatwa-logo.png" data-at2x="images/khatwa-logo@2x.png" alt="Khatwa Designs" class="default-logo">' +
        '                    <img src="images/khatwa-logo.png" data-at2x="images/khatwa-logo@2x.png" alt="" class="alt-logo">' +
        '                    <img src="images/khatwa-logo.png" data-at2x="images/khatwa-logo@2x.png" alt="" class="mobile-logo">' +
        '                </a>' +
        '            </div>' +
        '            <div class="col-auto col-xl-6 menu-order position-static">' +
        '                <button class="navbar-toggler float-start" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">' +
        '                    <span class="navbar-toggler-line"></span>' +
        '                    <span class="navbar-toggler-line"></span>' +
        '                    <span class="navbar-toggler-line"></span>' +
        '                    <span class="navbar-toggler-line"></span>' +
        '                </button>' +
        '                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">' +
        '                    <ul class="navbar-nav">' +
        '                        <li class="nav-item"><a href="index.html" class="nav-link" data-i18n="nav_home">Home</a></li>' +
        '                        <li class="nav-item"><a href="about.html" class="nav-link" data-i18n="nav_about">About</a></li>' +
        '                        <li class="nav-item dropdown dropdown-with-icon-style02">' +
        '                            <a href="services.html" class="nav-link" data-i18n="nav_services">Services</a>' +
        '                            <i class="fa-solid fa-angle-down dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>' +
        '                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">' +
        '                                <li><a href="company-portfolio.html"><i class="line-icon-Medal-2"></i><span data-i18n="service_profiles">Company Profiles &amp; Engineering Portfolios</span></a></li>' +
        '                                <li><a href="powerpoint-presentations.html"><i class="line-icon-Financial"></i><span data-i18n="service_presentations">Presentations, Tender Documents &amp; Technical Proposals</span></a></li>' +
        '                                <li><a href="web-design.html"><i class="line-icon-Money-Bag"></i><span data-i18n="service_web">Website Design &amp; Development</span></a></li>' +
        '                                <li><a href="brand-identity.html"><i class="line-icon-Archery-2"></i><span data-i18n="service_brand">Logo Design &amp; Visual Identity</span></a></li>' +
        '                                <li><a href="social-media-design.html"><i class="line-icon-Financial"></i><span data-i18n="service_social">Social Media Design</span></a></li>' +
        '                            </ul>' +
        '                        </li>' +
        '                        <li class="nav-item"><a href="portfolio.html" class="nav-link" data-i18n="nav_work">Our Work</a></li>' +
        '                        <li class="nav-item"><a href="customer-stories.html" class="nav-link"         data-i18n="nav_testimonials">Client Reviews</a></li>' +
        '                        <li class="nav-item"><a href="contact.html" class="nav-link" data-i18n="nav_contact">Contact</a></li>' +
        '                        <li class="nav-item mobile-nav-action" data-mobile-quote><a href="contact.html" class="nav-link" data-i18n="cta_quote">Request a Quote</a></li>' +
        '                        <li class="nav-item mobile-nav-action"><div class="language-switcher mobile-language-switcher">' +
        '                            <button type="button" class="lang-btn" data-lang="en">English</button>' +
        '                            <button type="button" class="lang-btn" data-lang="ar">العربية</button>' +
        '                        </div></li>' +
        '                    </ul>' +
        '                </div>' +
        '            </div>' +
        '            <div class="col-auto col-xl-3 text-end md-pe-0">' +
        '                <div class="header-icon">' +
        '                    <div class="header-button d-none d-xl-inline-block">' +
        '                        <a href="contact.html" class="btn btn-rounded btn-transparent-light-gray border-1 btn-medium btn-switch-text text-transform-none">' +
        '                            <span>' +
        '                                <span class="btn-double-text fw-600" data-i18n="cta_quote" data-text="Request a Quote">Request a Quote</span>' +
        '                                <span><i class="fa-regular fa-envelope"></i></span>' +
        '                            </span>' +
        '                        </a>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </nav>' +
        '</header>';

    var footerTemplate = '' +
        '<footer class="p-0 fs-16 border-top border-color-extra-medium-gray">' +
        '    <div class="container">' +
        '        <div class="row justify-content-center pt-6 sm-pt-40px">' +
        '            <div class="footer-brand-column col-12 col-xl-4 col-lg-12 last-paragraph-no-margin text-center order-sm-1 lg-mb-50px sm-mb-30px">' +
        '                <a href="index.html" class="footer-logo mb-15px d-inline-block"><img src="images/khatwa-logo.png" data-at2x="images/khatwa-logo@2x.png" alt="Khatwa Designs"></a>' +
        '                <p class="footer-intro lh-30 w-90 xl-w-100 mx-auto" data-i18n="footer_intro">Khatwa Designs is a creative and digital partner for construction companies and engineering firms, helping them organize content and present their work through company profiles, technical presentations, visual identity, and websites.</p>' +
        '                <div class="elements-social social-icon-style-02 mt-20px xs-mt-15px">' +
        '                    <ul class="medium-icon dark">' +
        '                        <li class="my-0"><a class="facebook" href="https://www.facebook.com/khatwadesigns" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>' +
        '                        <li class="my-0"><a class="instagram" href="https://www.instagram.com/khatwadesigns/" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>' +
        '                        <li class="my-0"><a class="x-twitter" href="https://x.com/khatwadesigns" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li>' +
        '                        <li class="my-0"><a class="linkedin" href="https://www.linkedin.com/company/khatwadesigns/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a></li>' +
        '                        <li class="my-0"><a class="behance" href="https://www.behance.net/khatwadesigns2" target="_blank"><i class="fa-brands fa-behance"></i></a></li>' +
        '                    </ul>' +
        '                </div>' +
        '            </div>' +
        '            <div class="footer-company-column col-12 col-xl-4 col-lg-4 col-sm-6 xs-mb-30px order-sm-2 text-center">' +
        '                <span class="fs-17 fw-600 d-block text-dark-gray mb-5px" data-i18n="footer_company_title">Company</span>' +
        '                <ul>' +
        '                    <li><a href="index.html" data-i18n="nav_home">Home</a></li>' +
        '                    <li><a href="about.html" data-i18n="footer_about">About Us</a></li>' +
        '                    <li><a href="services.html" data-i18n="footer_services_link">Services</a></li>' +
        '                    <li><a href="portfolio.html" data-i18n="nav_work">Our Work</a></li>' +
        '                    <li><a href="customer-stories.html" data-i18n="footer_clients">Client Reviews</a></li>' +
        '                    <li><a href="contact.html" data-i18n="cta_quote">Request a Quote</a></li>' +
        '                </ul>' +
        '            </div>' +
        '            <div class="footer-services-column col-12 col-xl-4 col-lg-8 col-sm-6 xs-mb-30px order-sm-3">' +
        '                <span class="fs-17 fw-600 d-block text-dark-gray mb-5px" data-i18n="footer_services_title">Services</span>' +
        '                <ul>' +
        '                    <li><a href="company-portfolio.html" data-i18n="service_profiles">Company Profiles &amp; Engineering Portfolios</a></li>' +
        '                    <li><a href="powerpoint-presentations.html" data-i18n="service_presentations">Presentations, Tender Documents &amp; Technical Proposals</a></li>' +
        '                    <li><a href="web-design.html" data-i18n="service_web">Website Design &amp; Development</a></li>' +
        '                    <li><a href="brand-identity.html" data-i18n="service_brand">Logo Design &amp; Visual Identity</a></li>' +
        '                    <li><a href="social-media-design.html" data-i18n="service_social">Social Media Design</a></li>' +
        '                </ul>' +
        '            </div>' +
        '        </div>' +
        '        <div class="row justify-content-center align-items-center pt-2">' +
        '            <div class="col-12">' +
        '                <div class="divider-style-03 divider-style-03-01 border-color-transparent-white-light"></div>' +
        '            </div>' +
        '            <div class="col-lg-5 pt-35px pb-35px md-pt-0 order-2 order-lg-1 text-center text-lg-start last-paragraph-no-margin footer-copyright">' +
        '                <p><a href="https://www.behance.net/khatwadesigns2" target="_blank" rel="noopener noreferrer" class="footer-copyright-link" data-i18n="footer_copy">© 2026 Khatwa Designs - خطوة للتصميمات</a></p>' +
        '            </div>' +
        '            <div class="col-lg-7 pt-35px pb-35px md-pt-25px md-pb-5px order-1 order-lg-2 text-center text-lg-end">' +
        '                <ul class="footer-navbar sm-lh-normal">' +
        '                    <li><a href="privacy-policy.html" class="nav-link" data-i18n="footer_privacy">Privacy policy</a></li>' +
        '                    <li><a href="terms-and-conditions.html" class="nav-link" data-i18n="footer_terms">Terms and conditions</a></li>' +
        '                    <li><a href="copyright.html" class="nav-link" data-i18n="footer_copyright_link">Copyright</a></li>' +
        '                </ul>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</footer>';

    function injectSharedHeader() {
        var header = document.querySelector('body > header, .box-layout > header, header');
        if (!header) {
            return;
        }

        document.body.setAttribute('data-mobile-nav-trigger-alignment', 'right');
        document.body.setAttribute('data-mobile-nav-style', 'modern');
        document.body.setAttribute('data-mobile-nav-bg-color', '#1C3664');
        header.outerHTML = headerTemplate;
    }

    function injectSharedFooter() {
        var footer = document.querySelector('body > footer, .box-layout > footer, footer');
        if (!footer) {
            return;
        }

        footer.outerHTML = footerTemplate;
    }

    function bindServicesDropdownLinks() {
        document.addEventListener('click', function (event) {
            var link = event.target.closest('li.nav-item.dropdown.dropdown-with-icon-style02 .dropdown-menu a');
            if (!link) {
                return;
            }

            // Keep dropdown navigation deterministic when other theme handlers run.
            event.preventDefault();
            event.stopPropagation();
            window.location.href = link.href;
        });
    }

    function highlightActiveSidebarService() {
        document.addEventListener('DOMContentLoaded', function () {
            var currentPage = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
            var sidebarLinks = document.querySelectorAll('.list-style-02 a[href]');
            sidebarLinks.forEach(function (link) {
                var linkPage = (link.getAttribute('href') || '').split('?')[0].split('/').pop();
                var li = link.closest('li');
                if (linkPage === currentPage) {
                    link.classList.add('text-dark-gray', 'text-dark-gray-hover');
                    if (li) { li.classList.add('text-dark-gray'); }
                } else {
                    link.classList.remove('text-dark-gray', 'text-dark-gray-hover');
                    if (li) { li.classList.remove('text-dark-gray'); }
                }
            });
        });
    }

    injectSharedHeader();
    injectSharedFooter();
    bindServicesDropdownLinks();
    highlightActiveSidebarService();
})();