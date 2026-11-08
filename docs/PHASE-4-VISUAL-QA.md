# Phase 4 visual QA

8 November 2026. Local headed Microsoft Edge / Playwright against the built static preview at `http://127.0.0.1:4173/Khatwa-Designs-Main/`. No live emails sent.

## Coverage and results

The [recorded browser report](phase4-qa/browser-results.json) contains **150 measurements**: every one of the fifteen published inner content/error pages × Arabic/English × 320/390/768/1024/1440 CSS pixels. The five redirects and unknown-route fallback were checked separately; the homepage is protected by unchanged-markup/source regression tests.

| Area | Observed outcome |
| --- | --- |
| Desktop/tablet/mobile | No horizontal overflow in all 150 observations. Measured content widths equal the viewport's client width (viewport minus the 15px scrollbar in this browser). |
| RTL/LTR | Correct document direction for both languages. Inner legal bodies remain explicitly English/LTR, with an Arabic notice. |
| Headings | One main h1 on every route; zero hidden heading words under reduced motion. Original Arabic words remain intact, without character-level animation. |
| Images | Nonzero reserved dimensions; 4:3 frames, lazy decoding; original project mapping retained. All visible covers remain disclosed placeholders. |
| Portfolio | Both languages: all 12, profiles 5, presentations 1, websites 3, brand 2, social 1. Pressed state and result count update; original destinations remain. |
| Keyboard/touch | Enter activates filters, project links have a solid focus outline, emulated touch can filter and access visible CTAs. Existing shared skip-link behavior is unchanged and already tested. |
| Mobile navigation | Opens with correct expanded state, navigates to Services, closes on navigation. |
| Form | Invalid submission focuses name and marks it invalid. Locale changes preserve typed name, selected profile service, query and `#contact-form`. Final Contact captures show a single required-fields note and all six original fields. |
| EmailJS safety | Network interception was installed during browser checks; **0 email requests** occurred. No valid live submission attempted. Success/failure/timeout/duplicate/retry behavior remains covered by existing mocked transport tests. |
| Reduced motion | Live switch restores visible heading words. Images/timeline/CTA have static alternatives; no mobile pinning or text parallax. |
| No JavaScript | About, Portfolio, Contact and Privacy still expose the original heading/body/links; Portfolio retains all twelve project links. Contact sending and filter interactivity require JavaScript. |
| Redirects | All five source replacements preserve `lang=en`, `review=1` and `#scope`, and land at the correct existing destination. |
| 404 | Deliberately unknown URL returns HTTP 404 and one accessible main heading. Its expected browser resource-404 console message is retained in the report. |
| Console/network | No uncaught JS errors or unexpected resource failures. The raw `errors` list contains the planned unknown-path resource-404 message; it is not an application exception. |

Additional targeted review checked neutral/success/error result layouts in both languages at 390/1440 (twelve views), including alert roles on error, with no overflow. State URL previews are layout checks, not evidence of an actual send. Contact was rechecked at all five widths in both languages after removing the duplicated required-fields note; all six fields and full width were retained. The two Contact captures were refreshed after that change.

Final repository checks: **14/14 legacy**, **26/26 React**, production client/SSR/prerender build and all **127 original source/build asset checks** passed. Existing metadata, routes, redirects, form implementation and source catalogs remained unchanged. See [the implementation report](PHASE-4-INNER-PAGES-REPORT.md) for file scope and exact commands.

## Screenshots

Full-page screenshots use reduced motion and load lazy project media first, so they show readable final states. The FAQ screenshot samples ordinary-motion rendering.

- [About — Arabic desktop](phase4-qa/about-ar-1440.png)
- [Services — Arabic desktop](phase4-qa/services-ar-1440.png)
- [Company profiles — Arabic desktop](phase4-qa/company-portfolio-ar-1440.png)
- [Website service — Arabic mobile](phase4-qa/web-design-ar-390.png)
- [Social design — English mobile](phase4-qa/social-media-design-en-390.png)
- [Portfolio — English desktop](phase4-qa/portfolio-en-1440.png)
- [Reviews — Arabic mobile](phase4-qa/customer-stories-ar-390.png)
- [Contact — Arabic mobile](phase4-qa/contact-ar-390.png), [English desktop](phase4-qa/contact-en-1440.png)
- [Privacy — Arabic route, English legal body, tablet](phase4-qa/privacy-policy-ar-768.png)
- [404 — Arabic mobile](phase4-qa/404-ar-390.png)
- [Error result — English mobile](phase4-qa/result-error-en-390.png)
- [FAQ — Arabic mobile, normal motion](phase4-qa/faq-ar-mobile-motion.png)

## Reproduce

Build and start the local static preview in one terminal; then run the browser script in another:

```powershell
Set-Location 'G:\Khatwa-Websit\Khatwa-Designs-Main'
npm.cmd run react:build
npm.cmd run react:preview
# Another terminal:
playwright-cli.cmd -s=khatwa open http://127.0.0.1:4173/Khatwa-Designs-Main/about.html?lang=ar --browser=msedge --headed
playwright-cli.cmd -s=khatwa run-code --filename=react-v2/scripts/phase4-browser-qa.cjs
```

The globally installed CLI is not a new project dependency. Its QA function reports observations and saves screenshots under existing `docs/phase4-qa`. Review the returned values; command exit alone is not visual approval. Route matrix reproduction: `node react-v2/scripts/phase4-route-matrix.mjs`.

## Remaining visual and release review

- Approve typography, hero proportions, spacing, section surfaces, gallery asymmetry and motion intensity in both languages. Captures were inspected; subjective owner approval is pending.
- Replace temporary covers with approved originals. No stock/generated images or fabricated project detail were added.
- Obtain approved Arabic legal bodies; preserved legal mailboxes and review-source cautions still need content-owner verification.
- Complete physical-device Safari/iOS/Android, assistive-technology and enlarged text/zoom review. Emulated touch and DOM tests do not establish full WCAG conformance.
- Measure real-device smoothness and network/Core Web Vitals before release. Current evidence is local; external fonts and original logo costs are unchanged. No FPS, Lighthouse or field-performance score is claimed.
- The optional design gate that previously failed to inspect the application was not rerun or counted as passed. Independent Edge checks above are the browser evidence.

**Ready for manual Phase 4 review.** The homepage is unchanged, Phase 4 is uncommitted, production refs/settings/workflows are unchanged, and no Phase 5 work or deployment has begun.
