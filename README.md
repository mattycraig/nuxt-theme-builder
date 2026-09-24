<p align="center">
  <img src="public/android-chrome-512x512.png" alt="Nuxt UI Theme Builder" width="120" />
</p>

<h1 align="center">Nuxt UI Theme Builder</h1>

[![CI](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/ci.yml)
[![Dependency Review](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/security.yml/badge.svg)](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/security.yml)

Visual builder for [Nuxt UI v4](https://ui.nuxt.com) themes.

Design and preview semantic palettes, neutral scales, radius, fonts, and light/dark mode token overrides — then export as `app.config.ts`, CSS variables, or JSON.

**Live:** [nuxt-ui-themes.com](https://nuxt-ui-themes.com)

## Highlights

- Theme editor sidebar with undo/redo and preset management
- Route-based previews for components, blocks, and full templates
- Iframe preview sync + fullscreen mode
- Source view for templates; copyable source and AI prompts for every block
- AI theme generation (BYOK) with OpenAI, Anthropic, and Google models
- Export panel for app config, CSS, and JSON formats
- Interactive design tools (color converter, contrast checker, palette generator/viewer)
- Learning hub with Nuxt Content-powered articles and guides
- Optional production launch gate (`/coming-soon`)

## Tech Stack

- Nuxt 4 + Vue 3 + TypeScript
- Nuxt UI v4 + Tailwind CSS v4
- Nuxt Content v3 (learn articles collection)
- Pinia + `pinia-plugin-persistedstate`
- VueUse composables
- AI SDK + provider adapters (`openai`, `anthropic`, `google`)
- `zod` runtime validation
- `nuxt-security`
- Vitest (unit) + Playwright (e2e)

## Project Structure

```text
app/
	app.vue
	layouts/               # default (editor shell), preview (iframe), coming-soon
	pages/                 # home, ai, components/*, blocks/*, templates/*, tools/*, learn/*, utility pages
	components/            # editor, preview, layout, ai, tools, learn
	composables/           # theme apply/export, iframe sync, source mode, AI state, shortcuts
	stores/theme.ts        # central ThemeConfig state + history + presets
	types/                 # theme and AI contracts
	utils/                 # defaults, presets, css generation, seo
		navigation/        # modular route definitions
content/
	learn/                 # Nuxt Content articles (theming, components, tailwind, best-practices)
server/api/
	ai/generate.post.ts
	auth/launch.post.ts
	highlight.post.ts
	source/[...path].get.ts
modules/
	source-code-embed.ts
shared/constants/        # palettes, fonts, routes, AI fallbacks (used by app + server)
tests/
	unit/
	e2e/                   # smoke/ runs in CI
.claude/                 # Claude Code settings, hooks, rules, skills, subagents
```

## Getting Started

### Requirements

- Node.js 22+
- pnpm 10+

### Install

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Only needed for launch gating:

```bash
NUXT_PUBLIC_COMING_SOON_ENABLED=true
NUXT_COMING_SOON_PASSWORD=your-password
```

Notes:

- Gate applies only in production (`import.meta.dev` bypasses it locally).
- AI keys are user-provided in the app UI and are not required as server env vars.

## Scripts

```bash
# Development
pnpm dev
pnpm build
pnpm preview
pnpm generate

# Quality
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm typecheck
pnpm knip

# Tests
pnpm test
pnpm test:watch
pnpm test:coverage
pnpm test:e2e
pnpm test:e2e:smoke
pnpm test:e2e:ci
pnpm test:e2e:full
pnpm test:e2e:headed
pnpm test:e2e:ui

# Workflow automation
pnpm workflow:quick     # Quick: lint + format + typecheck
pnpm workflow:full      # Full: lint + format + typecheck + test
```

## Development Workflow

Automated workflow for validating and committing changes:

### Quick Commands

```bash
# Quick validation (no tests)
pnpm workflow:quick

# Full validation (with tests)
pnpm workflow:full

# Interactive workflow with commit (Bash; see below for PowerShell)
./scripts/dev-workflow.sh --auto-commit
```

### PowerShell Script (Windows)

```powershell
# Interactive workflow
.\scripts\dev-workflow.ps1

# With commit message and push
.\scripts\dev-workflow.ps1 -CommitMessage "feat: add feature" -Push

# Skip tests for quick iteration
.\scripts\dev-workflow.ps1 -SkipTests

# Include E2E tests
.\scripts\dev-workflow.ps1 -RunE2E

# Dry run to preview
.\scripts\dev-workflow.ps1 -DryRun
```

### Bash Script (Linux/macOS/CI)

```bash
# Interactive workflow
./scripts/dev-workflow.sh

# With commit message and push
./scripts/dev-workflow.sh --message "feat: add feature" --push

# Skip tests for quick iteration
./scripts/dev-workflow.sh --skip-tests

# Include E2E tests
./scripts/dev-workflow.sh --run-e2e

# Dry run to preview
./scripts/dev-workflow.sh --dry-run
```

## Claude Code

This repository is set up for [Claude Code](https://code.claude.com) (CLI, IDE, desktop, and web):

- **`CLAUDE.md`**: project context and guardrails loaded into every session, plus path-scoped rules in `.claude/rules/`.
- **Skills** (run with `/name`): `/dev-workflow [quick|full|commit]`, `/add-preview-route`, `/add-theme-property`, `/add-design-tool`, `/add-learn-article`, `/add-ai-model`, `/run-app`, `/docs-sync`, `/maintenance`, plus vendored Nuxt/Vue/Nuxt UI reference skills.
- **Subagents**: `code-reviewer`, `test-writer`, `a11y-reviewer`.
- **Hooks**: auto-fix edited files, lint changed files before finishing, block edits to lockfiles/secrets/generated output, block `--no-verify` and direct pushes to `master`, and install dependencies at session start on the web.
- **GitHub**: mention `@claude` on issues/PRs (`claude.yml`), and every PR gets an automatic review (`claude-code-review.yml`) once a `CLAUDE_CODE_OAUTH_TOKEN` secret is configured.

See [`.claude/README.md`](./.claude/README.md) for setup and details.

## Testing

- **Unit:** Vitest with Nuxt environment (`happy-dom`)
- **E2E:** Playwright (Chromium)
- **CI E2E (fast path):** smoke suite only (`pnpm test:e2e:ci`)
- **Manual full regression:** run `pnpm test:e2e:full` locally
- Coverage output: `coverage/`
- Playwright output: `playwright-report/`, `tests/e2e/test-results/`

## Security & Runtime Notes

- `nuxt-security` headers/CSP are enabled in production.
- `/api/ai/generate` includes request validation, timeout/retry handling, and per-IP rate limiting.
- `/api/source/[...path]` sanitizes request path and serves code from a build-time virtual source map.
- `/api/highlight` uses Shiki and intentionally disables XSS validator at route level to support raw source input.

## CI/CD

GitHub Actions workflows:

- `ci.yml` (push/PR to `master`): lint + format check, typecheck, unit tests with coverage, production build + e2e smoke
- `security.yml` (PR to `master`): dependency review with high-severity fail threshold
- `codeql.yml` (push/PR to `master` + weekly): code security scanning
- `claude.yml` (`@claude` mentions): Claude Code answers or implements from issues and PR comments
- `claude-code-review.yml` (PRs): automatic Claude Code review using the repo's review checklist
- `lighthouse.yml` (Preview deployments): Lighthouse audit + PR comment
- `labeler.yml` (PR): auto-labels PRs by file paths
- `stale.yml` (schedule): manages stale issues/PRs
- `welcome.yml` (issues/PRs): greets new contributors

Deployment:

- Hosted on Vercel
- Preview environment audited by Lighthouse workflow

## Contributing

- Use `pnpm` (enforced by `packageManager`).
- Keep navigation additions synced in `app/utils/navigation/` modules.
- For theme model changes, update types → defaults → store → apply/export composables → tests.
- For new design tools, add component → page → navigation registration → SEO description.
- For new learn articles, add the markdown file to `content/learn/<category>/` and register it in `app/utils/navigation/learn.ts` and `shared/constants/routes.ts`.
- Step-by-step checklists for these tasks live in `.claude/skills/*/SKILL.md` (usable with or without Claude Code).
- Ensure `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm test:e2e:ci` pass before merging.

## License

[MIT](./LICENSE)
