/**
 * Per-route SEO descriptions for the Nuxt UI Theme Builder.
 * Used by the default layout to set meta tags dynamically.
 */

export const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/": "The visual design-token editor for Nuxt UI v4. Configure colors, radius, fonts, and shades — preview 125+ components live — export as app.config.ts, CSS, or JSON. AI-powered theme generation included.",
  "/help":
    "Learn how to use the Nuxt UI Theme Builder — configure design tokens, preview components, and export your theme as app.config.ts, CSS, or JSON.",
  "/ai":
    "Generate custom Nuxt UI themes with AI — describe your design vision and get a complete theme configuration you can apply instantly.",
  // Component pages
  "/components":
    "Browse individual Nuxt UI v4 components — buttons, badges, alerts, cards, inputs, tables, and more — all styled with your current theme settings.",
  "/components/all":
    "A live showcase of every Nuxt UI v4 component rendered with your current theme — buttons, inputs, tables, cards, and more on a single page.",
  "/components/accordion":
    "Preview Nuxt UI accordion components styled with your theme — expandable content panels for FAQs, nested menus, and collapsible sections.",
  "/components/alerts":
    "Preview Nuxt UI alert components styled with your theme — informational, warning, error, and success notifications with icons and actions.",
  "/components/avatars":
    "Preview Nuxt UI avatar components styled with your theme — user profile images, initials, status indicators, and avatar groups.",
  "/components/badges":
    "Preview Nuxt UI badge components styled with your theme — status labels, counters, and tag indicators in multiple variants and colors.",
  "/components/buttons":
    "Preview Nuxt UI button components styled with your theme — solid, outline, ghost, and link variants across all semantic colors and sizes.",
  "/components/calendar":
    "Preview Nuxt UI calendar components styled with your theme — date pickers and calendar widgets for scheduling and date selection.",
  "/components/cards":
    "Preview Nuxt UI card components styled with your theme — content containers with headers, footers, images, and action areas.",
  "/components/dropdown":
    "Preview Nuxt UI dropdown components styled with your theme — context menus, action lists, and nested menu options.",
  "/components/inputs":
    "Preview Nuxt UI input components styled with your theme — text fields, selects, checkboxes, toggles, textareas, and form controls.",
  "/components/misc":
    "Preview miscellaneous Nuxt UI components styled with your theme — tooltips, separators, skeletons, and other utility elements.",
  "/components/navigation":
    "Preview Nuxt UI navigation components styled with your theme — breadcrumbs, pagination, command palette, and tab navigation.",
  "/components/progress":
    "Preview Nuxt UI progress components styled with your theme — progress bars, loading indicators, and step-based progress trackers.",
  "/components/table":
    "Preview Nuxt UI table components styled with your theme — sortable data tables with pagination, selection, and custom cell rendering.",
  "/components/tabs":
    "Preview Nuxt UI tab components styled with your theme — horizontal and vertical tab layouts for organizing content sections.",
  // Block pages
  "/blocks":
    "Explore pre-built layout blocks — hero sections, feature grids, CTAs, testimonials, stats, and FAQs — styled with your current Nuxt UI theme.",
  "/blocks/hero":
    "Preview hero section blocks styled with your theme — bold headlines, calls to action, and background imagery for landing-page headers.",
  "/blocks/features":
    "Preview feature grid blocks styled with your theme — icon-based feature highlights for showcasing product capabilities.",
  "/blocks/cta":
    "Preview call-to-action blocks styled with your theme — conversion-focused sections with buttons and persuasive copy.",
  "/blocks/testimonials":
    "Preview testimonial blocks styled with your theme — customer quotes, ratings, and social proof sections.",
  "/blocks/stats":
    "Preview statistics blocks styled with your theme — metric counters, KPI dashboards, and data-highlight sections.",
  "/blocks/faq":
    "Preview FAQ blocks styled with your theme — accordion-based question and answer sections for common inquiries.",
  // Template pages
  "/templates":
    "See your theme applied to full page templates — dashboards, blogs, pricing pages, login screens, and more — all built with Nuxt UI v4 components.",
  "/templates/dashboard":
    "Preview a dashboard template styled with your theme — sidebar navigation, data cards, charts, and admin panel layout.",
  "/templates/blog":
    "Preview a blog template styled with your theme — article cards, featured posts, categories, and reading-list layouts.",
  "/templates/pricing":
    "Preview a pricing page template styled with your theme — tiered pricing cards, feature comparisons, and billing toggle.",
  "/templates/landing":
    "Preview a landing page template styled with your theme — hero section, features, testimonials, and conversion-focused layout.",
  "/templates/chat":
    "Preview a chat application template styled with your theme — message bubbles, conversation list, and real-time messaging UI.",
  "/templates/editor":
    "Preview a rich text editor template styled with your theme — toolbar, content area, and formatting controls.",
  "/templates/error-page":
    "Preview an error page template styled with your theme — 404 and 500 error states with illustrations and navigation links.",
  // Utility pages
  "/privacy":
    "Privacy policy for the Nuxt UI Theme Builder — learn what data is stored locally and how your preferences are handled.",
  "/about":
    "Build Nuxt UI themes visually — pick colors, preview 125+ components live, and export production-ready code. Free and open source.",
  "/contact":
    "Get in touch with the Nuxt UI Theme Builder team — report bugs, request features, or join the community.",
  // Learn pages
  "/learn":
    "Guides, references, and tips for theming Nuxt UI v4 applications — colors, dark mode, Tailwind CSS v4, typography, accessibility, and design systems.",
  "/learn/theming/customize-colors":
    "Learn how to configure semantic color palettes, per-role shades, and neutral tones in Nuxt UI v4 to match your brand identity.",
  "/learn/theming/dark-mode-guide":
    "Build polished dual-mode themes with independent light and dark color configurations using Nuxt UI v4 and Tailwind CSS v4.",
  "/learn/theming/color-palette-reference":
    "Complete reference of all available color palettes in Nuxt UI v4 with shade values, usage guidance, and pairing recommendations.",
  "/learn/theming/css-variables-reference":
    "Complete reference of CSS custom properties (design tokens) used by Nuxt UI v4 for colors, radius, typography, and spacing.",
  "/learn/theming/typography-font-pairing":
    "How to choose, pair, and apply fonts in Nuxt UI v4 applications using Nuxt Fonts and CSS variables.",
  "/learn/theming/export-and-share":
    "Export your Nuxt UI v4 themes as app.config.ts, CSS variables, or JSON — and share them with your team or community.",
  "/learn/components/styling-cheat-sheet":
    "Quick reference for customizing individual Nuxt UI v4 components using variants, colors, sizes, and theme tokens.",
  "/learn/tailwind/tailwind-v4-theming":
    "Key differences in Tailwind CSS v4 theming versus v3 — CSS variables, OKLCH color space, and new configuration patterns.",
  "/learn/best-practices/design-system-guide":
    "How to build a consistent, scalable design system for Nuxt applications using Nuxt UI v4 design tokens and conventions.",
  "/learn/best-practices/accessible-color-contrast":
    "Ensure your theme colors meet WCAG 2.2 contrast requirements for text, UI components, and interactive elements.",
  // Tool pages
  "/tools":
    "Color and design utilities for Nuxt UI v4 theme development — palette viewer, generator, contrast checker, and color converter.",
  "/tools/palette-viewer":
    "Browse every Tailwind CSS / Nuxt UI color palette and shade — click to copy HEX or OKLCH values for your theme.",
  "/tools/palette-generator":
    "Generate random semantic color palettes for Nuxt UI v4 themes and export them as CSS variables or JSON.",
  "/tools/contrast-checker":
    "Check WCAG AA and AAA color-contrast ratios between any two colors — ensure your Nuxt UI theme meets accessibility standards.",
  "/tools/color-converter":
    "Convert colors between HEX, RGB, HSL, and OKLCH formats — a quick reference tool for Nuxt UI v4 theme development.",
};

export const DEFAULT_DESCRIPTION =
  "Visually configure Nuxt UI v4 design tokens — colors, radius, fonts, and shades — preview every component live, then export as app.config.ts, CSS, or JSON.";
