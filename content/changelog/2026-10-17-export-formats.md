---
title: Export design tokens and a Tailwind theme
description: Two new export formats for design tools and for projects that use Tailwind CSS without Nuxt UI.
date: "2026-10-17"
badge: new
image:
  src: /changelog/export-formats.webp
  alt: The export panel showing the Tokens tab with a tokens.json file
links:
  - label: Export and share guide
    to: /learn/theming/export-and-share
    icon: i-lucide-book-open
---

The export panel has two more tabs next to `app.config.ts`, CSS, and JSON.

- **Tokens** gives you a `tokens.json` file in the W3C Design Tokens format, with a light and a dark group. It holds each color's full 50 to 950 scale, the neutral scale, text, background, and border tokens, the radius scale, and the font. It imports into Tokens Studio as two token sets, so designers can work from the same theme.
- **Tailwind** gives you a `tailwind.css` theme for projects that use Tailwind CSS v4 without Nuxt UI. It uses the same utility names Nuxt UI does, like `bg-primary`, `text-muted`, `bg-elevated`, and `rounded-md`, with a dark mode block included.

Both formats use the exact colors Nuxt UI renders for your theme, including shade shifts and dark mode overrides.
