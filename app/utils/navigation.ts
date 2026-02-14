import type { NavigationMenuItem } from "@nuxt/ui";
import type {
  BlockCategory,
  ComponentCategory,
  TemplateCategory,
} from "~/types/components";

// Component Categories ────────────────────────────────────────────────────

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    label: "Element",
    icon: "i-lucide-box",
    slug: "element",
    description: "Core visual building blocks for any interface.",
    items: [
      {
        label: "Alert",
        icon: "i-lucide-alert-circle",
        description:
          "Contextual feedback messages for success, info, warning, and error states.",
        to: "/components/alert",
      },
      {
        label: "Avatar",
        icon: "i-lucide-circle-user",
        description: "User profile images in multiple sizes.",
        to: "/components/avatar",
      },
      {
        label: "AvatarGroup",
        icon: "i-lucide-users",
        description: "Stacked avatar groups with overflow indicator.",
        to: "/components/avatar-group",
      },
      {
        label: "Badge",
        icon: "i-lucide-tag",
        description:
          "Inline status indicators with solid, outline, soft, and subtle styles.",
        to: "/components/badge",
      },
      {
        label: "Banner",
        icon: "i-lucide-flag",
        description: "Full-width notification banners for announcements.",
        to: "/components/banner",
      },
      {
        label: "Button",
        icon: "i-lucide-mouse-pointer-click",
        description:
          "Solid, outline, soft, and ghost button variants in every semantic color.",
        to: "/components/button",
      },
      {
        label: "Calendar",
        icon: "i-lucide-calendar",
        description:
          "Date picker calendar with month navigation and date selection.",
        to: "/components/calendar",
      },
      {
        label: "Card",
        icon: "i-lucide-square",
        description:
          "Content containers with headers, bodies, and action footers.",
        to: "/components/card",
      },
      {
        label: "Chip",
        icon: "i-lucide-circle-dot",
        description: "Small indicator dots overlaid on avatars or icons.",
        to: "/components/chip",
      },
      {
        label: "Collapsible",
        icon: "i-lucide-chevrons-down-up",
        description:
          "Toggle content visibility with smooth expand and collapse.",
        to: "/components/collapsible",
      },
      {
        label: "FieldGroup",
        icon: "i-lucide-group",
        description: "Group related form fields with shared styling.",
        to: "/components/field-group",
      },
      {
        label: "Icon",
        icon: "i-lucide-shapes",
        description: "Iconify icon rendering with dynamic name resolution.",
        to: "/components/icon",
      },
      {
        label: "Kbd",
        icon: "i-lucide-keyboard",
        description: "Keyboard shortcut indicators for key bindings.",
        to: "/components/kbd",
      },
      {
        label: "Progress",
        icon: "i-lucide-loader",
        description:
          "Progress bars with semantic coloring for completion states.",
        to: "/components/progress",
      },
      {
        label: "Separator",
        icon: "i-lucide-minus",
        description: "Visual dividers between content sections.",
        to: "/components/separator",
      },
      {
        label: "Skeleton",
        icon: "i-lucide-scan-line",
        description: "Placeholder loading animations for content areas.",
        to: "/components/skeleton",
      },
    ],
  },
  {
    label: "Form",
    icon: "i-lucide-text-cursor-input",
    slug: "form",
    description: "Input controls and form management components.",
    items: [
      {
        label: "Checkbox",
        icon: "i-lucide-square-check",
        description: "Single checkbox toggle with label.",
        to: "/components/checkbox",
      },
      {
        label: "CheckboxGroup",
        icon: "i-lucide-list-checks",
        description: "Multiple checkbox options in a group.",
        to: "/components/checkbox-group",
      },
      {
        label: "ColorPicker",
        icon: "i-lucide-palette",
        description: "Color selection with swatches and custom input.",
        to: "/components/color-picker",
      },
      {
        label: "FileUpload",
        icon: "i-lucide-upload",
        description: "Drag-and-drop or click-to-upload file input.",
        to: "/components/file-upload",
      },
      {
        label: "Form",
        icon: "i-lucide-file-input",
        description: "Form wrapper with validation and submission handling.",
        to: "/components/form",
      },
      {
        label: "FormField",
        icon: "i-lucide-text-cursor",
        description:
          "Labeled field wrapper with validation, help text, and error display.",
        to: "/components/form-field",
      },
      {
        label: "Input",
        icon: "i-lucide-text-cursor-input",
        description: "Text input fields with icons, states, and validation.",
        to: "/components/input",
      },
      {
        label: "InputDate",
        icon: "i-lucide-calendar-days",
        description: "Date input with calendar picker integration.",
        to: "/components/input-date",
      },
      {
        label: "InputMenu",
        icon: "i-lucide-list",
        description:
          "Input with dropdown menu for suggestions or autocomplete.",
        to: "/components/input-menu",
      },
      {
        label: "InputNumber",
        icon: "i-lucide-hash",
        description: "Numeric input with increment and decrement controls.",
        to: "/components/input-number",
      },
      {
        label: "InputTags",
        icon: "i-lucide-tags",
        description: "Tag input for entering multiple values as tokens.",
        to: "/components/input-tags",
      },
      {
        label: "InputTime",
        icon: "i-lucide-clock",
        description: "Time input with hour and minute selection.",
        to: "/components/input-time",
      },
      {
        label: "PinInput",
        icon: "i-lucide-key-round",
        description: "Segmented input for PIN codes and verification.",
        to: "/components/pin-input",
      },
      {
        label: "RadioGroup",
        icon: "i-lucide-circle-check",
        description: "Single-select radio options in a group.",
        to: "/components/radio-group",
      },
      {
        label: "Select",
        icon: "i-lucide-chevrons-up-down",
        description: "Dropdown select with single selection.",
        to: "/components/select",
      },
      {
        label: "SelectMenu",
        icon: "i-lucide-list-filter",
        description: "Searchable select with multiple selection support.",
        to: "/components/select-menu",
      },
      {
        label: "Slider",
        icon: "i-lucide-sliders-horizontal",
        description: "Range slider for numeric value selection.",
        to: "/components/slider",
      },
      {
        label: "Switch",
        icon: "i-lucide-toggle-left",
        description: "Toggle switch for boolean settings.",
        to: "/components/switch",
      },
      {
        label: "Textarea",
        icon: "i-lucide-align-left",
        description: "Multi-line text input with auto-resize support.",
        to: "/components/textarea",
      },
    ],
  },
  {
    label: "Data",
    icon: "i-lucide-database",
    slug: "data",
    description: "Components for displaying and organizing data.",
    items: [
      {
        label: "Accordion",
        icon: "i-lucide-chevrons-down-up",
        description: "Collapsible content sections for progressive disclosure.",
        to: "/components/accordion",
      },
      {
        label: "Carousel",
        icon: "i-lucide-gallery-horizontal",
        description: "Horizontal content carousel with navigation controls.",
        to: "/components/carousel",
      },
      {
        label: "Empty",
        icon: "i-lucide-inbox",
        description: "Empty state placeholder with icon and message.",
        to: "/components/empty",
      },
      {
        label: "Marquee",
        icon: "i-lucide-move-horizontal",
        description: "Auto-scrolling horizontal content ticker.",
        to: "/components/marquee",
      },
      {
        label: "ScrollArea",
        icon: "i-lucide-scroll",
        description: "Custom scrollbar container with overflow management.",
        to: "/components/scroll-area",
      },
      {
        label: "Table",
        icon: "i-lucide-table",
        description:
          "Data tables with column headers, sorting, and status badges.",
        to: "/components/table",
      },
      {
        label: "Timeline",
        icon: "i-lucide-git-commit-horizontal",
        description: "Chronological event display with icons and metadata.",
        to: "/components/timeline",
      },
      {
        label: "Tree",
        icon: "i-lucide-folder-tree",
        description: "Hierarchical tree view with expand and collapse.",
        to: "/components/tree",
      },
      {
        label: "User",
        icon: "i-lucide-contact",
        description:
          "User identity display with avatar, name, and description.",
        to: "/components/user",
      },
    ],
  },
  {
    label: "Navigation",
    icon: "i-lucide-compass",
    slug: "navigation",
    description: "Wayfinding and page structure components.",
    items: [
      {
        label: "Breadcrumb",
        icon: "i-lucide-slash",
        description:
          "Hierarchical path breadcrumbs with separator customization.",
        to: "/components/breadcrumb",
      },
      {
        label: "CommandPalette",
        icon: "i-lucide-terminal",
        description: "Searchable command palette with keyboard navigation.",
        to: "/components/command-palette",
      },
      {
        label: "FooterColumns",
        icon: "i-lucide-columns-3",
        description: "Multi-column footer with grouped links.",
        to: "/components/footer-columns",
      },
      {
        label: "Link",
        icon: "i-lucide-external-link",
        description:
          "Enhanced link component with active state and icon support.",
        to: "/components/link",
      },
      {
        label: "NavigationMenu",
        icon: "i-lucide-menu",
        description:
          "Navigation menu with icon links and active state indicators.",
        to: "/components/navigation-menu",
      },
      {
        label: "Pagination",
        icon: "i-lucide-arrow-left-right",
        description: "Page navigation for paginated data sets.",
        to: "/components/pagination",
      },
      {
        label: "Stepper",
        icon: "i-lucide-footprints",
        description: "Multi-step progress indicator for wizards and flows.",
        to: "/components/stepper",
      },
      {
        label: "Tabs",
        icon: "i-lucide-panel-top",
        description:
          "Tabbed interfaces for organizing content into switchable panels.",
        to: "/components/tabs",
      },
    ],
  },
  {
    label: "Overlay",
    icon: "i-lucide-layers",
    slug: "overlay",
    description: "Floating and layered interactive surfaces.",
    items: [
      {
        label: "ContextMenu",
        icon: "i-lucide-mouse-pointer",
        description: "Right-click context menus with grouped actions.",
        to: "/components/context-menu",
      },
      {
        label: "Drawer",
        icon: "i-lucide-panel-left-open",
        description: "Bottom sheet drawer for mobile-friendly overlays.",
        to: "/components/drawer",
      },
      {
        label: "DropdownMenu",
        icon: "i-lucide-chevron-down",
        description:
          "Dropdown menus with grouped actions, icons, and shortcuts.",
        to: "/components/dropdown-menu",
      },
      {
        label: "Modal",
        icon: "i-lucide-app-window-mac",
        description: "Dialog overlays for confirmations, forms, and content.",
        to: "/components/modal",
      },
      {
        label: "Popover",
        icon: "i-lucide-message-square",
        description: "Floating content panels triggered by click or hover.",
        to: "/components/popover",
      },
      {
        label: "Slideover",
        icon: "i-lucide-panel-right-open",
        description: "Slide-in panel overlays from the screen edge.",
        to: "/components/slideover",
      },
      {
        label: "Toast",
        icon: "i-lucide-bell",
        description: "Notification toasts for transient feedback messages.",
        to: "/components/toast",
      },
      {
        label: "Tooltip",
        icon: "i-lucide-message-circle",
        description: "Contextual hover hints for UI clarification.",
        to: "/components/tooltip",
      },
    ],
  },
];

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

