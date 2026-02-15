---
title: Dark Mode Theming with Nuxt UI
description: Build polished dual-mode themes with independent light and dark color configurations, using Nuxt UI v4 and Tailwind CSS v4.
category: theming
format: guide
date: "2026-02-14"
tags: ["dark-mode", "light-mode", "colors", "nuxt-ui", "tailwind"]
order: 2
featured: true
---

Dark mode is not just an inverted light theme. Great dark mode design requires intentional color choices — reduced contrast for comfort, adjusted saturation for vibrancy, and carefully tuned neutral tones so surfaces feel layered without being harsh.

Nuxt UI v4 supports independent light and dark mode theming out of the box.

## How Color Mode Works in Nuxt UI

Nuxt UI uses `@nuxtjs/color-mode` under the hood. It adds a class (`dark` or `light`) to the `<html>` element, and Tailwind CSS v4's dark mode variant applies styles accordingly.

The color mode can be:

- **System** — follows the user's OS preference
- **Light** — forced light
- **Dark** — forced dark

Toggle it programmatically:

```ts
const colorMode = useColorMode();
colorMode.preference = "dark"; // 'light' | 'dark' | 'system'
```

## Independent Light and Dark Palettes

The real power comes from setting **different color palettes per mode**. A common pattern:

- **Light mode**: Deep, saturated primaries (e.g., `indigo-600`) on light backgrounds
- **Dark mode**: Brighter, lighter primaries (e.g., `indigo-400`) on dark surfaces

In the Theme Builder, each color role has separate light and dark mode selectors. This means your light theme can use `blue` as primary while your dark theme uses `sky` — they're completely independent.

## Design Principles for Dark Mode

### 1. Reduce Overall Contrast

White text on a pure black background (#000) causes eye strain. Use elevated dark surfaces:

| Surface    | Light Mode | Dark Mode                |
| ---------- | ---------- | ------------------------ |
| Background | `white`    | `gray-950` or `zinc-950` |
| Card       | `gray-50`  | `gray-900`               |
| Elevated   | `white`    | `gray-800`               |

### 2. Adjust Color Saturation

Colors that look great on white can appear overly vibrant on dark backgrounds. Slightly desaturate or lighten them:

- Light mode primary: `indigo-600`
- Dark mode primary: `indigo-400`

### 3. Use Shadows Differently

Shadows are barely visible on dark backgrounds. Instead, rely on:

- **Subtle borders** (`gray-800`) to define edges
- **Background elevation** (slightly lighter surfaces for raised elements)
- **Ring/outline** focus indicators

### 4. Neutral Palette Matters Most

The neutral palette defines your text, borders, and surface colors. Choosing the right neutral for dark mode is critical:

| Neutral   | Dark Mode Character                   |
| --------- | ------------------------------------- |
| `slate`   | Cool, blue-tinted — technical, modern |
| `zinc`    | Pure neutral — versatile, clean       |
| `gray`    | Slightly warm — balanced              |
| `stone`   | Warm — friendly, organic              |
| `neutral` | True gray — minimal, stark            |

## Testing Dark Mode Themes

Always test your theme in both modes. Things to verify:

1. **Text contrast** — body text meets 4.5:1 ratio against its background
2. **Component states** — hover, focus, active, disabled all look correct
3. **Color roles** — success/warning/error remain distinguishable
4. **Images and icons** — decorative elements work against dark surfaces

The Theme Builder lets you toggle between modes instantly and preview every component in your current theme.

## Export Both Modes

When you export your theme from the Theme Builder, the generated configuration includes both light and dark mode values. The output format works directly in your `app.config.ts`:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "indigo", // or different per mode via CSS variables
      secondary: "violet",
      neutral: "zinc",
    },
  },
});
```

## Next Steps

- [How to Customize Nuxt UI Theme Colors](/learn/theming/customize-colors) — full color configuration guide
- [Accessible Color Contrast in Web Themes](/learn/best-practices/accessible-color-contrast) — ensure your dark mode meets WCAG standards
- [CSS Variables Reference for Nuxt UI Themes](/learn/theming/css-variables-reference) — override individual shades per mode
