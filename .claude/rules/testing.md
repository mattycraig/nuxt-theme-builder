---
paths:
  - "tests/**"
  - "vitest.config.ts"
  - "playwright.config.ts"
---

# Testing rules

## Unit (Vitest, `environment: "nuxt"`, happy-dom)

- Mirror the source path: `app/composables/useX.ts` → `tests/unit/composables/useX.test.ts`.
- Mock auto-imports with `mockNuxtImport` (hoisted, so define mocks at module scope). That includes `$fetch`: since Nuxt 4.5 it's auto-imported from `#build/fetch.mjs`, so `vi.stubGlobal("$fetch", …)` is silently bypassed. Delegate to a module-level `vi.fn()` that returns a resolved promise by default.
- Helpers: `tests/setup/component.ts` (`mountComponent`, `mountWithUApp` for components that need Nuxt UI's `UApp`/tooltip provider, `mountWithComposable` for lifecycle-dependent composables) and `tests/setup/fixtures.ts` (`createThemeConfig`, `createMockCategories`).
- The Pinia store is shared across tests. Reset it in `beforeEach` (`store.resetToDefaults()`, clear `savedPresets`).
- Persistence is async: the persist plugin writes from a store subscription, and `useCookie` writes on the next tick. `await nextTick()` before reading `document.cookie` / `localStorage`. Nuxt shares `useCookie` refs by name, so seed cookies only after flushing pending writes.
- Composables called outside a component leave their watchers running. Use `effectScope()` and `scope.stop()` in `afterEach` when a test depends on watcher counts.
- Coverage thresholds (lines 70 / functions 65 / branches 60) exclude presentational code (pages, layouts, blocks, showcase). Test logic in composables/utils/stores instead.
- Every bug fix gets a regression test that fails without the fix.

## E2E (Playwright, Chromium)

- CI runs `tests/e2e/smoke/` only. Put critical user flows there and keep them fast and deterministic.
- Wait for `[data-testid="theme-editor"][data-hydrated="true"]` before interacting with the editor.
- Each test gets a fresh context. `page.addInitScript` runs on every navigation, including `reload()`, so don't use storage-clearing init scripts in specs that test persistence.
- Init scripts also run in every nested frame, including the preview iframe. A clear-then-seed pair there fires `storage` events that can reset `useLocalStorage` state in the top page, so start storage-clearing scripts with `if (window !== window.top) return;`.
- Don't guard assertions with `if (await x.isVisible())`. When the locator stops matching, the test passes without checking anything.
- Prefer role/label locators (`getByRole`, `getByLabel`) over CSS selectors. They double as accessibility checks.
- Mock `/api/ai/generate` with `page.route` and never use real API keys.
- Visual baselines live in `tests/e2e/visual/*-snapshots/`. Update them deliberately with `pnpm test:e2e:full` or `--update-snapshots`, never by hand.
