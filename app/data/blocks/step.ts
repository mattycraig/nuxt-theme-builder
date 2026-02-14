import type { BlockShowcaseItem } from "~/types/components";

import StepGradientPath from "~/components/blocks/components/StepGradientPath.vue";
import StepVerticalTimeline from "~/components/blocks/components/StepVerticalTimeline.vue";
import StepMockUI from "~/components/blocks/components/StepMockUI.vue";
import StepGlassCards from "~/components/blocks/components/StepGlassCards.vue";
import StepAccordionFlow from "~/components/blocks/components/StepAccordionFlow.vue";
import StepZigzag from "~/components/blocks/components/StepZigzag.vue";

import StepGradientPathRaw from "~/components/blocks/components/StepGradientPath.vue?raw";
import StepVerticalTimelineRaw from "~/components/blocks/components/StepVerticalTimeline.vue?raw";
import StepMockUIRaw from "~/components/blocks/components/StepMockUI.vue?raw";
import StepGlassCardsRaw from "~/components/blocks/components/StepGlassCards.vue?raw";
import StepAccordionFlowRaw from "~/components/blocks/components/StepAccordionFlow.vue?raw";
import StepZigzagRaw from "~/components/blocks/components/StepZigzag.vue?raw";

export const STEP_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "step-gradient-path",
    title: "Gradient Path",
    description:
      "Atmospheric gradient orbs behind a horizontal step path with gradient-bordered numbered orbs, staggered entrance animations, and responsive vertical fallback.",
    prompt: `Generate a gradient path step section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- Two decorative blurred gradient orbs (absolute-positioned, bg-(--ui-primary)/10 and bg-(--ui-secondary)/8, blur-[100px] and blur-[80px]) for atmospheric depth
- A header with uppercase primary-colored label, multi-part headline (gradient text span via bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] + bg-clip-text text-transparent), and muted description
- A 4-column step grid (grid-cols-1 lg:grid-cols-4) with:
  - A horizontal gradient connector line on desktop (absolute positioned, h-0.5, gradient from primary/30 via secondary/30)
  - A vertical gradient connector line on mobile (absolute positioned, w-0.5)
  - Each step has a large gradient-bordered circular orb (bg-gradient-to-br from primary to secondary, p-[2px], inner bg matches page bg) containing an icon and step number
  - Below the orb: step title (font-bold) and description (text-sm, muted)
- Staggered CSS entrance animations (translateY fade-in) with animation-delay on each step, respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: dramatic gradient atmosphere with flowing connector and cinematic orb-based step indicators.`,
    source: StepGradientPathRaw,
    component: StepGradientPath,
  },
  {
    id: "step-vertical-timeline",
    title: "Vertical Timeline",
    description:
      "A product-launch-inspired vertical timeline with grid-texture backdrop, gradient connecting line, elevated content cards with status badges, and a pulsing active-step indicator.",
    prompt: `Generate a vertical timeline step section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- A CSS grid-line background texture (linear-gradient pattern at 0.03 opacity, 60px grid)
- A top glow spot (absolute, rounded-full, bg-(--ui-primary)/8, blur-[120px])
- A pulsing UBadge header with glow ring behind it (position relative, blurred pseudo-element)
- A vertical gradient connecting line (w-[3px], bg-gradient-to-b from primary via secondary/40 to border)
- An ordered list of steps, each containing:
  - A squared node (size-14 sm:size-16, rounded-2xl) with icon, the first node highlighted with primary border + shadow + an animated pulse ring
  - An elevated content card (rounded-xl, border, bg-elevated, shadow-sm, hover:shadow-md) with:
    - Step number in monospace + bold title + UBadge status indicator (success/warning/neutral)
    - Description text
- Staggered CSS entrance animations (translateX slide-in) with animation-delay, respecting prefers-reduced-motion
Style: professional product-launch aesthetic with grid texture, gradient timeline, and status-aware cards.`,
    source: StepVerticalTimelineRaw,
    component: StepVerticalTimeline,
  },
  {
    id: "step-mock-ui",
    title: "Mock UI Cards",
    description:
      "Each step rendered as a mini app window with traffic-light chrome, skeleton content rows, floating gradient number badge, and a hover-lift effect — inspired by product showcase heroes.",
    prompt: `Generate mock-UI step cards using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with generous padding and max-w-7xl container
- A header with uppercase primary label, bold title, and muted description
- A 3-column responsive grid (grid-cols-1 md:grid-cols-3, gap-6 lg:gap-8)
- Each step is an article with:
  - A floating gradient number badge (absolute -top-3 -right-2, size-8, rounded-full, bg-gradient-to-br from primary to secondary, white text)
  - A mock app window card (rounded-2xl, border, bg-elevated, shadow-lg, hover:shadow-xl hover:-translate-y-1 transition):
    - Window chrome bar with 3 colored dots (red/yellow/green at 70% opacity) + monospace filename
    - Mock content rows: colored indicator squares inside rounded-lg containers + skeleton progress bars (varying widths)
    - A footer section with icon in primary/10 bg, bold step title, and muted description
- Staggered CSS entrance animations (translateY + scale fade-in) with animation-delay, respecting prefers-reduced-motion
Style: product showcase mock-UI aesthetic with interactive hover states and app-window visual language.`,
    source: StepMockUIRaw,
    component: StepMockUI,
  },
  {
    id: "step-glass-cards",
    title: "Glass Cards",
    description:
      "Glassmorphism step cards on a dot-grid background with a centered glow, frosted header panel, numbered orbs with glow rings, and a connecting dotted line.",
    prompt: `Generate glassmorphism step cards using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- A dot-grid pattern background (CSS radial-gradient, 24px grid, 0.04 opacity)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/8, blur-[100px])
- A frosted glass header panel (max-w-2xl, rounded-3xl, border/50, bg/60, backdrop-blur-xl, shadow-2xl) with:
  - Uppercase primary label, bold title, and muted description
- A 3-column grid of step cards below, each with:
  - A connecting horizontal dotted line on desktop (border-t-2 border-dashed, primary/20)
  - A numbered orb (size-14, rounded-full, border/50, bg/70, backdrop-blur-lg, shadow-lg) with glow ring behind (-inset-2, bg-(--ui-primary)/10, blur-md)
  - A frosted glass card (rounded-2xl, border/40, bg/50, backdrop-blur-lg, shadow-xl, hover:shadow-2xl hover:border-primary/30):
    - Icon in primary/10 background, bold title, muted description
- Staggered CSS entrance animations (translateY + scale), respecting prefers-reduced-motion
Style: modern glassmorphism with dot-grid texture, frosted panels, and atmospheric glow effects.`,
    source: StepGlassCardsRaw,
    component: StepGlassCards,
  },
  {
    id: "step-accordion-flow",
    title: "Accordion Flow",
    description:
      "Interactive expanding accordion steps with a warm gradient backdrop, decorative ring elements, active-state highlighting, and detail badges revealed on expand.",
    prompt: `Generate an interactive accordion step flow using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- A warm gradient backdrop (bg-gradient-to-b from primary/4 via transparent to secondary/4)
- Decorative ring elements (absolute-positioned rounded-full borders at primary/8 and secondary/8)
- A header with uppercase primary label, bold title, and muted description
- An accordion list (space-y-3) where each step is a rounded-xl bordered container with:
  - A clickable trigger row: numbered square (size-10, rounded-lg, primary bg when active vs elevated bg when inactive), icon, bold title, and a detail chip (visible when collapsed)
  - A chevron icon that rotates 180° when expanded
  - An expandable content panel using CSS grid-rows transition (grid-rows-[1fr] open vs grid-rows-[0fr] closed):
    - Description text and a UBadge with the detail text
  - Active step gets primary border tint, elevated bg, and shadow-lg with primary/5 shadow
- Vue ref to track activeStep index, toggling on click
- Staggered CSS entrance animations (translateY fade-in), respecting prefers-reduced-motion
- Accessible: button has aria-expanded and aria-controls, content has matching id
Style: warm gradient atmosphere with interactive reveal and polished active-state transitions.`,
    source: StepAccordionFlowRaw,
    component: StepAccordionFlow,
  },
  {
    id: "step-zigzag",
    title: "Zigzag Timeline",
    description:
      "Steps alternate left and right on a central gradient line with squared icon nodes, monospace step numbers, and a responsive mobile fallback — editorial layout with spatial variety.",
    prompt: `Generate a zigzag alternating step timeline using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- A subtle gradient orb at top center (bg-(--ui-primary)/6, blur-[100px])
- A header with uppercase primary label, bold title, and muted description
- A central vertical connecting line on desktop (absolute left-1/2, w-[3px], gradient from primary/25 via secondary/25)
- A mobile vertical line (absolute left-7, w-0.5)
- Steps alternating sides using a 3-column CSS grid (grid-cols-[1fr_auto_1fr]):
  - Even steps: content on left (text-right) with title + monospace number, center icon node, empty right
  - Odd steps: empty left, center icon node, content on right (text-left) with number + title
  - Center nodes: size-14 rounded-2xl, border-2 primary/30, bg-elevated, shadow-lg, with primary-colored icon
- A fully left-aligned mobile layout (md:hidden) with icon nodes + content
- Staggered CSS entrance animations (translateY fade-in), respecting prefers-reduced-motion
Style: editorial zigzag with strong spatial rhythm, central axis, and alternating content flow.`,
    source: StepZigzagRaw,
    component: StepZigzag,
  },
];
