# Nuxt UI Theme Builder — Copilot Instructions

## Project Scope

Nuxt 4 app for building, previewing, and exporting Nuxt UI v4 theme systems.

Current product surface includes:

- Multi-route preview site (`/components`, `/blocks`, `/templates`, utility pages)
- Theme editing workspace with iframe preview + source-code mode
- AI-assisted theme generation (`/ai`) with user-provided API keys
- Optional launch gate (`/coming-soon`) controlled by runtime config

## Core Architecture

### Layout Model

- `app.vue` selects active layout dynamically:
  - `default`: full editor + preview shell
  - `preview`: iframe-safe render/sync mode (`?preview`)
  - `coming-soon`: gated launch page
- `layouts/default.vue` is the main orchestration layer for:
  - theme apply
  - keyboard shortcuts
  - command palette
  - iframe preview sync
  - source code viewing

### Theme State + Application

- Single source of truth: `app/stores/theme.ts`
- Strict type/schema contract: `app/types/theme.ts` + `ThemeConfigSchema`
- Two-strategy apply model in `app/composables/useThemeApply.ts`:
  1. semantic palette names → `useAppConfig().ui.colors`
  2. radius/font/token overrides → injected CSS variables via `useHead`

Do not collapse these two paths into one.

### Server APIs

- `POST /api/ai/generate`: provider-backed theme generation with validation, retries, timeout handling, and per-IP in-memory rate limiting
- `POST /api/auth/launch`: launch gate password check + cookie issuance
- `POST /api/highlight`: Shiki highlighting for source viewer
- `GET /api/source/[...path]`: returns embedded page source from virtual module map

## Working Rules

### General

- Use Composition API + `<script setup lang="ts">`.
- Keep all public data contracts typed and schema-validated.
- Prefer extending existing composables over adding page-level ad hoc state.
- Preserve route-safe and origin-safe behavior in iframe messaging code.

### Store & Persistence

- Keep store as setup-style `defineStore`.
- Preserve history semantics (`undo`, `redo`, `undoAll`) and push history for user-facing mutations.
- Persisted state must remain compatible and validated on hydrate.

### Navigation & Discoverability

- Update `app/utils/navigation.ts` when adding/changing preview routes.
- Keep command palette results in sync through `useLayoutNavigation` and `useCommandPalette`.

### Source Viewer

- Source mode only applies to `/templates/*` routes (excluding the templates index page).
- If source retrieval behavior changes, keep these in sync:
  - `modules/source-code-embed.ts`
  - `server/api/source/[...path].get.ts`
  - `app/composables/useSourceCode.ts`

### AI Features

- Provider/model options come from `app/types/ai.ts`.
- Server route must continue to validate request/response shape with `zod`.
- Never trust generated payloads without schema validation before applying to store.

### Security

- Respect `nuxt-security` constraints and existing CSP behavior.
- Keep explicit path sanitization for source API and navigation helper usage.
- Preserve launch-gate behavior split between middleware + auth API route.

## Conventions

- Components are auto-imported with `pathPrefix: true` — the folder path provides the name prefix, so filenames omit the folder name (e.g., `editor/ColorPicker.vue` resolves to `<EditorColorPicker />`).
- Icons use lucide iconify names (`i-lucide-*`).
- Theme token values should come from constants/unions in `app/types/theme.ts`.
- For copy/export logic, use utilities/composables (`useThemeExport`, `cssGenerator`) instead of duplicating serialization logic.

## Tests & Quality Gates

- Unit tests: `tests/unit/**` (Vitest + Nuxt env)
- E2E tests: `tests/e2e/**` (Playwright)
- CI pipeline runs: lint → typecheck → unit coverage → e2e → build
- Pre-commit runs `lint-staged` (`*.ts`, `*.vue` via ESLint fix)

## Environment Variables

- `NUXT_PUBLIC_COMING_SOON_ENABLED` — enables production launch gating
- `NUXT_COMING_SOON_PASSWORD` — password expected by `/api/auth/launch`

AI API keys are entered by users in the app UI; they are not loaded from server env by default.

## Change Patterns

### Add a theme field

1. Update type/schema in `app/types/theme.ts`
2. Add defaults in `app/utils/defaults.ts`
3. Wire store mutation(s) in `app/stores/theme.ts`
4. Apply CSS/runtime mapping in `app/composables/useThemeApply.ts`
5. Add export handling in `app/composables/useThemeExport.ts`
6. Add/update editor UI and tests

### Add preview route

1. Create page under `app/pages/components|blocks|templates`
2. Register in `app/utils/navigation.ts`
3. Verify preview iframe navigation sync and command palette listing
4. Verify source mode behavior when route belongs to blocks/templates

### Add AI model/provider option

1. Update `app/types/ai.ts`
2. Ensure server provider factory supports the value
3. Verify AI settings panel and generate flow tests
