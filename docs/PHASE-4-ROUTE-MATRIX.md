# Phase 4 route-by-route matrix

Generated from the preserved `pages.json`, actual `App.jsx` routing strategy and legacy publication config. Source authority: `CONTENT-AND-ROUTES-INVENTORY.md`. All paths below include the existing project base. No route is removed or newly published.

The router iterates every key in `pages.json` under root, `ar/`, and `en/`, plus locale root aliases and a catch-all. There are 21 published source routes (16 content/error, five redirects), 63 emitted named locale entry documents, and three root aliases. The five excluded source documents remain source-only. Arabic defaults; explicit language queries, useful parameters and fragments remain supported.

Shared assets on all published pages: original Khatwa logo/favicons, existing fonts and unchanged EmailJS public configuration. All 127 inventoried assets are retained. Header/footer links remain centralized and unchanged. All canonical/hreflang/robots/Open Graph/Twitter behavior remains in the original metadata/build modules.

## Root aliases and fallback

- `/Khatwa-Designs-Main/`, `/Khatwa-Designs-Main/ar/`, `/Khatwa-Designs-Main/en/`: homepage aliases; Phase 3 composition retained. Each also resolves through its physical index.html file.
- Unknown paths: React catch-all → NotFoundPage; strict static server returns 404 with the dedicated built 404 document. No SPA rewrite dependency.

## Published route overview

| Source | Component | Status |
| --- | --- | --- |
| 404.html | NotFoundPage / InnerPageHero | Phase 4 redesigned; content retained |
| about.html | InnerAboutPage | Phase 4 redesigned; content retained |
| brand-identity.html | InnerServicePage | Phase 4 redesigned; content retained |
| company-portfolio.html | InnerServicePage | Phase 4 redesigned; content retained |
| contact.html | InnerContactPage / ContactPanel / unchanged ContactForm | Phase 4 redesigned; content retained |
| copyright.html | InnerLegalPage | Phase 4 redesigned; content retained |
| customer-stories.html | InnerReviewsPage | Phase 4 redesigned; content retained |
| index.html | HomePage (Phase 3; unchanged) | Phase 3 preserved |
| logo-design.html | LegacyRedirectPage / unchanged static redirect handler | Redirect preserved → brand-identity.html |
| n8n-ai-automations.html | LegacyRedirectPage / unchanged static redirect handler | Redirect preserved → services.html |
| portfolio.html | InnerPortfolioPage | Phase 4 redesigned; content retained |
| powerpoint-presentations.html | InnerServicePage | Phase 4 redesigned; content retained |
| privacy-policy.html | InnerLegalPage | Phase 4 redesigned; content retained |
| services-details.html | LegacyRedirectPage / unchanged static redirect handler | Redirect preserved → services.html |
| services.html | InnerServicesPage | Phase 4 redesigned; content retained |
| social-media-design.html | InnerServicePage | Phase 4 redesigned; content retained |
| social-media-management.html | LegacyRedirectPage / unchanged static redirect handler | Redirect preserved → services.html |
| terms-and-conditions.html | InnerLegalPage | Phase 4 redesigned; content retained |
| thank-you.html | ResultPage / InnerPageHero | Phase 4 redesigned; content retained |
| video-presentations.html | LegacyRedirectPage / unchanged static redirect handler | Redirect preserved → services.html |
| web-design.html | InnerServicePage | Phase 4 redesigned; content retained |

## 404.html

- Component: NotFoundPage / InnerPageHero.
- Direct static URLs: `/Khatwa-Designs-Main/404.html`, `/Khatwa-Designs-Main/ar/404.html`, `/Khatwa-Designs-Main/en/404.html`.
- Original headings/topics: page404_kicker; 404; page404_title.
- Preserved copy keys: page404_kicker, page404_title, page404_text, page404_home.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: index.html.
- Functional behavior: Accessible home action, source message and preserved noindex; direct/unknown fallback.
- SEO source keys: title=page404_meta_title, description=page404_meta_desc; robots=noindex,follow.
- Arabic metadata title: الصفحة غير موجودة | Khatwa Designs
- English metadata title: Page not found! | Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/404.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/404.html?lang=en.
- Descriptions (AR / EN): قد تكون الصفحة التي تبحث عنها قد نُقلت أو لم تعد موجودة. ارجع إلى الصفحة الرئيسية لخطوة للتصميمات. / The page may have moved or no longer exists. Return to Khatwa Designs homepage.

## about.html