export const COMPONENT_NAV_ITEMS: NavigationMenuItem[] =
  flattenCategories(COMPONENT_CATEGORIES);

// Block Categories ────────────────────────────────────────────────────────

export const BLOCK_CATEGORIES: BlockCategory[] = [
  {
    label: "Marketing & Landing",
    icon: "i-lucide-megaphone",
    slug: "marketing",
    description:
      "Hero sections, CTAs, features, pricing, testimonials, and statistics for marketing pages.",
    items: [
      {
        label: "Hero",
        icon: "i-lucide-megaphone",
        description:
          "Bold hero banners with headline, subtitle, and call-to-action buttons.",
        to: "/blocks/hero",
      },
      {
        label: "CTA",
        icon: "i-lucide-mouse-pointer-click",
        description:
          "Call-to-action sections with buttons, newsletter signups, and banners.",
        to: "/blocks/cta",
      },
      {
        label: "Feature",
        icon: "i-lucide-sparkles",
        description:
          "Feature grids, bento layouts, and alternating sections to showcase capabilities.",
        to: "/blocks/feature",
      },
      {
        label: "Pricing",
        icon: "i-lucide-credit-card",
        description:
          "Pricing plans, comparison tables, and single-product pricing cards.",
        to: "/blocks/pricing",
      },
      {
        label: "Testimonial",
        icon: "i-lucide-quote",
        description:
          "Customer quotes, review cards, logo walls, and testimonial grids.",
        to: "/blocks/testimonial",
      },
      {
        label: "Statistic",
        icon: "i-lucide-bar-chart-3",
        description:
          "Metric counters, stat cards, and KPI sections for social proof.",
        to: "/blocks/statistic",
      },
    ],
  },
  {
    label: "Content & Media",
    icon: "i-lucide-book-open",
    slug: "content",
    description:
      "Blog posts, long-form content, image galleries, and step-by-step guides.",
    items: [
      {
        label: "Blog",
        icon: "i-lucide-file-text",
        description:
          "Blog post grids, featured articles, and magazine-style layouts.",
        to: "/blocks/blog",
      },
      {
        label: "Content",
        icon: "i-lucide-align-left",
        description:
          "Centered prose, split layouts, multi-column content, and aside sections.",
        to: "/blocks/content",
      },
      {
        label: "Gallery",
        icon: "i-lucide-image",
        description:
          "Image grids, masonry layouts, featured galleries, and portfolio cards.",
        to: "/blocks/gallery",
      },
      {
        label: "Step",
        icon: "i-lucide-list-ordered",
        description:
          "Numbered step sections, vertical timelines, and how-it-works flows.",
        to: "/blocks/step",
      },
    ],
  },
  {
    label: "Navigation & Layout",
    icon: "i-lucide-layout",
    slug: "navigation",
    description: "Header navbars and footer sections for page structure.",
    items: [
      {
        label: "Header",
        icon: "i-lucide-panel-top",
        description:
          "Site headers with logo, navigation links, and action buttons.",
        to: "/blocks/header",
      },
      {
        label: "Footer",
        icon: "i-lucide-panel-bottom",
        description:
          "Site footers with link columns, social icons, and legal rows.",
        to: "/blocks/footer",
      },
    ],
  },
  {
    label: "Application & Commerce",
    icon: "i-lucide-shopping-bag",
    slug: "application",
    description:
      "Contact forms, team profiles, and e-commerce product layouts.",
    items: [
      {
        label: "Contact",
        icon: "i-lucide-mail",
        description: "Contact forms, split info layouts, and channel cards.",
        to: "/blocks/contact",
      },
      {
        label: "Team",
        icon: "i-lucide-users",
        description: "Team member grids, profile cards, and featured bios.",
        to: "/blocks/team",
      },
      {
        label: "Ecommerce",
        icon: "i-lucide-shopping-cart",
        description:
          "Product grids, detail cards, category browsing, and cart summaries.",
        to: "/blocks/ecommerce",
      },
    ],
  },
];

