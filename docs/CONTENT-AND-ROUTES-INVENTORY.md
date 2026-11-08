# Content and routes inventory

Baseline: `a831f3d456767b5c4116c3477f9f79726e296f51`, audited 8 November 2026. This is a source inventory, not a redesign or endorsement of legacy demo claims. Files remain unchanged. All paths below are relative to the repository root and public project base `/Khatwa-Designs-Main/`.

## Coverage and content authority

There are **26 tracked HTML pages**: 16 published content/error documents, 5 published redirect replacements, and 5 source-only excluded pages. No nested HTML pages were found. There are 394 English and 394 Arabic translation entries. The complete key/value inventory appears below.

The approved business content is in `docs/Khatwa_Designs_Content_Master_AR_EN_v1.md`. Actual pages, `js/khatwa-i18n.js`, `js/khatwa-layout.js`, `scripts/site-config.js` and `scripts/prepare-site.js` establish runtime and publication behavior. Retain both approved source material and actual baseline content; resolve discrepancies during review rather than silently dropping material.

Company: Khatwa Designs / خطوة للتصميمات; founded 2021, Mansoura, Egypt; primary markets Egypt and Saudi Arabia. Priority: company profiles, presentations/tenders, websites, then identity and social media design. Social media scope is design only. Technical/commercial facts remain subject to client approval. Conversion is a project-specific quote, with no invented monthly prices or performance claims.

## Every page and public route

`/` and `/index.html` serve the home page. Each content route supports explicit `?lang=ar` and `?lang=en`; preserve query parameters and fragments. Route status below reflects artifact preparation, not merely files present on disk.

| Source / route | Production behavior | Baseline title |
| --- | --- | --- |
| `404.html` | Published HTML | Page Not Found &#124; Khatwa Designs |
| `about.html` | Published HTML | About Khatwa Designs — Engineering-Focused Creative Partner |
| `blog-single-clean.html` | Excluded from `_site`; retained in source | Khatwa Designs - خطوة للتصميمات |
| `blog.html` | Excluded from `_site`; retained in source | Khatwa Designs - خطوة للتصميمات |
| `brand-identity.html` | Published HTML | Logo Design & Visual Identity — Khatwa |
| `coming-soon.html` | Excluded from `_site`; retained in source | Khatwa Designs - خطوة للتصميمات |
| `company-portfolio.html` | Published HTML | Company Profile Design for Construction & Engineering Firms — Khatwa |
| `contact.html` | Published HTML | Request a Quote &#124; Khatwa Designs |
| `copyright.html` | Published HTML | Copyright Information - Khatwa Designs |
| `customer-stories.html` | Published HTML | Khatwa Designs Client Reviews |
| `index.html` | Published HTML | Khatwa Designs — Company Profiles, Websites & Branding |
| `logo-design.html` | Redirect replacement to `brand-identity.html`; source content retained | Logo Design &#124; Khatwa Designs |
| `maintenance.html` | Excluded from `_site`; retained in source | Khatwa Designs - خطوة للتصميمات |
| `n8n-ai-automations.html` | Redirect replacement to `services.html`; source content retained | n8n and AI Automations &#124; Khatwa Designs |
| `portfolio.html` | Published HTML | Khatwa Designs Portfolio |
| `powerpoint-presentations.html` | Published HTML | Presentation & Tender Document Design — Khatwa |
| `privacy-policy.html` | Published HTML | Privacy Policy - Khatwa Designs |
| `search-result.html` | Excluded from `_site`; retained in source | Search Results &#124; Khatwa Designs |
| `services-details.html` | Redirect replacement to `services.html`; source content retained | Creative Services &#124; Khatwa Designs |
| `services.html` | Published HTML | Services — Company Profiles, Presentations & Websites &#124; Khatwa |
| `social-media-design.html` | Published HTML | Social Media Design for Businesses — Khatwa |
| `social-media-management.html` | Redirect replacement to `services.html`; source content retained | Social Media Management &#124; Khatwa Designs |
| `terms-and-conditions.html` | Published HTML | Terms and Conditions - Khatwa Designs |
| `thank-you.html` | Published HTML | تواصل مع خطوة للتصميمات |
| `video-presentations.html` | Redirect replacement to `services.html`; source content retained | Video Presentations &#124; Khatwa Designs |
| `web-design.html` | Published HTML | Website Design & Development for Businesses — Khatwa |

The five redirect replacements are generated only in `_site`; source files retain historical content and forms. `js/redirect.js` preserves language, other query parameters and fragment, with an accessible link fallback. Excluded blog/search/coming-soon/maintenance content must not be newly published without review. `404.html` remains a dedicated error document. Legal pages are currently published even though their body text is not fully localized; translation coverage tests do not prove complete bilingual legal copy.

## Shared content, branding and integration

- Shared header/footer: `js/khatwa-layout.js`; home, about, services with five detail links, work, reviews, contact, quote CTA, English/Arabic controls; footer social profiles, service links, copyright and three legal links.
- Primary logos: `images/khatwa-logo.png`, `images/khatwa-logo@2x.png`; favicon and Apple touch icons are retained. Do not replace with demo logo variants.
- Palette in `css/corporate.css`: blue `#1C3664`, yellow `#FFCD05`, light gray `#CCCCCB`, supporting gray `#626879`. Fonts: IBM Plex Sans Arabic and Plus Jakarta Sans via the existing Google Fonts import; preserve original assets and review fallback/loading.
- Contact fields: `name`, `email`, `country_code`, `phone_number`, `subject`, `comment`, plus hidden legacy `redirect`. EmailJS parameters are built from named non-hidden fields. Keep the existing field values, recipient behavior and configuration in `js/khatwa-emailjs-config.js`; do not duplicate configuration values or credentials in these documents.
- EmailJS sends to `https://api.emailjs.com/api/v1.0/email/send` with service/template/user IDs and `template_params`. Current handler requires HTTP 200, prevents duplicate submissions, aborts after 20 seconds, restores BFCache state and routes to `thank-you.html?status=success|error&lang=...`. Do not live-submit forms during this audit.
- `contact.html?service=profiles|presentations|websites|brand|social` preselects the existing service value. `contact.html?retry=1` restores the failed inquiry draft from sessionStorage key `khatwa_contact_retry`, for up to 30 minutes; no inquiry contents belong in the URL.
- Language: `?lang=ar|en`, localStorage key `khatwa_lang`, current Arabic fallback. Initialization uses the explicit supported query language or Arabic, writes the preference, and does not call the existing saved-preference reader. Preserve Arabic default and URL conventions. Document direction, titles, descriptions, canonicals and language-aware links are managed by i18n.
- SEO: `sitemap.xml`, `robots.txt`, per-page canonical/hreflang/Open Graph metadata. Baseline sitemap has 22 URL entries: English/Arabic pairs for eleven primary routes, with English x-default; it does not enumerate every published legal/result/error page. Review intentional coverage rather than blindly expanding indexing.
- No current Vite config, React router, custom-domain CNAME, analytics tag, CAPTCHA or server-side Pages integration was established in the inspected active pages. No tracked PHP files were found. Preserve legacy template form source; it must not be mistaken for a working Pages backend.
- Contact information in active content is the quote form and official social profiles. Legal pages contain `privacy@khatwa.com`, `legal@khatwa.com` and `partnerships@khatwa.com`; these are source-present, not independently verified mailboxes. No verified public telephone/address value should be invented.

## Portfolio projects and preserved destinations

All twelve visible portfolio cards use repository SVG covers. `projects/README.md` explicitly identifies these as owner-requested temporary covers, not actual screenshots of delivered work. Preserve cover-to-project mapping and replace only with approved original assets in the next phase. Six projects are featured on the homepage. The complete source-confirmed link inventory below does not claim a live external availability check.

| Project | Cover | Existing destination |
| --- | --- | --- |
| Ghayah Contracting Company Profile | `projects/ghayah.svg` | https://www.behance.net/gallery/192450545/_ |
| Wadi Al-Abrakeen Contracting Company Profile | `projects/wadi-al-abrakeen.svg` | https://www.behance.net/gallery/193903091/_ |
| Al-Emar Al-Fareed Company Profile | `projects/al-emar.svg` | https://www.behance.net/gallery/202594407/_ |
| BIM Connection Engineering Office Profile | `projects/bim-connection.svg` | https://www.behance.net/gallery/192151991/_ |
| Engineering Group Portfolio | `projects/engineering-group.svg` | https://www.behance.net/khatwadesigns2 |
| TPACK PowerPoint Presentation | `projects/tpack.svg` | https://www.behance.net/gallery/149311977/TPACK-Powerpoint-Presentation |
| Al-Maher Electromechanical Website | `projects/al-maher.svg` | https://www.behance.net/gallery/203874479/_ |
| Lawyer Fahad Al-Mutairi Company Website | `projects/fahd-al-mutairi.svg` | https://www.behance.net/gallery/215345183/_ |
| Omega Training Academy Website | `projects/omega.svg` | https://www.behance.net/gallery/194950199/_ |
| Eng. Aya Rushdy — Branding | `projects/aya-roshdy.svg` | https://www.behance.net/khatwadesigns2 |
| Eng. Mohamed Al-Najjar — Branding | `projects/mohamed-el-naggar.svg` | https://www.behance.net/khatwadesigns2 |
| Social Media Designs — Eng. Talal Shaker’s Office | `projects/talal-shaker.svg` | https://www.behance.net/khatwadesigns2 |

The Engineering Group, Aya Rushdy, Mohamed Al-Najjar and Talal Shaker cards link to the existing Behance profile, not fabricated project detail URLs. The master also contains **Bank Albilad Vision booklet** at `https://www.behance.net/gallery/149628683/_`, which is not a current visible card; retain this source material and ask for content placement review in V2. The master uses paginated profile references for some projects; preserve those provenance notes.

## Reviews

The customer-stories page contains twelve named reviews, with original Arabic and existing English translations in `cs_rev1` through `cs_rev12`. Preserve dates, attribution and translation status. The master cites owner-provided `KH-002.pdf`; that PDF was not found in tracked files, so its original screenshots were not independently re-verified. Farida Gerges wording has an existing source-verification caution; do not turn the current summary into an invented verbatim quotation.

| Reviewer | Existing date | Text keys |
| --- | --- | --- |
| Rana Ahmed | 3 October 2021 | `cs_rev1`, `cs_date1` |
| Mohamed Ibrahim | 3 October 2021 | `cs_rev2`, `cs_date2` |
| Mahmoud Hussein Shafik | 11 September 2021 | `cs_rev3`, `cs_date3` |
| Hesham Mohamed | 11 September 2021 | `cs_rev4`, `cs_date4` |
| Amro Ahmed Abdallah | 11 September 2021 | `cs_rev5`, `cs_date5` |
| Farida Gerges | 13 July 2021 | `cs_rev6`, `cs_date6` |
| Walaa Elshaboury | 8 July 2021 | `cs_rev7`, `cs_date7` |
| Aya Fathy | 7 July 2021 | `cs_rev8`, `cs_date8` |
| Gehad Mohamed Amin | 7 July 2021 | `cs_rev9`, `cs_date9` |
| Amira Hassan | 15 May 2021 | `cs_rev10`, `cs_date10` |
| Mahmoud Elsayed | 15 May 2021 | `cs_rev11`, `cs_date11` |
| Mahmoud Ali Saleh | 15 May 2021 | `cs_rev12`, `cs_date12` |

## Per-page content and preservation map

Headings below identify page topics; every translation key used by each source page is listed for migration mapping. Non-translated body/legal/template prose remains authoritative in the named baseline HTML and must be preserved before adaptation. Excluded and redirected source topics are recorded for archive continuity, not promoted as approved current services.

### `404.html`

- Sorry - `page404_kicker`
- 404
- Page not found! - `page404_title`

Content keys: `page404_home`, `page404_kicker`, `page404_meta_desc`, `page404_meta_title`, `page404_text`, `page404_title`.

### `about.html`

- We Understand Your Industry. We Help You Present It Better. - `ab_title`
- Our Mission - `ab_mission_title`
- Our Vision - `ab_vision_title`
- Our Values - `ab_values_title`

Content keys: `ab_closing`, `ab_meta_desc`, `ab_meta_title`, `ab_mission`, `ab_mission_title`, `ab_p1`, `ab_p2`, `ab_p3`, `ab_p4`, `ab_title`, `ab_val1`, `ab_val2`, `ab_val3`, `ab_val4`, `ab_val5`, `ab_values_title`, `ab_vision`, `ab_vision_title`, `cta_quote`, `cta_services`.

### `blog-single-clean.html`

- What strong design direction looks like before production begins.
- When direction is clear, design reviews become sharper, faster, and more useful.
- A useful strategy brief answers the questions design usually inherits too late.
- Direction should reduce noise, not add more documents.
- Consistency grows when teams know what should never change.
- Related posts
- 4 Comments
- Share your perspective

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`, `#comments`.

### `blog.html`

- Insights and ideas

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`, `#down-section`.

### `brand-identity.html`

- A Visual Identity That Reflects Your Business and Keeps Every Touchpoint Consistent. - `bi_title`
- What’s Included? - `svc_scope_title`
- Our Process - `svc_process_title`
- Frequently Asked Questions - `svc_faq_title`
- Is the service limited to logo design? - `bi_q1`
- Which applications can be included? - `bi_q2`
- Which files will I receive? - `bi_q3`
- Build Your Brand Identity — Request a Quote. - `bi_cta`

Content keys: `bi_a1`, `bi_a2`, `bi_a3`, `bi_cta`, `bi_inc1`, `bi_inc2`, `bi_inc3`, `bi_inc4`, `bi_inc5`, `bi_intro`, `bi_meta_desc`, `bi_meta_title`, `bi_q1`, `bi_q2`, `bi_q3`, `bi_step1`, `bi_step2`, `bi_step3`, `bi_step4`, `bi_step5`, `bi_title`, `cta_quote`, `svc_faq_title`, `svc_process_title`, `svc_scope_title`.

