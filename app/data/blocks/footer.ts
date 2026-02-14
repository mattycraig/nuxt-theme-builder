import type { BlockShowcaseItem } from "~/types/components";

import FooterSimple from "~/components/blocks/components/FooterSimple.vue";
import FooterColumns from "~/components/blocks/components/FooterColumns.vue";
import FooterBig from "~/components/blocks/components/FooterBig.vue";
import FooterMinimal from "~/components/blocks/components/FooterMinimal.vue";
import FooterGradientCTA from "~/components/blocks/components/FooterGradientCTA.vue";
import FooterGlassPanels from "~/components/blocks/components/FooterGlassPanels.vue";
import FooterBrandBold from "~/components/blocks/components/FooterBrandBold.vue";
import FooterSocialRings from "~/components/blocks/components/FooterSocialRings.vue";

import FooterSimpleRaw from "~/components/blocks/components/FooterSimple.vue?raw";
import FooterColumnsRaw from "~/components/blocks/components/FooterColumns.vue?raw";
import FooterBigRaw from "~/components/blocks/components/FooterBig.vue?raw";
import FooterMinimalRaw from "~/components/blocks/components/FooterMinimal.vue?raw";
import FooterGradientCTARaw from "~/components/blocks/components/FooterGradientCTA.vue?raw";
import FooterGlassPanelsRaw from "~/components/blocks/components/FooterGlassPanels.vue?raw";
import FooterBrandBoldRaw from "~/components/blocks/components/FooterBrandBold.vue?raw";
import FooterSocialRingsRaw from "~/components/blocks/components/FooterSocialRings.vue?raw";

