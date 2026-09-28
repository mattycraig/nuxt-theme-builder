---
title: Restyle One Nuxt UI Component Without Touching the Rest
description: Change a single Nuxt UI component everywhere with app.config.ts, or just once with the ui and class props, without breaking your theme colors.
category: components
format: tip
date: "2026-09-27"
tags: ["components", "app-config", "tailwind-variants", "ui-prop", "nuxt-ui"]
order: 13
featured: false
---

Your theme sets colors, radius, and font for every component. Sometimes one component still needs its own look, such as pill-shaped buttons or cards with more padding. Nuxt UI gives you three levels of control, from global to one-off.

## Every instance: app.config.ts

Each component's theme is a set of **slots** (named parts), **variants**, and **defaultVariants**. Override any of them under the component's key in `app.config.ts`, and your classes merge with the defaults:

```ts
export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: "rounded-full",
      },
      defaultVariants: {
        variant: "soft",
      },
    },
    card: {
      slots: {
        body: "p-6 sm:p-8",
      },
    },
  },
});
```

Slot names differ per component: a button has `base`, `label`, and `leadingIcon`, while a card has `root`, `header`, `body`, and `footer`. Each component's docs page lists them in its **Theme** section.

A few simple components use a flat `base` key instead of `slots`, for example `container: { base: "max-w-5xl" }`.

## One instance: the ui prop

The `ui` prop takes the same slot names and applies to that component only:

```vue
<UCard :ui="{ body: 'p-0' }">
  <img src="/cover.jpg" alt="" />
</UCard>
```

## One instance, root element: class

`class` goes on the root slot, which covers most quick tweaks:

```vue
<UButton class="rounded-none" label="Square button" />
```

## Keep it theme-aware

Stick to semantic utilities such as `bg-elevated`, `text-muted`, and `border-default` in your overrides. A hard-coded `bg-blue-500` ignores the theme, so it won't follow a palette change or dark mode.

Preview the result on the [Button](/components/button) or [Card](/components/card) page with your own theme loaded in the [Theme Builder](/).

## Related

- [Nuxt UI Component Styling Cheat Sheet](/learn/components/styling-cheat-sheet) - variants, colors, and sizes at a glance
- [Change the Border Radius Everywhere in Nuxt UI](/learn/theming/global-border-radius) - when every component should change at once
