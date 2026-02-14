import type { BlockShowcaseItem } from "~/types/components";

import ContentCentered from "~/components/blocks/components/ContentCentered.vue";
import ContentSplit from "~/components/blocks/components/ContentSplit.vue";
import ContentFeatures from "~/components/blocks/components/ContentFeatures.vue";
import ContentColumns from "~/components/blocks/components/ContentColumns.vue";
import ContentWithAside from "~/components/blocks/components/ContentWithAside.vue";

import ContentCenteredRaw from "~/components/blocks/components/ContentCentered.vue?raw";
import ContentSplitRaw from "~/components/blocks/components/ContentSplit.vue?raw";
import ContentFeaturesRaw from "~/components/blocks/components/ContentFeatures.vue?raw";
import ContentColumnsRaw from "~/components/blocks/components/ContentColumns.vue?raw";
import ContentWithAsideRaw from "~/components/blocks/components/ContentWithAside.vue?raw";

export const CONTENT_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "content-centered",
    title: "Centered Content",
    description:
      "Narrow centered text block with headline, body copy, and decorative headline label.",
    prompt:
      "Create a centered content section with a headline label, title, and two paragraphs of body text. " +
      "Constrain width to max-w-3xl for readability. Use semantic tokens.",
    source: ContentCenteredRaw,
    component: ContentCentered,
  },
  {
    id: "content-split",
    title: "Split Content",
    description:
      "Two-column layout with text on one side and a media placeholder on the other.",
    prompt:
      "Create a split content section with text (headline, title, paragraphs) on the left and " +
      "a video/media placeholder on the right using a 2-column grid. Use semantic tokens.",
    source: ContentSplitRaw,
    component: ContentSplit,
  },
  {
    id: "content-features",
    title: "Content with Features",
    description:
      "UPageSection with headline, description, and icon feature tiles.",
    prompt:
      "Create a content section using UPageSection with headline, title, description, and " +
      "a :features array of icon-titled items. Use semantic tokens.",
    source: ContentFeaturesRaw,
    component: ContentFeatures,
  },
  {
    id: "content-columns",
    title: "Multi-Column Content",
    description:
      "Three-column layout using UPageColumns for step-by-step or how-it-works content.",
    prompt:
      "Create a multi-column content section using UPageColumns with three columns, " +
      "each containing a numbered heading and descriptive text. Use semantic tokens.",
    source: ContentColumnsRaw,
    component: ContentColumns,
  },
  {
    id: "content-with-aside",
    title: "Content with Aside",
    description:
      "Long-form content area paired with a sticky sidebar of quick links using UPageAside and UPageLinks.",
    prompt:
      "Create a content-with-aside layout using a grid with main text content on the left and " +
      "UPageAside with UPageLinks navigation on the right. Use semantic tokens.",
    source: ContentWithAsideRaw,
    component: ContentWithAside,
  },
];
