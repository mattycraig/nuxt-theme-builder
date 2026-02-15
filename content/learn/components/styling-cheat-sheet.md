---
title: Nuxt UI Component Styling Cheat Sheet
description: Quick reference for customizing individual Nuxt UI v4 components using variants, colors, sizes, and theme tokens.
category: components
format: reference
date: "2026-02-14"
tags: ["components", "styling", "variants", "nuxt-ui", "cheat-sheet"]
order: 8
featured: false
---

A quick-reference guide for styling Nuxt UI v4 components. Every component follows the same patterns - learn them once, apply them everywhere.

## Universal Props

Most Nuxt UI components accept these styling props:

| Prop      | Type     | Description                                                                      |
| --------- | -------- | -------------------------------------------------------------------------------- |
| `color`   | `string` | Semantic color: `primary`, `secondary`, `success`, `warning`, `error`, `neutral` |
| `variant` | `string` | Visual style: `solid`, `outline`, `soft`, `subtle`, `ghost`, `link`              |
| `size`    | `string` | Size scale: `xs`, `sm`, `md`, `lg`, `xl`                                         |
| `class`   | `string` | Tailwind classes for the root element                                            |
| `ui`      | `object` | Override internal component styles                                               |

## Button Variants

```vue
<!-- Solid: filled background, white text -->
<UButton label="Save" color="primary" variant="solid" />

<!-- Outline: transparent bg, colored border and text -->
<UButton label="Cancel" color="neutral" variant="outline" />

<!-- Soft: light colored background, colored text -->
<UButton label="Info" color="primary" variant="soft" />

<!-- Subtle: very light tint, colored text -->
<UButton label="Details" color="primary" variant="subtle" />

<!-- Ghost: transparent, colored text, hover background -->
<UButton label="Skip" color="neutral" variant="ghost" />

<!-- Link: no background or border, underline on hover -->
<UButton label="Learn more" color="primary" variant="link" />
```

## Alert Variants

```vue
<UAlert
  title="Success!"
  color="success"
  variant="soft"
  icon="i-lucide-check-circle"
/>
<UAlert
  title="Warning"
  color="warning"
  variant="outline"
  icon="i-lucide-alert-triangle"
/>
<UAlert title="Error" color="error" variant="solid" icon="i-lucide-x-circle" />
```

## Badge Styling

```vue
<UBadge label="New" color="primary" variant="solid" />
<UBadge label="Draft" color="neutral" variant="outline" />
<UBadge label="Active" color="success" variant="soft" />
<UBadge label="2" color="error" variant="subtle" size="xs" />
```

## Input Customization

```vue
<!-- Standard input with icon -->
<UInput placeholder="Search..." icon="i-lucide-search" size="md" />

<!-- Input with custom colors (uses theme primary) -->
<UInput placeholder="Email" color="primary" variant="outline" />

<!-- Input with validation error state -->
<UFormField label="Email" :error="'Invalid email address'">
  <UInput placeholder="you@example.com" />
</UFormField>
```

## Card Styling

```vue
<UCard class="shadow-sm">
  <template #header>
    <h3 class="text-lg font-semibold">Card Title</h3>
  </template>
  <p>Card content goes here.</p>
  <template #footer>
    <div class="flex justify-end gap-2">
      <UButton label="Cancel" variant="ghost" color="neutral" />
      <UButton label="Save" variant="solid" color="primary" />
    </div>
  </template>
</UCard>
```

## The `ui` Prop for Deep Customization

Every component's internal elements can be styled via the `ui` prop:

```vue
<UButton
  label="Custom Button"
  :ui="{
    base: 'font-bold tracking-wide uppercase',
  }"
/>
```

The `ui` prop keys vary per component. Check the Nuxt UI docs for each component's available slots.

## Theming with `app.config.ts`

Global component defaults can be set in your app config:

```ts
export default defineAppConfig({
  ui: {
    button: {
      defaultVariant: "solid",
      defaultSize: "md",
    },
  },
});
```

## Color Hierarchy Pattern

A recommended approach for consistent component coloring:

```
Primary actions    → color="primary"   variant="solid"
Secondary actions  → color="primary"   variant="outline"
Tertiary actions   → color="neutral"   variant="ghost"
Info/hints         → color="primary"   variant="soft"
Success feedback   → color="success"   variant="soft"
Warning feedback   → color="warning"   variant="soft"
Error feedback     → color="error"     variant="soft"
Destructive action → color="error"     variant="solid"
```

## Size Scale Reference

| Size | Height | Font | Padding  | Use Case                     |
| ---- | ------ | ---- | -------- | ---------------------------- |
| `xs` | 24px   | 12px | compact  | Inline badges, tight UIs     |
| `sm` | 32px   | 13px | snug     | Secondary actions, toolbars  |
| `md` | 36px   | 14px | normal   | Default for most contexts    |
| `lg` | 40px   | 15px | relaxed  | Primary CTAs, forms          |
| `xl` | 44px   | 16px | generous | Hero sections, landing pages |

## Preview Components with Your Theme

The [Nuxt UI Theme Builder](/) renders every component variant with your active theme. Change a color, see it update across all buttons, alerts, badges, and inputs instantly.

## Next Steps

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) - define your color palette
- [Building a Design System with Nuxt UI](/learn/best-practices/design-system-guide) - establish consistent patterns
- [Tailwind CSS v4 Theming: What Changed](/learn/tailwind/tailwind-v4-theming) - understand the styling engine
