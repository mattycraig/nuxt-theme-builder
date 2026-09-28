---
title: Change the Border Radius Everywhere in Nuxt UI
description: One CSS variable, --ui-radius, controls the corner rounding of every Nuxt UI component. Here's how the scale works and how to set it per color mode.
category: theming
format: tip
date: "2026-09-27"
tags: ["radius", "css-variables", "design-tokens", "nuxt-ui"]
order: 12
featured: false
---

You don't need to override `rounded-*` classes component by component. Nuxt UI derives its whole radius scale from one variable, `--ui-radius`, so a single line changes every button, input, card, and modal.

## Set it

```css
/* app/assets/css/main.css */
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  --ui-radius: 0.5rem;
}
```

The default is `0.25rem`. Use `0` for square corners.

## How the scale follows it

Nuxt UI redefines Tailwind's radius steps as multiples of `--ui-radius`:

| Utility       | Value                          | Used by (examples)      |
| ------------- | ------------------------------ | ----------------------- |
| `rounded-xs`  | `calc(var(--ui-radius) * 0.5)` | Small inner elements    |
| `rounded-sm`  | `var(--ui-radius)`             | Badges (small sizes)    |
| `rounded-md`  | `calc(var(--ui-radius) * 1.5)` | Buttons, inputs, badges |
| `rounded-lg`  | `calc(var(--ui-radius) * 2)`   | Cards                   |
| `rounded-xl`  | `calc(var(--ui-radius) * 3)`   |                         |
| `rounded-2xl` | `calc(var(--ui-radius) * 4)`   |                         |
| `rounded-3xl` | `calc(var(--ui-radius) * 6)`   |                         |

So with `--ui-radius: 0.5rem`, buttons get `0.75rem` corners and cards get `1rem`. Everything stays proportional, and your own markup follows the theme too as long as it uses these utilities.

## A different radius in dark mode

The variable is plain CSS, so you can override it under `.dark`:

```css
:root {
  --ui-radius: 0.25rem;
}

.dark {
  --ui-radius: 0.5rem;
}
```

## Try values visually

Radius is hard to judge from numbers. In the [Theme Builder](/), drag the **Border Radius** slider in the **Layout** section and watch [buttons](/components/button), [cards](/components/card), and full [templates](/templates) update. Light and dark mode each keep their own value, and the CSS export writes both.

## Related

- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) - every token you can override
- [Minimal theme](/themes/minimal) - a ready-made theme with zero radius
