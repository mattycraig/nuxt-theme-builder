---
title: Typography & Font Pairing for Nuxt Apps
description: How to choose, pair, and apply fonts in Nuxt UI v4 applications using Nuxt Fonts and CSS variables for cohesive typography.
category: theming
format: guide
date: "2026-02-14"
tags: ["typography", "fonts", "font-pairing", "nuxt-ui", "design"]
order: 9
featured: false
---

Typography sets the tone of your application before a single word is read. The right font pairing communicates professionalism, friendliness, or creativity - the wrong one creates visual noise.

Nuxt UI v4 uses CSS variables for font families, making it straightforward to apply custom typography to your entire application.

## How Fonts Work in Nuxt UI

Nuxt UI references these CSS variables for typography:

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

Every Nuxt UI component that renders text uses `--font-sans`. Code blocks and monospace elements use `--font-mono`.

Override these variables to change the typeface globally - no need to modify individual components.

## Choosing a Font Strategy

### Option 1: System Fonts (Fastest)

Zero network requests, zero layout shift:

```css
:root {
  --font-sans: ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, "SF Mono", monospace;
}
```

Best for: performance-critical apps, utility tools, dashboards.

### Option 2: Single Web Font (Balanced)

One font family with variable weight:

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

Best for: most applications. Inter, DM Sans, or Geist are safe choices.

### Option 3: Font Pair (Expressive)

Distinct heading and body fonts:

```css
:root {
  --font-sans: "DM Sans", ui-sans-serif, sans-serif;
  --font-heading: "Space Grotesk", ui-sans-serif, sans-serif;
}
```

Best for: marketing sites, branded experiences, content-heavy pages.

## Recommended Font Pairings

Tested combinations that work well with Nuxt UI components:

### Sans-Serif Pairings

| Heading Font            | Body Font   | Character                 |
| ----------------------- | ----------- | ------------------------- |
| **Space Grotesk**       | DM Sans     | Modern, geometric, tech   |
| **Plus Jakarta Sans**   | Inter       | Professional, clean, SaaS |
| **Bricolage Grotesque** | Nunito      | Friendly, approachable    |
| **Sora**                | Public Sans | Minimal, startup          |
| **Urbanist**            | Lato        | Elegant, contemporary     |
| **Outfit**              | Work Sans   | Bold, editorial           |

### Serif + Sans Pairings

| Heading Font         | Body Font     | Character                 |
| -------------------- | ------------- | ------------------------- |
| **Playfair Display** | DM Sans       | Luxury, editorial         |
| **Lora**             | Inter         | Academic, trustworthy     |
| **DM Serif Display** | Public Sans   | Bold, premium             |
| **Source Serif 4**   | Source Sans 3 | Matching family, cohesive |
| **Merriweather**     | Open Sans     | Classic, readable         |

### Monospace Accents

For code-related apps or to add a technical accent:

| Primary       | Mono               | Character                  |
| ------------- | ------------------ | -------------------------- |
| Inter         | **JetBrains Mono** | Developer tools            |
| DM Sans       | **Fira Code**      | Code editors, terminals    |
| Geist         | **IBM Plex Mono**  | Technical documentation    |
| Space Grotesk | **Space Mono**     | Matching family, geometric |

## Loading Fonts in Nuxt

Nuxt Fonts (`@nuxt/fonts`) auto-detects and optimizes font loading. Define your fonts in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  fonts: {
    families: [
      { name: "Inter", provider: "google", global: true },
      { name: "JetBrains Mono", provider: "google", global: true },
    ],
  },
});
```

Then reference them in your CSS:

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

## Typography Best Practices

### Line Height

| Context   | Line Height | Example           |
| --------- | ----------- | ----------------- |
| Headings  | 1.1–1.3     | `leading-tight`   |
| Body text | 1.5–1.75    | `leading-relaxed` |
| UI labels | 1.25        | `leading-snug`    |

### Font Size Scale

Stick to a consistent type scale. Tailwind's default scale works well:

| Element         | Size | Class       |
| --------------- | ---- | ----------- |
| Display heading | 48px | `text-5xl`  |
| Page heading    | 30px | `text-3xl`  |
| Section heading | 24px | `text-2xl`  |
| Subheading      | 20px | `text-xl`   |
| Body            | 16px | `text-base` |
| Small / caption | 14px | `text-sm`   |
| Tiny / label    | 12px | `text-xs`   |

### Font Weight Usage

| Weight         | Purpose                  |
| -------------- | ------------------------ |
| 400 (regular)  | Body text                |
| 500 (medium)   | Labels, nav items        |
| 600 (semibold) | Subheadings, button text |
| 700 (bold)     | Headings, emphasis       |

## Preview Fonts in the Theme Builder

The [Nuxt UI Theme Builder](/) includes a font selector with 30+ pre-loaded Google Fonts. Select a font, see it applied to every component instantly, and export the configuration.

## Next Steps

- [Building a Design System with Nuxt UI](/learn/best-practices/design-system-guide) - encode typography rules into your system
- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) - pair fonts with the right colors
- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) - font-related CSS variables
