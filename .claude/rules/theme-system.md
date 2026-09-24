---
paths:
  - "app/stores/theme.ts"
  - "app/types/theme.ts"
  - "shared/constants/**"
  - "app/composables/useTheme*.ts"
  - "app/utils/cssGenerator.ts"
  - "app/utils/defaults.ts"
  - "app/utils/presets.ts"
---

# Theme system rules

- `ThemeConfig` changes follow `/add-theme-property`: types + schema → defaults → store setter + history → `useThemeApply` → `useThemeExport` / `cssGenerator` → editor UI → tests. Persisted configs created before the change must still validate, so new fields are `.optional()` in `rawThemeSchema` and filled in the `.transform()`.
- Palette, shade, font, and radius values come from `shared/constants/theme.ts`. `app/types/theme.ts` re-exports them for the app layer; `server/` imports them from `~~/shared/...`. `nuxt.config.ts` fonts and the AI system prompt are generated from the same constants.
- Setters mutate `config.value` in place and then call `_pushHistory()`. Drag-style inputs use a visual setter (no history) and commit once at the end (see `setRadiusVisualForMode`).
- `loadConfig` / `loadPreset` / `resetToDefaults` move `historyBaseIndex` (the `undoAll` anchor). `_syncConfig` must never touch history.
- Persistence: `config` + `activePresetName` → `theme` cookie; `savedPresets` → localStorage `theme-presets`. Keep the cookie payload small (browsers drop cookies over 4096 bytes) and never add unbounded data to it. Keep the persisted key names stable, since existing users depend on them.
- `afterHydrate` re-validates everything with `ThemeConfigSchema` and calls `_resetHistory()`.
- Dark mode differences are emitted as CSS variables under `.dark`, not through app config. Keep the two-strategy apply model in `useThemeApply`.
- Generated CSS must pass `isCleanCSS`, and user-controlled values go through `sanitizeCSSValue`.
