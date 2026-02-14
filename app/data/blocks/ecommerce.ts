import type { BlockShowcaseItem } from "~/types/components";

import EcommerceProductGrid from "~/components/blocks/components/EcommerceProductGrid.vue";
import EcommerceProductCard from "~/components/blocks/components/EcommerceProductCard.vue";
import EcommerceFeatured from "~/components/blocks/components/EcommerceFeatured.vue";
import EcommerceCategory from "~/components/blocks/components/EcommerceCategory.vue";
import EcommerceCart from "~/components/blocks/components/EcommerceCart.vue";
import EcommerceStorefront from "~/components/blocks/components/EcommerceStorefront.vue";
import ecommerceProductGridRaw from "~/components/blocks/components/EcommerceProductGrid.vue?raw";
import ecommerceProductCardRaw from "~/components/blocks/components/EcommerceProductCard.vue?raw";
import ecommerceFeaturedRaw from "~/components/blocks/components/EcommerceFeatured.vue?raw";
import ecommerceCategoryRaw from "~/components/blocks/components/EcommerceCategory.vue?raw";
import ecommerceCartRaw from "~/components/blocks/components/EcommerceCart.vue?raw";
import ecommerceStorefrontRaw from "~/components/blocks/components/EcommerceStorefront.vue?raw";

