import type { NavigationMenuItem } from "@nuxt/ui";

export interface ComponentCategory {
  label: string;
  icon: string;
  slug: string;
  description: string;
  items: NavigationMenuItem[];
}
