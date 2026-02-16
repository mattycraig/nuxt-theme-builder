import type { NavigationMenuItem } from "@nuxt/ui";
import type { BlockCategory } from "~/types/components";
import { flattenCategories } from "./shared";

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
          "Spotlight grids, masonry walls, cinematic showcases, bento portfolios, photo archives, and editorial layouts.",
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
          "Glow product grids, glassmorphism details, spotlight features, atmospheric categories, glass carts, and storefront showcases.",
        to: "/blocks/ecommerce",
      },
    ],
  },
];

export const BLOCK_NAV_ITEMS: NavigationMenuItem[] = flattenCategories(
  BLOCK_CATEGORIES,
  "All Blocks",
  "i-lucide-blocks",
  "/blocks",);
