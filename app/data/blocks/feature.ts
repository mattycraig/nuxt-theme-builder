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
    title: "Feature Section",
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
    title: "Feature Grid",
    description:
      "A spotlight grid with atmospheric gradient orbs, staggered entrance animations, and interactive hover glow effects — each feature card has a gradient icon container with ring highlights that respond to hover state.",
    prompt: `Generate a spotlight feature grid using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section wrapper with relative + isolate + overflow-hidden for layered depth
- Two decorative atmospheric gradient orbs (absolute-positioned, rounded-full, bg-(--ui-primary)/8 and bg-(--ui-secondary)/6, blur-[120px] and blur-[100px]) for ambient background glow
- A header area with a UBadge (color="primary", variant="subtle") + bold title + muted description
- A 3-column responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3, gap-6) of custom feature cards:
  - Each card: rounded-2xl, border-(--ui-border)/60, bg-(--ui-bg)/80, backdrop-blur-sm, p-6
  - Hover state: border-(--ui-primary)/40, shadow-lg with shadow-(--ui-primary)/5
  - Inner hover glow overlay (bg-(--ui-primary)/3 transition)
  - Icon container: size-11 rounded-xl with bg-gradient-to-br from-(--ui-primary)/15 to-(--ui-primary)/5, ring-1 ring-(--ui-primary)/10, hover ring/shadow intensify
  - Feature title + description below the icon
- Staggered CSS entrance animations (translateY fade-in) per card with animation-delay based on index
- prefers-reduced-motion respected via @media query
- All decorative elements use aria-hidden="true"
Style: atmospheric spotlight grid with layered depth, glowing icon containers, and interactive hover feedback.`,
    source: featureGridRaw,
    component: FeatureGrid,
  },
  {
    id: "feature-alternating",
    title: "Feature Alternating",
    description:
      "An alternating feature layout with UPageSection in horizontal orientation — each section includes a realistic mock UI card (editor, preview, or export view) with window chrome, status badges, and a floating toast notification instead of plain image placeholders.",
    prompt: `Generate an alternating feature layout using Nuxt UI v4 UPageSection with mock app UI visuals. It should include:
- Multiple UPageSection components with orientation="horizontal" and :reverse toggled alternately (i % 2 === 1)
- Each section has headline, title, description, icon, and "Learn more" link
- Instead of placeholder images, each section's default slot contains a realistic mock UI card:
  - Window chrome bar (3 colored dots: red/yellow/green + monospace filename)
  - **Editor card**: Color swatch rows with label, progress bar (bg-(--ui-primary)/40), and themed color blocks
  - **Preview card**: Component list rows with icon, label, and UBadge status tags (success/info/warning)
  - **Export card**: Monospace code block showing an app.config.ts snippet with syntax-colored keywords + a floating "Copied!" toast (absolute positioned with check-circle icon)
- All mock cards use rounded-2xl, border, bg-(--ui-bg-elevated), shadow-xl, overflow-hidden
- Entrance animations: cards slide up with fade, floating toast fades up with delay
- prefers-reduced-motion respected
Style: professional alternating showcase with realistic, theme-responsive mock UI cards that tell a visual story.`,
    source: featureAlternatingRaw,
    component: FeatureAlternating,
  },
  {
    id: "feature-bento",
    title: "Feature Bento",
    description:
      "A true asymmetric bento grid using CSS grid-template-areas with named regions — hero-sized cards get bullet sub-features with check icons, the wide card shows preset tag badges, and content density scales with cell size. Product-mapped features over a dot-grid texture with dual glow spots and frosted-glass styling.",
    prompt: `Generate a true asymmetric bento feature grid using Nuxt UI v4, Tailwind CSS v4, and CSS grid-template-areas. It should include:
- A section with relative + isolate + overflow-hidden
- A dot-grid background (CSS radial-gradient, 20px grid, opacity-[0.03]) for subtle texture
- Dual glow spots: primary (top-left, blur-[120px]) and secondary (bottom-right, blur-[100px])
- Header with UBadge (color="primary", variant="subtle") + bold title
- 5 feature cards laid out with CSS grid-template-areas for true bento asymmetry:
  - Mobile: single column stack
  - sm: 2-column layout with "dash" spanning 2 rows
  - lg: 3-column layout (2fr 1fr 1fr) with named areas:
    - "dash" spans 2 rows left column (Visual Theme Editor)
    - "i18n" spans all 3 rows right column (AI-Powered Generation)
    - "plug" spans 2 columns bottom-left (Presets & History)
  - Hero cards (dash, i18n): larger padding, stacked layout (icon above text), size-14 gradient icon container with ring glow, gradient shimmer overlay, and a bullet list of sub-features using check icons (UIcon i-lucide-check, text-(--ui-primary)/70) in a role="list" ul
  - Standard cards (ai, git): compact padding, horizontal layout (icon left, text right), size-11 elevated icon container, concise single-paragraph description
  - Wide card (plug): horizontal layout like standard cards, plus a row of UBadge preset tags (variant="subtle", color="neutral", size="sm") with hover:ring-1 ring-(--ui-primary)/30
- Content maps to real product features: theme editing, live preview, export, AI generation, presets & history
- Each card: rounded-2xl, border-(--ui-border)/50, bg-(--ui-bg)/60, backdrop-blur-xl
- Hover: border-(--ui-primary)/30, shadow-xl with shadow-(--ui-primary)/5
- CSS entrance animations with staggered delay per card
- prefers-reduced-motion respected
- All decorative elements use aria-hidden="true"
Style: genuine bento asymmetry where content density matches cell size — hero cards have bullet lists, the wide card has tag badges, and compact cards stay concise.`,
    source: featureBentoRaw,
    component: FeatureBento,
  },
  {
    id: "feature-cards",
    title: "Feature Cards",
    description:
      "A numbered editorial feature layout with large step numbers, a gradient accent stripe on each card, icon badges, and staggered slide-in entrance animations — editorial magazine-style presentation with clear visual hierarchy.",
    prompt: `Generate a numbered editorial feature layout using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A header with UBadge (color="primary", variant="subtle") + bold title + muted description
- A 2-column responsive grid (grid-cols-1 md:grid-cols-2, gap-6) of numbered feature cards:
  - Each card: rounded-2xl, border-(--ui-border)/60, bg-(--ui-bg), p-6
  - Hover: border-(--ui-primary)/30, shadow-lg
  - A vertical gradient accent stripe on the left (absolute, w-1, rounded-full, bg-gradient-to-b from-(--ui-primary)/60 to-(--ui-primary)/10) that intensifies on hover (from-(--ui-primary) to-(--ui-secondary)/40)
  - A large step number (text-4xl, font-black, tracking-tighter, text-(--ui-primary)/15) that lightens on hover
  - An icon container (size-8, rounded-lg, bg-(--ui-primary)/10, ring-1) next to the title text
  - Description text below
- Staggered CSS entrance animations (translateX slide-in from left) with index-based delay
- prefers-reduced-motion respected
Style: editorial numbered steps with gradient accent stripes, large faded numbers, and magazine-quality layout.`,
    source: featureCardsRaw,
    component: FeatureCards,
  },
];
