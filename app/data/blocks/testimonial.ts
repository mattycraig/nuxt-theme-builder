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
      "Grid of testimonial cards using UPageGrid and UPageCard with avatars and quotes.",
    prompt:
      "Create a testimonial section with a grid of cards using UPageGrid and UPageCard. " +
      "Each card has a quote icon, testimonial text, and author info with UAvatar. " +
      "Use semantic color tokens throughout.",
    source: TestimonialCardsRaw,
    component: TestimonialCards,
  },
  {
    id: "testimonial-quote",
    title: "Single Quote",
    description:
      "Centered featured testimonial using UPageSection with a large blockquote and avatar.",
    prompt:
      "Create a single featured testimonial using UPageSection with a centered blockquote, " +
      "a large quote icon, and author details with UAvatar. Use semantic tokens.",
    source: TestimonialQuoteRaw,
    component: TestimonialQuote,
  },
  {
    id: "testimonial-minimal",
    title: "Minimal Testimonials",
    description:
      "Simple list-based testimonials using UPageList with dividers and inline attribution.",
    prompt:
      "Create a minimal list of testimonials using UPageList with divide styling. " +
      "Each item has an italic quote and inline author attribution. Use semantic tokens.",
    source: TestimonialMinimalRaw,
    component: TestimonialMinimal,
  },
  {
    id: "testimonial-with-logos",
    title: "Testimonials with Logos",
    description:
      "Testimonial cards preceded by a UPageLogos brand marquee section.",
    prompt:
      "Create a testimonial section combining a UPageLogos marquee of trusted brand names " +
      "above a grid of UPageCard testimonial cards with author details. Use semantic tokens.",
    source: TestimonialWithLogosRaw,
    component: TestimonialWithLogos,
  },
  {
    id: "testimonial-wall",
    title: "Testimonial Wall",
    description:
      "Masonry-style wall of testimonials using UPageColumns for a social-proof effect.",
    prompt:
      "Create a masonry-style 'wall of love' using UPageColumns filled with UPageCard testimonials. " +
      "Each card has a short quote and inline author name/role. Use semantic tokens.",
    source: TestimonialWallRaw,
    component: TestimonialWall,
  },
];