export const ECOMMERCE_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "ecommerce-product-grid",
    title: "Glow Product Grid",
    description:
      "A product catalog grid with atmospheric gradient orbs, glow-halo hover effects on each card, gradient price text, and staggered entrance animations — elevated and engaging browsing experience.",
    prompt: `Generate a glow-effect product grid section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Two atmospheric gradient orbs (absolute-positioned, rounded-full, bg-(--ui-primary)/10 blur-[120px] and bg-(--ui-secondary)/8 blur-[100px]) for depth
- A centered header: uppercase primary-colored label + bold highlighted title + muted description below
- A 3-column responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6) of product cards, each with:
  - A glow halo (absolute -inset-1, blurred bg-(--ui-primary)/8 or bg-(--ui-secondary)/8) that fades in on group-hover
  - A rounded-2xl card with border, bg-(--ui-bg-elevated)/80, backdrop-blur-sm, hover:shadow-xl, hover:border-(--ui-primary)/30 transitions
  - An image area with overflow-hidden, hover:scale-105 transition, and a gradient-to-transparent overlay that appears on hover
  - UBadge for product labels (New, Popular, Sale) positioned absolute top-left inside image area, using variant="subtle"
  - Product name that transitions to primary color on hover
  - Price in gradient text (bg-gradient-to-r from primary to secondary, bg-clip-text, text-transparent), text-lg font-bold
- Six sample products with alternating primary/secondary accents
- Staggered CSS entrance animations (translateY + fade-in) with per-card animation-delay (80ms increments), respecting prefers-reduced-motion
Style: atmospheric product grid with glow-halo hover depth, gradient pricing, and cinematic entrance.`,
    source: ecommerceProductGridRaw,
    component: EcommerceProductGrid,
  },
  {
    id: "ecommerce-product-card",
    title: "Glass Product Detail",
    description:
      "A glassmorphism product detail section with dot-grid texture, a frosted card containing split image/details layout, floating rating badge, tinted feature checkmarks, and staggered content entrance.",
    prompt: `Generate a glassmorphism product detail section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A dot-grid pattern background (CSS radial-gradient repeating at 0.035 opacity, 24px grid)
- A centered glow spot (absolute, rounded-full, bg-(--ui-primary)/8, blur-[120px]) behind the card
- A frosted glass card (max-w-4xl, rounded-3xl, border-(--ui-border)/50, bg-(--ui-bg)/60, backdrop-blur-xl, shadow-2xl) containing a 2-column grid:
  - Left: product image with aspect-square, plus a floating rating badge (absolute bottom-left, rounded-xl, bg-(--ui-bg)/80, backdrop-blur-sm, shadow-lg) showing star icon + rating
  - Right: staggered content with animation-delay on each group:
    - UBadge label + bold product name
    - Price in gradient text (text-3xl font-extrabold, bg-gradient-to-r from primary to secondary)
    - Description paragraph with leading-relaxed
    - Feature list with tinted check circles (size-5 rounded-full bg-(--ui-primary)/12 with check icon inside)
    - Two UButtons: primary "Add to Cart" + outline "Preview"
- Entrance: glass card scales in (0.96 → 1 + translateY), content staggers, float badge fades up with delay
- prefers-reduced-motion respected
Style: glassmorphism product showcase with dot-grid texture, frosted card, and staggered editorial content.`,
    source: ecommerceProductCardRaw,
    component: EcommerceProductCard,
  },
  {
    id: "ecommerce-featured",
    title: "Spotlight Featured",
    description:
      "A dramatic featured product section with atmospheric gradient orbs, a gradient-to-solid split headline, floating discount and social-proof badges, and cinematic split layout with staggered entrance.",
    prompt: `Generate a spotlight featured product section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- Two atmospheric gradient orbs (absolute-positioned, rounded-full, bg-(--ui-primary)/12 blur-[100px] and bg-(--ui-secondary)/8 blur-[80px]) for depth
- A 2-column split layout (grid lg:grid-cols-2 gap-10 lg:gap-16 items-center):
  - Left (text): staggered content with animation-delay:
    - UBadge "Deal of the Day" (color="primary", variant="subtle", size="lg")
    - Multi-part headline: first word in gradient text (bg-gradient-to-r primary to secondary, bg-clip-text, text-transparent) + rest in solid --ui-text-highlighted, text-3xl to text-5xl font-extrabold
    - Muted description paragraph
    - Price block: large gradient price (text-4xl sm:text-5xl font-black) + strikethrough original + UBadge discount percentage
    - Two CTA buttons (primary xl with cart icon + outline neutral xl)
  - Right: product image in rounded-2xl bordered card with shadow-2xl, animating slide-in from right. Plus two floating badges:
    - Discount badge (absolute -top-3 -right-3, rounded-2xl, bg/backdrop-blur, showing percentage gradient text)
    - Social proof badge (absolute -bottom-3 -left-3, rounded-xl, bg/backdrop-blur, with flame icon + "2,847 sold this week")
- Floating badges fade-up with staggered delays
- prefers-reduced-motion respected
Style: dramatic spotlight with atmospheric orbs, gradient headline, floating proof elements, and cinematic entrance choreography.`,
    source: ecommerceFeaturedRaw,
    component: EcommerceFeatured,
  },
  {
    id: "ecommerce-category",
    title: "Atmospheric Categories",
    description:
      "A category browsing grid on a warm gradient backdrop with decorative ring elements, glow-halo hover effects, tinted icon circles, gradient overlays on images, and staggered entrance animations.",
    prompt: `Generate an atmospheric category browsing section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A warm gradient backdrop (bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5)
- Two decorative rings (absolute-positioned, rounded-full, border with primary/secondary at 10% opacity) at different corners
- A centered header: uppercase primary label + bold title + muted description
- A 4-column responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6), each category card with:
  - A glow halo (absolute -inset-1, blurred bg at 8% opacity) fading in on group-hover
  - A rounded-2xl card with border, bg-(--ui-bg-elevated)/80, backdrop-blur-sm, hover:shadow-xl, hover:border-(--ui-primary)/30 transitions
  - Image area (h-40) with gradient overlay from bg/70 to transparent, plus a UBadge item count positioned absolute bottom-right
  - Content area with a tinted icon circle (size-10, rounded-xl, bg-(--ui-primary)/12 or bg-(--ui-secondary)/12) that scales on hover + category name that transitions to primary color
- Four categories with alternating primary/secondary accents
- Staggered CSS entrance (translateY + fade) with per-card animation-delay (100ms increments), respecting prefers-reduced-motion
Style: warm atmospheric category grid with gradient backdrop, decorative rings, glow hovers, and interactive icon circles.`,
    source: ecommerceCategoryRaw,
    component: EcommerceCategory,
  },
  {
    id: "ecommerce-cart",
    title: "Elegant Glass Cart",
    description:
      "A frosted glass shopping cart with centered background glow, tinted header icon, decorative dot separator, gradient total price, and items that slide in from the left.",
    prompt: `Generate an elegant glass cart section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A centered background glow (absolute, rounded-full, bg-(--ui-primary)/6, blur-[120px]) behind the cart
- A header row: tinted icon circle (bg-(--ui-primary)/12 with shopping-cart icon) + bold title + item count UBadge on far right
- A frosted glass card (max-w-2xl, rounded-3xl, border-(--ui-border)/50, bg-(--ui-bg)/60, backdrop-blur-xl, shadow-2xl, p-6 sm:p-8) containing:
  - Item list: each item slides in from left (translateX) with staggered delay, showing rounded-xl bordered thumbnail, name, quantity, and price
  - A decorative dot separator (horizontal line with 3 small dots in primary/secondary colors between items and summary)
  - Summary rows: subtotal, tax, and total. Total row has border-top and uses gradient text (bg-gradient-to-r primary to secondary, bg-clip-text, text-transparent), text-lg font-bold
  - Full-width primary UButton "Checkout" with credit-card icon
- Cart card enters with fadeUp, items stagger with translateX, respecting prefers-reduced-motion
Style: premium frosted-glass cart with atmospheric glow, decorative accents, gradient pricing, and choreographed item entrances.`,
    source: ecommerceCartRaw,
    component: EcommerceCart,
  },
  {
    id: "ecommerce-storefront",
    title: "Storefront Showcase",
    description:
      "A split-layout storefront showcase with dot-grid texture, gradient headline, mini stats strip, a realistic mock storefront card with window chrome and product grid, plus floating order and revenue badges.",
    prompt: `Generate a storefront showcase section using Nuxt UI v4 and Tailwind CSS v4. It should include:
- A section with relative + isolate + overflow-hidden and generous padding (py-16 sm:py-24)
- A dot-grid pattern background (CSS radial-gradient repeating at 0.03 opacity, 20px grid)
- A 2-column split layout (grid lg:grid-cols-2 gap-10 lg:gap-16 items-center):
  - Left (text): staggered content with animation-delay:
    - Uppercase primary label
    - Multi-part headline: solid text + gradient text (bg-gradient-to-r primary to secondary, bg-clip-text), text-3xl to text-5xl font-extrabold
    - Muted description paragraph
    - A 3-column mini stats strip: each stat value in gradient text (text-xl font-bold) + uppercase muted label below
    - Two CTA buttons (primary xl with arrow icon trailing + outline neutral xl)
  - Right: a mock storefront card (rounded-2xl, border, bg-elevated, shadow-2xl) with:
    - Window chrome bar (3 colored dots: red/yellow/green + monospace URL)
    - Mock search bar (rounded-lg border with search icon + skeleton bars)
    - Mini 3-column product grid: cards with tinted color blocks (primary/secondary/primary at varying opacities) + skeleton text bars
    - A color swatch strip showing 5 shades of primary (600 through 200)
  - Two floating badges (absolute-positioned, rounded-xl, bg/backdrop-blur, shadow-lg):
    - Order notification (-bottom-3 -left-3) with package-check icon + "New order received!"
    - Revenue badge (-top-3 -right-3) with "+24%" gradient text
- Text staggers in, card slides from right, floating badges fade up with delay
- prefers-reduced-motion respected
Style: product-dashboard storefront showcase with realistic mock UI, floating live indicators, and gradient typography.`,
    source: ecommerceStorefrontRaw,
    component: EcommerceStorefront,
  },
];