### `coming-soon.html`

- Coming soon!
- We're getting ready to launch!

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#particles-style-01`.

### `company-portfolio.html`

- More Than Design. A Company Profile Built Around Your Business. - `cp_title`
- What’s Included? - `svc_scope_title`
- Information Organization - `cp_inc1_title`
- Content Writing & Editing - `cp_inc2_title`
- Design & Final Production - `cp_inc3_title`
- Final Delivery - `cp_inc4_title`
- Who Is This For? - `svc_for_title`
- Our Process - `svc_process_title`
- Frequently Asked Questions - `svc_faq_title`
- Do you write the content or only design the profile? - `cp_q1`
- Can you update an existing company profile? - `cp_q2`
- Do you independently verify technical information? - `cp_q3`
- Can the profile be produced in Arabic and English? - `cp_q4`
- Which files will I receive? - `cp_q5`
- Share your company information and request a quote for your profile. - `cp_cta`

Content keys: `cp_a1`, `cp_a2`, `cp_a3`, `cp_a4`, `cp_a5`, `cp_cta`, `cp_for1`, `cp_for2`, `cp_for3`, `cp_for4`, `cp_for5`, `cp_inc1_text`, `cp_inc1_title`, `cp_inc2_text`, `cp_inc2_title`, `cp_inc3_text`, `cp_inc3_title`, `cp_inc4_text`, `cp_inc4_title`, `cp_intro`, `cp_meta_desc`, `cp_meta_title`, `cp_q1`, `cp_q2`, `cp_q3`, `cp_q4`, `cp_q5`, `cp_step1`, `cp_step2`, `cp_step3`, `cp_step4`, `cp_step5`, `cp_title`, `cta_quote`, `svc_faq_title`, `svc_for_title`, `svc_process_title`, `svc_scope_title`.

### `contact.html`

- Contact us - `contact_title`
- Share the context and we'll help you shape the next move. - `contact_form_title`
- Next steps - `contact_response_time`
- Who we work with - `contact_clients`

Content keys: `contact_clients`, `contact_clients_text`, `contact_consultation_text`, `contact_country_label`, `contact_details_label`, `contact_details_placeholder`, `contact_email_label`, `contact_email_placeholder`, `contact_form_title`, `contact_intro_text`, `contact_meta_desc`, `contact_meta_title`, `contact_name_label`, `contact_name_placeholder`, `contact_phone_label`, `contact_phone_placeholder`, `contact_privacy_note`, `contact_required_note`, `contact_response_text`, `contact_response_time`, `contact_service_label`, `contact_service_placeholder`, `contact_submit`, `contact_title`, `country_bahrain`, `country_egypt`, `country_iraq`, `country_kuwait`, `country_other`, `country_qatar`, `country_saudi`, `country_spain`, `country_turkey`, `country_uae`, `cta_work`, `service_brand`, `service_presentations`, `service_profiles`, `service_social`, `service_web`.

Existing fragment / element IDs: `#contact-form`, `#exampleInputEmail1`, `#exampleInputEmail2`, `#countryCode`, `#exampleInputEmail3`, `#serviceNeed`, `#projectDetails`, `#exampleInputEmail5`.

### `copyright.html`

- Copyright Information
- 1. Copyright Notice
- 2. Intellectual Property Rights
- 3. Licensed Content
- 4. Brand Assets and Logos
- 5. User-Generated Content
- 6. Third-Party Content
- 7. Permitted Uses
- 8. Prohibited Uses
- 9. DMCA Compliance
- 10. Related Links

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`.

### `customer-stories.html`

- What Clients Say About Working with Khatwa. - `cs_title`

Content keys: `cs_date1`, `cs_date10`, `cs_date11`, `cs_date12`, `cs_date2`, `cs_date3`, `cs_date4`, `cs_date5`, `cs_date6`, `cs_date7`, `cs_date8`, `cs_date9`, `cs_intro`, `cs_meta_desc`, `cs_meta_title`, `cs_note`, `cs_rev1`, `cs_rev10`, `cs_rev11`, `cs_rev12`, `cs_rev2`, `cs_rev3`, `cs_rev4`, `cs_rev5`, `cs_rev6`, `cs_rev7`, `cs_rev8`, `cs_rev9`, `cs_title`, `cta_quote`.

### `index.html`

- Creative Solutions for the Engineering Industry. - `home_hero_title`
- Design Services That Present Your Business Professionally. - `home_services_title`
- Company Profiles & Engineering Portfolios - `home_svc1_title`
- Presentations & Tender Documents - `home_svc2_title`
- Website Design & Development - `home_svc3_title`
- Logo Design & Visual Identity - `home_svc4_title`
- Social Media Design - `home_svc5_title`
- We Understand Your Business Before We Start Designing. - `home_why_title`
- Engineering Industry Insight - `home_why1_title`
- Content and Design Together - `home_why2_title`
- From Brief to Delivery - `home_why3_title`
- Selected Work by Khatwa Designs. - `home_work_title`
- Ghayah Contracting Company Profile - `home_proj1`
- Wadi Al-Abrakeen Contracting Company Profile - `home_proj2`
- Al-Emar Al-Fareed Company Profile - `home_proj3`
- BIM Connection Engineering Office Profile - `home_proj4`
- Al-Maher Electromechanical Website - `home_proj5`
- TPACK PowerPoint Presentation - `home_proj6`
- A Clear Process from Brief to Delivery. - `home_process_title`
- Understand the Need - `home_step1_title`
- Organize the Information - `home_step2_title`
- Design and Review - `home_step3_title`
- Deliver the Files - `home_step4_title`
- Built on Real Client Experiences. - `home_reviews_title`
- Have a Project in Mind? - `home_cta_title`

Content keys: `cta_quote`, `cta_work`, `home_cat_company`, `home_cat_contracting`, `home_cat_office`, `home_cat_presentation`, `home_cat_website`, `home_cta_text`, `home_cta_title`, `home_hero_kicker`, `home_hero_text`, `home_hero_title`, `home_process_title`, `home_proj1`, `home_proj2`, `home_proj3`, `home_proj4`, `home_proj5`, `home_proj6`, `home_rev1`, `home_rev2`, `home_rev3`, `home_rev4`, `home_rev5`, `home_rev_date1`, `home_rev_date2`, `home_rev_date3`, `home_rev_date4`, `home_rev_date5`, `home_reviews_btn`, `home_reviews_intro`, `home_reviews_note`, `home_reviews_title`, `home_services_intro`, `home_services_title`, `home_step1_text`, `home_step1_title`, `home_step2_text`, `home_step2_title`, `home_step3_text`, `home_step3_title`, `home_step4_text`, `home_step4_title`, `home_svc1_text`, `home_svc1_title`, `home_svc2_text`, `home_svc2_title`, `home_svc3_text`, `home_svc3_title`, `home_svc4_text`, `home_svc4_title`, `home_svc5_text`, `home_svc5_title`, `home_why1_text`, `home_why1_title`, `home_why2_text`, `home_why2_title`, `home_why3_text`, `home_why3_title`, `home_why_title`, `home_work_all`, `home_work_intro`, `home_work_title`, `home_work_view`, `link_service`.

Existing fragment / element IDs: `#slider`, `#services`, `#work`, `#closing-cta`.

### `logo-design.html`

- Logo design
- Logo systems built for clarity, recall, and real-world use
- Why teams choose this approach

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`.

### `maintenance.html`

- The website is in maintenance mode.

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

### `n8n-ai-automations.html`

- n8n + AI automations
- n8n + AI automations for smarter execution
- Why teams choose this approach

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`.

### `portfolio.html`

- Selected Projects by Khatwa Designs. - `pf_title`
- Ghayah Contracting Company Profile - `home_proj1`
- Wadi Al-Abrakeen Contracting Company Profile - `home_proj2`
- Al-Emar Al-Fareed Company Profile - `home_proj3`
- BIM Connection Engineering Office Profile - `home_proj4`
- Engineering Group Portfolio - `pf_proj7`
- TPACK PowerPoint Presentation - `home_proj6`
- Al-Maher Electromechanical Website - `home_proj5`
- Lawyer Fahad Al-Mutairi Company Website - `pf_proj8`
- Omega Training Academy Website - `pf_proj9`
- Eng. Aya Rushdy — Branding - `pf_proj11`
- Eng. Mohamed Al-Najjar — Branding - `pf_proj12`
- Social Media Designs — Eng. Talal Shaker’s Office - `pf_proj10`

Content keys: `cta_quote`, `home_cat_company`, `home_cat_contracting`, `home_cat_office`, `home_cat_presentation`, `home_cat_website`, `home_proj1`, `home_proj2`, `home_proj3`, `home_proj4`, `home_proj5`, `home_proj6`, `home_work_view`, `pf_cat_brand`, `pf_cat_portfolio`, `pf_cat_social`, `pf_cat_website`, `pf_f_all`, `pf_f_brand`, `pf_f_presentations`, `pf_f_profiles`, `pf_f_social`, `pf_f_websites`, `pf_filters_label`, `pf_intro`, `pf_meta_desc`, `pf_meta_title`, `pf_proj10`, `pf_proj11`, `pf_proj12`, `pf_proj7`, `pf_proj8`, `pf_proj9`, `pf_title`, `pf_view_profile`.

Existing fragment / element IDs: `#work-filters`.

### `powerpoint-presentations.html`

- Structured Content. Professional Presentation. A Clearer Picture of Your Capabilities. - `pp_title`
- What’s Included? - `svc_scope_title`
- Project Types - `svc_types_title`
- Our Process - `svc_process_title`
- Frequently Asked Questions - `svc_faq_title`
- Can you write the presentation content based on our documents? - `pp_q1`
- Does the service include engineering preparation or tender approval? - `pp_q2`
- Can you improve an existing presentation? - `pp_q3`
- Can the deliverables be defined in advance? - `pp_q4`
- Share your presentation requirements and available documents to request a quote. - `pp_cta`

Content keys: `cta_quote`, `pp_a1`, `pp_a2`, `pp_a3`, `pp_a4`, `pp_cta`, `pp_inc1`, `pp_inc2`, `pp_inc3`, `pp_inc4`, `pp_inc5`, `pp_intro`, `pp_meta_desc`, `pp_meta_title`, `pp_q1`, `pp_q2`, `pp_q3`, `pp_q4`, `pp_step1`, `pp_step2`, `pp_step3`, `pp_step4`, `pp_step5`, `pp_title`, `pp_type1`, `pp_type2`, `pp_type3`, `pp_type4`, `pp_type5`, `svc_faq_title`, `svc_process_title`, `svc_scope_title`, `svc_types_title`.

### `privacy-policy.html`

- Privacy Policy
- 1. Introduction
- 2. Information We Collect
- 3. How We Use Your Information
- 4. Data Protection and Security
- 5. Sharing Your Information
- 6. Your Rights and Choices
- 7. Third-Party Links
- 8. Children's Privacy
- 9. Changes to This Policy
- 10. Contact Us

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`.

### `search-result.html`

- Search results for "Blog"
- Craft a standout website with crafto.

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink1`, `#navbarDropdownMenuLink2`, `#navbarDropdownMenuLink3`, `#navbarDropdownMenuLink4`, `#navbarDropdownMenuLink5`, `#navbarDropdownMenuLink6`, `#navbarDropdownMenuLink7`.

### `services-details.html`

- Logo design
- Logo systems built for clarity, recall, and real-world use
- Why teams choose this approach

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`.

### `services.html`

- Design Services That Present Your Business Professionally. - `home_services_title`
- Services - `nav_services`
- Company Profiles & Engineering Portfolios - `home_svc1_title`
- Presentations & Tender Documents - `home_svc2_title`
- Website Design & Development - `home_svc3_title`
- Logo Design & Visual Identity - `home_svc4_title`
- Social Media Design - `home_svc5_title`
- A Clear Process from Brief to Delivery. - `home_process_title`
- Understand the Need - `home_step1_title`
- Organize the Information - `home_step2_title`
- Design and Review - `home_step3_title`
- Deliver the Files - `home_step4_title`

Content keys: `cta_work`, `home_process_title`, `home_services_intro`, `home_services_title`, `home_step1_text`, `home_step1_title`, `home_step2_text`, `home_step2_title`, `home_step3_text`, `home_step3_title`, `home_step4_text`, `home_step4_title`, `home_svc1_text`, `home_svc1_title`, `home_svc2_text`, `home_svc2_title`, `home_svc3_text`, `home_svc3_title`, `home_svc4_text`, `home_svc4_title`, `home_svc5_text`, `home_svc5_title`, `link_service`, `nav_services`, `services_meta_desc`, `services_meta_title`.

Existing fragment / element IDs: `#services`.

### `social-media-design.html`

- Social Media Designs That Reflect Your Brand. - `sm_title`
- What’s Included? - `svc_scope_title`
- Our Process - `svc_process_title`
- Scope Note - `sm_note_title`
- Frequently Asked Questions - `svc_faq_title`
- Do you write captions or manage our social media accounts? - `sm_q1`
- Do we need to provide the text and images? - `sm_q2`
- Can the sizes and formats be agreed in advance? - `sm_q3`
- Share your requirements and request a quote. - `sm_cta`

Content keys: `cta_quote`, `sm_a1`, `sm_a2`, `sm_a3`, `sm_cta`, `sm_inc1`, `sm_inc2`, `sm_inc3`, `sm_inc4`, `sm_intro`, `sm_meta_desc`, `sm_meta_title`, `sm_note`, `sm_note_title`, `sm_q1`, `sm_q2`, `sm_q3`, `sm_step1`, `sm_step2`, `sm_step3`, `sm_step4`, `sm_title`, `svc_faq_title`, `svc_process_title`, `svc_scope_title`.

