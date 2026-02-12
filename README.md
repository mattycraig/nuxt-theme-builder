# Nuxt UI Theme Builder

[![CI](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/mattycraig/nuxt-theme-builder/actions/workflows/ci.yml)
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
- Optional production launch gate (`/coming-soon`)

## Tech Stack

- Nuxt 4 + Vue 3 + TypeScript
- Nuxt UI v4 + Tailwind CSS v4
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
	pages/                 # home, ai, components/*, blocks/*, templates/*, utility pages
	components/            # editor, preview, layout, ai
	composables/           # theme apply/export, iframe sync, source mode, AI state, shortcuts
	stores/theme.ts        # central ThemeConfig state + history + presets
	types/                 # theme and AI contracts
	utils/                 # defaults, presets, css generation, navigation, seo
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
pnpm test:e2e:headed
pnpm test:e2e:ui
```

## Testing

- **Unit:** Vitest with Nuxt environment (`happy-dom`)
- **E2E:** Playwright (Chromium)
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
- `security.yml` (PR to `master`): dependency review with high-severity fail threshold
- `lighthouse.yml` (Preview deployments): Lighthouse audit + PR comment

Deployment:

- Hosted on Vercel
- Preview environment audited by Lighthouse workflow

## Contributing

- Use `pnpm` (enforced by `packageManager`).
- Keep navigation additions synced in `app/utils/navigation.ts`.
- For theme model changes, update types → defaults → store → apply/export composables → tests.
- Ensure `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm test:e2e` pass before merging.

## License

[MIT](./LICENSE)