- Component: InnerAboutPage.
- Direct static URLs: `/Khatwa-Designs-Main/about.html`, `/Khatwa-Designs-Main/ar/about.html`, `/Khatwa-Designs-Main/en/about.html`.
- Original headings/topics: ab_title; ab_mission_title; ab_vision_title; ab_values_title.
- Preserved copy keys: ab_title, ab_p1, ab_p2, ab_p3, ab_p4, ab_closing, ab_mission_title, ab_mission, ab_vision_title, ab_vision, ab_values_title, ab_val1, ab_val2, ab_val3, ab_val4, ab_val5, cta_services, cta_quote.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Existing portfolio destination added alongside original service/contact CTAs.
- Original internal/external destinations: services.html, contact.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=ab_meta_title, description=ab_meta_desc; robots=index,follow.
- Arabic metadata title: من نحن — خطوة للتصميمات
- English metadata title: About Khatwa Designs — Engineering-Focused Creative Partner
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/about.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/about.html?lang=en.
- Descriptions (AR / EN): تعرّف على خطوة للتصميمات، تأسست عام 2021 في المنصورة وتعمل مع شركات المقاولات والمكاتب الهندسية في مصر والسعودية. / Learn about Khatwa Designs, founded in 2021 in Mansoura, Egypt, serving construction companies and engineering firms in Egypt and Saudi Arabia.

## brand-identity.html

- Component: InnerServicePage.
- Direct static URLs: `/Khatwa-Designs-Main/brand-identity.html`, `/Khatwa-Designs-Main/ar/brand-identity.html`, `/Khatwa-Designs-Main/en/brand-identity.html`.
- Original headings/topics: bi_title; svc_scope_title; svc_process_title; svc_faq_title; bi_q1; bi_q2; bi_q3; bi_cta.
- Preserved copy keys: bi_title, bi_intro, cta_quote, svc_scope_title, bi_inc1, bi_inc2, bi_inc3, bi_inc4, bi_inc5, svc_process_title, bi_step1, bi_step2, bi_step3, bi_step4, bi_step5, svc_faq_title, bi_q1, bi_a1, bi_q2, bi_a2, bi_q3, bi_a3, bi_cta.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: projects/aya-roshdy.svg → https://www.behance.net/khatwadesigns2; projects/mohamed-el-naggar.svg → https://www.behance.net/khatwadesigns2; related-service links: company-portfolio.html, powerpoint-presentations.html, web-design.html, social-media-design.html.
- Original internal/external destinations: contact.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=bi_meta_title, description=bi_meta_desc; robots=index,follow.
- Arabic metadata title: تصميم الشعارات والهوية البصرية — خطوة
- English metadata title: Logo Design & Visual Identity — Khatwa
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/brand-identity.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/brand-identity.html?lang=en.
- Descriptions (AR / EN): تصميم الشعارات والهوية البصرية ودليل الهوية وتطبيقاتها للشركات حسب نطاق المشروع. / Logo design, brand guidelines, and visual identity applications tailored to each project.

## company-portfolio.html

- Component: InnerServicePage.
- Direct static URLs: `/Khatwa-Designs-Main/company-portfolio.html`, `/Khatwa-Designs-Main/ar/company-portfolio.html`, `/Khatwa-Designs-Main/en/company-portfolio.html`.
- Original headings/topics: cp_title; svc_scope_title; cp_inc1_title; cp_inc2_title; cp_inc3_title; cp_inc4_title; svc_for_title; svc_process_title; svc_faq_title; cp_q1; cp_q2; cp_q3; cp_q4; cp_q5; cp_cta.
- Preserved copy keys: cp_title, cp_intro, cta_quote, svc_scope_title, cp_inc1_title, cp_inc1_text, cp_inc2_title, cp_inc2_text, cp_inc3_title, cp_inc3_text, cp_inc4_title, cp_inc4_text, svc_for_title, cp_for1, cp_for2, cp_for3, cp_for4, cp_for5, svc_process_title, cp_step1, cp_step2, cp_step3, cp_step4, cp_step5, svc_faq_title, cp_q1, cp_a1, cp_q2, cp_a2, cp_q3, cp_a3, cp_q4, cp_a4, cp_q5, cp_a5, cp_cta.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: projects/ghayah.svg → https://www.behance.net/gallery/192450545/_; projects/wadi-al-abrakeen.svg → https://www.behance.net/gallery/193903091/_; related-service links: powerpoint-presentations.html, web-design.html, brand-identity.html, social-media-design.html.
- Original internal/external destinations: contact.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=cp_meta_title, description=cp_meta_desc; robots=index,follow.
- Arabic metadata title: تصميم بروفايلات شركات المقاولات والمكاتب الهندسية — خطوة
- English metadata title: Company Profile Design for Construction & Engineering Firms — Khatwa
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/company-portfolio.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/company-portfolio.html?lang=en.
- Descriptions (AR / EN): تنظيم المعلومات وكتابة المحتوى وتصميم بروفايلات احترافية لشركات المقاولات والمكاتب الهندسية وفق نطاق المشروع. / Content organization, writing, and professional company profile design for construction companies and engineering firms.

