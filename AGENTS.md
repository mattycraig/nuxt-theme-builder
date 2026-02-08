# AGENTS.md

## Project Overview

**Nuxt UI Theme Builder** is a single-page Nuxt 4 application for visually configuring Nuxt UI v4 design tokens (semantic colors, neutral palette, border radius, font family, and per-mode shade overrides) and exporting the result as `app.config.ts`, CSS, or JSON.

**Stack:** Nuxt 4, Nuxt UI v4, Pinia (persisted state), Tailwind CSS v4, VueUse, TypeScript, Lucide icons.

**Architecture:** Editor sidebar + live preview pane. All theme state lives in a single Pinia setup store (`stores/theme.ts`). Two composables handle DOM application (`useThemeApply`) and export generation (`useThemeExport`). Preview components are stateless Nuxt UI showcases that react to CSS variable changes automatically.

```
app/
├── pages/                    # Route pages (index.vue is the main editor)
├── stores/theme.ts           # Pinia setup store — single source of truth, undo/redo, presets
├── composables/
│   ├── useThemeApply.ts      # Applies store → DOM (appConfig colors + useHead CSS injection)
│   └── useThemeExport.ts     # Generates export strings + import/share helpers
├── types/theme.ts            # All type definitions and const arrays
├── utils/
│   ├── defaults.ts           # DEFAULT_THEME, token defaults, hex maps, shadeToCSS(), cloneTheme()
│   └── presets.ts            # BUILT_IN_PRESETS array
├── components/
│   ├── editor/               # Sidebar controls (pickers, sliders, selectors)
│   └── preview/              # Stateless Nuxt UI component showcases
├── layouts/                  # default.vue and preview.vue
└── assets/css/main.css       # Tailwind CSS v4 + Nuxt UI imports
```

## Setup Commands

```bash
# Install dependencies (pnpm is required — enforced via packageManager field)
pnpm install

# Start development server on http://localhost:3000
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Generate static site
pnpm generate
```

## Development Workflow

- **Package manager:** pnpm (enforced via `packageManager` field in `package.json`). Do not use npm or yarn.
- **Dev server:** `pnpm dev` starts Nuxt on `http://localhost:3000` with hot-reload.
- **No `.env` file** is required. There are no environment variables or secrets.
- **No test suite** currently exists. Tests may be added in the future using Vitest and Playwright.
- **Keyboard shortcuts:** Ctrl+Z / Ctrl+Shift+Z for undo/redo (registered in `pages/index.vue`).
- **Preview mode:** Appending `?preview` to any route URL switches to the `preview` layout (used for iframe embedding).

## Code Style

### TypeScript Conventions

- **Strict mode** via Nuxt's generated tsconfig. All code is TypeScript.
- **Const arrays + derived union types** for all selectable values:
  ```ts
  export const CHROMATIC_PALETTES = ["red", "orange", ...] as const;
  export type ChromaticPalette = (typeof CHROMATIC_PALETTES)[number];
  ```
- Always iterate over the const arrays in components; use the derived types for function params and props.

### Vue / Nuxt Conventions

- **Composition API** with `<script setup lang="ts">` exclusively. No Options API.
- **Auto-imports:** Components, composables, and utilities are auto-imported. Components use `pathPrefix: false`, so write `<EditorColorPicker>` not `<editor-EditorColorPicker>`.
- **Editor components** follow the `modelValue` / `update:modelValue` pattern. They do not access the store directly; the parent `ThemeEditor.vue` wires props to store actions.
- **Preview components** are stateless. They render Nuxt UI components with semantic `color` props (e.g., `color="primary"`) and require no props.
- **Icons:** Lucide icon set via `@iconify-json/lucide`. Format: `i-lucide-icon-name`.
- **CSS custom properties** use Nuxt UI's `--ui-*` token names (e.g., `text-(--ui-text-muted)`, `var(--ui-border)`).

### CSS / Tailwind

- Tailwind CSS v4 with `@import "tailwindcss"` and `@import "@nuxt/ui"` in `assets/css/main.css`.
- Use Tailwind utility classes. Custom CSS should be minimal and only for things Tailwind cannot express.

### Store Pattern

- **Setup store** syntax: `defineStore("theme", () => { ... })`.
- Every mutation must call `_pushHistory()` for undo/redo support.
- State is persisted to localStorage via `pinia-plugin-persistedstate` (picks `config` and `savedPresets`).
- Use `cloneTheme()` (JSON deep clone) when copying `ThemeConfig` to avoid reference sharing.

## Architecture: Two-Strategy Theme Application

The `useThemeApply` composable uses two strategies because Nuxt UI only handles named color palette assignment at runtime:

