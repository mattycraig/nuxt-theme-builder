---
title: Migrating Your Nuxt UI Theme to v4
description: Move a Nuxt UI v2 or v3 theme to Nuxt UI v4 - color config, gray to neutral, Tailwind CSS v4 setup, component overrides, and the Nuxt UI Pro merge.
category: theming
format: guide
date: "2026-09-27"
tags: ["migration", "nuxt-ui-v4", "nuxt-ui-v3", "app-config", "tailwind-v4"]
order: 14
featured: true
---

How much work a theme migration takes depends on where you start. From **v3**, theming barely changes: v4 keeps the same color system and CSS variables, and the work is mostly the Nuxt UI Pro merge. From **v2**, the theming system itself changed, so expect to rewrite your color config and component overrides.

This guide covers the theming side of both paths. For every component and API change, read the official [Nuxt UI migration guide](https://ui.nuxt.com/docs/getting-started/migration).

## Before You Start

Nuxt UI v4 requires **Nuxt 4.1 or later** and Tailwind CSS v4. Upgrade Nuxt first, then install the new packages:

```bash
pnpm add @nuxt/ui tailwindcss
```

## From v3 to v4

### Nothing changes for colors and tokens

Your `ui.colors` config, the `--ui-*` CSS variables, and any `@theme` palettes carry over as they are.

### Nuxt UI Pro is now part of Nuxt UI

If you used Nuxt UI Pro, its components now ship in the free `@nuxt/ui` package:

1. Remove `@nuxt/ui-pro` and use `@nuxt/ui` in `modules`.
2. Change the CSS import:

```css
@import "tailwindcss";
@import "@nuxt/ui"; /* was "@nuxt/ui-pro" */
```

3. Move component overrides from the `uiPro` key into `ui`:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "green",
      neutral: "slate",
    },
    pageCard: {
      slots: {
        root: "rounded-xl",
      },
    },
  },
});
```

### Renamed components that affect overrides

If your `app.config.ts` overrides one of these, rename the key too:

| v3              | v4                                         |
| --------------- | ------------------------------------------ |
| `ButtonGroup`   | `FieldGroup` (`fieldGroup` key)            |
| `PageMarquee`   | `Marquee` (`marquee` key)                  |
| `PageAccordion` | Removed: use `Accordion` and its `ui` prop |

## From v2 to v4

### 1. Move to Tailwind CSS v4

Tailwind v4 drops `tailwind.config.js` in favor of CSS. Create a main stylesheet, add it to `css` in `nuxt.config.ts`, and run the official upgrade tool for the rest:

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";
```

```bash
npx @tailwindcss/upgrade
```

Custom colors that lived in `theme.extend.colors` become `--color-*` variables in an `@theme` block. See [Tailwind CSS v4 Theming: What Changed](/learn/tailwind/tailwind-v4-theming).

### 2. Move colors into ui.colors

v2 had `primary` and `gray` at the top level of `ui`. v3 and v4 group seven semantic colors under `colors`, and `gray` is now `neutral`:

```ts
// v2
export default defineAppConfig({
  ui: {
    primary: "green",
    gray: "cool",
  },
});

// v4
export default defineAppConfig({
  ui: {
    colors: {
      primary: "green",
      secondary: "blue",
      success: "green",
      info: "blue",
      warning: "yellow",
      error: "red",
      neutral: "slate",
    },
  },
});
```

You only need to list the colors you change; the values above are the defaults. Pick a `neutral` from the Tailwind gray scales (`slate`, `gray`, `zinc`, `neutral`, `stone`, and so on).

### 3. Replace raw colors in props and classes

- `color` props accept only semantic names now: `color="red"` becomes `color="error"`, and `gray`, `black`, and `white` become `neutral` with a matching variant.
- Replace `text-gray-500 dark:text-gray-400` pairs with design tokens such as `text-muted`, and `text-gray-900 dark:text-white` with `text-highlighted`. Tokens switch with color mode on their own, and your theme controls which shade each one uses.

### 4. Rewrite component overrides

Components are now styled with Tailwind Variants, so v2 override keys no longer apply. Target **slots** instead:

```ts
// v2
button: {
  font: "font-bold",
  default: { size: "md", color: "primary" },
}

// v4
button: {
  slots: { base: "font-bold" },
  defaultVariants: { size: "md", color: "primary" },
}
```

The same applies to the `ui` prop: `:ui="{ font: 'font-bold' }"` becomes `:ui="{ base: 'font-bold' }"`. Each component's docs page lists its slots under **Theme**. See [Restyle One Nuxt UI Component Without Touching the Rest](/learn/components/restyle-one-component) for the patterns.

## Rebuild the Theme Visually

A migration is a good moment to redo the theme rather than port it line by line. Load your old colors into the [Theme Builder](/), tune shades and separate dark-mode tokens, and export a v4-ready `app.config.ts` and CSS file. Or start from one of the [ready-made themes](/themes).

## Next Steps

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) - the v4 color system in depth
- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) - every token you can override
- [How to Export and Share Nuxt UI Themes](/learn/theming/export-and-share) - get the builder's output into your project
