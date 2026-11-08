# Phase 4 — inner pages implementation

Local review handoff, 8 November 2026. Branch: `redesign/react-v2`.

## Baseline and release isolation

Step 0 verified the correct branch and reviewed the complete pending Phase 3 change set, implementation/motion/QA documentation, route inventory, migration architecture and release constraints. Legacy **14/14**, React **24/24**, content/asset integrity and client/SSR/prerender build passed before Phase 4 editing. Only the reviewed homepage sources, tests, documentation, deliberately retained QA captures and temporary-tool ignore rules were committed:

**`1e53ac5` — `feat: complete Khatwa creative homepage redesign`**.

The prior test repair `1924486` and hero `ff8cf78` remain in history. No redundant hero commit was created. All Phase 4 work described here is **uncommitted**, with no staged files. No push, merge, deploy, workflow dispatch, main/tag update, GitHub Pages setting or production workflow change occurred. Local `main` and peeled `pre-react-v2` remain `a831f3d456767b5c4116c3477f9f79726e296f51`.

## Route coverage

See [PHASE-4-ROUTE-MATRIX.md](PHASE-4-ROUTE-MATRIX.md) for each source route, original topics/copy keys/assets/links, actual components, metadata and root/Arabic/English static URLs.

- Redesigned all **15 published inner content/error routes**: About, Services, five service detail pages, Portfolio, Client Reviews, Contact, three legal documents, contact result and 404. Unknown paths retain the existing 404 fallback.
- The **homepage remains unchanged**. New regression tests compare both Arabic/English homepage HTML fingerprints and the approved hero/home/token source files against Phase 3.
- All **five legacy redirects** retain their destinations and query/language/fragment handling. The React fallback presentation receives the existing brand button style; navigation logic and static redirect handler are unchanged.
- All **five excluded source documents** remain excluded and archived. No blog/search/coming-soon/maintenance route was newly published or deleted.
- The router/build contract is unchanged: 21 published source routes, each emitted at original, `ar/` and `en/` paths, plus the corresponding root/index aliases. Direct loads and refreshes use real static files, without a server rewrite.

## Shared components and presentation

| Component | Responsibility |
| --- | --- |
| `InnerPageHero` / `SourceHero` | Source-backed heading/introduction/actions on the existing cinematic blue palette, responsive editorial grid and breadcrumb. |
| `AnimatedPageHeading` | Complete accessible heading label, whole-word GSAP reveal, intact Arabic shaping. |
| `BreadcrumbNavigation` | Localized home/service/current-page navigation with native links and correct language/direction. |
| `EditorialSection` / `SectionDivider` | Shared spacing/container/surface and owned motion scope. |
| `ServiceFeatureSection` | Large heading paired with preserved scope/benefit/type/audience content. |
| `ProgressiveTimeline` | Existing ordered stages, source numbering where present and progressive reveal without pinning. |
| `PageCTA` | Existing quote messaging and destination, one-time entrance and blue glow. |
| `AnimatedImageReveal` / `ProjectShowcase` | Existing project images/categories/CTAs, mask reveal, desktop-only mild image parallax, visible native Behance links, reserved 4:3 dimensions. |
| `RelatedServices` | Navigation to the other real services, in approved priority order. |
| `ContactPanel` | Responsive form/next-steps/social-channel layout around the **unchanged** `ContactForm`. |

Page design follows the completed homepage's blue `#1C3664`, yellow `#FFCD05`, gray `#CCCCCB`, supporting gray `#626879`, IBM Plex Sans Arabic and Plus Jakarta Sans. New CSS is opt-in to `.inner-page`/`.inner-*`; it does not target the homepage or restyle the shared header/footer.

## Page-specific behavior

