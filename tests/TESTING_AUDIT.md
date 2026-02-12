# Testing Audit (2026-02-12)

## Status Update (Implemented)

- CI now runs a smoke e2e suite via `pnpm test:e2e:ci`.
- Smoke specs added under `tests/e2e/smoke/`:
  - `app-smoke.spec.ts`
  - `ai-smoke.spec.ts`
- Playwright CI settings were tuned for speed/stability:
  - `workers: 2` in CI
  - `retries: 1` in CI
  - CI uses `pnpm build && pnpm preview` instead of `pnpm dev`
- Current smoke result: 4 tests passing locally (~46s).
- Nightly full regression workflow added: `.github/workflows/e2e-nightly.yml`.

## Current Snapshot

- Unit coverage total is low (`lines: 32.56%`, `functions: 23.76%`, `branches: 29.31%`).
- Strong unit coverage exists in pure logic modules:
  - `app/stores/theme.ts`
  - `app/utils/*` core generators/defaults/helpers
  - selected composables (`useThemeExport`, `useSourceCode`, `useSaveThemeModal`, `useThemeModeAccessors`)
- Most Vue components and layout orchestration code are untested in unit coverage.

## High-Impact Gaps

### 1) Editor Components (very low direct coverage)

No direct unit/component tests for key editor surfaces:

- `app/components/editor/ThemeEditor.vue`
- `app/components/editor/EditorToolbar.vue`
- `app/components/editor/EditorPresetSelector.vue`
- `app/components/editor/EditorSavedThemes.vue`
- `app/components/editor/EditorExportPanel.vue`

### 2) Preview Components and Full Route Surface

Most `app/components/preview/*.vue` files show 0% unit coverage. These are currently validated mostly via broad e2e behavior.

### 3) Layout Orchestration Composables

Low or no direct unit coverage for runtime wiring logic:

- `app/composables/useThemeApply.ts`
- `app/composables/useKeyboardShortcuts.ts`
- `app/composables/usePreviewIframe.ts`
- `app/layouts/default.vue`
- `app/layouts/preview.vue`

These modules are high-risk because they coordinate store, iframe sync, and route behavior.

## E2E Gap and Scope Findings

- E2E breadth is high, but one file (`tests/e2e/ai-generate.spec.ts`) is very large and drives runtime.
- Several e2e checks validate minor UI details that are better suited to unit/component tests.
- Some tests use conditional interactions (`if visible then click`) that can allow false positives.

## Testing Strategy

### CI (fast smoke) — active

Focus on major user journeys only:

1. Theme editor loads + core mutation (e.g., radius)
2. Export panel opens + output renders
3. Navigation to core preview routes
4. AI page loads + one successful mocked generation

### Non-blocking / nightly (full)

Keep full regression suite for deep UI details, multi-turn AI, and edge/error permutations.

Nightly automation:

- Scheduled daily at 03:00 UTC
- Manual trigger available via `workflow_dispatch`

Run full suite with:

- `pnpm test:e2e:full`

## Priority Plan

1. Add component-level tests for editor controls and toolbar actions.
2. Add unit tests for `useThemeApply` and `useKeyboardShortcuts`.
3. Keep granular AI UI permutations in full/nightly, not CI smoke.
4. Keep e2e assertions deterministic (avoid optional action branches where possible).
