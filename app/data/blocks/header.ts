import type { BlockShowcaseItem } from "~/types/components";

import HeaderFloating from "~/components/blocks/components/HeaderFloating.vue";
import HeaderGradientBar from "~/components/blocks/components/HeaderGradientBar.vue";
import HeaderSplit from "~/components/blocks/components/HeaderSplit.vue";
import HeaderCommand from "~/components/blocks/components/HeaderCommand.vue";
import HeaderBranded from "~/components/blocks/components/HeaderBranded.vue";
import HeaderStacked from "~/components/blocks/components/HeaderStacked.vue";

import HeaderFloatingRaw from "~/components/blocks/components/HeaderFloating.vue?raw";
import HeaderGradientBarRaw from "~/components/blocks/components/HeaderGradientBar.vue?raw";
import HeaderSplitRaw from "~/components/blocks/components/HeaderSplit.vue?raw";
import HeaderCommandRaw from "~/components/blocks/components/HeaderCommand.vue?raw";
import HeaderBrandedRaw from "~/components/blocks/components/HeaderBranded.vue?raw";
import HeaderStackedRaw from "~/components/blocks/components/HeaderStacked.vue?raw";

export const HEADER_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "header-floating",
    title: "Floating Glassmorphism Header",
    description:
      "A detached pill-shaped navbar with glassmorphism — frosted backdrop blur, translucent background, rounded corners, and a soft primary-color glow underneath. Drop-in entrance animation and a gradient brand icon.",
    prompt: `Generate a floating glassmorphism header using Nuxt UI v4 and Tailwind CSS v4. It should include:
- An outer wrapper with px-4 pt-4 to detach the header from page edges
- A decorative glow div (absolute, centered beneath the bar, rounded-full, bg-(--ui-primary)/10, blur-2xl) for atmospheric depth
- A header bar (max-w-5xl, mx-auto, rounded-2xl, border-(--ui-border)/50, bg-(--ui-bg)/70, backdrop-blur-xl, shadow-lg) containing:
  - A brand section with a gradient icon container (bg-gradient-to-br from primary to secondary, rounded-lg) and bold brand name
  - Navigation links with pill-shaped hover states (rounded-lg, hover:bg-(--ui-bg-elevated)/80) for tactile interaction
  - Action area with a ghost color-mode toggle icon button and a primary CTA button
- A CSS drop-in entrance animation (translateY fade-in) with prefers-reduced-motion respected
- All decorative elements use aria-hidden="true", nav uses aria-label
Style: premium glassmorphism with atmospheric glow, frosted backdrop, and smooth entrance motion.`,
    source: HeaderFloatingRaw,
    component: HeaderFloating,
  },
  {
    id: "header-gradient-bar",
    title: "Gradient Accent Header",
    description:
      "A polished header crowned by a vivid gradient accent strip that spans the full width — primary-to-secondary gradient with animated underline hover effects on nav links and a CTA button with a colored box-shadow.",
    prompt: `Generate a gradient-accented header using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A vivid top accent strip (h-1, bg-gradient-to-r from primary via secondary to primary) for strong visual identity
- A subtle vertical gradient wash on the header background (from-(--ui-primary)/[0.03] to transparent) for depth
- A standard layout with logo + icon on left, centered nav, dual action buttons on right
- Navigation links with animated gradient underlines: each link has an absolutely positioned span (h-0.5, bg-gradient-to-r from primary to secondary) that expands from center on hover (w-0 → w-3/4) via CSS transition
- Staggered fade-in animations on nav links using CSS custom property --stagger for animation-delay
- Primary CTA button with a colored shadow (shadow-sm shadow-(--ui-primary)/20) for visual lift
- prefers-reduced-motion respected for all animations
- All decorative elements use aria-hidden="true", nav uses aria-label
Style: sharp gradient identity stripe with interactive animated underlines and staggered entrance.`,
    source: HeaderGradientBarRaw,
    component: HeaderGradientBar,
  },
  {
    id: "header-split",
    title: "Split Panel Header",
    description:
      "An asymmetric two-panel header — a tinted branded left panel with a diagonal-line texture overlay, version badge, and a clean transparent right panel for navigation and actions.",
    prompt: `Generate an asymmetric split-panel header using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A flexbox row containing two visually distinct panels:
  - Left branded panel (bg-(--ui-primary)/10, border-r, border-(--ui-primary)/15) containing:
    - A subtle diagonal-line CSS pattern overlay (repeating-linear-gradient at -45deg) at very low opacity
    - A primary-colored icon container (rounded-xl, bg-(--ui-primary), shadow-md with primary shadow) with white icon
    - Two-line brand text: bold brand name + smaller subtitle text in primary color
  - Right navigation panel (flex-1, bg-(--ui-bg), border-b) containing:
    - Navigation links with pill-shaped hover states (rounded-md, hover:bg-(--ui-bg-elevated))
    - A version UBadge (color="primary", variant="subtle")
    - A vertical USeparator between the badge and icon buttons
    - GitHub icon button and primary "Open Builder" CTA button
Style: asymmetric two-tone layout with branded panel texture, dual-identity design, and clear visual hierarchy.`,
    source: HeaderSplitRaw,
    component: HeaderSplit,
  },
  {
    id: "header-command",
    title: "Command Palette Header",
    description:
      "A developer-centric header featuring a prominent inline command palette trigger with keyboard shortcut hints (UKbd), monospace brand typography, subtle grid-line texture, and icon-only action buttons.",
    prompt: `Generate a developer-focused command palette header using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A subtle CSS grid-line texture background (linear-gradient repeating in x and y, 20px grid, very low opacity)
- A three-zone horizontal layout:
  - Left: monospace-styled brand name with a terminal icon and a primary-colored dot separator (e.g. "theme.build")
  - Center: a prominent search/command bar (max-w-md, flex-1) styled as a clickable div with:
    - A search icon that transitions to primary color on group-hover
    - Placeholder text ("Search docs, components, APIs...")
    - UKbd components showing ⌘ K keyboard shortcut hint
    - Hover state: border transitions to primary/30, adds shadow-sm
  - Right: text nav links + vertical USeparator + icon-only buttons for GitHub and color-mode toggle
- Grid texture is aria-hidden, nav has proper aria-label
- The command bar has role="button", tabindex="0", and descriptive aria-label
Style: developer-centric with monospace accents, prominent command palette trigger, and utilitarian grid texture.`,
    source: HeaderCommandRaw,
    component: HeaderCommand,
  },
  {
    id: "header-branded",
    title: "Full Branded Header",
    description:
      "A bold header with a full primary-color background, inverted white typography, a geometric mesh pattern overlay, a frosted brand icon, a pulsing live-status indicator, and an inverted white CTA button.",
    prompt: `Generate a fully branded header using Nuxt UI v4 and Tailwind CSS v4. It should include:
- Full-width header with bg-(--ui-primary) as the dominant background color
- A geometric mesh CSS pattern overlay (repeating triangular/diamond linear-gradients at low white opacity) for texture
- A soft white glow orb (absolute, top-right, rounded-full, bg-white/10, blur-3xl) for atmospheric depth
- Brand section with:
  - A frosted icon container (bg-white/20, backdrop-blur-sm, rounded-lg) with white icon
  - Bold white brand name
  - A "Live" status indicator (inline-flex, bg-white/10 pill) with a pulsing green dot and white text
- Navigation links styled for inverted context: text-white/70 with hover:text-white hover:bg-white/10
- Action area: a "Sign In" link variant button (text-white/70) and an inverted solid CTA button (bg-white, text primary color, hover:bg-white/90)
- Pulsing animation on the status dot with prefers-reduced-motion respected
- Decorative elements use aria-hidden="true", nav uses aria-label
Style: bold brand-forward design with full primary background, inverted color scheme, geometric texture, and live status animation.`,
    source: HeaderBrandedRaw,
    component: HeaderBranded,
  },
  {
    id: "header-stacked",
    title: "Stacked Editorial Header",
    description:
      "A double-row editorial header — a compact utility bar on top with contact info and secondary links, then a prominent main navigation bar below with an oversized gradient brand icon, editorial typography, pill-shaped nav hover states, and a trailing-arrow CTA.",
    prompt: `Generate a stacked editorial header using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A top utility bar (bg-(--ui-bg-elevated), border-b, h-9) containing:
  - Left side: contact info with mail icon + email text, vertical USeparator, globe icon + language label (text-xs, text-(--ui-text-dimmed))
  - Right side: "Help Center" and "Sign In" text links with separators
- A decorative gradient hairline between the two bars (h-px, bg-gradient-to-r via primary/20)
- A main navigation bar (bg-(--ui-bg), border-b, h-16) containing:
  - Brand section with a larger gradient icon container (size-10, rounded-xl, bg-gradient-to-br from primary to secondary, shadow-md with primary shadow) and two-line editorial text: bold brand name (text-lg, font-extrabold) + uppercase tracking-widest subtitle
  - Navigation links with pill-shaped hover states (rounded-full, hover:bg-(--ui-bg-elevated)) for soft interaction
  - Action area: ghost search icon button + primary CTA with trailing arrow icon
- All decorative elements use aria-hidden="true", nav has aria-label
Style: editorial two-tier structure with utility bar, gradient brand identity, and refined pill-shaped navigation.`,
    source: HeaderStackedRaw,
    component: HeaderStacked,
  },
];