## contact.html

- Component: InnerContactPage / ContactPanel / unchanged ContactForm.
- Direct static URLs: `/Khatwa-Designs-Main/contact.html`, `/Khatwa-Designs-Main/ar/contact.html`, `/Khatwa-Designs-Main/en/contact.html`.
- Original headings/topics: contact_title; contact_form_title; contact_response_time; contact_clients.
- Preserved copy keys: contact_title, contact_intro_text, contact_form_title, contact_required_note, contact_response_time, contact_response_text, contact_consultation_text, contact_clients, contact_clients_text, cta_work.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Existing official social links from socials.json; no new contact claims.
- Original internal/external destinations: portfolio.html.
- Functional behavior: Unchanged six-field EmailJS form, service query preselection, validation/focus, loading, duplicate prevention, mocked transport, retry storage and privacy link; existing official social channels.
- SEO source keys: title=contact_meta_title, description=contact_meta_desc; robots=index,follow.
- Arabic metadata title: تواصل مع خطوة للتصميمات | اطلب عرض سعر
- English metadata title: Contact Khatwa Designs | Request a Quote
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/contact.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/contact.html?lang=en.
- Descriptions (AR / EN): تواصل مع خطوة للتصميمات لمناقشة مشروعات بروفايلات الشركات والعروض التقديمية وتصميم المواقع والهويات البصرية. / Contact Khatwa Designs to discuss company profiles, presentations, website design, and visual identity projects.

## copyright.html

- Component: InnerLegalPage.
- Direct static URLs: `/Khatwa-Designs-Main/copyright.html`, `/Khatwa-Designs-Main/ar/copyright.html`, `/Khatwa-Designs-Main/en/copyright.html`.
- Original headings/topics: Copyright Information; 1. Copyright Notice; 2. Intellectual Property Rights; 3. Licensed Content; 4. Brand Assets and Logos; 5. User-Generated Content; 6. Third-Party Content; 7. Permitted Uses; 8. Prohibited Uses; 9. DMCA Compliance; 10. Related Links.
- Preserved copy keys: Literal source body / runtime result messages / redirect fallback; no copy removed.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: mailto:partnerships@khatwa.com, mailto:legal@khatwa.com, privacy-policy.html, terms-and-conditions.html.
- Functional behavior: Entire English legal body and legal links preserved; Arabic availability notice remains. Source h4 sections promoted to h2 without copy changes.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=index,follow.
- Arabic metadata title: حقوق النشر | خطوة للتصميمات
- English metadata title: Copyright Information - Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/copyright.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/copyright.html?lang=en.
- Descriptions (AR / EN): Khatwa Designs Copyright Information and Intellectual Property Rights. / Khatwa Designs Copyright Information and Intellectual Property Rights.

## customer-stories.html

- Component: InnerReviewsPage.
- Direct static URLs: `/Khatwa-Designs-Main/customer-stories.html`, `/Khatwa-Designs-Main/ar/customer-stories.html`, `/Khatwa-Designs-Main/en/customer-stories.html`.
- Original headings/topics: cs_title.
- Preserved copy keys: cs_title, cs_intro, cs_rev1, cs_date1, cs_rev2, cs_date2, cs_rev3, cs_date3, cs_rev4, cs_date4, cs_rev5, cs_date5, cs_rev6, cs_date6, cs_rev7, cs_date7, cs_rev8, cs_date8, cs_rev9, cs_date9, cs_rev10, cs_date10, cs_rev11, cs_date11, cs_rev12, cs_date12, cs_note, cta_quote.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: contact.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=cs_meta_title, description=cs_meta_desc; robots=index,follow.
- Arabic metadata title: آراء عملاء خطوة للتصميمات
- English metadata title: Khatwa Designs Client Reviews
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/customer-stories.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/customer-stories.html?lang=en.
- Descriptions (AR / EN): اقرأ مختارات من توصيات العملاء المنشورة على صفحة خطوة للتصميمات على فيسبوك. / Read selected client recommendations published on Khatwa Designs’ Facebook page.

## index.html

