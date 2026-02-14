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
      "A gradient atmosphere hero with decorative primary/secondary color orbs, a gradient-to-solid split headline, staggered entrance animations, and generous spacing — dramatic and eye-catching for marketing pages.",
    prompt: `Generate a centered gradient atmosphere hero section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A container with relative + isolate + overflow-hidden and generous padding (py-24 sm:py-32)
- Two decorative blurred gradient orbs (absolute-positioned rounded-full divs with bg-(--ui-primary)/15 and bg-(--ui-secondary)/10, blur-[100px] and blur-[80px]) for atmospheric depth
- A UBadge (color="primary", variant="subtle", size="lg") at the top
- A multi-part headline (text-4xl to text-6xl, font-extrabold, tracking-tight): first span uses CSS gradient text (bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)], bg-clip-text, text-transparent), second span uses solid --ui-text-highlighted
- A muted description paragraph (text-lg to text-xl) with max-w-xl and leading-relaxed
- Two CTA buttons: primary UButton with trailing arrow icon + outline neutral UButton
- Staggered CSS entrance animations (translateY fade-in) with animation-delay on each content element, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: dramatic gradient atmosphere with theme-responsive color orbs and cinematic entrance.`,
    source: heroCenteredRaw,
    component: HeroCentered,
  },
  {
    id: "hero-split",
    title: "Hero 2",
    description:
      "A horizontal split hero using UPageHero with a realistic mock app UI card featuring window chrome, color palette swatches, status badges, and a floating export-success notification — great for product showcases.",
    prompt: `Generate a horizontal split hero using Nuxt UI v4 UPageHero with orientation="horizontal". It should include:
- UPageHero with headline (e.g. "v4.0"), title, description, and :links array (primary + ghost neutral buttons)
- Default slot containing a realistic mock app UI card wrapped in rounded-2xl, border, bg-elevated, shadow-2xl:
  - A window chrome bar (3 colored dots: red, yellow, green + monospace filename text)
  - Content rows showing a themed icon (bg-(--ui-primary)/15) + skeleton progress bars + UBadge status tags (success, warning)
  - A color swatch strip showing 5 shades of the primary color (--ui-color-primary-600 through -200)
- A floating success notification card (absolute positioned, -bottom-3 -left-3) with a check-circle icon and "Theme exported!" text
- Entrance animations: card slides in from right, floating notification fades up with delay
- prefers-reduced-motion respected via @media query
Style: professional product showcase with a realistic, theme-responsive mock UI card.`,
    source: heroSplitRaw,
    component: HeroSplit,
  },
  {
    id: "hero-page-hero",
    title: "Hero 3",
    description:
      "A glassmorphism hero with a frosted-glass card over a dot-grid background and primary color glow — centered content with editorial typography and dual action buttons for a modern, premium feel.",
    prompt: `Generate a glassmorphism spotlight hero section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- A dot-grid pattern background (CSS radial-gradient repeating pattern at 0.04 opacity, 24px grid)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/10, blur-[100px]) behind the glass card
- A frosted glass card (max-w-2xl, rounded-3xl, border-(--ui-border)/50, bg-(--ui-bg)/60, backdrop-blur-xl, shadow-2xl) containing:
  - An uppercase headline in text-(--ui-primary)
  - A bold title (text-3xl to text-5xl, tracking-tight)
  - A muted description paragraph with leading-relaxed
  - Two CTA buttons (primary with trailing arrow + outline neutral)
- All content centered inside the glass card
Style: modern glassmorphism with dot-grid texture, color glow, and a frosted card centerpiece.`,
    source: heroPageHeroRaw,
    component: HeroPageHero,
  },
  {
    id: "hero-search",
    title: "Hero 4",
    description:
      "A search-focused hero with a warm gradient backdrop, decorative ring elements, an elevated search input, and interactive suggestion badges — welcoming and inviting for documentation sites and knowledge bases.",
    prompt: `Generate a warm search portal hero using Nuxt UI v4 UPageHero and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- A warm gradient backdrop (bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5)
- Decorative ring elements (absolute-positioned, rounded-full, border with primary/secondary at 10% opacity) at different corners
- UPageHero with headline, title, and description props
- Default slot with a max-w-xl centered container holding:
  - A UInput (icon="i-lucide-search", size="xl") with shadow-lg for elevated presence
  - A row of suggestion UBadge chips (variant="subtle", color="neutral") with hover effects (hover:ring-1, hover:ring-(--ui-primary)/30, hover:shadow-sm, transition-all)
Style: warm, inviting search-first hero with atmospheric gradient and interactive suggestion chips.`,
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