- **About:** complete company story with a larger lead, supporting copy and the original brand statement; mission, vision and all five values; existing services/contact actions plus the existing portfolio destination. No team members, metrics or achievements added.
- **Services:** all five original titles/descriptions/detail links; larger treatment for company profiles, presentations/tenders and websites; four original process stages and an existing quote CTA. Social media remains **design only**, as required by the actual source/master; account management was not invented.
- **Service details:** all source scope/deliverable/audience/type/process/FAQ/note content retained. FAQs remain readable static content. Related projects are selected only by the existing project category, at most two; related-service links use actual routes. No packages, prices or promised deliverables added.
- **Portfolio:** all twelve projects, category labels, original images and individual Behance/profile CTAs. Six native filters retain counts **12 / 5 / 1 / 3 / 2 / 1** for all/profiles/presentations/websites/brand/social, with pressed states, result announcements, keyboard and touch support. Project links are always visible.
- **Reviews:** all twelve names, dates and exact existing locale texts; the source-cautioned Farida Gerges summary remains a paragraph, not a fabricated verbatim quotation. Original dated/translation note retained; no ratings or review carousel added.
- **Contact:** original heading/body, next-step/audience copy, field semantics, service selection and provider behavior. Existing official social links are reused from `socials.json`; no public phone/address/mailbox was invented. The required-field note is shown once instead of repeating the same sentence outside and inside the form. Privacy copy/link and validation/loading/retry remain in the original form component.
- **Legal:** complete original English bodies and mailto/internal links retained, with the exact Arabic availability notice. Source h4 section headings are promoted to h2 for semantic hierarchy, without changing wording. Unapproved Arabic legal translations were not created.
- **Result/404:** same neutral/success/error logic, localized metadata, status/alert roles, retry/home destinations and unknown-route behavior, using the shared inner hero. Visual inspection of state URLs does not represent a real email send.

`inner-model.js` removes obsolete layout wrappers only, preserving complete semantic source nodes and inline content. Portfolio category/CTA mapping is derived from the existing portfolio AST, avoiding an invented second catalog. The original content JSON, archive, logos/artwork, metadata, App routing, source renderer, ContactForm, EmailJS adapter/configuration and deployment workflow remain unchanged.

## Motion and performance

The existing Phase 3 `createSectionMotion` / `useGsap` system is reused. Inner sections own scoped contexts; headings, selected statement/divider, process timelines, project media and CTA are animated. Ordinary paragraphs, all FAQ answers and reviews remain static. Focus completes local reveals; essential links/copy remain visible. Locale/filter/route changes and live reduced-motion changes revert contexts. Desktop fine-pointer parallax is disabled on mobile. No new dependency, WebGL, smooth-scroll package, preloader, cursor or long pinning was added.

