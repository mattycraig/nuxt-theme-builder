import type { NavigationMenuItem } from "@nuxt/ui";

// Utility Pages (footer links — included in search but not in the nav menu)

export const UTILITY_NAV_ITEMS: NavigationMenuItem[] = [
  {
    label: "About",
    icon: "i-lucide-info",
    to: "/about",
  },
  {
    label: "Help",
    icon: "i-lucide-circle-help",
    to: "/help",
  },
  {
    label: "Privacy",
    icon: "i-lucide-shield",
    to: "/privacy",
  },
  {
    label: "Contact",
    icon: "i-lucide-mail",
    to: "/contact",
  },
];