export const BLOCK_NAV_ITEMS: NavigationMenuItem[] = flattenCategories(
  BLOCK_CATEGORIES,
  "All Blocks",
  "i-lucide-blocks",
  "/blocks",
);

// Template Categories ─────────────────────────────────────────────────────

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    label: "Application Templates",
    icon: "i-lucide-app-window",
    slug: "application",
    description:
      "Full-page application layouts for dashboards, editors, and tools.",
    items: [
      {
        label: "Dashboard",
        icon: "i-lucide-layout-dashboard",
        description: "Admin dashboard with stats, charts, and tables.",
        to: "/templates/dashboard",
      },
      {
        label: "Chat",
        icon: "i-lucide-message-circle",
        description: "AI chat interface with conversation history.",
        to: "/templates/chat",
      },
      {
        label: "Editor",
        icon: "i-lucide-file-edit",
        description: "Rich text editor with toolbar and markdown.",
        to: "/templates/editor",
      },
      {
        label: "Error Page",
        icon: "i-lucide-alert-triangle",
        description: "Error state pages for HTTP status codes.",
        to: "/templates/error-page",
      },
    ],
  },
  {
    label: "Marketing Templates",
    icon: "i-lucide-rocket",
    slug: "marketing",
    description:
      "Marketing and product pages for landing, pricing, and content.",
    items: [
      {
        label: "Landing Page",
        icon: "i-lucide-rocket",
        description: "Marketing landing page with hero and features.",
        to: "/templates/landing",
      },
      {
        label: "Pricing",
        icon: "i-lucide-credit-card",
        description: "Plan comparison with toggle billing.",
        to: "/templates/pricing",
      },
      {
        label: "Blog",
        icon: "i-lucide-newspaper",
        description: "Blog listing with featured posts and categories.",
        to: "/templates/blog",
      },
      {
        label: "Changelog",
        icon: "i-lucide-history",
        description: "Version history and release notes.",
        to: "/templates/changelog",
      },
    ],
  },
  {
    label: "Auth Templates",
    icon: "i-lucide-log-in",
    slug: "auth",
    description: "Authentication and onboarding page layouts.",
    items: [
      {
        label: "Login",
        icon: "i-lucide-log-in",
        description: "Authentication with login and registration forms.",
        to: "/templates/login",
      },
    ],
  },
];

export const TEMPLATE_NAV_ITEMS: NavigationMenuItem[] = flattenCategories(
  TEMPLATE_CATEGORIES,
  "All Templates",
  "i-lucide-app-window",
  "/templates",
);

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

// Main Navigation Items ───────────────────────────────────────────────────

export const NAVIGATION_ITEMS: NavigationMenuItem[][] = [
  [
    {
      label: "Home",
      icon: "i-lucide-home",
      to: "/",
    },
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
