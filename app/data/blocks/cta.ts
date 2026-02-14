import type { BlockShowcaseItem } from "~/types/components";

import CtaPageCta from "~/components/blocks/components/CtaPageCta.vue";
import CtaSplit from "~/components/blocks/components/CtaSplit.vue";
import CtaNewsletter from "~/components/blocks/components/CtaNewsletter.vue";
import CtaMinimal from "~/components/blocks/components/CtaMinimal.vue";
import CtaBanner from "~/components/blocks/components/CtaBanner.vue";
import ctaPageCtaRaw from "~/components/blocks/components/CtaPageCta.vue?raw";
import ctaSplitRaw from "~/components/blocks/components/CtaSplit.vue?raw";
import ctaNewsletterRaw from "~/components/blocks/components/CtaNewsletter.vue?raw";
import ctaMinimalRaw from "~/components/blocks/components/CtaMinimal.vue?raw";
import ctaBannerRaw from "~/components/blocks/components/CtaBanner.vue?raw";

export const CTA_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "cta-page-cta",
    title: "CTA 1",
    description:
      "A centered call-to-action section using the UPageCta component with title, description, and dual action buttons — the canonical Nuxt UI v4 CTA pattern.",
    prompt: `Generate a CTA section using Nuxt UI v4 UPageCta. It should include:
- UPageCta with title, description, and :links array
- Two buttons: a primary CTA and an outline neutral secondary action
- The component handles centering, spacing, and responsive layout automatically
- Wrap in a <section> for semantic HTML
Style: clean, centered CTA using the built-in UPageCta component.`,
    source: ctaPageCtaRaw,
    component: CtaPageCta,
  },
  {
    id: "cta-split",
    title: "CTA 2",
    description:
      "A split-layout CTA with UPageCta in horizontal orientation — text and buttons on one side, a video/media placeholder on the other. Great for product demos.",
    prompt: `Generate a split CTA using Nuxt UI v4 UPageCta with orientation="horizontal". It should include:
- UPageCta with title, description, and :links
- Default slot with an aspect-video placeholder area (rounded-lg, bg-elevated, border)
- A play icon and text centered in the placeholder for a video demo feel
Style: two-column CTA layout balancing text with a media area.`,
    source: ctaSplitRaw,
    component: CtaSplit,
  },
  {
    id: "cta-newsletter",
    title: "CTA 3",
    description:
      "A newsletter signup CTA combining UPageCta with an email input and subscribe button — ideal for blog footers and content marketing sections.",
    prompt: `Generate a newsletter CTA using Nuxt UI v4 UPageCta. It should include:
- UPageCta with title and description
- Default slot containing a flex row: UInput (email type, icon="i-lucide-mail", size="lg") + UButton (subscribe, icon="i-lucide-send")
- The input and button are wrapped in max-w-md with responsive flex-col to flex-row
Style: centered newsletter signup with a clean, inviting feel.`,
    source: ctaNewsletterRaw,
    component: CtaNewsletter,
  },
  {
    id: "cta-minimal",
    title: "CTA 4",
    description:
      "An ultra-minimal CTA with just a single-line title and one button — maximum impact with minimum clutter.",
    prompt: `Generate a minimal CTA using Nuxt UI v4 UPageCta. It should include:
- UPageCta with only a title and a single :links button
- No description, no default slot — pure simplicity
Style: ultra-minimal CTA for quick, decisive calls to action.`,
    source: ctaMinimalRaw,
    component: CtaMinimal,
  },
  {
    id: "cta-banner",
    title: "CTA 5",
    description:
      "A prominent banner-style CTA using UPageCta with the subtle variant for visual distinction — urgency-driven design for promotions and limited-time offers.",
    prompt: `Generate a banner CTA using Nuxt UI v4 UPageCta with variant="subtle". It should include:
- UPageCta with title (promotional text), description, variant="subtle", and :links
- A single primary button with trailing arrow
- The variant prop gives the section a tinted background for visual prominence
Style: attention-grabbing promotional banner CTA.`,
    source: ctaBannerRaw,
    component: CtaBanner,
  },
];
