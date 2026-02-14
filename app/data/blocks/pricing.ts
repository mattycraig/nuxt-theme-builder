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
      "Three-tier pricing layout using UPricingPlans with feature lists and highlighted recommended plan.",
    prompt:
      "Create a pricing section with three tiers (Starter, Pro, Enterprise) using UPricingPlans. " +
      "Each plan should have a title, description, price, billing cycle, list of features, and a CTA button. " +
      "Highlight the recommended plan. Use semantic color tokens throughout.",
    source: PricingPlansRaw,
    component: PricingPlans,
  },
  {
    id: "pricing-two-column",
    title: "Two-Column Pricing",
    description:
      "Compact two-plan side-by-side comparison using UPricingPlans with compact variant.",
    prompt:
      "Create a two-column pricing layout comparing a free plan and a paid plan using UPricingPlans with compact display. " +
      "Each plan has price, cycle, features list, and CTA. Use semantic tokens.",
    source: PricingTwoColumnRaw,
    component: PricingTwoColumn,
  },
  {
    id: "pricing-table",
    title: "Pricing Comparison Table",
    description:
      "Feature comparison table using UPricingTable with tiered pricing and detailed feature sections.",
    prompt:
      "Create a pricing comparison table using UPricingTable with three tiers and multiple feature sections. " +
      "Show feature availability as booleans and include a highlighted default tier. Use semantic tokens.",
    source: PricingTableRaw,
    component: PricingTable,
  },
  {
    id: "pricing-simple",
    title: "Simple Pricing Card",
    description:
      "Single focused pricing card using UPageCard with feature checklist and CTA.",
    prompt:
      "Create a single pricing card with UPageCard showing a plan name, price, feature list with check icons, " +
      "and a call-to-action button. Keep it centered and clean. Use semantic tokens.",
    source: PricingSimpleRaw,
    component: PricingSimple,
  },
  {
    id: "pricing-with-toggle",
    title: "Pricing with Toggle",
    description:
      "Monthly/annual billing toggle with reactive pricing using UPricingPlans.",
    prompt:
      "Create a pricing section with a monthly/annual billing toggle. Use reactive state to switch between " +
      "monthly and annual prices. Display plans using UPricingPlans. Use semantic tokens.",
    source: PricingWithToggleRaw,
    component: PricingWithToggle,
  },
];
