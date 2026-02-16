<p align="center">
  <img src="public/android-chrome-512x512.png" alt="Nuxt UI Theme Builder" width="120" />
</p>

<h1 align="center">Nuxt UI Theme Builder</h1>

[![CI](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/ci.yml)
[![E2E Full Nightly](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/e2e-nightly.yml/badge.svg)](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/e2e-nightly.yml)
[![Dependency Review](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/security.yml/badge.svg)](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/security.yml)

Visual builder for [Nuxt UI v4](https://ui.nuxt.com) themes.

Design and preview semantic palettes, neutral scales, radius, fonts, and light/dark mode token overrides — then export as `app.config.ts`, CSS variables, or JSON.

**Live:** [www.nuxt-ui-themes.com](https://www.nuxt-ui-themes.com)

## Highlights

- Theme editor sidebar with undo/redo and preset management
- Route-based previews for components, blocks, and full templates
- Iframe preview sync + fullscreen mode
- Source code viewer for block/template pages
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
	layouts/               # default, preview, ai, coming-soon
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
tests/
	unit/
	e2e/
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
pnpm typecheck

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
pnpm workflow           # Full interactive workflow (PowerShell)
pnpm workflow:commit    # Workflow with commit prompt
pnpm workflow:quick     # Quick: lint + format + typecheck
pnpm workflow:full      # Full: lint + format + typecheck + test

# Release
pnpm changelog          # Generate changelog
pnpm release            # Bump version + changelog
```

## Development Workflow

Automated workflow for validating and committing changes:

### Quick Commands

```bash
# Quick validation (no tests)
pnpm workflow:quick

# Full validation (with tests)
pnpm workflow:full

# Interactive workflow with commit
pnpm workflow:commit
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

### Copilot Chat Modes

In VS Code with Copilot, use these custom chat modes:

- **Dev Workflow**: Full lint → format → typecheck → test → stage
- **Quick Check**: Fast lint + typecheck only
- **Commit Ready**: Full workflow with commit message suggestion

Or use the prompt file: `.github/prompts/dev-workflow.prompt.md`

## Testing

- **Unit:** Vitest with Nuxt environment (`happy-dom`)
- **E2E:** Playwright (Chromium)
- **CI E2E (fast path):** smoke suite only (`pnpm test:e2e:ci`)
- **Nightly E2E (full regression):** `.github/workflows/e2e-nightly.yml` runs `pnpm test:e2e:full` daily at 03:00 UTC
- **Manual full regression:** run the nightly workflow via `workflow_dispatch` or execute `pnpm test:e2e:full` locally
- Coverage output: `coverage/`
- Playwright output: `playwright-report/`, `tests/e2e/test-results/`

## Security & Runtime Notes

- `nuxt-security` headers/CSP are enabled in production.
- `/api/ai/generate` includes request validation, timeout/retry handling, and per-IP rate limiting.
- `/api/source/[...path]` sanitizes request path and serves code from a build-time virtual source map.
- `/api/highlight` uses Shiki and intentionally disables XSS validator at route level to support raw source input.

## CI/CD

GitHub Actions workflows:

- `ci.yml` (push/PR to `master`): lint, typecheck, unit coverage, e2e, build
- `e2e-nightly.yml` (schedule + manual): full Playwright regression suite
- `security.yml` (PR to `master`): dependency review with high-severity fail threshold
- `codeql.yml` (schedule + manual): code security scanning
- `lighthouse.yml` (Preview deployments): Lighthouse audit + PR comment
- `release.yml` (manual): automated version release
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
- For new learn articles, add markdown file to `content/learn/<category>/` with required frontmatter.
- Ensure `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm test:e2e:ci` pass before merging.

## License

[MIT](./LICENSE)
