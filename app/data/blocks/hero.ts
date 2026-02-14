import type { BlockShowcaseItem } from "~/types/components";
import { extractTemplateSource } from "~/utils/helpers";

import HeroCentered from "~/components/blocks/components/HeroCentered.vue";
import HeroSplit from "~/components/blocks/components/HeroSplit.vue";
import heroCenteredRaw from "~/components/blocks/components/HeroCentered.vue?raw";
import heroSplitRaw from "~/components/blocks/components/HeroSplit.vue?raw";

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
    source: extractTemplateSource(heroCenteredRaw),
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
    source: extractTemplateSource(heroSplitRaw),
    component: HeroSplit,
  },
];
