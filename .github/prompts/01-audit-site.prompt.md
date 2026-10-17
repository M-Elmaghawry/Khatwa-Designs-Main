---
name: 01-audit-site
description: Audit the existing Khatwa Designs website before modifying files.
agent: ask
---

Read the repository-wide instructions in `.github/copilot-instructions.md` and the approved source of truth at `docs/Khatwa_Designs_Content_Master_AR_EN_v1.md`.

Audit the CURRENT repository, not an assumed architecture. Inspect `git status` and report any uncommitted work. Identify:
- Actual page files, assets, shared header/footer, navigation, and all current routes/links.
- How `?lang=ar` / `?lang=en` is parsed and how translations are applied, including whether body copy on every page is covered.
- Relevant HTML/CSS/JS and available build/test scripts.
- The existing EmailJS form flow, current field names/template parameter names, and the exact success/error handling. Never expose keys or secret values.
- Placeholder/demo imagery, template testimonials/team data, unverified metrics, pricing cards, blog/article links, and invalid navigation targets.
- SEO metadata and RTL/LTR behavior.

Do NOT edit the website, delete files, rename routes, deploy, or modify EmailJS. Return a prioritized audit and a file-by-file implementation plan. Distinguish verified findings from assumptions. If a task depends on a missing source URL, asset, EmailJS template, or other fact, call it out rather than inventing it.
