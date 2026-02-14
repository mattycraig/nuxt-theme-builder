import type { BlockShowcaseItem } from "~/types/components";

import StatisticGlowCards from "~/components/blocks/components/StatisticGlowCards.vue";
import StatisticDashboard from "~/components/blocks/components/StatisticDashboard.vue";
import StatisticAtmosphericStrip from "~/components/blocks/components/StatisticAtmosphericStrip.vue";
import StatisticEditorial from "~/components/blocks/components/StatisticEditorial.vue";
import StatisticSpotlight from "~/components/blocks/components/StatisticSpotlight.vue";
import StatisticRingProgress from "~/components/blocks/components/StatisticRingProgress.vue";

import StatisticGlowCardsRaw from "~/components/blocks/components/StatisticGlowCards.vue?raw";
import StatisticDashboardRaw from "~/components/blocks/components/StatisticDashboard.vue?raw";
import StatisticAtmosphericStripRaw from "~/components/blocks/components/StatisticAtmosphericStrip.vue?raw";
import StatisticEditorialRaw from "~/components/blocks/components/StatisticEditorial.vue?raw";
import StatisticSpotlightRaw from "~/components/blocks/components/StatisticSpotlight.vue?raw";
import StatisticRingProgressRaw from "~/components/blocks/components/StatisticRingProgress.vue?raw";

