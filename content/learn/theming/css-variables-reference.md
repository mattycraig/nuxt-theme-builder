---
title: CSS Variables Reference for Nuxt UI Themes
description: Complete reference of CSS custom properties (design tokens) used by Nuxt UI v4 for colors, radius, typography, and spacing.
category: theming
format: reference
date: "2026-02-14"
tags: ["css-variables", "tokens", "design-tokens", "nuxt-ui", "tailwind"]
order: 4
featured: false
---

Nuxt UI v4 exposes its design system through CSS custom properties (variables). These tokens control colors, border radius, typography, and more — and you can override any of them for fine-grained theming.

## Color Variables

Every semantic color role generates a set of shade variables:

```css
/* Primary color shades */
--ui-color-primary-50: /* ... */;
--ui-color-primary-100: /* ... */;
--ui-color-primary-200: /* ... */;
--ui-color-primary-300: /* ... */;
--ui-color-primary-400: /* ... */;
--ui-color-primary-500: /* ... */;
--ui-color-primary-600: /* ... */;
--ui-color-primary-700: /* ... */;
--ui-color-primary-800: /* ... */;
--ui-color-primary-900: /* ... */;
--ui-color-primary-950: /* ... */;
```

The same pattern applies to `secondary`, `success`, `warning`, `error`, and `neutral`.

## Overriding Color Shades

To override a specific shade, set the variable in your CSS:

```css
:root {
  /* Override primary-500 with a custom brand color */
  --ui-color-primary-500: oklch(0.585 0.233 277.117);
}

/* Dark mode overrides */
.dark {
  --ui-color-primary-500: oklch(0.705 0.213 265.117);
}
```

Use OKLCH color values for perceptual uniformity across shades.

## Border Radius Variables

Nuxt UI uses a radius scale that components reference for consistent rounding:

```css
:root {
  --ui-radius: 0.375rem; /* Base radius (md) */
}
```

Available radius values map to Tailwind's scale:

| Value  | Token      | Pixels        |
| ------ | ---------- | ------------- |
| `none` | `0`        | 0px           |
| `xs`   | `0.125rem` | 2px           |
| `sm`   | `0.25rem`  | 4px           |
| `md`   | `0.375rem` | 6px           |
| `lg`   | `0.5rem`   | 8px           |
| `xl`   | `0.75rem`  | 12px          |
| `2xl`  | `1rem`     | 16px          |
| `full` | `9999px`   | Fully rounded |

## Typography Variables

Font family tokens control the typeface across the entire UI:

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

Override these to apply your chosen font pairing.

## Using Variables in Your CSS

You can reference these tokens in your own components:

```css
.custom-card {
  background-color: var(--ui-color-primary-50);
  border: 1px solid var(--ui-color-primary-200);
  border-radius: var(--ui-radius);
  font-family: var(--font-sans);
}

.dark .custom-card {
  background-color: var(--ui-color-primary-950);
  border-color: var(--ui-color-primary-800);
}
```

## Using Variables in Tailwind Classes

Tailwind CSS v4 can consume CSS variables directly:

```html
<div
  class="bg-(--ui-color-primary-50) border border-(--ui-color-primary-200) rounded-(--ui-radius)"
>
  Content
</div>
```

## Variable Naming Convention

All Nuxt UI variables follow a consistent pattern:

```
--ui-{category}-{role}-{shade}
--ui-{property}
```

Examples:

- `--ui-color-primary-500` — primary color, shade 500
- `--ui-color-neutral-100` — neutral color, shade 100
- `--ui-radius` — base border radius
- `--ui-bg` — background color token

## Export Variables from the Theme Builder

The [Nuxt UI Theme Builder](/) can export your entire theme as CSS variables. Use the **CSS** export format to get a ready-to-paste stylesheet with all your customizations.

## Next Steps

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) — configure color roles
- [Nuxt UI Color Palette Reference](/learn/theming/color-palette-reference) — browse available palettes
- [Tailwind CSS v4 Theming: What Changed](/learn/tailwind/tailwind-v4-theming) — understand the new variable-based system