- Component: HomePage (Phase 3; unchanged).
- Direct static URLs: `/Khatwa-Designs-Main/index.html`, `/Khatwa-Designs-Main/ar/index.html`, `/Khatwa-Designs-Main/en/index.html`.
- Original headings/topics: home_hero_title; home_services_title; home_svc1_title; home_svc2_title; home_svc3_title; home_svc4_title; home_svc5_title; home_why_title; home_why1_title; home_why2_title; home_why3_title; home_work_title; home_proj1; home_proj2; home_proj3; home_proj4; home_proj5; home_proj6; home_process_title; home_step1_title; home_step2_title; home_step3_title; home_step4_title; home_reviews_title; home_cta_title.
- Preserved copy keys: home_hero_kicker, home_hero_title, home_hero_text, cta_quote, cta_work, home_services_title, home_services_intro, home_svc1_title, home_svc1_text, link_service, home_svc2_title, home_svc2_text, home_svc3_title, home_svc3_text, home_svc4_title, home_svc4_text, home_svc5_title, home_svc5_text, home_why_title, home_why1_title, home_why1_text, home_why2_title, home_why2_text, home_why3_title, home_why3_text, home_work_title, home_work_intro, home_cat_contracting, home_proj1, home_work_view, home_proj2, home_cat_company, home_proj3, home_cat_office, home_proj4, home_cat_website, home_proj5, home_cat_presentation, home_proj6, home_work_all, home_process_title, home_step1_title, home_step1_text, home_step2_title, home_step2_text, home_step3_title, home_step3_text, home_step4_title, home_step4_text, home_reviews_title, home_reviews_intro, home_rev1, home_rev_date1, home_rev2, home_rev_date2, home_rev3, home_rev_date3, home_rev4, home_rev_date4, home_rev5, home_rev_date5, home_reviews_note, home_reviews_btn, home_cta_title, home_cta_text.
- Original page-specific assets: projects/ghayah.svg, projects/wadi-al-abrakeen.svg, projects/al-emar.svg, projects/bim-connection.svg, projects/al-maher.svg, projects/tpack.svg.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: contact.html, #work, company-portfolio.html, powerpoint-presentations.html, web-design.html, brand-identity.html, social-media-design.html, https://www.behance.net/gallery/192450545/_, https://www.behance.net/gallery/193903091/_, https://www.behance.net/gallery/202594407/_, https://www.behance.net/gallery/192151991/_, https://www.behance.net/gallery/203874479/_, https://www.behance.net/gallery/149311977/TPACK-Powerpoint-Presentation, portfolio.html, customer-stories.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=home_meta_title, description=home_meta_desc; robots=index,follow.
- Arabic metadata title: خطوة للتصميمات — بروفايلات ومواقع وهوية بصرية
- English metadata title: Khatwa Designs — Company Profiles, Websites & Branding
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/?lang=en.
- Descriptions (AR / EN): خطوة للتصميمات تساعد شركات المقاولات والمكاتب الهندسية في مصر والسعودية على إعداد بروفايلات الشركات والعروض الفنية وتصميم الهوية والمواقع الإلكترونية. / Khatwa Designs helps construction companies and engineering firms in Egypt and Saudi Arabia with company profiles, technical presentations, branding, and websites.

## logo-design.html

- Component: LegacyRedirectPage.
- Direct static URLs: `/Khatwa-Designs-Main/logo-design.html`, `/Khatwa-Designs-Main/ar/logo-design.html`, `/Khatwa-Designs-Main/en/logo-design.html`.
- Original headings/topics: Redirect replacement; original source content retained in archive.json.
- Preserved copy keys: Literal source body / runtime result messages / redirect fallback; no copy removed.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: brand-identity.html.
- Functional behavior: Replacement navigation and static fallback preserve query/language/fragment; no legacy service reintroduced.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=index,follow.
- Arabic metadata title: Logo Design | Khatwa Designs
- English metadata title: Logo Design | Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/logo-design.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/logo-design.html?lang=en.
- Descriptions (AR / EN): Discover Khatwa Designs logo design service, including concept development, revisions, and complete brand-ready logo delivery. / Discover Khatwa Designs logo design service, including concept development, revisions, and complete brand-ready logo delivery.

## n8n-ai-automations.html

- Component: LegacyRedirectPage.
- Direct static URLs: `/Khatwa-Designs-Main/n8n-ai-automations.html`, `/Khatwa-Designs-Main/ar/n8n-ai-automations.html`, `/Khatwa-Designs-Main/en/n8n-ai-automations.html`.
- Original headings/topics: Redirect replacement; original source content retained in archive.json.
- Preserved copy keys: Literal source body / runtime result messages / redirect fallback; no copy removed.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: services.html.
- Functional behavior: Replacement navigation and static fallback preserve query/language/fragment; no legacy service reintroduced.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=index,follow.
- Arabic metadata title: n8n and AI Automations | Khatwa Designs
- English metadata title: n8n and AI Automations | Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/n8n-ai-automations.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/n8n-ai-automations.html?lang=en.
- Descriptions (AR / EN): Automate repetitive workflows with n8n + AI solutions from Khatwa Designs for marketing operations and internal process efficiency. / Automate repetitive workflows with n8n + AI solutions from Khatwa Designs for marketing operations and internal process efficiency.

