# Khatwa Designs technical SEO audit

Audit date: 21 November 2026, Asia/Riyadh. Scope: technical SEO, URL indexing, multilingual metadata, sitemap/robots, structured data and sharing metadata. The original audit below describes implementation before committing. A subsequent owner-authorized release-readiness review and local commit are recorded in [validation](TECHNICAL-SEO-VALIDATION.md).

## Baseline and release safety

The checkout started clean on `main`, at `f106fc05711d2bd7d057dc40b276726157139c1d`, matching the locally recorded `origin/main`. Fetch/push remote: `https://github.com/M-Elmaghawry/Khatwa-Designs-Main.git`. No existing user changes needed moving or overwriting. No fetch, merge, push, commit or deployment was performed.

Read the current README, deployment workflow, project audit, and historical `docs/RELEASE-SAFETY-AUDIT.md` / `docs/REACT-V2-BRANCH-STRATEGY.md` directly from `origin/redesign/react-v2`. Those historical documents describe an earlier release state; the current workflow already includes main-only job conditions, read-only build permissions and ref-specific concurrency.

`redesign/react-v2` points to `f3443be64f107c44bf592e53a836996213ab0109`, behind the current application cleanup. Reusing it would reintroduce obsolete structure. A separate local `seo/technical-audit` branch was created from the clean current main. Main was never edited or checked out for changes. `pre-react-v2` remains at its original peeled SHA `a831f3d456767b5c4116c3477f9f79726e296f51`.

