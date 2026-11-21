# Technical SEO validation

Date: 21 November 2026, Asia/Riyadh. Branch: `seo/technical-audit`. The original implementation was left uncommitted. The owner subsequently authorized final verification and one local commit with message `fix(seo): normalize multilingual metadata and indexing`. No remote release is authorized.

## Final release-readiness review

The production build, all 41 active tests (26 existing React/compatibility plus 15 SEO), the focused 15-test SEO command, all 14 archived legacy tests, file audit, content integrity and whitespace checks were rerun successfully. An independent checker outside the application's metadata module inspected every one of the 63 generated HTML entries against an explicit expected route list. It confirmed 25 unique sitemap canonicals (11 Arabic, 14 English), 11 reciprocal translation pairs, three English-only legal documents, noindex exclusions, schema identity against the existing company/social files, and real PNG social assets. No application implementation changes were needed during this final review.

The SEO browser audit was repeated: **44 checks, zero failures, zero page exceptions**. The existing broader browser audit also passed **64 cases** (16 pages × two languages × widths 390/1440), with one h1 per page, correct direction, no horizontal overflow, no broken images, no failed local responses and no page exceptions. Mobile navigation and the services dropdown opened correctly; the website portfolio filter returned five projects. Desktop/mobile screenshots were inspected. Existing source/content snapshot tests and unchanged styles provide the regression baseline; this does not claim a complete accessibility certification or pixel-by-pixel visual diff. Form tests passed using mocked transport; no real inquiry was sent.

Safety review found **12 modified files, 11 new files and no deletions**. The explicit commit scope below contains no deployable build output, dependencies, local backup/browser artifacts, environment files or lockfile changes. The three JSON inventories are the intentionally requested audit evidence. High-confidence credential-pattern checks found no private keys or GitHub/AWS/OpenAI/Google API tokens; manual diff review found no credentials or unrelated changes. Company content, styling, contact integration and deployment configuration are unchanged.

Protected refs remain `main = f106fc05711d2bd7d057dc40b276726157139c1d` and `pre-react-v2^{}` = `a831f3d456767b5c4116c3477f9f79726e296f51`. There are no blocking implementation findings. The branch is ready for a separately approved controlled production release, subject to the documented hosting/asset limits and post-release verification below. Only the requested local commit is authorized by this review. Retrieve its final SHA with `git log -1 --format="%H %s" seo/technical-audit`.

Exact reviewed commit file list (23):

```text
docs/TECHNICAL-SEO-AUDIT.md
docs/TECHNICAL-SEO-CANONICAL-POLICY.md
docs/TECHNICAL-SEO-URL-INVENTORY-BASELINE.json
docs/TECHNICAL-SEO-URL-INVENTORY-LIVE.json
docs/TECHNICAL-SEO-URL-INVENTORY.json
docs/TECHNICAL-SEO-URL-INVENTORY.md
docs/TECHNICAL-SEO-VALIDATION.md
js/normalize-url.js
khatwa/scripts/build.mjs
khatwa/scripts/seo-browser-audit.cjs
khatwa/scripts/seo-inventory.mjs
khatwa/src/components/primitives.jsx
khatwa/src/i18n/LanguageProvider.jsx
khatwa/src/lib/metadata.js
khatwa/src/lib/paths.js
khatwa/src/main.jsx
khatwa/tests/foundation.test.mjs
khatwa/tests/hero.test.mjs
khatwa/tests/inner-pages.test.mjs
khatwa/tests/interactions.test.mjs
khatwa/tests/seo.test.mjs
khatwa/vite.config.js
package.json
```

## Results

| Check | Result |
|---|---|
| Pre-change Vite client/SSR/prerender build | Passed; 21 route files × three prefixes |
| Pre-change active tests | 26 passed, zero failures/skips |
| Original archived legacy suite | 14 passed, zero failures/skips, from exact `pre-react-v2` snapshot |
| Final Vite production build | Passed; all 63 static HTML entries retained |
| React/compatibility and SEO suite | 41 passed: 26 existing checks plus 15 SEO checks |
| Canonical count | 25 unique self-canonical indexable pages: 11 ar, 14 en |
| Hreflang | All 11 bilingual pairs reciprocal; Arabic x-default intentional; no legal/error/result alternates |
| Sitemap XML and route integrity | Strict XML parse passed; 25 locations exactly match canonical route set and resolve to content |
| Social asset | Existing PNG, 4167×1048; correct absolute URL; local and live HTTP 200 |
| JSON-LD | Parses; expected fields/types, breadcrumb positions, consistent organization IDs and applicable services passed |
| Generated/runtime metadata parity | Passed across all 48 content entries and reverse transitions; stale schema/alternates removed |
| Strict static deep links | All 63 entries, all canonicals and directory homes return 200; unknown deep path returns 404 |
| Compatibility script matrix | 264 incoming combinations; language, non-language queries and fragments retained, no loops |
| Real Chromium browser audit | 44 checks, zero failures, zero page exceptions |
| URL inventory | 205 generated observations, zero inspection errors; baseline/live observations also 205 each |
| Live crawl | 199 final HTTP 200; six HTTP 404; zero network failures |
| File/asset audit | Passed: 45 app files, 26 public assets, no orphan modules/missing assets |
| Whitespace check | `git diff --check` passed |
| Release refs | Main and backup tag unchanged; final review authorizes one local SEO-branch commit, with no deployment/push/merge |

