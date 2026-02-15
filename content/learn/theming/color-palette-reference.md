---
title: Nuxt UI Color Palette Reference
description: Complete reference of all available color palettes in Nuxt UI v4, with shade values, usage guidance, and pairing recommendations.
category: theming
format: reference
date: "2026-02-14"
tags: ["colors", "palette", "reference", "nuxt-ui", "tailwind"]
order: 3
featured: false
---

Nuxt UI v4 builds on Tailwind CSS v4's color system. Every palette includes 11 shades (50–950) designed to work together across light and dark modes.

This reference covers all available palettes and how to choose them for your theme.

## Available Palettes

### Red Tones

| Palette   | Character       | Best For                                    |
| --------- | --------------- | ------------------------------------------- |
| `red`     | Pure, vivid red | Error states, alerts, destructive actions   |
| `rose`    | Pink-tinted red | Error states with warmth, feminine branding |
| `pink`    | True pink       | Playful brands, creative apps               |
| `fuchsia` | Vivid magenta   | Bold accent, creative tools                 |

### Orange & Yellow Tones

| Palette  | Character     | Best For                           |
| -------- | ------------- | ---------------------------------- |
| `orange` | Pure orange   | Warning states, energy, enthusiasm |
| `amber`  | Warm golden   | Warnings, premium/gold accents     |
| `yellow` | Bright yellow | Caution indicators, highlights     |
| `lime`   | Yellow-green  | Fresh, energetic, nature-tech      |

### Green Tones

| Palette   | Character  | Best For                            |
| --------- | ---------- | ----------------------------------- |
| `green`   | Pure green | Success states, positive indicators |
| `emerald` | Rich green | Success states, finance, growth     |
| `teal`    | Blue-green | Secondary accents, health, wellness |

### Blue Tones

| Palette  | Character        | Best For                              |
| -------- | ---------------- | ------------------------------------- |
| `sky`    | Light blue       | Backgrounds, info states, calm UI     |
| `blue`   | Pure blue        | Links, primary actions, trust         |
| `indigo` | Deep blue-violet | Primary brand, professional apps      |
| `violet` | Purple-blue      | Creative, tech, secondary accent      |
| `cyan`   | Bright cyan      | Info states, tech, data visualization |

### Purple Tones

| Palette   | Character     | Best For                  |
| --------- | ------------- | ------------------------- |
| `purple`  | True purple   | Premium, creative, luxury |
| `fuchsia` | Vivid magenta | Bold accent, art, fashion |

### Neutral Tones

Neutrals are special — they define your text, borders, backgrounds, and surface hierarchy:

| Palette   | Temperature | Character                           |
| --------- | ----------- | ----------------------------------- |
| `slate`   | Cool        | Blue undertone — technical, modern  |
| `gray`    | Balanced    | Slight warmth — versatile           |
| `zinc`    | Neutral     | No color cast — clean, minimal      |
| `neutral` | True gray   | Mathematically neutral — stark      |
| `stone`   | Warm        | Brown undertone — friendly, organic |

## Shade Scale

Each palette provides these shades:

| Shade | Light Mode Usage      | Dark Mode Usage      |
| ----- | --------------------- | -------------------- |
| `50`  | Tinted backgrounds    | —                    |
| `100` | Hover backgrounds     | —                    |
| `200` | Borders, dividers     | —                    |
| `300` | Disabled text         | —                    |
| `400` | Placeholder text      | Primary text accents |
| `500` | Icons, secondary text | Primary shade        |
| `600` | **Primary shade**     | Hover states         |
| `700` | Hover states          | Borders              |
| `800` | —                     | Surface backgrounds  |
| `900` | —                     | Elevated surfaces    |
| `950` | —                     | Base backgrounds     |

## Choosing Palettes for Semantic Roles

Map each semantic role to a palette that communicates the right intent:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "indigo", // Brand identity
      secondary: "violet", // Supporting accent
      success: "emerald", // Positive feedback
      warning: "amber", // Caution states
      error: "rose", // Error / destructive
      neutral: "zinc", // Text, borders, surfaces
    },
  },
});
```

## Palette Pairing Guidelines

**Rule of thumb**: pair palettes that are **adjacent** on the color wheel for harmony, or **complementary** for contrast.

### High Harmony (Adjacent)

- `blue` + `indigo` + `slate`
- `emerald` + `teal` + `stone`
- `violet` + `purple` + `zinc`

### High Contrast (Complementary)

- `indigo` + `amber`
- `emerald` + `rose`
- `blue` + `orange`

### Monochromatic (Single Hue)

- `blue` primary + `sky` secondary + `slate` neutral
- `violet` primary + `purple` secondary + `zinc` neutral

## Try Interactive Palette Selection

The [Nuxt UI Theme Builder](/) lets you preview every palette applied to real components in real time. Select a palette, see it on 125+ components, and export when you're happy.

## Next Steps

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) — apply these palettes to your project
- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) — override individual shade values