export const STATISTIC_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "statistic-cards",
    title: "Glow Cards",
    description:
      "Hoverable stat cards with soft glow halos, gradient number text, tinted icon circles, and staggered entrance animations — attention-grabbing yet refined.",
    prompt: `Generate a statistics glow-card grid using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A centered headline: uppercase primary-colored label + bold highlighted title
- A 4-column responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6) of stat cards, each with:
  - A soft glow halo (absolute -inset-1, blurred bg-(--ui-primary)/8 or bg-(--ui-secondary)/8) that fades in on group-hover
  - A rounded-2xl card with border, bg-(--ui-bg-elevated)/80, backdrop-blur-sm, hover:shadow-lg, hover:border-(--ui-primary)/30 transitions
  - An icon inside a rounded-xl tinted background (bg-(--ui-primary)/12) that scales on hover
  - A large number in gradient text (bg-gradient-to-br from primary to secondary, bg-clip-text, text-transparent)
  - A muted label below with text-sm font-medium
- Staggered CSS entrance animations (translateY + fade-in) with per-card animation-delay, respecting prefers-reduced-motion
Style: elevated glow-card grid with gradient typography and interactive hover depth.`,
    source: StatisticGlowCardsRaw,
    component: StatisticGlowCards,
  },
  {
    id: "statistic-highlight",
    title: "Hero Stat Spotlight",
    description:
      "A dramatic glassmorphism spotlight for one headline metric with atmospheric gradient orbs and smaller supporting stat cards below — perfect for a single killer number.",
    prompt: `Generate a hero-stat spotlight section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- Two atmospheric gradient orbs (absolute-positioned, rounded-full, bg-(--ui-primary)/10 blur-[120px] and bg-(--ui-secondary)/8 blur-[100px]) for depth
- A centered glassmorphism card (max-w-lg, rounded-3xl, border-(--ui-border)/40, bg-(--ui-bg)/50, backdrop-blur-xl, shadow-2xl, p-10 sm:p-14):
  - An icon inside a rounded-2xl tinted circle (bg-(--ui-primary)/12)
  - A massive number (text-6xl sm:text-7xl font-black) in gradient text (from primary to secondary)
  - A medium-weight label and a short muted description
- Below: a 3-column grid of smaller supporting stat cards, each with an icon + value + label, rounded-xl border, hover:shadow-md
- Staggered entrance animations for glass card (scale + translateY) and support cards (translateY), respecting prefers-reduced-motion
Style: dramatic glassmorphism spotlight with atmospheric orbs and supporting metrics beneath.`,
    source: StatisticSpotlightRaw,
    component: StatisticSpotlight,
  },
  {
    id: "statistic-section",
    title: "Dashboard Showcase",
    description:
      "Stats as UPageSection features alongside a realistic mock dashboard card with mini KPI tiles, an animated bar chart, and a floating live-status badge.",
    prompt: `Generate a dashboard-showcase statistics section using Nuxt UI v4 UPageSection and Tailwind CSS v4. It should include:
- UPageSection with headline, title, description, :features array (numeric titles, descriptions, icons), and orientation="horizontal"
- The default slot contains a mock dashboard card (rounded-2xl, border, bg-(--ui-bg-elevated), shadow-xl) with:
  - Window chrome bar (3 colored dots: red/yellow/green + monospace app name)
  - A 3-column grid of mini stat tiles (rounded-lg, bg-(--ui-bg)/60, border-(--ui-border)/50, p-3) each showing value + label + green trend indicator
  - A mini bar chart: 7 bars in a flex row (items-end), each bar uses bg-gradient-to-t from primary to primary/40, heights vary, with day-of-week labels below
  - Bars animate with scaleY grow-from-bottom with staggered delay
- A floating "Live" badge (absolute, -top-2.5 -right-2.5) with a ping-animated green dot and text
- Dashboard card slides in from right, bar chart bars grow with staggered delay, float badge fades in later
- prefers-reduced-motion respected
Style: professional product-dashboard showcase with live indicators and animated data visualization.`,
    source: StatisticDashboardRaw,
    component: StatisticDashboard,
  },
  {
    id: "statistic-ring",
    title: "Ring Progress",
    description:
      "Circular SVG ring indicators around each metric with gradient stroke fills, center icons, and animated ring-draw entrances — a data-visualization aesthetic.",
    prompt: `Generate a ring-progress statistics section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with generous padding (py-16 sm:py-24)
- A centered header: uppercase primary label + bold title + muted description
- A 4-column grid (grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10), each stat has:
  - An SVG ring (size-28 sm:size-32, viewBox 0 0 100 100, -rotate-90):
    - A track circle (r=40, stroke var(--ui-border), stroke-width 6, stroke-opacity 0.4)
    - A progress circle (r=40, stroke with linearGradient from primary to secondary, stroke-width 6, stroke-linecap round, stroke-dasharray/dashoffset for percentage)
    - A defs linearGradient for the ring stroke
  - Centered inside the ring: an icon in a rounded-xl tinted bg, with group-hover scale
  - Below the ring: bold number (text-2xl sm:text-3xl) + muted label
- Ring-draw CSS animation (stroke-dashoffset from full to computed) with staggered delay per ring
- Fade-up entrance for each stat item, respecting prefers-reduced-motion
Style: data-visualization ring progress with gradient SVG strokes and animated draw-in.`,
    source: StatisticRingProgressRaw,
    component: StatisticRingProgress,
  },
  {
    id: "statistic-counters",
    title: "Atmospheric Strip",
    description:
      "A horizontal counter strip on an elevated backdrop with dot-grid texture, decorative rings at the edges, and numbers that highlight on hover.",
    prompt: `Generate an atmospheric counter-strip statistics section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden, bg-(--ui-bg-elevated), generous padding (py-16 sm:py-24)
- A dot-grid texture background (CSS radial-gradient repeating 20px pattern at opacity-[0.03])
- Three decorative rings (absolute-positioned, rounded-full, border with primary/secondary at low opacity) placed at -top/-left, -bottom/-right, and center (large, subtle)
- A centered "Platform Metrics" label in primary uppercase
- A flex row (flex-col sm:flex-row) with divide-y/divide-x dividers (divide-(--ui-border)/60):
  - Each stat: large number (text-4xl sm:text-5xl font-extrabold, text-highlighted, hover transitions to primary color) + uppercase muted label below
- Staggered CSS entrance animations (scale 0.92 → 1 with fade) with per-stat delay, respecting prefers-reduced-motion
Style: atmospheric elevated strip with textured background, decorative circular elements, and interactive hover highlighting.`,
    source: StatisticAtmosphericStripRaw,
    component: StatisticAtmosphericStrip,
  },
  {
    id: "statistic-minimal",
    title: "Editorial Numbers",
    description:
      "Oversized gradient-to-muted numbers with thin colored accent lines above — clean editorial typography in a left-aligned grid layout.",
    prompt: `Generate an editorial-minimal statistics section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with generous padding (py-16 sm:py-24)
- A 4-column responsive grid (grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12), each stat has:
  - A thin accent line (h-0.5 w-8 rounded-full mb-5) alternating between bg-(--ui-primary)/60 and bg-(--ui-secondary)/60
  - An oversized number (text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none) with gradient text from --ui-text-highlighted to --ui-text-muted (bg-gradient-to-br, bg-clip-text, text-transparent)
  - A label below (text-sm font-medium, uppercase tracking-wide, text-muted)
- Staggered CSS entrance (translateY + fade-in) with per-item delay, respecting prefers-reduced-motion
- Left-aligned content (no text-center) for editorial feel
Style: editorial minimalism with oversized gradient typography and accent color markers.`,
    source: StatisticEditorialRaw,
    component: StatisticEditorial,
  },
];
