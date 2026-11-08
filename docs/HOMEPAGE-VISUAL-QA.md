# Homepage visual QA — Phase 3C/3D

Reviewed locally on 8 November 2026 in headed Microsoft Edge through Playwright, against the built static preview on port 4173. Arabic default and English tested independently. No email forms were submitted.

## Automated results

| Check | Result |
| --- | --- |
| Legacy suite | 14/14 passed |
| React suite | 24/24 passed |
| Client / SSR / 21-route prerender | Passed |
| Original asset integrity | All 127 source and built assets passed; normalization restricted to fourteen audited text paths |
| All existing routes, redirects and SEO | Existing source/build/static HTTP tests passed |
| Secondary portfolio filters, navigation and locale state | Existing React tests passed; secondary presentation unchanged |
| Homepage categories | All 6, profiles 4, websites 1, presentations 1 in both languages |
| GSAP lifecycle | StrictMode, locale and filter rebuilds stable; zero after reduced-motion/unmount |
| EmailJS | Original integration unchanged; mocked validation/transport/retry tests passed; no external messages |

## Browser matrix

| Width | Arabic RTL | English LTR | Horizontal overflow | Reduced motion |
| --- | --- | --- | --- | --- |
| 320px | Checked | Checked | None | Visible/static |
| 390px | Checked | Checked | None | Visible/static |
| 768px | Checked | Checked | None | Visible/static |
| 1024px | Checked | Checked | None | Visible/static |
| 1440px | Checked | Checked | None | Visible/static |

Desktop work alternates wide/narrow columns; mobile uses a single column without delayed offsets. The service intro/story/process split stacks below 60rem, and service rows stack their descriptions/CTAs below 40rem. Testimonials become a single list. The timeline remains vertical and follows reading direction. No fixed-height text box or forced/pinned scrolling is used. Project image boxes reserve 4:3 space and decode lazily.

Browser checks observed seven homepage sections, one h1, six project entries, nonzero image dimensions, no hidden section-heading words under reduced motion, and `animation-name: none` for the reduced-motion marquee. Filter counts, pressed states and visible CTAs were verified with mouse/keyboard and an emulated touch context. Locale switching was checked after React completed its update, including direction and URL. The first Tab reaches the skip link, Enter focuses `main-content`, and a focused project has a visible solid outline. In a JavaScript-disabled context the prerendered page retained six section headings and all six project links.

The production-preview QA session observed **zero console errors, page errors or HTTP responses ≥400**. An earlier transient Vite HMR 500 while creating the new stylesheet was resolved before the production-preview run.

## Captures

Full-page captures use reduced motion so every section is in its readable final state and lazy images are loaded before capture. Focused desktop work/Why captures exercise the normal motion state.

[Recorded browser results](qa/browser-results.json) include all ten language/viewport combinations, interaction outcomes and empty error/failed-response lists.

- [Arabic desktop](qa/home-ar-1440.png), [English desktop](qa/home-en-1440.png)
- [Arabic mobile](qa/home-ar-390.png), [English mobile](qa/home-en-390.png)
- [Desktop selected work](qa/work-ar-desktop.png), [desktop Why / marquee](qa/why-ar-desktop.png)
- [Arabic services mobile](qa/services-ar-mobile.png), [Arabic work mobile](qa/work-ar-mobile.png), [English services tablet](qa/services-en-tablet.png)

Reproduce browser checks with the globally available Playwright CLI (no project dependency added):

```powershell
npm.cmd run react:build
npm.cmd run react:preview
# In another terminal:
playwright-cli.cmd -s=khatwa open http://127.0.0.1:4173/Khatwa-Designs-Main/ --browser=msedge --headed
playwright-cli.cmd -s=khatwa run-code --filename=react-v2/scripts/homepage-browser-qa.cjs
```

The QA function reports measured results and writes captures into existing `docs/qa`; review its returned values rather than treating command exit alone as a visual approval.

## Performance boundaries

One fresh-context desktop sample measured CLS **0.00272** with reduced motion. App JS is 497.81kB minified / 130.39kB gzip; existing motion bundle remains 113.31 / 44.51kB; combined CSS is 32.88 / 7.17kB. No additional libraries were installed. This sample is local and does not establish field Core Web Vitals, real mobile frame timing or network performance. Existing Google-hosted fonts and the original logo payload were preserved; their loading cost remains.

## Additional checker limitation

**GATE: ERROR** — the optional design-skill checker could not read rendered main/section/h1 for copy lint, could not walk 1440/390 for consistency, and its layout check timed out. No successful gate result is claimed. It was not rerun. Actual Edge/Playwright results above and repository tests are independent evidence; no WCAG certification, Lighthouse score or comprehensive automated contrast/overlap audit is claimed.

## Manual approval and outstanding items

- Supply approved original screenshots/covers for the six featured real projects. Every checked-in project SVG is a documented temporary placeholder. The layout and Behance links are complete, but real project imagery remains unresolved. No generated or stock project mockups were invented.
- Approve desktop asymmetry, service hierarchy, Arabic/English typography, section pacing, marquee speed and CTA glow against the existing hero.
- Check enlarged text/browser zoom, real iOS/Safari/Android, screen readers and low-end-device frame timing. Emulated touch and DOM/browser checks do not replace these reviews.
- Recheck contrast/focus across user themes and real-device font rendering. Keyboard targets and static content were sampled, not exhaustively audited with assistive technologies.
- Existing secondary legal-body Arabic translation gaps remain outside this phase. No secondary-page redesign was started.

**Ready for manual homepage visual review. Not approved for release.** Phase 3C/3D is uncommitted; `main`, `pre-react-v2`, production workflows and GitHub Pages settings are untouched. No push, merge or deployment occurred.
