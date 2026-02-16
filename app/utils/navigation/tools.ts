import type { NavigationMenuItem } from "@nuxt/ui";
import type { ToolCategory } from "~/types/components";
import { flattenCategories } from "./shared";

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    label: "Color & Design",
    icon: "i-lucide-paintbrush",
    slug: "color-design",
    description:
      "Color utilities for building, testing, and exporting theme palettes.",
    items: [
      {
        label: "Palette Viewer",
        icon: "i-lucide-palette",
        description:
          "Browse all Tailwind CSS / Nuxt UI color palettes with every shade value.",
        to: "/tools/palette-viewer",
      },
      {
        label: "Palette Generator",
        icon: "i-lucide-shuffle",
        description:
          "Generate random semantic color palettes and export CSS variables for your theme.",
        to: "/tools/palette-generator",
      },
      {
        label: "Contrast Checker",
        icon: "i-lucide-scan-eye",
        description:
          "Check WCAG AA and AAA contrast ratios between any two colors.",
        to: "/tools/contrast-checker",
      },
      {
        label: "Color Converter",
        icon: "i-lucide-arrow-right-left",
        description:
          "Convert colors between HEX, RGB, HSL, and OKLCH formats instantly.",
        to: "/tools/color-converter",
      },
    ],
  },
];

export const TOOL_NAV_ITEMS: NavigationMenuItem[] = flattenCategories(
  TOOL_CATEGORIES,
  "All Tools",
  "i-lucide-wrench",
  "/tools",
);