## portfolio.html

- Component: InnerPortfolioPage.
- Direct static URLs: `/Khatwa-Designs-Main/portfolio.html`, `/Khatwa-Designs-Main/ar/portfolio.html`, `/Khatwa-Designs-Main/en/portfolio.html`.
- Original headings/topics: pf_title; home_proj1; home_proj2; home_proj3; home_proj4; pf_proj7; home_proj6; home_proj5; pf_proj8; pf_proj9; pf_proj11; pf_proj12; pf_proj10.
- Preserved copy keys: pf_title, pf_intro, pf_f_all, pf_f_profiles, pf_f_presentations, pf_f_websites, pf_f_brand, pf_f_social, home_cat_contracting, home_proj1, home_work_view, home_proj2, home_cat_company, home_proj3, home_cat_office, home_proj4, pf_cat_portfolio, pf_proj7, pf_view_profile, home_cat_presentation, home_proj6, home_cat_website, home_proj5, pf_cat_website, pf_proj8, pf_proj9, pf_cat_brand, pf_proj11, pf_proj12, pf_cat_social, pf_proj10, cta_quote.
- Original page-specific assets: projects/ghayah.svg, projects/wadi-al-abrakeen.svg, projects/al-emar.svg, projects/bim-connection.svg, projects/engineering-group.svg, projects/tpack.svg, projects/al-maher.svg, projects/fahd-al-mutairi.svg, projects/omega.svg, projects/aya-roshdy.svg, projects/mohamed-el-naggar.svg, projects/talal-shaker.svg.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: https://www.behance.net/gallery/192450545/_, https://www.behance.net/gallery/193903091/_, https://www.behance.net/gallery/202594407/_, https://www.behance.net/gallery/192151991/_, https://www.behance.net/khatwadesigns2, https://www.behance.net/gallery/149311977/TPACK-Powerpoint-Presentation, https://www.behance.net/gallery/203874479/_, https://www.behance.net/gallery/215345183/_, https://www.behance.net/gallery/194950199/_, contact.html.
- Functional behavior: All twelve source projects; six native category filters; visible Behance links; keyboard/touch; reserved images; scoped mask/parallax cleanup.
- SEO source keys: title=pf_meta_title, description=pf_meta_desc; robots=index,follow.
- Arabic metadata title: أعمال خطوة للتصميمات
- English metadata title: Khatwa Designs Portfolio
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/portfolio.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/portfolio.html?lang=en.
- Descriptions (AR / EN): شاهد نماذج من بروفايلات الشركات والمواقع والهويات البصرية والعروض التقديمية التي نفذتها خطوة. / Explore selected company profiles, websites, visual identity, and presentation projects by Khatwa Designs.

## powerpoint-presentations.html

- Component: InnerServicePage.
- Direct static URLs: `/Khatwa-Designs-Main/powerpoint-presentations.html`, `/Khatwa-Designs-Main/ar/powerpoint-presentations.html`, `/Khatwa-Designs-Main/en/powerpoint-presentations.html`.
- Original headings/topics: pp_title; svc_scope_title; svc_types_title; svc_process_title; svc_faq_title; pp_q1; pp_q2; pp_q3; pp_q4; pp_cta.
- Preserved copy keys: pp_title, pp_intro, cta_quote, svc_scope_title, pp_inc1, pp_inc2, pp_inc3, pp_inc4, pp_inc5, svc_types_title, pp_type1, pp_type2, pp_type3, pp_type4, pp_type5, svc_process_title, pp_step1, pp_step2, pp_step3, pp_step4, pp_step5, svc_faq_title, pp_q1, pp_a1, pp_q2, pp_a2, pp_q3, pp_a3, pp_q4, pp_a4, pp_cta.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: projects/tpack.svg → https://www.behance.net/gallery/149311977/TPACK-Powerpoint-Presentation; related-service links: company-portfolio.html, web-design.html, brand-identity.html, social-media-design.html.
- Original internal/external destinations: contact.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=pp_meta_title, description=pp_meta_desc; robots=index,follow.
- Arabic metadata title: تصميم العروض التقديمية وملفات المناقصات — خطوة
- English metadata title: Presentation & Tender Document Design — Khatwa
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/powerpoint-presentations.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/powerpoint-presentations.html?lang=en.
- Descriptions (AR / EN): إعداد المحتوى وتحريره وتصميم العروض التقديمية والعروض الفنية وملفات المناقصات اعتمادًا على مستندات العميل. / Content organization, editing, and design for presentations, technical proposals, and tender documents based on client materials.

