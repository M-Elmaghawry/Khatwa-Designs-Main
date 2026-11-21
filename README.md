# Khatwa Designs

The final React website in khatwa/ is the only application. GitHub Pages and local commands use it. The previous HTML/Gulp website has been removed.

## Install

Use Node.js 24.15 or newer (supported engines are listed in khatwa/package.json).

```powershell
npm.cmd ci
npm.cmd ci --prefix khatwa
```

## Run locally

```powershell
npm.cmd start
```

Open http://127.0.0.1:5173/Khatwa-Designs-Main/ . The site must run through the server; opening an HTML file directly or using Live Server is not the React development workflow. `npm run dev` starts the same application.

## Build and verify

```powershell
npm.cmd run build
npm.cmd test
npm.cmd run preview
```

Production preview: http://127.0.0.1:4173/Khatwa-Designs-Main/ . Generated deployable files are in khatwa/dist/. Build before running tests: route and rendering checks inspect prerendered output.

GitHub Pages builds and tests this application on pushes to main. The react:* commands remain aliases for existing tooling.

## Source files

- khatwa/src/: final components, styles, routes and form integration.
- khatwa/src/content/: authoritative Arabic/English catalogs, pages, projects, services, reviews and form data. Edit these JSON files directly, then run `npm run content:check`.
- images/: the current logo and favicon.
- projects/: the 23 real project covers (WebP).
- docs/brand-assets/: original customer logos and design reference retained outside the published output.
- js/khatwa-emailjs-config.js: public EmailJS configuration used by the contact form.
- js/redirect.js: handler preserving old service links, query parameters and fragments.
- docs/: approved content master, EmailJS setup, motion reference, original brand assets and the current audit report.

The content manifest records company details, excluded routes and legacy service redirects. The final site no longer reads retired HTML or translation scripts. Those sources remain available in Git history.

Run `npm run audit:files` to check for unused application modules, missing assets and orphan public files. The audit summary is in docs/PROJECT-AUDIT-2026-11-21.md.

To change a project image, update its image field in projects.json and keep matching image references in pages.json in sync. The homepage and galleries resolve project identity by titleKey, independently of the image filename. When changing a titleKey, update projects.json, pages.json, ar.json and en.json together.

The pre-existing local modification to js/min/khatwa-i18n.js was copied to the ignored .local-backup/khatwa-i18n.min.js before removal. Private local configuration was retained. The empty photo-name.txt file was removed during the audit.
