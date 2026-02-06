# Nuxt UI Theme Builder — Copilot Instructions

## Project Overview

A single-page Nuxt 4 app for visually configuring **Nuxt UI v4** design tokens (colors, radius, font, neutral shades) and exporting the result as `app.config.ts`, CSS, or JSON. Built with **Nuxt UI v4**, **Pinia** (persisted state), **Tailwind CSS v4**, and **VueUse**.

## Architecture

```
app/
├── pages/index.vue          # Single page — wires sidebar editor + preview pane via UDashboardGroup
├── stores/theme.ts          # Pinia store: single source of truth (ThemeConfig), undo/redo, presets
├── composables/
│   ├── useThemeApply.ts     # Reactively applies store → DOM (appConfig colors + useHead CSS injection)
│   └── useThemeExport.ts    # Generates export strings (app.config, CSS, JSON) + import/share helpers
├── types/theme.ts           # All type definitions and const arrays (palettes, shades, semantic keys)
├── utils/
│   ├── defaults.ts          # DEFAULT_THEME, token defaults per mode, hex maps, shadeToCSS(), cloneTheme()
│   └── presets.ts           # BUILT_IN_PRESETS array
└── components/
    ├── editor/              # Sidebar controls — each is a focused picker/selector
    └── preview/             # Read-only Nuxt UI component showcases (PreviewButtons, PreviewCards, etc.)
```

### Data Flow

1. **User edits** → editor components call `useThemeStore()` actions (e.g., `setSemanticColor`, `setRadius`)
2. **Store** updates `config` ref and pushes to undo history
3. **`useThemeApply()`** (called once in `pages/index.vue`) watches the store and:
   - Writes semantic color names to `useAppConfig().ui.colors` (Nuxt UI handles CSS variable injection)
   - Injects radius, font, and token overrides via `useHead()` computed `<style>`
4. **Preview components** re-render automatically since they use Nuxt UI components that read CSS variables

### Two-Strategy Theme Application (`useThemeApply`)

- **Palette colors** → mutate `appConfig.ui.colors` (Nuxt UI's runtime plugin injects CSS vars)
- **Radius, font, token overrides** → generate CSS string and inject via `useHead({ style: [...] })`

This split exists because Nuxt UI only handles named color palette assignment at runtime, not arbitrary CSS variable overrides.

## Key Conventions

### Type System (`types/theme.ts`)

All selectable values are defined as `const` arrays with derived union types:

```ts
export const CHROMATIC_PALETTES = ["red", "orange", ...] as const;
export type ChromaticPalette = (typeof CHROMATIC_PALETTES)[number];
```

Always use these arrays for iteration in components and the types for props/params.

### Store Pattern (`stores/theme.ts`)

- **Setup store** syntax (not options API) with `defineStore("theme", () => { ... })`
- Every mutation calls `_pushHistory()` for undo/redo support
- State is persisted to localStorage via `pinia-plugin-persistedstate` (picks `config` and `savedPresets`)
- Use `cloneTheme()` (JSON deep clone) when copying `ThemeConfig` to avoid reference sharing

### Component Conventions

- **Editor components** use `modelValue` / `update:modelValue` pattern — they don't access the store directly; the parent (`ThemeEditor.vue`) wires props ↔ store actions
- **Preview components** are stateless templates — they render Nuxt UI components with semantic colors (`color="primary"`, etc.) and require no props
- Components are auto-imported with `pathPrefix: false` (see `nuxt.config.ts`), so use `<EditorColorPicker>` not `<editor-EditorColorPicker>`
- Icons use the **Lucide** icon set via `@iconify-json/lucide` (format: `i-lucide-icon-name`)
- CSS custom properties use Nuxt UI's `--ui-*` token names (e.g., `text-(--ui-text-muted)`, `var(--ui-border)`)

### Adding a New Preview Component

1. Create `app/components/preview/PreviewFoo.vue` — stateless, uses Nuxt UI components with semantic `color` props
2. Add `<PreviewFoo />` to `ThemePreview.vue` (separated by `<USeparator />`)

### Adding a New Theme Property

1. Add the field to `ThemeConfig` in `types/theme.ts`
2. Add a default value in `DEFAULT_THEME` (`utils/defaults.ts`)
3. Add a store action in `stores/theme.ts` (must call `_pushHistory()`)
4. Add CSS variable generation in `useThemeApply.ts` and `useThemeExport.ts`
5. Create or update an editor component, wired through `ThemeEditor.vue`

## Development

- **Package manager**: pnpm (enforced via `packageManager` field)
- **Dev server**: `pnpm dev` → `http://localhost:3000`
- **No test suite** currently exists
- **Fonts**: Registered in `nuxt.config.ts` `fonts.families` — must match `FONT_OPTIONS` in `types/theme.ts`
- **Keyboard shortcuts**: Ctrl+Z / Ctrl+Shift+Z for undo/redo (registered in `pages/index.vue`)
