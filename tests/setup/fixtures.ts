import type { ThemeConfig } from "~/types/theme";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";
import type { ComponentCategory } from "~/types/components";

/**
 * Creates a valid ThemeConfig for tests, merging partial overrides onto
 * the application defaults. Produces a deep clone so tests never share
 * references.
 */
export function createThemeConfig(
  overrides: Partial<ThemeConfig> = {},
): ThemeConfig {
  const base = cloneTheme(DEFAULT_THEME);
  return { ...base, ...overrides } as ThemeConfig;
}

/**
 * Builds a minimal ComponentCategory array for testing `useCategoryFilter`
 * and similar consumers. Each category contains items with `label` and
 * `description` fields that can be searched/filtered.
 */
export function createMockCategories(
  count = 3,
  itemsPerCategory = 2,
): ComponentCategory[] {
  const iconNames = [
    "i-lucide-box",
    "i-lucide-layout",
    "i-lucide-type",
    "i-lucide-palette",
    "i-lucide-grid",
  ];

  return Array.from({ length: count }, (_, ci) => ({
    label: `Category ${ci + 1}`,
    icon: iconNames[ci % iconNames.length],
    slug: `category-${ci + 1}`,
    description: `Description for category ${ci + 1}`,
    items: Array.from({ length: itemsPerCategory }, (_, ii) => ({
      label: `Item ${ci + 1}-${ii + 1}`,
      description: `Description for item ${ci + 1}-${ii + 1}`,
      to: `/test/category-${ci + 1}/item-${ii + 1}`,
    })),
  }));
}
