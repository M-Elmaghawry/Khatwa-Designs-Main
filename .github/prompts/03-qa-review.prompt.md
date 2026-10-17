---
name: 03-qa-review
description: Review the Khatwa Designs changes for broken behavior and incomplete bilingual content.
agent: ask
---

Review the current changes against `.github/copilot-instructions.md` and `docs/Khatwa_Designs_Content_Master_AR_EN_v1.md`.

Do not make edits during the initial review. Check:
1. Every visible page has complete Arabic and English copy; switching `?lang=ar` / `?lang=en` changes the full page, not just the header.
2. Arabic direction is RTL and English is LTR without broken alignment or overflow.
3. Every header/footer/service/project/CTA link points to a real target.
4. The five approved services and their scopes are described accurately.
5. No fake team names, placeholder testimonials, unsupported statistics, fixed monthly prices, or demo blog cards remain visible.
6. Testimonials match the provided source; English translations are not represented as original English quotes.
7. EmailJS configuration and parameter names were not broken; success/error messages reflect actual outcomes.
8. Responsive behavior, alt text, titles/meta descriptions, console errors, and available build/test commands.

Return findings by severity with file paths and line references when available. Clearly separate issues verified by code from checks that require a browser/manual send or access to the live EmailJS template. Only after reporting, propose minimal fixes. Do not deploy or push.