### `social-media-management.html`

- Social media management
- Social media management with a reliable monthly flow
- Why teams choose this approach

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`.

### `terms-and-conditions.html`

- Terms and Conditions
- 1. Agreement to Terms
- 2. Use License
- 3. Disclaimer
- 4. Limitations
- 5. Accuracy of Materials
- 6. Links
- 7. Modifications
- 8. Governing Law
- 9. Contact Information

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`.

### `thank-you.html`

- تواصل مع خطوة للتصميمات

Content keys: `thankyou_home`.

### `video-presentations.html`

- Video presentations
- Video presentations that explain and persuade
- Why teams choose this approach

Content keys: No data-i18n keys; preserve literal HTML content and review bilingual gaps..

Existing fragment / element IDs: `#navbarNav`, `#navbarDropdownMenuLink`.

### `web-design.html`

- A Professional Website That Reflects Your Brand and Showcases Your Work. - `wd_title`
- What’s Included? - `svc_scope_title`
- Website Types - `wd_types_title`
- Our Process - `svc_process_title`
- Frequently Asked Questions - `svc_faq_title`
- Does the service include website content writing? - `wd_q1`
- Are hosting and domain fees included? - `wd_q2`
- Is post-launch maintenance included? - `wd_q3`
- Does the service include SEO? - `wd_q4`
- Can you improve an existing website instead of building a new one? - `wd_q5`
- Tell us about your business and website goals to request a quote. - `wd_cta`

Content keys: `cta_quote`, `svc_faq_title`, `svc_process_title`, `svc_scope_title`, `wd_a1`, `wd_a2`, `wd_a3`, `wd_a4`, `wd_a5`, `wd_cta`, `wd_inc1`, `wd_inc2`, `wd_inc3`, `wd_inc4`, `wd_inc5`, `wd_inc6`, `wd_intro`, `wd_meta_desc`, `wd_meta_title`, `wd_q1`, `wd_q2`, `wd_q3`, `wd_q4`, `wd_q5`, `wd_step1`, `wd_step2`, `wd_step3`, `wd_step4`, `wd_step5`, `wd_title`, `wd_type1`, `wd_type2`, `wd_type3`, `wd_type4`, `wd_type5`, `wd_types_title`.

## External links by source

These are exact source-present anchor destinations from tracked HTML and shared layout. Generic template/demo links in excluded or redirect-source pages are **unverified legacy references**. No claim is made that all social accounts or mailboxes were authenticated, or that all third-party pages returned HTTP 200. Preserve verified company/Behance destinations and review questionable legacy values before public use.

| Destination | Source files |
| --- | --- |
| http://www.behance.com/ | `blog-single-clean.html` |
| http://www.dribbble.com | `blog-single-clean.html`, `blog.html`, `logo-design.html`, `n8n-ai-automations.html`, `services-details.html`, `social-media-management.html`, `video-presentations.html` |
| http://www.instagram.com | `blog-single-clean.html`, `blog.html`, `logo-design.html`, `n8n-ai-automations.html`, `services-details.html`, `social-media-management.html`, `video-presentations.html` |
| http://www.linkedin.com | `blog-single-clean.html` |
| http://www.twitter.com | `blog-single-clean.html`, `blog.html`, `logo-design.html`, `n8n-ai-automations.html`, `services-details.html`, `social-media-management.html`, `video-presentations.html` |
| https://1.envato.market/R53mL2 | `search-result.html` |
| https://craftohtml.themezaa.com/documentation/ | `search-result.html` |
| https://fonts.gstatic.com | `404.html`, `about.html`, `blog-single-clean.html`, `blog.html`, `brand-identity.html`, `coming-soon.html`, `company-portfolio.html`, `contact.html`, `copyright.html`, `customer-stories.html`, `index.html`, `logo-design.html`, `maintenance.html`, `n8n-ai-automations.html`, `portfolio.html`, `powerpoint-presentations.html`, `privacy-policy.html`, `search-result.html`, `services-details.html`, `services.html`, `social-media-design.html`, `social-media-management.html`, `terms-and-conditions.html`, `thank-you.html`, `video-presentations.html`, `web-design.html` |
| https://themeforest.net/user/themezaa/portfolio | `search-result.html` |
| https://www.behance.net/gallery/149311977/TPACK-Powerpoint-Presentation | `index.html`, `portfolio.html` |
| https://www.behance.net/gallery/192151991/_ | `index.html`, `portfolio.html` |
| https://www.behance.net/gallery/192450545/_ | `index.html`, `portfolio.html` |
| https://www.behance.net/gallery/193903091/_ | `index.html`, `portfolio.html` |
| https://www.behance.net/gallery/194950199/_ | `portfolio.html` |
| https://www.behance.net/gallery/202594407/_ | `index.html`, `portfolio.html` |
| https://www.behance.net/gallery/203874479/_ | `index.html`, `portfolio.html` |
| https://www.behance.net/gallery/215345183/_ | `portfolio.html` |
| https://www.behance.net/khatwadesigns2 | `blog-single-clean.html`, `blog.html`, `coming-soon.html`, `logo-design.html`, `maintenance.html`, `n8n-ai-automations.html`, `portfolio.html`, `services-details.html`, `social-media-management.html`, `video-presentations.html`, `js/khatwa-layout.js` |
| https://www.dribbble.com/linksture | `search-result.html` |
| https://www.facebook.com/ | `blog-single-clean.html`, `blog.html`, `logo-design.html`, `n8n-ai-automations.html`, `services-details.html`, `social-media-management.html`, `video-presentations.html` |
| https://www.facebook.com/khatwadesigns | `coming-soon.html`, `maintenance.html`, `js/khatwa-layout.js` |
| https://www.facebook.com/themezaastudio/ | `search-result.html` |
| https://www.instagram.com/khatwadesigns/ | `coming-soon.html`, `maintenance.html`, `js/khatwa-layout.js` |
| https://www.linkedin.com/company/khatwadesigns/ | `coming-soon.html`, `maintenance.html`, `js/khatwa-layout.js` |
| https://www.linkedin.com/company/themezaa/ | `search-result.html` |
| https://www.themezaa.com/ | `search-result.html` |
| https://www.themezaa.com/support/ | `search-result.html` |
| https://www.themezaa.com/theme-customization/ | `search-result.html` |
| https://www.twitter.com/themezaa | `search-result.html` |
| https://www.youtube.com/channel/UCxIgqIkSGVVqEsm-HE-tadQ/ | `search-result.html` |
| https://x.com/khatwadesigns | `coming-soon.html`, `maintenance.html`, `js/khatwa-layout.js` |
| mailto:info@themezaa.com | `search-result.html` |
| mailto:legal@khatwa.com | `copyright.html` |
| mailto:partnerships@khatwa.com | `copyright.html` |
| mailto:privacy@khatwa.com | `privacy-policy.html` |

## Tracked asset preservation manifest

Every tracked image, font and project asset below is frozen by path and SHA-256. This inventories the entire legacy library, including demo/unreferenced assets; inclusion does not authorize public reuse of unverified template content. Preserve bytes during preparation.