## privacy-policy.html

- Component: InnerLegalPage.
- Direct static URLs: `/Khatwa-Designs-Main/privacy-policy.html`, `/Khatwa-Designs-Main/ar/privacy-policy.html`, `/Khatwa-Designs-Main/en/privacy-policy.html`.
- Original headings/topics: Privacy Policy; 1. Introduction; 2. Information We Collect; 3. How We Use Your Information; 4. Data Protection and Security; 5. Sharing Your Information; 6. Your Rights and Choices; 7. Third-Party Links; 8. Children's Privacy; 9. Changes to This Policy; 10. Contact Us.
- Preserved copy keys: Literal source body / runtime result messages / redirect fallback; no copy removed.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: mailto:privacy@khatwa.com, contact.html.
- Functional behavior: Entire English legal body and legal links preserved; Arabic availability notice remains. Source h4 sections promoted to h2 without copy changes.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=index,follow.
- Arabic metadata title: سياسة الخصوصية | خطوة للتصميمات
- English metadata title: Privacy Policy - Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/privacy-policy.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/privacy-policy.html?lang=en.
- Descriptions (AR / EN): Khatwa Designs Privacy Policy - How we collect, use, and protect your information. / Khatwa Designs Privacy Policy - How we collect, use, and protect your information.

## services-details.html

- Component: LegacyRedirectPage.
- Direct static URLs: `/Khatwa-Designs-Main/services-details.html`, `/Khatwa-Designs-Main/ar/services-details.html`, `/Khatwa-Designs-Main/en/services-details.html`.
- Original headings/topics: Redirect replacement; original source content retained in archive.json.
- Preserved copy keys: Literal source body / runtime result messages / redirect fallback; no copy removed.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: services.html.
- Functional behavior: Replacement navigation and static fallback preserve query/language/fragment; no legacy service reintroduced.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=index,follow.
- Arabic metadata title: Creative Services | Khatwa Designs
- English metadata title: Creative Services | Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/services-details.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/services-details.html?lang=en.
- Descriptions (AR / EN): Discover Khatwa Designs logo design service, including concept development, revisions, and complete brand-ready logo delivery. / Discover Khatwa Designs logo design service, including concept development, revisions, and complete brand-ready logo delivery.

## services.html

- Component: InnerServicesPage.
- Direct static URLs: `/Khatwa-Designs-Main/services.html`, `/Khatwa-Designs-Main/ar/services.html`, `/Khatwa-Designs-Main/en/services.html`.
- Original headings/topics: home_services_title; nav_services; home_svc1_title; home_svc2_title; home_svc3_title; home_svc4_title; home_svc5_title; home_process_title; home_step1_title; home_step2_title; home_step3_title; home_step4_title.
- Preserved copy keys: home_services_title, home_services_intro, cta_work, nav_services, home_svc1_title, home_svc1_text, link_service, home_svc2_title, home_svc2_text, home_svc3_title, home_svc3_text, home_svc4_title, home_svc4_text, home_svc5_title, home_svc5_text, home_process_title, home_step1_title, home_step1_text, home_step2_title, home_step2_text, home_step3_title, home_step3_text, home_step4_title, home_step4_text.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: portfolio.html, company-portfolio.html, powerpoint-presentations.html, web-design.html, brand-identity.html, social-media-design.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=services_meta_title, description=services_meta_desc; robots=index,follow.
- Arabic metadata title: خدمات خطوة — بروفايلات الشركات والعروض والمواقع
- English metadata title: Services — Company Profiles, Presentations & Websites | Khatwa
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/services.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/services.html?lang=en.
- Descriptions (AR / EN): تعرّف على خدمات خطوة للتصميمات: بروفايلات الشركات والعروض وملفات المناقصات والمواقع الإلكترونية والهوية البصرية وتصميم السوشيال ميديا. / Explore company profile design, presentation and tender document design, website development, visual identity, and social media design by Khatwa Designs.

## social-media-design.html

