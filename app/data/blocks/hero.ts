import type { BlockShowcaseItem } from "~/types/components";

import HeroCentered from "~/components/blocks/components/HeroCentered.vue";
import HeroSplit from "~/components/blocks/components/HeroSplit.vue";
import HeroPageHero from "~/components/blocks/components/HeroPageHero.vue";
import HeroSearch from "~/components/blocks/components/HeroSearch.vue";
import HeroMinimal from "~/components/blocks/components/HeroMinimal.vue";
import HeroProductLaunch from "~/components/blocks/components/HeroProductLaunch.vue";
import heroCenteredRaw from "~/components/blocks/components/HeroCentered.vue?raw";
import heroSplitRaw from "~/components/blocks/components/HeroSplit.vue?raw";
import heroPageHeroRaw from "~/components/blocks/components/HeroPageHero.vue?raw";
import heroSearchRaw from "~/components/blocks/components/HeroSearch.vue?raw";
import heroMinimalRaw from "~/components/blocks/components/HeroMinimal.vue?raw";
import heroProductLaunchRaw from "~/components/blocks/components/HeroProductLaunch.vue?raw";

export const HERO_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "hero-centered",
    title: "Hero 1",
    description:
      "A centered hero section featuring a bold, visually appealing heading with a subtitle badge, descriptive text, and dual call-to-action buttons — ideal for product launches and landing pages.",
    prompt: `Generate a centered hero section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A subtle badge at the top (e.g. "New Release") using UBadge with color="primary" variant="subtle"
- A bold headline (text-3xl to text-5xl, font-bold, tracking-tight) centered with max-w-2xl
- A muted subtitle paragraph (text-lg) centered with max-w-xl
- Two call-to-action buttons side by side: a primary UButton with a trailing arrow icon, and a secondary outline UButton with color="neutral"
- Generous vertical padding (py-20 sm:py-28) with text-center alignment
- Use Nuxt UI semantic color tokens (--ui-text-highlighted, --ui-text-muted, --ui-primary) for theming
Style: clean, modern centered layout with generous whitespace and strong visual hierarchy.`,
    source: heroCenteredRaw,
    component: HeroCentered,
  },
  {
    id: "hero-split",
    title: "Hero 2",
    description:
      "A split-layout hero section with a content column on the left featuring a badge, headline, subtitle, and actions, paired with an image placeholder on the right — great for product showcases and feature highlights.",
    prompt: `Generate a split-layout hero section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A two-column grid layout (grid lg:grid-cols-2) with items-center alignment
- LEFT COLUMN: A subtle badge using UBadge (e.g. "v4.0"), a bold headline (text-3xl to text-4xl), a muted subtitle paragraph, and two action buttons (primary UButton + ghost neutral UButton with trailing external-link icon)
- RIGHT COLUMN: An image placeholder area with aspect-[4/3] ratio, rounded-lg borders, elevated background, and a centered placeholder icon with text
- Responsive padding (p-6 sm:p-12) with gap-8 between columns
- Use Nuxt UI semantic color tokens (--ui-text-highlighted, --ui-text-muted, --ui-bg-elevated, --ui-border) for theming
Style: modern asymmetric layout balancing content and visual, with clear hierarchy and professional spacing.`,
    source: heroSplitRaw,
    component: HeroSplit,
  },
  {
    id: "hero-page-hero",
    title: "Hero 3",
    description:
      "A hero section built with the UPageHero component — the canonical Nuxt UI v4 pattern with headline, title, description, and link buttons with automatic responsive layout.",
    prompt: `Generate a hero section using the Nuxt UI v4 UPageHero component. It should include:
- UPageHero with headline (small text above title), title, and description props
- A :links array of ButtonProps for CTA buttons (primary + outline neutral)
- The component handles responsive layout, centering, and spacing automatically
- Wrap in a <section> for semantic HTML
Style: clean, canonical Nuxt UI hero layout using the built-in UPageHero component.`,
    source: heroPageHeroRaw,
    component: HeroPageHero,
  },
  {
    id: "hero-search",
    title: "Hero 4",
    description:
      "A search-focused hero section using UPageHero with a prominent search input and suggestion chips — ideal for documentation sites, knowledge bases, and support portals.",
    prompt: `Generate a search-focused hero using Nuxt UI v4 UPageHero. It should include:
- UPageHero with headline, title, and description props
- Default slot containing a centered UInput with icon="i-lucide-search", size="xl", and proper aria-label
- Below the input, a row of UBadge chips as popular search suggestions
- The input and suggestions are wrapped in a max-w-xl container for visual balance
Style: documentation-style hero with search as the primary action.`,
    source: heroSearchRaw,
    component: HeroSearch,
  },
  {
    id: "hero-minimal",
    title: "Hero 5",
    description:
      "An ultra-minimal hero section using UPageHero with just a bold title and a single call-to-action button — maximum whitespace and visual impact.",
    prompt: `Generate a minimal hero section using Nuxt UI v4 UPageHero. It should include:
- UPageHero with only a title prop (no headline or description)
- A single :links button for the primary CTA
- Let the component's built-in spacing and layout do the work
Style: ultra-minimal with maximum whitespace and a single strong focal point.`,
    source: heroMinimalRaw,
    component: HeroMinimal,
  },
  {
    id: "hero-product-launch",
    title: "Hero 6",
    description:
      "A product launch hero combining UPageHero with UPageLogos for social proof — headline badge, bold title, descriptive text, dual CTAs, and a trusted-by logo strip below.",
    prompt: `Generate a product launch hero using Nuxt UI v4 UPageHero and UPageLogos. It should include:
- UPageHero with headline (e.g. "Now Available — v4.0"), title, description, and :links array (primary CTA + outline neutral CTA)
- A #bottom template slot containing UPageLogos with a title like "Trusted by teams at" and placeholder logo text items
- The combination creates a compelling hero with built-in social proof
Style: product launch with trust-building social proof section below the fold.`,
    source: heroProductLaunchRaw,
    component: HeroProductLaunch,
  },
];
