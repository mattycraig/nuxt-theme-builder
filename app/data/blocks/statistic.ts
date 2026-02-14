import type { BlockShowcaseItem } from "~/types/components";

import StatisticCards from "~/components/blocks/components/StatisticCards.vue";
import StatisticSection from "~/components/blocks/components/StatisticSection.vue";
import StatisticCounters from "~/components/blocks/components/StatisticCounters.vue";
import StatisticMinimal from "~/components/blocks/components/StatisticMinimal.vue";

import StatisticCardsRaw from "~/components/blocks/components/StatisticCards.vue?raw";
import StatisticSectionRaw from "~/components/blocks/components/StatisticSection.vue?raw";
import StatisticCountersRaw from "~/components/blocks/components/StatisticCounters.vue?raw";
import StatisticMinimalRaw from "~/components/blocks/components/StatisticMinimal.vue?raw";

export const STATISTIC_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "statistic-cards",
    title: "Statistic Cards",
    description:
      "Grid of statistic cards using UPageGrid and UPageCard with icons and bold numbers.",
    prompt:
      "Create a statistics section with icon-topped cards using UPageGrid and UPageCard. " +
      "Each card shows a large number value and a label. Use semantic color tokens.",
    source: StatisticCardsRaw,
    component: StatisticCards,
  },
  {
    id: "statistic-section",
    title: "Statistic Section",
    description:
      "Stats as features using UPageSection with headline, description, and :features prop.",
    prompt:
      "Create a statistics section using UPageSection with :features where each feature " +
      "has a numeric title, descriptive text, and icon. Use semantic tokens.",
    source: StatisticSectionRaw,
    component: StatisticSection,
  },
  {
    id: "statistic-counters",
    title: "Statistic Counters",
    description:
      "Horizontal counter strip with dividers on an elevated background.",
    prompt:
      "Create a horizontal statistics strip on an elevated background with vertical dividers " +
      "between each stat. Each stat shows a large number and label. Use semantic tokens.",
    source: StatisticCountersRaw,
    component: StatisticCounters,
  },
  {
    id: "statistic-minimal",
    title: "Minimal Statistics",
    description: "Compact 2x4 grid of plain number-and-label statistics pairs.",
    prompt:
      "Create a minimal statistics grid with numbers and labels in a compact 2x4 layout. " +
      "No cards or borders — just clean typography. Use semantic tokens.",
    source: StatisticMinimalRaw,
    component: StatisticMinimal,
  },
];
