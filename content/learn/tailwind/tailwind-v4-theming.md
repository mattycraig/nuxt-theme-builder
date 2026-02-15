---
title: "Tailwind CSS v4 Theming: What Changed"
description: Key differences in Tailwind CSS v4's theming system compared to v3, including the shift to CSS variables, OKLCH color space, and new configuration patterns.
category: tailwind
format: guide
date: "2026-02-14"
tags: ["tailwind", "tailwind-v4", "migration", "css-variables", "theming"]
order: 6
featured: true
---

# Tailwind CSS v4 Theming: What Changed

Tailwind CSS v4 fundamentally changed how theming works. If you're upgrading from v3 or starting fresh, understanding these changes is essential — especially for Nuxt UI projects.

## The Big Shift: CSS-First Configuration

### Tailwind v3: JavaScript Config

```js
// tailwind.config.js (v3)
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#6366f1",
          600: "#4f46e5",
        },
      },
      borderRadius: {
        DEFAULT: "0.375rem",
      },
    },
  },
};
```

### Tailwind v4: CSS Config

```css
/* app.css (v4) */
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(0.585 0.233 277.117);
  --color-brand-600: oklch(0.518 0.233 278.117);
  --radius-default: 0.375rem;
}
```

The `@theme` directive replaces `tailwind.config.js` for most use cases. Configuration lives alongside your styles in CSS.

## Key Differences

### 1. Native CSS Variables

Every theme value in v4 becomes a CSS custom property. This means:

- **Runtime theming** — change values with JavaScript without rebuilding
- **Media query adaptation** — use `@media (prefers-color-scheme: dark)` directly
- **Component-scoped overrides** — override variables at any DOM level

```css
@theme {
  --color-primary: oklch(0.585 0.233 277.117);
}

/* Override for a specific section */
.promo-section {
  --color-primary: oklch(0.7 0.25 330);
}
```

### 2. OKLCH Color Space

Tailwind v4 uses OKLCH instead of HSL or hex. OKLCH provides:

- **Perceptual uniformity** — equal lightness steps look equally bright
- **Wider gamut** — access more vivid colors on modern displays
- **Better dark mode** — adjusting lightness produces natural results

```css
/* OKLCH format: oklch(lightness chroma hue) */
--color-primary-500: oklch(0.585 0.233 277.117);
--color-primary-600: oklch(0.518 0.233 278.117);
```

### 3. No More `tailwind.config.js` (For Most Cases)

The JavaScript config file is optional in v4. Basic theming, colors, fonts, and spacing are all handled in CSS:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --color-primary-500: oklch(0.585 0.233 277.117);
  --radius-lg: 0.5rem;
}
```

### 4. Simplified Dark Mode

With CSS variables, dark mode is just another variable assignment:

```css
@theme {
  --color-bg: white;
  --color-text: oklch(0.15 0 0);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: oklch(0.15 0 0);
    --color-text: oklch(0.9 0 0);
  }
}
```

### 5. New Color Syntax in Utilities

Tailwind v4 introduces a new syntax for referencing CSS variables in utility classes:

```html
<!-- v4 variable reference syntax -->
<div class="bg-(--color-primary-500) text-(--color-text)">Content</div>
```

## What This Means for Nuxt UI

Nuxt UI v4 fully embraces these changes:

- **Semantic color roles** (`primary`, `secondary`, etc.) are mapped to CSS variables
- **Theme configuration** in `app.config.ts` sets palette names, and Nuxt UI generates the CSS variables
- **The Theme Builder** outputs CSS variable overrides compatible with Tailwind v4's system

Your workflow:

1. Define color roles in `app.config.ts` (palette names)
2. Override specific shades with CSS variables if needed
3. Tailwind v4 utilities automatically use the correct values

## Migration Checklist

If upgrading from Tailwind v3:

- [ ] Replace `tailwind.config.js` color definitions with `@theme` in CSS
- [ ] Convert hex/HSL colors to OKLCH
- [ ] Move custom fonts from JS config to CSS `@theme`
- [ ] Update custom utility references to use `(--var)` syntax where needed
- [ ] Test dark mode with the new variable-based approach

## Try the New System

The [Nuxt UI Theme Builder](/) generates Tailwind v4-compatible output. Configure your theme visually, then export as CSS variables that slot directly into your `@theme` block.

## Next Steps

- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) — complete variable list
- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) — configure colors the Nuxt UI way
- [Nuxt UI Component Styling Cheat Sheet](/learn/components/styling-cheat-sheet) — style individual components
