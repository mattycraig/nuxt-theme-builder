/**
 * Dynamic route paths for blocks, components, learn articles, and themes.
 *
 * Used by the sitemap endpoint (server/api/__sitemap__/urls.ts) to provide
 * all dynamic routes to @nuxtjs/sitemap at build time.
 *
 * Keep in sync with:
 *   - app/utils/navigation/blocks.ts    → BLOCK_CATEGORIES
 *   - app/utils/navigation/components.ts → COMPONENT_CATEGORIES
 *   - app/utils/navigation/learn.ts     → LEARN_CATEGORIES
 *   - content/learn/**\/*.md             → article files
 *   - app/utils/presets.ts              → BUILT_IN_PRESETS (via presetSlug)
 *
 * @module shared/constants/routes
 */

/**
 * Blank page that every preview iframe loads first. Pages are prerendered
 * without their query string, so loading `/components/button?preview`
 * directly would serve the editor's HTML (with its own nested iframe) and
 * only switch to the preview layout after hydration. The shell is
 * prerendered with the preview layout, and the parent then navigates it
 * client-side with a NAVIGATE message.
 */
export const PREVIEW_SHELL_PATH = "/preview";

/**
 * Component, block, and template demos, plus /ai (a full-screen app with its
 * own dashboard shell).
 */
const FRAMED_ROUTE_PATTERN =
  /^\/(?:(?:components|blocks|templates)\/[^/]+|ai)\/?$/;

/**
 * Whether the editor renders `path` inside the resizable preview iframe.
 *
 * Demos need the iframe so their breakpoints follow the preview width. Every
 * other page renders directly in the editor: the iframe document is noindex,
 * so content shown only through it doesn't count for search engines.
 */
export function isFramedRoute(path: string): boolean {
  return FRAMED_ROUTE_PATTERN.test(path);
}

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
  "/learn/theming/brand-hex-color",
  "/learn/theming/global-border-radius",
  "/learn/theming/migrate-theme-to-v4",
  "/learn/components/styling-cheat-sheet",
  "/learn/components/restyle-one-component",
  "/learn/tailwind/tailwind-v4-theming",
  "/learn/best-practices/design-system-guide",
  "/learn/best-practices/accessible-color-contrast",
  "/learn/best-practices/nuxt-ui-vs-shadcn-vue-theming",
] as const;

/** One gallery page per built-in preset, at `/themes/<presetSlug(name)>`. */
export const THEME_ROUTES = [
  "/themes/default",
  "/themes/nuxt-ui",
  "/themes/shadcn",
  "/themes/cherry",
  "/themes/sunset",
  "/themes/sahara",
  "/themes/sunflower",
  "/themes/zest",
  "/themes/forest",
  "/themes/emerald",
  "/themes/coastal",
  "/themes/arctic",
  "/themes/minimal",
  "/themes/corporate",
  "/themes/dark-mono",
  "/themes/lavender",
  "/themes/neon",
  "/themes/blush",
  "/themes/rose-gold",
  "/themes/spotify",
  "/themes/youtube",
  "/themes/slack",
  "/themes/discord",
  "/themes/github",
  "/themes/stripe",
  "/themes/twitch",
  "/themes/netflix",
  "/themes/linear",
] as const;

export const TOOL_ROUTES = [
  "/tools/color-converter",
  "/tools/contrast-checker",
  "/tools/palette-generator",
  "/tools/palette-viewer",
] as const;

export const TEMPLATE_ROUTES = [
  "/templates/blog",
  "/templates/changelog",
  "/templates/chat",
  "/templates/dashboard",
  "/templates/editor",
  "/templates/error-page",
  "/templates/landing",
  "/templates/login",
  "/templates/pricing",
] as const;

export const NOINDEX_DEMO_ROUTES = [
  ...BLOCK_ROUTES,
  ...COMPONENT_ROUTES,
  ...TEMPLATE_ROUTES,
] as const;

export const INDEXABLE_DYNAMIC_ROUTES = [
  ...LEARN_ROUTES,
  ...THEME_ROUTES,
] as const;

export const PUBLIC_STATIC_ROUTES = [
  "/",
  "/about",
  "/ai",
  "/blocks",
  "/components",
  "/contact",
  "/help",
  "/learn",
  "/privacy",
  "/templates",
  "/themes",
  "/tools",
] as const;

/** All dynamic routes that need to be included in the sitemap. */
export const ALL_DYNAMIC_ROUTES = [
  ...BLOCK_ROUTES,
  ...COMPONENT_ROUTES,
  ...LEARN_ROUTES,
  ...THEME_ROUTES,
] as const;

export const PUBLIC_PRERENDER_ROUTES = [
  ...PUBLIC_STATIC_ROUTES,
  ...TOOL_ROUTES,
  ...TEMPLATE_ROUTES,
  ...ALL_DYNAMIC_ROUTES,
] as const;
