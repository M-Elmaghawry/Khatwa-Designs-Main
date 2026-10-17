# Khatwa Designs — GitHub Copilot Project Instructions

## Project purpose
This repository contains the existing public website for Khatwa Designs, a design and digital-services company headquartered in Mansoura, Egypt, serving construction companies and engineering firms in Egypt and Saudi Arabia.

## Read the source of truth first
Before editing website content or code, read:
- `docs/Khatwa_Designs_Content_Master_AR_EN_v1.md`

This master document records the approved positioning, service scope, Arabic and English copy, navigation decisions, testimonials, and implementation cautions. Treat it as the primary content brief. If the repository's actual structure differs from that document, do not invent files or routes: inspect the repository and adapt safely.

## Non-negotiable constraints
1. Preserve the existing visual identity, logo, colors, typography, layout, spacing, animations, and responsive behavior. Do not redesign the website unless explicitly asked.
2. Keep the current stack and build process. Inspect the repository before changing anything. Do not migrate to React, Next.js, Tailwind, a CMS, or another framework as part of a content update.
3. Do not rewrite whole files when a focused change is sufficient. Keep changes small and maintainable.
4. Do not deploy, publish, push, force-push, delete branches, or change GitHub Pages settings. The owner reviews and publishes changes manually.
5. Before modifying files, inspect the repository structure and `git status`. Never overwrite or discard existing user work.
6. Do not make up company facts, project scopes, performance metrics, customer ratings, awards, client quotes, dates, or claims. Use only evidence from the codebase and the content master. Mark unknowns clearly rather than filling them with guesses.

## Approved business positioning
- Company: Khatwa Designs | خطوة للتصميمات.
- Founded in 2021; headquarters in Mansoura, Egypt.
- Core markets: Egypt and Saudi Arabia.
- Primary audience: construction companies, contracting companies, and engineering consultancies.
- Positioning: a creative partner that understands the engineering industry and can bring content organization, writing/editing, design, and website delivery together.
- Do not mention the size or permanent/contract status of the team in public copy.

## Approved services and scope
1. Company profiles and engineering portfolios: organize information, develop/edit copy based on client-provided documents, design and prepare final deliverables.
2. Presentations, tender documents and technical/commercial proposals: organize and edit content based on client-provided documents, then design and deliver. Do not imply Khatwa certifies or independently verifies technical/tender information; the client approves technical and commercial facts.
3. Website design and development: plan pages, organize/write website content based on client input, design/develop, prepare launch, and assist with domain connection within the agreed scope. Post-launch maintenance/updates are optional by separate agreement.
4. Logo design and visual identity: logo, colors, typography, brand guidelines, and selected stationery/business-card applications as requested.
5. Social media design only: design posts using copy/images supplied by the client. Do not claim social media account management, copywriting/caption writing, scheduling, publishing, or inbox moderation as included services.

Promotion priorities: company profiles first, presentations/tenders second, website design/development third. Present the other two services without giving them equal top-level prominence.

## Arabic/English requirements
- Keep the current language-switching system and URL conventions after inspecting how they work (including any `?lang=ar` or `?lang=en` behavior).
- Ensure user-facing content is complete in both Arabic and English; never translate by merely switching the menu while leaving English body copy on Arabic pages.
- Arabic must render with appropriate RTL direction and alignment without breaking the existing layout. English should remain LTR.
- Use the repository's existing translation architecture (for example, `khatwa-i18n.js` if present). Do not invent a second translation system or rename keys without updating all call sites.
- Use consistent labels: `اطلب عرض سعر` / `Request a Quote`; `استكشف أعمالنا` / `Explore Our Work`.

## Content and portfolio rules
- Use `docs/Khatwa_Designs_Content_Master_AR_EN_v1.md` as the content source of truth. The wording may be adapted minimally to fit components, but preserve meaning and service boundaries.
- Feature selected portfolio projects and link to their relevant Behance project detail pages when a valid URL is available. Do not invent Behance URLs.
- The owner has confirmed the published Behance project images, client names, and logos may be reused on the website, subject to using actual project assets and valid project references.
- Use customer recommendations from the source document only. Keep Arabic quotations faithful to the source. If showing an English translation, it is a translation, not an original English quote. Recommendations in the provided material date to 2021; do not label them as recent or imply that all clients are current.
- Replace template/demo testimonials, team names, company names, ratings, counters, and statistics unless independently verified and approved.
- Hide the current blog/article cards and links from the homepage/navigation temporarily, but do not delete article files until searching for inbound links and documenting the impact.
- Remove current fixed monthly subscription pricing from visible marketing sections. The approved conversion path is a project-specific quote request; do not invent prices or price ranges.
- Ensure every visible CTA has a meaningful valid destination.

## EmailJS and form safety
- The owner has confirmed the existing EmailJS form is already connected and receiving emails.
- Preserve current EmailJS service/template identifiers, initialization, recipient behavior, template parameter names, and secret handling. Do not expose keys, replace IDs, or switch providers.
- Do not modify form submission logic unless required for the requested copy/UX task. If changing any form field, inspect the EmailJS template parameters and existing handler first; keep parameter names compatible or explicitly document what must be updated in EmailJS.
- Success messages must only be displayed after an actual successful send; failures should display an error state. Do not claim delivery unless the existing response indicates success.
- Never commit secrets or credentials. Avoid printing them in logs or reports.

## Coding and accessibility
- Follow existing HTML/CSS/JavaScript conventions and file naming.
- Use semantic HTML, meaningful image alt text, accessible labels, keyboard focus, and adequate contrast consistent with the current design.
- Preserve mobile behavior. Do not use external placeholder-image services for final portfolio imagery.
- Update page titles and meta descriptions for relevant pages without keyword stuffing.
- Keep navigation paths stable. Before removing or renaming a page, search all references, including header, footer, internal links, JavaScript route/link data, and repository configuration.

## Required workflow for changes
1. Inspect repository files, `git status`, language/i18n logic, shared header/footer, CSS, and EmailJS form code.
2. Produce a concise audit and a file-by-file implementation plan before making site changes. If the request explicitly asks for implementation and the scope is clear, proceed after sharing the plan in the response; do not pause for approval for every trivial edit.
3. Implement in small batches: navigation and homepage; service pages; about/portfolio/reviews; contact/form copy; metadata/SEO.
4. Run the available local checks/build scripts. If there is no test framework, manually validate links, browser console, language switching, RTL/LTR, and responsive behavior.
5. Report changed files, important decisions, checks performed, any remaining blockers, and how to preview locally. Never claim a test passed unless it was actually run.
