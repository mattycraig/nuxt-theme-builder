import type { BlockShowcaseItem } from "~/types/components";

import HeaderSimple from "~/components/blocks/components/HeaderSimple.vue";
import HeaderCentered from "~/components/blocks/components/HeaderCentered.vue";
import HeaderWithActions from "~/components/blocks/components/HeaderWithActions.vue";
import HeaderMinimal from "~/components/blocks/components/HeaderMinimal.vue";

import HeaderSimpleRaw from "~/components/blocks/components/HeaderSimple.vue?raw";
import HeaderCenteredRaw from "~/components/blocks/components/HeaderCentered.vue?raw";
import HeaderWithActionsRaw from "~/components/blocks/components/HeaderWithActions.vue?raw";
import HeaderMinimalRaw from "~/components/blocks/components/HeaderMinimal.vue?raw";

export const HEADER_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "header-simple",
    title: "Simple Header",
    description: "Classic header with logo, navigation links, and CTA button.",
    prompt:
      "Create a simple header with a logo icon and brand name on the left, horizontal nav links in the center, " +
      "and a CTA button on the right. Use semantic tokens and proper nav aria-label.",
    source: HeaderSimpleRaw,
    component: HeaderSimple,
  },
  {
    id: "header-centered",
    title: "Centered Header",
    description: "Center-aligned header with stacked logo and navigation.",
    prompt:
      "Create a centered header with the logo and brand name stacked above a row of nav links. " +
      "Use semantic tokens and proper nav aria-label.",
    source: HeaderCenteredRaw,
    component: HeaderCentered,
  },
  {
    id: "header-with-actions",
    title: "Header with Actions",
    description:
      "Full header with logo, nav links, and dual action buttons (sign in + CTA).",
    prompt:
      "Create a header with logo and nav on the left, and 'Sign In' ghost button plus 'Start Free' " +
      "primary button on the right. Use semantic tokens.",
    source: HeaderWithActionsRaw,
    component: HeaderWithActions,
  },
  {
    id: "header-minimal",
    title: "Minimal Header",
    description:
      "Ultra-minimal header with only brand name and two text links.",
    prompt:
      "Create a minimal header with just a brand name on the left and two text links on the right. " +
      "Compact height. Use semantic tokens.",
    source: HeaderMinimalRaw,
    component: HeaderMinimal,
  },
];
