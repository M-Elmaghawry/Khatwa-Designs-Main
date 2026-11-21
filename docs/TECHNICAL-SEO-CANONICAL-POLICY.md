# Technical SEO canonical and language policy

Audit date: 21 November 2026, Asia/Riyadh. These are local candidate changes on `seo/technical-audit`; production remains unchanged.

## Authoritative URLs

Production base: `https://m-elmaghawry.github.io/Khatwa-Designs-Main/`.

| Content | Arabic canonical | English canonical |
|---|---|---|
| Home | Base URL with trailing slash | Base + `en/` |
| Translated inner page | Base + existing `page.html` | Base + `en/page.html` |
| English-only legal document | No indexable Arabic version | Base + `en/privacy-policy.html`, `en/terms-and-conditions.html`, or `en/copyright.html` |

There are **11 Arabic and 14 English canonical, indexable URLs**. “Indexable” describes local technical eligibility, not confirmed search-engine indexing.

The 11 translated page files are `index.html`, `about.html`, `services.html`, `company-portfolio.html`, `powerpoint-presentations.html`, `web-design.html`, `brand-identity.html`, `social-media-design.html`, `portfolio.html`, `customer-stories.html`, and `contact.html`.

All canonical URLs are HTTPS, absolute, query-free and fragment-free. Home uses the directory slash; existing inner-page `.html` spelling remains. Inner-page trailing slashes and extensionless paths are not introduced as routes. Canonicals omit every query parameter, including tracking and functional parameters. Browser normalization removes `lang`, preserving other parameters and fragments so form selection, retry and incoming campaign links remain usable.

## Language and fallback

Clean default URLs always render Arabic; `/en/` always renders English. A saved browser preference cannot silently change the language at a clean canonical URL. Explicit language switching changes the path and retains functional queries/fragments. Existing query requests remain supported by the compatibility script. A valid incoming `lang=ar` or `lang=en` takes precedence when choosing its clean destination; an invalid value falls back to the path language, then Arabic.

Each translated canonical has `ar`, `en`, and `x-default` alternates, including self-reference. Both HTML and sitemap use the same reciprocal destinations. `x-default` intentionally selects the Arabic default for that same page; there is no locale selector page. This follows Google's [localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

The three legal documents retain their existing English body text and Arabic-language notice. Their Arabic/default and `/ar/` wrappers become `noindex,follow`, canonicalizing to the actual English document. The English documents are self-canonical and are added to the sitemap. Neither variant declares hreflang or `x-default`: a notice and translated navigation are insufficient to claim that the English legal text is an Arabic translation. Legal content itself was not changed.

404 and contact-result pages remain `noindex,follow`; they have no translation alternates, JSON-LD or sitemap entries. Their canonical metadata describes the corresponding error/result route rather than arbitrary failing or status-query URLs. Five retired services remain noindex redirect-only entries. Archived demo routes remain absent and return 404.

## Compatibility and redirects

All 63 existing static `.html` entries are retained (21 files × default, `/ar/`, `/en/`). The three homepage directory URLs resolve through their `index.html` entries.

| Incoming request | Browser destination |
|---|---|
| `index.html`, `/ar/`, `/ar/index.html` | Default homepage slash URL |
| `/en/index.html` | `/en/` |
| `/ar/about.html` | `/about.html` |
| `/about.html?lang=en` | `/en/about.html` |
| `/en/about.html?lang=ar` | `/about.html` |
| `logo-design.html` | `brand-identity.html` in the selected language |
| `services-details.html`, `social-media-management.html`, `video-presentations.html`, `n8n-ai-automations.html` | `services.html` in the selected language |

`js/normalize-url.js` is copied into `legacy/normalize-url.js` and loaded early in generated content HTML. It uses `location.replace`; these are **client-side navigations**, not HTTP 301/308 responses. Alias HTML retains content and canonical metadata for non-JavaScript consumers. The unchanged legacy redirect handler first navigates to the preserved relative target, carrying queries/fragments; the destination then normalizes language/path. This can take two client navigations, with no loops in the tested matrix. Non-JavaScript legacy consumers retain a clickable destination link; there is no query-aware server redirect.

GitHub Pages is [static hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). This repository cannot configure query-aware server redirects. A query-only English request to an Arabic path therefore receives Arabic HTML at HTTP level before JavaScript navigation; social crawlers that do not run JavaScript must be given the clean `/en/` URL. This cannot be corrected with head metadata alone.

The host normalizes the bare project directory to its slash URL; local preview implements HTTP 301 for that case. No additional server redirects are claimed. Unknown deep paths retain HTTP 404 and error content. No SPA “redirect every 404 to home” workaround was added.

## Source of truth

`khatwa/src/content/pages.json` retains existing routes/content/robots and legal-language-gap flags. `services.json` and `socials.json` provide actual service and organization-profile facts. `khatwa/src/lib/metadata.js` defines canonical/indexability/alternate policy, social metadata and JSON-LD. The production builder and React runtime consume that shared module; sitemap and robots generation consume its route list/base URL. Existing body content and visual styles are unchanged.
