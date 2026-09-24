# Claude Code setup

Everything Claude Code needs to work in this repo is checked in, so the CLI, IDE extensions, desktop app, and Claude Code on the web all behave the same way.

| Piece             | Where                                          | What it does                                                          |
| ----------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| Project memory    | `CLAUDE.md`                                    | Architecture, commands, guardrails, conventions, loaded every session |
| Path-scoped rules | `.claude/rules/*.md`                           | Extra rules that load only when Claude reads matching files           |
| Settings + hooks  | `.claude/settings.json`, `.claude/hooks/*.mjs` | Permissions and automatic checks (below)                              |
| Skills            | `.claude/skills/<name>/SKILL.md`               | Reusable playbooks, invoked as `/name` or automatically when relevant |
| Subagents         | `.claude/agents/*.md`                          | Focused reviewers/writers Claude can delegate to                      |
| MCP servers       | `.mcp.json`                                    | Nuxt UI and Nuxt documentation servers (approve on first use)         |
| GitHub automation | `.github/workflows/claude*.yml`                | `@claude` mentions and automatic PR review                            |

`AGENTS.md` points other coding agents to `CLAUDE.md`.

## Hooks

All hooks are small Node scripts, so they run the same on macOS, Linux, and Windows without `jq`.

| Event                    | Script              | Behavior                                                                                                                                                                       |
| ------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SessionStart` (startup) | `session-start.mjs` | **Web sessions only**: `pnpm install --frozen-lockfile` (runs `nuxt prepare`) so lint, typecheck, and tests work immediately. Runs synchronously, so the session waits for it. |
| `PreToolUse` Edit/Write  | `guard-files.mjs`   | Blocks writes to `pnpm-lock.yaml`, `.env*` (except `.env.example`), and generated dirs (`.nuxt/`, `.output/`, `coverage/`, …).                                                 |
| `PreToolUse` Bash        | `guard-bash.mjs`    | Blocks `--no-verify`, `git push --force` (use `--force-with-lease`), pushes to `master`/`main`, and `npm`/`yarn`/`bun` installs. Quoted text is ignored.                       |
| `PostToolUse` Edit/Write | `format-file.mjs`   | Runs `eslint --fix` on TS/Vue/JS or `prettier --write` on JSON/MD/YAML/CSS for the edited file, and feeds any remaining ESLint errors back to Claude.                          |
| `Stop`                   | `stop-lint.mjs`     | Lints all uncommitted TS/Vue/JS files. If there are errors, Claude has to fix them before finishing (once per stop, so it can't loop).                                         |

Review or disable hooks with `/hooks`. To opt out personally, set `"disableAllHooks": true` in `.claude/settings.local.json`.

## Skills

Project skills (plain Markdown checklists you can also follow by hand):

| Skill                 | Use it to…                                                                    |
| --------------------- | ----------------------------------------------------------------------------- |
| `/dev-workflow`       | Run lint → format → typecheck → tests (`quick` / `full` / `commit` modes)     |
| `/add-preview-route`  | Add a component, block, or template preview and register it everywhere        |
| `/add-theme-property` | Change `ThemeConfig` end to end (schema, store, CSS, export, AI, tests)       |
| `/add-design-tool`    | Add a `/tools/*` utility                                                      |
| `/add-learn-article`  | Write and register a Learning Hub article                                     |
| `/add-ai-model`       | Add/retire AI provider models for the BYOK generator                          |
| `/run-app`            | Build, run, and drive the app in a browser to verify a change                 |
| `/docs-sync`          | Audit docs and config against the code and fix drift                          |
| `/maintenance`        | Periodic health check (validation, deps, audit, drift), with one PR if needed |

Vendored reference skills (third-party; see each `SKILL.md` for its origin and license): `nuxt`, `nuxt-ui`, `nuxt-content`, `nuxt-seo`, `vue`, `vueuse`, `reka-ui`, `vite`, `vitest`, `pnpm`, `frontend-design`, `web-design-guidelines`, `document-writer`, `audit-website` (needs the [squirrel CLI](https://squirrelscan.com/download); config in `squirrel.toml`). They're excluded from ESLint, Prettier, and knip so they stay identical to upstream. Refresh them by re-copying from their source repositories.

Security reviews use Claude Code's built-in `/security-review`. `/code-review` and `/simplify` are built in too.

## Subagents

- **`code-reviewer`**: reviews a diff against this repo's guardrails (store history/persistence, hydration, iframe protocol, BYOK security, route registries) and reports only verified defects. The GitHub review workflow uses the same checklist.
- **`test-writer`**: writes Vitest/Playwright tests in the repo's patterns and proves regression tests fail without the fix.
- **`a11y-reviewer`**: WCAG 2.2 AA review of templates and editor UI (the Lighthouse accessibility gate is 0.9).

## MCP servers

`.mcp.json` registers the official Nuxt UI (`https://ui.nuxt.com/mcp`) and Nuxt (`https://nuxt.com/mcp`) documentation servers. Claude Code asks you to approve project MCP servers the first time. Optional personal extras go in your user scope, for example Context7:

```bash
claude mcp add --scope user --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: <your key>"
```

## GitHub Actions

- `claude.yml`: comment `@claude …` on an issue or PR (or in a review) to have Claude answer or push a fix. Only users with write access can trigger it.
- `claude-code-review.yml`: automatic review of every non-draft, same-repo PR, posted as inline comments plus one sticky summary.

One-time setup: install the [Claude GitHub App](https://github.com/apps/claude) on the repo and add a `CLAUDE_CODE_OAUTH_TOKEN` repository secret (generate it with `claude setup-token`, or run `/install-github-app` in Claude Code). Until the secret exists, both workflows skip with a notice instead of failing. To bill an Anthropic API key instead, swap `claude_code_oauth_token` for `anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}` in both files.

## Routines (scheduled runs)

A weekly routine, **"nuxt-theme-builder weekly maintenance"** (Mondays 13:00 UTC), starts a fresh Claude Code session that runs `/maintenance`. It reports only when everything is healthy, and opens at most one PR for safe mechanical fixes. It never pushes to `master` or merges. Manage it from the Routines page on claude.ai (pause, change the schedule, or delete). If it can push a branch but not open the PR, attach the GitHub connector to the routine there.

## Claude Code on the web

- The `SessionStart` hook installs dependencies. Once this config is on the default branch, every new web session starts ready to test.
- Font-provider requests (Google Fonts metadata) may be blocked by the environment's network policy. Builds and tests still pass, with warnings.
- Playwright: if the pinned Chromium isn't installed, `/run-app` explains how to point at the preinstalled one.

## Personal overrides

Put personal settings in `.claude/settings.local.json` and personal instructions in `CLAUDE.local.md`. Both are gitignored.
