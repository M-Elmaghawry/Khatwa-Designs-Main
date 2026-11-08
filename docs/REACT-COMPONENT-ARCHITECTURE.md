# Phase 2 React component architecture

Implemented on `redesign/react-v2`, starting at preparation commit `e4c2d2d981976fd3f791e3f9cc4a5c157a7a383f`. Production main remains `a831f3d456767b5c4116c3477f9f79726e296f51`. This package is local-only; no deployment integration was changed.

## Package boundary

`react-v2/` is a private, independently locked npm package. Root Gulp commands, dependency versions, `package-lock.json`, HTML, legacy JavaScript/CSS, images, fonts and projects remain intact. Root `package.json` only adds `react:dev`, `react:build`, `react:preview` and `react:test` commands. Build output goes to ignored `react-v2/dist/`; SSR tooling goes to ignored `react-v2/.ssr/`.

```text
react-v2/
  index.html / vite.config.js / package.json / package-lock.json
  scripts/
    extract-content.mjs   # deterministic source-to-data extraction and drift checks
    build.mjs             # Vite client + SSR build, then per-route static snapshots
    serve.mjs             # strict project-base static preview, real 404 responses
  src/
    App.jsx / main.jsx / entry-server.jsx
    components/
      AppLayout.jsx / Header.jsx / Navigation.jsx / LanguageSwitcher.jsx
      Footer.jsx / ContentRenderer.jsx / ContactForm.jsx / primitives.jsx
    pages/
      ContentPages.jsx / ResultPage.jsx / NotFoundPage.jsx / LegacyRedirectPage.jsx
    content/
      ar.json / en.json / pages.json / archive.json / manifest.json
      projects.json / reviews.json / services.json / form.json / socials.json
    i18n/LanguageProvider.jsx
    lib/paths.js / metadata.js / inquiry.js
    motion/useGsap.js
    styles/tokens.css / foundation.css
  tests/foundation.test.mjs / interactions.test.mjs
```

## Rendering and routing

`App` owns React Router route definitions. `AppLayout` provides the skip link, shared header/footer, focus/fragment management, route metadata and a stable main landmark. Named page components select the existing content by route. The five service pages share `ServicePage`; legal pages share `LegalPage`. `ContentRenderer` renders structured semantic nodes as React elements, translates existing keys and uses React Router links. It does not inject HTML or run legacy template scripts.

`Container`, `SectionWrapper`, `Button` and `SiteLink` centralize presentation and base-aware links. `PageTransitionWrapper` is a scoped motion boundary with no entrance/parallax effects. Navigation uses an accessible mobile disclosure and native service disclosure; portfolio filtering is React state, not a jQuery plugin.

There are 16 original content/error routes and five legacy redirects. The five pre-existing excluded pages are absent from route definitions and generated public output; their source/data are retained. `archive.json` is not imported into the client application. All original `.html` paths and query-language links remain supported.

Vite and BrowserRouter use `/Khatwa-Designs-Main/`. The build prerenders actual `.html` entry files at original paths, plus `ar/` and `en/` variants, including locale `index.html` files. Deep entry/refresh therefore needs no Pages rewrite. Unknown paths use the generated `404.html`; a nested unknown URL still receives absolute, project-base asset URLs and React's Not Found route. Hash routing is not used.

## Localization and SEO

`LanguageProvider` supplies `language`, `dir`, `t()` and `setLanguage()`. Explicit supported `?lang=` wins, then a locale path; otherwise client initialization reads a valid stored `khatwa_lang`, then defaults to Arabic. Reading the stored preference is authorized by the Phase 2 persistence requirement and extends the older baseline's write-only initialization. Storage denial does not break the site. Language changes preserve other query parameters and fragments. Arabic/English document direction, metadata and links update together.

Static original entry files are Arabic by default; `/en/` entries contain real English prerendered content and metadata. Legacy `about.html?lang=en` remains functional with JavaScript. Static hosts cannot vary an HTML response by query string, so that legacy English query initially receives Arabic static HTML; runtime switches to English and uses the English static canonical. Use `/en/about.html?lang=en` when a server-delivered English document is needed. This limitation is explicit rather than hidden behind a 404 redirect.

Both 394-key catalogs exactly preserve the existing verified values. Titles/descriptions, canonical/hreflang/x-default, Open Graph and Twitter tags are generated and updated by `metadataFor`/`applyMetadata`. Additional presentation labels identify existing language gaps without inventing business content. Three legal bodies remain original English and are marked `lang=en`, `dir=ltr`, with an Arabic availability notice; approved Arabic legal copy is still needed.

## Contact integration

`ContactForm` renders field definitions extracted from the actual form. `inquiry.js` isolates transport, exact six named EmailJS parameters, timeout/abort and session retry storage. The existing public `js/khatwa-emailjs-config.js` is served/copied byte-for-byte and loaded before the app; identifiers, recipient configuration and provider remain unchanged. No values are duplicated in the new source or documentation.

Validation, first-invalid focus, disabled pending state and a synchronous pending ref prevent duplicate sends. Only HTTP 200 enters success. Failures enter localized error results, and the retry link restores the session draft for 30 minutes. Storage is optional. Unmount aborts the pending request; BFCache recovery resets busy state. No inquiry contents enter a URL. Automated tests mock transport; no real email was sent.

## Brand and motion

Tokens preserve original blue `#1C3664`, yellow `#FFCD05`, gray `#CCCCCB`, supporting gray `#626879`, logos and font families. Spacing, typography, surfaces, radii, shadows, gradients and breakpoint references are centralized in `tokens.css`. `foundation.css` adds only the minimal responsive shell/content/form presentation; Crafto layout classes are not imported as a dependency.

`loadGsap()` registers bundled ScrollTrigger once on the client through dynamic imports. `useGsap()` scopes work with `gsap.context`, reverts on cleanup and reduced-motion changes, and prevents stale asynchronous registration from attaching after unmount. The scaffold loads no animation when reduced motion is requested; no cinematic effects are implemented. Phase 3 can provide a setup callback and explicit route/locale dependencies.

## Maintenance

After an approved legacy-content correction, review the diff, run `npm --prefix react-v2 run content:sync`, then build/tests. `content:check` fails on drift rather than silently replacing manually migrated copy. Generated content carries source fingerprints and source-provenance references. Keep future bespoke page designs separate from the preserved source data and retain archived source until an independently approved deletion.
