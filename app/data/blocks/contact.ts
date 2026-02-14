import type { BlockShowcaseItem } from "~/types/components";

import ContactGlassForm from "~/components/blocks/components/ContactGlassForm.vue";
import ContactAtmosphericSplit from "~/components/blocks/components/ContactAtmosphericSplit.vue";
import ContactChannelCards from "~/components/blocks/components/ContactChannelCards.vue";
import ContactMinimalElegant from "~/components/blocks/components/ContactMinimalElegant.vue";
import ContactMapSplit from "~/components/blocks/components/ContactMapSplit.vue";
import ContactDotGrid from "~/components/blocks/components/ContactDotGrid.vue";
import ContactGradientCTA from "~/components/blocks/components/ContactGradientCTA.vue";
import ContactBentoGrid from "~/components/blocks/components/ContactBentoGrid.vue";

import contactGlassFormRaw from "~/components/blocks/components/ContactGlassForm.vue?raw";
import contactAtmosphericSplitRaw from "~/components/blocks/components/ContactAtmosphericSplit.vue?raw";
import contactChannelCardsRaw from "~/components/blocks/components/ContactChannelCards.vue?raw";
import contactMinimalElegantRaw from "~/components/blocks/components/ContactMinimalElegant.vue?raw";
import contactMapSplitRaw from "~/components/blocks/components/ContactMapSplit.vue?raw";
import contactDotGridRaw from "~/components/blocks/components/ContactDotGrid.vue?raw";
import contactGradientCTARaw from "~/components/blocks/components/ContactGradientCTA.vue?raw";
import contactBentoGridRaw from "~/components/blocks/components/ContactBentoGrid.vue?raw";

