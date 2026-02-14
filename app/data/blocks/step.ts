import type { BlockShowcaseItem } from "~/types/components";

import StepSection from "~/components/blocks/components/StepSection.vue";
import StepVertical from "~/components/blocks/components/StepVertical.vue";
import StepCards from "~/components/blocks/components/StepCards.vue";
import StepMinimal from "~/components/blocks/components/StepMinimal.vue";

import StepSectionRaw from "~/components/blocks/components/StepSection.vue?raw";
import StepVerticalRaw from "~/components/blocks/components/StepVertical.vue?raw";
import StepCardsRaw from "~/components/blocks/components/StepCards.vue?raw";
import StepMinimalRaw from "~/components/blocks/components/StepMinimal.vue?raw";

export const STEP_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "step-section",
    title: "Step Section",
    description:
      "Process steps displayed as features using UPageSection with icons and descriptions.",
    prompt:
      "Create a step-by-step section using UPageSection with :features where each feature represents " +
      "a numbered step with icon, title, and description. Use semantic tokens.",
    source: StepSectionRaw,
    component: StepSection,
  },
  {
    id: "step-vertical",
    title: "Vertical Timeline",
    description:
      "Vertical timeline with a connecting line, numbered circles, and step descriptions.",
    prompt:
      "Create a vertical timeline with a connecting line and numbered circles for each step. " +
      "Each step has a title and description next to its circle. Use semantic tokens.",
    source: StepVerticalRaw,
    component: StepVertical,
  },
  {
    id: "step-cards",
    title: "Step Cards",
    description: "Steps as icon-topped cards using UPageGrid and UPageCard.",
    prompt:
      "Create step cards using UPageGrid and UPageCard where each card represents a step " +
      "with an icon, numbered title, and description. Use semantic tokens.",
    source: StepCardsRaw,
    component: StepCards,
  },
  {
    id: "step-minimal",
    title: "Minimal Steps",
    description:
      "Compact inline steps with arrow separators for a concise overview.",
    prompt:
      "Create a minimal horizontal step indicator with arrow icons between steps. " +
      "Each step has a label and short description. Use semantic tokens.",
    source: StepMinimalRaw,
    component: StepMinimal,
  },
];
