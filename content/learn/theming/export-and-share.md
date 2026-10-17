---
title: How to Export and Share Nuxt UI Themes
description: Export your Nuxt UI v4 themes as app.config.ts, CSS variables, JSON, design tokens, or a standalone Tailwind theme - and share them with your team or the community.
category: theming
format: guide
date: "2026-02-14"
tags: ["export", "sharing", "app-config", "css", "json", "nuxt-ui"]
order: 10
featured: false
---

Once you've created a theme in the Nuxt UI Theme Builder, you need to get it into your project. The builder supports five export formats, each suited to different workflows.

## Export Formats

### 1. app.config.ts (Recommended)

The native Nuxt UI approach. Copy the generated config directly into your project:

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

**Best for**: Nuxt UI projects. This is the simplest and most maintainable approach.

**How to use**:

1. Open the Export panel in the Theme Builder
2. Select "App Config" format
3. Copy the generated code
4. Paste into your project's `app.config.ts`

### 2. CSS Variables

Exports all theme tokens as CSS custom properties:

```css
:root {
  --ui-color-primary-500: oklch(0.585 0.233 277.117);
  --ui-color-primary-600: oklch(0.518 0.233 278.117);
  /* ... all shades for all roles */
  --ui-radius: 0.375rem;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

.dark {
  --ui-color-primary-500: oklch(0.705 0.213 265.117);
  /* ... dark mode overrides */
}
```

If your theme uses custom palettes, the CSS export also starts with a `@theme static` block that defines them (`--color-brand-50` … `--color-brand-950`). Add it alongside the `app.config.ts` export, which refers to those palettes by name.

**Best for**: Projects that need fine-grained shade control, non-Nuxt UI projects using Tailwind v4, or when integrating with existing CSS architectures.

**How to use**:

1. Select "CSS" export format
2. Copy the output
3. Add to your main CSS file or a dedicated `theme.css`

### 3. JSON

Machine-readable format for programmatic consumption:

```json
{
  "colors": {
    "primary": "indigo",
    "secondary": "violet",
    "success": "emerald",
    "warning": "amber",
    "error": "rose",
    "neutral": "zinc"
  },
  "radius": "md",
  "fontFamily": "Inter"
}
```

**Best for**: Storing theme data, building theme APIs, sharing between tools, or version-controlling theme decisions.

### 4. Design Tokens

A `tokens.json` file in the W3C Design Tokens format (`$type` / `$value`), with a `light` and a `dark` group. Each holds the full 50–950 scale for every semantic color as Nuxt UI renders it, the neutral scale, the text, background, and border tokens, the radius scale, and the font stack:

```json
{
  "light": {
    "color": {
      "primary": {
        "DEFAULT": { "$type": "color", "$value": "#4f39f6" },
        "500": { "$type": "color", "$value": "#4f39f6" }
      }
    },
    "text": { "muted": { "$type": "color", "$value": "#71717b" } },
    "radius": { "md": { "$type": "dimension", "$value": "0.5625rem" } }
  }
}
```

**Best for**: Keeping Figma in sync through Tokens Studio (each mode imports as a token set), or generating platform files with Style Dictionary.

### 5. Standalone Tailwind Theme

A `tailwind.css` file for Tailwind CSS v4 projects that don't use Nuxt UI. It defines the same utilities Nuxt UI provides (`bg-primary`, `text-muted`, `bg-elevated`, `border-accented`, `rounded-md`) with literal colors, plus a `.dark` block for dark mode:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: #4f39f6;
  --text-color-muted: #71717b;
  --background-color-elevated: #f4f4f5;
  --radius-md: 0.5625rem;
}

.dark {
  --color-primary: #7c86ff;
}
```

**Best for**: Sharing one brand theme between a Nuxt UI app and a plain Tailwind site or design system.

## Saving and Managing Themes

### Save Presets

The Theme Builder lets you save multiple named presets locally:

1. Click **Save Theme** (or press `Ctrl+S`)
2. Enter a name for your preset
3. The preset is stored in your browser's localStorage

### Switch Between Presets

Saved presets appear in the preset selector. Click any preset to apply it instantly and preview across all components.

### Import Themes

You can import a previously exported JSON theme:

1. Open the Export panel
2. Use the Import tab
3. Paste or upload a JSON configuration
4. The theme is validated and applied

## Sharing Themes

### Share with Your Team

1. Export as JSON
2. Commit the JSON file to your repo (e.g., `theme.json`)
3. Team members import it into the Theme Builder to preview
4. Final version is exported as `app.config.ts` for the project

### Share with the Community

Consider sharing your themes:

- Export as JSON and include in a GitHub Gist
- Share the app.config values in community forums
- Include a screenshot from the Theme Builder showing the result

## Best Practices

| Practice                               | Reason                             |
| -------------------------------------- | ---------------------------------- |
| Export as app.config.ts for production | Native integration, simplest setup |
| Keep a JSON backup                     | Easy to reimport and iterate       |
| Version control your theme             | Track design decisions over time   |
| Test exports in a fresh project        | Ensure nothing is missing          |
| Export both light and dark modes       | Complete theme coverage            |

## Configuration Compatibility

The Theme Builder generates output compatible with:

- **Nuxt UI v4** (primary target)
- **Tailwind CSS v4** (CSS variable format, or the standalone Tailwind theme without Nuxt UI)
- **Figma and design tools** (Design Tokens JSON via Tokens Studio or Style Dictionary)
- **Any Vue/Nuxt project** (JSON format for custom consumption)

## Try It Now

Head to the [Theme Builder](/) to create, preview, and export your theme. The full workflow - from palette selection to production-ready export - takes just a few minutes.

Want a head start? Every theme in the [theme gallery](/themes) shows its export code, ready to copy.

## Next Steps

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) - start with color configuration
- [Building a Design System with Nuxt UI](/learn/best-practices/design-system-guide) - use exports as your system foundation
- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) - understand what's being exported
