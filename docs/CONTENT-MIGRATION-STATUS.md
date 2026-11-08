# Phase 2 content migration status

All original files remain present and unchanged. The React foundation has real source content, not placeholder pages. Content transfer is distinct from Phase 3 visual redesign and final launch approval.

## Routes

| Original public route | React status |
| --- | --- |
| `/`, `index.html` | HomePage: all seven source sections, approved positioning, five services, featured work, process and reviews |
| `about.html` | AboutPage: complete source company story, mission, vision, values and CTA |
| `services.html` | ServicesPage: five services in approved order, process and quote CTA |
| `company-portfolio.html` | ServicePage: full profile scope, audience, process, FAQs and CTA |
| `powerpoint-presentations.html` | ServicePage: full presentation/tender scope, project types, process, FAQs and CTA |
| `web-design.html` | ServicePage: full website scope, types, process, FAQs and CTA |
| `brand-identity.html` | ServicePage: full identity scope, process, FAQs and CTA |
| `social-media-design.html` | ServicePage: full design-only scope, process, scope note, FAQs and CTA |
| `portfolio.html` | PortfolioPage: all twelve existing projects, exact covers/Behance URLs and working category filters |
| `customer-stories.html` | ReviewsPage: all twelve names, source quotations/summaries, existing translations and 2021 dates |
| `contact.html` | ContactPage: source copy, six named fields, service/country options and React EmailJS flow |
| `thank-you.html` | ResultPage: neutral/success/error states, localized metadata and retry behavior |
| `404.html`, unknown paths | Accessible NotFoundPage with source message, home link, noindex and static error output |
| `privacy-policy.html` | LegalPage: complete original English body retained; Arabic body translation pending review |
| `terms-and-conditions.html` | LegalPage: complete original English body retained; Arabic body translation pending review |
| `copyright.html` | LegalPage: complete original English body retained; Arabic body translation pending review |

Each original route also has explicit Arabic/English static entry variants under `ar/` and `en/`. Query routes `?lang=ar|en` still work. Language-aware navigation uses the actual English static entries for English. Direct loads and repeated refreshes are tested on a strict static server, without SPA rewrite support.

| Legacy route | Preserved production-compatible redirect |
| --- | --- |
| `logo-design.html` | `brand-identity.html` |
| `services-details.html` | `services.html` |
| `social-media-management.html` | `services.html` |
| `video-presentations.html` | `services.html` |
| `n8n-ai-automations.html` | `services.html` |

Redirects retain other query parameters, language and fragments. Generated static redirects reuse the unchanged legacy redirect handler and provide an accessible fallback link. The React route performs the corresponding replacement during client navigation.

`blog.html`, `blog-single-clean.html`, `coming-soon.html`, `maintenance.html` and `search-result.html` stay excluded from public output, as before. Source files and structured historical content are retained in `archive.json`. Historical source for all five replaced service redirects is also archived. These ten archived sources are not new public React pages.

## Integrity evidence

- All 26 source HTML files are inventoried and preserved: 16 content/error pages, five redirect sources and five exclusions.
- All 394 Arabic and 394 English catalog values compare exactly against the existing translation source.
- All twelve portfolio cards retain their original asset mapping and exact source Behance destinations. Homepage selections remain unchanged. Engineering Group, Aya Rushdy, Mohamed Al-Najjar and Talal Shaker still use the existing Behance profile rather than invented detail URLs.
- All twelve reviews retain their author/date/text-key mapping. Farida Gerges remains the existing cautious summary; it is not converted into a fabricated direct quotation. The source PDF remains unavailable for independent re-verification.
- All 127 tracked image/font/project-file hashes match the Phase 1 inventory and copied build assets. Logos, favicon, customer logos, fonts and existing temporary project covers are retained.
- The approved company/content master remains untouched. The Bank Albilad Vision booklet is recorded as master-only material, not silently added as a thirteenth published card.
- Existing official social links, legal mailto links and metadata are retained. Source-present legal addresses have not been independently verified; no new telephone number or contact claim was invented.
- Source fingerprints cover HTML, original localization/layout/contact logic, route config and the content master. Content checks fail if these drift from the extracted modules.

## Fully migrated versus scaffolds

The listed routes have source-backed React content and working routing; contact/result/filter/navigation behavior is implemented. They are not empty scaffolds. The three legal documents have a clearly identified pre-existing Arabic body-copy gap. Per-page design remains a shared, minimal semantic rendering of the source sections, rather than a completed bespoke visual redesign.

Only the page transition/motion treatment is deliberately a scaffold: scoped GSAP/ScrollTrigger registration and cleanup are ready, with no hero animation, parallax or extensive scroll effects. Phase 3 should design and test these after layout review.

## Remaining content and release reviews

1. Obtain and approve Arabic legal-body translations; verify source-present legal mailbox details and legal claims before launch.
2. Replace the existing SVG project covers only when approved original project imagery is supplied. They remain temporary covers, as documented in `projects/README.md`.
3. Recheck third-party link availability and any review-source wording cautions. This migration preserves source-confirmed links; it does not claim live verification of every external site.
4. Perform real-browser responsive, keyboard, reduced-motion and assistive-technology QA. Browser access host was unavailable during this run; DOM/HTTP checks passed, but screenshots and visual layout approval were not obtained.
5. Approve final design and production release separately. No push, merge, deployment or production settings change is included in Phase 2.
