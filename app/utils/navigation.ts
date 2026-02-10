import type { NavigationMenuItem } from "@nuxt/ui";

// Component Navigation ────────────────────────────────────────────────────

const componentChildren: NavigationMenuItem[] = [
  {
    label: "All Components",
    icon: "i-lucide-layout-grid",
    description: "View all components on a single page.",
    to: "/components/all",
  },
  {
    label: "Buttons",
    icon: "i-lucide-mouse-pointer-click",
    description: "Solid, outline, soft, and ghost button variants.",
    to: "/components/buttons",
  },
  {
    label: "Badges",
    icon: "i-lucide-tag",
    description: "Inline status indicators with various styles.",
    to: "/components/badges",
  },
  {
    label: "Alerts",
    icon: "i-lucide-alert-circle",
    description: "Contextual feedback for success, info, warning, error.",
    to: "/components/alerts",
  },
  {
    label: "Cards",
    icon: "i-lucide-square",
    description: "Content containers with headers and footers.",
    to: "/components/cards",
  },
  {
    label: "Inputs",
    icon: "i-lucide-text-cursor-input",
    description: "Text fields, selects, switches, and more.",
    to: "/components/inputs",
  },
  {
    label: "Table",
    icon: "i-lucide-table",
    description: "Data tables with headers and status badges.",
    to: "/components/table",
  },
  {
    label: "Tabs",
    icon: "i-lucide-panel-top",
    description: "Tabbed interfaces for organizing content.",
    to: "/components/tabs",
  },
  {
    label: "Accordion",
    icon: "i-lucide-chevrons-down-up",
    description: "Collapsible content sections.",
    to: "/components/accordion",
  },
  {
    label: "Avatars",
    icon: "i-lucide-circle-user",
    description: "Profile images with avatar group stacking.",
    to: "/components/avatars",
  },
  {
    label: "Progress",
    icon: "i-lucide-loader",
    description: "Progress bars with semantic coloring.",
    to: "/components/progress",
  },
  {
    label: "Calendar",
    icon: "i-lucide-calendar",
    description: "Date picker with month navigation.",
    to: "/components/calendar",
  },
  {
    label: "Navigation",
    icon: "i-lucide-menu",
    description: "Navigation menu with active state indicators.",
    to: "/components/navigation",
  },
  {
    label: "Dropdown",
    icon: "i-lucide-chevron-down",
    description: "Dropdown menus with grouped actions.",
    to: "/components/dropdown",
  },
  {
    label: "Misc",
    icon: "i-lucide-ellipsis",
    description: "Separators, shortcuts, skeletons, and tooltips.",
    to: "/components/misc",
  },
];

// Block Navigation ────────────────────────────────────────────────────────

const blockChildren: NavigationMenuItem[] = [
  {
    label: "All Blocks",
    icon: "i-lucide-blocks",
    description: "Browse all layout blocks.",
    to: "/blocks",
  },
  {
    label: "Hero",
    icon: "i-lucide-megaphone",
    description: "Bold hero banner with headline and CTA.",
    to: "/blocks/hero",
  },
  {
    label: "Features",
    icon: "i-lucide-grid-3x3",
    description: "Responsive grid showcasing product features.",
    to: "/blocks/features",
  },
  {
    label: "CTA",
    icon: "i-lucide-mouse-pointer-click",
    description: "Banners to drive engagement and conversions.",
    to: "/blocks/cta",
  },
  {
    label: "Testimonials",
    icon: "i-lucide-quote",
    description: "Customer quotes with avatars and ratings.",
    to: "/blocks/testimonials",
  },
  {
    label: "Stats",
    icon: "i-lucide-bar-chart-3",
    description: "Key metrics in an eye-catching layout.",
    to: "/blocks/stats",
  },
  {
    label: "FAQ",
    icon: "i-lucide-circle-help",
    description: "Frequently asked questions in accordion layout.",
    to: "/blocks/faq",
  },
];

// Template Navigation ─────────────────────────────────────────────────────

const templateChildren: NavigationMenuItem[] = [
  {
    label: "All Templates",
    icon: "i-lucide-app-window",
    description: "Browse all page templates.",
    to: "/templates",
  },
  {
    label: "Dashboard",
    icon: "i-lucide-layout-dashboard",
    description: "Admin dashboard with stats and charts.",
    to: "/templates/dashboard",
  },
  {
    label: "Landing",
    icon: "i-lucide-rocket",
    description: "Marketing page with hero and features.",
    to: "/templates/landing",
  },
  {
    label: "Pricing",
    icon: "i-lucide-credit-card",
    description: "Plan comparison with toggle billing.",
    to: "/templates/pricing",
  },
  {
    label: "Login",
    icon: "i-lucide-log-in",
    description: "Authentication with login and registration.",
    to: "/templates/login",
  },
  {
    label: "Blog",
    icon: "i-lucide-newspaper",
    description: "Blog listing with featured posts.",
    to: "/templates/blog",
  },
  {
    label: "Changelog",
    icon: "i-lucide-history",
    description: "Version history and release notes.",
    to: "/templates/changelog",
  },
  {
    label: "Chat",
    icon: "i-lucide-message-circle",
    description: "AI chat with conversation history.",
    to: "/templates/chat",
  },
  {
    label: "Editor",
    icon: "i-lucide-file-edit",
    description: "Rich text editor with toolbar.",
    to: "/templates/editor",
  },
  {
    label: "Error",
    icon: "i-lucide-alert-triangle",
    description: "Error state pages for HTTP status codes.",
    to: "/templates/error-page",
  },
];

// Main Navigation Items ───────────────────────────────────────────────────

export const NAVIGATION_ITEMS: NavigationMenuItem[][] = [
  [
    {
      label: "Home",
      icon: "i-lucide-home",
      to: "/",
    },
    {
      label: "Components",
      icon: "i-lucide-layout-grid",
      to: "/components",
      children: componentChildren,
    },
    {
      label: "Blocks",
      icon: "i-lucide-blocks",
      to: "/blocks",
      children: blockChildren,
    },
    {
      label: "Templates",
      icon: "i-lucide-app-window",
      to: "/templates",
      children: templateChildren,
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
