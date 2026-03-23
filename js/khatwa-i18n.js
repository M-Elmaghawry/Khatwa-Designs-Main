(function () {
    'use strict';

    var STORAGE_KEY = 'khatwa_lang';
    var SUPPORTED_LANGS = ['en', 'ar'];

    var translations = {
        en: {
            nav_home: 'Home',
            nav_about: 'About',
            nav_services: 'Services',
            nav_testimonials: 'Testimonials',
            nav_blog: 'Blog',
            nav_contact: 'Contact',
            service_1: 'Brand strategy',
            service_2: 'Visual identity',
            service_3: 'Social media design',
            service_4: 'Campaign creative',
            search_title: 'What are you looking for?',
            search_placeholder: 'Enter your keywords...',
            cta_consultation: 'Free consultation',
            lang_ar: 'العربية',
            lang_en: 'English',
            footer_copy: '© 2026 Khatwa Designs - خطوة للتصميمات',
            footer_intro: 'Gearing your company through an innovative strategy.',
            footer_company_title: 'Company',
            footer_about: 'Who we are',
            footer_services_link: 'Our services',
            footer_hot: 'Hot',
            footer_clients: 'Our clients',
            footer_contact: 'Contact us',
            footer_services_title: 'Services',
            footer_customer_title: 'Customer',
            footer_support: 'Client support',
            footer_help_center: 'Help center',
            footer_status: 'System status',
            footer_feedback: 'Feedback',
            footer_newsletter_title: 'Subscribe newsletter',
            footer_newsletter_text: 'Subscribe our newsletter to get the latest news and updates!',
            footer_email_placeholder: 'Enter your email',
            footer_privacy: 'Privacy policy',
            footer_terms: 'Terms and conditions',
            footer_copyright_link: 'Copyright',
            coming_soon_title: 'Coming soon!',
            coming_soon_subtitle: "We're getting ready to launch!",
            coming_soon_placeholder: 'Enter your email address',
            coming_soon_button: 'Notify me',
            coming_soon_note: "Subscribe our newsletter to get update when it'll be live.",
            maintenance_title: 'The website is in maintenance mode.',
            maintenance_text: 'We have almost done all the technical improvements and will be back very soon. Thank you for your patience!',
            maintenance_placeholder: 'Enter your email address',
            maintenance_button: 'Notify me',
            home_badge: 'Arabic and English design support',
            home_hero_title: 'Design systems that move brands forward',
            home_hero_text: 'Khatwa Designs helps ambitious teams build clear identities, campaign creatives, and consistent digital experiences.',
            home_hero_btn: 'Start your project'
        },
        ar: {
            nav_home: 'الرئيسية',
            nav_about: 'من نحن',
            nav_services: 'الخدمات',
            nav_testimonials: 'آراء العملاء',
            nav_blog: 'المدونة',
            nav_contact: 'تواصل معنا',
            service_1: 'استراتيجية العلامة',
            service_2: 'الهوية البصرية',
            service_3: 'تصميم السوشيال ميديا',
            service_4: 'التصميم الإعلاني',
            search_title: 'ماذا تبحث عنه؟',
            search_placeholder: 'اكتب كلمات البحث...',
            cta_consultation: 'استشارة مجانية',
            lang_ar: 'العربية',
            lang_en: 'English',
            footer_copy: '© 2026 Khatwa Designs - خطوة للتصميمات',
            footer_intro: 'نقود حضور شركتك باستراتيجية مبتكرة ونتائج أوضح.',
            footer_company_title: 'الشركة',
            footer_about: 'من نحن',
            footer_services_link: 'خدماتنا',
            footer_hot: 'مميز',
            footer_clients: 'عملاؤنا',
            footer_contact: 'تواصل معنا',
            footer_services_title: 'الخدمات',
            footer_customer_title: 'العملاء',
            footer_support: 'دعم العملاء',
            footer_help_center: 'مركز المساعدة',
            footer_status: 'حالة الخدمة',
            footer_feedback: 'ملاحظاتكم',
            footer_newsletter_title: 'النشرة البريدية',
            footer_newsletter_text: 'اشترك ليصلك جديد الأخبار والتحديثات أولاً بأول.',
            footer_email_placeholder: 'أدخل بريدك الإلكتروني',
            footer_privacy: 'سياسة الخصوصية',
            footer_terms: 'الشروط والأحكام',
            footer_copyright_link: 'حقوق النشر',
            coming_soon_title: 'قريبًا',
            coming_soon_subtitle: 'نستعد الآن لإطلاق تجربة أقوى لعلامتك التجارية.',
            coming_soon_placeholder: 'أدخل بريدك الإلكتروني',
            coming_soon_button: 'أخبرني عند الإطلاق',
            coming_soon_note: 'اشترك ليصلك إشعار فور انطلاق الموقع رسميًا.',
            maintenance_title: 'الموقع تحت الصيانة حاليًا.',
            maintenance_text: 'نعمل الآن على تحسينات تقنية وتجهيزية وسنعود إليك قريبًا بتجربة أفضل. شكرًا لصبرك.',
            maintenance_placeholder: 'أدخل بريدك الإلكتروني',
            maintenance_button: 'أخبرني عند العودة',
            home_badge: 'دعم تصميم بالعربية والإنجليزية',
            home_hero_title: 'أنظمة تصميم تدفع العلامات إلى الأمام',
            home_hero_text: 'تساعد Khatwa Designs الفرق الطموحة على بناء هوية أوضح، وحملات أقوى، وتجربة رقمية متسقة.',
            home_hero_btn: 'ابدأ مشروعك'
        }
    };

    function getPathLang() {
        var params = new URLSearchParams(window.location.search);
        var lang = params.get('lang');
        if (SUPPORTED_LANGS.indexOf(lang) !== -1) {
            return lang;
        }
        return null;
    }

    function setPathLang(lang) {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        history.replaceState({}, '', url.toString());
    }

    function setText(selector, value) {
        if (!value) return;
        document.querySelectorAll(selector).forEach(function (el) {
            el.textContent = value;
        });
    }

    function setInputPlaceholder(selector, value) {
        if (!value) return;
        document.querySelectorAll(selector).forEach(function (el) {
            el.setAttribute('placeholder', value);
        });
    }

    function applyDataTranslations(dict) {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });
    }

    function applyGlobalText(lang) {
        var t = translations[lang];

        applyDataTranslations(t);

        setText('a.nav-link[href="index.html"]', t.nav_home);
        setText('a.nav-link[href="about.html"]', t.nav_about);
        setText('a.nav-link[href="services.html"]', t.nav_services);
        setText('a.nav-link[href="customer-stories.html"]', t.nav_testimonials);
        setText('a.nav-link[href="blog.html"]', t.nav_blog);
        setText('a.nav-link[href="contact.html"]', t.nav_contact);

        setText('a[href="services-details.html"]:nth-of-type(1)', t.service_1);
        var serviceLinks = document.querySelectorAll('ul.dropdown-menu a[href="services-details.html"]');
        if (serviceLinks[0]) serviceLinks[0].lastChild.textContent = t.service_1;
        if (serviceLinks[1]) serviceLinks[1].lastChild.textContent = t.service_2;
        if (serviceLinks[2]) serviceLinks[2].lastChild.textContent = t.service_3;
        if (serviceLinks[3]) serviceLinks[3].lastChild.textContent = t.service_4;

        setText('.search-form-box h2', t.search_title);
        setInputPlaceholder('.search-form-box .search-input', t.search_placeholder);

        document.querySelectorAll('.btn-double-text').forEach(function (el) {
            el.textContent = t.cta_consultation;
            el.setAttribute('data-text', t.cta_consultation);
        });

        setText('.language-switcher [data-lang="en"]', t.lang_en);
        setText('.language-switcher [data-lang="ar"]', t.lang_ar);
    }

    function applyHomeText(lang) {
        var path = window.location.pathname.toLowerCase();
        if (!(path.endsWith('/index.html') || path.endsWith('/'))) return;
        var t = translations[lang];
        setText('[id$="layer-06"]', t.home_badge);
        setText('[id$="layer-07"]', t.home_hero_title);
        setText('[id$="layer-08"]', t.home_hero_text);
        setText('[id$="layer-09"] a', t.home_hero_btn);
    }

    function applyStatusPageText(lang) {
        var t = translations[lang];

        setText('[data-coming-soon-title]', t.coming_soon_title);
        setText('[data-coming-soon-subtitle]', t.coming_soon_subtitle);
        setInputPlaceholder('[data-coming-soon-placeholder]', t.coming_soon_placeholder);
        setText('[data-coming-soon-button]', t.coming_soon_button);
        setText('[data-coming-soon-note]', t.coming_soon_note);

        setText('[data-maintenance-title]', t.maintenance_title);
        setText('[data-maintenance-text]', t.maintenance_text);
        setInputPlaceholder('[data-maintenance-placeholder]', t.maintenance_placeholder);
        setText('[data-maintenance-button]', t.maintenance_button);
    }

    function ensureLanguageSwitcher() {
        if (document.querySelector('.language-switcher')) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'language-switcher';
        wrapper.innerHTML = '' +
            '<button type="button" class="lang-btn" data-lang="en">English</button>' +
            '<button type="button" class="lang-btn" data-lang="ar">العربية</button>';

        var target = document.querySelector('.header-icon');
        if (target) {
            target.appendChild(wrapper);
        } else {
            document.body.appendChild(wrapper);
        }

        wrapper.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-lang]');
            if (!btn) return;
            var lang = btn.getAttribute('data-lang');
            applyLanguage(lang);
        });
    }

    function setLinksLanguage(lang) {
        document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
                return;
            }
            if (href.indexOf('.html') === -1) return;
            var url = new URL(href, window.location.origin + window.location.pathname);
            url.searchParams.set('lang', lang);
            var next = url.pathname.split('/').pop();
            if (url.search) {
                next += url.search;
            }
            link.setAttribute('href', next);
        });
    }

    function markActiveButton(lang) {
        document.querySelectorAll('.language-switcher .lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    function applyLanguage(lang) {
        var safeLang = SUPPORTED_LANGS.indexOf(lang) !== -1 ? lang : 'en';
        localStorage.setItem(STORAGE_KEY, safeLang);
        setPathLang(safeLang);

        document.documentElement.lang = safeLang;
        document.documentElement.dir = safeLang === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.toggle('lang-ar', safeLang === 'ar');

        applyGlobalText(safeLang);
        applyHomeText(safeLang);
        applyStatusPageText(safeLang);
        setLinksLanguage(safeLang);
        markActiveButton(safeLang);
    }

    document.addEventListener('DOMContentLoaded', function () {
        ensureLanguageSwitcher();
        var savedLang = localStorage.getItem(STORAGE_KEY);
        var pathLang = getPathLang();
        var lang = pathLang || savedLang || 'en';
        applyLanguage(lang);
    });
})();


