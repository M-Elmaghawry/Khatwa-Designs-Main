# Phase 2 implementation report

Implemented locally on 8 November 2026, on `redesign/react-v2`. Starting HEAD: `e4c2d2d981976fd3f791e3f9cc4a5c157a7a383f`. Production main and the peeled `pre-react-v2` tag remain `a831f3d456767b5c4116c3477f9f79726e296f51`.

## Safety and scope

Pre-flight found the correct development branch and a clean working tree. All five Phase 1 documents were read and the legacy scripts/tests/inventory reviewed. Authenticated, read-only GitHub checks reconfirmed Pages `build_type: workflow`, the official project URL, no custom domain, exactly one active workflow and the `github-pages` environment's sole permitted ref policy: branch `main`. Latest production workflow remained successful run `42416681879` at the production baseline. The development workflow retains the previously approved main-only job guards, deploy-only Pages/OIDC permissions and ref-specific concurrency.

No production settings, workflows, main ref, backup tag, legacy source, assets or root dependency lock were modified. No commit, push, merge, workflow dispatch or production deployment was performed for Phase 2. The new package and documentation remain local working-tree changes for review.

## Implementation and files

- New independent `react-v2/` package: Vite project/base configuration, separate lockfile and ignored output directories, React entry points, React Router route map, static prerender build and strict static preview server.
- Reusable components: AppLayout, Header, Navigation, LanguageSwitcher, Footer, Container, SectionWrapper, Button, SiteLink, PageTransitionWrapper, ContentRenderer and ContactForm.
- Page components: home, about, service directory, shared service details, portfolio, reviews, contact, legal documents, result, redirects and Not Found. See `CONTENT-MIGRATION-STATUS.md` for each route's completeness.
- Deterministic data extraction: centralized Arabic/English catalogs; structured semantic page sections; explicit project/review/service/form/social modules; source fingerprints and archive. Legacy scripts are not executed by the React renderer.
- Original brand tokens, typography, responsive foundation styling, minimal shell and scoped GSAP/ScrollTrigger utilities. No complete redesign or cinematic animation was implemented.
- Root `package.json` adds four namespaced React commands, keeping all five original script values and all legacy dependency declarations unchanged.
- Added this report, `REACT-COMPONENT-ARCHITECTURE.md` and `CONTENT-MIGRATION-STATUS.md`; the start-here guide links to the new commands and reports.

## Installed dependencies

All dependencies are exact-pinned in `react-v2/package.json` and locked in its separate `package-lock.json`. npm reported zero vulnerabilities for the new package at installation.

| Package | Version | Purpose |
| --- | --- | --- |
| react / react-dom | 19.3.1 | Component runtime, client rendering and prerendering |
| react-router-dom | 7.18.5 | URL routing, navigation and static router |
| gsap | 3.15.1 | GSAP and included ScrollTrigger plugin |
| vite | 8.3.6 | Local server and client/SSR builds |
| @vitejs/plugin-react | 6.2.1 | React compilation and refresh |
| parse5 | 8.1.1 | Source HTML extraction and structured content preservation |
| jsdom | 31.0.0 | DOM integration/smoke tests without real outbound forms |

Validated with Node `24.19.0`, npm `11.17.0`. The test dependency requires Node `^22.22.2 || ^24.15.0 || >=26.0.0`; the package declares that constraint. ScrollTrigger is part of GSAP and has no separate package dependency.

## Run in VS Code

Open the repository folder, select a PowerShell terminal, and run:

```powershell
Set-Location 'D:\zz-CODING\Khatwa-Designs-Main'
npm.cmd run react:dev
```

Open **http://127.0.0.1:5173/Khatwa-Designs-Main/**. Arabic is the default. English static route example: `http://127.0.0.1:5173/Khatwa-Designs-Main/en/about.html?lang=en`. Port 5173 is strict; stop an existing owned instance if it is occupied. Stop the server with Ctrl+C.

Dependencies are already installed in this workspace. For a fresh checkout on a supported Node version, run `npm.cmd --prefix react-v2 ci` once before starting React. The legacy `npm start`, `npm run build`, `npm test` and `npm run prepare:site` commands keep their original meaning.

```powershell
# Existing legacy regression suite
npm.cmd test
# Verify generated content; regenerate only after an approved source change
npm.cmd --prefix react-v2 run content:check
# Build actual static entry files locally, then test that output
npm.cmd run react:build
npm.cmd run react:test
# Optional strict static preview, after building
npm.cmd run react:preview
```

Static preview: **http://127.0.0.1:4173/Khatwa-Designs-Main/**. Nothing in these commands publishes the output. The production workflow still builds/publishes the legacy `_site` directory.

## Validation results

- Existing legacy suite: **14 passed, 0 failed**.
- React client and SSR builds: passed. Prerendered all 21 existing published URLs at original, `ar/` and `en/` paths; five excluded files remain absent. `.nojekyll`, a language-aware sitemap and robots file are generated only in the new build output.
- New automated suite: **17 passed, 0 failed**, covering content/translation/project/review integrity, all 127 asset hashes and built references, main/tag/workflow safety, actual job-condition evaluation, all-route Arabic/English SSR and static metadata, strict HTTP direct-entry/refresh/error behavior, redirects, language persistence/link helpers, hydration, interactive switching/filtering/navigation, React form validation/duplicate prevention, mocked success/failure/timeout, session retry and reduced-motion cleanup.
- The new suite includes DOM interaction checks and does not submit real emails. No workflow was triggered as a negative deployment test.
- Local Vite server responded HTTP 200 for home, English about, contact with service preselection, original logo, public EmailJS config and the compiled React entry module.
- Final read-only production recheck at **8 November 2026 16:02:12 +03:00** confirmed remote main `a831f3d456767b5c4116c3477f9f79726e296f51`, unchanged backup tag object `07e7f5b062eb4bd6ef73f50fb205bb4b1aad3f97`, deployment `7627396483`, successful workflow run `42416681879`, and the sole allowed environment branch `main`. The public homepage returned HTTP 200 and matched the unchanged baseline HTML after newline normalization.
- Real browser preview attempt failed because the browser access host was unavailable. No screenshot or visual/real-browser accessibility approval is claimed. Responsive/keyboard/assistive-technology review remains a Phase 3 gate.

## Known limits and Phase 3 readiness

Foundation, structured real content, complete English runtime, Arabic default, routing/static entry strategy, shared shell, form integration and motion lifecycle infrastructure are ready for Phase 3 design work. The three legal documents still need approved Arabic body translations; their original English bodies are preserved and visibly marked. Existing temporary project covers remain temporary, with no claim they are real project screenshots.

Query-only English legacy URLs initially receive Arabic static HTML because a static host cannot vary files by query string; the React runtime switches correctly and English static entries provide server-delivered English content/metadata. The build's explicit locale entries solve direct English crawl/refresh without removing old URLs. Visual review is outstanding due to unavailable browser access. Performance/code-splitting and bespoke page composition can be refined during the design phase; this phase intentionally uses a shared semantic content renderer.

Future publishing requires explicit approval. Before release, recheck deployment settings and main, review legal/content gaps, design and real-browser results, and plan the separately approved production workflow hardening/update. Do not point production at `react-v2/dist` during this phase.