The browser audit covers the 25 sitemap canonicals, six old language queries, ten retired-service/language combinations, two `/ar/index.html` variants and a stored-English preference check at the Arabic root. External requests were deliberately blocked and no form was submitted. Browser console resource errors for the blocked Google Fonts URL are expected; the audit returned `errors: []` for JavaScript page exceptions. This is SEO behavior QA, not visual/CWV certification.

The 15 SEO regression tests cover all requested categories: unique canonicals, reciprocal languages, x-default, XML and sitemap equality, query duplicates, exclusions, legacy link availability, actual compatibility-script loops, generated/runtime parity, JSON-LD fields, OG/canonical agreement, real social asset/dimensions, HTML lang/dir, duplicate tags and accidental noindex prevention. Test 7 also serves the production output through the strict static server; test 8 executes the real JavaScript compatibility handlers, and the browser audit verifies their behavior in Chromium.

Existing tests were retained. Their URL-specific expectations were updated for query-free internal links and deliberate alternate exclusions. The historical homepage hash comparison restores only old href spelling before comparing the original hash, preserving its content/layout protection. The old metadata byte-for-byte lock was removed from the historical-source test because metadata is this task's authorized change; semantic metadata parity and regression tests now cover it. Existing form, content, portfolio, motion and deployment isolation tests remain active.

## Independent commands

Run from repository root with the already installed dependencies:

```powershell
git status --short --branch
git branch --show-current
git rev-parse main 'pre-react-v2^{}'
npm.cmd run build
npm.cmd test
npm.cmd run seo:test
npm.cmd run audit:files
npm.cmd run content:check
npm.cmd run seo:inventory
git diff --check
```

`npm test` already includes the SEO suite; `seo:test` is the focused alternative. Build first because tests inspect the generated client/SSR HTML. No package installation or lockfile change is needed for the candidate changes. The inventory generator inspects real output; rerun it after metadata/build changes.

A read-only live recrawl (network access required) updates the live evidence JSON without publishing anything:

```powershell
node khatwa/scripts/seo-inventory.mjs --live
```

Do not rerun `--baseline` after edits and overwrite the recorded pre-change evidence. The current live file describes production before these local SEO changes, not a deployment of them.

For real browser checks, start preview in one terminal:

```powershell
npm.cmd run preview
```

Then use the same Playwright CLI workflow used in this audit:

```powershell
npm.cmd exec --yes --package=@playwright/cli -- playwright-cli -s=khatwa-seo open http://127.0.0.1:4173/Khatwa-Designs-Main/
npm.cmd exec --yes --package=@playwright/cli -- playwright-cli -s=khatwa-seo run-code --filename=khatwa/scripts/seo-browser-audit.cjs
npm.cmd exec --yes --package=@playwright/cli -- playwright-cli -s=khatwa-seo close
```

CLI availability/browser launch can require environment approval. It was run through the [playwright-cli skill](C:/Users/pc/.agents/skills/playwright-cli/SKILL.md); no active-project dependency was added.

The archived legacy suite can be repeated using the already prepared ignored snapshot:

```powershell
npm.cmd --prefix .local-backup/seo-legacy-check test
```

To reconstruct independently, use a new, unused local directory. Do not replace any existing backup:

```powershell
New-Item -ItemType Directory -Path .local-backup/seo-legacy-independent -ErrorAction Stop
git archive --format=tar --output=.local-backup/seo-legacy-independent.tar pre-react-v2
tar -xf .local-backup/seo-legacy-independent.tar -C .local-backup/seo-legacy-independent
npm.cmd ci --prefix .local-backup/seo-legacy-independent --ignore-scripts --no-audit --no-fund --offline
npm.cmd --prefix .local-backup/seo-legacy-independent test
```

Offline install succeeded in this audit using the local package cache. A different machine may need network access to obtain that archived lockfile's dependencies. This validates the historical application in isolation; the current application's legacy-route compatibility is checked separately by the active tests.

## Limits and checks after a separately approved release

The host used Node 24.14.0, below this application's declared supported Node 24 minimum (24.15.0). All checks passed, but use an engine-supported version for independent/CI reproduction; this task did not alter the machine's Node installation.

Schema property checks were compared with official Google/Schema.org definitions and verified locally; no hosted Schema.org or Rich Results Test result was obtained. These tests do not prove that Google will display rich results or choose the requested canonical.

After a separately approved deployment, inspect live source for a home page, service detail, English legal page and error page. Re-crawl all URLs, inspect Search Console indexing/canonical selection, submit the sitemap and use Rich Results Test / Schema.org validator. Check Facebook/Open Graph and X previews at clean canonical URLs, refresh caches if necessary and review cropping. Supply an approved 1200×630 image before expecting a composed large share card. Old query-only English links cannot serve English HTML to non-JavaScript social crawlers on this host.

Origin-root robots remains an external hosting concern. The project robots file is permissive and correct locally but does not control origin-wide crawling. No Search Console submission, external profile edits, production workflow dispatch, deployment, push, merge or tag update was performed. The final review authorizes only the requested local SEO-branch commit.
