/**
 * Route and sidebar navigation metadata.
 *
 * Central registry of all preview routes — component categories, blocks,
 * templates, tools, and learn sections. Used by the sidebar, command palette,
 * and iframe navigation sync.
 */
import type { NavigationMenuItem } from "@nuxt/ui";

export { flattenCategories } from "./shared";
export { COMPONENT_CATEGORIES, COMPONENT_NAV_ITEMS } from "./components";
export { BLOCK_CATEGORIES, BLOCK_NAV_ITEMS } from "./blocks";
export { TEMPLATE_CATEGORIES, TEMPLATE_NAV_ITEMS } from "./templates";
export { LEARN_CATEGORIES, LEARN_NAV_ITEMS } from "./learn";
export { UTILITY_NAV_ITEMS } from "./utilities";
export { TOOL_CATEGORIES, TOOL_NAV_ITEMS } from "./tools";

// Main Navigation Items ───────────────────────────────────────────────────

export const NAVIGATION_ITEMS: NavigationMenuItem[][] = [
  [
    {
      label: "AI Generate",
      icon: "i-lucide-sparkles",
      to: "/ai",
    },
    {
      label: "Components",
      icon: "i-lucide-layout-grid",
      to: "/components",
    },
    {
      label: "Blocks",
      icon: "i-lucide-blocks",
      to: "/blocks",
    },
    {
      label: "Templates",
      icon: "i-lucide-app-window",
      to: "/templates",
    },
    {
      label: "Learn",
      icon: "i-lucide-book-open",
      to: "/learn",
    },
  ],
];

/**
 * Flatten navigation tree into a list of { label, icon, to } for search and label lookups.
 */
export function flattenNavigationItems(
  items: NavigationMenuItem[][],
): { label: string; icon?: string; to?: string }[] {
  const result: { label: string; icon?: string; to?: string }[] = [];

  for (const group of items) {
    for (const item of group) {
      if (item.to && item.label) {
        result.push({
          label: item.label,
          icon: item.icon as string | undefined,
          to: String(item.to),
        });
      }
      if (item.children) {
        for (const child of item.children) {
          if (!child.label) continue;
          result.push({
            label: child.label,
            icon: (child.icon || item.icon) as string | undefined,
            to: child.to ? String(child.to) : undefined,
          });
        }
      }
    }
  }

  return result;
}
