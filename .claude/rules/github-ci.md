---
paths:
  - ".github/**"
---

# GitHub configuration rules

- CI (`ci.yml`) runs on push/PR to `master`: lint + `format:check`, typecheck, unit tests with coverage, and a production `node-server` build + E2E smoke. Keep local commands and CI in sync (`package.json` scripts are the source of truth).
- Pin third-party actions to a major version tag at minimum. When bumping a major, read the new tag's `action.yml`: it must run on a supported runtime (`node24` or composite), and every `with:` input the workflow passes must still exist. Unknown inputs only produce a warning, so a renamed input silently stops working. Give each workflow the least `permissions` it needs, at the top level or per job.
- Workflows that need secrets must stay green when the secret is absent (forks, Dependabot, fresh clones): check for the secret in a step and skip the rest.
- `pull_request_target` workflows must never check out or run PR code.
- `labeler.yml` globs must match real paths, and `CODEOWNERS` uses gitignore-style globs (`*`, `*.md`) that must not be Markdown-escaped.
