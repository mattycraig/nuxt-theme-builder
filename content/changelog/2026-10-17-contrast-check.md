---
title: Contrast Check in the sidebar
description: See which text and button colors fall below WCAG AA, and fix each one with a click.
date: "2026-10-17"
badge: new
image:
  src: /changelog/contrast-check.webp
  alt: The Contrast Check section listing color pairs with their contrast ratios
links:
  - label: Accessible color contrast guide
    to: /learn/best-practices/accessible-color-contrast
    icon: i-lucide-book-open
---

The new **Contrast Check** section tests the color pairs Nuxt UI actually renders in the mode you're editing. That covers body and muted text on the page and on cards, the label on each solid button, and each semantic color used as text.

Any pair below WCAG AA (4.5:1) shows its ratio and the nearest shade that passes, and one click applies it. The check follows your shade shifts and dark mode overrides, so it measures the theme you'll actually ship.
