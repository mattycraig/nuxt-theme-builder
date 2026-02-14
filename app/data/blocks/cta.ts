import type { BlockShowcaseItem } from "~/types/components";

import CtaSocialProof from "~/components/blocks/components/CtaSocialProof.vue";
import CtaTestimonial from "~/components/blocks/components/CtaTestimonial.vue";
import CtaNewsletter from "~/components/blocks/components/CtaNewsletter.vue";
import CtaBanner from "~/components/blocks/components/CtaBanner.vue";
import CtaPromo from "~/components/blocks/components/CtaPromo.vue";
import CtaBenefitsList from "~/components/blocks/components/CtaBenefitsList.vue";
import ctaSocialProofRaw from "~/components/blocks/components/CtaSocialProof.vue?raw";
import ctaTestimonialRaw from "~/components/blocks/components/CtaTestimonial.vue?raw";
import ctaNewsletterRaw from "~/components/blocks/components/CtaNewsletter.vue?raw";
import ctaBannerRaw from "~/components/blocks/components/CtaBanner.vue?raw";
import ctaPromoRaw from "~/components/blocks/components/CtaPromo.vue?raw";
import ctaBenefitsListRaw from "~/components/blocks/components/CtaBenefitsList.vue?raw";

export const CTA_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "cta-social-proof",
    title: "CTA Social Proof",
    description:
      "A social-proof-driven CTA card with a stat strip (users, uptime, rating) above dual action buttons — lets the numbers sell the conversion.",
    prompt: `Generate a social proof CTA card using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A centered section with padding and max-w-xl container
- A rounded-2xl card with border and bg-(--ui-bg-elevated)
- A stat strip across the top showing 3 proof metrics (e.g. "10,000+ Developers", "99.9% Uptime", "4.9/5 Rating") in a flex row with dividers, using role="list" for accessibility
- Bold values in text-(--ui-text-highlighted) and muted labels below
- A border-b divider separating the stats from the action area
- A heading, muted description paragraph, and two CTA buttons (primary + ghost neutral)
Style: conversion-focused card with social proof stats driving the action.`,
    source: ctaSocialProofRaw,
    component: CtaSocialProof,
  },
  {
    id: "cta-testimonial",
    title: "CTA Testimonial",
    description:
      "A horizontal split CTA using UPageCTA with a testimonial card — quote, star rating, and avatar on one side to build trust alongside the action.",
    prompt: `Generate a split testimonial CTA using Nuxt UI v4 UPageCTA with orientation="horizontal". It should include:
- UPageCTA with title, description, variant="subtle", and :links array (primary button + outline neutral)
- Default slot containing a testimonial card (rounded-xl, border, bg-elevated, p-6):
  - A 5-star rating row using amber star icons with role="img" and aria-label
  - A blockquote with testimonial text in italic
  - A person section with an avatar placeholder (initials in a primary-tinted circle), name (font-semibold), and title/company (text-dimmed)
Style: conversion-focused split layout pairing a CTA with social proof via a real testimonial.`,
    source: ctaTestimonialRaw,
    component: CtaTestimonial,
  },
  {
    id: "cta-newsletter",
    title: "CTA Newsletter",
    description:
      "A newsletter signup CTA card with a subscriber count trust pill, email input, and a privacy assurance line — trust signals that drive subscriptions.",
    prompt: `Generate a newsletter CTA card using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A centered section with a max-w-md bordered card (rounded-2xl, bg-elevated)
- A mail icon in a primary-tinted rounded container at the top
- A bold heading and muted description
- A subscriber count trust pill (e.g. "Join 8,200+ subscribers") using bg-(--ui-primary)/5 with a primary border tint
- A flex row with UInput (email, placeholder) and a UButton (Subscribe, primary)
- A privacy trust line at the bottom with a shield-check icon and text-xs dimmed text
Style: trust-signal-rich newsletter CTA that reassures before asking for action.`,
    source: ctaNewsletterRaw,
    component: CtaNewsletter,
  },
  {
    id: "cta-banner",
    title: "CTA Banner",
    description:
      "A compact inline CTA row — text on the left, button on the right, inside a minimal bordered card. Fits between content sections without disrupting flow.",
    prompt: `Generate a compact inline CTA using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A centered section with a max-w-2xl container
- A bordered card (rounded-xl, bg-elevated) with compact padding (py-5, px-6)
- A flex layout: column on mobile, row on sm+ with items-center and justify-between
- Left side: bold heading text and a muted subtitle on the next line (e.g. "Free plan available — no credit card needed.")
- Right side: a single primary UButton with trailing arrow icon
Style: minimal, compact inline CTA that sits naturally between content blocks.`,
    source: ctaBannerRaw,
    component: CtaBanner,
  },
  {
    id: "cta-promo",
    title: "CTA Promo",
    description:
      "A compact urgency banner using UPageCTA variant='subtle' with a solid 'Limited Time' badge and promotional text — clean and conversion-focused.",
    prompt: `Generate a compact urgency CTA using Nuxt UI v4 UPageCTA with variant="subtle". It should include:
- A section wrapping UPageCTA with :links array containing a single primary button
- Title slot: a flex row with a solid UBadge ("Limited Time", clock icon, primary) and a promotional headline (e.g. "50% off all annual plans")
- Description slot: urgency-driven supporting text
- No custom backgrounds or decorative elements — let UPageCTA's subtle variant handle the visual treatment
Style: clean urgency banner that leverages the UPageCTA component for a polished promotional CTA.`,
    source: ctaPromoRaw,
    component: CtaPromo,
  },
  {
    id: "cta-benefits-list",
    title: "CTA Benefits List",
    description:
      "A feature-value CTA card with checkmark benefit bullets showing 'what you get' above a full-width action button — sell the value before asking for the click.",
    prompt: `Generate a feature value CTA card using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A centered section with a max-w-lg bordered card (rounded-2xl, bg-elevated)
- A bold heading (e.g. "Everything you need to ship faster") and muted subtitle
- A benefit list (role="list") with 3 items, each containing:
  - A small primary-tinted circle with a themed icon (zap, shield-check, headphones)
  - Benefit text in text-sm
- A full-width (block) primary UButton with trailing arrow icon
- A trust line below the button (e.g. "No credit card required") in text-xs dimmed
Style: value-first CTA card that communicates benefits before driving action.`,
    source: ctaBenefitsListRaw,
    component: CtaBenefitsList,
  },
];
