# React V2 branch and release strategy

## Ref contract

| Ref | Purpose | Rules |
| --- | --- | --- |
| `main` | Approved production source | Do not update in this task; no redesign commits, automatic merge, force-push or deployment |
| `pre-react-v2` | Annotated production backup | Exact peeled commit `a831f3d456767b5c4116c3477f9f79726e296f51`; never move or overwrite |
| `redesign/react-v2` | Isolated preparation and future redesign | Created from the verified baseline; all five planning documents live here |

At audit start only local main and remote origin/main were present. Neither requested ref existed in the explicit remote check. After clean-tree checks, the development branch was created and checked out and the annotated backup tag was created. Both refs were published without force; development tracks `origin/redesign/react-v2`. Remote main remained at the exact baseline, as did the peeled remote backup tag.

## Daily development

1. Read `git status --short --branch`, the current branch and upstream before editing. Work only on `redesign/react-v2` or a reviewed feature branch based on it. Never discard, stash, overwrite or reset another person's changes automatically.
2. Fetch and inspect before integrating new work. If a branch/tag already exists, inspect ancestry and contents instead of recreating it. Do not automatically rebase, merge or replace an existing development branch.
3. Commit only intended files. Keep preparation, later scaffolding, content migration and motion changes reviewable. No dependency installation or scaffolding is part of this preparation.
4. Use an explicit development refspec when pushing. Once the branch is published, set its upstream to `origin/redesign/react-v2`. Never use a blanket `--all`, `--tags`, mirror or force push.
5. Run local previews under `/Khatwa-Designs-Main/`. Do not connect development previews to the production Pages environment. A separate preview host/repository requires an independently reviewed setup.

## Production isolation

The inspected workflow automatically runs only on pushes to main, and `github-pages` permits only the main **branch**, with no allowed tags. Creating the development branch or backup tag therefore does not trigger the inspected workflow. Do not dispatch a real workflow to test this assertion.

The inherited workflow's manual-trigger/job-guard and shared-concurrency weaknesses are documented with the exact approved development-only change in `RELEASE-SAFETY-AUDIT.md`. Both development jobs now require main and an allowed push/manual event; Pages/OIDC write permissions are scoped to deploy, and concurrency is separated by ref. Existing environment restrictions were read and verified, not changed. Main retains its original workflow. The current environment is not a guarantee against later administrator configuration changes.

Never cherry-pick or merge the redesign to main during preparation. A future workflow hardening change on main is a separately approved production change because its push can trigger deployment even without content changes.

## Future release gates

- Complete the migration acceptance matrix and content/route preservation checklist, with Arabic default and complete English support.
- Re-read the main workflow and environment settings; require deploy-job main guard, minimal deployment permissions and the existing main-only environment policy before the later production release. The development-only guards are approved and applied; moving those changes onto main remains a separately approved action.
- Compare the entire main-to-release diff, including deleted files, workflows, lockfile, legal content, form integration and generated output. Legacy deletion requires separate approval.
- Verify local and remote backup tag peeled SHAs, and record current main and candidate release SHAs. If main advanced independently, audit the new baseline rather than silently moving the original tag.
- Present a concrete PR and validation evidence for owner review. Do not auto-merge, publish or claim approval from elapsed time.
- Only after final release approval may main change. Monitor the resulting authorized deployment and verify its exact SHA/URL. Use the reviewed rollback procedure if required.

## Completion record

Development upstream: `origin/redesign/react-v2`. Backup tag: published and verified; annotated object `07e7f5b062eb4bd6ef73f50fb205bb4b1aad3f97`, peeled baseline `a831f3d456767b5c4116c3477f9f79726e296f51`. The final preparation commit is identified by `git log -1 --format=fuller redesign/react-v2`; the baseline above is the creation/start SHA, not a claim that the documentation commit has the same SHA. See the release audit for the final publication and unchanged-production checks. Approval for development-only workflow hardening was received; main/settings/publication changes beyond this branch remain unapproved.
