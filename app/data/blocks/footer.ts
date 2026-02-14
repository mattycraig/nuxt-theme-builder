import type { BlockShowcaseItem } from "~/types/components";

import FooterSimple from "~/components/blocks/components/FooterSimple.vue";
import FooterColumns from "~/components/blocks/components/FooterColumns.vue";
import FooterBig from "~/components/blocks/components/FooterBig.vue";
import FooterMinimal from "~/components/blocks/components/FooterMinimal.vue";

import FooterSimpleRaw from "~/components/blocks/components/FooterSimple.vue?raw";
import FooterColumnsRaw from "~/components/blocks/components/FooterColumns.vue?raw";
import FooterBigRaw from "~/components/blocks/components/FooterBig.vue?raw";
import FooterMinimalRaw from "~/components/blocks/components/FooterMinimal.vue?raw";

export const FOOTER_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "footer-simple",
    title: "Simple Footer",
    description: "Single-row footer with logo, nav links, and copyright text.",
    prompt:
      "Create a simple footer with a logo and brand name, a row of links, and a copyright notice. " +
      "All in a single row. Use semantic tokens.",
    source: FooterSimpleRaw,
    component: FooterSimple,
  },
  {
    id: "footer-columns",
    title: "Column Footer",
    description:
      "Multi-column footer with grouped links under category headings and a bottom bar.",
    prompt:
      "Create a multi-column footer with 4 link columns (Product, Resources, Company, Legal), " +
      "a separator, and a bottom row with logo and copyright. Use semantic tokens.",
    source: FooterColumnsRaw,
    component: FooterColumns,
  },
  {
    id: "footer-big",
    title: "Big Footer",
    description:
      "Full-featured footer with brand description, social links, link columns, and legal row.",
    prompt:
      "Create a big footer with a brand section (logo, description, social icon buttons), " +
      "3 link columns, separator, and bottom row with copyright and legal links. Use semantic tokens.",
    source: FooterBigRaw,
    component: FooterBig,
  },
  {
    id: "footer-minimal",
    title: "Minimal Footer",
    description: "Ultra-compact footer with copyright and two links.",
    prompt:
      "Create a minimal footer with just a copyright notice and two links (Privacy, Terms). " +
      "Keep it compact. Use semantic tokens.",
    source: FooterMinimalRaw,
    component: FooterMinimal,
  },
];
