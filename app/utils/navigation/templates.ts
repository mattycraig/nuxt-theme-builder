import type { NavigationMenuItem } from "@nuxt/ui";
import type { TemplateCategory } from "~/types/components";
import { flattenCategories } from "./shared";


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
      {
        label: "Account Settings",
        icon: "i-lucide-settings",
        description: "Profile, notifications, security, and billing forms.",
        to: "/templates/settings",
        badge: "new" as const,
      },
      {
        label: "Inbox",
        icon: "i-lucide-inbox",
        description: "Mail client with folders, message list, and reading pane.",
        to: "/templates/inbox",
        badge: "new" as const,
      },
      {
        label: "Booking",
        icon: "i-lucide-calendar-check",
        description: "Scheduling page with calendar, time slots, and confirmation.",
        to: "/templates/booking",
        badge: "new" as const,
      },
      {
        label: "Kanban Board",
        icon: "i-lucide-square-kanban",
        description: "Project board with draggable task cards and task details.",
        to: "/templates/kanban",
        badge: "new" as const,
      },
      {
        label: "File Manager",
        icon: "i-lucide-folder-open",
        description: "Cloud drive with folder tree, file grid, and details panel.",
        to: "/templates/file-manager",
        badge: "new" as const,
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
      {
        label: "Docs",
        icon: "i-lucide-book-open",
        description: "Documentation page with sidebar, search, and table of contents.",
        to: "/templates/docs",
        badge: "new" as const,
      },
      {
        label: "Portfolio",
        icon: "i-lucide-briefcase",
        description: "Personal portfolio with work, experience, and contact.",
        to: "/templates/portfolio",
        badge: "new" as const,
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
  {
    label: "Commerce Templates",
    icon: "i-lucide-shopping-cart",
    slug: "commerce",
    description: "Storefront pages for products, carts, and checkout.",
    items: [
      {
        label: "Product & Checkout",
        icon: "i-lucide-shopping-bag",
        description: "Product page with gallery, cart, and checkout form.",
        to: "/templates/checkout",
        badge: "new" as const,
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

