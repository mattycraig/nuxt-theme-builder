---
title: "Nuxt UI vs shadcn-vue: How Theming Compares"
description: Compare how Nuxt UI v4 and shadcn-vue handle colors, dark mode, radius, and component customization, and when each approach fits your Vue or Nuxt project.
category: best-practices
format: guide
date: "2026-09-27"
tags: ["shadcn-vue", "comparison", "design-tokens", "css-variables", "nuxt-ui"]
order: 15
featured: false
---

Nuxt UI and shadcn-vue are both built on [Reka UI](https://reka-ui.com) and styled with Tailwind CSS, so their components behave alike. Where they differ is ownership: Nuxt UI is a library you install and configure, while shadcn-vue copies component source into your project for you to edit. That choice shapes how theming works in each.

## At a Glance

| Topic                 | Nuxt UI v4                                                 | shadcn-vue                                                    |
| --------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| Where components live | `node_modules`, updated with the package                   | Your repo (`components/ui`), updated by hand                  |
| Color model           | Semantic roles mapped to full 50–950 palettes              | One CSS variable per role, paired with a foreground           |
| Built-in roles        | primary, secondary, success, info, warning, error, neutral | primary, secondary, muted, accent, destructive, plus surfaces |
| Where colors are set  | `app.config.ts` (palette names) + CSS variables            | CSS variables in your main stylesheet                         |
| Dark mode             | Token defaults per mode, override under `.dark`            | Every variable redefined under `.dark`                        |
| Radius                | `--ui-radius`, scale multiplies it                         | `--radius`, smaller steps subtract from it                    |
| Per-component styling | `app.config.ts` slots, `ui` prop, `class`                  | Edit the component file                                       |

## Colors

**Nuxt UI** assigns each semantic role a whole Tailwind palette:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "indigo",
      neutral: "zinc",
    },
  },
});
```

Components then pick shades from that palette for each state: solid fills, soft backgrounds, hover, and focus rings. You get consistent variants for free, and you can shift the main shade (`--ui-primary`) per mode.

**shadcn-vue** defines one value per role, each paired with a text color that sits on it:

```css
/* shadcn-vue, zinc base color */
:root {
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
}
```

That gives exact control over every pairing, but you choose each value yourself and there's no ready-made success, warning, or info role.

## Dark Mode

Nuxt UI ships light and dark defaults for every token (`--ui-bg`, `--ui-text-muted`, `--ui-border`, and so on), so switching palettes gives a working dark mode immediately. You override only what you want to change under `.dark`.

shadcn-vue defines every variable a second time under `.dark`, and you tune both sets. It's more to maintain, and just as flexible. See [Dark Mode Theming with Nuxt UI](/learn/theming/dark-mode-guide) for the Nuxt UI side.

## Radius

Both use one base variable. Nuxt UI multiplies `--ui-radius` (buttons use 1.5x, cards 2x), so the scale grows proportionally. shadcn-vue treats `--radius` as the large step and subtracts fixed amounts for smaller ones (`calc(var(--radius) - 4px)` for small). Details in [Change the Border Radius Everywhere in Nuxt UI](/learn/theming/global-border-radius).

## Customizing Components

In shadcn-vue you open the copied `.vue` file and change its classes, since the component is yours. Upstream fixes don't arrive automatically, though.

In Nuxt UI you override the component's theme from `app.config.ts` and keep receiving updates:

```ts
export default defineAppConfig({
  ui: {
    button: {
      slots: { base: "rounded-full" },
    },
  },
});
```

## Which Fits Your Project

- **Choose Nuxt UI** for a large component set (125+) that follows one theme config, full palettes behind every role, and upgrades through your package manager. It fits Nuxt apps, dashboards, and docs sites that value speed and consistency.
- **Choose shadcn-vue** if you want to own and fork every component, prefer hand-tuned color pairs, or are building a design system that will diverge heavily from any default.

## Get the shadcn Look in Nuxt UI

Like the shadcn aesthetic but want Nuxt UI's component library? The [shadcn theme](/themes/shadcn) recreates it with zinc neutrals, a near-black primary in light mode and near-white in dark mode, and Geist. Load it in the [Theme Builder](/) and adjust from there.

## Next Steps

- [Building a Design System with Nuxt UI](/learn/best-practices/design-system-guide) - structure tokens for a whole product
- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) - the full color system
- [Restyle One Nuxt UI Component Without Touching the Rest](/learn/components/restyle-one-component) - overrides without forking
