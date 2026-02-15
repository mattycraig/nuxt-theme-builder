---
title: Accessible Color Contrast in Web Themes
description: How to ensure your theme colors meet WCAG 2.2 contrast requirements for text, UI components, and interactive elements.
category: best-practices
format: guide
date: "2026-02-14"
tags: ["accessibility", "contrast", "wcag", "colors", "a11y"]
order: 7
featured: false
---

# Accessible Color Contrast in Web Themes

Beautiful themes are useless if people can't read the text. Color contrast is the most common accessibility issue in web design — and one of the easiest to fix when you address it from the start.

This guide covers WCAG 2.2 contrast requirements and how to apply them to Nuxt UI themes.

## WCAG Contrast Requirements

The Web Content Accessibility Guidelines (WCAG) 2.2 define minimum contrast ratios:

### Text Contrast (Level AA)

| Text Type                            | Minimum Ratio  | Examples                          |
| ------------------------------------ | -------------- | --------------------------------- |
| Normal text (< 24px)                 | **4.5:1**      | Body copy, labels, descriptions   |
| Large text (≥ 24px or ≥ 18.5px bold) | **3:1**        | Headings, hero text               |
| Incidental text                      | No requirement | Disabled buttons, decorative text |

### Non-Text Contrast (Level AA)

| Element           | Minimum Ratio | Examples                                    |
| ----------------- | ------------- | ------------------------------------------- |
| UI components     | **3:1**       | Button borders, input outlines, toggles     |
| Graphical objects | **3:1**       | Icons, chart elements, focus indicators     |
| State indicators  | **3:1**       | Active tabs, selected items, checked states |

## Common Contrast Pitfalls in Theming

### 1. Light Text on Light Backgrounds

The most frequent issue. `gray-400` text on a `white` background fails contrast:

```
❌ gray-400 on white = ~2.5:1 (fails 4.5:1)
✅ gray-600 on white = ~5.8:1 (passes)
```

For secondary/muted text, use shade **600** or darker on light backgrounds.

### 2. Colored Text on Colored Backgrounds

Using your primary color for both text and backgrounds creates contrast problems:

```
❌ indigo-500 text on indigo-50 bg = ~3.2:1 (fails for small text)
✅ indigo-700 text on indigo-50 bg = ~6.1:1 (passes)
```

### 3. Dark Mode Contrast Failures

Bright text on very dark backgrounds can technically pass contrast ratios but still cause readability issues due to excessive contrast causing halation:

```
⚠️  white (#fff) on black (#000) = 21:1 (passes but causes eye strain)
✅ gray-100 text on gray-950 bg = ~16:1 (high contrast, less strain)
```

### 4. Button and Input Borders

UI component boundaries must have 3:1 contrast against adjacent colors:

```
❌ gray-200 border on white bg = ~1.3:1 (invisible)
✅ gray-400 border on white bg = ~2.5:1 (still fails!)
✅ gray-500 border on white bg = ~3.7:1 (passes)
```

## Checking Contrast in Nuxt UI Themes

### In the Theme Builder

The Theme Builder previews your theme across 125+ real components. When evaluating contrast:

1. **Check body text** — paragraphs, labels, and descriptions should be clearly legible
2. **Check muted text** — timestamps, help text, and secondary content
3. **Check buttons** — text on solid buttons, border visibility on outline buttons
4. **Check inputs** — placeholder text, border visibility, focus rings
5. **Check both modes** — light and dark mode independently

### With Browser DevTools

Chrome DevTools shows contrast ratios in the color picker:

1. Right-click an element → Inspect
2. Click the color swatch in the Styles panel
3. The contrast ratio is displayed with a pass/fail indicator

### With Dedicated Tools

- **Accessibility Insights** — browser extension for automated contrast checks
- **axe DevTools** — comprehensive accessibility testing
- **Contrast Checker** — online tools like WebAIM's Contrast Checker

## Safe Shade Combinations

Quick reference for shades that reliably pass contrast on common backgrounds:

### On White / Light Backgrounds

| Text Shade | Approximate Ratio | Verdict                     |
| ---------- | ----------------- | --------------------------- |
| `*-900`    | ~15:1             | Excellent                   |
| `*-800`    | ~10:1             | Excellent                   |
| `*-700`    | ~6:1              | Good                        |
| `*-600`    | ~4.5:1            | Minimum for body text       |
| `*-500`    | ~3:1              | OK for large text / UI only |

### On Dark (950) Backgrounds

| Text Shade | Approximate Ratio | Verdict               |
| ---------- | ----------------- | --------------------- |
| `*-50`     | ~16:1             | Excellent             |
| `*-100`    | ~13:1             | Excellent             |
| `*-200`    | ~10:1             | Good                  |
| `*-300`    | ~7:1              | Good                  |
| `*-400`    | ~4.5:1            | Minimum for body text |

## Color Is Not Enough

WCAG also requires that color is **not the only means** of conveying information:

- **Error states**: Use an icon and text message in addition to red coloring
- **Required fields**: Use asterisk (`*`) in addition to color
- **Status indicators**: Combine color with shape (icons, text labels)
- **Charts/graphs**: Use patterns or labels alongside color coding

## Next Steps

- [Dark Mode Theming with Nuxt UI](/learn/theming/dark-mode-guide) — design accessible dark themes
- [Building a Design System with Nuxt UI](/learn/best-practices/design-system-guide) — encode contrast rules into your system
- [Nuxt UI Color Palette Reference](/learn/theming/color-palette-reference) — choose palettes with contrast in mind
