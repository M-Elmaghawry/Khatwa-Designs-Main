---
name: 02-implement-content
description: Implement the approved Khatwa Designs bilingual content in small, reviewable batches.
agent: agent
---

Read `.github/copilot-instructions.md` and `docs/Khatwa_Designs_Content_Master_AR_EN_v1.md`. Also read the latest audit/implementation plan from this chat, if available.

Implement the approved content in the EXISTING architecture. Start with the header/navigation/footer and homepage, then the five service pages, then About, Portfolio, Reviews, Contact, and metadata. If this is too large for one pass, complete only the first cohesive batch and report what remains; do not rush a risky one-shot rewrite.

Requirements:
- Preserve the visual identity and responsive layout.
- Use current translation architecture and make visible content bilingual across all implemented pages.
- Keep route paths stable; verify every navigation target.
- Feature selected real projects and only valid Behance links already in the project or explicitly confirmed by the owner.
- Use only the real recommendations in the content master. Mark the English renderings as translations where appropriate; do not create new quotes.
- Hide demo blog cards/links and remove fixed monthly pricing from visible sections without deleting source article files.
- Preserve working EmailJS identifiers, configuration, and form parameter names. Avoid changing the form logic unless genuinely necessary.
- Do not invent new images, links, metrics, company facts, service claims, or prices. If a required visual asset is missing, use an existing genuine asset or leave a clear TODO in the report.
- Make minimal diffs; do not introduce new framework/dependencies or reformat unrelated files.

After implementation, summarize changed files, bilingual coverage, any TODOs, and local checks. Do not deploy/push.