| Asset | SHA-256 |
| --- | --- |
| `fonts/bootstrap-icons.woff` | `f55513b7b591cb84a3b87ff0e34ea24d4831d6fedc22e54b911ca64b5b544a15` |
| `fonts/bootstrap-icons.woff2` | `6c75710364a1ca5604267716f6d28997b26319fdb078cf11e0b42ab66ff2ea61` |
| `fonts/fa-brands-400.woff2` | `a288b58f2364e3b318277c20f4aa96889b875bf2595776ba3a0c1adc800c2d3c` |
| `fonts/fa-regular-400.woff2` | `3454c1d0ec7b4d90b45b3379ce229c49442041bc23c40644e4c0360ec043284c` |
| `fonts/fa-solid-900.woff2` | `2a84ae47aa8183257edf08360986803a809a2ea0c34c3c7229562c62c15c9ff2` |
| `fonts/fa-v4compatibility.woff2` | `1e397e3f5af8f20cf20b2f7b31a13814c22a61595e47dbabec188e03b988ed58` |
| `fonts/feather.eot` | `93ae23284f34cdd155271e0b593aee42b58062bf0c72244abc7279ead3b43818` |
| `fonts/feather.svg` | `7f0825fa0a9f3cddcce1311dd90840ed7d3e22328856c866cd2b6e38f95acd26` |
| `fonts/feather.ttf` | `6920da0983cb1c5365e75edc4eddc224590967d6421ddf7958ed4f4d351377e9` |
| `fonts/feather.woff` | `ef3c47cb702e040372a3a4bce66d5e0ecc46c56325ec40f8c00b91da0d1d3f46` |
| `fonts/icomoon.eot` | `3a835f8d7d4a1dda5ffdef26ddff48f7aa7a032071da0a8ce6225009409c3da1` |
| `fonts/icomoon.svg` | `36d8cef6154b092edd384889ac5b01da6c7c7d048508efb55c681b061701b72f` |
| `fonts/icomoon.ttf` | `043ce6450843f8aa38fcbb2aeef2da40928c9f0853dd8342aafbda8be9be8748` |
| `fonts/icomoon.woff` | `55167ff2dba40b2eb3734d4653b6a3b25a33094cfce64ffb09a23205f33777f7` |
| `fonts/themify.woff2` | `a4284c08a003cec97ff102cfee1a3a417b4a717f0345987bd1e3aafc2cde83f1` |
| `images/404-bg.jpg` | `d3002506f374fe72d917d20ef996a92fe5001343d719109d547f20a257f7b28d` |
| `images/apple-touch-icon-114x114.png` | `9dbc530ab2b8a7dacec98392c2f2ac89b9767d5233094c826a6b55c04517b680` |
| `images/apple-touch-icon-57x57.png` | `a70494d1f56fc17023c0f21e54b02b90484b48454d71049047bd2b9e08875861` |
| `images/apple-touch-icon-72x72.png` | `098ac7dececd6059f227dba2a3d5126139f774dedf54f380df347c2076086e54` |
| `images/banner-01.jpg` | `f09b73fc3cdfa0170fd809fb96ea505bef5ae92fcb8bc0a1687087e7e36273dd` |
| `images/banner-02.jpg` | `76f2e18f43630b578cc5c96b8f818c6afa9bef5baf014e25ce93bb359b8a7e45` |
| `images/coming-soon-bg.jpg` | `d0a9097100d04365340e49380127323094b8d0caf55194a4dfa4c38ab5728cdd` |
| `images/contact-form-arrow-white.png` | `0329cc8d0b59fcbcc25e9f1b9705142cd1e8847f96beb59abdff010e34ead193` |
| `images/contact-form-down-arrow.jpg` | `5189ea1a530348bb8965218949064d170927199f9d5b74d3a6a98d7077e147b0` |
| `images/customers/01-Arch_Mohamed_Elnagar.png` | `ca38f8d6284610d992d571d73ba71d4d34ce6509e797e81a402a6e03673b0a60` |
| `images/customers/02-Almaher-Pools.png` | `cbbed557130e53b102408ba85be33aa3b4e1770b2d5600ec50355d7e355deeb8` |
| `images/customers/03-Alsaleh-Contracting.png` | `431774f55cbf330f21c018e78efdef19bcd57cc6663fadaa4ff63d6ffd0fc14a` |
| `images/customers/best/01-Eng-Mahmoud-Elmekawy.png` | `dc6a62fd3665539dfd475265ae7db66c3a8725fa3294063effe67fa79755e8d5` |
| `images/customers/best/02-Engineering-Group.png` | `d862b6b02f8bed299abd4c1e9a1fed7f7febd8c1bbe2a348c45762712469bf69` |
| `images/customers/best/03-Bim-Connection-Office.png` | `5bb84d7f730d2b15f88600e69e11d815c38308508ac4192fce8d06887fdfcecf` |
| `images/customers/best/04-Ghayat-Alqema-Contracting.png` | `103fd40d7f85b59d83025b5603c4e0f7827d41d38983c866cf705e4224e7d6eb` |
| `images/customers/best/05-Wadi-Alabraqin-Contracting.png` | `0977a7a1ad28bb46099eed9d165ea81a83a8b23537739b5ca52d0d897d7206fb` |
| `images/demo-accounting.jpg` | `84c05f17cb9dc25d256ad74da8406ade954d920d853937c118895497894aabc6` |
| `images/demo-application.jpg` | `22ff55d983be3c1f2702417e1532e53fbeb0016affb503eaa0fb5ddfbf905af5` |
| `images/demo-architecture.jpg` | `7f503ffa359d4d350d1ef4a060ab49c21c772053b0397169e0ba5812f7f12a9c` |
| `images/demo-barber.jpg` | `04a3e6fff4b68fa60eaf07fd21042f75b80fccc8ccc9293aa66c09041a31aedb` |
| `images/demo-beauty-salon.jpg` | `b04350d77ee4ce4ddd1dbaaa7b03035d700b378f13fd042c2dcdf5e8be27c963` |
| `images/demo-blogger.jpg` | `eb9853d52cb824a7a6817d11ba4b4d9f687dc60fed8e12443f067cb92cd46d3b` |
| `images/demo-branding-agency.jpg` | `107c87093b84eb4ac61a5e3da5b998944b6744a988044b53c4b671f35f72e323` |
| `images/demo-branding-studio.jpg` | `3fe3ff0eab02beba09f3f9bf14e393610e27d3087628414576805fbfd578eae2` |
| `images/demo-business.jpg` | `e37c81f7e493266eedc0baa18cd5f14cc01ba229cd138d6c3d744d88395a4200` |
| `images/demo-charity.jpg` | `94a2e9941ea88bbb79e2c6d81be43680d413f527b6ace47494cc48b04bc7f470` |
| `images/demo-clothing-store.jpg` | `f043b5431a1e0579e6bfed84b3930dba615fe67e1bc739c04cf4773b9204b6ab` |
| `images/demo-conference.jpg` | `83f8ef6b95963094d9bb0783d231b7c78661619b3fdfe89f069a9de46698684a` |
| `images/demo-consulting.jpg` | `cebc26e27ef12ae69bc18611ce183b8dc0f7af1f34c6eaab6d1f6505a5c4dd57` |
| `images/demo-corporate-about-01.png` | `c62c52823ae260b272d444ecc188ec55c3f5cf7e5b8c50f70f7b845499d1875c` |
| `images/demo-corporate.jpg` | `997aa89cf9bf4420c228e788b796bca51e08a446412530ca56ae88aa28553146` |
| `images/demo-cryptocurrency.jpg` | `09cb6686a1d1c64884a2dbc7defa283ef95144738047f9bf37033d98ab41de03` |
| `images/demo-data-analysis.jpg` | `4ce4d31e692865d2a3dbaff1acb450d03ed5c4f4c81d4312562eb4e4450ac8db` |
| `images/demo-decor-store.jpg` | `8a42708e2dd346aba836068fe696ce8d97dd4230c9cfdea9e1ea4e0c9a391dc4` |
| `images/demo-design-agency.jpg` | `98d18a5d24598095319ebcf5ace2b2a42f0a5fb30d3122d335f5bcfe06099917` |
| `images/demo-digital-agency.jpg` | `601c9f6af1709de6b8cbb3c49063c95d903ecdc15cb268c166ece2d9d9043326` |
| `images/demo-ebook.jpg` | `4fda2f860fe5093aa7bb3bf46a39513ace5ad60ff8290e7cb72dbd078a72db5c` |
| `images/demo-elder-care.jpg` | `d9a6244ccdf3e7ae74da8ec0836de921e0b74eda11537808dc219cc408a3a70f` |
| `images/demo-elearning.jpg` | `94f76eafa826851f6a9b357a24ba250bd6beb2a100200e854b7d7213083beae9` |
| `images/demo-fashion-store.jpg` | `657986f78ee5515713e1c6ba2120a33032d4741db6b3b1e3effe494d0c162e42` |
| `images/demo-finance.jpg` | `c311d6f233d294acb2af4b881f9890170615faac5ffc418ee14f9f3fc6701c43` |
| `images/demo-footer-pattern.svg` | `cfbe4d6f384b2a92caa54edf0f6fe3c0d223339fac8c6a9202fea85663d0990f` |
| `images/demo-freelancer.jpg` | `9425d326084639f83f7f073ae12333a2c107f474c5865d1ed19762224958fba3` |
| `images/demo-green-energy.jpg` | `b221b9aaa65ae035f2a72162bdae2176ec4a0c2e4d98a4a05b07c2a35acdfcd5` |
| `images/demo-gym-and-fitness.jpg` | `d9fc7881ccba728f9d51acff89c16f7248317a70e44c6fbf02a3645323bf4f39` |
| `images/demo-horizontal-portfolio.jpg` | `e39eb3f0a987fab8fbfbdf407175d4faab18c269c03d083695fa43d4ed84084c` |
| `images/demo-hosting.jpg` | `c601751aacec60bbd9fe0b2c55e5b71450c40f2a124b485e8ae5d256d5ad50bb` |
| `images/demo-hotel-and-resort.jpg` | `68d432da34cf7240dee87bb4808cf7e7a14f1e990f2a32b223dd6cc22e28bb2c` |
| `images/demo-interactive-portfolio.jpg` | `39c9a2c35332eb570ec91a8a58f400182d70767168e49adb614d7d42d2f47673` |
| `images/demo-it-business.jpg` | `ceac974fad583ff76b21eb919acd90d33c5a08166cf59826ffbcedc7e7478ffc` |
| `images/demo-jewellery-store.jpg` | `477d6cb4bf20a64b70064286c95aa1c2b1a29bc2138a2153f0a88172f663d104` |
| `images/demo-lawyer.jpg` | `572abdd28f40cdc70a9e7d7dc38f3fdd4fdea4b5b8a4c2f2c37dac0dda815cfd` |
| `images/demo-logistics.jpg` | `f290f37f60432af3892db263525a179c96ea8fdafd97b5bed12b131103ee1e7b` |
| `images/demo-magazine.jpg` | `8ebbf997c1bac50b7a5cac61018b1f9fed5ba5f34b41322f01d7073728188422` |
| `images/demo-marketing.jpg` | `32a8f1be193803a630601fe003a6c9405e1cb3664341f9b6b296a8716a6a63ff` |
| `images/demo-medical.jpg` | `e0886b70932c5f286c9be8ac98b28e0dcb21cf0ec51cd7bff2cf48ba99ece19b` |
| `images/demo-minimal-portfolio.jpg` | `ab3904c211061bd964558f7693daad6212431e9c1fe515cc9fb5e9ddf71d6502` |
| `images/demo-modern-business.jpg` | `5814dcc829785bd4e9584e2a8b32280fcfdd404455a49448e5a8e0e007bb55bd` |
| `images/demo-music.jpg` | `04397663d1fd3ed71a4f3188dfb8b7b8ae88b8082466a12fc103621ecb892e56` |
| `images/demo-photography.jpg` | `10033b326aa0ac2d4bf9a33ee9cb6a68e754cb26c893cc52ab643ef11e7f31b4` |
| `images/demo-pizza-parlor.jpg` | `f8550fe3009455c1b924178168df601e542ec1ce1dccd2b697314446fecb8d30` |
| `images/demo-product.jpg` | `372fd2201225484acb15a1dc20b1dc17c64f5334f6421a697a71c987b616afe8` |
| `images/demo-real-estate.jpg` | `fa764e4995a97596c49975d5c0015c42befe8b84eb4bea61642f3315b0859924` |
| `images/demo-recruitment.jpg` | `99f0c13b64818d56ae0894302f4deb40a22bfeb4f161842f51bee93491674a32` |
| `images/demo-restaurant.jpg` | `bf15d92ea26df7ddf1e0a9efef178b4a778574a9437cadc60c71264d1fa4eaad` |
| `images/demo-scattered-portfolio.jpg` | `aa2247bc1cf47b7c2dd274498ef003fdcea5262b6f36a561d40c01376df1e7d3` |
| `images/demo-seo-agency.jpg` | `86405ae12c225ad602f193b9be6075901d4f906047e08aeb21eb762150d5fbdb` |
| `images/demo-spa-salon.jpg` | `a2e986aececfdf9f3eb9e7af5958da9967329312d657656a4613cbb78ea5eb79` |
| `images/demo-startup.jpg` | `ce97e2c28ffbfc74d5f93b776a66f4614b182dacd1d3a72b063cdc30fef32f75` |
| `images/demo-travel-agency.jpg` | `d175bcce548aaf33f0598dc2cada5dcc54fcbb6899b1021f6863d216b653ec1c` |
| `images/demo-vertical-portfolio.jpg` | `1a7ee2dbf7d7845cdda42b564a596478c85af5a5527a570bb400a2e2c50dc70f` |
| `images/demo-web-agency.jpg` | `5c6b158ce89553efe80e2d285005337c9b9d80cc78c9422a282d4b3b5c8e97e7` |
| `images/demo-wedding-invitation.jpg` | `cfd37ac8a94e1d107b5f209dcd7a2d80c45f8ff1b34caca7dd91d04bb9e8060e` |
| `images/demo-yoga-and-meditation.jpg` | `6a162df71da2b379c47455169ba40c8752d453b38d5cffafe58670a2e6aa2b2e` |
| `images/favicon.png` | `3d2620881f5487e3063f72ee56f967ca08f66e0bd187397da43126e1b5ceecd1` |
| `images/khatwa-logo.png` | `e9dbadc1a2a9b9e2dfa235007929216fc4289502f72c7aa65345eb353cd1c558` |
| `images/khatwa-logo@2x.png` | `8774dd1d6524ac29e7c6fa6f164e7aeb11a9d9e543c8b8c41a21162741bfc859` |
| `images/logo-black.png` | `7bef66f7b00098cfcb5ab3da400216666fbbb6e44dd1c08eebe1ff09f65ca1f3` |
| `images/logo-black@2x.png` | `286dd7561e182e01a60668a7daf24b331271a8f8d398644f9d10bbcc2fd6219a` |
| `images/logo-white-demo.png` | `4079e36a12297f7b738d83f7bc60ada16146c732769e3406f52ae3838f115dc4` |
| `images/logo-white-demo@2x.png` | `0c4c6ce47c2fdd650ba6d28ac54544c0fc0923ff2dbb77997a4d058656269571` |
| `images/maintenance-bg.jpg` | `6e5ea44e975d06c40559ba52bfc77a1f69a1fe8d2b129d423c5d601c5e239e11` |
| `images/marker02.png` | `b5ee9172bae02ab88a4dbffcbe5f6889e4932e53e73c023b5cb2389a9d42887d` |
| `images/mfg-close.png` | `8972efa9737fa05affa933cd8a203fb11545e2ce83ad303e7da930ccd23bcf3f` |
| `images/pre-built-sites-bg.jpg` | `fc29fea819c921d071eda5d094ec8e237650b525027880452967c64994d368ad` |
| `images/premium-elements-bg.jpg` | `5e1fc02e416b8a067fc8f4690767a9f5b01ec38cf34d4969a5b4d701d857ce5d` |
| `images/tpcolorpicker/arrow_down.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/arrow_up.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/check.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/check_reverse.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/check_small.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/delete.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/exit.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/point_bottom.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/point_top.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/save.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/tpcolorpicker/trans_tile.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `images/transparent.png` | `d2a766f2cbe30658248edcb1b2d5265f9cf6f793c9f40fdec80ea383236eac6e` |
| `projects/README.md` | `cee6d57484dd94ab58aae4b9d01ef2664160b2a5a0c534bd74625afd6dc8eb36` |
| `projects/al-emar.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/al-maher.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/aya-roshdy.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/bim-connection.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/engineering-group.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/fahd-al-mutairi.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/ghayah.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/mohamed-el-naggar.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/omega.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/talal-shaker.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/tpack.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |
| `projects/wadi-al-abrakeen.svg` | `04071c115fc6f44bd46074436ba357b4f1ea5466bb7140cf7154bd4f6f5adb82` |

## Complete bilingual translation inventory

Exact baseline values, keyed for preservation. These include metadata, navigation, service scope, FAQs, project labels, review text, contact validation and result states. Do not infer complete page localization from this table: literal legal/template body copy needs separate translation review.