The first build exposed an app chunk slightly above 500kB. Pure content JSON modules now form a separate cacheable `site-content` chunk using the existing [Rolldown code-splitting API](https://rolldown.rs/reference/OutputOptions.codeSplitting). The configuration isolates data modules without order-sensitive side effects; it does not hide the warning by raising its threshold. Final build has no oversized-chunk warning:

| Output | Minified | Gzip |
| --- | --- | --- |
| Application | 307.36kB | 95.02kB |
| Stable content data | 206.07kB | 37.24kB |
| Existing GSAP motion | 113.31kB | 44.51kB |
| Combined CSS | 47.62kB | 9.11kB |

This improves file separation/cacheability, not a claim that the entire application is lazy-loaded. The GSAP bundle is unchanged. Existing external fonts and original logo payload remain; no field-performance, Lighthouse or FPS score is claimed.

## Final validation

- Legacy **14 passed, 0 failed**; React **26 passed, 0 failed**.
- Client, SSR and all locale static entries: build passed. Content extraction verified **26 original source pages, 394 keys per locale, twelve projects and twelve reviews**.
- All **127 source and built asset fingerprints passed**, retaining the reviewed normalization policy from `1924486`.
- Original route/config, direct-entry/refresh/404, redirect, static metadata/link/asset, navigation, portfolio-filter and mocked form transport/validation/retry tests passed.
- Two new Phase 4 regressions verify every source-backed inner page's translated text, literal legal paragraphs/headings/lists, source links and images, and the unchanged homepage markup/source. Existing lifecycle coverage now also navigates from home to About and Portfolio, switches locale, cycles filters three times and confirms no detached triggers; reduced motion and unmount leave zero triggers.
- Edge: **150 core measurements** across fifteen inner routes, two languages and five viewport widths. No horizontal overflow, hidden reduced-motion heading words, missing h1 or zero-size project images. A further twelve result-state views and ten final Contact size checks passed. See [PHASE-4-VISUAL-QA.md](PHASE-4-VISUAL-QA.md).
- Browser form checks stopped at invalid submission and locale-preserved values. EmailJS requests observed: **zero**. Existing unit/integration transport tests use mocks. No real emails or external messages were sent.
- One expected browser resource-404 message was recorded when deliberately opening the unknown path; the raw QA file retains it. No uncaught JavaScript exception or unexpected failed resource request was observed.
- `git diff --check` passed; no new secret/credential patterns were found in authored candidates. Ignored build, SSR, browser and checker scratch output is not part of the handoff. Deliberate QA images/results are retained under `docs/phase4-qa`.

During implementation a test selector initially matched `company-portfolio.html` instead of `/portfolio.html`; it was narrowed to the primary portfolio navigation link. The documentation generator was adjusted to use explicit JSON import attributes for direct Node execution. Final checks above ran after these corrections.

## Files changed

Under `react-v2/`:

- New: `src/components/inner/InnerPageSystem.jsx`, `src/pages/InnerPages.jsx`, `src/content/inner-model.js`, `src/styles/inner.css`.
- Updated: `src/pages/ContentPages.jsx` (inner exports only; HomePage composition retained), `src/pages/ResultPage.jsx`, `src/pages/NotFoundPage.jsx`, `src/pages/LegacyRedirectPage.jsx` (presentation only), `src/main.jsx` (scoped stylesheet), `vite.config.js` (pure JSON content chunk).
- QA: new `tests/inner-pages.test.mjs`, extended `tests/interactions.test.mjs`, new `scripts/phase4-route-matrix.mjs`, `scripts/phase4-browser-qa.cjs`.

Documentation/evidence: this report, `docs/PHASE-4-ROUTE-MATRIX.md`, `docs/PHASE-4-VISUAL-QA.md`, and `docs/phase4-qa`.

## Exact local preview

```powershell
Set-Location 'G:\Khatwa-Websit\Khatwa-Designs-Main'
npm.cmd run react:dev
```

Arabic example: http://127.0.0.1:5173/Khatwa-Designs-Main/about.html?lang=ar

English example: http://127.0.0.1:5173/Khatwa-Designs-Main/en/about.html?lang=en

Use the existing instance on 5173. An independent port can use `npm.cmd --prefix react-v2 run dev -- --port 5183` without stopping another process.

```powershell
npm.cmd test
npm.cmd run react:build
npm.cmd run react:test
node react-v2/scripts/phase4-route-matrix.mjs
npm.cmd run react:preview
```

Build before React tests because they inspect `dist` and import `.ssr/entry-server.js`. Static preview: http://127.0.0.1:4173/Khatwa-Designs-Main/. No command publishes content. On fresh machines install existing locks with `npm.cmd ci` and `npm.cmd --prefix react-v2 ci`. Use Node within `react-v2/package.json`'s declared supported range; this environment's 24.14.0 ran checks successfully but is below the declared 24.15.0 floor.

## Known limits and Phase 5 readiness

Ready for **manual inner-page visual review**, not release approval. All existing project SVGs remain documented temporary covers; approved original imagery is still needed. Approved Arabic legal bodies, review-source cautions and legal mailbox verification remain prior content gaps. Physical Safari/iOS/Android, real screen readers, enlarged-text/zoom and low-end-device frame timing need human/device review. Independent Edge QA ran; the previously unavailable optional design gate was not rerun or claimed as passed.

Phase 5 recommendations only: approve visual direction/motion, supply actual project imagery and legal translations, complete manual accessibility/performance review, then separately authorize release work. Phase 5, secondary new routes, remote operations and deployment have **not** started.

## Subsequent development-branch upload authorization

After the implementation handoff above, the owner requested uploading the project to GitHub. This authorizes committing the reviewed Phase 4 files and pushing `redesign/react-v2` only, including its existing local Phase 3/test-fix commits. The uncommitted/no-push status above describes the original review handoff. Legacy 14/14, React 26/26 and the production build were rerun successfully before this upload. Visual approval remains pending; this instruction does not authorize a merge, deployment, main/tag update or Phase 5 implementation.
