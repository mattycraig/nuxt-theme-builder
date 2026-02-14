import type { BlockShowcaseItem } from "~/types/components";

import GalleryGrid from "~/components/blocks/components/GalleryGrid.vue";
import GalleryMasonry from "~/components/blocks/components/GalleryMasonry.vue";
import GalleryFeatured from "~/components/blocks/components/GalleryFeatured.vue";
import GalleryCards from "~/components/blocks/components/GalleryCards.vue";

import GalleryGridRaw from "~/components/blocks/components/GalleryGrid.vue?raw";
import GalleryMasonryRaw from "~/components/blocks/components/GalleryMasonry.vue?raw";
import GalleryFeaturedRaw from "~/components/blocks/components/GalleryFeatured.vue?raw";
import GalleryCardsRaw from "~/components/blocks/components/GalleryCards.vue?raw";

export const GALLERY_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "gallery-grid",
    title: "Image Grid",
    description:
      "Responsive 3-column image grid with hover zoom effect and rounded borders.",
    prompt:
      "Create an image gallery with a 3-column responsive grid. Each image has rounded corners, " +
      "a border, and a subtle hover scale effect. Use lazy loading. Use semantic tokens.",
    source: GalleryGridRaw,
    component: GalleryGrid,
  },
  {
    id: "gallery-masonry",
    title: "Masonry Gallery",
    description:
      "Pinterest-style masonry layout using UPageColumns with varied image heights.",
    prompt:
      "Create a masonry-style gallery using UPageColumns. Images have different heights " +
      "for a dynamic layout. Each has rounded corners and border. Use semantic tokens.",
    source: GalleryMasonryRaw,
    component: GalleryMasonry,
  },
  {
    id: "gallery-featured",
    title: "Featured Gallery",
    description:
      "Large hero image with title overlay followed by a row of thumbnail images.",
    prompt:
      "Create a gallery with a full-width featured image with gradient overlay and text, " +
      "followed by a row of 4 thumbnail images below. Use semantic tokens.",
    source: GalleryFeaturedRaw,
    component: GalleryFeatured,
  },
  {
    id: "gallery-cards",
    title: "Gallery Cards",
    description:
      "Project portfolio cards using UPageGrid and UPageCard with images and metadata.",
    prompt:
      "Create a portfolio gallery using UPageGrid with UPageCard items. Each card has " +
      "a header image, project title, and category description. Use semantic tokens.",
    source: GalleryCardsRaw,
    component: GalleryCards,
  },
];
