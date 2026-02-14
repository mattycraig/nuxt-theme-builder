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
      "An atmospheric blog grid with decorative primary/secondary gradient orbs, flanked accent-line section header, staggered card entrance animations, and hover-lift effects — polished and inviting.",
    prompt: `Generate a blog grid section using Nuxt UI v4 UBlogPosts/UBlogPost and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Two decorative blurred gradient orbs (absolute-positioned, rounded-full, bg-(--ui-primary)/8 blur-[100px] and bg-(--ui-secondary)/6 blur-[80px]) for atmospheric depth
- A centered section header with flanking horizontal gradient accent lines (h-px, bg-gradient-to-r from-transparent to-[var(--ui-primary)]) around an uppercase "Blog" label in text-(--ui-primary)
- A bold title (text-3xl sm:text-4xl, font-bold, tracking-tight) and a muted subtitle paragraph (max-w-2xl)
- UBlogPosts containing UBlogPost cards, each wrapped in a div with staggered CSS entrance animations (translateY fade-in with incremental animation-delay)
- Hover effect on each card wrapper: shadow-xl shadow-(--ui-primary)/5, -translate-y-1, transition-all duration-300
- A "View all posts" UButton (variant="ghost", color="primary", trailing arrow icon) centered below
- All decorative elements use aria-hidden="true", animations respect prefers-reduced-motion
Style: atmospheric gradient backdrop with staggered entrance and interactive hover-lift cards.`,
    source: BlogGridRaw,
    component: BlogGrid,
  },
  {
    id: "blog-featured",
    title: "Featured Blog",
    description:
      "A spotlight-style featured blog layout with a radial gradient glow behind the featured post, elevated frosted card treatment, gradient divider between sections, and staggered entrance animations.",
    prompt: `Generate a featured blog section using Nuxt UI v4 UBlogPost/UBlogPosts and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding
- A pointer-events-none spotlight glow (absolute top-0, left-1/2, -translate-x-1/2, h-[32rem], bg-gradient-to-b from-[var(--ui-primary)]/6 via-transparent, rounded-[50%], blur-[60px])
- A centered heading with title and muted subtitle paragraph
- A featured post area wrapped in a rounded-2xl frosted card (border border-(--ui-border)/50, bg-(--ui-bg)/80, backdrop-blur-sm, shadow-lg) with hover:shadow-xl hover:shadow-(--ui-primary)/5 transition
- UBlogPost with orientation="horizontal" for the featured article
- A "Recent" subheading with a gradient horizontal rule (h-px bg-gradient-to-r from-(--ui-border) to-transparent) as divider
- Recent posts in UBlogPosts with individual staggered entrance animations and subtle hover translate effects
- All animations respect prefers-reduced-motion
Style: editorial spotlight with frosted card emphasis and gradient section dividers.`,
    source: BlogFeaturedRaw,
    component: BlogFeatured,
  },
  {
    id: "blog-minimal",
    title: "Minimal Blog List",
    description:
      "An editorial timeline-accented blog list with a vertical gradient line, animated dot markers that fill on hover, sliding accent bars, reading time metadata, and staggered slide-in entrance animations.",
    prompt: `Generate a minimal timeline blog list using Nuxt UI v4 UPageList and Tailwind CSS v4. It should include:
- A section with max-w-3xl centered container and generous padding
- A header with bold title (text-3xl, tracking-tight) and a short underline bar (h-1 w-12 rounded-full, bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)])
- A relative container with a vertical timeline line on the left (absolute, w-px, bg-gradient-to-b from-[var(--ui-primary)]/30 via-(--ui-border) to-transparent)
- Each post item with left padding (pl-8) containing:
  - A timeline dot (absolute, left-0, -translate-x-1/2, size-2.5 rounded-full, border-2 border-(--ui-primary)/40, bg-(--ui-bg)) that fills with bg-(--ui-primary) and scales on group-hover
  - A vertical accent bar (absolute left-3, w-0.5, bg-(--ui-primary)) that fades in on hover (opacity-0 → opacity-100)
  - Metadata line: date, author name, and reading time in text-(--ui-primary)/70
  - Title that transitions to text-(--ui-primary) on hover
  - Description with leading-relaxed
- Staggered CSS entrance animations (translateX slide-in from left) respecting prefers-reduced-motion
Style: editorial timeline with interactive dot markers and progressive reveal animations.`,
    source: BlogMinimalRaw,
    component: BlogMinimal,
  },
  {
    id: "blog-cards",
    title: "Blog Cards",
    description:
      "Card-based blog layout over a subtle dot-grid texture, featuring floating category badges over cover images, image zoom on hover, elevated card glow effects, and author avatars in the footer.",
    prompt: `Generate a blog cards section using Nuxt UI v4 UPageGrid/UPageCard and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- A dot-grid pattern background (CSS radial-gradient repeating at 0.03 opacity, 20px grid) for subtle texture
- A centered section header with bold title and muted subtitle
- UPageGrid containing UPageCard items, each wrapped in a div with staggered entrance animations (translateY + slight scale)
- Each card with:
  - A #header slot containing an overflow-hidden container with the cover image that scales (scale-105) on group-hover via transition-transform duration-500
  - A floating UBadge (absolute top-3 left-3, variant="solid", shadow-md) over the image for category
  - A #footer slot with UAvatar (size="xs") + author name on the left, date on the right
- Card hover effect: shadow-xl shadow-(--ui-primary)/8, -translate-y-1, border-(--ui-primary)/20 transition
- All decorative elements use aria-hidden="true", animations respect prefers-reduced-motion
Style: textured dot-grid backdrop with floating badges, image zoom, and glow-on-hover cards.`,
    source: BlogCardsRaw,
    component: BlogCards,
  },
  {
    id: "blog-magazine",
    title: "Magazine Layout",
    description:
      "A masthead-style editorial layout with decorative corner rings, gradient rule-line framing, a frosted featured article card, and a glassmorphic trending sidebar with gradient-text numbering and category badges.",
    prompt: `Generate a magazine-style blog layout using Nuxt UI v4 UBlogPost/UPageList and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- Decorative corner ring elements (absolute-positioned rounded-full borders at -top-16 -right-16 and -bottom-20 -left-20 with primary/secondary at 8% opacity)
- A masthead-style centered header with gradient horizontal rules above/below the title (h-px bg-gradient-to-r from-transparent via-(--ui-border) to-transparent)
- A grid (lg:grid-cols-3 gap-8) layout:
  - Main column (lg:col-span-2): featured UBlogPost wrapped in a rounded-2xl frosted card (border-(--ui-border)/50, bg-(--ui-bg)/80, backdrop-blur-sm, shadow-lg) with hover:shadow-xl
  - Sidebar aside: a glassmorphic container (rounded-2xl, border-(--ui-border)/50, bg-(--ui-bg-elevated)/50, backdrop-blur-sm, p-6) containing:
    - A "Trending" heading with UIcon (i-lucide-trending-up) in text-(--ui-primary)
    - Numbered list where each number uses gradient text (bg-gradient-to-b from-[var(--ui-primary)] to-[var(--ui-primary)]/30, bg-clip-text, text-transparent)
    - UBadge (variant="subtle", color="neutral", size="xs") for category + date metadata
    - Titles that transition to text-(--ui-primary) on hover
- Staggered entrance animations respecting prefers-reduced-motion
Style: editorial masthead with glassmorphic sidebar, gradient-text numbering, and frosted card emphasis.`,
    source: BlogMagazineRaw,
    component: BlogMagazine,
  },
];
