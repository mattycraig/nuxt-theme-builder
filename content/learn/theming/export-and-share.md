---
title: How to Export and Share Nuxt UI Themes
description: Export your Nuxt UI v4 themes as app.config.ts, CSS variables, or JSON - and share them with your team or the community.
category: theming
format: guide
date: "2026-02-14"
tags: ["export", "sharing", "app-config", "css", "json", "nuxt-ui"]
order: 10
featured: false
---

Once you've created a theme in the Nuxt UI Theme Builder, you need to get it into your project. The builder supports three export formats, each suited to different workflows.

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
- **Tailwind CSS v4** (CSS variable format)
- **Any Vue/Nuxt project** (JSON format for custom consumption)

## Try It Now

Head to the [Theme Builder](/) to create, preview, and export your theme. The full workflow - from palette selection to production-ready export - takes just a few minutes.

## Next Steps

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) - start with color configuration
- [Building a Design System with Nuxt UI](/learn/best-practices/design-system-guide) - use exports as your system foundation
- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) - understand what's being exported
