import type { BlockShowcaseItem } from "~/types/components";

import TestimonialCards from "~/components/blocks/components/TestimonialCards.vue";
import TestimonialQuote from "~/components/blocks/components/TestimonialQuote.vue";
import TestimonialMinimal from "~/components/blocks/components/TestimonialMinimal.vue";
import TestimonialWithLogos from "~/components/blocks/components/TestimonialWithLogos.vue";
import TestimonialWall from "~/components/blocks/components/TestimonialWall.vue";

import TestimonialCardsRaw from "~/components/blocks/components/TestimonialCards.vue?raw";
import TestimonialQuoteRaw from "~/components/blocks/components/TestimonialQuote.vue?raw";
import TestimonialMinimalRaw from "~/components/blocks/components/TestimonialMinimal.vue?raw";
import TestimonialWithLogosRaw from "~/components/blocks/components/TestimonialWithLogos.vue?raw";
import TestimonialWallRaw from "~/components/blocks/components/TestimonialWall.vue?raw";

export const TESTIMONIAL_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "testimonial-cards",
    title: "Testimonial Cards",
    description:
      "An elevated testimonial grid with gradient orb atmosphere, staggered entrance animations, star ratings, oversized decorative quote marks, and USeparator dividers — dramatic and polished for marketing pages.",
    prompt: `Generate an elevated testimonial cards section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A container with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Two decorative blurred gradient orbs (absolute-positioned rounded-full divs with bg-(--ui-primary)/10 and bg-(--ui-secondary)/8, blur-[100px] and blur-[80px]) for atmospheric depth
- A centered header with UBadge (variant="subtle", size="sm") containing a UIcon (i-lucide-star) + "Testimonials" text, plus a bold title and muted description
- A decorative gradient line below the header (h-px, bg-gradient-to-r from-transparent via-(--ui-primary)/30 to-transparent)
- UPageGrid containing cards (rounded-2xl, border, bg-(--ui-bg-elevated), p-6) with:
  - An oversized decorative &ldquo; quote mark (text-6xl, font-serif, text-(--ui-primary)/15) in the top-right
  - A blockquote with the testimonial text in text-(--ui-text-muted)
  - A star rating row (5 UIcon i-lucide-star in amber/text-amber-400) with role="img" and aria-label for accessibility
  - A USeparator between quote and author info
  - Author section with UAvatar (color="primary"), name, and role
- Staggered CSS entrance animations (translateY fade-in with animation-delay per card index) respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: dramatic gradient atmosphere with star ratings, editorial quote marks, and cinematic staggered entrances.`,
    source: TestimonialCardsRaw,
    component: TestimonialCards,
  },
  {
    id: "testimonial-quote",
    title: "Single Quote",
    description:
      "A dramatic editorial spotlight testimonial with gradient text effect, oversized serif quotation marks, decorative gradient lines, a centered primary glow, and spacious cinematic layout.",
    prompt: `Generate a dramatic editorial spotlight testimonial using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/8, blur-[100px]) for atmospheric depth
- Two decorative gradient lines (h-px, bg-gradient-to-r from-transparent via-[var(--ui-primary)] to-transparent at 30% opacity) — one above and one below the content
- Oversized serif quotation marks (&ldquo; and &rdquo;) at 8-10rem, positioned absolute at top-left and bottom-right of the blockquote container, using text-(--ui-primary)/10 and font-serif
- A CSS gradient text effect on the main quote: bg-gradient-to-r from-(--ui-text-highlighted) to-(--ui-text-muted), bg-clip-text, text-transparent
- Quote text at text-2xl to text-3xl with font-light and leading-relaxed
- A centered UAvatar (size="xl", color="primary") with the author name at text-lg font-semibold and role in text-(--ui-text-muted)
- All content centered with max-w-3xl
Style: magazine-quality editorial spotlight with gradient typography, oversized decorative quotes, and cinematic spacing.`,
    source: TestimonialQuoteRaw,
    component: TestimonialQuote,
  },
  {
    id: "testimonial-minimal",
    title: "Timeline Testimonials",
    description:
      "A clean timeline-style testimonial layout using UTimeline with quote icons, decorative gradient header line, and structured author attribution — elegant and scannable.",
    prompt: `Generate a timeline-style testimonial section using Nuxt UI v4 UTimeline and Tailwind CSS v4. It should include:
- A section with generous padding (py-16 sm:py-24) and max-w-3xl mx-auto
- A centered header with a bold title and muted description
- A decorative gradient line below the header (h-px, w-24, bg-gradient-to-r from-(--ui-primary)/60 to-(--ui-secondary)/60)
- A UTimeline component with an items array where each item has:
  - title: the person's name
  - description: their quoted testimonial text
  - icon: "i-lucide-quote"
  - value: a unique key string
- A #description slot template that renders the quoted text in italic with text-(--ui-text-muted), followed by a muted dash and role string looked up from a separate roles Record
- The UTimeline provides the vertical line and icon styling automatically
Style: clean structured timeline with quote icons, minimal decoration, and excellent scannability.`,
    source: TestimonialMinimalRaw,
    component: TestimonialMinimal,
  },
  {
    id: "testimonial-with-logos",
    title: "Social Proof Marquee",
    description:
      "An infinite-scrolling social proof section with UMarquee testimonial cards in two counter-rotating rows over a dot-grid texture, preceded by a UPageLogos trust bar — high-energy and dynamic.",
    prompt: `Generate a social proof marquee testimonial section using Nuxt UI v4 UMarquee, UPageLogos, and UUser with Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A dot-grid texture background (CSS radial-gradient repeating pattern at 0.04 opacity, 24px grid)
- A UPageLogos component at the top with a "Trusted by industry leaders" title and placeholder logo text items
- Two UMarquee rows of testimonial cards:
  - Row 1: UMarquee with pause-on-hover and [--duration:40s]
  - Row 2: UMarquee with pause-on-hover, reverse, and [--duration:45s] for counter-rotation
  - Each card is w-80, shrink-0, rounded-2xl, border-(--ui-border)/50, bg-(--ui-bg)/70, backdrop-blur-sm, with hover:shadow-lg transition
  - Card content: quoted text in text-sm text-(--ui-text-muted), plus a UUser component with name, description (role), and avatar props (text initials, color primary)
- 4 testimonials per row (8 total unique testimonials)
Style: high-energy social proof with infinite counter-scrolling marquee, dot-grid texture, and frosted card aesthetic.`,
    source: TestimonialWithLogosRaw,
    component: TestimonialWithLogos,
  },
  {
    id: "testimonial-wall",
    title: "Testimonial Wall",
    description:
      "A glassmorphism masonry wall of testimonials using UPageColumns with a centered primary glow, dot-grid texture, hover glow effects, staggered entrances, and USeparator dividers — immersive social proof at scale.",
    prompt: `Generate a glassmorphism testimonial wall using Nuxt UI v4 UPageColumns, UBadge, UIcon, USeparator, and UAvatar with Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/6, blur-[140px], 600x600px) for atmospheric depth
- A dot-grid texture background (CSS radial-gradient repeating pattern at 0.03 opacity, 20px grid)
- A centered header with UBadge (variant="subtle", size="sm") containing a UIcon (i-lucide-heart) + "Community" text, bold "Wall of love" title, muted description, and a decorative gradient line (h-px, w-32, bg-gradient-to-r from-transparent via-(--ui-primary)/40 to-transparent)
- UPageColumns containing glassmorphism cards (rounded-2xl, border-(--ui-border)/40, bg-(--ui-bg)/50, backdrop-blur-xl, p-6) with:
  - A subtle hover glow overlay (absolute inset-0, bg-(--ui-primary)/0 → group-hover:bg-(--ui-primary)/[0.03], transition)
  - Hover border effect (hover:border-(--ui-primary)/30, hover:shadow-lg)
  - A small UIcon (i-lucide-quote) in text-(--ui-primary)/40
  - A blockquote with testimonial text
  - A USeparator between quote and author
  - Author section with UAvatar (text initials, size="sm", color="primary"), name, and role
- Staggered CSS entrance animations (translateY fade-in with 80ms delay per card index) respecting prefers-reduced-motion
- 9+ testimonials for a dense, immersive masonry wall
Style: glassmorphism masonry with dot-grid texture, centered glow, hover interactions, and staggered cinematic entrances.`,
    source: TestimonialWallRaw,
    component: TestimonialWall,
  },
];