1. **Palette colors** (primary, secondary, etc.) → mutate `useAppConfig().ui.colors` directly. Nuxt UI's runtime plugin injects the corresponding CSS variables automatically.
2. **Radius, font, token overrides** → generate a CSS string and inject it via `useHead({ style: [...] })` as a computed value.

When modifying theme application logic, maintain this split. Do not try to force token overrides through `appConfig`.

## Common Tasks

### Adding a New Preview Component

1. Create `app/components/preview/PreviewFoo.vue` — stateless, uses Nuxt UI components with semantic `color` props.
2. Add `<PreviewFoo />` to `ThemePreview.vue` (separated by `<USeparator />`).

### Adding a New Theme Property

1. Add the field to `ThemeConfig` in `types/theme.ts`.
2. Add a default value in `DEFAULT_THEME` in `utils/defaults.ts`.
3. Add a store action in `stores/theme.ts` (must call `_pushHistory()`).
4. Add CSS variable generation in `useThemeApply.ts` (DOM application) and `useThemeExport.ts` (export output).
5. Create or update an editor component, wired through `ThemeEditor.vue`.

### Adding a New Built-In Preset

1. Add a new entry to the `BUILT_IN_PRESETS` array in `utils/presets.ts`.
2. Provide a complete `ThemeConfig` object — use spread from `DEFAULT_LIGHT_OVERRIDES` and `DEFAULT_DARK_OVERRIDES` for token overrides unless customizing them.

### Adding a New Font

1. Register the font in `nuxt.config.ts` under `fonts.families`.
2. Add the font name to the `FONT_OPTIONS` array in `types/theme.ts`.

## Key Files Reference

| File                                      | Purpose                                                     |
| ----------------------------------------- | ----------------------------------------------------------- |
| `app/types/theme.ts`                      | All type definitions, const arrays, and interfaces          |
| `app/stores/theme.ts`                     | Pinia store: state, undo/redo, mutations, presets           |
| `app/composables/useThemeApply.ts`        | Reactively syncs store → DOM                                |
| `app/composables/useThemeExport.ts`       | Generates export formats + import/share                     |
| `app/utils/defaults.ts`                   | Default theme values, shade mappings, clone helper          |
| `app/utils/presets.ts`                    | Built-in preset definitions                                 |
| `app/components/editor/ThemeEditor.vue`   | Main editor container — wires all editor sub-components     |
| `app/components/preview/ThemePreview.vue` | Main preview container — renders all preview sub-components |
| `app/pages/index.vue`                     | Main page — wires editor + preview via UDashboardGroup      |
| `app/app.config.ts`                       | Initial Nuxt UI color configuration                         |
| `nuxt.config.ts`                          | Nuxt modules, fonts, components, Vite config                |

## Debugging and Troubleshooting

- **Theme not applying:** Check that `useThemeApply()` is called exactly once in `pages/index.vue`. Verify the store `config` ref is reactive and `watchEffect` triggers.
- **Colors not changing:** Ensure `appConfig.ui.colors` is being mutated, not replaced. Nuxt UI's reactivity depends on property-level mutation.
- **CSS variable overrides not visible:** Check the injected `<style>` tag in browser DevTools (look for the `useHead` injected style). Verify `shadeToCSS()` returns the correct CSS value.
- **Fonts not loading:** Confirm the font is registered in both `nuxt.config.ts` `fonts.families` and `FONT_OPTIONS` in `types/theme.ts`.
- **Undo/redo broken:** Every store action that modifies `config` must call `_pushHistory()`. If a new action was added without this call, undo/redo will skip that change.
- **LocalStorage stale state:** Clear `theme` key from localStorage if persisted state causes issues after schema changes. The store uses `pinia-plugin-persistedstate`.
- **Preview mode:** Add `?preview` query param to see the preview layout without the editor sidebar. Used for iframe embedding on other pages.

## PR Guidelines

- Title format: `[component] Brief description` (e.g., `[editor] Add shadow token picker`).
- Run `pnpm build` before submitting to verify no build errors.
- Keep editor components focused — one picker/selector per file.
- Preview components must remain stateless (no store access, no props).
- Every store mutation must maintain undo/redo support via `_pushHistory()`.

## Additional Notes

- There is no backend, API, or database. This is a fully client-side application.
- State persistence is via `localStorage` only.
- The app supports light and dark mode via Nuxt UI's built-in color mode. Token overrides are separate for each mode.
- Multiple page routes exist (`blog.vue`, `dashboard.vue`, `pricing.vue`, etc.) as preview pages that demonstrate the theme in different UI contexts.
