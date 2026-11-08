# Phase 3C / 3D — homepage implementation

Local review handoff, 8 November 2026. Branch: `redesign/react-v2`.

## Preservation and test repair

The actual checkout already contained Phase 3A/3B in `ff8cf78`, after the Phase 2 baseline `68782cf`. It was clean. No duplicate hero commit was created or history rewritten.

The original asset test failure was verified across all 127 inventoried assets. Fourteen UTF-8 text assets had LF bytes identical to their Git blobs, while the historical inventory hashes had been calculated from CRLF checkouts: `images/demo-footer-pattern.svg`, `projects/README.md`, and the twelve explicitly listed project covers. Recreating CRLF from each original Git blob reproduced its inventory fingerprint exactly. No artwork differed.

Local fix commit: **`1924486`** — `fix: normalize text asset line endings in fingerprint verification` (the earlier local-only `2bd187a` was amended to include strict BOM/lone-CR regressions).

The test helper allows CRLF-to-LF normalization only for those fourteen named paths. Audited canonical fingerprints are pinned to the original Git blobs, and the historical inventory fingerprint must still match the audited record. Binary assets and all unlisted assets, including other SVGs, retain raw-byte SHA-256 checks. Both source and built assets are verified. Regressions prove acceptance of LF/CRLF equivalents, rejection of content/BOM/lone-CR changes, strict handling of unknown SVG/binary bytes, rejection of invalid UTF-8, and agreement with Git/history. The original inventory and artwork were not edited. No `.gitattributes` exists; effective `core.autocrlf=true` was inspected and left unchanged.

Repair validation before commit: 14 legacy tests, 23 React tests (21 existing plus two new fingerprint regressions), client/SSR/prerender build, and all 127 asset checks passed.

## Homepage changes

The hero and all six subsequent original sections remain in the same order. The navigation, footer, secondary pages, routing, SEO, source catalogs, original logo, project assets, EmailJS adapter/configuration, package versions, and production workflow are unchanged.

| Component | Final presentation |
| --- | --- |
| `HomeServices` | Numbered editorial rows; the first three approved services receive larger typography, with all five original titles, descriptions, CTAs and URLs retained. Full-row native links answer focus, pointer and touch. |
| `HomeWhy` | Blue storytelling section, large original headline and three original explanatory points; no added company claims or statistics. |
| `BrandMarquee` | Original labels of the first three services, yellow on blue, repeated decoratively; one accessible text version, pause control, hover/focus pause, offscreen/document-hidden pause, RTL direction and reduced-motion static wrap. |
| `HomeWorks` / `ProjectGrid` | Six original featured projects, alternating 7/5 and 5/7 column compositions on desktop, visible title/category/Behance CTA, responsive reserved 4:3 media, lazy decoding, mask reveals and desktop-only subtle parallax. Native filters: all, profiles, websites, presentations; status announcements and pressed states. The existing secondary portfolio and all twelve projects/filter categories remain unchanged. |
| `HomeProcess` | Ordered four-stage vertical timeline, progressive number/copy reveals and a static readable layout on every size; no pinning. |
| `HomeTestimonials` | All five existing homepage recommendations, names and dates, with a large lead quotation and four supporting entries. The existing paraphrased recommendation stays a paragraph rather than being misrepresented as a literal quotation. Original explanatory note and reviews link retained. |
| `HomeClosingCTA` | Existing bilingual headline/body/contact destination on a dark blue surface, static brand-derived glow with a one-time entrance and the existing yellow CTA style. |

Brand colors remain `#1C3664`, `#FFCD05`, `#CCCCCB`, and supporting `#626879`; typography remains IBM Plex Sans Arabic / Plus Jakarta Sans. Logical CSS, direction-aware arrows, consistent container edges and brand surfaces extend the existing hero system.

