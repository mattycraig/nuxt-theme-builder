---
title: Building a Design System with Nuxt UI
description: How to build a consistent, scalable design system for your Nuxt application using Nuxt UI v4 design tokens, theme configuration, and component conventions.
category: best-practices
format: guide
date: "2026-02-14"
tags: ["design-system", "tokens", "consistency", "nuxt-ui", "architecture"]
order: 5
featured: true
---

A design system is more than a component library — it's a shared language of design decisions. Nuxt UI v4 provides the building blocks. The Theme Builder helps you define and preview those decisions visually.

This guide covers how to establish a coherent design system using Nuxt UI's token architecture.

## What Makes a Design System

A design system consists of:

1. **Design tokens** — Color palettes, spacing, radius, typography
2. **Component library** — Pre-built, themed UI components
3. **Conventions** — Rules for how tokens and components are combined
4. **Documentation** — Living references for developers and designers

Nuxt UI handles #1 and #2. Your job is #3 and #4.

## Step 1: Define Your Token Foundation

Start with the core decisions that affect every page:

### Colors

Choose your semantic palette mapping:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      secondary: "sky",
      success: "emerald",
      warning: "amber",
      error: "rose",
      neutral: "slate",
    },
  },
});
```

**Decision to document**: Why these palettes? What brand values do they represent?

### Border Radius

Pick a radius strategy:

| Strategy | Value          | Character                      |
| -------- | -------------- | ------------------------------ |
| Sharp    | `none` or `xs` | Technical, precise, editorial  |
| Soft     | `md` or `lg`   | Friendly, modern, approachable |
| Round    | `xl` or `2xl`  | Playful, casual, consumer      |
| Full     | `full`         | Pill buttons, tags, avatars    |

Consistency matters more than the specific value. Choose one strategy and apply it everywhere.

### Typography

Select font pairings that support your content:

| Content Type          | Recommended Pairing         |
| --------------------- | --------------------------- |
| **SaaS Dashboard**    | Inter / JetBrains Mono      |
| **Marketing Site**    | Plus Jakarta Sans / DM Mono |
| **Documentation**     | DM Sans / Fira Code         |
| **Creative / Agency** | Space Grotesk / Space Mono  |

## Step 2: Establish Component Conventions

With tokens defined, establish rules for how components use them:

### Button Hierarchy

Define which button variant serves each purpose:

| Purpose           | Variant   | Color     |
| ----------------- | --------- | --------- |
| Primary CTA       | `solid`   | `primary` |
| Secondary action  | `outline` | `primary` |
| Tertiary / cancel | `ghost`   | `neutral` |
| Destructive       | `solid`   | `error`   |
| Link-style        | `link`    | `primary` |

### Alert / Feedback Colors

Map feedback colors consistently:

| State       | Color Role | Icon                      |
| ----------- | ---------- | ------------------------- |
| Information | `primary`  | `i-lucide-info`           |
| Success     | `success`  | `i-lucide-check-circle`   |
| Warning     | `warning`  | `i-lucide-alert-triangle` |
| Error       | `error`    | `i-lucide-x-circle`       |

### Spacing Scale

Use Tailwind's spacing scale consistently. Pick a base unit and stick to multiples:

| Context               | Spacing        |
| --------------------- | -------------- |
| Between related items | `gap-2` (8px)  |
| Between sections      | `gap-6` (24px) |
| Page padding          | `px-4 md:px-8` |
| Card padding          | `p-4 md:p-6`   |

## Step 3: Document and Share

A design system only works if it's documented and accessible:

1. **Use the Theme Builder** to visualize and iterate on token choices
2. **Export your theme** configuration as the source of truth
3. **Create a living style guide** by linking to your Theme Builder preview
4. **Write conventions** as markdown — button rules, spacing guidelines, color usage

## Step 4: Maintain Consistency

As your app grows:

- **Audit regularly** — check new pages against your token foundation
- **Use theme presets** — save named presets in the Theme Builder for different brands or modes
- **Enforce in code review** — catch deviations from established patterns
- **Update the system** — add new tokens/conventions as needs evolve

## Common Pitfalls

| Pitfall             | Solution                                         |
| ------------------- | ------------------------------------------------ |
| One-off colors      | Always use semantic roles, never hard-coded hex  |
| Inconsistent radius | Set once in config, don't override per-component |
| Mixed font stacks   | Choose one sans + one mono, apply via tokens     |
| Skipping dark mode  | Design both modes from the start                 |

## Try It

Use the [Nuxt UI Theme Builder](/) to define your token foundation visually, preview it across 125+ components, and export the configuration. It's the fastest way to bootstrap a design system for any Nuxt UI project.

## Next Steps

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) — configure your color foundation
- [Typography & Font Pairing for Nuxt Apps](/learn/theming/typography-font-pairing) — choose and apply fonts
- [Accessible Color Contrast in Web Themes](/learn/best-practices/accessible-color-contrast) — ensure your system meets WCAG
