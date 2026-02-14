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
      "An editorial-style centered content section with a decorative diamond ornament, gradient-accented headline, pull-quote typography, and staggered entrance animations — elegant and focused for storytelling.",
    prompt: `Generate a centered editorial content section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- A subtle radial glow background (absolute, rounded-full, bg-(--ui-primary)/8, blur-[120px]) centered behind content
- A decorative ornament row (centered flex with two gradient lines and a rotated diamond square in --ui-primary)
- An uppercase tracking-widest headline label in --ui-primary
- A bold title (text-3xl to text-5xl, font-extrabold, tracking-tight) with a gradient-text span (bg-gradient-to-r from --ui-primary to --ui-secondary, bg-clip-text, text-transparent)
- A pull-quote style lead paragraph (text-xl to text-2xl, italic, font-medium) with a large decorative opening-quote character at 15% primary opacity
- A thin horizontal divider (h-px w-16, bg-(--ui-border))
- A body paragraph in muted text with leading-relaxed
- Staggered CSS entrance animations (translateY fade-up) with animation-delay on each element, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: editorial magazine aesthetic with pull-quote typography, decorative flourishes, and atmospheric glow.`,
    source: ContentCenteredRaw,
    component: ContentCentered,
  },
  {
    id: "content-split",
    title: "Split Content",
    description:
      "An asymmetric split layout with a vertical gradient accent bar, inline stats, and a layered media card featuring a gradient top-strip and floating badge — great for origin stories and product narratives.",
    prompt: `Generate an asymmetric split content section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- A decorative blurred glow orb (absolute, bg-(--ui-secondary)/8, blur-[100px]) in the top-right corner
- A 2-column grid (lg:grid-cols-2, gap-12 to gap-16) with items-center
- Text side with:
  - A vertical gradient accent bar (w-1, self-stretch, bg-gradient-to-b from --ui-primary to --ui-secondary) alongside the content
  - An uppercase tracking-widest headline label in --ui-primary
  - A bold title (text-3xl to text-5xl, font-extrabold) with a primary-colored keyword span
  - Body paragraphs in muted text
  - An inline stat row (two stat blocks with bold numbers + muted labels, separated by a vertical divider)
- Media side with:
  - A layered card composition (background layer offset by inset-4 with primary tint, main card on top)
  - The main card has a gradient strip at top (h-1.5, from --ui-primary via --ui-secondary to --ui-primary), rounded-2xl, border, bg-elevated, shadow-2xl
  - Centered play icon placeholder with label
  - A floating badge card (absolute, -bottom-3 -right-3) with a heart icon and "Open Source" text
- Staggered entrance animations (text slides up, media slides up with delay, badge floats up last)
- prefers-reduced-motion respected
- All decorative elements use aria-hidden="true"
Style: asymmetric product storytelling with layered media card, gradient accents, and floating social proof.`,
    source: ContentSplitRaw,
    component: ContentSplit,
  },
  {
    id: "content-features",
    title: "Content with Features",
    description:
      "A bento-grid feature display with a crosshatch background pattern, dual glow spots, glass-effect feature cards with hover interactions, icon accent treatments, and corner reveal effects.",
    prompt: `Generate a bento-grid feature content section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- A crosshatch background pattern (CSS linear-gradient at 45deg and -45deg, 20px grid) at 3% opacity
- Dual glow spots (absolute, rounded-full blurs): primary at top-left, secondary at bottom-right
- A centered section header (max-w-2xl) with uppercase --ui-primary headline label, bold title with gradient-text emphasized word, and muted description
- A 2-column grid (sm:grid-cols-2, gap-4 to gap-5) of feature cards where each card has:
  - rounded-2xl, border with 60% opacity, bg-(--ui-bg)/60, backdrop-blur-sm for glass effect
  - Hover: border shifts to --ui-primary/30, shadow-lg with primary-tinted shadow
  - A 12×12 rounded-xl icon container (bg-(--ui-primary)/10) with hover scale-110 transition
  - Bold title and muted description text
  - A corner accent triangle (absolute top-right) that reveals on hover via opacity transition
- 4 features: Visual Editing (eye icon), Semantic Tokens (palette icon), Dark Mode Ready (moon icon), One-Click Export (download icon)
- Staggered entrance animations with increasing delay per card, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: bento-grid with crosshatch texture, glassmorphism cards, interactive hover states, and atmospheric glows.`,
    source: ContentFeaturesRaw,
    component: ContentFeatures,
  },
  {
    id: "content-columns",
    title: "Multi-Column Content",
    description:
      "A visual step-by-step flow with oversized gradient step numbers, icon-accented titles, glass-effect step cards with hover elevation, and connecting arrow indicators between columns.",
    prompt: `Generate a visual step-by-step content section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- A subtle centered glow (absolute, bg-(--ui-primary)/5, blur-[120px]) behind content
- A centered section header with uppercase --ui-primary label and bold title (text-3xl to text-5xl, font-extrabold)
- A 3-column grid (md:grid-cols-3, gap-6 to gap-8) of step cards where each card has:
  - rounded-2xl, border at 60% opacity, bg-(--ui-bg)/60, backdrop-blur-sm for glass effect
  - Hover: border shifts to --ui-primary/30, shadow-lg with primary-tinted shadow
  - A large gradient step number (text-5xl to text-6xl, font-black, bg-gradient-to-br from --ui-primary/25 to --ui-secondary/10, bg-clip-text text-transparent) that intensifies on hover
  - An icon + title row: 9×9 rounded-lg icon container (bg-(--ui-primary)/10, hover:scale-110) + bold title
  - Muted description text
- Connecting chevron-right arrows between cards (absolute positioned, visible on md+, --ui-primary/40)
- 3 steps: Choose palette (pipette icon), Customize tokens (sliders icon), Export and ship (rocket icon)
- Staggered entrance animations with 120ms delay increments, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: numbered step flow with oversized gradient numerals, glass cards, connecting indicators, and interactive hover states.`,
    source: ContentColumnsRaw,
    component: ContentColumns,
  },
  {
    id: "content-with-aside",
    title: "Content with Aside",
    description:
      "A polished documentation layout with a dot-grid background, icon-accented header, border-left lead paragraph, highlighted callout box, and a frosted-glass sticky sidebar with hover-interactive link items.",
    prompt: `Generate a documentation-style content section with sidebar using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- A dot-grid pattern background (CSS radial-gradient, 20px grid) at 3% opacity
- A 4-column grid (lg:grid-cols-4, gap-8 to gap-12)
- Main content area (lg:col-span-3) with:
  - An icon-accented header row: 10×10 rounded-xl icon container (bg-(--ui-primary)/10, book-open icon) + small uppercase category label and bold title
  - A lead paragraph with a left border accent (border-l-3, border-(--ui-primary)/30, pl-5): larger text, font-medium, --ui-text-highlighted/80
  - A regular body paragraph in muted text
  - A callout box (rounded-xl, border-(--ui-primary)/20, bg-(--ui-primary)/5) with sparkles icon, bold callout title, and description text
- Sidebar with:
  - A frosted glass card (lg:sticky, rounded-2xl, border at 60% opacity, bg-(--ui-bg)/60, backdrop-blur-sm, shadow-sm)
  - A heading row with compass icon + "Quick Links" uppercase label
  - A nav element (aria-label) with a list of link items, each being an anchor with icon + label, hover state (bg-(--ui-primary)/5, text-highlighted, icon turns primary)
  - A decorative bottom accent: three gradient-colored bars (--ui-primary at various opacities)
- Staggered entrance animations (main appears first, sidebar with 200ms delay)
- prefers-reduced-motion respected
- All decorative elements use aria-hidden="true"
Style: polished documentation reader with typographic treatments, callout boxes, frosted sidebar, and dot-grid texture.`,
    source: ContentWithAsideRaw,
    component: ContentWithAside,
  },
];
