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

