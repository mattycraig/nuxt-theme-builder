/**
 * Dynamic route paths for blocks, components, and learn articles.
 *
 * Used by the sitemap endpoint (server/api/__sitemap__/urls.ts) to provide
 * all dynamic routes to @nuxtjs/sitemap at build time.
 *
 * Keep in sync with:
 *   - app/utils/navigation/blocks.ts    → BLOCK_CATEGORIES
 *   - app/utils/navigation/components.ts → COMPONENT_CATEGORIES
 *   - app/utils/navigation/learn.ts     → LEARN_CATEGORIES
 *   - content/learn/**\/*.md             → article files
 *
 * @module shared/constants/routes
 */

export const BLOCK_ROUTES = [
  "/blocks/hero",
  "/blocks/cta",
  "/blocks/feature",
  "/blocks/pricing",
  "/blocks/testimonial",
  "/blocks/statistic",
  "/blocks/blog",
  "/blocks/content",
  "/blocks/gallery",
  "/blocks/step",
  "/blocks/header",
  "/blocks/footer",
  "/blocks/contact",
  "/blocks/team",
  "/blocks/ecommerce",
] as const;

export const COMPONENT_ROUTES = [
  // Element
  "/components/alert",
  "/components/avatar",
  "/components/avatar-group",
  "/components/badge",
  "/components/banner",
  "/components/button",
  "/components/calendar",
  "/components/card",
  "/components/chip",
  "/components/collapsible",
  "/components/field-group",
  "/components/icon",
  "/components/kbd",
  "/components/progress",
  "/components/separator",
  "/components/skeleton",
  // Form
  "/components/checkbox",
  "/components/checkbox-group",
  "/components/color-picker",
  "/components/file-upload",
  "/components/form",
  "/components/form-field",
  "/components/input",
  "/components/input-date",
  "/components/input-menu",
  "/components/input-number",
  "/components/input-tags",
  "/components/input-time",
  "/components/pin-input",
  "/components/radio-group",
  "/components/select",
  "/components/select-menu",
  "/components/slider",
  "/components/switch",
  "/components/textarea",
  // Data
  "/components/accordion",
  "/components/carousel",
  "/components/empty",
  "/components/marquee",
  "/components/scroll-area",
  "/components/table",
  "/components/timeline",
  "/components/tree",
  "/components/user",
  // Navigation
  "/components/breadcrumb",
  "/components/command-palette",
  "/components/footer-columns",
  "/components/link",
  "/components/navigation-menu",
  "/components/pagination",
  "/components/stepper",
  "/components/tabs",
  // Overlay
  "/components/context-menu",
  "/components/drawer",
  "/components/dropdown-menu",
  "/components/modal",
  "/components/popover",
  "/components/slideover",
  "/components/toast",
  "/components/tooltip",
] as const;

export const LEARN_ROUTES = [
  "/learn/theming/customize-colors",
  "/learn/theming/dark-mode-guide",
  "/learn/theming/color-palette-reference",
  "/learn/theming/css-variables-reference",
  "/learn/theming/typography-font-pairing",
  "/learn/theming/export-and-share",
  "/learn/components/styling-cheat-sheet",
  "/learn/tailwind/tailwind-v4-theming",
  "/learn/best-practices/design-system-guide",
  "/learn/best-practices/accessible-color-contrast",
] as const;

/** All dynamic routes that need to be included in the sitemap. */
export const ALL_DYNAMIC_ROUTES = [
  ...BLOCK_ROUTES,
  ...COMPONENT_ROUTES,
  ...LEARN_ROUTES,
] as const;
