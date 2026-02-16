import type { NavigationMenuItem } from "@nuxt/ui";
import type { ComponentCategory } from "~/types/components";

/**
 * Flatten category arrays into a single NavigationMenuItem list
 * for command palette and search compatibility.
 */
export function flattenCategories(
  categories: ComponentCategory[],
  allLabel = "All Components",
  allIcon = "i-lucide-layout-grid",
  allTo = "/components/all",
): NavigationMenuItem[] {
  const all: NavigationMenuItem = {
    label: allLabel,
    icon: allIcon,
    description: `Browse all ${allLabel.toLowerCase()}.`,
    to: allTo,
  };
  return [all, ...categories.flatMap((cat) => cat.items)];
}
