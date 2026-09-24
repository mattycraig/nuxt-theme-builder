# Nuxt UI Theme Builder

Nuxt 4 app for building, previewing, and exporting [Nuxt UI v4](https://ui.nuxt.com) themes: semantic palettes, per-role shades, neutral scale, radius, font, and independent light/dark token overrides, previewed live across real component, block, and template pages. Also ships AI theme generation (BYOK), design tools, and a Nuxt Content learning hub. Live at https://nuxt-ui-themes.com.

Stack: Nuxt 4 · Vue 3 `<script setup lang="ts">` · Nuxt UI v4 · Tailwind CSS v4 · Pinia (+ persistedstate) · VueUse · Nuxt Content v3 · zod · AI SDK · nuxt-security · Vitest · Playwright. Node 22.22+, pnpm 10 (enforced), TypeScript 6 (typescript-eslint doesn't support 7 yet), ESLint 10.

## Commands

```bash
pnpm install          # postinstall runs `nuxt prepare`; .nuxt/ is required by eslint.config.mjs and typecheck
pnpm dev              # http://localhost:3000
pnpm lint             # ESLint (TS/Vue/JS)      · pnpm lint:fix
pnpm format:check     # Prettier (JSON/MD/YAML/CSS only) · pnpm format
pnpm typecheck        # nuxt typecheck (vue-tsc), ~1 min
pnpm test             # Vitest unit suite, ~70 s · pnpm vitest run <path> for one file
pnpm test:e2e:smoke   # Playwright smoke suite (what CI runs)
pnpm workflow:full    # lint:fix → format → typecheck → test
pnpm knip --include-entry-exports   # unused exports (plain `pnpm knip` treats every file as an entry)
```

Font-provider `403`/"Could not fetch" warnings during build/test come from sandboxed network access and are harmless.

## Architecture

```
app/app.vue              Picks the layout: coming-soon | preview (?preview query or /preview shell) | default
app/layouts/default.vue  Editor shell: sidebar editor + iframe preview + source view + command palette
app/layouts/preview.vue  What renders inside the iframe; syncs with the parent via postMessage
app/stores/theme.ts      Single source of truth: ThemeConfig, undo/redo history, saved presets
app/types/theme.ts       ThemeConfig types + ThemeConfigSchema (zod); re-exports shared constants
shared/constants/        Cross-layer constants (palettes, fonts, shades, routes, AI fallbacks)
app/composables/         useThemeApply, useThemeExport, usePreviewIframe, useSourceCode, useAi*, …
app/utils/navigation/    Sidebar / command-palette registry for every preview route
app/utils/cssGenerator.ts, defaults.ts, presets.ts, paletteGenerator.ts, customPalettes.ts, iframeProtocol.ts, seoDescriptions.ts
app/pages/               components/[slug], blocks/[slug] (data-driven), templates/*.vue, tools/, learn/
server/api/              ai/generate.post.ts, auth/launch.post.ts, highlight.post.ts, source/[...path].get.ts
modules/source-code-embed.ts  Embeds app/pages/**/*.vue as a Nitro virtual module for /api/source
content/learn/           Nuxt Content articles (schema in content.config.ts)
```

Preview iframes start on the prerendered `/preview` shell and are moved to the current route with `NAVIGATE` after the ready handshake, so the theme is applied before the demo page renders.

Data flow: editor controls call store setters → `useThemeApply()` writes semantic palette names to `useAppConfig().ui.colors` **and** injects CSS variables (radius, font, shade shifts, token overrides, dark-mode deltas) via `useHead` → the default layout posts `THEME_SYNC` / `COLORMODE_SYNC` to the iframe → `preview.vue` applies them with `store._syncConfig()` (no history) → export composables serialize the config without mutating runtime state.

## Guardrails

- **Layout selection lives in `app.vue`.** `<NuxtLayout :name>` overrides page meta, so `definePageMeta({ layout })` has no effect. Preview pages render inside the iframe with the `preview` layout.
- **Theme store**: every user-facing mutation pushes history; iframe sync uses `_syncConfig` (no history). Anything loaded from outside (persisted state, imports, presets, AI output, postMessage) goes through `ThemeConfigSchema`.
- **Persistence is split on purpose.** `config` + `activePresetName` go in the `theme` cookie (readable during SSR, ~2 KB). `savedPresets` go in localStorage under `theme-presets`. Browsers silently drop cookies over 4096 bytes, and one saved preset is enough to push the whole store past that. After hydration the store calls `_resetHistory()` so undo can't jump back to `DEFAULT_THEME`.
- **Client-only state must not change SSR output.** Gate anything rendered from localStorage behind `useMounted()` or `<ClientOnly>` (see `EditorSavedThemes`, `EditorToolbar`), otherwise hydration mismatches.
- **Keep the two-strategy theme apply** (app config colors + injected CSS variables). Don't collapse them.
- **Iframe messaging**: always check `event.origin === window.location.origin`, use `MSG` constants from `app/utils/iframeProtocol.ts`, and pass paths through `sanitizeNavigationPath`.
- **Preview/demo pages are presentational.** Use semantic tokens (`bg-(--ui-bg-elevated)`, `text-(--ui-text-muted)`, `color="primary"`) rather than raw palette classes like `bg-blue-500`, or the page won't respond to the theme being edited.
- **Route registries must agree**: `app/utils/navigation/*` ↔ `shared/constants/routes.ts` (sitemap, noindex, prerender) ↔ `app/utils/seoDescriptions.ts`. `tests/unit/shared/routes.test.ts` enforces part of this.
- **Source view** only exists for `/templates/*` (not the index). Blocks show source via `?raw` imports in `app/data/blocks/*.ts`.
- **AI generation** is BYOK: keys come from the client per request and must never be logged, stored server-side, or echoed in errors. Keep request/response zod validation, timeout, retry, error mapping (`server/utils/aiErrorHandler.ts`), and rate limiting. The system prompt builds its value lists from `shared/constants/theme.ts`, so add new palettes/fonts there.
- **Security**: `/api/source` must keep path sanitization + the `templates/` allow-list; `/api/highlight` output is Shiki HTML, re-sanitized with DOMPurify on the client. Respect nuxt-security CSP (nonce, strict-dynamic).
- **Launch gate**: `coming-soon.global.ts` only gates non-API routes, and only in production when `NUXT_PUBLIC_COMING_SOON_ENABLED=true`.

## Conventions

- Components auto-import with `pathPrefix: true`: `components/editor/ColorPicker.vue` → `<EditorColorPicker>`. Exceptions: `components/showcase/**` → `Showcase*` without the path; `components/blocks/{content,components}/**` are not auto-imported (loaded via `import.meta.glob` / explicit imports).
- Icons: `i-lucide-*` (`i-simple-icons-*` for brands).
- Formatting: there is **no** formatter for `.ts`/`.vue` (ESLint `@stylistic` is not enabled). Match the surrounding style: double quotes, semicolons, trailing commas, 2-space indent. Prettier covers JSON/MD/YAML/CSS.
- Setup-style Pinia stores; prefer extending existing composables over page-level ad-hoc state.
- Commits: Conventional Commits enforced by commitlint (lowercase subject, header ≤ 100 chars). Types: `feat fix docs style refactor perf test build ci chore revert`. Scopes in use: `editor preview ai tools learn store api types test seo deps ci`.
- Branch from `master`, PR back to `master`. Husky runs lint-staged (ESLint --fix, Prettier) on commit. Never bypass it with `--no-verify`.

## Testing

- Unit tests mirror the source tree in `tests/unit/`. Use the helpers in `tests/setup/` (`mountWithComposable`, `mountWithUApp`, `createThemeConfig`) and `mockNuxtImport` for auto-imports.
- Pinia persistence writes asynchronously (store subscription, then `useCookie` on the next tick): `await nextTick()` before asserting on cookies/localStorage.
- E2E: CI runs only `tests/e2e/smoke/`; run the full suite locally before large UI changes. Each test gets a fresh browser context. `addInitScript` storage resets re-run on `reload()`, so persistence specs must not use them.
- Bug fixes get a regression test that fails without the fix.

## Claude Code setup

Hooks (`.claude/settings.json`) auto-fix files after edits, lint changed files before finishing, block edits to lockfiles/secrets/generated output, block `--no-verify`, direct pushes to `master`, and non-pnpm installs, and install dependencies at session start on the web. Project skills: `/dev-workflow`, `/add-preview-route`, `/add-theme-property`, `/add-design-tool`, `/add-learn-article`, `/add-ai-model`, `/run-app`, `/docs-sync`, `/maintenance`. Subagents: `code-reviewer`, `test-writer`, `a11y-reviewer`. Path-scoped rules load from `.claude/rules/`. Full guide: `.claude/README.md`.
