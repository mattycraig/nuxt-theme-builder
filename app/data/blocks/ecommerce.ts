import type { BlockShowcaseItem } from "~/types/components";

import EcommerceProductGrid from "~/components/blocks/components/EcommerceProductGrid.vue";
import EcommerceProductCard from "~/components/blocks/components/EcommerceProductCard.vue";
import EcommerceFeatured from "~/components/blocks/components/EcommerceFeatured.vue";
import EcommerceCategory from "~/components/blocks/components/EcommerceCategory.vue";
import EcommerceCart from "~/components/blocks/components/EcommerceCart.vue";
import ecommerceProductGridRaw from "~/components/blocks/components/EcommerceProductGrid.vue?raw";
import ecommerceProductCardRaw from "~/components/blocks/components/EcommerceProductCard.vue?raw";
import ecommerceFeaturedRaw from "~/components/blocks/components/EcommerceFeatured.vue?raw";
import ecommerceCategoryRaw from "~/components/blocks/components/EcommerceCategory.vue?raw";
import ecommerceCartRaw from "~/components/blocks/components/EcommerceCart.vue?raw";

export const ECOMMERCE_BLOCKS: BlockShowcaseItem[] = [
  {
    id: "ecommerce-product-grid",
    title: "Ecommerce 1",
    description:
      "A product listing grid with images, names, prices, and optional badges — the standard approach for browsing a catalog of items.",
    prompt: `Generate a product grid section. It should include:
- Centered heading and description
- 3-column responsive grid (2 cols on mobile)
- Each product: image with hover zoom, UBadge for labels (New, Popular, Sale), name, and price
- Six sample products
Style: clean e-commerce product grid with image hover effects.`,
    source: ecommerceProductGridRaw,
    component: EcommerceProductGrid,
  },
  {
    id: "ecommerce-product-card",
    title: "Ecommerce 2",
    description:
      "A single product detail card with large image, feature list, price, and dual action buttons — ideal for a featured product or product detail section.",
    prompt: `Generate a product detail section. It should include:
- Two-column responsive layout: image on left, details on right
- UBadge for product label
- Product name, bold price, description paragraph
- Feature list with check icons
- Two UButtons: primary "Add to Cart" and outline "Preview"
Style: product detail layout with feature highlights and clear CTA.`,
    source: ecommerceProductCardRaw,
    component: EcommerceProductCard,
  },
  {
    id: "ecommerce-featured",
    title: "Ecommerce 3",
    description:
      "A featured product hero section with a large image, discount badge, original/sale price, and a prominent buy button.",
    prompt: `Generate a featured product section. It should include:
- Split layout: text left, large image right
- UBadge for "Featured" label
- Product title, extended description, sale price with strikethrough original
- Discount percentage badge
- Large UButton for purchase
Style: hero-style featured product showcase with pricing emphasis.`,
    source: ecommerceFeaturedRaw,
    component: EcommerceFeatured,
  },
  {
    id: "ecommerce-category",
    title: "Ecommerce 4",
    description:
      "A category browsing grid using UPageGrid and UPageCard — each category shows an image, icon, name, and item count badge.",
    prompt: `Generate a category browsing section using Nuxt UI v4 UPageGrid and UPageCard. It should include:
- Centered heading
- UPageGrid with UPageCard items
- Each card: header image slot, icon + category name, item count UBadge
- Four sample categories (Dashboard Themes, Landing Pages, E-commerce, Blog Templates)
Style: visual category grid for e-commerce navigation.`,
    source: ecommerceCategoryRaw,
    component: EcommerceCategory,
  },
  {
    id: "ecommerce-cart",
    title: "Ecommerce 5",
    description:
      "A mini shopping cart / order summary in a UPageCard with item list, quantity, subtotal, tax calculation, total, and checkout button.",
    prompt: `Generate a shopping cart section using Nuxt UI v4 UPageCard. It should include:
- UPageCard wrapping the cart content
- Item list with images, names, quantities, and line totals
- USeparator dividing items from summary
- Subtotal, tax, and total rows
- UButton "Checkout" with credit-card icon, full width
Style: clean order summary card with clear pricing breakdown.`,
    source: ecommerceCartRaw,
    component: EcommerceCart,
  },
];
