---
title: Component defaults
description: Choose the color, variant, and size that buttons, form fields, badges, and cards use out of the box.
date: "2026-10-17"
badge: new
image:
  src: /changelog/component-defaults.webp
  alt: The Component Defaults section set to soft secondary buttons, next to the landing template using them
links:
  - label: Try it on the landing template
    to: /templates/landing
    icon: i-lucide-app-window
---

Open **Component Defaults** in the sidebar to set what components use when your code doesn't say. Buttons, badges, and form fields (inputs, textareas, selects, and number inputs) take a color, variant, and size, and cards take a variant.

Every preview page picks up the change right away, and the `app.config.ts` export writes it out as Nuxt UI `defaultVariants`. A design system built on ghost buttons or small inputs now ships with the theme instead of needing a find-and-replace afterwards.
