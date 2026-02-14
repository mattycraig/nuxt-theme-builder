import type { BlockShowcaseItem } from "~/types/components";

import FeatureSection from "~/components/blocks/components/FeatureSection.vue";
import FeatureGrid from "~/components/blocks/components/FeatureGrid.vue";
import FeatureAlternating from "~/components/blocks/components/FeatureAlternating.vue";
import FeatureBento from "~/components/blocks/components/FeatureBento.vue";
import FeatureCards from "~/components/blocks/components/FeatureCards.vue";
import featureSectionRaw from "~/components/blocks/components/FeatureSection.vue?raw";
import featureGridRaw from "~/components/blocks/components/FeatureGrid.vue?raw";
import featureAlternatingRaw from "~/components/blocks/components/FeatureAlternating.vue?raw";
import featureBentoRaw from "~/components/blocks/components/FeatureBento.vue?raw";
import featureCardsRaw from "~/components/blocks/components/FeatureCards.vue?raw";

export const FEATURE_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "feature-section",
    title: "Feature 1",
    description:
      "A feature section using UPageSection with the :features prop to auto-render a 3-column grid of UPageFeature items — the canonical Nuxt UI v4 feature layout.",
    prompt: `Generate a feature section using Nuxt UI v4 UPageSection. It should include:
- UPageSection with headline, title, description, and a :features array
- Each feature object has icon (i-lucide-*), title, and description
- The component automatically renders UPageFeature items in a responsive grid
- Wrap in a <section> for semantic HTML
Style: clean, centered section header with an auto-generated feature grid below.`,
    source: featureSectionRaw,
    component: FeatureSection,
  },
  {
    id: "feature-grid",
    title: "Feature 2",
    description:
      "A feature grid using UPageGrid with individual UPageFeature components — gives full control over each feature item's placement and styling within the grid.",
    prompt: `Generate a feature grid using Nuxt UI v4 UPageGrid and UPageFeature. It should include:
- A section header with headline, title, and description (manually styled)
- UPageGrid containing multiple UPageFeature components with icon, title, description props
- This approach gives more control than UPageSection's :features prop
Style: professional grid with manual control over individual feature items.`,
    source: featureGridRaw,
    component: FeatureGrid,
  },
  {
    id: "feature-alternating",
    title: "Feature 3",
    description:
      "An alternating feature layout using multiple UPageSection components with horizontal orientation and :reverse toggling — creates a visually engaging zigzag pattern.",
    prompt: `Generate alternating feature sections using Nuxt UI v4 UPageSection. It should include:
- Multiple UPageSection components, each with headline, title, description, and icon
- orientation="horizontal" for side-by-side layout
- :reverse toggled on alternating sections (i % 2 === 1) for zigzag pattern
- Default slot with an aspect-[4/3] image placeholder matching the section's icon
- Links with "Learn more" arrow buttons
Style: engaging zigzag feature showcase with alternating content/image sides.`,
    source: featureAlternatingRaw,
    component: FeatureAlternating,
  },
  {
    id: "feature-bento",
    title: "Feature 4",
    description:
      "A bento-grid feature layout using UPageGrid with UPageCard in varied column spans — asymmetric card sizes create a dynamic, magazine-style presentation.",
    prompt: `Generate a bento-grid feature layout using Nuxt UI v4 UPageGrid and UPageCard. It should include:
- UPageGrid containing UPageCard items with icon, title, description, and variant="subtle"
- Some cards span 2 columns (lg:col-span-2) for visual hierarchy
- A centered section header above the grid
Style: modern bento/asymmetric grid with varied card sizes for visual interest.`,
    source: featureBentoRaw,
    component: FeatureBento,
  },
  {
    id: "feature-cards",
    title: "Feature 5",
    description:
      "A feature card layout using UPageGrid with UPageCard components — clean, elevated cards with icon headers and descriptions in a responsive grid.",
    prompt: `Generate a feature card layout using Nuxt UI v4 UPageGrid and UPageCard. It should include:
- A centered section header with headline, title, and description
- UPageGrid containing UPageCard items, each with icon, title, and description
- Cards use default variant for clean, elevated appearance
Style: clean card grid with strong visual hierarchy and consistent spacing.`,
    source: featureCardsRaw,
    component: FeatureCards,
  },
];
