import type { BlockShowcaseItem } from "~/types/components";

import PricingPlans from "~/components/blocks/components/PricingPlans.vue";
import PricingTwoColumn from "~/components/blocks/components/PricingTwoColumn.vue";
import PricingTable from "~/components/blocks/components/PricingTable.vue";
import PricingSimple from "~/components/blocks/components/PricingSimple.vue";
import PricingWithToggle from "~/components/blocks/components/PricingWithToggle.vue";

import PricingPlansRaw from "~/components/blocks/components/PricingPlans.vue?raw";
import PricingTwoColumnRaw from "~/components/blocks/components/PricingTwoColumn.vue?raw";
import PricingTableRaw from "~/components/blocks/components/PricingTable.vue?raw";
import PricingSimpleRaw from "~/components/blocks/components/PricingSimple.vue?raw";
import PricingWithToggleRaw from "~/components/blocks/components/PricingWithToggle.vue?raw";

export const PRICING_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "pricing-plans",
    title: "Pricing Plans",
    description:
      "A gradient-atmosphere three-tier pricing layout with decorative primary/secondary color orbs, gradient-to-solid split headline, staggered entrance animations, and a trust signal footer — dramatic and polished for marketing pages.",
    prompt: `Generate a gradient atmosphere pricing section using Nuxt UI v4 UPricingPlans and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Two decorative blurred gradient orbs (absolute-positioned rounded-full divs with bg-(--ui-primary)/12 and bg-(--ui-secondary)/8, blur-[120px] and blur-[100px]) for atmospheric depth
- A header block with: an inline-flex label row containing a UIcon (i-lucide-sparkles) + uppercase "Pricing" text in text-(--ui-primary)
- A multi-part headline (text-3xl to text-5xl, font-extrabold, tracking-tight): first span uses CSS gradient text (bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)], bg-clip-text, text-transparent), second span uses solid --ui-text-highlighted
- A muted description paragraph (text-lg) with max-w-2xl and leading-relaxed
- Three-tier UPricingPlans (Starter free, Pro $29/mo highlighted with "Most Popular" badge, Enterprise $99/mo) with feature lists and CTA buttons
- A trust signal footer: inline-flex with UIcon (i-lucide-shield-check) + "30-day money-back guarantee" text
- Staggered CSS entrance animations (translateY fade-in) with animation-delay on header, plans, and footer, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: dramatic gradient atmosphere with theme-responsive color orbs and cinematic entrance.`,
    source: PricingPlansRaw,
    component: PricingPlans,
  },
  {
    id: "pricing-two-column",
    title: "Two-Column Pricing",
    description:
      "A glassmorphism two-plan comparison with a frosted-glass header panel over a dot-grid background and centered primary color glow — clean and premium for focused free-vs-paid decisions.",
    prompt: `Generate a glassmorphism two-column pricing section using Nuxt UI v4 UPricingPlans (compact) and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A dot-grid pattern background (CSS radial-gradient repeating pattern at 0.04 opacity, 24px grid)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/10, blur-[100px]) behind the cards
- A frosted glass header panel (max-w-xl, mx-auto, rounded-2xl, border-(--ui-border)/40, bg-(--ui-bg)/50, backdrop-blur-xl, shadow-lg) containing:
  - An uppercase subtitle in text-(--ui-primary)
  - A bold title (text-3xl to text-4xl, font-bold, tracking-tight)
  - A muted description with leading-relaxed
- UPricingPlans with compact prop showing Free ($0) and Pro ($29/mo with "Recommended" badge) plans
- Staggered CSS entrance animations with animation-delay, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: modern glassmorphism with dot-grid texture, color glow, and a frosted header centerpiece.`,
    source: PricingTwoColumnRaw,
    component: PricingTwoColumn,
  },
  {
    id: "pricing-table",
    title: "Pricing Comparison Table",
    description:
      "An editorial chrome-framed feature comparison table with a window-chrome header bar (colored dots + monospace filename), a UBadge headline, gradient backdrop, and a floating trial-nudge pill — professional and product-focused.",
    prompt: `Generate an editorial chrome-framed pricing comparison table using Nuxt UI v4 UPricingTable and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A subtle gradient backdrop (bg-gradient-to-b from-[var(--ui-primary)]/3 via-transparent to-[var(--ui-secondary)]/3)
- A header block with: a UBadge ("Feature Comparison", color="primary", variant="subtle", size="lg"), a bold title (text-3xl to text-5xl, font-extrabold, tracking-tight), and muted description
- A chrome-framed table wrapper (rounded-2xl, border, bg-(--ui-bg-elevated), shadow-xl, overflow-hidden) containing:
  - A window chrome bar (3 colored dots: red, yellow, green + monospace "pricing-comparison.config" text)
  - UPricingTable inside with padding, showing Free / Pro (highlighted, "Popular" badge) / Enterprise tiers across Features and Support sections
- A floating trial-nudge pill below (inline-flex, rounded-full, border, bg, shadow-md) with UIcon (i-lucide-zap) + "14-day free trial" emphasis text
- Staggered CSS entrance animations: header fades up, chrome card fades up with delay, floating pill scales in with longer delay, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: professional editorial chrome with product-showcase framing and a floating conversion nudge.`,
    source: PricingTableRaw,
    component: PricingTable,
  },
  {
    id: "pricing-simple",
    title: "Simple Pricing Card",
    description:
      "A spotlight-focus single pricing card with concentric decorative rings, a centered primary glow, a lifetime-deal badge, a decorative price divider, pill-styled feature checkmarks, and a micro social-proof footer with an avatar stack.",
    prompt: `Generate a spotlight-focus single pricing card using Nuxt UI v4 UPageCard and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Three concentric decorative rings (absolute-positioned, centered with translate, rounded-full, border with primary/secondary at 8-12% opacity) at 40rem, 28rem, and 16rem
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/8, blur-[80px]) behind the card
- A UPageCard (shadow-2xl, text-center) containing:
  - A UBadge ("Lifetime Deal", primary, subtle)
  - Bold title + muted description
  - A decorative price row: absolute horizontal line (h-px bg-(--ui-border)/60) with price overlay (text-5xl, font-extrabold) on inline bg-(--ui-bg) px-4 to "cut through" the line
  - Feature list with pill-styled check icons (each check in a size-5 rounded-full bg-(--ui-primary)/10 container)
  - A full-width primary UButton with trailing arrow icon
- A floating micro social-proof footer: avatar stack (3 round user-icon divs with -space-x-2 overlap, colored bg-(--ui-primary)/20 and bg-(--ui-secondary)/20) + "Joined by 2,400+ developers" text
- Staggered CSS entrance animations: card fades up, social proof scales in with delay, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: dramatic spotlight with concentric rings, focused single-card pricing, and social-proof micro-conversion.`,
    source: PricingSimpleRaw,
    component: PricingSimple,
  },
  {
    id: "pricing-with-toggle",
    title: "Pricing with Toggle",
    description:
      "A warm-atmosphere billing-toggle pricing section with a gradient backdrop, corner accent orbs, an elevated frosted toggle pill with a savings badge, gradient split headline, and a dual-signal footer — inviting and conversion-focused.",
    prompt: `Generate a warm-atmosphere pricing section with billing toggle using Nuxt UI v4 UPricingPlans and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A warm gradient backdrop (bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5)
- Corner accent orbs (absolute-positioned, rounded-full, bg-(--ui-primary)/8 blur-[80px] top-right, bg-(--ui-secondary)/6 blur-[60px] bottom-left)
- A header block with:
  - A multi-part headline (text-3xl to text-5xl, font-extrabold, tracking-tight) with solid text + gradient text (bg-gradient-to-r, bg-clip-text, text-transparent)
  - Muted description (text-lg, max-w-lg, leading-relaxed)
  - An elevated toggle pill (inline-flex, rounded-full, border-(--ui-border)/60, bg-(--ui-bg)/80, backdrop-blur-sm, shadow-lg, p-1.5) with:
    - Monthly UButton (rounded-full)
    - Annual UButton (rounded-full) with inline UBadge ("Save 17%", success, subtle, xs)
- Reactive UPricingPlans switching between monthly (Hobby $0, Pro $29, Enterprise $99) and annual (Hobby $0, Pro $24, Enterprise $79) plans with discount props
- A dual-signal footer row: two inline-flex items (UIcon + text) separated by a vertical border line: "No credit card required" (i-lucide-credit-card) and "Cancel anytime" (i-lucide-refresh-cw)
- Staggered CSS entrance animations with animation-delay on header, plans, and footer, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: warm inviting atmosphere with frosted toggle control and dual trust signals.`,
    source: PricingWithToggleRaw,
    component: PricingWithToggle,
  },
];
