# React V2 release safety audit

Audit date: 8 November 2026 (Asia/Riyadh). Scope: preparation and documentation only; no React implementation, dependency installation, production deployment, or update to `main`.

## Repository and production evidence

| Check | Verified result |
| --- | --- |
| Initial checkout | `main`, clean tracked and untracked working tree |
| Initial HEAD / local main / fetched origin/main | `a831f3d456767b5c4116c3477f9f79726e296f51` |
| Upstream | `main` tracks `origin/main` |
| Fetch and push remote | `https://github.com/M-Elmaghawry/Khatwa-Designs-Main.git` |
| Remote refresh | `git fetch origin` succeeded without changing working files |
| Repository API | Default branch `main`; authenticated credential has pull, push, maintain and admin permissions |
| Pages API | `build_type: workflow`; URL `https://m-elmaghawry.github.io/Khatwa-Designs-Main/`; HTTPS enforced; `cname: null` |
| Pages source metadata | `main`, `/`; deployment mode is **GitHub Actions**, not Deploy from a branch |
| Active workflow | Only `.github/workflows/deploy-pages.yml`, workflow ID `256110517` |
| Latest successful run | [42416681879](https://github.com/M-Elmaghawry/Khatwa-Designs-Main/actions/runs/42416681879), `push`, `main`, baseline SHA |
| Latest production deployment | `7627396483`, baseline SHA, ref `main`, success at 8 November 2026 00:37:16 +03:00 |
| Deployment destination | Status API explicitly reports the official Pages URL above |
| Environment | Only `github-pages`; custom branch policies enabled |
| Allowed deployment refs | Exactly one policy, ID `46299232`, name `main`, type `branch`; no tag policies |
| Other environment protections | Only branch policy returned; no required reviewers or wait timer; `can_admins_bypass: true` |
| Main branch protections | Authenticated protection endpoint returned HTTP 404; rulesets endpoint returned an empty list. No branch protection demonstrated |
| Custom domain in repository | No tracked `CNAME`; artifact preparation does not publish a CNAME |

Evidence was obtained using read-only authenticated GitHub REST GET requests to `/repos/M-Elmaghawry/Khatwa-Designs-Main`, `/pages`, `/actions/workflows`, `/actions/runs`, `/deployments`, deployment statuses, `/environments/github-pages`, its `/deployment-branch-policies`, `/branches/main/protection`, and `/rulesets`. The unauthenticated Pages request returned 404; it was **not** treated as evidence that Pages was absent. GitHub CLI is unavailable; the existing Git credential helper supplied authentication without printing or persisting credentials.

## Workflow findings

The baseline workflow builds with Node 22, `npm ci`, build, regression checks, and `prepare:site`; it uploads `_site` with `actions/upload-pages-artifact@v3`, then uses `actions/deploy-pages@v4` in the `github-pages` environment.

- Automatic trigger: `push.branches: [main]`. There is no tag push, PR, schedule, workflow-call, repository-dispatch, workflow-run or other deployment trigger in the only tracked workflow or active workflow listing.
- Manual trigger: unrestricted `workflow_dispatch`. Neither build nor deploy currently has a job-level branch condition. The verified environment policy blocks a deployment job from `redesign/react-v2`, including a manual run, **provided the inspected workflow and environment policy remain intact**.
- Permissions: `contents: read`, `pages: write` and `id-token: write` are currently workflow-wide. The build job unnecessarily receives deployment permissions.
- Concurrency: the shared `pages` group with `cancel-in-progress: true` allows a manually dispatched development run to cancel a production run before environment protection is evaluated.
- No gh-pages deployment action, publishing command, or `gh-pages` branch was found in the inspected workflow/ref inventory.
- Trusted administrators retain the ability to alter configuration; these checks do not establish an immutable security boundary against privileged changes.

## Approved workflow hardening — development branch only

The owner explicitly approved this exact patch on `redesign/react-v2` only during the audit. It has been applied to that branch. No settings API mutation was made; the existing build steps, artifact, deploy action and environment remain intact. The preceding findings describe the baseline/main workflow, not the hardened development copy.

```diff
 permissions:
   contents: read
-  pages: write
-  id-token: write

 concurrency:
-  group: pages
+  group: ${{ github.workflow }}-${{ github.ref }}
   cancel-in-progress: true

 jobs:
   build:
+    if: ${{ github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch') }}
     runs-on: ubuntu-latest

   deploy:
+    if: ${{ github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch') }}
     needs: build
     runs-on: ubuntu-latest
+    permissions:
+      contents: read
+      pages: write
+      id-token: write
     environment:
       name: github-pages
```

This prevents non-main manual runs from building/deploying, puts the mandatory restriction on the deploy job itself, limits write permissions to that job, and separates development concurrency from production. Review semantics against [GitHub job conditions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions) and [deployment protections](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments).

Development-only approval has been received and exercised. Applying this later to `main` requires a separately approved release; **a push of even a workflow-only commit to main would trigger the existing deployment**. This task does not do that. The new job guards and permission/concurrency improvements are not active on main; the verified main-only environment policy continues to protect the inspected production deploy path.

## Ref preparation and validation record

- `pre-react-v2` and `redesign/react-v2` were absent locally and in an explicit remote ref query before creation.
- Annotated local tag created at the exact production baseline; development branch created and checked out from the same commit. Neither existing refs nor user changes were replaced.
- Remote branch/tag creation succeeded atomically without force. `redesign/react-v2` tracks `origin/redesign/react-v2`; remote main and the peeled backup tag remained at the verified baseline. Annotated tag object: `07e7f5b062eb4bd6ef73f50fb205bb4b1aad3f97`.
- Existing tests use installed dependencies, mocked requests and temporary artifact output. Do not run a dependency installation, build that rewrites tracked assets, workflow dispatch, real form submission, or production deployment for this preparation.

## Remaining approvals and limits

1. Development workflow approval is complete. Main still has the original workflow; propagating the hardening to main needs separate explicit approval and deployment planning. The original main workflow has no job guard and retains the shared concurrency group and workflow-wide deployment permissions.
2. Before any later production release, consider a reviewed change requiring PR approval/checks on main; do not enable or change repository protection settings during this task.
3. Preserve the exact `github-pages` allowlist (`main` branch only) and re-read settings immediately before later remote work. Never broaden it for previews; preview locally or in a separate destination.
4. Recheck all external content links before launch. Inventory records source-confirmed URLs and does not imply every third-party destination was live-tested.

Decision: the isolated development branch is ready to begin React V2 work once the final ref and static configuration checks below pass. Its workflow has the approved job guards; the existing environment allows only main. Main hardening is a separately approved future action, not a change made during this task. Trusted administrators can change configuration, so re-audit before release.

## Completed local validation

- `npm.cmd test`: **14 passed, 0 failed**, using already installed dependencies and mocked form requests. Temporary artifact generation was confined to the test-owned temporary directory. No production files or build output were changed.
- Parsed the edited YAML using the already installed `yaml` package. Verified only push-to-main and workflow_dispatch triggers remain, workflow-level permissions are read-only, and only deploy has Pages/OIDC write permissions.
- Evaluated the actual conditions for both jobs against eight ref/event combinations each: main push/manual allowed; development push/manual, tag manual, PR, repository-dispatch and workflow-run contexts rejected. These are static checks, not real Actions runs.
- Compared parsed baseline/edited build steps, deploy steps and environment: unchanged. Verified build dependency and ref-specific concurrency.
- Checked every one of 26 HTML files has an inventory entry, all 127 tracked asset SHA-256 records match, and all 394 bilingual key/value rows match the untouched locale source.
- `git diff --check` passed. Local main and the peeled backup tag still match the verified production baseline. Only this task's five new Markdown documents and the approved development workflow file are intended changes.
- After initial remote branch/tag creation, the Pages/environment APIs and latest workflow run were unchanged. Public homepage returned HTTP 200 and exactly matched unchanged baseline HTML after newline normalization; details are recorded in `PRODUCTION-BASELINE.md`. Repeat remote ref/run/deployment checks after publishing the preparation commit, and record the exact final commit and outcome in the handoff.
