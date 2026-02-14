import type { BlockShowcaseItem } from "~/types/components";

import BlogGrid from "~/components/blocks/components/BlogGrid.vue";
import BlogFeatured from "~/components/blocks/components/BlogFeatured.vue";
import BlogMinimal from "~/components/blocks/components/BlogMinimal.vue";
import BlogCards from "~/components/blocks/components/BlogCards.vue";
import BlogMagazine from "~/components/blocks/components/BlogMagazine.vue";

import BlogGridRaw from "~/components/blocks/components/BlogGrid.vue?raw";
import BlogFeaturedRaw from "~/components/blocks/components/BlogFeatured.vue?raw";
import BlogMinimalRaw from "~/components/blocks/components/BlogMinimal.vue?raw";
import BlogCardsRaw from "~/components/blocks/components/BlogCards.vue?raw";
import BlogMagazineRaw from "~/components/blocks/components/BlogMagazine.vue?raw";

export const BLOG_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "blog-grid",
    title: "Blog Grid",
    description:
      "Standard blog post grid using UBlogPosts and UBlogPost with images, badges, and authors.",
    prompt:
      "Create a blog section with a grid of post cards using UBlogPosts and UBlogPost. " +
      "Each post has a title, description, date, category badge, cover image, and author avatar. " +
      "Use semantic color tokens.",
    source: BlogGridRaw,
    component: BlogGrid,
  },
  {
    id: "blog-featured",
    title: "Featured Blog",
    description:
      "Hero-style featured post with horizontal layout followed by a row of recent posts.",
    prompt:
      "Create a blog section with a large featured post using UBlogPost with horizontal orientation, " +
      "followed by a row of recent posts in UBlogPosts. Use semantic tokens.",
    source: BlogFeaturedRaw,
    component: BlogFeatured,
  },
  {
    id: "blog-minimal",
    title: "Minimal Blog List",
    description:
      "Clean list of blog posts using UPageList with date, author, title, and description.",
    prompt:
      "Create a minimal blog list using UPageList with dividers. Each item shows date, author, " +
      "title, and description in a clean typographic layout. Use semantic tokens.",
    source: BlogMinimalRaw,
    component: BlogMinimal,
  },
  {
    id: "blog-cards",
    title: "Blog Cards",
    description:
      "Card-based blog layout using UPageGrid and UPageCard with cover images and metadata.",
    prompt:
      "Create a blog section using UPageGrid with UPageCard items. Each card has a header image, " +
      "title, description, and footer with author name and date. Use semantic tokens.",
    source: BlogCardsRaw,
    component: BlogCards,
  },
  {
    id: "blog-magazine",
    title: "Magazine Layout",
    description:
      "Editorial-style layout with a large featured post alongside a trending sidebar list.",
    prompt:
      "Create a magazine-style blog layout with a featured UBlogPost on the left and a numbered " +
      "trending list on the right using UPageList. Use semantic tokens.",
    source: BlogMagazineRaw,
    component: BlogMagazine,
  },
];
