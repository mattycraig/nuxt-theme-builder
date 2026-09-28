---
title: Use Your Exact Brand Hex Color in Nuxt UI
description: Turn one brand hex value into a full 50–950 palette and make it your Nuxt UI primary color, so buttons, links, and focus rings match your logo exactly.
category: theming
format: tip
date: "2026-09-27"
tags: ["colors", "branding", "custom-palette", "hex", "nuxt-ui"]
order: 11
featured: false
---

Nuxt UI semantic colors take a **palette name**, not a hex value. `primary: '#ff5a1f'` doesn't work, because every component needs the whole 50–950 scale for hover states, soft variants, and dark mode. To use your exact brand color, turn it into a palette first.

## 1. Define the palette

Add eleven `--color-<name>-*` variables to your main CSS file inside `@theme static`:

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --color-brand-50: #fff4ed;
  --color-brand-100: #ffe6d4;
  /* ... */
  --color-brand-500: #ff5a1f;
  /* ... */
  --color-brand-950: #431407;
}
```

`static` makes Tailwind emit the variables even though only Nuxt UI's runtime styles use them.

## 2. Assign it

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "brand",
    },
  },
});
```

## 3. Put your exact color on the main shade

By default `--ui-primary` points at shade 500 in light mode and 400 in dark mode. If your hex landed on a different shade, point the token at it:

```css
:root {
  --ui-primary: var(--ui-color-primary-600);
}
```

## Skip the manual work

Writing eleven shades that look right is the hard part. In the [Theme Builder](/), open **Custom Palettes**, click **New palette**, and paste your hex. It builds the scale around your color, places your exact value on the shade with the closest lightness, and makes that shade the main one when you assign the palette. The CSS export includes the `@theme static` block and the `--ui-primary` line.

Check the result with the [Contrast Checker](/tools/contrast-checker): bright brand colors such as yellow or lime often need a darker shade for text on white.

## Related

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors#brand-colors-with-custom-palettes) - the full color guide
- [Color Converter](/tools/color-converter) - convert your brand color between HEX, RGB, HSL, and OKLCH
