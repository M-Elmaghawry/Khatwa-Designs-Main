# Production baseline before React V2

Recorded: 8 November 2026 (Asia/Riyadh).

## Immutable source reference

Production baseline commit: **`a831f3d456767b5c4116c3477f9f79726e296f51`**.

Commit subject: `Merge GitHub updates and preserve bilingual contact and project improvements`.

Local `main`, fetched `origin/main`, initial HEAD and explicit remote `refs/heads/main` all matched this SHA. The working tree was initially clean. The repository is `M-Elmaghawry/Khatwa-Designs-Main`; fetch and push URL is `https://github.com/M-Elmaghawry/Khatwa-Designs-Main.git`.

Production uses GitHub Actions, confirmed by authenticated Pages `build_type: workflow`. The source metadata says main/root, but the files actually published come from the `_site` artifact. The only active workflow is `.github/workflows/deploy-pages.yml` (ID `256110517`). Its baseline blob is `main:.github/workflows/deploy-pages.yml` at the SHA above.

Successful [workflow run 42416681879](https://github.com/M-Elmaghawry/Khatwa-Designs-Main/actions/runs/42416681879) ran on a push to main at that SHA. Deployment `7627396483` reports the same SHA/ref and successful destination `https://m-elmaghawry.github.io/Khatwa-Designs-Main/`, completed 8 November 2026 at 00:37:16 +03:00 (7 November 21:37:16 UTC).

No custom domain is configured (`cname: null`); HTTPS is enforced. This is a project site under `/Khatwa-Designs-Main/`.

## Backup tag

`pre-react-v2` was absent locally and remotely before creation. An annotated tag was created pointing to the baseline above, with annotation identifying the verified deployment and workflow run. Never recreate, retarget or force-push this tag. An annotated tag has its own object SHA; compare its **peeled commit** (`^{commit}` / remote `^{}`), not its tag object SHA, to the production baseline.

Publication status: local and remote annotated tag verified. Tag object SHA: `07e7f5b062eb4bd6ef73f50fb205bb4b1aad3f97`; peeled commit SHA: `a831f3d456767b5c4116c3477f9f79726e296f51`. It was published without force, together with the newly created development branch, after rechecking remote main and confirming both requested refs remained absent.

```powershell
git cat-file -t refs/tags/pre-react-v2
git rev-parse 'pre-react-v2^{commit}'
git ls-remote --tags origin refs/tags/pre-react-v2 'refs/tags/pre-react-v2^{}'
git rev-parse main origin/main
```

Expected type is `tag`; the peeled commit and both main refs must be the baseline SHA. A normal explicit tag push is authorized by this task after remote, permissions, source and absence checks; no force operation is authorized.

## Legacy runtime and deploy output

- HTML/CSS/JavaScript, Gulp/Sass/BrowserSync; current package name `crafto`, version `3.0.0`. React, Vite and React Router are not installed or implemented by this preparation.
- Node 22 in CI; dependency versions are locked by `package-lock.json`.
- `npm run build` regenerates assets; `npm test` checks forms, translations, static artifact references, redirects, minified parity, service scope and navigation; `npm run prepare:site` assembles `_site`.
- `scripts/prepare-site.js` copies root HTML with five exclusions and five replacement redirect pages, images/fonts/projects, SEO files, selected CSS/JS, `.nojekyll` and a generated-output marker. PHP is not published and cannot run on Pages.
- Content authority: `docs/Khatwa_Designs_Content_Master_AR_EN_v1.md`; actual runtime text and route inventory: `CONTENT-AND-ROUTES-INVENTORY.md`.
- Keep all legacy files, source assets and previous review evidence available through the tag. Preserve license notices; permission for visual redesign does not revoke third-party asset licenses.

## Rollback procedure — documentation only

Before React V2 is approved, there is no production change to roll back. Stop local V2 work while leaving main and the public website untouched. If a V2 checkout is needed separately, use an additional clean worktree; do not reset or delete user changes.

After a future approved production release, rollback requires its own owner approval:

1. Re-read Pages/environment settings and record current main, active successful deployment and failed release SHA. Preserve the backup tag.
2. Prepare a reviewed PR reverting the identified release commit(s) onto the then-current main. For a merge commit, review the correct parent before selecting any revert operation; do not blindly revert the historical baseline merge.
3. Restore baseline site behavior/assets with the reviewed revert while retaining any subsequently approved safety guards and necessary security fixes. Do not force-push or move main backward.
4. Build/test in an isolated checkout. After explicit approval, merge and allow the authorized main workflow to publish; verify the successful deployment SHA, destination, old routes, both locales and forms using mocks or a separately authorized send.
5. A source tag alone does not guarantee an identical historical artifact: dependency registry availability and CI environment can change. The production artifact comes from the successful baseline run; verify its availability before relying on artifact restoration.

## End-of-task validation

After initial ref publication, the read-only recheck at 8 November 2026 14:26:03 +03:00 confirmed unchanged Pages workflow mode, URL, custom domain absence, main-only environment policy and latest successful workflow run `42416681879`. Public homepage returned HTTP 200, Last-Modified `Sat, 07 Nov 2026 21:37:10 GMT`, and matched the unchanged baseline `index.html` after CRLF-to-LF normalization. Normalized UTF-8 SHA-256: `50feaa4ebab1d490c9a0240e720de0910c30c1fbb9e0ad8e8d3a10a0d4a5e80d`.

All 14 existing tests passed using installed dependencies; no packages were installed, no tracked production build output was rewritten, and no real form submission or workflow dispatch was used. Final post-documentation-publication verification is recorded in the release audit.