| Key | English | Arabic |
| --- | --- | --- |
| `ab_closing` | Khatwa Designs — Engineering Insight. Creative Solutions. A Connected Digital Presence. | خطوة للتصميمات — فهم هندسي، وحلول إبداعية، وحضور رقمي متكامل. |
| `ab_meta_desc` | Learn about Khatwa Designs, founded in 2021 in Mansoura, Egypt, serving construction companies and engineering firms in Egypt and Saudi Arabia. | تعرّف على خطوة للتصميمات، تأسست عام 2021 في المنصورة وتعمل مع شركات المقاولات والمكاتب الهندسية في مصر والسعودية. |
| `ab_meta_title` | About Khatwa Designs — Engineering-Focused Creative Partner | من نحن — خطوة للتصميمات |
| `ab_mission` | To help businesses, especially construction companies and engineering firms, present their services, expertise, and projects professionally through well-organized content and cohesive design. | مساعدة الشركات، خصوصًا شركات المقاولات والمكاتب الهندسية، على تقديم خدماتها وخبراتها ومشروعاتها بصورة مهنية من خلال محتوى منظم وتصميمات متناسقة. |
| `ab_mission_title` | Our Mission | رسالتنا |
| `ab_p1` | Founded in 2021 and headquartered in Mansoura, Egypt, Khatwa Designs is a creative and digital partner for construction companies and engineering firms. We help businesses present their expertise professionally, showcase their projects, and build a stronger market presence. | تأسست خطوة للتصميمات عام 2021، ويقع مقرها الرئيسي في المنصورة، مصر. نعمل كشريك إبداعي ورقمي لشركات المقاولات والمكاتب الهندسية، ونساعدها على بناء صورة احترافية تعكس خبراتها، وتبرز مشروعاتها، وتدعم حضورها في السوق. |
| `ab_p2` | What sets Khatwa apart is our practical understanding of the engineering and construction sector. The company’s founder is an engineer who leads the work and remains directly involved in delivering selected projects. This perspective informs how we organize technical and business information and present it clearly and professionally. | ما يميز خطوة هو فهمنا لطبيعة القطاع الهندسي واحتياجاته. فمؤسس الشركة مهندس يقود العمل ويشارك مباشرة في تنفيذ بعض المشروعات، وهو ما يمنحنا منظورًا عمليًا عند تنظيم المعلومات الفنية والتجارية وتقديمها بصورة واضحة ومهنية. |
| `ab_p3` | We bring complementary services together under one roof, including visual identity and company profile design, presentations, tender documents and technical proposals, website design and development, and social media post design. | نجمع تحت جهة واحدة مجموعة من الخدمات المترابطة؛ بدايةً من تصميم الهوية البصرية وبروفايلات الشركات، مرورًا بإعداد العروض التقديمية وملفات المناقصات والعروض الفنية، وصولًا إلى تصميم وتطوير المواقع الإلكترونية وتصميم منشورات السوشيال ميديا. |
| `ab_p4` | We have delivered projects in Egypt and Saudi Arabia. We begin by understanding each client’s needs and objectives before defining the appropriate solution. We believe design is more than appearance: it helps businesses communicate their message, demonstrate the value of their work, and present themselves in a way that reflects their business. | نفذنا مشروعات في مصر والمملكة العربية السعودية، ونعمل على فهم احتياجات كل عميل وأهدافه قبل تحديد الحل المناسب. نؤمن أن التصميم لا يقتصر على المظهر، بل يساعد الشركة على توصيل رسالتها، وإظهار قيمة أعمالها، وتقديم نفسها بشكل يعكس طبيعة نشاطها. |
| `ab_title` | We Understand Your Industry. We Help You Present It Better. | نفهم أعمالك الهندسية، ونساعدك على تقديمها باحترافية. |
| `ab_val1` | Understand the client’s needs before production. | فهم احتياجات العميل قبل بدء التنفيذ. |
| `ab_val2` | Keep content clear and approved information accurate. | وضوح المحتوى ودقة المعلومات المعتمدة. |
| `ab_val3` | Maintain visual consistency across deliverables. | الاتساق البصري في مختلف المخرجات. |
| `ab_val4` | Communicate clearly and structure review stages. | التواصل المنظم والمراجعات الواضحة. |
| `ab_val5` | Deliver according to the agreed scope and deliverables. | الالتزام بنطاق العمل والمخرجات المتفق عليها. |
| `ab_values_title` | Our Values | قيمنا |
| `ab_vision` | To become a trusted partner for businesses seeking connected design, content, and digital presence solutions grounded in their real needs. | أن نكون شريكًا موثوقًا للشركات التي تبحث عن حلول تصميم ومحتوى وحضور رقمي متكاملة، مبنية على فهم احتياجاتها الفعلية. |
| `ab_vision_title` | Our Vision | رؤيتنا |
| `bi_a1` | No. The service starts with logo design and can extend to color and typography selection, brand guidelines, and agreed applications, according to each project’s requirements. | لا. تبدأ الخدمة من تصميم الشعار ويمكن أن تمتد إلى اختيار الألوان والخطوط وإعداد دليل الهوية والتطبيقات المتفق عليها، حسب احتياجات كل مشروع. |
| `bi_a2` | Letterheads, business cards, and other brand applications can be included as agreed in the project scope. | يمكن تضمين الأوراق الرسمية وبطاقات الأعمال وغيرها من تطبيقات الهوية وفق ما يُتفق عليه في نطاق المشروع. |
| `bi_a3` | You receive the approved final files in the formats agreed within the project scope. | تستلم الملفات النهائية المعتمدة بالصيغ المتفق عليها ضمن نطاق المشروع. |
| `bi_cta` | Build Your Brand Identity — Request a Quote. | ابدأ بناء هوية شركتك — اطلب عرض سعر. |
| `bi_inc1` | Logo design. | تصميم الشعار. |
| `bi_inc2` | Color palette and typography selection. | اختيار الألوان والخطوط. |
| `bi_inc3` | Brand guidelines explaining the use of identity elements. | إعداد دليل الهوية البصرية وقواعد استخدام عناصرها. |
| `bi_inc4` | Letterheads, business cards, and other agreed brand applications. | تصميم الأوراق الرسمية وبطاقات الأعمال والمطبوعات المطلوبة حسب الاتفاق. |
| `bi_inc5` | Final files in the agreed formats. | تجهيز الملفات النهائية والصيغ المتفق عليها. |
| `bi_intro` | We help businesses build a clear, cohesive identity—from logo design and color and typography selection to brand guidelines and branded stationery, according to each project’s requirements. | نساعد الشركات على بناء هوية بصرية واضحة ومتماسكة تبدأ من تصميم الشعار، وتمتد إلى اختيار الألوان والخطوط وإعداد دليل الهوية، مع تطبيقها على المطبوعات والأوراق الرسمية وبطاقات الأعمال وغيرها حسب احتياجات المشروع. |
| `bi_meta_desc` | Logo design, brand guidelines, and visual identity applications tailored to each project. | تصميم الشعارات والهوية البصرية ودليل الهوية وتطبيقاتها للشركات حسب نطاق المشروع. |
| `bi_meta_title` | Logo Design & Visual Identity — Khatwa | تصميم الشعارات والهوية البصرية — خطوة |
| `bi_q1` | Is the service limited to logo design? | هل الخدمة تقتصر على تصميم الشعار؟ |
| `bi_q2` | Which applications can be included? | ما التطبيقات التي يمكن تضمينها؟ |
| `bi_q3` | Which files will I receive? | ما الملفات التي أستلمها؟ |
| `bi_step1` | Understand the business and identity requirements. | فهم نشاط الشركة ومتطلبات الهوية. |
| `bi_step2` | Define the creative direction and design references. | تحديد الاتجاه الإبداعي ومراجع التصميم. |
| `bi_step3` | Develop and review the logo and identity elements. | تصميم الشعار وعناصر الهوية ومراجعتها. |
| `bi_step4` | Prepare the brand guidelines and requested applications. | إعداد دليل الهوية وتنفيذ التطبيقات المطلوبة. |
| `bi_step5` | Deliver the approved files within the agreed scope. | تسليم الملفات المعتمدة وفق نطاق المشروع. |
| `bi_title` | A Visual Identity That Reflects Your Business and Keeps Every Touchpoint Consistent. | هوية بصرية تعكس شخصية شركتك وتوحّد صورتها أمام عملائها. |
| `coming_soon_button` | Notify me | أخبرني عند الإطلاق |
| `coming_soon_note` | Subscribe our newsletter to get update when it'll be live. | اشترك ليصلك إشعار فور انطلاق الموقع رسميًا. |
| `coming_soon_placeholder` | Enter your email address | أدخل بريدك الإلكتروني |
| `coming_soon_subtitle` | We're getting ready to launch! | نستعد الآن لإطلاق تجربة أقوى لعلامتك التجارية. |
| `coming_soon_title` | Coming soon! | قريبًا |
| `contact_automation` | n8n + AI automations | أتمتة n8n والذكاء الاصطناعي |
| `contact_brand_identity` | Brand identity | هوية بصرية |
| `contact_clients` | Who we work with | من نخدم |
| `contact_clients_text` | Construction companies, contracting companies, and engineering consultancies. | شركات المقاولات والإنشاءات والاستشارات الهندسية. |
| `contact_company_profile` | Company profile | بروفايل شركة |
| `contact_consultation_flow` | Project discussion | مناقشة المشروع |
| `contact_consultation_text` | We discuss your needs, agree on the scope, and outline deliverables, timing, and review stages. | نناقش احتياجك ونتفق على نطاق العمل والمخرجات والتوقيت ومراحل المراجعة. |
| `contact_country_label` | Country calling code | مفتاح الاتصال بالدولة |
| `contact_cta_link` | Start the conversation. | ابدأ المحادثة. |
| `contact_cta_text` | Let's discuss your project. | لنتحدث عن مشروعك. |
| `contact_details_label` | Project details | تفاصيل المشروع |
| `contact_details_placeholder` | Share your goals, timing, and available project information | شاركنا أهدافك والتوقيت والمعلومات المتاحة عن المشروع |
| `contact_email_label` | Email address* | البريد الإلكتروني* |
| `contact_email_placeholder` | Enter your email address | اكتب بريدك الإلكتروني |
| `contact_error_email` | Enter a valid email address, such as name@company.com. | اكتب بريدًا إلكترونيًا صحيحًا، مثل name@company.com. |
| `contact_error_required` | Please complete this field. | يرجى إكمال هذا الحقل. |
| `contact_form_kicker` | Project inquiry | طلب مشروع |
| `contact_form_title` | Share the context and we'll help you shape the next move. | شاركنا تفاصيل المشروع لنساعدك في تحديد الخطوة التالية. |
| `contact_intro_text` | Share the project context and available information so we can discuss a suitable scope and next steps. | أرسل نبذة عن المشروع والمعلومات المتاحة لنناقش نطاق العمل المناسب والخطوات التالية. |
| `contact_intro_title` | Tell us about your project and what you need to communicate. | شاركنا تفاصيل مشروعك وما تحتاج إلى توضيحه. |
| `contact_kicker` | Let's talk | لنتحدث |
| `contact_meta_desc` | Contact Khatwa Designs to discuss company profiles, presentations, website design, and visual identity projects. | تواصل مع خطوة للتصميمات لمناقشة مشروعات بروفايلات الشركات والعروض التقديمية وتصميم المواقع والهويات البصرية. |
| `contact_meta_title` | Contact Khatwa Designs &#124; Request a Quote | تواصل مع خطوة للتصميمات &#124; اطلب عرض سعر |
| `contact_name_label` | Your name* | الاسم* |
| `contact_name_placeholder` | Tell us your name | اكتب اسمك |
| `contact_phone_label` | Phone number | رقم الهاتف |
| `contact_phone_placeholder` | Add your phone number | أضف رقم هاتفك |
| `contact_privacy_note` | We use the information you provide to review your request and respond. | نستخدم المعلومات التي تقدمها لمراجعة طلبك والرد عليك. |
| `contact_remote_kicker` | Project discussion | مناقشة المشروع |
| `contact_remote_text` | Share your goals, timing, and available information. We will review the request and discuss an appropriate scope. | شاركنا أهدافك والتوقيت والمعلومات المتاحة، وسنراجع الطلب ونناقش نطاق العمل المناسب. |
| `contact_remote_title` | Tell us about your project and we will discuss the next steps. | أخبرنا عن مشروعك لنناقش الخطوات التالية. |
| `contact_required_note` | Fields marked * are required. | الحقول المميزة بعلامة * مطلوبة. |
| `contact_response_text` | We review each inquiry and respond with a recommendation based on the information provided. | نراجع كل استفسار ونرد بتوصية مناسبة بناءً على المعلومات المقدمة. |
| `contact_response_time` | Next steps | الخطوات التالية |
| `contact_result_error_meta` | Message not sent &#124; Khatwa Designs | فشل إرسال الرسالة &#124; خطوة للتصميمات |
| `contact_result_error_text` | We could not send your message. Please try again. | تعذر إرسال رسالتك. يرجى المحاولة مرة أخرى. |
| `contact_result_error_title` | Message not sent | فشل الإرسال |
| `contact_result_neutral_meta` | Contact Khatwa Designs | تواصل مع خطوة للتصميمات |
| `contact_result_neutral_text` | Share your project details through our contact form. | شاركنا تفاصيل مشروعك من خلال نموذج التواصل. |
| `contact_result_neutral_title` | Contact Khatwa Designs | تواصل مع خطوة للتصميمات |
| `contact_result_new` | Go to contact form | الذهاب إلى نموذج التواصل |
| `contact_result_retry` | Try again | حاول مرة أخرى |
| `contact_sending` | Sending… | جارٍ الإرسال… |
| `contact_service_label` | What do you need? | ما الخدمة التي تحتاج إليها؟ |
| `contact_service_placeholder` | Select a service | اختر الخدمة |
| `contact_social_management` | Social media management | إدارة حسابات التواصل الاجتماعي |
| `contact_submit` | Send inquiry | إرسال الطلب |
| `contact_title` | Contact us | تواصل معنا |
| `contact_unavailable` | Your inquiry could not be sent right now. Your details have been kept. Please try again later. | تعذر إرسال طلبك الآن. احتفظنا بالتفاصيل التي أدخلتها؛ يرجى المحاولة لاحقًا. |
| `contact_video_presentations` | Video presentations | عروض فيديو |
| `contact_working_model` | How we work | كيف نعمل |
| `contact_working_text` | We collaborate with clients in Egypt and Saudi Arabia on company profiles, presentations, websites, visual identity, and social media design. | نتعاون مع العملاء في مصر والسعودية في بروفايلات الشركات والعروض التقديمية والمواقع والهويات البصرية وتصميمات السوشيال ميديا. |
| `country_bahrain` | Bahrain (+973) | البحرين (+973) |
| `country_egypt` | Egypt (+20) | مصر (+20) |
| `country_iraq` | Iraq (+964) | العراق (+964) |
| `country_kuwait` | Kuwait (+965) | الكويت (+965) |
| `country_other` | Other | أخرى |
| `country_qatar` | Qatar (+974) | قطر (+974) |
| `country_saudi` | Saudi Arabia (+966) | السعودية (+966) |
| `country_spain` | Spain (+34) | أسبانيا (+34) |
| `country_turkey` | Turkey (+90) | تركيا (+90) |
| `country_uae` | UAE (+971) | الإمارات (+971) |
| `cp_a1` | We help organize the information and write or edit the content based on the documents, information, and images supplied by the client, then complete the design and final production. | نساعد في تنظيم المعلومات وكتابة المحتوى وتحريره اعتمادًا على مستندات ومعلومات وصور يقدمها العميل، ثم ننفذ التصميم والإخراج النهائي. |
| `cp_a2` | Yes. We can review an existing profile and update its content and design based on the available materials and the project objectives. The scope is confirmed after reviewing the file. | يمكن مراجعة البروفايل الحالي وتحديث محتواه وتصميمه وفق حالة المواد المتاحة والهدف من التحديث، ويُحدد نطاق العمل بعد مراجعة الملف. |
| `cp_a3` | We organize, edit, and present the information clearly. The client remains responsible for the accuracy and approval of technical and business information before final delivery. | نعمل على تنظيم المعلومات وتحريرها وعرضها بوضوح، لكن العميل مسؤول عن دقة البيانات الفنية والتجارية واعتمادها قبل التسليم النهائي. |
| `cp_a4` | The required languages can be agreed at the start. The quotation will specify whether content writing or translation in each language is included. | يمكن تحديد اللغات المطلوبة عند الاتفاق على نطاق المشروع، ويُوضح في عرض السعر ما إذا كانت كتابة أو ترجمة المحتوى بكل لغة مشمولة. |
| `cp_a5` | Final formats and whether editable source files are included will be defined in the quotation before work begins. | تُحدد صيغ الملفات النهائية وإمكانية تسليم الملفات القابلة للتحرير في عرض السعر قبل بدء العمل. |
| `cp_cta` | Share your company information and request a quote for your profile. | شاركنا معلومات شركتك واطلب عرض سعر لبروفايلك. |
| `cp_for1` | Construction and contracting companies. | شركات المقاولات والإنشاءات. |
| `cp_for2` | Engineering consultancies and design offices. | المكاتب والاستشارات الهندسية. |
| `cp_for3` | Infrastructure and technical service providers. | شركات البنية التحتية والخدمات الفنية. |
| `cp_for4` | Businesses preparing to expand or pursue new opportunities. | الشركات التي تستعد للتوسع أو التقدم لفرص جديدة. |
| `cp_for5` | Companies looking to update an existing profile. | الشركات التي تحتاج إلى تحديث بروفايلها الحالي. |
| `cp_inc1_text` | We review the supplied materials and structure the information so readers can understand your business and services. | مراجعة المواد التي يقدمها العميل وترتيب المعلومات والأقسام بما يساعد القارئ على فهم الشركة وخدماتها. |
| `cp_inc1_title` | Information Organization | تنظيم المعلومات |
| `cp_inc2_text` | We write or refine the content in clear, professional language while preserving client-approved information. | كتابة النصوص أو تطويرها وتحريرها بلغة واضحة ومهنية، مع الحفاظ على المعلومات المعتمدة من العميل. |
| `cp_inc2_title` | Content Writing & Editing | صياغة المحتوى وتحريره |
| `cp_inc3_text` | We create a clear visual hierarchy for services, experience, and projects while respecting the company’s visual identity and readability. | بناء تسلسل بصري واضح للخدمات والخبرات والمشروعات، مع مراعاة الهوية البصرية وسهولة القراءة. |
| `cp_inc3_title` | Design & Final Production | التصميم والإخراج |
| `cp_inc4_text` | We deliver the agreed file formats and outputs described in the quotation and project scope. | تسليم الملفات والصيغ المتفق عليها في عرض السعر ونطاق العمل. |
| `cp_inc4_title` | Final Delivery | التسليم النهائي |
| `cp_intro` | We help construction companies and engineering firms present their services, expertise, and projects through a professional company profile that combines organized content with cohesive visual design. We review the information, documents, and images you provide, organize and refine the content, and then complete the design and final production according to the agreed project scope. | نساعد شركات المقاولات والمكاتب الهندسية على تقديم خدماتها وخبراتها ومشروعاتها في بروفايل احترافي يجمع بين المحتوى المنظم والتصميم المتناسق. نراجع المعلومات والمستندات والصور التي تقدمها، وننظمها ونصوغ المحتوى ونحرره، ثم ننفذ التصميم والإخراج النهائي وفق نطاق المشروع. |
| `cp_meta_desc` | Content organization, writing, and professional company profile design for construction companies and engineering firms. | تنظيم المعلومات وكتابة المحتوى وتصميم بروفايلات احترافية لشركات المقاولات والمكاتب الهندسية وفق نطاق المشروع. |
| `cp_meta_title` | Company Profile Design for Construction & Engineering Firms — Khatwa | تصميم بروفايلات شركات المقاولات والمكاتب الهندسية — خطوة |
| `cp_q1` | Do you write the content or only design the profile? | هل تساعدون في كتابة محتوى البروفايل أم تصممون فقط؟ |
| `cp_q2` | Can you update an existing company profile? | هل يمكن تحديث بروفايل موجود بالفعل؟ |
| `cp_q3` | Do you independently verify technical information? | هل تراجع خطوة صحة المعلومات الفنية؟ |
| `cp_q4` | Can the profile be produced in Arabic and English? | هل يمكن تنفيذ البروفايل بالعربية والإنجليزية؟ |
| `cp_q5` | Which files will I receive? | ما الملفات التي أستلمها؟ |
| `cp_step1` | Understand the company, target audience, and purpose of the profile. | نفهم نشاط الشركة والجمهور المستهدف والغرض من البروفايل. |
| `cp_step2` | Review the available information, documents, and images. | نراجع المعلومات والمستندات والصور المتاحة. |
| `cp_step3` | Organize and refine the content for client review and approval. | ننظم المحتوى ونحرره للمراجعة والاعتماد. |
| `cp_step4` | Design the profile and review feedback through the agreed stages. | ننفذ التصميم ونراجع الملاحظات وفق المراحل المتفق عليها. |
| `cp_step5` | Deliver the approved final files. | نسلّم الملفات النهائية المعتمدة. |
| `cp_title` | More Than Design. A Company Profile Built Around Your Business. | بروفايل شركتك يبدأ من فهم أعمالك، مش من التصميم فقط. |
| `cs_date1` | 3 October 2021 | 3 أكتوبر 2021 |
| `cs_date10` | 15 May 2021 | 15 مايو 2021 |
| `cs_date11` | 15 May 2021 | 15 مايو 2021 |
| `cs_date12` | 15 May 2021 | 15 مايو 2021 |
| `cs_date2` | 3 October 2021 | 3 أكتوبر 2021 |
| `cs_date3` | 11 September 2021 | 11 سبتمبر 2021 |
| `cs_date4` | 11 September 2021 | 11 سبتمبر 2021 |
| `cs_date5` | 11 September 2021 | 11 سبتمبر 2021 |
| `cs_date6` | 13 July 2021 | 13 يوليو 2021 |
| `cs_date7` | 8 July 2021 | 8 يوليو 2021 |
| `cs_date8` | 7 July 2021 | 7 يوليو 2021 |
| `cs_date9` | 7 July 2021 | 7 يوليو 2021 |
| `cs_intro` | We appreciate the recommendations shared by clients on Khatwa Designs’ Facebook page. This page presents a selection of their feedback. | نعتز بالتوصيات التي شاركها عملاؤنا على صفحة خطوة للتصميمات على فيسبوك. نعرض هنا مجموعة مختارة من آرائهم. |
| `cs_meta_desc` | Read selected client recommendations published on Khatwa Designs’ Facebook page. | اقرأ مختارات من توصيات العملاء المنشورة على صفحة خطوة للتصميمات على فيسبوك. |
| `cs_meta_title` | Khatwa Designs Client Reviews | آراء عملاء خطوة للتصميمات |
| `cs_note` | Most reviews were originally written in Arabic; the English text shown here is a translation. Recommendations date from 2021. | تعود هذه التوصيات إلى عام 2021، وتظهر بنصها الأصلي كما نُشرت. |
| `cs_rev1` | “A professional company that respects deadlines and delivers high-quality work.” | «شركة محترمة جدا بيحترموا مواعيدهم وشغلهم عالي» |
| `cs_rev10` | “very professional people and highly recommended” | “very professional people and highly recommended” |
| `cs_rev11` | “They understand their work very well and are committed to deadlines.” | «بصراحة ناس فاهمين شغلهم كويس جدا وملتزمين في مواعيدهم» |
| `cs_rev12` | “One of the best companies I have worked with in design and video editing services. They truly understand their craft and have great experience in the field.” | «من أفضل الشركات اللي اتعاملت معاهم في خدمات التصميم والمونتاج بصراحة ناس فاهمين جدا وخبرتهم كبيرة في المجال» |
| `cs_rev2` | “One of the best companies in their field—creative and professional.” | «من افضل الشركات في مجالهم مبدعين و محترفين» |
| `cs_rev3` | “May God grant you success and bless you, Eng.—from one success to the next, God willing.” | «ربنا يوفقكم ويكرمكم يا بشمهندس ومن نجاح لنجاح إن شاء الله» |
| `cs_rev4` | “One of the best companies you can work with—they understand you well and you feel very comfortable with them. Thank you for your courtesy.” | «من أفضل الشركات اللي ممكن تتعامل معاها وتفهم كويس منها وترتاح معاها جدا شكرا على ذوقكم» |
| `cs_rev5` | “You are truly very skilled, and I haven’t seen anyone like you before, in both manners and dealings.” | «بجد حضرتكم شاطرين جدا وما شوفتش زيكم قبل كده سواء في الأخلاق أو التعامل» |
| `cs_rev6` | A recommendation praising creativity and professionalism in logo and video design. | توصية بشأن الإبداع والاحترافية في تصميم اللوجو والفيديو. |
| `cs_rev7` | “Thank you for the design and for your great taste. Best of luck, God willing.” 🌹 | «شكرا على التصميم وعلى ذوقكم جدا بالتوفيق إن شاء الله 🌹» |
| `cs_rev8` | “Excellent work delivered quickly. Thank you—this won't be our last collaboration.” 😍 | «شغل ممتاز وفي وقت منجز جدا شكرا ليكم ومش آخر تعامل إن شاء الله 😍» |
| `cs_rev9` | “Truly, thank you very much for the beautiful design.” | «بجد شكرا جدا على التصميم الجميل» |
| `cs_title` | What Clients Say About Working with Khatwa. | آراء عملائنا عن تجربة التعامل مع خطوة. |
| `cta_quote` | Request a Quote | اطلب عرض سعر |
| `cta_services` | Explore Our Services | تعرّف على خدماتنا |
| `cta_work` | Explore Our Work | استكشف أعمالنا |
| `document_language_notice` | This document is currently available in English. | هذه الصفحة متاحة حاليًا باللغة الإنجليزية. |
| `footer_about` | About Us | من نحن |
| `footer_clients` | Client Reviews | آراء العملاء |
| `footer_company_title` | Company | الشركة |
| `footer_copy` | © 2026 Khatwa Designs - خطوة للتصميمات | © 2026 Khatwa Designs - خطوة للتصميمات |
| `footer_copyright_link` | Copyright | حقوق النشر |
| `footer_intro` | Khatwa Designs is a creative and digital partner for construction companies and engineering firms, helping them organize content and present their work through company profiles, technical presentations, visual identity, and websites. | خطوة للتصميمات شريك إبداعي ورقمي لشركات المقاولات والمكاتب الهندسية، يساعدها على تنظيم المحتوى وتقديم أعمالها من خلال بروفايلات الشركات والعروض الفنية والهوية البصرية والمواقع الإلكترونية. |
| `footer_privacy` | Privacy policy | سياسة الخصوصية |
| `footer_services_link` | Services | خدماتنا |
| `footer_services_title` | Services | الخدمات |
| `footer_terms` | Terms and conditions | الشروط والأحكام |
| `home_cat_company` | Company profile | بروفايل شركة |
| `home_cat_contracting` | Contracting company profile | بروفايل شركة مقاولات |
| `home_cat_office` | Engineering office profile | بروفايل مكتب هندسي |
| `home_cat_presentation` | Presentation design sample | نموذج من أعمال العروض التقديمية |
| `home_cat_website` | Website for an engineering-related business | موقع إلكتروني لشركة في مجال الخدمات الهندسية |
| `home_cta_text` | Share your project idea and available information. We’ll review your needs and discuss the appropriate scope and deliverables. | شاركنا فكرة المشروع والمعلومات المتاحة، وسنراجع احتياجك ونحدد نطاق العمل والمخرجات المناسبة. |
| `home_cta_title` | Have a Project in Mind? | عندك مشروع وتحتاج شريكًا يفهم احتياجك؟ |
| `home_hero_kicker` | From content organization and writing to design and delivery. | من تنظيم المعلومات وكتابة المحتوى إلى التصميم والتسليم. |
| `home_hero_text` | We help construction companies and engineering firms showcase their expertise and projects through professional company profiles, technical proposals, brand identity, and website development. | نساعد شركات المقاولات والمكاتب الهندسية على تقديم خبراتها ومشروعاتها باحترافية، من خلال بروفايلات الشركات، والعروض الفنية، والهوية البصرية، والمواقع الإلكترونية. |
| `home_hero_title` | Creative Solutions for the Engineering Industry. | شريك إبداعي يفهم عالمك الهندسي. |
| `home_meta_desc` | Khatwa Designs helps construction companies and engineering firms in Egypt and Saudi Arabia with company profiles, technical presentations, branding, and websites. | خطوة للتصميمات تساعد شركات المقاولات والمكاتب الهندسية في مصر والسعودية على إعداد بروفايلات الشركات والعروض الفنية وتصميم الهوية والمواقع الإلكترونية. |
| `home_meta_title` | Khatwa Designs — Company Profiles, Websites & Branding | خطوة للتصميمات — بروفايلات ومواقع وهوية بصرية |
| `home_process_title` | A Clear Process from Brief to Delivery. | خطوات واضحة من أول نقاش حتى التسليم. |
| `home_proj1` | Ghayah Contracting Company Profile | بروفايل شركة غاية للمقاولات |
| `home_proj2` | Wadi Al-Abrakeen Contracting Company Profile | بروفايل شركة وادي الأبرقين للمقاولات |
| `home_proj3` | Al-Emar Al-Fareed Company Profile | بروفايل شركة الإعمار الفريد |
| `home_proj4` | BIM Connection Engineering Office Profile | بروفايل مكتب BIM Connection الهندسي |
| `home_proj5` | Al-Maher Electromechanical Website | موقع شركة الماهر للإلكتروميكانيك |
| `home_proj6` | TPACK PowerPoint Presentation | TPACK PowerPoint Presentation |
| `home_rev1` | “A professional company that respects deadlines and delivers high-quality work.” | «شركة محترمة جدا بيحترموا مواعيدهم وشغلهم عالي» |
| `home_rev2` | “Excellent work delivered quickly. Thank you—this won't be our last collaboration.” | «شغل ممتاز وفي وقت منجز جدا شكرا ليكم ومش آخر تعامل إن شاء الله 😍» |
| `home_rev3` | “They understand their work well and are committed to deadlines.” | «بصراحة ناس فاهمين شغلهم كويس جدا وملتزمين في مواعيدهم» |
| `home_rev4` | A recommendation praising creativity and professionalism in logo and video design. | توصية بشأن الإبداع والاحترافية في تصميم اللوجو والفيديو. |
| `home_rev5` | “very professional people and highly recommended” | “very professional people and highly recommended” |
| `home_rev_date1` | October 2021 | أكتوبر 2021 |
| `home_rev_date2` | July 2021 | يوليو 2021 |
| `home_rev_date3` | May 2021 | مايو 2021 |
| `home_rev_date4` | July 2021 | يوليو 2021 |
| `home_rev_date5` | May 2021 | مايو 2021 |
| `home_reviews_btn` | Read More Reviews | قراءة المزيد من التوصيات |
| `home_reviews_intro` | A selection of recommendations published on Khatwa Designs’ Facebook page. | هذه مختارات من توصيات منشورة على صفحة خطوة للتصميمات على فيسبوك. |
| `home_reviews_note` | These recommendations are from 2021. English texts are translations of the original Arabic recommendations, except Amira Hassan’s, which was written in English. | تعود هذه التوصيات إلى عام 2021. النصوص كما نُشرت أصلًا على الصفحة؛ توصية Amira Hassan كُتبت بالإنجليزية. |
| `home_reviews_title` | Built on Real Client Experiences. | ثقة نبنيها من خلال تجربة التعامل. |
| `home_services_intro` | We combine an understanding of your business needs with content organization, writing, and design to communicate your value clearly and consistently. | نجمع بين فهم احتياجات شركتك، وتنظيم المعلومات، وإعداد المحتوى، والتصميم؛ لتصل رسالتك إلى عملائك بصورة واضحة ومتناسقة. |
| `home_services_title` | Design Services That Present Your Business Professionally. | خدمات تصميم متكاملة لعرض أعمالك باحترافية. |
| `home_step1_text` | We identify the objective, audience, and required deliverables. | نحدد الهدف والجمهور والمخرجات المطلوبة. |
| `home_step1_title` | Understand the Need | نفهم احتياجك |
| `home_step2_text` | We review your materials, structure the content, and identify any missing inputs. | نراجع مستنداتك ونرتب المحتوى ونحدد ما يلزم استكماله. |
| `home_step2_title` | Organize the Information | ننظم المعلومات |
| `home_step3_text` | We develop the work and incorporate feedback through the agreed review stages. | ننفذ العمل ونتلقى ملاحظاتك وفق مراحل المراجعة المتفق عليها. |
| `home_step3_title` | Design and Review | نصمم ونراجع |
| `home_step4_text` | We provide the final deliverables according to the agreed scope. | نسلّم المخرجات النهائية وفق نطاق المشروع والاتفاق. |
| `home_step4_title` | Deliver the Files | نسلّم الملفات |
| `home_svc1_text` | We organize your company information, refine the content, and design a profile that showcases your services, experience, and projects. | نرتب معلومات شركتك ونصوغ محتواها، ثم نصمم بروفايلًا يبرز خدماتك وخبراتك ومشروعاتك. |
| `home_svc1_title` | Company Profiles & Engineering Portfolios | بروفايلات الشركات والمكاتب الهندسية |
| `home_svc2_text` | We organize your supplied documents, refine the content, and design presentations or documents around their purpose and target audience. | ننظم المستندات والمعلومات التي تقدمها، ونحرر المحتوى، ثم نصمم العرض أو الملف بما يلائم هدفه والجمهور المستهدف. |
| `home_svc2_title` | Presentations & Tender Documents | العروض التقديمية وملفات المناقصات |
| `home_svc3_text` | We help plan your website, develop its content, design and build it, and prepare it for launch. | نساعدك على تخطيط صفحات الموقع وإعداد محتواه وتصميمه وتطويره وتجهيزه للنشر. |
| `home_svc3_title` | Website Design & Development | تصميم وتطوير المواقع الإلكترونية |
| `home_svc4_text` | We create cohesive logos and visual identities, including brand guidelines and selected applications according to the project scope. | نصمم شعارًا وهوية بصرية متناسقة، مع دليل للهوية والتطبيقات المطلوبة حسب المشروع. |
| `home_svc4_title` | Logo Design & Visual Identity | الشعارات والهوية البصرية |
| `home_svc5_text` | We design social media posts aligned with your brand and the text and images you provide. | نصمم منشورات تتوافق مع هوية شركتك والنصوص والصور التي تقدمها. |
| `home_svc5_title` | Social Media Design | تصميم منشورات السوشيال ميديا |
| `home_why1_text` | The founder’s engineering background informs our understanding of how engineering firms present their services, projects, and capabilities. | خبرة مؤسس الشركة كمهندس تساعدنا على فهم طريقة عرض خدمات الشركات الهندسية ومشروعاتها واحتياجاتها. |
| `home_why1_title` | Engineering Industry Insight | فهم القطاع الهندسي |
| `home_why2_text` | We help organize and refine content before turning it into a professional visual deliverable. | نساعد في تنظيم المعلومات وصياغة المحتوى ثم تصميمه، بدل ترك العميل ينسق بين جهات متعددة. |
| `home_why2_title` | Content and Design Together | المحتوى والتصميم معًا |
| `home_why3_text` | We follow a clear process, from understanding the requirement to delivering the agreed files. | نعمل وفق خطوات واضحة تبدأ بفهم المطلوب وتنتهي بتسليم الملفات المتفق عليها. |
| `home_why3_title` | From Brief to Delivery | من الفكرة إلى التسليم |
| `home_why_title` | We Understand Your Business Before We Start Designing. | نفهم طبيعة أعمالك قبل أن نبدأ التصميم. |
| `home_work_all` | View All Work | مشاهدة كل الأعمال |
| `home_work_intro` | Explore selected company profiles, websites, and presentation projects created for our clients. | تعرّف على نماذج من بروفايلات الشركات، والمواقع الإلكترونية، والعروض التقديمية التي نفذناها لعملائنا. |
| `home_work_title` | Selected Work by Khatwa Designs. | أعمال مختارة من مشروعات خطوة. |
| `home_work_view` | View Project on Behance | عرض المشروع على Behance |
| `lang_ar` | العربية | العربية |
| `lang_en` | English | English |
| `link_service` | Explore Service | اكتشف الخدمة |
| `maintenance_button` | Notify me | أخبرني عند العودة |
| `maintenance_placeholder` | Enter your email address | أدخل بريدك الإلكتروني |
| `maintenance_text` | We have almost done all the technical improvements and will be back very soon. Thank you for your patience! | نعمل الآن على تحسينات تقنية وتجهيزية وسنعود إليك قريبًا بتجربة أفضل. شكرًا لصبرك. |
| `maintenance_title` | The website is in maintenance mode. | الموقع تحت الصيانة حاليًا. |
| `nav_about` | About Us | من نحن |
| `nav_close` | Close navigation | إغلاق القائمة |
| `nav_contact` | Contact | تواصل معنا |
| `nav_home` | Home | الرئيسية |
| `nav_services` | Services | خدماتنا |
| `nav_services_toggle` | Show services | عرض الخدمات |
| `nav_testimonials` | Client Reviews | آراء العملاء |
| `nav_toggle` | Open navigation | فتح القائمة |
| `nav_work` | Our Work | أعمالنا |
| `page404_home` | Back to homepage | العودة إلى الصفحة الرئيسية |
| `page404_kicker` | Sorry | عذرًا |
| `page404_meta_desc` | The page may have moved or no longer exists. Return to Khatwa Designs homepage. | قد تكون الصفحة التي تبحث عنها قد نُقلت أو لم تعد موجودة. ارجع إلى الصفحة الرئيسية لخطوة للتصميمات. |
| `page404_meta_title` | Page Not Found &#124; Khatwa Designs | الصفحة غير موجودة &#124; خطوة للتصميمات |
| `page404_text` | The page you're looking for may have moved or no longer exists. | قد تكون الصفحة التي تبحث عنها قد نُقلت أو لم تعد موجودة. |
| `page404_title` | Page not found! | الصفحة غير موجودة |
| `pf_cat_brand` | Brand identity | هوية بصرية |
| `pf_cat_portfolio` | Engineering portfolio | بورتفوليو هندسي |
| `pf_cat_social` | Social media design | تصميم سوشيال ميديا |
| `pf_cat_website` | Website | موقع إلكتروني |
| `pf_f_all` | All | الكل |
| `pf_f_brand` | Brand Identity | الهوية البصرية |
| `pf_f_presentations` | Presentations | العروض التقديمية |
| `pf_f_profiles` | Company Profiles | بروفايلات الشركات |
| `pf_f_social` | Social Media Design | السوشيال ميديا |
| `pf_f_websites` | Websites | المواقع الإلكترونية |
| `pf_filters_label` | Project categories | تصنيفات المشاريع |
| `pf_intro` | Explore selected projects across company profiles, websites, visual identity, presentations, and social media design. | نستعرض مجموعة من المشروعات التي نفذتها خطوة في بروفايلات الشركات، والمواقع الإلكترونية، والهويات البصرية، والعروض التقديمية، وتصميمات السوشيال ميديا. |
| `pf_meta_desc` | Explore selected company profiles, websites, visual identity, and presentation projects by Khatwa Designs. | شاهد نماذج من بروفايلات الشركات والمواقع والهويات البصرية والعروض التقديمية التي نفذتها خطوة. |
| `pf_meta_title` | Khatwa Designs Portfolio | أعمال خطوة للتصميمات |
| `pf_proj10` | Social Media Designs — Eng. Talal Shaker’s Office | تصميمات سوشيال — مكتب المهندس طلال شاكر |
| `pf_proj11` | Eng. Aya Rushdy — Branding | مهندسة آية رشدي — Branding |
| `pf_proj12` | Eng. Mohamed Al-Najjar — Branding | مهندس محمد النجار — Branding |
| `pf_proj7` | Engineering Group Portfolio | بورتفوليو المجموعة الهندسية |
| `pf_proj8` | Lawyer Fahad Al-Mutairi Company Website | موقع شركة المحامي فهد المطيري |
| `pf_proj9` | Omega Training Academy Website | موقع أكاديمية أوميجا للتدريب |
| `pf_title` | Selected Projects by Khatwa Designs. | أعمال مختارة من مشروعات خطوة. |
| `pf_view_profile` | Browse on Behance Profile | تصفح على صفحة Behance |
| `pp_a1` | Yes. We organize and write or edit the content based on the documents supplied by the client, then complete the design and production. | نعم، تشمل الخدمة تنظيم المعلومات وصياغة المحتوى وتحريره اعتمادًا على المستندات التي يقدمها العميل، ثم التصميم والإخراج. |
| `pp_a2` | This service covers content organization, writing/editing, and design. Engineering solution development, formal tender-compliance review, or engineering approval are not included unless separately agreed with appropriately qualified resources. | الخدمة المعروضة هنا تخص تنظيم المحتوى وصياغته وتصميمه. إعداد الحلول الفنية أو مراجعة الامتثال لمتطلبات المناقصة أو اعتماد المستندات هندسيًا ليس ضمنها إلا إذا تم الاتفاق صراحةً على خدمة مستقلة ومؤهلة لذلك. |
| `pp_a3` | Yes. We can review and update an existing document after assessing the file and defining the required changes. | نعم، يمكن مراجعة المحتوى والتصميم الموجودين وتحديثهما بعد تقييم الملف وتحديد المطلوب. |
| `pp_a4` | Yes. File formats, slide or page count, and review stages can be specified in the scope and quotation. | نعم، نحدد صيغ الملفات، وعدد الشرائح أو الصفحات، وعدد مراحل المراجعة في نطاق العمل وعرض السعر. |
| `pp_cta` | Share your presentation requirements and available documents to request a quote. | أرسل تفاصيل العرض والمستندات المتاحة لطلب عرض سعر. |
| `pp_inc1` | Reviewing client-provided documents and organizing information. | مراجعة مستندات العميل وتنظيم المعلومات. |
| `pp_inc2` | Writing and editing content while preserving approved meaning and data. | صياغة المحتوى وتحريره مع المحافظة على المعنى والبيانات المعتمدة. |
| `pp_inc3` | Structuring sections, headings, and tables. | تنظيم تسلسل الأقسام والعناوين والجداول. |
| `pp_inc4` | Designing slides, pages, and visual elements to support clarity. | تصميم الشرائح والصفحات والعناصر البصرية بما يخدم وضوح المعلومات. |
| `pp_inc5` | Producing final files in the agreed formats. | إخراج الملفات النهائية وفق الصيغ المتفق عليها. |
| `pp_intro` | We help construction companies and engineering firms organize and present technical and business information clearly. We review the documents you provide, structure the information, write and refine the content, and design the presentation or document for delivery within the agreed scope. | نساعد شركات المقاولات والمكاتب الهندسية على إعداد وتقديم المعلومات الفنية والتجارية بصورة واضحة ومنظمة. نراجع المستندات التي يقدمها العميل، وننظم المعلومات ونصوغ المحتوى ونحرره، ثم نصمم العرض أو الملف ونجهزه للتسليم وفق النطاق المتفق عليه. |
| `pp_meta_desc` | Content organization, editing, and design for presentations, technical proposals, and tender documents based on client materials. | إعداد المحتوى وتحريره وتصميم العروض التقديمية والعروض الفنية وملفات المناقصات اعتمادًا على مستندات العميل. |
| `pp_meta_title` | Presentation & Tender Document Design — Khatwa | تصميم العروض التقديمية وملفات المناقصات — خطوة |
| `pp_q1` | Can you write the presentation content based on our documents? | هل تكتبون محتوى العرض الفني من مستنداتنا؟ |
| `pp_q2` | Does the service include engineering preparation or tender approval? | هل تشمل الخدمة إعدادًا هندسيًا أو اعتمادًا للمناقصة؟ |
| `pp_q3` | Can you improve an existing presentation? | هل يمكنكم العمل على عرض موجود بالفعل؟ |
| `pp_q4` | Can the deliverables be defined in advance? | هل يمكن تحديد صيغة التسليم مسبقًا؟ |
| `pp_step1` | Define the presentation’s purpose and target audience. | تحديد غرض العرض والجمهور المستهدف. |
| `pp_step2` | Review the client documents and gather the supplied information. | مراجعة مستندات العميل وتجميع المعلومات. |
| `pp_step3` | Structure and refine the content for review. | تنظيم المحتوى وصياغته وإرساله للمراجعة. |
| `pp_step4` | Design and revise the document according to the agreement. | تنفيذ التصميم والإخراج ومراجعة الملاحظات وفق الاتفاق. |
| `pp_step5` | Deliver the agreed final files. | تسليم الملفات النهائية المتفق عليها. |
| `pp_title` | Structured Content. Professional Presentation. A Clearer Picture of Your Capabilities. | محتوى منظم. عرض احترافي. صورة تعكس قدرات شركتك. |
| `pp_type1` | Corporate presentations and client meeting decks. | العروض التقديمية للشركات واجتماعات العملاء. |
| `pp_type2` | Technical and commercial proposals. | العروض الفنية والتجارية. |
| `pp_type3` | Tender and prequalification documents, within the agreed content and design scope. | ملفات المناقصات والتأهيل المسبق، في حدود نطاق المحتوى والتصميم المتفق عليه. |
| `pp_type4` | Project and engineering solution presentations. | عروض المشروعات والحلول الهندسية. |
| `pp_type5` | Corporate presentations for construction and infrastructure businesses. | العروض التعريفية بشركات المقاولات والبنية التحتية. |
| `search_placeholder` | Enter your keywords... | اكتب كلمات البحث... |
| `search_title` | What are you looking for? | ماذا تبحث عنه؟ |
| `service_brand` | Logo Design & Visual Identity | الشعارات والهوية البصرية |
| `service_presentations` | Presentations, Tender Documents & Technical Proposals | العروض التقديمية وملفات المناقصات والعروض الفنية |
| `service_profiles` | Company Profiles & Engineering Portfolios | بروفايلات الشركات والمكاتب الهندسية |
| `service_social` | Social Media Design | تصميم منشورات السوشيال ميديا |
| `service_web` | Website Design & Development | تصميم وتطوير المواقع الإلكترونية |
| `services_meta_desc` | Explore company profile design, presentation and tender document design, website development, visual identity, and social media design by Khatwa Designs. | تعرّف على خدمات خطوة للتصميمات: بروفايلات الشركات والعروض وملفات المناقصات والمواقع الإلكترونية والهوية البصرية وتصميم السوشيال ميديا. |
| `services_meta_title` | Services — Company Profiles, Presentations & Websites &#124; Khatwa | خدمات خطوة — بروفايلات الشركات والعروض والمواقع |
| `services_quote_answer` | We review your requirements and provide a project-specific quote based on the service and agreed deliverables. | نراجع احتياجاتك ونقدّم عرض سعر خاصًا بالمشروع حسب الخدمة والمخرجات المتفق عليها. |
| `services_quote_question` | How is the project priced? | كيف يتم تحديد سعر المشروع؟ |
| `skip_content` | Skip to content | تجاوز إلى المحتوى |
| `sm_a1` | No. The core service covers design only. Caption writing, account management, scheduling, publishing, and responding to messages are not included. | لا. الخدمة الأساسية هي التصميم فقط. كتابة الكابشن، وإدارة الحسابات، والجدولة والنشر والرد على الرسائل ليست ضمن الخدمة الأساسية. |
| `sm_a2` | Yes. We design using the text, images, and information you provide, and arrange them clearly within the design. | نعم. نصمم باستخدام النصوص والصور والمعلومات التي تقدمها، وننظمها داخل التصميم بوضوح. |
| `sm_a3` | Yes. The designs are delivered in the dimensions and formats agreed in the project scope. | نعم. تُسلَّم التصميمات بالمقاسات والصيغ المتفق عليها في نطاق المشروع. |
| `sm_cta` | Share your requirements and request a quote. | شاركنا احتياجاتك واطلب عرض سعر. |
| `sm_inc1` | Individual posts or post sets according to the agreed scope. | تصميم منشورات منفردة أو مجموعات منشورات حسب الاتفاق. |
| `sm_inc2` | Consistent use of the approved brand identity. | الالتزام بعناصر الهوية البصرية المعتمدة. |
| `sm_inc3` | Clear arrangement of client-provided text and images. | تنظيم النصوص والصور التي يوفرها العميل داخل التصميم. |
| `sm_inc4` | Delivery in the agreed dimensions and formats. | تسليم التصميمات بالمقاسات والصيغ المتفق عليها. |
| `sm_intro` | We create social media post designs aligned with your visual identity and business. We help showcase your projects, services, and updates using the text, images, and information you provide. | نصمم منشورات السوشيال ميديا بما يتناسب مع الهوية البصرية لشركتك وطبيعة نشاطها. نساعدك على عرض مشروعاتك وخدماتك وأخبارك من خلال تصميمات متناسقة، باستخدام النصوص والصور والمعلومات التي تقدمها. |
| `sm_meta_desc` | Social media post designs aligned with your brand, using client-provided text and images. | تصميم منشورات سوشيال ميديا متناسقة مع هوية الشركة باستخدام النصوص والصور التي يقدمها العميل. |
| `sm_meta_title` | Social Media Design for Businesses — Khatwa | تصميم منشورات السوشيال ميديا للشركات — خطوة |
| `sm_note` | The core service covers design only. Caption writing, account management, scheduling, publishing, and responding to messages are not included. | الخدمة الأساسية هي التصميم فقط. كتابة الكابشن، وإدارة الحسابات، والجدولة والنشر والرد على الرسائل ليست ضمن الخدمة الأساسية. |
| `sm_note_title` | Scope Note | توضيح النطاق |
| `sm_q1` | Do you write captions or manage our social media accounts? | هل تكتبون الكابشن أو تديرون حساباتنا على السوشيال ميديا؟ |
| `sm_q2` | Do we need to provide the text and images? | هل علينا تقديم النصوص والصور؟ |
| `sm_q3` | Can the sizes and formats be agreed in advance? | هل يمكن الاتفاق على المقاسات والصيغ مسبقًا؟ |
| `sm_step1` | Define the post types and target platforms. | تحديد نوع المنشورات والمنصات المستهدفة. |
| `sm_step2` | Receive the text, images, and brand assets. | استلام النصوص والصور والهوية البصرية. |
| `sm_step3` | Create and review the designs according to the agreement. | تنفيذ التصميمات ومراجعتها وفق الاتفاق. |
| `sm_step4` | Deliver the final files. | تسليم الملفات النهائية. |
| `sm_title` | Social Media Designs That Reflect Your Brand. | تصميمات تعكس هوية شركتك وتحافظ على حضورها البصري. |
| `svc_faq_title` | Frequently Asked Questions | الأسئلة الشائعة |
| `svc_for_title` | Who Is This For? | لمن تناسب الخدمة؟ |
| `svc_process_title` | Our Process | كيف نعمل؟ |
| `svc_scope_title` | What’s Included? | ماذا تشمل الخدمة؟ |
| `svc_types_title` | Project Types | أنواع المشروعات |
| `thankyou_home` | Back to homepage | العودة إلى الصفحة الرئيسية |
| `thankyou_meta_desc` | Thank you for contacting Khatwa Designs. | شكرًا لتواصلك مع خطوة للتصميمات. |
| `thankyou_meta_title` | Thank You &#124; Khatwa Designs | شكرًا لك &#124; خطوة للتصميمات |
| `thankyou_text` | We will contact you as soon as possible. | سيتم التواصل معك في أقرب وقت ممكن. |
| `thankyou_thanks` | Thank you | شكرًا لك |
| `thankyou_title` | Your message was sent successfully | تم إرسال رسالتك بنجاح |
| `wd_a1` | Yes. We organize and write content based on the information, documents, and images supplied by the client. Language and translation requirements are specified in the quotation. | نعم، تشمل تنظيم وكتابة المحتوى اعتمادًا على المعلومات والمستندات والصور التي يقدمها العميل. ويُحدد نطاق اللغات والترجمة في عرض السعر. |
| `wd_a2` | The service includes launch preparation and assistance with domain connection within the agreed scope. Domain, hosting, and third-party subscription fees will be listed separately unless explicitly included. | تشمل الخدمة تجهيز الموقع للنشر والمساعدة في ربط الدومين وفق نطاق المشروع. رسوم الدومين والاستضافة وأي خدمات أو اشتراكات خارجية تُذكر بشكل منفصل في عرض السعر ما لم يُنص على غير ذلك. |
| `wd_a3` | Maintenance and updates are not automatically included in the initial build. They can be requested and agreed as a separate scope after launch. | الصيانة والتحديثات ليست تلقائيًا جزءًا من التنفيذ الأساسي؛ يمكن طلبها والاتفاق على نطاقها وتكلفتها بعد الإطلاق. |
| `wd_a4` | Advanced SEO should not be assumed to be included. Basic SEO setup or additional optimization work can be defined separately in the project scope and quotation. | لا ينبغي اعتبار خدمات SEO المتقدمة مشمولة تلقائيًا. يمكن تحديد إعدادات SEO الأساسية أو أي أعمال تحسين إضافية ضمن نطاق المشروع وعرض السعر. |
| `wd_a5` | We can review the current website and recommend updates or development work after assessing its state and your requirements. | يمكن مراجعة الموقع الحالي وتحديد ما يمكن تحديثه أو تطويره بعد تقييم حالته ومتطلبات العميل. |
| `wd_cta` | Tell us about your business and website goals to request a quote. | أخبرنا عن نشاطك وأهداف موقعك لطلب عرض سعر. |
| `wd_inc1` | Understanding the business, website objectives, and target audience. | فهم نشاط الشركة وأهداف الموقع والجمهور المستهدف. |
| `wd_inc2` | Planning pages and organizing sections. | تخطيط الصفحات وتنظيم الأقسام. |
| `wd_inc3` | Organizing and writing website content based on client-provided information, documents, and images. | تنظيم وكتابة محتوى الموقع اعتمادًا على معلومات ومستندات وصور العميل. |
| `wd_inc4` | Designing and developing the website according to the project scope. | تصميم الموقع وتطويره حسب نطاق المشروع. |
| `wd_inc5` | Preparing deployment on the agreed hosting platform and assisting with domain connection. | التجهيز للنشر على الاستضافة المتفق عليها والمساعدة في ربط الدومين. |
| `wd_inc6` | Optional maintenance and updates after launch under a separate agreement. | صيانة وتحديثات بعد الإطلاق عند طلب العميل وباتفاق منفصل. |
| `wd_intro` | We help construction companies and engineering firms build a professional digital presence through websites that combine thoughtful design, organized content, and clear user experience. The service covers page planning, content organization and writing based on client-provided information, website design and development, and launch preparation with domain connection within the agreed scope. Post-launch maintenance and updates can be arranged as an additional service. | نساعد شركات المقاولات والمكاتب الهندسية على بناء حضور رقمي احترافي من خلال مواقع تجمع بين التصميم والمحتوى المنظم وتجربة الاستخدام الواضحة. تشمل الخدمة تخطيط الصفحات، وتنظيم وكتابة المحتوى اعتمادًا على معلومات العميل، وتصميم الموقع وتطويره وتجهيزه للنشر وربط الدومين ضمن نطاق المشروع. ويمكن الاتفاق على الصيانة والتحديثات بعد الإطلاق كخدمة إضافية. |
| `wd_meta_desc` | Website content planning, design, development, and launch preparation for businesses and engineering firms, with optional maintenance. | تخطيط محتوى المواقع وتصميمها وتطويرها وتجهيزها للنشر للشركات والمكاتب الهندسية، مع صيانة اختيارية بعد الإطلاق. |
| `wd_meta_title` | Website Design & Development for Businesses — Khatwa | تصميم وتطوير المواقع الإلكترونية للشركات — خطوة |
| `wd_q1` | Does the service include website content writing? | هل تشمل الخدمة كتابة محتوى الموقع؟ |
| `wd_q2` | Are hosting and domain fees included? | هل تشمل الاستضافة والدومين؟ |
| `wd_q3` | Is post-launch maintenance included? | هل الصيانة والتحديثات بعد الإطلاق مشمولة؟ |
| `wd_q4` | Does the service include SEO? | هل تشمل الخدمة تحسين الظهور على محركات البحث (SEO)؟ |
| `wd_q5` | Can you improve an existing website instead of building a new one? | هل يمكن تطوير موقع موجود بدلًا من إنشاء موقع جديد؟ |
| `wd_step1` | Define the goals, required pages, and features. | تحديد الهدف والصفحات والوظائف المطلوبة. |
| `wd_step2` | Organize the content and prepare the text and images. | تنظيم المحتوى وتجهيز النصوص والصور. |
| `wd_step3` | Design, develop, and review the website. | تصميم الموقع وتطويره ومراجعته. |
| `wd_step4` | Prepare deployment and domain connection as agreed. | تجهيز النشر وربط الدومين حسب الاتفاق. |
| `wd_step5` | Deliver the website, with optional post-launch support. | التسليم، مع خيار متابعة الموقع وصيانته بعد الإطلاق. |
| `wd_title` | A Professional Website That Reflects Your Brand and Showcases Your Work. | موقع احترافي يعكس هوية شركتك ويعرض أعمالك بوضوح. |
| `wd_type1` | Corporate websites for construction companies and engineering firms. | مواقع تعريفية لشركات المقاولات والمكاتب الهندسية. |
| `wd_type2` | Websites showcasing services, projects, and past work. | مواقع تعرض الخدمات والمشروعات والأعمال السابقة. |
| `wd_type3` | Corporate websites for small and medium-sized businesses. | مواقع تعريفية للشركات الصغيرة والمتوسطة. |
| `wd_type4` | Landing pages for specific campaigns or services, within the agreed scope. | صفحات هبوط لحملات أو خدمات محددة، حسب نطاق المشروع. |
| `wd_type5` | Updates and improvements to existing websites. | تحديث وتطوير مواقع قائمة. |
| `wd_types_title` | Website Types | أنواع المواقع |
