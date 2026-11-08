# Phase 3A / 3B — design foundation and cinematic hero

Implemented on `redesign/react-v2`, 8 November 2026. The initial Phase 3 handoff kept the changes uncommitted for visual review. The owner subsequently requested uploading the project to GitHub, explicitly authorizing a commit and push of the development branch. This authorization does not include main, merging, production deployment or Actions/Pages settings changes. Visual review remains outstanding as described below.

## Verified Phase 2 baseline

Before any Phase 3 editing:

- Confirmed the development branch and reviewed all uncommitted Phase 2 sources/documents.
- Passed all **14 legacy tests**, the Vite client/SSR/prerender build and all **17 Phase 2 React tests**.
- Verified all 26 source pages, 21 published routes, 394 keys per locale, twelve projects, twelve reviews, all 127 original asset hashes and the existing EmailJS behavior through the existing integrity suite.
- Reviewed staged scope and scanned candidate files for common credential patterns. Installed packages, build output, SSR output and environment files were excluded. No unrelated files were included.
- Created dedicated **local** Phase 2 foundation commit: `68782cf0a81c2fba20a62a23003e7dc958bf5595` (`Establish verified Phase 2 React foundation and content migration`). The working tree was clean immediately after that commit.

Production main and peeled backup tag remain `a831f3d456767b5c4116c3477f9f79726e296f51`. The development remote was not advanced; the Phase 2 commit itself is also local-only. The prior Phase 2 report describes its original uncommitted handoff; the commit above is the preservation action explicitly requested for this phase.

## Reference review and original direction

