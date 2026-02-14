import type { BlockShowcaseItem } from "~/types/components";

import TeamGrid from "~/components/blocks/components/TeamGrid.vue";
import TeamCards from "~/components/blocks/components/TeamCards.vue";
import TeamMinimal from "~/components/blocks/components/TeamMinimal.vue";
import TeamFeatured from "~/components/blocks/components/TeamFeatured.vue";
import teamGridRaw from "~/components/blocks/components/TeamGrid.vue?raw";
import teamCardsRaw from "~/components/blocks/components/TeamCards.vue?raw";
import teamMinimalRaw from "~/components/blocks/components/TeamMinimal.vue?raw";
import teamFeaturedRaw from "~/components/blocks/components/TeamFeatured.vue?raw";

export const TEAM_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "team-grid",
    title: "Team 1",
    description:
      "A responsive team member grid with UAvatar, names, roles, and short bios — the standard approach for showcasing a full team.",
    prompt: `Generate a team section. It should include:
- Section heading and description centered
- 3-column responsive grid (2 cols on mobile)
- Each member: UAvatar (size="3xl"), name, role title, and a short bio
- Six sample team members with varied roles
Style: clean responsive grid with avatar-centered member cards.`,
    source: teamGridRaw,
    component: TeamGrid,
  },
  {
    id: "team-cards",
    title: "Team 2",
    description:
      "Team members displayed in UPageGrid with UPageCard — each card features an avatar header, name, role, and social links.",
    prompt: `Generate a team cards section using Nuxt UI v4 UPageGrid and UPageCard. It should include:
- UPageGrid layout
- Each UPageCard: header slot with centered UAvatar, body with name, role, and bio
- Footer with social link icons (GitHub, LinkedIn, Twitter)
- Four team members
Style: elevated card-based team layout with social links.`,
    source: teamCardsRaw,
    component: TeamCards,
  },
  {
    id: "team-minimal",
    title: "Team 3",
    description:
      "A compact, minimal team display using flex-wrap with UAvatar chips — ideal for smaller teams or advisory listings.",
    prompt: `Generate a minimal team section. It should include:
- Centered heading
- Flex-wrap row of team members
- Each member: UAvatar (small) + name + role inline
- Compact spacing, no cards or heavy styling
Style: ultra-compact team listing with inline avatars.`,
    source: teamMinimalRaw,
    component: TeamMinimal,
  },
  {
    id: "team-featured",
    title: "Team 4",
    description:
      "A featured team section highlighting two co-founders in a split layout with a large image placeholder and detailed bios.",
    prompt: `Generate a featured team section. It should include:
- Section heading and description
- Split layout: left side with two featured founders (UAvatar, name, role, extended bio)
- Right side with a large image placeholder (rounded-xl, bg-elevated, border)
- Responsive: stacked on mobile, side-by-side on desktop
Style: editorial-style featured team layout for founders or leadership.`,
    source: teamFeaturedRaw,
    component: TeamFeatured,
  },
];
