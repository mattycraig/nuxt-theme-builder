---
title: How to Customize Nuxt UI Theme Colors
description: Learn how to configure semantic color palettes, per-role shades, and neutral tones in Nuxt UI v4 to match your brand identity.
category: theming
format: guide
date: "2026-02-14"
tags: ["colors", "palette", "branding", "nuxt-ui"]
order: 1
featured: true
---

# How to Customize Nuxt UI Theme Colors

Nuxt UI v4 uses a semantic color system built on top of Tailwind CSS v4. Instead of hard-coding hex values throughout your app, you define **color roles** — primary, secondary, success, warning, error — and Nuxt UI maps them across every component automatically.

This guide walks through the complete color customization workflow.

## Understanding the Semantic Color Model

Nuxt UI organizes colors into **roles**, each serving a distinct purpose:

| Role          | Purpose                       | Example Usage                         |
| ------------- | ----------------------------- | ------------------------------------- |
| **Primary**   | Main brand color, CTAs, links | Buttons, active states, links         |
| **Secondary** | Supporting accent             | Badges, highlights, secondary actions |
| **Success**   | Positive feedback             | Success alerts, confirmed states      |
| **Warning**   | Caution states                | Warning banners, pending indicators   |
| **Error**     | Destructive / error states    | Error messages, delete buttons        |
| **Neutral**   | Text, borders, backgrounds    | Body text, card borders, surfaces     |

Each role references a **Tailwind CSS color palette** (e.g., `indigo`, `emerald`, `rose`) and Nuxt UI automatically uses the correct shade for each context.

## Configuring Colors in app.config.ts

The simplest way to set your theme colors is through `app.config.ts`:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "indigo",
      secondary: "violet",
      success: "emerald",
      warning: "amber",
      error: "rose",
      neutral: "zinc",
    },
  },
});
```

This single configuration affects every Nuxt UI component — buttons, inputs, alerts, badges, and more — without any additional CSS.

## Choosing Palettes That Work Together

When selecting color palettes, consider:

1. **Contrast between primary and secondary** — they should be visually distinct so users can differentiate action hierarchy
2. **Neutral tone temperature** — warm neutrals (`stone`, `sand`) pair well with warm primaries; cool neutrals (`slate`, `zinc`) suit cooler palettes
3. **Accessibility** — ensure sufficient contrast ratios (4.5:1 for text, 3:1 for UI components) between your palette shades and backgrounds

### Popular Palette Combinations

| Style         | Primary   | Secondary | Neutral   |
| ------------- | --------- | --------- | --------- |
| **Corporate** | `blue`    | `indigo`  | `slate`   |
| **Startup**   | `violet`  | `pink`    | `zinc`    |
| **Nature**    | `emerald` | `teal`    | `stone`   |
| **Bold**      | `rose`    | `orange`  | `neutral` |
| **Minimal**   | `zinc`    | `sky`     | `gray`    |

## Per-Shade Overrides

For finer control, Nuxt UI allows overriding individual shades within a role. This is useful when your brand color doesn't perfectly align with a Tailwind palette:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "indigo",
    },
  },
});
```

Then in your CSS, override specific shades using CSS variables:

```css
:root {
  --ui-color-primary-500: oklch(0.585 0.233 277.117);
  --ui-color-primary-600: oklch(0.518 0.233 278.117);
}
```

## Light and Dark Mode Colors

One of the most powerful features is setting **independent colors per mode**. Your light theme might use a deep indigo primary while your dark theme uses a brighter variant:

The Theme Builder lets you configure light and dark mode independently — any color role can have a different palette in each mode.

## Try It in the Theme Builder

The [Nuxt UI Theme Builder](/) makes this entire process visual. Select palettes from dropdowns, see changes reflected across 125+ components in real time, and export the final configuration as `app.config.ts`, CSS variables, or JSON.

## Next Steps

- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) — full list of available design tokens
- [Dark Mode Theming with Nuxt UI](/learn/theming/dark-mode-guide) — deep dive into dual-mode theming
- [Nuxt UI Color Palette Reference](/learn/theming/color-palette-reference) — every available palette with previews