- Component: InnerServicePage.
- Direct static URLs: `/Khatwa-Designs-Main/social-media-design.html`, `/Khatwa-Designs-Main/ar/social-media-design.html`, `/Khatwa-Designs-Main/en/social-media-design.html`.
- Original headings/topics: sm_title; svc_scope_title; svc_process_title; sm_note_title; svc_faq_title; sm_q1; sm_q2; sm_q3; sm_cta.
- Preserved copy keys: sm_title, sm_intro, cta_quote, svc_scope_title, sm_inc1, sm_inc2, sm_inc3, sm_inc4, svc_process_title, sm_step1, sm_step2, sm_step3, sm_step4, sm_note_title, sm_note, svc_faq_title, sm_q1, sm_a1, sm_q2, sm_a2, sm_q3, sm_a3, sm_cta.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: projects/talal-shaker.svg → https://www.behance.net/khatwadesigns2; related-service links: company-portfolio.html, powerpoint-presentations.html, web-design.html, brand-identity.html.
- Original internal/external destinations: contact.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=sm_meta_title, description=sm_meta_desc; robots=index,follow.
- Arabic metadata title: تصميم منشورات السوشيال ميديا للشركات — خطوة
- English metadata title: Social Media Design for Businesses — Khatwa
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/social-media-design.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/social-media-design.html?lang=en.
- Descriptions (AR / EN): تصميم منشورات سوشيال ميديا متناسقة مع هوية الشركة باستخدام النصوص والصور التي يقدمها العميل. / Social media post designs aligned with your brand, using client-provided text and images.

## social-media-management.html

- Component: LegacyRedirectPage.
- Direct static URLs: `/Khatwa-Designs-Main/social-media-management.html`, `/Khatwa-Designs-Main/ar/social-media-management.html`, `/Khatwa-Designs-Main/en/social-media-management.html`.
- Original headings/topics: Redirect replacement; original source content retained in archive.json.
- Preserved copy keys: Literal source body / runtime result messages / redirect fallback; no copy removed.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: services.html.
- Functional behavior: Replacement navigation and static fallback preserve query/language/fragment; no legacy service reintroduced.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=index,follow.
- Arabic metadata title: Social Media Management | Khatwa Designs
- English metadata title: Social Media Management | Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/social-media-management.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/social-media-management.html?lang=en.
- Descriptions (AR / EN): Khatwa Designs social media management service covers planning, scheduling, moderation, and performance reporting. / Khatwa Designs social media management service covers planning, scheduling, moderation, and performance reporting.

## terms-and-conditions.html

- Component: InnerLegalPage.
- Direct static URLs: `/Khatwa-Designs-Main/terms-and-conditions.html`, `/Khatwa-Designs-Main/ar/terms-and-conditions.html`, `/Khatwa-Designs-Main/en/terms-and-conditions.html`.
- Original headings/topics: Terms and Conditions; 1. Agreement to Terms; 2. Use License; 3. Disclaimer; 4. Limitations; 5. Accuracy of Materials; 6. Links; 7. Modifications; 8. Governing Law; 9. Contact Information.
- Preserved copy keys: Literal source body / runtime result messages / redirect fallback; no copy removed.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: contact.html.
- Functional behavior: Entire English legal body and legal links preserved; Arabic availability notice remains. Source h4 sections promoted to h2 without copy changes.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=index,follow.
- Arabic metadata title: الشروط والأحكام | خطوة للتصميمات
- English metadata title: Terms and Conditions - Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/terms-and-conditions.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/terms-and-conditions.html?lang=en.
- Descriptions (AR / EN): Khatwa Designs Terms and Conditions - Our terms governing your use of our website and services. / Khatwa Designs Terms and Conditions - Our terms governing your use of our website and services.

## thank-you.html

- Component: ResultPage / InnerPageHero.
- Direct static URLs: `/Khatwa-Designs-Main/thank-you.html`, `/Khatwa-Designs-Main/ar/thank-you.html`, `/Khatwa-Designs-Main/en/thank-you.html`.
- Original headings/topics: تواصل مع خطوة للتصميمات.
- Preserved copy keys: thankyou_home.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: contact.html?lang=ar, index.html?lang=ar.
- Functional behavior: Neutral/success/error query states; live status/error announcement; existing retry and home destinations. SEO remains state-specific.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=noindex,follow.
- Arabic metadata title: تواصل مع خطوة للتصميمات
- English metadata title: Contact Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/thank-you.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/thank-you.html?lang=en.
- Descriptions (AR / EN): شاركنا تفاصيل مشروعك من خلال نموذج التواصل. / Share your project details through our contact form.

## video-presentations.html

