# React + Vite + GSAP migration plan

Planning only, 8 November 2026. No React implementation, package installation, legacy deletion or production change is authorized in this task. Development home: `redesign/react-v2`, based on `a831f3d456767b5c4116c3477f9f79726e296f51`.

## Preservation contract

Keep Khatwa Designs / خطوة للتصميمات, the original logo, original blue `#1C3664`, yellow `#FFCD05`, light gray `#CCCCCB` and supporting gray `#626879`. Preserve the existing asset library, Arabic/English copy, all source pages, five approved services and their priorities, twelve visible projects plus master-document material, twelve dated reviews, contact details, source-confirmed Behance destinations, SEO, accessibility and EmailJS integration. See `CONTENT-AND-ROUTES-INVENTORY.md` for the complete source map.

Arabic is already the current runtime default and must remain the V2 default, with full English and RTL/LTR support. Many static source metadata tags still use English; review first paint and indexing during migration. Existing placeholder covers remain identified as placeholders; never claim they are project screenshots. Preserve legal pages and mark unknown addresses/claims for owner review rather than inventing replacements.

Crafto is not a design constraint for V2; retain applicable licenses. [Hubmicroo](https://www.hubmicroo.com/) is an inspiration reference only. Its inspected content suggests a prominent hero, clear service/work/review sections and repeated contact paths; do not copy its copy, brand, client claims or assets. Actual visual and motion decisions belong to the next design phase.

## Proposed application boundaries

- React + Vite, React Router, GSAP and GSAP ScrollTrigger. Select and verify compatible current versions and licenses when implementation is authorized; do not prescribe speculative versions or install now.
- Shared shell: header, language selector, accessible navigation, footer, quote CTA and route-level metadata. Route components for home/about/services, five service details, portfolio, reviews, contact, result, three legal pages and not-found.
- Separate content data from components: service definitions, project records (name, category, asset, exact Behance URL and verification status), review records (original quote, translation, source, date), FAQ data, legal content and Arabic/English message catalogs.
- Preserve the current 394 translation keys per locale initially, with a reviewed mapping for any renamed keys. Extract existing content before adapting presentation; keep the master document authoritative for business facts.
- Adapt form behavior behind a dedicated integration boundary. Preserve current service/template configuration and parameter names; do not put private keys in Vite-exposed environment variables. Keep personal inquiry data out of URLs and analytics.

## GitHub Pages routing decision before implementation

Production is a project site at `/Khatwa-Designs-Main/`, publishing a static `_site` artifact using GitHub Actions. Pages provides no general server rewrite or PHP runtime.

Set the future Vite `base` to `/Khatwa-Designs-Main/` and use base-aware asset URLs. Configure React Router consistently with that base. Preserve direct `.html` links, query strings and fragments. A BrowserRouter-only build is insufficient: refreshing `/about.html` or nested paths must resolve to an actual emitted file on Pages.

Preferred compatibility design to validate: emit static entry documents at all 16 currently published content/error routes and five legacy redirect routes, with a router mapping those exact `.html` pathnames. Ensure each content entry has its own correct static metadata and crawlable content through reviewed prerendering or equivalent generation. Preserve root/index equivalence. The five intentionally excluded files remain in source, not newly exposed in production.

Do not select hash routing by default: existing fragment links and stable indexed `.html` URLs must keep their meaning. A custom 404 bootstrap is not an approved substitute for verified direct route behavior and SEO. Prototype direct requests, refresh and 404 behavior locally under the project subpath before committing to the router/output design. Keep `.nojekyll`; retain a CNAME only if a future approved domain change explicitly requires it.

## Bilingual behavior

Preserve current initialization: resolve a supported explicit `?lang=ar|en`, otherwise use **Arabic**. The baseline writes `khatwa_lang` but does not read it during initialization; honoring a stored preference would be a separately reviewed behavior change. Preserve useful existing query parameters (`service`, `status`, `retry`) and fragments while switching language. Render Arabic with `lang=ar`, `dir=rtl`; English with `lang=en`, `dir=ltr`, including field labels, validation, result screens, document titles, descriptions, menus, FAQs, accessible labels and image alternatives.

Preserve correct-language canonicals, hreflang alternatives, Open Graph metadata, robots and sitemap coverage. Plan Arabic x-default consistently; do not merely flip navigation or use browser-only metadata updates as the complete indexing solution. Avoid first-paint English on Arabic entry pages. Keep localStorage failure handling and a visible fallback language control.

## GSAP motion approach

Create restrained hero entrances, section reveals and optional portfolio interactions in the design phase. Use scoped GSAP contexts tied to React component lifecycle, clean up on unmount and handle StrictMode double mounting. Register ScrollTrigger once; refresh after fonts/images/layout and locale changes. Use matchMedia and logical direction-aware transforms for responsive RTL/LTR.

Respect `prefers-reduced-motion`, avoid scroll hijacking, preserve native keyboard/anchor navigation, and keep content readable if animation fails. Do not animate essential content into permanent invisibility, trap focus in pinned sections, or rely on pointer hover. Use transform/opacity where useful; reserve image dimensions and review mobile CPU, scroll performance and layout shift before adding heavy effects.

## Implementation sequence for the next phase

1. **Release safety gate:** retain the approved development-only workflow guards, verify main-only environment policy and unchanged baseline, and retain backup tag. Applying workflow hardening to main is a separate approval-dependent action. Establish local preview first.
2. **Design review:** define desktop/mobile Arabic-first layouts and a motion storyboard using Khatwa's identity and actual content. Keep five services, quote-based conversion and clear work/reviews paths.
3. **Foundation:** only after implementation authorization, add the selected stack on the development branch. Separate V2 entry/build output from preserved legacy files; do not replace root production pages prematurely.
4. **Content and routing:** migrate every currently published route and legacy redirect; carry excluded/archive files unchanged. Implement complete locales, statically valid metadata, shared shell, service/project/review data and correct subpath output.
5. **Forms and accessibility:** port EmailJS behavior, preselected service mapping, validation/focus, duplicate prevention, timeout, success/error/retry flow, session draft expiry and BFCache recovery. Preserve serviceId/templateId/publicKey configuration without exposing private credentials. Use mocks; any real send requires separate authorization.
6. **Motion and polish:** add GSAP effects after content works without motion; validate route/locale cleanup, reduced motion, mobile navigation, focus and performance.
7. **Candidate QA:** build/test using authorized dependencies, inspect generated files and diff, and create preview evidence. Present a reviewed release candidate; retain production until explicit final approval.

## Acceptance matrix

| Area | Required evidence before release |
| --- | --- |
| Release isolation | Development push/tag push has no production trigger; deploy job main guard and main-only environment verified; no real deployment used as a negative test |
| Content | All 26 source files accounted for, same 16 content/error pages and five redirects published, five exclusions preserved; all five services, twelve visible projects, twelve dated reviews and legal copy retained |
| Locales | Every migrated key exists in ar/en; Arabic default with clean storage; explicit English URL works; RTL/LTR navigation, forms, result screens and metadata pass |
| Routes | Root plus every published `.html` URL direct-loads and refreshes under `/Khatwa-Designs-Main/`; unknown route uses 404; asset and relative-link crawl has no missing files |
| Legacy links | Five redirects retain language, other query parameters and fragment, with an accessible no-JS fallback |
| Contact | Mocked success/failure/timeout/invalid-config tests; no duplicate send, data leakage or false success; service query aliases and retry restoration retained |
| Accessibility | Keyboard menus, focus visibility, labels/errors/live announcements, headings, contrast, reduced motion and logical reading order reviewed |
| Responsive/motion | Review at 390px and 1440px plus breakpoint edges and zoom; no horizontal overflow; ScrollTriggers cleaned on navigation and locale changes |
| SEO | Per-route static title/description/canonical/hreflang, robots and sitemap reviewed; preserve excluded/redirect indexing intent |
| Assets/performance | Original logo and palette unchanged; placeholders disclosed; fonts/images sized; performance budgets agreed against a measured baseline |
| Final approval | Concrete PR/diff, checks, previews, release SHA and rollback plan approved by owner before main or deployment changes |

## Validation and rollback

For this preparation, run only installed non-destructive tests and Git/ref/configuration inspections. Future implementation needs a complete V2 build and static-output validation without modifying or deleting legacy source. Never infer that legacy passing tests prove an unbuilt React site works.

Use `PRODUCTION-BASELINE.md` for the reviewed rollback procedure. Keep production unchanged until approval; do not force-reset main or move the backup tag. Re-read GitHub settings before any future production action and report uncertainty if authenticated inspection becomes unavailable.
