import type { NavigationMenuItem } from "@nuxt/ui";
import type { ComponentCategory } from "~/types/components";
import { PRESET_CATEGORIES } from "~/types/theme";
import { BUILT_IN_PRESETS, presetSlug } from "~/utils/presets";
import { flattenCategories } from "./shared";

const CATEGORY_ICONS: Record<(typeof PRESET_CATEGORIES)[number], string> = {
  Essentials: "i-lucide-star",
  Warm: "i-lucide-sun",
  Nature: "i-lucide-leaf",
  Cool: "i-lucide-snowflake",
  Bold: "i-lucide-zap",
  Brands: "i-lucide-badge-check",
};

const CATEGORY_DESCRIPTIONS: Record<(typeof PRESET_CATEGORIES)[number], string> =
  {
    Essentials: "Balanced, versatile starting points.",
    Warm: "Reds, oranges, golds, and pinks.",
    Nature: "Greens and earthy tones.",
    Cool: "Blues, teals, and quiet neutrals.",
    Bold: "High-contrast and vivid palettes.",
    Brands: "Inspired by well-known product brands.",
  };

/** Theme gallery pages, one per built-in preset, grouped like the editor's preset picker. */
export const THEME_CATEGORIES: ComponentCategory[] = PRESET_CATEGORIES.map(
  (category) => ({
    label: category,
    icon: CATEGORY_ICONS[category],
    slug: presetSlug(category),
    description: CATEGORY_DESCRIPTIONS[category],
    items: BUILT_IN_PRESETS.filter((p) => p.category === category).map(
      (p) => ({
        label: `${p.name} Theme`,
        icon: "i-lucide-swatch-book",
        description: p.description ?? "",
        to: `/themes/${presetSlug(p.name)}`,
      }),
    ),
  }),
);

export const THEME_NAV_ITEMS: NavigationMenuItem[] = flattenCategories(
  THEME_CATEGORIES,
  "All Themes",
  "i-lucide-swatch-book",
  "/themes",
);
