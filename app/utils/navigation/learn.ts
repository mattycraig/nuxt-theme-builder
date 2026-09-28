import type { NavigationMenuItem } from "@nuxt/ui";
import type { LearnCategory } from "~/types/components";
import { flattenCategories } from "./shared";

export const LEARN_CATEGORIES: LearnCategory[] = [
  {
    label: "Theming",
    icon: "i-lucide-palette",
    slug: "theming",
    description:
      "Color palettes, dark mode, CSS variables, design tokens, typography, and font pairing.",
    items: [
      {
        label: "Customize Theme Colors",
        icon: "i-lucide-paintbrush",
        description:
          "Configure semantic color palettes, per-role shades, and neutral tones for your brand.",
        to: "/learn/theming/customize-colors",
      },
      {
        label: "Dark Mode Theming",
        icon: "i-lucide-moon",
        description:
          "Build polished dual-mode themes with independent light and dark color configurations.",
        to: "/learn/theming/dark-mode-guide",
      },
      {
        label: "Color Palette Reference",
        icon: "i-lucide-swatch-book",
        description:
          "Complete reference of all available color palettes with shade values and pairing tips.",
        to: "/learn/theming/color-palette-reference",
      },
      {
        label: "CSS Variables Reference",
        icon: "i-lucide-code",
        description:
          "Full list of CSS custom properties for colors, radius, typography, and spacing.",
        to: "/learn/theming/css-variables-reference",
      },
      {
        label: "Typography & Font Pairing",
        icon: "i-lucide-type",
        description:
          "Choose, pair, and apply fonts in Nuxt UI applications for cohesive typography.",
        to: "/learn/theming/typography-font-pairing",
      },
      {
        label: "Export & Share Themes",
        icon: "i-lucide-share-2",
        description:
          "Export themes as app.config.ts, CSS variables, or JSON and share with your team.",
        to: "/learn/theming/export-and-share",
      },
      {
        label: "Use Your Brand Hex Color",
        icon: "i-lucide-pipette",
        description:
          "Turn one brand hex value into a full palette and make it your primary color.",
        to: "/learn/theming/brand-hex-color",
      },
      {
        label: "Change the Border Radius",
        icon: "i-lucide-square-dashed",
        description:
          "One CSS variable controls the corner rounding of every component.",
        to: "/learn/theming/global-border-radius",
      },
      {
        label: "Migrate Your Theme to v4",
        icon: "i-lucide-arrow-right-left",
        description:
          "Move a Nuxt UI v2 or v3 theme to v4: colors, tokens, and component overrides.",
        to: "/learn/theming/migrate-theme-to-v4",
      },
    ],
  },
  {
    label: "Components",
    icon: "i-lucide-component",
    slug: "components",
    description:
      "Styling individual Nuxt UI components, variants, sizes, and customization patterns.",
    items: [
      {
        label: "Component Styling Cheat Sheet",
        icon: "i-lucide-file-text",
        description:
          "Quick reference for customizing Nuxt UI components with variants, colors, and sizes.",
        to: "/learn/components/styling-cheat-sheet",
      },
      {
        label: "Restyle One Component",
        icon: "i-lucide-pencil-ruler",
        description:
          "Change one component everywhere with app.config, or once with the ui prop.",
        to: "/learn/components/restyle-one-component",
      },
    ],
  },
  {
    label: "Tailwind CSS",
    icon: "i-lucide-wind",
    slug: "tailwind",
    description:
      "Tailwind CSS v4 integration, theming changes, utilities, and migration guidance.",
    items: [
      {
        label: "Tailwind v4: What Changed",
        icon: "i-lucide-refresh-cw",
        description:
          "Key differences in Tailwind CSS v4's theming system versus v3.",
        to: "/learn/tailwind/tailwind-v4-theming",
      },
    ],
  },
  {
    label: "Best Practices",
    icon: "i-lucide-shield-check",
    slug: "best-practices",
    description:
      "Accessibility, design systems, performance, and WCAG contrast guidance.",
    items: [
      {
        label: "Building a Design System",
        icon: "i-lucide-blocks",
        description:
          "Build a consistent, scalable design system using Nuxt UI design tokens.",
        to: "/learn/best-practices/design-system-guide",
      },
      {
        label: "Accessible Color Contrast",
        icon: "i-lucide-eye",
        description:
          "Ensure your theme colors meet WCAG 2.2 contrast requirements.",
        to: "/learn/best-practices/accessible-color-contrast",
      },
      {
        label: "Nuxt UI vs shadcn-vue Theming",
        icon: "i-lucide-scale",
        description:
          "How colors, dark mode, radius, and overrides compare between the two.",
        to: "/learn/best-practices/nuxt-ui-vs-shadcn-vue-theming",
      },
    ],
  },
];

export const LEARN_NAV_ITEMS: NavigationMenuItem[] = flattenCategories(
  LEARN_CATEGORIES,
  "All Articles",
  "i-lucide-book-open",
  "/learn",
);
