/**
 * Per-route SEO descriptions for the Nuxt UI Theme Builder.
 * Used by the default layout to set meta tags dynamically.
 */

export const SITE_URL = "https://nuxt-ui-themes.com";
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/": "The visual design-token editor for Nuxt UI v4. Configure colors, radius, fonts, and shades — preview 125+ components live — then export as app.config.ts, CSS, or JSON.",
  "/help":
    "Learn how to use the Nuxt UI Theme Builder — configure design tokens, preview components, and export your theme as app.config.ts, CSS, or JSON.",
  "/ai":
    "Generate custom Nuxt UI themes with AI — describe your design vision and get a complete theme configuration you can apply instantly.",

  // ── Component index ────────────────────────────────────────────────────
  "/components":
    "Browse individual Nuxt UI v4 components — buttons, badges, alerts, cards, inputs, tables, and more — all styled with your current theme settings.",

  // Element components
  "/components/alert":
    "Preview Nuxt UI alert components styled with your theme — informational, warning, error, and success notifications with icons and actions.",
  "/components/avatar":
    "Preview Nuxt UI avatar components styled with your theme — user profile images, initials, and status indicators in multiple sizes.",
  "/components/avatar-group":
    "Preview Nuxt UI avatar-group components styled with your theme — stacked avatar groups with overflow indicator.",
  "/components/badge":
    "Preview Nuxt UI badge components styled with your theme — status labels, counters, and tag indicators in multiple variants and colors.",
  "/components/banner":
    "Preview Nuxt UI banner components styled with your theme — full-width notification banners for announcements and alerts.",
  "/components/button":
    "Preview Nuxt UI button components styled with your theme — solid, outline, soft, and ghost variants across all semantic colors and sizes.",
  "/components/calendar":
    "Preview Nuxt UI calendar components styled with your theme — date pickers and calendar widgets for scheduling and date selection.",
  "/components/card":
    "Preview Nuxt UI card components styled with your theme — content containers with headers, footers, images, and action areas.",
  "/components/chip":
    "Preview Nuxt UI chip components styled with your theme — small indicator dots overlaid on avatars or icons for status display.",
  "/components/collapsible":
    "Preview Nuxt UI collapsible components styled with your theme — toggle content visibility with smooth expand and collapse animations.",
  "/components/field-group":
    "Preview Nuxt UI field-group components styled with your theme — group related form fields with shared styling and layout.",
  "/components/icon":
    "Preview Nuxt UI icon components styled with your theme — Iconify icon rendering with dynamic name resolution and sizing.",
  "/components/kbd":
    "Preview Nuxt UI kbd components styled with your theme — keyboard shortcut indicators for key bindings and hotkeys.",
  "/components/progress":
    "Preview Nuxt UI progress components styled with your theme — progress bars and loading indicators with semantic coloring.",
  "/components/separator":
    "Preview Nuxt UI separator components styled with your theme — visual dividers between content sections in horizontal and vertical orientations.",
  "/components/skeleton":
    "Preview Nuxt UI skeleton components styled with your theme — placeholder loading animations for content areas and cards.",

  // Form components
  "/components/checkbox":
    "Preview Nuxt UI checkbox components styled with your theme — single checkbox toggle with label and validation states.",
  "/components/checkbox-group":
    "Preview Nuxt UI checkbox-group components styled with your theme — multiple checkbox options in a grouped layout.",
  "/components/color-picker":
    "Preview Nuxt UI color-picker components styled with your theme — color selection with swatches and custom hex input.",
  "/components/file-upload":
    "Preview Nuxt UI file-upload components styled with your theme — drag-and-drop or click-to-upload file input areas.",
  "/components/form":
    "Preview Nuxt UI form components styled with your theme — form wrapper with validation, submission handling, and error display.",
  "/components/form-field":
    "Preview Nuxt UI form-field components styled with your theme — labeled field wrapper with validation, help text, and error messages.",
  "/components/input":
    "Preview Nuxt UI input components styled with your theme — text fields with icons, placeholder text, and validation states.",
  "/components/input-date":
    "Preview Nuxt UI input-date components styled with your theme — date input with integrated calendar picker and keyboard navigation support.",
  "/components/input-menu":
    "Preview Nuxt UI input-menu components styled with your theme — input with dropdown menu for suggestions or autocomplete.",
  "/components/input-number":
    "Preview Nuxt UI input-number components styled with your theme — numeric input with increment and decrement controls.",
  "/components/input-tags":
    "Preview Nuxt UI input-tags components styled with your theme — tag input for entering multiple values as tokens.",
  "/components/input-time":
    "Preview Nuxt UI input-time components styled with your theme — time input with hour and minute selection controls.",
  "/components/pin-input":
    "Preview Nuxt UI pin-input components styled with your theme — segmented single-character input for PIN codes, OTPs, and verification flows.",
  "/components/radio-group":
    "Preview Nuxt UI radio-group components styled with your theme — single-select radio options in a grouped layout.",
  "/components/select":
    "Preview Nuxt UI select components styled with your theme — dropdown select with single selection and option rendering.",
  "/components/select-menu":
    "Preview Nuxt UI select-menu components styled with your theme — searchable select with multiple selection support.",
  "/components/slider":
    "Preview Nuxt UI slider components styled with your theme — range slider for numeric value selection with min and max bounds.",
  "/components/switch":
    "Preview Nuxt UI switch components styled with your theme — toggle switch for boolean settings and preferences with label and disabled states.",
  "/components/textarea":
    "Preview Nuxt UI textarea components styled with your theme — multi-line text input with auto-resize, character counting, and validation states.",

  // Data components
  "/components/accordion":
    "Preview Nuxt UI accordion components styled with your theme — expandable content panels for FAQs, nested menus, and collapsible sections.",
  "/components/carousel":
    "Preview Nuxt UI carousel components styled with your theme — horizontal content carousel with navigation controls and slide transitions.",
  "/components/empty":
    "Preview Nuxt UI empty components styled with your theme — empty state placeholder with icon, message, and action button.",
  "/components/marquee":
    "Preview Nuxt UI marquee components styled with your theme — auto-scrolling horizontal content ticker for logos and announcements.",
  "/components/scroll-area":
    "Preview Nuxt UI scroll-area components styled with your theme — custom scrollbar container with overflow management.",
  "/components/table":
    "Preview Nuxt UI table components styled with your theme — sortable data tables with pagination, selection, and custom cell rendering.",
  "/components/timeline":
    "Preview Nuxt UI timeline components styled with your theme — chronological event display with icons and metadata.",
  "/components/tree":
    "Preview Nuxt UI tree components styled with your theme — hierarchical tree view with expand and collapse for file browsers.",
  "/components/user":
    "Preview Nuxt UI user components styled with your theme — user identity display with avatar, name, and description.",

  // Navigation components
  "/components/breadcrumb":
    "Preview Nuxt UI breadcrumb components styled with your theme — hierarchical path breadcrumbs with separator customization.",
  "/components/command-palette":
    "Preview Nuxt UI command-palette components styled with your theme — searchable command palette with keyboard navigation.",
  "/components/footer-columns":
    "Preview Nuxt UI footer-columns components styled with your theme — multi-column footer layout with grouped links.",
  "/components/link":
    "Preview Nuxt UI link components styled with your theme — enhanced anchor element with active state, icon support, and external link handling.",
  "/components/navigation-menu":
    "Preview Nuxt UI navigation-menu components styled with your theme — navigation menu with icon links and active state indicators.",
  "/components/pagination":
    "Preview Nuxt UI pagination components styled with your theme — page navigation controls for paginated data sets.",
  "/components/stepper":
    "Preview Nuxt UI stepper components styled with your theme — multi-step progress indicator for wizards and flows.",
  "/components/tabs":
    "Preview Nuxt UI tab components styled with your theme — horizontal and vertical tab layouts for organizing content sections.",

  // Overlay components
  "/components/context-menu":
    "Preview Nuxt UI context-menu components styled with your theme — right-click context menus with grouped actions.",
  "/components/drawer":
    "Preview Nuxt UI drawer components styled with your theme — bottom sheet drawer with swipe-to-dismiss gesture for mobile-friendly overlay panels.",
  "/components/dropdown-menu":
    "Preview Nuxt UI dropdown-menu components styled with your theme — dropdown menus with grouped actions, icons, and keyboard shortcuts.",
  "/components/modal":
    "Preview Nuxt UI modal components styled with your theme — dialog overlays for confirmations, forms, and content.",
  "/components/popover":
    "Preview Nuxt UI popover components styled with your theme — floating content panels triggered by click or hover.",
  "/components/slideover":
    "Preview Nuxt UI slideover components styled with your theme — slide-in panel overlays from the screen edge for detail views and settings.",
  "/components/toast":
    "Preview Nuxt UI toast components styled with your theme — notification toasts for transient feedback messages with auto-dismiss and actions.",
  "/components/tooltip":
    "Preview Nuxt UI tooltip components styled with your theme — contextual hover hints with configurable placement and delay for UI clarification.",

  // ── Block pages ────────────────────────────────────────────────────────
  "/blocks":
    "Explore pre-built layout blocks — hero sections, feature grids, CTAs, testimonials, stats, and more — styled with your current Nuxt UI theme.",
  "/blocks/hero":
    "Preview hero section blocks styled with your theme — bold headlines, calls to action, and background imagery for landing-page headers.",
  "/blocks/cta":
    "Preview call-to-action blocks styled with your theme — conversion-focused sections with buttons and persuasive copy.",
  "/blocks/feature":
    "Preview feature grid blocks styled with your theme — icon-based feature highlights and bento layouts for showcasing capabilities.",
  "/blocks/pricing":
    "Preview pricing blocks styled with your theme — pricing plans, comparison tables, and single-product pricing cards.",
  "/blocks/testimonial":
    "Preview testimonial blocks styled with your theme — customer quotes, review cards, logo walls, and social proof sections.",
  "/blocks/statistic":
    "Preview statistics blocks styled with your theme — metric counters, stat cards, and KPI sections for social proof.",
  "/blocks/blog":
    "Preview blog blocks styled with your theme — blog post grids, featured articles, magazine-style layouts, and reading-time indicators.",
  "/blocks/content":
    "Preview content blocks styled with your theme — centered prose, split layouts, multi-column content, and aside sections.",
  "/blocks/gallery":
    "Preview gallery blocks styled with your theme — spotlight grids, masonry walls, cinematic showcases, and portfolio layouts.",
  "/blocks/step":
    "Preview step blocks styled with your theme — numbered step sections, vertical timelines, and how-it-works flows.",
  "/blocks/header":
    "Preview header blocks styled with your theme — site headers with logo, navigation links, action buttons, and responsive mobile menus.",
  "/blocks/footer":
    "Preview footer blocks styled with your theme — site footers with link columns, social icons, newsletter signup, and legal information rows.",
  "/blocks/contact":
    "Preview contact blocks styled with your theme — contact forms, split info layouts, channel cards, and embedded map sections for support pages.",
  "/blocks/team":
    "Preview team blocks styled with your theme — team member grids, profile cards, featured bios, and role-based layouts for about pages.",
  "/blocks/ecommerce":
    "Preview e-commerce blocks styled with your theme — product grids, storefront showcases, and category layouts.",

  // ── Template pages ─────────────────────────────────────────────────────
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
    "Preview a rich text editor template styled with your theme — toolbar, content area, markdown support, and formatting controls.",
  "/templates/error-page":
    "Preview an error page template styled with your theme — 404 and 500 error states with illustrations and navigation links.",
  "/templates/login":
    "Preview an authentication template styled with your theme — login and registration forms with social sign-in options.",
  "/templates/changelog":
    "Preview a changelog template styled with your theme — version history, release notes, update timeline, and semantic versioning display.",

  // ── Utility pages ──────────────────────────────────────────────────────
  "/privacy":
    "Privacy policy for the Nuxt UI Theme Builder — learn what data is stored locally and how your preferences are handled.",
  "/about":
    "Build Nuxt UI themes visually — pick colors, preview 125+ components live, and export production-ready code. Free and open source.",
  "/contact":
    "Get in touch with the Nuxt UI Theme Builder team — report bugs, request features, suggest improvements, or join the community on GitHub.",

  // ── Learn pages ────────────────────────────────────────────────────────
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
    "How to choose, pair, and apply fonts in Nuxt UI v4 applications using Nuxt Fonts, CSS variables, and web font optimization strategies.",
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

  // ── Tool pages ─────────────────────────────────────────────────────────
  "/tools":
    "Color and design utilities for Nuxt UI v4 theme development — palette viewer, generator, contrast checker, and color converter.",
  "/tools/palette-viewer":
    "Browse every Tailwind CSS / Nuxt UI color palette and shade — click to copy HEX or OKLCH values for your theme.",
  "/tools/palette-generator":
    "Generate random semantic color palettes for Nuxt UI v4 themes — preview live swatches and export them as CSS variables or JSON.",
  "/tools/contrast-checker":
    "Check WCAG AA and AAA color-contrast ratios between any two colors — ensure your Nuxt UI theme meets accessibility standards.",
  "/tools/color-converter":
    "Convert colors between HEX, RGB, HSL, and OKLCH formats — a quick reference tool for Nuxt UI v4 theme development.",
};

export const DEFAULT_DESCRIPTION =
  "Visually configure Nuxt UI v4 design tokens — colors, radius, fonts, and shades — preview every component live, then export as app.config.ts, CSS, or JSON.";