- Component: LegacyRedirectPage.
- Direct static URLs: `/Khatwa-Designs-Main/video-presentations.html`, `/Khatwa-Designs-Main/ar/video-presentations.html`, `/Khatwa-Designs-Main/en/video-presentations.html`.
- Original headings/topics: Redirect replacement; original source content retained in archive.json.
- Preserved copy keys: Literal source body / runtime result messages / redirect fallback; no copy removed.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: Shared existing contact messaging where useful; no new assets or claims.
- Original internal/external destinations: services.html.
- Functional behavior: Replacement navigation and static fallback preserve query/language/fragment; no legacy service reintroduced.
- SEO source keys: title=literal/state-specific, description=literal/state-specific; robots=index,follow.
- Arabic metadata title: Video Presentations | Khatwa Designs
- English metadata title: Video Presentations | Khatwa Designs
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/video-presentations.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/video-presentations.html?lang=en.
- Descriptions (AR / EN): Khatwa Designs produces video presentations for company overviews, proposals, and campaign storytelling with clear visual structure. / Khatwa Designs produces video presentations for company overviews, proposals, and campaign storytelling with clear visual structure.

## web-design.html

- Component: InnerServicePage.
- Direct static URLs: `/Khatwa-Designs-Main/web-design.html`, `/Khatwa-Designs-Main/ar/web-design.html`, `/Khatwa-Designs-Main/en/web-design.html`.
- Original headings/topics: wd_title; svc_scope_title; wd_types_title; svc_process_title; svc_faq_title; wd_q1; wd_q2; wd_q3; wd_q4; wd_q5; wd_cta.
- Preserved copy keys: wd_title, wd_intro, cta_quote, svc_scope_title, wd_inc1, wd_inc2, wd_inc3, wd_inc4, wd_inc5, wd_inc6, wd_types_title, wd_type1, wd_type2, wd_type3, wd_type4, wd_type5, svc_process_title, wd_step1, wd_step2, wd_step3, wd_step4, wd_step5, svc_faq_title, wd_q1, wd_a1, wd_q2, wd_a2, wd_q3, wd_a3, wd_q4, wd_a4, wd_q5, wd_a5, wd_cta.
- Original page-specific assets: No page-specific img nodes; shared brand assets retained.
- Grounded additions: projects/al-maher.svg → https://www.behance.net/gallery/203874479/_; projects/fahd-al-mutairi.svg → https://www.behance.net/gallery/215345183/_; related-service links: company-portfolio.html, powerpoint-presentations.html, brand-identity.html, social-media-design.html.
- Original internal/external destinations: contact.html.
- Functional behavior: Language-aware internal links, selected heading/section/CTA motion; no new business facts. Existing source copy and destinations retained.
- SEO source keys: title=wd_meta_title, description=wd_meta_desc; robots=index,follow.
- Arabic metadata title: تصميم وتطوير المواقع الإلكترونية للشركات — خطوة
- English metadata title: Website Design & Development for Businesses — Khatwa
- Canonicals: https://m-elmaghawry.github.io/Khatwa-Designs-Main/web-design.html?lang=ar ; https://m-elmaghawry.github.io/Khatwa-Designs-Main/en/web-design.html?lang=en.
- Descriptions (AR / EN): تخطيط محتوى المواقع وتصميمها وتطويرها وتجهيزها للنشر للشركات والمكاتب الهندسية، مع صيانة اختيارية بعد الإطلاق. / Website content planning, design, development, and launch preparation for businesses and engineering firms, with optional maintenance.

## Excluded and archived source routes

| Source | Published status | Phase 4 action |
| --- | --- | --- |
| blog.html | Excluded before/after; remains absent from React routes and public build | Source HTML and archive.json retained; no redesign/publication |
| blog-single-clean.html | Excluded before/after; remains absent from React routes and public build | Source HTML and archive.json retained; no redesign/publication |
| coming-soon.html | Excluded before/after; remains absent from React routes and public build | Source HTML and archive.json retained; no redesign/publication |
| maintenance.html | Excluded before/after; remains absent from React routes and public build | Source HTML and archive.json retained; no redesign/publication |
| search-result.html | Excluded before/after; remains absent from React routes and public build | Source HTML and archive.json retained; no redesign/publication |

All five redirect sources also retain historical content in archive.json. Actual redirect configuration: {"logo-design.html":"brand-identity.html","services-details.html":"services.html","social-media-management.html":"services.html","video-presentations.html":"services.html","n8n-ai-automations.html":"services.html"}.

## Validation and remaining review

The existing foundation suite validates route/config equality, all locale static metadata/links, strict direct-entry/refresh/404 behavior and every redirect destination/fragment/query. Phase 4 preservation tests compare all source-backed page copy and literal legal blocks in both languages. Browser results and visual limitations are recorded separately in PHASE-4-VISUAL-QA.md.