export const CONTACT_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "contact-glass-form",
    title: "Glass Form",
    description:
      "A glassmorphism contact form with a frosted-glass card over a dot-grid background and a primary color glow — centered form with editorial typography for a modern, premium feel.",
    prompt: `Generate a glassmorphism contact form section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- A dot-grid pattern background (CSS radial-gradient repeating pattern at 0.04 opacity, 24px grid)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/10, blur-[100px]) behind the glass card
- A frosted glass card (max-w-xl, rounded-3xl, border-(--ui-border)/50, bg-(--ui-bg)/60, backdrop-blur-xl, p-8 sm:p-12, shadow-2xl) containing:
  - An uppercase label in text-(--ui-primary) tracking-wide
  - A bold title (text-3xl to text-4xl, tracking-tight, text-(--ui-text-highlighted))
  - A muted description paragraph
  - A UAuthForm with name, email, and message fields
  - Submit button with send icon
- CSS entrance animation (translateY + scale fade-in) respecting prefers-reduced-motion
- All decorative elements use aria-hidden="true"
Style: modern glassmorphism with dot-grid texture, color glow, and a frosted card centerpiece containing the form.`,
    source: contactGlassFormRaw,
    component: ContactGlassForm,
  },
  {
    id: "contact-atmospheric-split",
    title: "Atmospheric Split",
    description:
      "A split-layout contact section with gradient atmosphere orbs, a gradient-to-solid headline, staggered entrance animations, contact info with hover-interactive icon tiles, and an elevated form card.",
    prompt: `Generate an atmospheric split contact section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-20 sm:py-28)
- Two decorative blurred gradient orbs (absolute-positioned rounded-full divs with bg-(--ui-primary)/12 and bg-(--ui-secondary)/8, blur-[100px] and blur-[80px]) for atmospheric depth
- Left column with staggered entrance animations:
  - Uppercase primary-colored label
  - Multi-part headline: first span uses CSS gradient text (bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)], bg-clip-text, text-transparent), second span uses solid text-(--ui-text-highlighted)
  - Muted description paragraph
  - Contact info items (email, address, hours, phone) each with a size-10 rounded-xl icon container (bg-(--ui-primary)/10) that transitions to bg-(--ui-primary)/20 on group hover
- Right column: an elevated card (rounded-2xl, border, bg-(--ui-bg-elevated), shadow-xl) containing a UAuthForm with name, email, subject, message fields
- Staggered CSS entrance animations (translateY fade-in) with animation-delay on each element, respecting prefers-reduced-motion
Style: dramatic gradient atmosphere with interactive info tiles and cinematic staggered entrance.`,
    source: contactAtmosphericSplitRaw,
    component: ContactAtmosphericSplit,
  },
  {
    id: "contact-channel-cards",
    title: "Channel Cards",
    description:
      "Contact channel cards with a warm gradient backdrop, decorative ring elements, interactive hover states with glow effects, and animated arrow links — welcoming and scannable.",
    prompt: `Generate interactive contact channel cards using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden
- A warm gradient backdrop (bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5)
- Decorative ring elements (absolute-positioned, rounded-full, border with primary/secondary at 10% opacity) at different corners
- Centered header: UBadge with "Support" label + bold title + muted description
- A 2-column grid of 4 channel cards (Email, Live Chat, Help Center, Schedule a Call), each with:
  - rounded-2xl card with border-(--ui-border)/60, bg-(--ui-bg)/80, backdrop-blur-sm
  - Hover transitions: border-(--ui-primary)/40, shadow-lg with shadow-(--ui-primary)/5
  - A subtle overlay that transitions to bg-(--ui-primary)/[0.02] on hover
  - size-12 rounded-xl icon container with group-hover color transitions
  - An action link row with arrow icon that animates gap on hover (gap-1.5 to gap-2.5)
- Staggered CSS entrance animations with increasing delays, respecting prefers-reduced-motion
Style: warm, inviting channel selection with atmospheric gradient and interactive hover effects.`,
    source: contactChannelCardsRaw,
    component: ContactChannelCards,
  },
  {
    id: "contact-minimal-elegant",
    title: "Minimal Elegant",
    description:
      "An ultra-minimal contact section with editorial typography, gradient decorative lines, a prominent email link with animated underline, and dual CTA buttons — maximum whitespace and visual impact.",
    prompt: `Generate a minimal elegant contact section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with generous padding (py-16 sm:py-24) and centered content (max-w-2xl)
- Thin decorative gradient lines (w-12 h-px bg-gradient-to-r from-transparent via-(--ui-primary) to-transparent) as visual bookends
- A bold title (text-3xl to text-5xl, font-extrabold, tracking-tight, text-(--ui-text-highlighted))
- A muted description paragraph (text-lg to text-xl, leading-relaxed)
- A prominent email link styled as inline text with underline-offset-4, decoration-(--ui-primary)/30 that transitions to /60 on hover
- Two CTA buttons: primary "Send a Message" with mail icon + outline neutral "Book a Call" with calendar icon, both size="xl"
- Gentle CSS entrance animation (translateY fade-in) respecting prefers-reduced-motion
Style: ultra-minimal with editorial precision, maximum whitespace, and a single strong focal point.`,
    source: contactMinimalElegantRaw,
    component: ContactMinimalElegant,
  },
  {
    id: "contact-map-split",
    title: "Map Split",
    description:
      "A split layout with a realistic mock map card featuring window chrome, grid-pattern streets, an animated location pin, and office details — paired with a clean form card on the other side.",
    prompt: `Generate a split contact section with mock map using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A responsive 2-column grid layout (stacked on mobile, side-by-side on lg)
- Left column: a mock map card (rounded-2xl, border, bg-(--ui-bg-elevated), shadow-2xl) with:
  - Window chrome bar (3 colored dots: red, yellow, green + monospace "maps — our-office" text)
  - A CSS grid-pattern background simulating map streets (linear-gradient grid at 40px spacing, 0.06 opacity)
  - Decorative horizontal and vertical "road" lines (h-px and w-px with border color)
  - A center location pin with pulsing glow (animate-pulse on bg-(--ui-primary)/15 blur-xl) and a bordered circular pin container
  - Office info strip at bottom (building, hours, phone) with icon + label + value format
- Right column: a form card (rounded-2xl, border, bg-(--ui-bg)) with heading and UAuthForm
- On lg: cards merge visually (left uses rounded-r-none, right uses rounded-l-none + border-l-0)
- Entrance animations: left slides in from left, right slides in from right with delay
- prefers-reduced-motion respected via @media query
Style: professional product-showcase split with a realistic, theme-responsive mock map card.`,
    source: contactMapSplitRaw,
    component: ContactMapSplit,
  },
  {
    id: "contact-dot-grid",
    title: "Dot Grid Panels",
    description:
      "Floating contact info panels over a dot-grid background with dual glow spots, centered layout with contact cards, and a social media follow row — atmospheric and informational.",
    prompt: `Generate a dot-grid contact section with floating panels using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding
- A dot-grid pattern background (CSS radial-gradient, 24px grid, 0.04 opacity)
- Two blurred glow spots on opposite sides (bg-(--ui-primary)/8 and bg-(--ui-secondary)/8 with blur-[80px])
- Centered header: uppercase primary label + bold title + muted description
- A 3-column grid of contact info panels, each with:
  - rounded-2xl cards with border-(--ui-border)/50, bg-(--ui-bg)/70, backdrop-blur-md
  - Hover transitions: shadow-lg + border-(--ui-primary)/30
  - Centered content: rounded-full icon container (size-12, bg-(--ui-primary)/10) that scales on group hover
  - Contact label, value in primary color, and detail text in muted
- A "Follow us" social row with round bordered icon buttons that transition border and bg on hover
- Staggered CSS entrance animations with increasing delays, respecting prefers-reduced-motion
Style: atmospheric dot-grid texture with frosted floating panels and interactive elements.`,
    source: contactDotGridRaw,
    component: ContactDotGrid,
  },
  {
    id: "contact-gradient-cta",
    title: "Gradient CTA",
    description:
      "A centered gradient banner contact CTA with atmospheric rings, gradient headline text, a compact contact info strip, and dual action buttons — dramatic and conversion-focused.",
    prompt: `Generate a gradient CTA contact section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding
- A full-width gradient backdrop (bg-gradient-to-br from-[var(--ui-primary)]/8 via-transparent to-[var(--ui-secondary)]/8)
- Three decorative ring elements (absolute-positioned, rounded-full, border with primary/secondary at low opacity) at different positions including one centered large ring
- Centered content (max-w-3xl):
  - A UBadge ("We're Hiring", primary, subtle, lg)
  - A two-part headline: solid text + gradient text (bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)], bg-clip-text, text-transparent)
  - A muted description paragraph
  - A compact inline contact info strip with email, location, and response time, separated by vertical dividers (hidden on mobile)
  - Two CTA buttons: primary "Get in Touch" with trailing arrow + outline neutral "Schedule a Call" with calendar icon
- CSS entrance animation (translateY fade-in) respecting prefers-reduced-motion
Style: dramatic gradient banner with atmospheric rings and a conversion-oriented layout.`,
    source: contactGradientCTARaw,
    component: ContactGradientCTA,
  },
  {
    id: "contact-bento-grid",
    title: "Bento Grid",
    description:
      "A bento-style asymmetric grid combining a large form cell, email card, social links, business hours, and an address card with gradient accent — information-dense yet organized.",
    prompt: `Generate a bento grid contact section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with generous padding and max-w-6xl centered container
- Centered header: bold title + muted description
- An asymmetric grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3, gap-4) with themed cells:
  - **Form cell** (sm:col-span-2): rounded-2xl, border, bg-(--ui-bg-elevated), contains a heading with pen icon + UAuthForm with name, email, message
  - **Email cell**: rounded-2xl card with icon container, title, description, and a primary-colored email link with animated arrow
  - **Social cell**: rounded-2xl card with 4 social platform rows (Twitter, GitHub, LinkedIn, YouTube), each with icon in bordered square that transitions on group-hover
  - **Hours cell**: rounded-2xl card with clock icon heading, day/time rows with justify-between, a USeparator, and a timezone note
  - **Address cell**: rounded-2xl card with bg-gradient-to-br from-[var(--ui-primary)]/5, map-pin icon, multi-line address, and a "Get Directions" soft UButton
- Staggered CSS entrance animations with increasing delays on each cell, respecting prefers-reduced-motion
Style: modern bento grid mixing action, information, and social in an asymmetric, scannable layout.`,
    source: contactBentoGridRaw,
    component: ContactBentoGrid,
  },
];
