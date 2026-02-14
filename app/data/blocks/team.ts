import type { BlockShowcaseItem } from "~/types/components";

import TeamGrid from "~/components/blocks/components/TeamGrid.vue";
import TeamCards from "~/components/blocks/components/TeamCards.vue";
import TeamMinimal from "~/components/blocks/components/TeamMinimal.vue";
import TeamFeatured from "~/components/blocks/components/TeamFeatured.vue";
import TeamBento from "~/components/blocks/components/TeamBento.vue";
import TeamOverlap from "~/components/blocks/components/TeamOverlap.vue";
import teamGridRaw from "~/components/blocks/components/TeamGrid.vue?raw";
import teamCardsRaw from "~/components/blocks/components/TeamCards.vue?raw";
import teamMinimalRaw from "~/components/blocks/components/TeamMinimal.vue?raw";
import teamFeaturedRaw from "~/components/blocks/components/TeamFeatured.vue?raw";
import teamBentoRaw from "~/components/blocks/components/TeamBento.vue?raw";
import teamOverlapRaw from "~/components/blocks/components/TeamOverlap.vue?raw";

export const TEAM_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "team-grid",
    title: "Team Grid",
    description:
      "An atmospheric team grid with gradient orb backgrounds, frosted glass-style cards with hover-lift effects, staggered entrance animations, and avatar ring transitions — elevated and eye-catching.",
    prompt: `Generate an atmospheric team grid section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Two decorative blurred gradient orbs (absolute-positioned rounded-full divs with bg-(--ui-primary)/10 and bg-(--ui-secondary)/8, blur-[100px] and blur-[80px]) for atmospheric depth
- A centered header with uppercase tracking-wide primary-colored label and an extrabold headline (text-3xl to text-5xl, tracking-tight, leading-[1.15])
- A 3-column responsive grid (1 col mobile, 2 sm, 3 lg) with gap-6
- Each member card: rounded-2xl, border with 60% opacity, bg-(--ui-bg)/70, backdrop-blur-sm, p-6, text-center
- Card hover effects: border transitions to primary/40, shadow-lg with primary/5, -translate-y-1 lift
- A hidden gradient overlay inside each card (bg-gradient-to-b from-(--ui-primary)/5) that fades in on hover
- UAvatar (size="3xl", color="primary") with ring-2 ring-(--ui-border)/50 that transitions to ring-(--ui-primary)/50 on hover, plus ring-offset-2
- Member name (font-semibold text-lg), role (text-sm font-medium text-(--ui-primary)), and bio (text-sm text-muted)
- Staggered CSS entrance animations (translateY fade-in) with incremental animation-delay per card, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: atmospheric gradient backdrop with frosted glass cards, hover-lift interaction, and cinematic staggered entrance.`,
    source: teamGridRaw,
    component: TeamGrid,
  },
  {
    id: "team-cards",
    title: "Team Cards",
    description:
      "Glass profile cards over a dot-grid background with a centered primary glow, gradient accent bars, frosted card treatment, social link buttons, and smooth hover transitions.",
    prompt: `Generate a glassmorphism team cards section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A dot-grid pattern background (CSS radial-gradient repeating pattern at 0.03 opacity, 24px grid)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/8, blur-[120px]) behind the cards
- A centered heading and muted description paragraph
- A 4-column responsive grid (1 col mobile, 2 sm, 4 lg) with gap-6
- Each card: rounded-2xl, border with 50% opacity, bg-(--ui-bg)/60, backdrop-blur-md, overflow-hidden
- A 1px-height gradient accent bar at top of each card (bg-gradient-to-r from-(--ui-primary) to-(--ui-secondary)) that transitions from 60% to 100% opacity on hover
- Card hover: shadow-xl with primary/5, border transitions to primary/30
- Card content: UAvatar (size="3xl", color="primary") centered, name, role in primary, bio, then social link UButtons (icon-only, size="xs", variant="ghost", color="neutral") for GitHub, LinkedIn, Twitter with proper aria-labels
- Each social button is conditionally rendered based on member data
Style: modern glassmorphism with dot-grid texture, gradient accent bars, and social link integration.`,
    source: teamCardsRaw,
    component: TeamCards,
  },
  {
    id: "team-minimal",
    title: "Team Minimal",
    description:
      "Refined pill-shaped member badges with avatar, name, and role in a flex-wrap layout — subtle glass backdrop, hover ring animation, and compact spacing for advisory or small team listings.",
    prompt: `Generate a refined minimal team section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A max-w-4xl centered container with generous padding (py-12 sm:py-16)
- A bold centered heading (text-2xl) with extra bottom margin (mb-10)
- A flex-wrap row of pill-shaped member badges with gap-3, centered
- Each badge: flex items-center, rounded-full, border with 60% opacity, bg-(--ui-bg)/80, backdrop-blur-sm
- Badge padding: py-2 pl-2 pr-5 for asymmetric padding around the avatar
- Badge hover: border transitions to primary/40, shadow-md with primary/5
- UAvatar (size="sm", color="primary") with ring-1 that transitions from border/40 to primary/40 on hover
- Compact text: name (text-sm font-semibold) and role (text-xs text-muted) stacked in a tight leading container
- Smooth transitions (duration-250) on all interactive properties
- cursor-default on badges (non-interactive display)
Style: ultra-compact pill badges with glass treatment and subtle hover ring refinement.`,
    source: teamMinimalRaw,
    component: TeamMinimal,
  },
  {
    id: "team-featured",
    title: "Team Featured",
    description:
      "An editorial spotlight layout with decorative geometric rings, gradient text label, dramatic typography, hoverable founder bios with role badges, and a visual showcase card with overlapping avatars and tag badges.",
    prompt: `Generate an editorial featured team section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Decorative geometric rings (absolute-positioned, rounded-full, border at 10% and 8% opacity) at different corners for visual interest
- A 2-column responsive grid (stacked mobile, side-by-side lg) with gap-12 to gap-16, items-center
- Left column:
  - An uppercase label with CSS gradient text (bg-gradient-to-r from primary to secondary, bg-clip-text, text-transparent)
  - A dramatic headline (text-3xl to text-5xl, font-extrabold, tracking-tight, leading-[1.1]) with a line break
  - A muted description paragraph with leading-relaxed
  - Two founder entries, each in a hoverable container (p-4, -mx-4, rounded-xl, hover:bg-(--ui-bg-elevated)/60):
    - UAvatar (size="xl") with colored ring (primary/20 and secondary/20), shrink-0
    - Name (font-semibold), UBadge for role (variant="subtle", size="xs"), and an extended bio
- Right column: a showcase card (rounded-2xl, border, bg-elevated, shadow-2xl, overflow-hidden) containing:
  - A gradient background (bg-gradient-to-br from-primary/10 via-transparent to-secondary/10) with aspect-square
  - Overlapping avatars using flex -space-x-3, each with ring-4 ring-(--ui-bg-elevated)
  - A year label, a bold tagline, and UBadge tags for specializations
- Staggered CSS entrance animations with animation-delay on the right column, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: editorial spotlight with geometric rings, gradient typography, interactive founder profiles, and a rich visual showcase card.`,
    source: teamFeaturedRaw,
    component: TeamFeatured,
  },
  {
    id: "team-bento",
    title: "Team Bento",
    description:
      "An asymmetric bento grid layout with a large featured member tile spanning multiple rows, smaller member tiles with horizontal avatar-and-text layout, a mesh gradient backdrop, and social link integration.",
    prompt: `Generate a bento grid team section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A subtle mesh gradient backdrop (bg-gradient-to-br from-(--ui-primary)/5 via-transparent to-(--ui-secondary)/5)
- A centered header with UBadge (color="primary", variant="subtle", size="lg") and a bold heading
- A 3-column responsive grid (1 col mobile, 2 sm, 3 lg) with gap-4 and auto-rows-fr
- A featured member tile: spans sm:col-span-2 lg:col-span-1 lg:row-span-2
  - rounded-2xl, border at 60% opacity, bg-(--ui-bg)/70, backdrop-blur-sm
  - Full-height flex column centered with p-8
  - Persistent gradient overlay (bg-gradient-to-b from-(--ui-primary)/8 to-transparent at 60% opacity)
  - Large UAvatar (size="3xl") with ring-3 ring-(--ui-primary)/20 and ring-offset-2
  - Name (text-xl font-bold), UBadge for role, extended bio (max-w-xs), and social link buttons
  - Hover: border primary/40, shadow-xl with primary/5
- Smaller member tiles: rounded-2xl, border at 60%, bg-(--ui-bg)/70, backdrop-blur-sm, p-5
  - Horizontal layout: flex items-start gap-4
  - UAvatar (size="lg") with ring-1 that transitions on hover
  - Name (font-semibold, truncate), role (text-xs text-primary), bio (text-sm, line-clamp-2)
  - Hover: border primary/30, shadow-lg with primary/5
Style: asymmetric bento grid with featured member emphasis, mesh gradient atmosphere, and mixed information density.`,
    source: teamBentoRaw,
    component: TeamBento,
  },
  {
    id: "team-overlap",
    title: "Team Overlap",
    description:
      "An overlapping horizontal card stack with a gradient strip backdrop, avatar-forward cards with negative horizontal spacing, hover-expand bio reveal, scale transitions, and staggered slide-up entrance animations.",
    prompt: `Generate an overlapping card stack team section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A horizontal gradient strip backdrop (absolute, top-1/2, -translate-y-1/2, h-48, bg-gradient-to-r from primary/5 via secondary/8 to primary/5)
- A centered header with uppercase tracking-wide primary label and extrabold heading
- A horizontally centered flex container with negative horizontal spacing (-space-x-3 sm:-space-x-4) to create overlap
- Each card: w-44 sm:w-52, rounded-2xl, border at 60% opacity, bg-(--ui-bg)/90, backdrop-blur-md, p-5, shadow-lg
- Cards are z-indexed in reverse order so the first card appears on top
- Card hover: z-20 override, scale-105, shadow-xl with primary/10, border transitions to primary/40
- Card content: centered UAvatar (size="2xl") with ring-2 that transitions to primary/30 on hover
- Name (font-semibold text-sm, truncate), role (text-xs text-primary font-medium)
- A hidden bio that reveals on hover: opacity-0 max-h-0 → opacity-100 max-h-20, with overflow-hidden and transition-all duration-300
- Staggered CSS slide-up entrance animations with incremental delay per card, respecting prefers-reduced-motion
Style: playful overlapping card stack with depth, hover-expand interaction, and gradient strip atmosphere.`,
    source: teamOverlapRaw,
    component: TeamOverlap,
  },
];
