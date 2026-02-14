import type { BlockShowcaseItem } from "~/types/components";

import GalleryGrid from "~/components/blocks/components/GalleryGrid.vue";
import GalleryMasonry from "~/components/blocks/components/GalleryMasonry.vue";
import GalleryFeatured from "~/components/blocks/components/GalleryFeatured.vue";
import GalleryCards from "~/components/blocks/components/GalleryCards.vue";
import GalleryLightbox from "~/components/blocks/components/GalleryLightbox.vue";
import GalleryMinimal from "~/components/blocks/components/GalleryMinimal.vue";

import GalleryGridRaw from "~/components/blocks/components/GalleryGrid.vue?raw";
import GalleryMasonryRaw from "~/components/blocks/components/GalleryMasonry.vue?raw";
import GalleryFeaturedRaw from "~/components/blocks/components/GalleryFeatured.vue?raw";
import GalleryCardsRaw from "~/components/blocks/components/GalleryCards.vue?raw";
import GalleryLightboxRaw from "~/components/blocks/components/GalleryLightbox.vue?raw";
import GalleryMinimalRaw from "~/components/blocks/components/GalleryMinimal.vue?raw";

export const GALLERY_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "gallery-grid",
    title: "Spotlight Grid",
    description:
      "An atmospheric 3-column image grid with gradient orbs, staggered entrance animations, gradient headline text, and rich hover overlays revealing each image's title and category.",
    prompt: `Generate a spotlight gallery grid section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Two decorative blurred gradient orbs (absolute-positioned, bg-(--ui-primary)/10 blur-[120px] and bg-(--ui-secondary)/8 blur-[100px]) for atmospheric depth
- A header with UBadge (color="primary", variant="subtle", size="lg"), a multi-part headline using CSS gradient text (bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)], bg-clip-text, text-transparent) for the first word and solid --ui-text-highlighted for the second, plus a muted description
- A 3-column responsive grid (grid-cols-2 md:grid-cols-3, gap-4 sm:gap-5) of 9 image items
- Each item has: rounded-xl border, bg-elevated, shadow-sm, hover:shadow-xl, transition-all duration-500
- Images with hover scale (scale-110, duration-700) and lazy loading
- A hover overlay (gradient from-black/70 via-black/20 to-transparent, opacity transition) showing category (uppercase, xs text) and title (sm bold white text)
- A decorative corner glow element per card (primary/20, blur-2xl) that fades in on hover
- Staggered CSS entrance animations (translateY fade-in) with animation-delay per item, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: atmospheric gallery with gradient orbs, cinematic hover reveals, and staggered entrance animations.`,
    source: GalleryGridRaw,
    component: GalleryGrid,
  },
  {
    id: "gallery-masonry",
    title: "Masonry Wall",
    description:
      "A Pinterest-style masonry layout over a dot-grid textured background with ambient glow, glassmorphism info overlays sliding up on hover, and category badges — organic and dynamic.",
    prompt: `Generate a masonry gallery section using Nuxt UI v4 UPageColumns and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding
- A dot-grid pattern background (CSS radial-gradient repeating at 0.03 opacity, 20px grid) for subtle texture
- A centered ambient glow (absolute, size-[40rem], bg-(--ui-primary)/8, blur-[140px]) behind the layout
- A header with uppercase primary-colored label, bold title, and muted description
- UPageColumns containing 8 image items with varied heights (h-52 to h-80) for organic masonry flow
- Each item: rounded-xl border with /60 opacity, bg-elevated, shadow-sm hover:shadow-lg, cursor-pointer
- Images with hover scale (scale-105, duration-700) and lazy loading
- A glassmorphism slide-up overlay on hover: translate-y-full to translate-y-0 transition, bg-(--ui-bg)/70 backdrop-blur-lg with border-t, showing image title (semibold) and a UBadge tag (color="primary", variant="subtle", size="xs")
- A subtle decorative glow element per card (primary/15, blur-xl) on hover
Style: textured masonry wall with ambient depth, glassmorphism hover reveals, and category tagging.`,
    source: GalleryMasonryRaw,
    component: GalleryMasonry,
  },
  {
    id: "gallery-featured",
    title: "Cinematic Showcase",
    description:
      "A large cinematic hero image with gradient overlay, stats, and a floating glassmorphism 'View Collection' card, followed by a staggered thumbnail strip with hover reveals — dramatic and editorial.",
    prompt: `Generate a cinematic featured gallery using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- Decorative ring elements (absolute, rounded-full borders with primary/10 and secondary/8 opacity) at offset corners
- A header with UBadge category label and a bold extrabold title
- A full-width featured image area (rounded-2xl, border, shadow-2xl) with:
  - Large image (h-64 sm:h-[28rem]) with hover scale (scale-105, duration-700)
  - Cinematic gradient overlay (from-black/80 via-black/30 to-transparent)
  - Bottom overlay content: title (xl-2xl bold white), description (sm white/75), and stat icons (eye + heart with view/like counts)
  - A floating glassmorphism card (absolute positioned, bg-(--ui-bg)/80 backdrop-blur-lg, border, shadow-lg) with icon + "View Collection" text and piece count
- Entrance animations: featured image slides up with scale, floating card fades up with delay
- A thumbnail strip (grid 2-col sm:4-col) below with staggered entrance, each thumbnail having hover scale + gradient overlay showing title
- prefers-reduced-motion respected
Style: cinematic showcase with dramatic overlays, floating UI elements, and staggered entrance choreography.`,
    source: GalleryFeaturedRaw,
    component: GalleryFeatured,
  },
  {
    id: "gallery-cards",
    title: "Bento Portfolio",
    description:
      "A bento-style portfolio grid using UPageGrid and UPageCard with spotlight hover effect, mixed card sizes (col-span), icons, category badges, and a warm gradient backdrop — professional and interactive.",
    prompt: `Generate a bento portfolio gallery using Nuxt UI v4 UPageGrid, UPageCard, and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- A warm gradient backdrop (bg-gradient-to-b from-[var(--ui-primary)]/4 via-transparent to-[var(--ui-secondary)]/4)
- A header with extrabold title and muted description
- UPageGrid containing 4 UPageCard items with bento-style sizing:
  - Items 1 and 4 use lg:col-span-2 with orientation="horizontal" (item 4 also reverse)
  - Items 2 and 3 are standard single-column cards
- Each UPageCard has: title, description, icon (lucide icons), spotlight and spotlight-color="primary" props for interactive mouse-following glow effect
- Default slot contains a full-bleed image (rounded-lg, object-cover, min-h-40)
- Footer slot shows a UBadge category label and "View project" text
Style: bento-layout portfolio with spotlight hover effects, mixed orientations, and warm atmospheric gradient.`,
    source: GalleryCardsRaw,
    component: GalleryCards,
  },
  {
    id: "gallery-lightbox",
    title: "Photo Archive",
    description:
      "An interactive click-to-expand photo grid over a warm gradient backdrop with decorative rings — clicking an image expands it to span two columns with details, creating a lightbox-like browsing experience.",
    prompt: `Generate an interactive photo archive gallery using Nuxt UI v4 and Tailwind CSS v4 with expand-on-click behavior. It should include:
- A section with relative + isolate + overflow-hidden
- A warm gradient backdrop (from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5)
- Decorative ring elements (absolute, rounded-full borders with primary/10 and secondary/10) at offset positions
- A header with UBadge "Archive" label, bold extrabold title, and description mentioning click-to-expand
- A 3-column responsive grid (grid-cols-2 lg:grid-cols-3, gap-4 sm:gap-5) of 6 images
- Click behavior: clicking an image toggles it between normal (single cell) and expanded (col-span-2 row-span-2 with ring highlight and shadow-2xl)
- Each item: rounded-2xl border, bg-elevated, shadow-sm, cursor-pointer, role="button" with keyboard support (Enter/Space) and aria-label
- Images transition height between compact (h-40 sm:h-52) and expanded (h-64 sm:h-96) states
- Bottom gradient overlay always showing title; expanded state also shows date
- Expand/collapse icon (maximize-2 / minimize-2) in the overlay corner
- Decorative glow element on the selected/expanded item (primary/15, blur-3xl)
- Staggered entrance animations (scale + translateY fade-in), respecting prefers-reduced-motion
Style: interactive archive with expand-in-place browsing, warm gradient atmosphere, and decorative rings.`,
    source: GalleryLightboxRaw,
    component: GalleryLightbox,
  },
  {
    id: "gallery-minimal",
    title: "Editorial Gallery",
    description:
      "An ultra-minimal editorial gallery with maximum whitespace, large full-width images, typographic captions with numbered indices, and thin separator lines — restrained and impactful.",
    prompt: `Generate an editorial minimal gallery using Tailwind CSS v4. It should include:
- A section with generous padding (py-20 sm:py-32) and a narrower max-w-5xl container
- A header with just a bold extrabold title (text-4xl to text-6xl) and no badge or description — maximum whitespace impact
- A vertical list (space-y-16 sm:space-y-24) of 4 image articles
- Each article contains:
  - A large full-width image (rounded-2xl, h-56 sm:h-80 lg:h-[26rem], object-cover) with very slow hover scale (scale-[1.03], duration-1000)
  - Below the image: a title (lg-xl bold), a poetic caption (sm-base muted text, max-w-lg), and a right-aligned zero-padded index number (font-mono, text-dimmed)
  - A thin separator line (border-t with /40 opacity) between articles — omitted after the last item
- Staggered entrance animations (translateY 24px fade-in, duration 0.9s) with per-article delay, respecting prefers-reduced-motion
Style: editorial restraint with maximum negative space, typographic captioning, and slow cinematic hover.`,
    source: GalleryMinimalRaw,
    component: GalleryMinimal,
  },
];