The [HubMicroo reference](https://www.hubmicroo.com/) was read for its agency hierarchy, work/service emphasis and repeating typography. No reference images, code, claims or distinctive composition were copied. The requested scope and pinned Khatwa brand take priority over generic skill recipes.

## Content and imagery limitation

All existing project entries are real, but their checked-in SVG media are explicitly marked `temporaryCover: true` and documented as placeholders in `projects/README.md`. No real project screenshots were supplied in this checkout. The implementation retains those exact covers and Behance destinations and adds a localized factual temporary-cover notice. It does **not** claim those covers are real project imagery. Providing approved original project screenshots is the main outstanding visual requirement; no stock images, generated mockups or invented client names were added.

Featured project/category choices and testimonial attributions are derived from the preserved homepage AST in `home-model.js`, avoiding a second factual catalog. All original translated homepage text is covered by the bilingual integration test. The only new UI copy describes filter results, marquee pause and the existing cover limitation.

## Motion and lifecycle

See [GSAP-MOTION-CATALOG.md](GSAP-MOTION-CATALOG.md). Patterns are composed inside the existing `useGsap` lifecycle. Scoped contexts revert on locale/dependency changes, unmount and live reduced-motion changes. Nested project scopes exclude themselves from the parent section's setup. Mask reveal and image parallax intentionally share the frame as two distinct triggers, each registered once. Focus completes local reveals; essential copy and links never receive hidden visibility. Static/prerendered content remains visible without JavaScript.

No dependency, smooth-scroll library, WebGL, custom cursor, mobile pinning or scroll listener was added. Hover uses CSS; GSAP handles entrance/scroll choreography. The marquee uses a CSS transform loop plus IntersectionObserver/document-visibility lifecycle cleanup.

## Validation

- Final legacy suite: **14 passed, 0 failed**.
- Final React suite: **24 passed, 0 failed**: all 21 prior scenarios retained/extended, two fingerprint regressions and one bilingual homepage behavior/content regression.
- Production build: **passed**, including unchanged content extraction verification and client/SSR/static entries for 21 published routes with default Arabic and explicit Arabic/English entries.
- Asset integrity: **127 source and built assets passed** with the reviewed path-specific normalization policy.
- Actual GSAP lifecycle tests: stable trigger counts through StrictMode, locale switches, repeated portfolio filter changes and reduced-motion toggling; zero triggers after unmount. One image mask and one parallax trigger per desktop frame are distinguished explicitly.
- Existing route/redirect, metadata, navigation, secondary portfolio filtering, EmailJS validation/confirmation/retry, preserved content and workflow/ref checks passed. Email transport was mocked; no real emails were sent.
- Edge browser: both languages at 320/390/768/1024/1440 CSS px, no horizontal overflow, all image boxes reserved, filters, locale switching, touch CTA, keyboard focus/skip link, reduced-motion and no-JavaScript content checked. No console errors/page errors or failed resource requests during the production-preview QA capture.
- Local single-load CLS sample: **0.00272**, at 1440 × 900 with reduced motion. This is not a field Core Web Vitals result or an FPS/Lighthouse audit.
- Minified/gzip build output: app **497.81 / 130.39 kB**, motion **113.31 / 44.51 kB**, CSS **32.88 / 7.17 kB**. GSAP bundle size is unchanged. Existing externally hosted fonts remain a network/performance dependency.
- `git diff --check` passed. `main` and peeled `pre-react-v2` remain `a831f3d456767b5c4116c3477f9f79726e296f51`.

A development-only HMR 500 appeared while a newly imported stylesheet was being created; the subsequent complete production-preview QA had no failed requests. An initial new lifecycle assertion counted a frame's intentional parallax and mask as duplicates; it was corrected to test each pattern separately, then the complete React suite passed.

Additional design-skill automation returned **GATE: ERROR**: its copy reader found no rendered main/section/h1, its consistency walker could not walk 1440/390, and its layout checker timed out. It was not rerun and is not counted as a pass. The independent Edge/Playwright checks and screenshots are the available browser evidence. The Impeccable context launcher was unavailable because its engine cache was not installed; the existing code, source docs and brand tokens were read directly.

## Changed files

Phase 3C/3D source: `src/components/home/HomeSections.jsx`, `src/content/home-model.js`, `src/motion/patterns.js`, `src/styles/home.css`, `src/pages/ContentPages.jsx`, `src/main.jsx` (all under `react-v2`). QA: `react-v2/tests/interactions.test.mjs`, `react-v2/scripts/homepage-browser-qa.cjs`, the three Phase 3C/3D docs and `docs/qa` evidence. Root `.gitignore` ignores temporary browser/design-checker working files only.

The earlier committed repair consists only of `react-v2/tests/asset-fingerprints.mjs`, `asset-fingerprints.test.mjs` and the fingerprint loop in `foundation.test.mjs`.

## Exact preview and validation commands

From PowerShell:

```powershell
Set-Location 'G:\Khatwa-Websit\Khatwa-Designs-Main'
npm.cmd run react:dev
```

Arabic: http://127.0.0.1:5173/Khatwa-Designs-Main/?lang=ar

English: http://127.0.0.1:5173/Khatwa-Designs-Main/en/?lang=en

If the existing instance already owns 5173, reuse it. An independent instance can use `npm.cmd --prefix react-v2 run dev -- --port 5183`.

```powershell
npm.cmd test
npm.cmd run react:build
npm.cmd run react:test
npm.cmd run react:preview
```

Build **before** React tests: they import `.ssr/entry-server.js` and inspect `dist`. The static preview is http://127.0.0.1:4173/Khatwa-Designs-Main/. No command publishes content. On a fresh checkout use `npm.cmd ci` at the root and `npm.cmd --prefix react-v2 ci` for React. The installed Node 24.14.0 ran the checks successfully but is below the package's declared Node 24.15.0 floor; use a version allowed by `react-v2/package.json` for a supported setup.

## Review status and next phase

The homepage composition and motion are ready for manual visual review, **not release approval**. See [HOMEPAGE-VISUAL-QA.md](HOMEPAGE-VISUAL-QA.md). Review real project screenshots, motion intensity, Arabic/English composition and enlarged text before approval. Physical iOS/Safari, screen-reader and low-end-device frame timing audits remain outstanding. Original legal Arabic translations remain a pre-existing secondary-page gap.

Phase 3C/3D remains **uncommitted**. No push, merge, deploy, main/tag movement, GitHub Pages setting or production workflow change occurred. Phase 4 is not started; recommendations only: supply approved real project images, complete manual accessibility/performance review, then obtain separate authorization for any secondary-page work or release.