export const FOOTER_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "footer-simple",
    title: "Simple Footer",
    description: "Single-row footer with logo, nav links, and copyright text.",
    prompt: `Generate a simple single-row footer using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A footer element with border-t border-(--ui-border), bg-(--ui-bg), and py-8
- A max-w-7xl centered container with a flex row (flex-col sm:flex-row, items-center, justify-between, gap-4):
  - Left: a logo UIcon (i-lucide-palette, text-(--ui-primary)) + brand name span (font-semibold, text-(--ui-text-highlighted))
  - Center: a nav element with aria-label="Footer navigation" containing a ul of 3 links (Privacy, Terms, Contact) styled as text-sm text-(--ui-text-muted) with hover:text-(--ui-text-highlighted) transition-colors
  - Right: a copyright paragraph in text-sm text-(--ui-text-muted)
Style: clean, compact single-row footer with hover transitions and semantic tokens.`,
    source: FooterSimpleRaw,
    component: FooterSimple,
  },
  {
    id: "footer-columns",
    title: "Column Footer",
    description:
      "Multi-column footer with grouped links under category headings and a bottom bar.",
    prompt: `Generate a multi-column footer using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A footer element with border-t, bg-(--ui-bg), py-12
- A max-w-7xl centered container with:
  - A 4-column grid (grid-cols-2 sm:grid-cols-4, gap-8) of link groups, each with:
    - A category heading (text-sm, font-semibold, text-(--ui-text-highlighted), mb-4)
    - A list of 4 links per column (text-sm, text-(--ui-text-muted), hover:text-(--ui-text-highlighted), transition-colors)
  - Columns: Product (Features, Pricing, Changelog, Roadmap), Resources (Documentation, Blog, Tutorials, Community), Company (About, Careers, Press, Partners), Legal (Privacy, Terms, Cookie Policy, GDPR)
  - A USeparator below the grid
  - A bottom row (flex, items-center, justify-between) with logo UIcon + brand name and copyright text
Style: organized multi-column footer with clear category groupings and semantic token theming.`,
    source: FooterColumnsRaw,
    component: FooterColumns,
  },
  {
    id: "footer-big",
    title: "Big Footer",
    description:
      "Full-featured footer with brand description, social links, link columns, and legal row.",
    prompt: `Generate a full-featured big footer using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A footer element with border-t, bg-(--ui-bg-elevated), py-16
- A max-w-7xl centered container with a 5-column grid (lg:grid-cols-5, gap-8):
  - Brand section (lg:col-span-2):
    - Logo UIcon (size-6, text-(--ui-primary)) + bold brand name (text-lg, font-bold)
    - Description paragraph (text-sm, text-(--ui-text-muted), leading-relaxed, max-w-sm)
    - Social UButtons (variant="ghost", color="neutral", size="sm") for GitHub, Twitter, YouTube
  - 3 link columns (Product, Resources, Company) each with heading + 4 links
- A USeparator
- A bottom bar with copyright text on left and legal links (Privacy, Terms, Cookies) on right
Style: comprehensive brand footer with social presence, organized link columns, and elevated background.`,
    source: FooterBigRaw,
    component: FooterBig,
  },
  {
    id: "footer-minimal",
    title: "Minimal Footer",
    description: "Ultra-compact footer with copyright and two links.",
    prompt: `Generate an ultra-minimal footer using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A footer element with border-t, bg-(--ui-bg), py-6
- A max-w-7xl centered container with a flex row (flex-col sm:flex-row, items-center, justify-between, gap-2):
  - Left: a copyright paragraph (text-sm, text-(--ui-text-muted))
  - Right: two links (Privacy, Terms) in text-sm, text-(--ui-text-muted), hover:text-(--ui-text-highlighted), transition-colors
- No logo, no description — maximum whitespace, minimum content
Style: ultra-compact, distraction-free footer with only essential legal information.`,
    source: FooterMinimalRaw,
    component: FooterMinimal,
  },
  {
    id: "footer-gradient-cta",
    title: "Gradient CTA Footer",
    description:
      "An atmospheric footer with gradient orbs, a gradient-text newsletter CTA, email input, and staggered entrance animations above compact link columns.",
    prompt: `Generate an atmospheric gradient CTA footer using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A footer with relative + isolate + overflow-hidden
- Two decorative blurred gradient orbs (absolute-positioned rounded-full divs with bg-(--ui-primary)/10 and bg-(--ui-secondary)/8, blur-[100px] and blur-[80px]) for atmospheric depth
- An upper CTA section (bg-(--ui-bg-elevated), border-t) containing:
  - A gradient-text headline (bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)], bg-clip-text, text-transparent, text-2xl to text-3xl, font-extrabold)
  - A muted description paragraph (max-w-md, text-base to text-lg)
  - A newsletter form with a UInput (icon="i-lucide-mail", size="lg") and a UButton (icon="i-lucide-send", trailing, color="primary") in a flex row
  - Staggered CSS entrance animations (translateY fade-in) with animation-delay on each content element, respecting prefers-reduced-motion
- A lower section (border-t, bg-(--ui-bg)) with 3 link columns (grid-cols-2 sm:grid-cols-3), a USeparator, and a bottom bar with logo + copyright
- All decorative elements use aria-hidden="true"
- Label for newsletter email input uses sr-only class
Style: dramatic gradient atmosphere with CTA newsletter focus and cinematic staggered entrance.`,
    source: FooterGradientCTARaw,
    component: FooterGradientCTA,
  },
  {
    id: "footer-glass-panels",
    title: "Glass Panels Footer",
    description:
      "A glassmorphism footer with a dot-grid background, centered primary glow, frosted-glass link panels with hover effects, and a glass brand card with social icons.",
    prompt: `Generate a glassmorphism footer using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A footer with relative + isolate + overflow-hidden and generous padding (py-14 sm:py-16)
- A dot-grid pattern background (CSS radial-gradient repeating pattern at 0.035 opacity, 24px grid)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/8, blur-[100px])
- A brand glass card (rounded-2xl, border-(--ui-border)/50, bg-(--ui-bg)/55, backdrop-blur-xl, shadow-lg) containing:
  - Logo icon + brand name + description paragraph on the left
  - Social UButton icons (variant="ghost", color="neutral") on the right
- A grid of 3 frosted link panels (rounded-xl, border-(--ui-border)/40, bg-(--ui-bg)/45, backdrop-blur-lg, transition hover:shadow-md) each containing:
  - An uppercase category title in text-(--ui-primary)
  - List of links with a hover dot indicator (group-hover reveal pattern)
- A bottom legal bar in its own glass strip (rounded-xl, bg-(--ui-bg)/40, backdrop-blur-lg)
- All decorative elements use aria-hidden="true"
Style: modern glassmorphism with dot-grid texture, color glow, and frosted card panels for each content group.`,
    source: FooterGlassPanelsRaw,
    component: FooterGlassPanels,
  },
  {
    id: "footer-brand-bold",
    title: "Brand Bold Footer",
    description:
      "A bold brand-centric footer with a gradient accent strip, gradient-text brand name, live metrics card, social buttons, and three link columns with dot markers.",
    prompt: `Generate a bold brand-centric footer using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A footer with bg-(--ui-bg-elevated) and overflow-hidden
- A top gradient accent strip (h-1, bg-gradient-to-r from primary via secondary to primary) as a vivid visual separator
- A 5-column grid layout (lg:grid-cols-5) with:
  - Left brand column (lg:col-span-2) containing:
    - Logo in a rounded-xl bg-(--ui-primary)/10 icon container + gradient-text brand name (bg-gradient-to-r from primary to secondary, bg-clip-text, text-transparent, font-extrabold)
    - A brand description paragraph
    - A metrics card (rounded-xl, border, bg-(--ui-bg), shadow-sm) with a live-status green dot, and a 3-col grid of bold metric values (e.g. "50+", "12k", "3.2k") with tiny labels
    - Social UButtons (variant="soft", color="neutral")
  - Right link columns (lg:col-span-3, grid-cols-2 sm:grid-cols-3) with:
    - Category headings featuring a small primary dot marker before the text
    - Link lists with hover:text-(--ui-primary) transitions
- A bottom bar (border-t, bg-(--ui-bg)) with copyright and a "Made with ♥ and Nuxt UI" tagline
Style: bold brand showcase with gradient accent, real-time metrics card, and vivid primary color accents throughout.`,
    source: FooterBrandBoldRaw,
    component: FooterBrandBold,
  },
  {
    id: "footer-social-rings",
    title: "Social Rings Footer",
    description:
      "A social-first footer with decorative ring ornaments, a warm gradient backdrop, large social platform cards with follower counts, and interactive badge-style quick links.",
    prompt: `Generate a social-first footer with decorative rings using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A footer with relative + isolate + overflow-hidden
- A warm gradient backdrop (absolute inset-0, -z-10, bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5)
- Three decorative ring elements (absolute-positioned, rounded-full, border with primary/secondary at varying opacity) at different corners
- A centered community section with:
  - An uppercase primary-colored label ("Join our community")
  - A bold headline (text-2xl to text-3xl)
  - A 4-column grid of social platform cards (rounded-xl, border, bg-(--ui-bg), hover:border-(--ui-primary)/40, hover:shadow-md, transition-all) each showing:
    - A UIcon for the platform (group-hover color change to primary)
    - Platform name in font-medium
    - Follower count in muted text
- A quick-links section with UBadge chips (variant="subtle", color="neutral", hover:ring-1, hover:ring-(--ui-primary)/30, hover:shadow-sm) wrapped in <a> tags
- A USeparator followed by a bottom bar with logo, legal nav links, and copyright
- All decorative elements use aria-hidden="true"
Style: warm, community-focused footer with atmospheric gradient, decorative rings, interactive social cards, and badge-style navigation.`,
    source: FooterSocialRingsRaw,
    component: FooterSocialRings,
  },
];
