---
title: Custom palettes from one brand color
description: Enter a hex value and get a full 50 to 950 palette you can use for any color role.
date: "2026-09-24"
badge: new
image:
  src: /changelog/custom-palettes.webp
  alt: The Custom Palettes section with a generated palette from a brand color
links:
  - label: Use your brand hex color
    to: /learn/theming/brand-hex-color
    icon: i-lucide-book-open
---

Tailwind's palettes are a great start, but your brand color is rarely one of them. Add a **custom palette** with one color, and the builder generates a full 50 to 950 scale that follows the curve of the closest Tailwind palette, with your exact color on the matching shade.

Assign it to primary or any other role, and it previews live, saves with your theme, and exports as a `@theme static` block alongside your `app.config.ts`. A theme can hold up to six custom palettes.
