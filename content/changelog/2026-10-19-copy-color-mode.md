---
title: Copy light mode to dark mode
description: Finish your light theme, then give dark mode the same colors in one click.
date: "2026-10-19"
badge: new
image:
  src: /changelog/copy-color-mode.webp
  alt: The Color Mode section with the Copy from light mode button
links:
  - label: Dark mode guide
    to: /learn/theming/dark-mode-guide
    icon: i-lucide-book-open
---

Light and dark mode each keep their own settings, so a theme built in light mode used to mean picking every color again for dark. Now the **Color Mode** section has a **Copy from light mode** button. Switch to dark mode, click it, and dark mode gets the same semantic palettes, neutral, radius, and font. It works the other way too, from dark to light.

Shades and text, background, and border overrides aren't copied, because they're tuned for each mode's background. A shade that reads well on white is often too dark on black. The button is turned off when both modes already match, and you can undo the copy like any other change.