The accessible [HubMicroo page](https://www.hubmicroo.com/) presents an agency headline, paired project/contact actions, services, company positioning and selected work. These structural observations informed hierarchy and portfolio orientation. Live interactive reference inspection was unavailable; no claim is made that its actual typography motion, parallax, background animation or responsive behavior was observed.

Khatwa's implemented motion and composition are original proposals: a blue editorial hero, three large headline phrases, layered blue glows/orbits, a brand board using the original Khatwa logo, a restrained yellow accent and an integrated light navigation surface. No reference artwork, proprietary layout/code, customer claims or metrics were copied.

## Visible differences from Phase 2

| Area | Phase 2 | Phase 3A / 3B |
| --- | --- | --- |
| Hero surface | Minimal light source-section rendering | Near-viewport blue composition, tonal grid, glows and orbit lines |
| Headline | Generic source heading | Large editorial three-phrase treatment with restrained yellow emphasis |
| Imagery | No dedicated hero visual | Original logo on a layered brand-identity board with verified founding year |
| Navigation | Separate white header | Floating light navigation surface integrated with the homepage hero |
| CTAs | Basic source links | Opt-in pill buttons, clear accent/outline hierarchy and directional icons |
| Scroll affordance | Source section anchor | Existing `#work` destination with an animated, labeled scroll indicator |
| Motion | Registration/cleanup scaffold | GSAP reveal/stagger, ambient glow motion and desktop-only restrained depth |
| Other homepage sections | Existing source-backed sections | Same six sections, same order/content and Phase 2 renderer/styles |

The hero uses exactly the preserved `home_hero_title`, `home_hero_text`, `home_hero_kicker`, `cta_quote` and `cta_work` values. The quote CTA still opens contact with the active language; work and scroll actions still target the existing `#work` section. No service, client, project or performance claim was added. Since 2021 is supported by the approved company master.

Existing project SVG covers are documented placeholders, so they were not repackaged as real project screenshots. The hero instead uses the verified, unchanged `images/khatwa-logo@2x.png`, with its original 8334×2096 aspect ratio reserved. All original project entries and covers remain in their existing sections.

## Brand and reusable design system

Source brand colors remain blue `#1C3664`, yellow `#FFCD05`, gray `#CCCCCB` and supporting gray `#626879`. Dark surfaces and glows are tonal derivatives of that blue; yellow is restricted to focal accents and one primary CTA. The original Plus Jakarta Sans / IBM Plex Sans Arabic typography remains.

Extended tokens cover display/editorial/label typography, additional spacing, reading/editorial container widths, near-viewport section height, light/soft/dark surfaces, gradients, blue glows, borders, shadows, radii and interaction timing. New `Surface`, `Card` and `EditorialHeading` primitives and opt-in Button variants are available for later phases. Existing source-page and form buttons retain their default variant.

Homepage-only CSS scopes the cinematic hero and header integration. Responsive rules cover desktop, tablet and mobile; artwork reserves its aspect ratio and uses a compact mobile stage. Fixed-height text or forced scrolling is not used. The other homepage sections were not redesigned.

## Motion, localization and accessibility

- Hero reveal: scoped GSAP timeline staggers complete phrases, then supporting copy/CTAs and the brand visual. Arabic is split only at spaces into whole phrases; no letter/glyph splitting or Arabic letter spacing is applied. The h1 retains the exact full-language accessible label.
- GSAP/ScrollTrigger registration remains once per client. The lifecycle hook now uses synchronous browser layout effects so initial entrance states are established before paint. Static/prerendered content is visible by default; failed or disabled JavaScript cannot leave essential text hidden by CSS.
- Ambient glow and scroll-indicator motion pause when the hero leaves view or the document is hidden. Desktop-only depth uses ScrollTrigger without pinning or scroll hijacking. No mobile parallax, animated preloader, custom cursor or WebGL was added.
- Scoped contexts revert all animations/triggers when unmounted, when language changes or when reduced motion is enabled. Media-query state, visibility listeners and font-ready refresh callbacks are cleaned up. StrictMode and repeated language changes are tested against the actual GSAP/ScrollTrigger integration.
- Reduced motion skips animation setup and keeps all hero elements visible. Direction-aware arrows, logical CSS properties, visible focus styles, native links and original quote/work destinations are preserved.
- Motion is separated into a reusable cached bundle using [Rolldown's documented code splitting](https://rolldown.rs/reference/OutputOptions.codeSplitting). No dependency was added or upgraded.

Lifecycle approach follows [GSAP's React guidance](https://gsap.com/resources/React/). The implemented sequence is a Khatwa proposal, not an observation of the reference site's animation.

## Files changed

| File | Purpose |
| --- | --- |
| `react-v2/src/components/CinematicHero.jsx` | New bilingual hero, original logo board, CTAs and scroll affordance |
| `react-v2/src/components/design-system.jsx` | Surface, Card and EditorialHeading primitives |
| `react-v2/src/components/primitives.jsx` | Opt-in Button variants; default behavior retained |
| `react-v2/src/components/Header.jsx` | Homepage cinematic variant |
| `react-v2/src/components/AppLayout.jsx` | Select header variant only for homepage |
| `react-v2/src/pages/ContentPages.jsx` | Replace only the first homepage section; keep six subsequent source sections |
| `react-v2/src/content/hero-ui.js` | Bilingual interface labels and safe phrase splitting; original catalogs untouched |
| `react-v2/src/motion/heroMotion.js` | Reveal, ambient/depth animation and visibility/media cleanup |
| `react-v2/src/motion/useGsap.js` | SSR-safe synchronous setup before browser paint, reduced-motion cleanup |
| `react-v2/src/styles/tokens.css` | Brand-derived design-system tokens |
| `react-v2/src/styles/design-system.css` | Opt-in design primitives, buttons and focus states |
| `react-v2/src/styles/hero.css` | Scoped responsive hero/header composition |
| `react-v2/src/main.jsx` | Load the new scoped styles |
| `react-v2/vite.config.js` | Split GSAP into a separate motion bundle |
| `react-v2/tests/interactions.test.mjs` | Bilingual hero/hydration/CTA and actual motion lifecycle checks |
| `react-v2/tests/hero.test.mjs` | Phrase preservation and byte-for-byte Phase 2 content/integration/dependency preservation |
| `docs/PHASE-3A-3B-IMPLEMENTATION.md` | This report |

Dependencies added/upgraded: **none**. Package manifests and lockfiles match the committed Phase 2 baseline. Legacy content/assets, route definitions, SEO implementation, form integration and deployment workflow are untouched.

## Validation

- Legacy regression suite: **14 passed, 0 failed** before the baseline commit and again at final validation.
- New React suite: **21 passed, 0 failed**, including the original 17 checks plus four focused hero/preservation/motion checks.
- Client, SSR and static prerender build: passed with no oversized-chunk warning after separating motion. Approximate minified/gzip output: app 483.98/127.21 kB, motion 113.31/44.51 kB, CSS 19.67/4.78 kB.
- Both Arabic and English hero static rendering/hydration, exact existing copy, original-logo path, seven-section homepage structure, six existing featured cards, real CTA destinations and `#work` target passed.
- Active motion test: exactly two desktop ScrollTriggers after StrictMode mount and after each Arabic/English switch, zero when reduced motion is enabled, two after restoring motion, and zero after unmount. Reduced-motion setup and listener cleanup also passed. No animation/plugin warning or error appeared in the automated run.
- Byte-for-byte comparisons against Phase 2 verify preserved catalogs, pages data, renderer, form/transport, metadata, routing/build contract, dependencies/locks and the original EmailJS configuration. No real email was sent.
- Vite preview HTTP confirmed the existing local server serves the current CinematicHero module. Port 5173 was already occupied by the existing preview, so no unrelated process was stopped.
- Final authenticated read-only GitHub check at **8 November 2026 16:35:59 +03:00** confirmed unchanged remote main, backup tag object `07e7f5b062eb4bd6ef73f50fb205bb4b1aad3f97`, deployment `7627396483`, latest successful workflow run `42416681879`, and the sole allowed environment branch `main`. No production deployment was triggered by this task.

### Visual review limitation

The browser connector reported its access host unavailable. Native Firefox review was attempted next, but the platform stopped Computer Use because browser URL-policy enforcement is unsupported for the current Windows browser. Browser automation was stopped; no bypass, alternate automation or screenshot claim was made. Consequently, desktop/tablet/mobile visual screenshots, measured overflow/layout shift, real-browser animation smoothness and manual console/keyboard review are **not verified**. DOM tests do not establish pixel-perfect layout or performance.

## Exact local preview commands

Use the supported Node version already installed in the workspace. From VS Code's PowerShell terminal:

```powershell
Set-Location 'D:\zz-CODING\Khatwa-Designs-Main'
npm.cmd run react:dev
```

Open **http://127.0.0.1:5173/Khatwa-Designs-Main/**; English: **http://127.0.0.1:5173/Khatwa-Designs-Main/en/?lang=en**. If the existing server is already using 5173, use that preview. To start a separate instance without stopping it:

```powershell
npm.cmd --prefix react-v2 run dev -- --port 5183
```

Then open **http://127.0.0.1:5183/Khatwa-Designs-Main/**. Ctrl+C stops an instance you started.

```powershell
npm.cmd test
npm.cmd run react:build
npm.cmd run react:test
```

Optional strict static preview after building: `npm.cmd run react:preview`, at **http://127.0.0.1:4173/Khatwa-Designs-Main/**. None of these commands publishes content.

## Review gates and suggested next work

Review this hero at 390px, tablet widths and 1440px in both languages, including enlarged text, focus traversal, reduced-motion changes, scrolling away/back and repeated route/locale changes. Inspect the real browser console and measure layout shift and frame timing before approving motion. The three legal-body Arabic translations and original project imagery remain the existing Phase 2 content-review gaps.

Stop implementation scope here: other homepage sections, portfolio redesign and subsequent page treatments belong to later approved work. The subsequent owner request authorizes committing and pushing this work to `redesign/react-v2` only. Main changes, merging, Pages/Actions setting changes and production deployment still require separate explicit authorization.