The current source of truth is the React application in `khatwa/`, built by `.github/workflows/deploy-pages.yml` into `khatwa/dist` and published through GitHub Actions. The latest public successful [workflow run 44937238708](https://github.com/M-Elmaghawry/Khatwa-Designs-Main/actions/runs/44937238708) reports the same main SHA. Live route bodies all matched the pre-change local build, supporting that source identification. GitHub environment/protection settings and authenticated deployment-status APIs were not re-audited; a future release must recheck them.

Baseline build and 26 active React/compatibility tests passed. The old root HTML/Gulp application and its test files had already been removed before this task. To honor legacy validation, a read-only `git archive` of `pre-react-v2` was extracted under ignored `.local-backup/seo-legacy-check`. Its locked dependencies installed offline with scripts disabled, and its original 14 tests passed. No original backup/tag or production source was altered by that historical check.

## Confirmed findings and implemented fixes

| Finding | Evidence | Candidate correction |
|---|---|---|
| Canonicals and hreflang used `?lang=` even though clean HTML paths existed | Baseline generated heads and live responses | Query-free Arabic/default and `/en/` canonicals; path-based internal links |
| `/ar/`, index-file and query spellings duplicated content | 63 generated entries, three directory homes, 205 observed URLs | Retain all entries, canonicalize aliases, normalize browser requests with compatibility script |
| Query language could disagree with static response language | Live default `?lang=en` returned Arabic HTML | Clean English share/index URLs; client normalization for old incoming links; document static-host limitation |
| Saved language could change clean default URL content | `main.jsx` consulted localStorage for a default path | Path-determined language; preference still recorded when switching |
| English-only legal documents advertised Arabic translation equivalence | Existing `languageGap` flags and English legal bodies | Remove legal alternates; noindex Arabic wrappers; index the three English canonicals |
| Sitemap excluded all legal variants but their heads said indexable | Baseline sitemap: 22 URLs versus eligible English legal documents | Shared indexability source generates 25 canonical sitemap entries |
| No JSON-LD existed in baseline runtime/generated HTML | All inspected HTML blocks empty | Shared Organization, WebSite, eligible BreadcrumbList and five actual Service definitions |
| `summary_large_image` declared with no image; OG/Twitter image and alt missing | All baseline `socialImage` values null, generated/live heads | Existing approved logo URL, dimensions/alt, standard summary card; pending ideal artwork |
| Missing alternate OG locale and Twitter image metadata | Baseline/live head inventory | Complete language-specific sharing fields in generated HTML and runtime |
| Project robots file is below origin root | Project robots HTTP 200, origin `/robots.txt` HTTP 404 | Preserve permissive project file and correct sitemap reference; document external root/Search Console requirement |

No titles/descriptions or business copy were rewritten. Existing locale metadata values are reused. No new portfolio pages, artwork, styling, dependencies in the active application, or workflow changes were introduced.

## URL inventory and production comparison

The [readable inventory](TECHNICAL-SEO-URL-INVENTORY.md) and [generated JSON](TECHNICAL-SEO-URL-INVENTORY.json) cover every current route, all 63 HTML entries, homepage directory aliases, both `lang` query variants, five archived routes and an unknown deep path: **205 observations**. JSON includes final HTTP URL/status where measured, canonical/indexability, language/direction, title/description/robots, hreflang, OG, Twitter, JSON-LD, sitemap membership, redirect link and simulated browser destinations.

[Baseline JSON](TECHNICAL-SEO-URL-INVENTORY-BASELINE.json) records pre-change generated metadata. [Live JSON](TECHNICAL-SEO-URL-INVENTORY-LIVE.json) records the unchanged production site: **199 final HTTP 200 and six HTTP 404**, no request failures. Query strings were observed at HTTP level without executing JavaScript. Explicit `404.html` is a static file returning HTTP 200 with `noindex`; genuinely missing URLs returned 404.

All 205 live body hashes matched their pre-change local observations. The 45 redirect observations also matched full-document hashes. Full-document hashes differed for the 154 other HTTP-200 observations; the baseline metadata fields matched, but complete head/bundle bytes were not proven identical across the Linux deployment and Windows local build. This is recorded as a build-output difference, not a body/content difference. New SEO output intentionally changes metadata, internal href spelling and browser normalization and has not been deployed.

## Canonicals, hreflang and sitemap

The [canonical policy](TECHNICAL-SEO-CANONICAL-POLICY.md) defines exact rules and examples. The resulting count is **25 indexable canonicals: 11 Arabic + 14 English**. There are 11 reciprocal translated pairs and three English-only legal documents. Arabic is the intentional `x-default` for translated pairs only. Error, result, legacy redirects and Arabic legal wrappers have no hreflang.

The generated sitemap is strict-parser-valid XML with the sitemap namespace and XHTML alternate-link namespace. It has exactly 25 unique absolute query-free canonical locations; each resolves to real content on strict static preview. All 22 bilingual entries carry matching reciprocal annotations. The three English legal entries carry none. No archived, redirect-only, error or result URL is listed. No synthetic last-modification dates are added.

Generated robots is permissive and references the absolute project sitemap. No duplicate URLs are blocked. Crawlers discover robots at the [origin root](https://developers.google.com/search/docs/crawling-indexing/robots/intro); a repository subdirectory file is not an origin-wide crawl policy. The live root file returned 404, which does not establish a crawl block. Adding an effective root file requires the separate user-site repository or a custom-domain/root-hosting change. Submit the sitemap directly in Search Console after a release.

## Structured data

There is one managed `@graph` block per indexable generated content entry, updated/replaced on React navigation. The 25 canonical pages include consistent Organization and WebSite nodes with stable root IDs. The 23 canonical inner pages include BreadcrumbList; the 10 translated service-detail pages include Service. Canonical aliases may repeat the same graph IDs; they do not create competing organization identities. No JSON-LD is added to error/result/redirect or noindex Arabic legal wrappers.

Organization name, site URL, logo and five `sameAs` profiles come from the existing brand and social data. Service names/descriptions come from the actual five services and existing translated metadata. No address, rating, review, price, client list or FAQ was invented. JSON serialization escapes `<` for safe embedding.

Properties were reviewed against [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization), [BreadcrumbList requirements](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), and [Schema.org Service](https://schema.org/Service). Tests enforce the expected fields, parseability, IDs, positions and service applicability. These are local checks, not a claim of a hosted Rich Results Test or full vocabulary-validator certification. Service is schema.org markup; no Service-specific Google rich-result eligibility is promised.

## Social metadata and assets

Generated and runtime heads now share OG title/description/type/URL/image/alt/dimensions/locale and reciprocal alternate locale for translated indexable pages. Twitter has summary card/title/description/image/alt. OG URL equals canonical, and language-specific copy is preserved. Existing locale conventions remain `ar_EG` and `en_US`.

The selected existing `images/khatwa-logo.png` is a 63,941-byte PNG, **4167×1048**, aspect ratio approximately **3.98:1**; live production returned HTTP 200 and `image/png`. It is an approved brand logo, not an ideal social composition. The larger logo is 8334×2096; favicon is 417×417. No approved 1200×630 social graphic was found. No image was generated, cropped or fabricated. Standard `summary` avoids promising a composed large-image card; platform cropping/rendering of the wide logo remains to be previewed. A dedicated approved **1200×630 (1.905:1)** image remains an asset requirement. The sharing fields follow the [Open Graph protocol](https://ogp.me/).

Social crawlers receive metadata without JavaScript at clean canonical URLs. Old cross-language query links retain the static-path sharing limitation described in the canonical policy.

## Changed files

| Files | Purpose |
|---|---|
| `khatwa/src/lib/metadata.js` | Shared canonical/indexability, head fields and JSON-LD |
| `khatwa/scripts/build.mjs` | Shared prerendered heads, sitemap/robots policy |
| `khatwa/src/lib/paths.js` | Clean language-specific internal hrefs |
| `khatwa/src/i18n/LanguageProvider.jsx` | Stable path locale and clean language switching |
| `khatwa/src/main.jsx` | Prevent stored preference from overriding clean default URL |
| `khatwa/src/components/primitives.jsx` | Preserve homepage slash href around Router basename handling |
| `js/normalize-url.js`, `khatwa/vite.config.js` | Preserve old incoming language/index/Arabic aliases through early client normalization |
| `khatwa/tests/seo.test.mjs` | 15 automatic SEO regression tests |
| `khatwa/tests/foundation.test.mjs`, `hero.test.mjs`, `inner-pages.test.mjs`, `interactions.test.mjs` | Preserve existing checks with explicit expected SEO-link changes; metadata byte-lock replaced by semantic SEO checks |
| `khatwa/scripts/seo-inventory.mjs` | Reproducible generated/live URL inventory |
| `khatwa/scripts/seo-browser-audit.cjs` | Real-browser URL/metadata compatibility checks |
| `package.json` | `seo:test` and `seo:inventory` scripts |
| Four `docs/TECHNICAL-SEO-*.md` reports | Audit, complete URL inventory, canonical policy and validation |
| Three inventory JSON files | Baseline, live and candidate observations |

Generated `khatwa/dist` and ignored local legacy snapshot are review/test artifacts, not tracked release files. Existing content JSON, images, styles, contact integration, deployment workflow and `js/redirect.js` are unchanged.

## Release limits

See [validation](TECHNICAL-SEO-VALIDATION.md) for commands/results. The original implementation audit ended without a commit, push, merge, production deployment, main update, backup-tag movement or remote setting change. The owner subsequently authorized final verification and one local commit only. External post-release checks: Search Console canonical/indexing and sitemap submission; Rich Results Test/Schema.org validator; social-debugger preview/cache refresh; effective origin-level robots if needed; approved share artwork. Recheck live route/status behavior after any separately approved deployment.
