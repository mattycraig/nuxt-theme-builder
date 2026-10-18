<script setup lang="ts">
import * as z from "zod";
import type {
  AccordionItem,
  BreadcrumbItem,
  FormSubmitEvent,
  NavigationMenuItem,
  RadioGroupItem,
} from "@nuxt/ui";

const toast = useToast();

// ---------- Helpers ----------
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const formatPrice = (value: number) => currency.format(value);

type Swatch = "primary" | "secondary" | "neutral" | "success";

// Tile tints for product imagery, keyed by semantic color
const tileTone: Record<Swatch, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  neutral: "bg-(--ui-bg-accented) text-(--ui-text-highlighted)",
  success: "bg-success/10 text-success",
};

// ---------- Store chrome ----------
const navItems: NavigationMenuItem[] = [
  { label: "New arrivals" },
  { label: "Packs", active: true },
  { label: "Apparel" },
  { label: "Gear" },
  { label: "Sale" },
];

// ---------- Product ----------
const product = {
  brand: "Northwind Supply",
  name: "Trailhead 28L Daypack",
  price: 148,
  compareAt: 185,
  rating: 4.6,
  reviews: 312,
  description:
    "A weather-ready daypack with a padded 16-inch laptop sleeve, quick-access hip pockets, and a ventilated back panel that keeps you cool from trailhead to train platform.",
};

const view = ref<"product" | "checkout">("product");

const breadcrumb = computed<BreadcrumbItem[]>(() =>
  view.value === "product"
    ? [
        { label: "Shop", icon: "i-lucide-store" },
        { label: "Packs" },
        { label: "Daypacks" },
        { label: product.name },
      ]
    : [
        { label: "Shop", icon: "i-lucide-store" },
        { label: "Cart" },
        { label: "Checkout" },
      ],
);

const gallery = [
  { label: "Front", icon: "i-lucide-backpack" },
  { label: "Laptop sleeve", icon: "i-lucide-laptop" },
  { label: "Main compartment", icon: "i-lucide-package-open" },
  { label: "Weatherproof shell", icon: "i-lucide-droplets" },
  { label: "Dimensions", icon: "i-lucide-ruler" },
];

const colors: { value: Swatch; label: string; swatch: string }[] = [
  { value: "primary", label: "Summit", swatch: "bg-primary" },
  { value: "secondary", label: "Glacier", swatch: "bg-secondary" },
  { value: "neutral", label: "Graphite", swatch: "bg-(--ui-color-neutral-700)" },
  { value: "success", label: "Moss", swatch: "bg-success" },
];

const sizes = [
  { value: "20L", hint: "Commuter" },
  { value: "28L", hint: "Day hike" },
  { value: "34L", hint: "Overnight" },
  { value: "40L", hint: "Sold out", soldOut: true },
];

const highlights = [
  { icon: "i-lucide-droplets", label: "Water-resistant" },
  { icon: "i-lucide-laptop", label: "Fits 16\" laptop" },
  { icon: "i-lucide-shield-check", label: "Lifetime warranty" },
];

const selectedColor = ref<Swatch>("primary");
const selectedSize = ref("28L");
const quantity = ref(1);
const wishlisted = ref(false);

const activeSlide = ref(0);
const carousel = useTemplateRef("carousel");

const colorLabel = computed(
  () => colors.find((c) => c.value === selectedColor.value)?.label ?? "",
);
// Filled star for the rating (lucide "star" path)
const starPath =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z";
const savings = Math.round((1 - product.price / product.compareAt) * 100);

function selectSlide(index: number) {
  activeSlide.value = index;
  carousel.value?.emblaApi?.scrollTo(index);
}

function toggleWishlist() {
  wishlisted.value = !wishlisted.value;
  toast.add({
    title: wishlisted.value ? "Saved to wishlist" : "Removed from wishlist",
    icon: "i-lucide-heart",
  });
}

const infoItems: AccordionItem[] = [
  {
    label: "Free shipping over $75",
    icon: "i-lucide-truck",
    content:
      "Orders ship within 1 business day. Standard delivery takes 3–5 business days in the contiguous US; express and overnight options are available at checkout.",
  },
  {
    label: "60-day returns",
    icon: "i-lucide-rotate-ccw",
    content:
      "Not the right fit? Return unused gear within 60 days for a full refund. Return labels are free and printable from your order page.",
  },
  {
    label: "Materials & care",
    icon: "i-lucide-leaf",
    content:
      "Shell: 100% recycled 420D nylon with a PFC-free water-repellent finish. Wipe clean with a damp cloth and air dry. Do not machine wash.",
  },
];

// ---------- Related products ----------
const related: {
  id: string;
  name: string;
  price: number;
  rating: number;
  icon: string;
  tone: Swatch;
  badge?: string;
}[] = [
  {
    id: "hip-pack",
    name: "Ridgeline Hip Pack",
    price: 58,
    rating: 4.8,
    icon: "i-lucide-briefcase",
    tone: "secondary",
    badge: "New",
  },
  {
    id: "rain-shell",
    name: "Packable Rain Shell",
    price: 129,
    rating: 4.5,
    icon: "i-lucide-shirt",
    tone: "neutral",
  },
  {
    id: "bottle",
    name: "Insulated Trail Bottle",
    price: 34,
    rating: 4.7,
    icon: "i-lucide-milk",
    tone: "success",
  },
  {
    id: "socks",
    name: "Merino Hiking Socks",
    price: 24,
    rating: 4.9,
    icon: "i-lucide-footprints",
    tone: "primary",
    badge: "Bestseller",
  },
];

// ---------- Cart ----------
interface CartItem {
  key: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  icon: string;
  tone: Swatch;
}

const cartOpen = ref(false);
const cart = ref<CartItem[]>([
  {
    key: "bottle-moss",
    name: "Insulated Trail Bottle",
    variant: "Moss · 750 ml",
    price: 34,
    quantity: 1,
    icon: "i-lucide-milk",
    tone: "success",
  },
]);

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0),
);
const subtotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

function addItem(item: CartItem) {
  const existing = cart.value.find((i) => i.key === item.key);
  if (existing) existing.quantity += item.quantity;
  else cart.value.push(item);
  cartOpen.value = true;
}

function addToCart() {
  addItem({
    key: `trailhead-${selectedColor.value}-${selectedSize.value}`,
    name: product.name,
    variant: `${colorLabel.value} · ${selectedSize.value}`,
    price: product.price,
    quantity: quantity.value,
    icon: "i-lucide-backpack",
    tone: selectedColor.value,
  });
}

function addRelated(item: (typeof related)[number]) {
  addItem({
    key: item.id,
    name: item.name,
    variant: "One size",
    price: item.price,
    quantity: 1,
    icon: item.icon,
    tone: item.tone,
  });
}

function removeItem(key: string) {
  cart.value = cart.value.filter((i) => i.key !== key);
}

function goToCheckout() {
  cartOpen.value = false;
  view.value = "checkout";
  window.scrollTo({ top: 0 });
}

// ---------- Checkout ----------
const shippingMethods = [
  {
    value: "standard",
    label: "Standard",
    description: "3–5 business days",
    price: 0,
  },
  {
    value: "express",
    label: "Express",
    description: "1–2 business days",
    price: 12,
  },
  {
    value: "overnight",
    label: "Overnight",
    description: "Next business day",
    price: 28,
  },
] satisfies RadioGroupItem[];

const checkoutSchema = z.object({
  email: z.string("Email is required").email("Enter a valid email"),
  firstName: z.string("First name is required").min(1, "Required"),
  lastName: z.string("Last name is required").min(1, "Required"),
  address: z.string("Address is required").min(4, "Enter a street address"),
  apartment: z.string().optional(),
  city: z.string("City is required").min(2, "Enter a city"),
  state: z.string("Select a state"),
  zip: z.string("ZIP is required").regex(/^\d{5}$/, "Enter a 5-digit ZIP"),
  shipping: z.enum(["standard", "express", "overnight"]),
  cardNumber: z
    .string("Card number is required")
    .regex(/^(\d{4} ?){3}\d{4}$/, "Enter a 16-digit card number"),
  expiry: z
    .string("Expiry is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvc: z.string("CVC is required").regex(/^\d{3,4}$/, "3–4 digits"),
  cardName: z.string("Name on card is required").min(2, "Enter a name"),
});
type CheckoutSchema = z.output<typeof checkoutSchema>;

const states = ["California", "Colorado", "New York", "Oregon", "Washington"];

const form = reactive<Partial<CheckoutSchema>>({
  shipping: "standard",
});

const discountCode = ref("");
const discountApplied = ref(false);
const orderPlaced = ref(false);

const shippingCost = computed(
  () => shippingMethods.find((m) => m.value === form.shipping)?.price ?? 0,
);
const discount = computed(() =>
  discountApplied.value ? Math.round(subtotal.value * 0.1 * 100) / 100 : 0,
);
const tax = computed(
  () => Math.round((subtotal.value - discount.value) * 0.08 * 100) / 100,
);
const total = computed(
  () => subtotal.value - discount.value + shippingCost.value + tax.value,
);

function applyDiscount() {
  if (discountCode.value.trim().toUpperCase() === "TRAIL10") {
    discountApplied.value = true;
    toast.add({
      title: "Code applied",
      description: "TRAIL10 takes 10% off your order.",
      color: "success",
      icon: "i-lucide-tag",
    });
  } else {
    toast.add({
      title: "Invalid code",
      description: "Try TRAIL10 for 10% off.",
      color: "error",
      icon: "i-lucide-circle-alert",
    });
  }
}

function onPlaceOrder(event: FormSubmitEvent<CheckoutSchema>) {
  orderPlaced.value = true;
  window.scrollTo({ top: 0 });
  toast.add({
    title: "Order placed",
    description: `Confirmation sent to ${event.data.email}`,
    color: "success",
    icon: "i-lucide-circle-check",
  });
}

function continueShopping() {
  cart.value = [];
  orderPlaced.value = false;
  discountApplied.value = false;
  discountCode.value = "";
  view.value = "product";
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-(--ui-bg)">
    <!-- Announcement bar -->
    <p
      class="bg-(--ui-bg-inverted) text-(--ui-text-inverted) text-center text-xs sm:text-sm font-medium px-4 py-2"
    >
      Free shipping over $75 · 60-day returns · Lifetime warranty
    </p>

    <!-- Shop header -->
    <header
      class="sticky top-0 z-30 border-b border-(--ui-border) bg-(--ui-bg)/90 backdrop-blur"
    >
      <UContainer class="h-16 flex items-center gap-4 lg:gap-8">
        <button
          type="button"
          class="flex items-center gap-2 shrink-0"
          @click="view = 'product'"
        >
          <UIcon
            name="i-lucide-mountain-snow"
            class="size-7 text-primary"
            aria-hidden="true"
          />
          <span
            class="text-lg font-bold tracking-tight text-(--ui-text-highlighted)"
            >Northwind</span
          >
        </button>

        <UNavigationMenu
          :items="navItems"
          variant="link"
          class="hidden lg:flex"
          aria-label="Shop categories"
        />

        <div class="flex-1 flex items-center justify-end gap-1.5">
          <UInput
            icon="i-lucide-search"
            placeholder="Search gear…"
            aria-label="Search products"
            class="hidden md:block w-56 lg:w-64"
          />
          <UButton
            icon="i-lucide-search"
            color="neutral"
            variant="ghost"
            aria-label="Search"
            class="md:hidden"
          />
          <UButton
            icon="i-lucide-user"
            color="neutral"
            variant="ghost"
            aria-label="Account"
          />
          <UChip
            :text="cartCount"
            :show="cartCount > 0"
            size="3xl"
            color="primary"
            inset
          >
            <UButton
              icon="i-lucide-shopping-bag"
              color="neutral"
              variant="ghost"
              :aria-label="`Open cart, ${cartCount} items`"
              @click="cartOpen = true"
            />
          </UChip>
        </div>
      </UContainer>
    </header>

    <div class="flex-1">
      <UContainer class="py-6 sm:py-8">
        <UBreadcrumb
          :items="breadcrumb"
          :ui="{ list: 'flex-wrap gap-y-1', item: 'min-w-auto' }"
          class="mb-6 sm:mb-8"
        />

        <!-- ====================== Product view ====================== -->
        <template v-if="view === 'product'">
          <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <!-- Gallery -->
            <div class="space-y-3 min-w-0 lg:sticky lg:top-24 lg:self-start">
              <UCarousel
                ref="carousel"
                v-slot="{ item }"
                :items="gallery"
                arrows
                :prev="{ color: 'neutral', variant: 'outline' }"
                :next="{ color: 'neutral', variant: 'outline' }"
                :ui="{ prev: 'sm:start-4', next: 'sm:end-4' }"
                aria-label="Product images"
                @select="activeSlide = $event"
              >
                <div
                  class="relative aspect-square sm:aspect-[5/4] rounded-(--ui-radius) overflow-hidden flex items-center justify-center"
                  :class="tileTone[selectedColor]"
                >
                  <div
                    class="absolute h-3/4 aspect-square rounded-full bg-(--ui-bg)/40"
                    aria-hidden="true"
                  />
                  <UIcon
                    :name="item.icon"
                    class="relative size-32 sm:size-40"
                    aria-hidden="true"
                  />
                  <span
                    class="absolute bottom-3 start-3 rounded-full bg-(--ui-bg) px-3 py-1 text-xs font-medium text-(--ui-text-highlighted) shadow-sm"
                  >
                    {{ item.label }}
                  </span>
                </div>
              </UCarousel>

              <div class="grid grid-cols-5 gap-2 sm:gap-3">
                <button
                  v-for="(item, index) in gallery"
                  :key="item.label"
                  type="button"
                  class="aspect-square rounded-(--ui-radius) flex items-center justify-center transition outline-offset-2"
                  :class="[
                    tileTone[selectedColor],
                    activeSlide === index
                      ? 'outline-2 outline-primary'
                      : 'hover:opacity-80',
                  ]"
                  :aria-label="`Show ${item.label} image`"
                  :aria-current="activeSlide === index ? 'true' : undefined"
                  @click="selectSlide(index)"
                >
                  <UIcon
                    :name="item.icon"
                    class="size-6 sm:size-8"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <!-- Details -->
            <div class="space-y-6">
              <div class="space-y-3">
                <p class="text-sm font-medium text-primary">
                  {{ product.brand }}
                </p>
                <h1
                  class="text-2xl sm:text-3xl font-bold tracking-tight text-(--ui-text-highlighted)"
                >
                  {{ product.name }}
                </h1>
                <div class="flex items-center gap-2 text-sm">
                  <UInputRating
                    :model-value="product.rating"
                    readonly
                    size="sm"
                    :aria-label="`Rated ${product.rating} out of 5`"
                  >
                    <template #item="{ filled }">
                      <svg
                        viewBox="0 0 24 24"
                        class="block size-4"
                        :class="
                          filled ? 'text-warning' : 'text-(--ui-border-accented)'
                        "
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path :d="starPath" />
                      </svg>
                    </template>
                  </UInputRating>
                  <span class="font-medium text-(--ui-text-highlighted)">{{
                    product.rating
                  }}</span>
                  <ULink class="text-(--ui-text-muted) underline">
                    {{ product.reviews }} reviews
                  </ULink>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <span class="text-3xl font-semibold text-(--ui-text-highlighted)">
                  {{ formatPrice(product.price) }}
                </span>
                <span class="text-lg text-(--ui-text-muted) line-through">
                  <span class="sr-only">Was</span>
                  {{ formatPrice(product.compareAt) }}
                </span>
                <UBadge color="error" variant="solid" :label="`Save ${savings}%`" />
              </div>

              <p class="text-(--ui-text-muted) leading-relaxed">
                {{ product.description }}
              </p>

              <!-- Color -->
              <fieldset class="space-y-3">
                <legend class="text-sm font-medium text-(--ui-text-highlighted)">
                  Color:
                  <span class="font-normal text-(--ui-text-muted)">{{
                    colorLabel
                  }}</span>
                </legend>
                <div class="flex gap-3">
                  <button
                    v-for="color in colors"
                    :key="color.value"
                    type="button"
                    class="size-9 rounded-full ring-1 ring-inset ring-(--ui-border-accented) outline-offset-2 transition"
                    :class="[
                      color.swatch,
                      selectedColor === color.value
                        ? 'outline-2 outline-(--ui-border-inverted)'
                        : 'hover:scale-110',
                    ]"
                    :aria-label="color.label"
                    :aria-pressed="selectedColor === color.value"
                    @click="selectedColor = color.value"
                  />
                </div>
              </fieldset>

              <!-- Size -->
              <fieldset class="space-y-3">
                <div class="flex items-center justify-between">
                  <legend
                    class="text-sm font-medium text-(--ui-text-highlighted)"
                  >
                    Capacity
                  </legend>
                  <ULink class="text-sm text-primary font-medium">
                    Size guide
                  </ULink>
                </div>
                <div class="grid grid-cols-4 gap-2">
                  <button
                    v-for="size in sizes"
                    :key="size.value"
                    type="button"
                    :disabled="size.soldOut"
                    class="rounded-(--ui-radius) border px-2 py-2.5 text-center transition disabled:cursor-not-allowed disabled:opacity-50"
                    :class="
                      selectedSize === size.value
                        ? 'border-primary bg-primary/10 ring-1 ring-inset ring-primary'
                        : 'border-(--ui-border-accented) hover:bg-(--ui-bg-elevated)'
                    "
                    :aria-pressed="selectedSize === size.value"
                    @click="selectedSize = size.value"
                  >
                    <span
                      class="block text-sm font-semibold text-(--ui-text-highlighted)"
                      :class="{ 'line-through': size.soldOut }"
                      >{{ size.value }}</span
                    >
                    <span class="block text-xs text-(--ui-text-muted)">{{
                      size.hint
                    }}</span>
                  </button>
                </div>
              </fieldset>

              <!-- Quantity + actions -->
              <div class="flex flex-wrap items-end gap-3">
                <UFormField label="Quantity" class="w-32">
                  <UInputNumber v-model="quantity" :min="1" :max="10" size="lg" />
                </UFormField>
                <UButton
                  label="Add to cart"
                  icon="i-lucide-shopping-bag"
                  size="lg"
                  class="flex-1 justify-center min-w-40"
                  @click="addToCart"
                />
                <UButton
                  :icon="wishlisted ? 'i-lucide-heart-off' : 'i-lucide-heart'"
                  color="neutral"
                  variant="outline"
                  size="lg"
                  :aria-label="
                    wishlisted ? 'Remove from wishlist' : 'Add to wishlist'
                  "
                  :aria-pressed="wishlisted"
                  @click="toggleWishlist"
                />
              </div>

              <ul class="grid grid-cols-3 gap-2">
                <li
                  v-for="h in highlights"
                  :key="h.label"
                  class="flex flex-col items-center gap-1.5 rounded-(--ui-radius) bg-(--ui-bg-elevated) px-2 py-3 text-center"
                >
                  <UIcon
                    :name="h.icon"
                    class="size-5 text-primary"
                    aria-hidden="true"
                  />
                  <span class="text-xs font-medium text-(--ui-text-highlighted)">
                    {{ h.label }}
                  </span>
                </li>
              </ul>

              <UAccordion
                :items="infoItems"
                type="multiple"
                :default-value="['0']"
                class="border-t border-(--ui-border)"
              />
            </div>
          </div>

          <!-- You may also like -->
          <section class="mt-16 sm:mt-20" aria-labelledby="related-heading">
            <div class="flex items-center justify-between mb-6">
              <h2
                id="related-heading"
                class="text-xl sm:text-2xl font-bold tracking-tight text-(--ui-text-highlighted)"
              >
                You may also like
              </h2>
              <ULink class="text-sm font-medium text-primary">View all</ULink>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <article v-for="item in related" :key="item.id" class="group">
                <div
                  class="relative aspect-square rounded-(--ui-radius) flex items-center justify-center mb-3"
                  :class="tileTone[item.tone]"
                >
                  <UIcon
                    :name="item.icon"
                    class="size-16 sm:size-20 transition group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <UBadge
                    v-if="item.badge"
                    :label="item.badge"
                    color="neutral"
                    variant="solid"
                    size="sm"
                    class="absolute top-3 start-3"
                  />
                  <UButton
                    icon="i-lucide-plus"
                    color="neutral"
                    variant="outline"
                    size="sm"
                    class="absolute bottom-3 end-3 rounded-full bg-(--ui-bg)"
                    :aria-label="`Add ${item.name} to cart`"
                    @click="addRelated(item)"
                  />
                </div>
                <h3 class="text-sm font-medium text-(--ui-text-highlighted)">
                  {{ item.name }}
                </h3>
                <div class="mt-1 flex items-center justify-between gap-2">
                  <span class="text-sm font-semibold text-(--ui-text-highlighted)">
                    {{ formatPrice(item.price) }}
                  </span>
                  <span
                    class="flex items-center gap-1 text-xs text-(--ui-text-muted)"
                  >
                    <UIcon
                      name="i-lucide-star"
                      class="size-3.5 text-warning"
                      aria-hidden="true"
                    />
                    {{ item.rating }}
                  </span>
                </div>
              </article>
            </div>
          </section>
        </template>

        <!-- ====================== Checkout view ====================== -->
        <template v-else>
          <!-- Success -->
          <div
            v-if="orderPlaced"
            class="max-w-xl mx-auto text-center py-10 space-y-6"
            aria-live="polite"
          >
            <div
              class="mx-auto size-16 rounded-full bg-success/10 flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-circle-check"
                class="size-9 text-success"
                aria-hidden="true"
              />
            </div>
            <div class="space-y-2">
              <h1
                class="text-2xl sm:text-3xl font-bold tracking-tight text-(--ui-text-highlighted)"
              >
                Thanks, {{ form.firstName }}! Your order is confirmed.
              </h1>
              <p class="text-(--ui-text-muted)">
                Order <span class="font-medium text-(--ui-text-highlighted)">#NW-20481</span>
                is on its way. We sent a receipt to {{ form.email }}.
              </p>
            </div>
            <UCard class="text-start">
              <dl class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt class="text-(--ui-text-muted)">Shipping to</dt>
                  <dd class="font-medium text-(--ui-text-highlighted)">
                    {{ form.city }}, {{ form.state }}
                  </dd>
                </div>
                <div>
                  <dt class="text-(--ui-text-muted)">Delivery</dt>
                  <dd class="font-medium text-(--ui-text-highlighted)">
                    {{
                      shippingMethods.find((m) => m.value === form.shipping)
                        ?.description
                    }}
                  </dd>
                </div>
                <div>
                  <dt class="text-(--ui-text-muted)">Items</dt>
                  <dd class="font-medium text-(--ui-text-highlighted)">
                    {{ cartCount }}
                  </dd>
                </div>
                <div>
                  <dt class="text-(--ui-text-muted)">Total paid</dt>
                  <dd class="font-medium text-(--ui-text-highlighted)">
                    {{ formatPrice(total) }}
                  </dd>
                </div>
              </dl>
            </UCard>
            <div class="flex flex-wrap justify-center gap-3">
              <UButton
                label="Continue shopping"
                icon="i-lucide-arrow-left"
                @click="continueShopping"
              />
              <UButton
                label="Track order"
                icon="i-lucide-truck"
                color="neutral"
                variant="outline"
              />
            </div>
          </div>

          <!-- Checkout form -->
          <div v-else class="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
            <UForm
              :schema="checkoutSchema"
              :state="form"
              class="space-y-8 min-w-0"
              @submit="onPlaceOrder"
            >
              <div class="flex items-center justify-between gap-4">
                <h1
                  class="text-2xl sm:text-3xl font-bold tracking-tight text-(--ui-text-highlighted)"
                >
                  Checkout
                </h1>
                <UButton
                  label="Back to shop"
                  icon="i-lucide-arrow-left"
                  color="neutral"
                  variant="ghost"
                  @click="view = 'product'"
                />
              </div>

              <section class="space-y-4">
                <h2 class="text-lg font-semibold text-(--ui-text-highlighted)">
                  Contact
                </h2>
                <UFormField label="Email" name="email" required>
                  <UInput
                    v-model="form.email"
                    type="email"
                    icon="i-lucide-mail"
                    placeholder="you@example.com"
                    autocomplete="email"
                    class="w-full"
                  />
                </UFormField>
              </section>

              <USeparator />

              <section class="space-y-4">
                <h2 class="text-lg font-semibold text-(--ui-text-highlighted)">
                  Shipping address
                </h2>
                <div class="grid gap-4 sm:grid-cols-2">
                  <UFormField label="First name" name="firstName" required>
                    <UInput
                      v-model="form.firstName"
                      autocomplete="given-name"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField label="Last name" name="lastName" required>
                    <UInput
                      v-model="form.lastName"
                      autocomplete="family-name"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Address"
                    name="address"
                    required
                    class="sm:col-span-2"
                  >
                    <UInput
                      v-model="form.address"
                      icon="i-lucide-map-pin"
                      placeholder="Street and number"
                      autocomplete="address-line1"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Apartment, suite (optional)"
                    name="apartment"
                    class="sm:col-span-2"
                  >
                    <UInput
                      v-model="form.apartment"
                      autocomplete="address-line2"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField label="City" name="city" required>
                    <UInput
                      v-model="form.city"
                      autocomplete="address-level2"
                      class="w-full"
                    />
                  </UFormField>
                  <div class="grid grid-cols-2 gap-4">
                    <UFormField label="State" name="state" required>
                      <USelect
                        v-model="form.state"
                        :items="states"
                        placeholder="Select"
                        :ui="{ placeholder: 'text-(--ui-text-muted)' }"
                        class="w-full"
                      />
                    </UFormField>
                    <UFormField label="ZIP" name="zip" required>
                      <UInput
                        v-model="form.zip"
                        inputmode="numeric"
                        autocomplete="postal-code"
                        class="w-full"
                      />
                    </UFormField>
                  </div>
                </div>
              </section>

              <USeparator />

              <section class="space-y-4">
                <h2 class="text-lg font-semibold text-(--ui-text-highlighted)">
                  Shipping method
                </h2>
                <UFormField name="shipping">
                  <URadioGroup
                    v-model="form.shipping"
                    :items="shippingMethods"
                    variant="card"
                    legend="Choose a delivery speed"
                    :ui="{
                      fieldset: 'grid gap-3 sm:grid-cols-3',
                      legend: 'sr-only',
                    }"
                  >
                    <template #label="{ item }">
                      <span class="flex items-center justify-between gap-2">
                        {{ item.label }}
                        <span class="font-semibold">{{
                          item.price ? formatPrice(item.price) : "Free"
                        }}</span>
                      </span>
                    </template>
                  </URadioGroup>
                </UFormField>
              </section>

              <USeparator />

              <section class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                  <h2
                    class="text-lg font-semibold text-(--ui-text-highlighted)"
                  >
                    Payment
                  </h2>
                  <div
                    class="flex items-center gap-2 text-(--ui-text-muted)"
                    aria-label="Accepted cards: Visa, Mastercard, American Express"
                    role="img"
                  >
                    <UIcon name="i-simple-icons-visa" class="size-7" />
                    <UIcon name="i-simple-icons-mastercard" class="size-6" />
                    <UIcon
                      name="i-simple-icons-americanexpress"
                      class="size-5"
                    />
                  </div>
                </div>
                <div class="grid gap-4 sm:grid-cols-4">
                  <UFormField
                    label="Card number"
                    name="cardNumber"
                    required
                    class="sm:col-span-4"
                  >
                    <UInput
                      v-model="form.cardNumber"
                      icon="i-lucide-credit-card"
                      placeholder="1234 5678 9012 3456"
                      inputmode="numeric"
                      autocomplete="cc-number"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Name on card"
                    name="cardName"
                    required
                    class="sm:col-span-2"
                  >
                    <UInput
                      v-model="form.cardName"
                      autocomplete="cc-name"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField label="Expiry" name="expiry" required>
                    <UInput
                      v-model="form.expiry"
                      placeholder="MM/YY"
                      autocomplete="cc-exp"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField label="CVC" name="cvc" required>
                    <UInput
                      v-model="form.cvc"
                      placeholder="123"
                      inputmode="numeric"
                      autocomplete="cc-csc"
                      class="w-full"
                    />
                  </UFormField>
                </div>
                <p
                  class="flex items-center gap-2 text-sm text-(--ui-text-muted)"
                >
                  <UIcon
                    name="i-lucide-lock"
                    class="size-4 shrink-0"
                    aria-hidden="true"
                  />
                  Payments are encrypted and processed securely.
                </p>
              </section>

              <UButton
                type="submit"
                :label="`Place order · ${formatPrice(total)}`"
                icon="i-lucide-lock"
                size="xl"
                block
                :disabled="cart.length === 0"
              />
            </UForm>

            <!-- Order summary -->
            <aside class="order-first lg:order-last">
              <UCard
                class="lg:sticky lg:top-24"
                :ui="{ root: 'bg-(--ui-bg-elevated)/50' }"
              >
                <template #header>
                  <h2 class="font-semibold text-(--ui-text-highlighted)">
                    Order summary
                  </h2>
                </template>

                <ul
                  v-if="cart.length"
                  class="divide-y divide-(--ui-border) -my-3"
                >
                  <li
                    v-for="item in cart"
                    :key="item.key"
                    class="flex items-center gap-3 py-3"
                  >
                    <div
                      class="size-14 shrink-0 rounded-(--ui-radius) flex items-center justify-center"
                      :class="tileTone[item.tone]"
                    >
                      <UIcon
                        :name="item.icon"
                        class="size-7"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-(--ui-text-highlighted) truncate"
                      >
                        {{ item.name }}
                      </p>
                      <p class="text-xs text-(--ui-text-muted)">
                        {{ item.variant }} · Qty {{ item.quantity }}
                      </p>
                    </div>
                    <span
                      class="text-sm font-medium text-(--ui-text-highlighted)"
                    >
                      {{ formatPrice(item.price * item.quantity) }}
                    </span>
                  </li>
                </ul>
                <p v-else class="text-sm text-(--ui-text-muted)">
                  Your cart is empty.
                </p>

                <template #footer>
                  <div class="space-y-4">
                    <form class="flex gap-2" @submit.prevent="applyDiscount">
                      <UInput
                        v-model="discountCode"
                        icon="i-lucide-tag"
                        placeholder="Discount code"
                        aria-label="Discount code"
                        :disabled="discountApplied"
                        class="flex-1"
                      />
                      <UButton
                        type="submit"
                        label="Apply"
                        color="neutral"
                        variant="outline"
                        :disabled="discountApplied || !discountCode"
                      />
                    </form>

                    <dl class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <dt class="text-(--ui-text-muted)">Subtotal</dt>
                        <dd class="text-(--ui-text-highlighted)">
                          {{ formatPrice(subtotal) }}
                        </dd>
                      </div>
                      <div v-if="discountApplied" class="flex justify-between">
                        <dt class="text-(--ui-text-muted)">
                          Discount
                          <UBadge
                            label="TRAIL10"
                            color="neutral"
                            variant="outline"
                            size="sm"
                            class="ms-1"
                          />
                        </dt>
                        <dd class="text-(--ui-text-highlighted)">
                          −{{ formatPrice(discount) }}
                        </dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-(--ui-text-muted)">Shipping</dt>
                        <dd class="text-(--ui-text-highlighted)">
                          {{ shippingCost ? formatPrice(shippingCost) : "Free" }}
                        </dd>
                      </div>
                      <div class="flex justify-between">
                        <dt class="text-(--ui-text-muted)">Estimated tax</dt>
                        <dd class="text-(--ui-text-highlighted)">
                          {{ formatPrice(tax) }}
                        </dd>
                      </div>
                      <USeparator class="my-3" />
                      <div class="flex justify-between text-base">
                        <dt class="font-semibold text-(--ui-text-highlighted)">
                          Total
                        </dt>
                        <dd class="font-semibold text-(--ui-text-highlighted)">
                          {{ formatPrice(total) }}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </template>
              </UCard>
            </aside>
          </div>
        </template>
      </UContainer>
    </div>

    <footer class="border-t border-(--ui-border) mt-16">
      <UContainer
        class="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-(--ui-text-muted)"
      >
        <p>© 2026 Northwind Supply Co.</p>
        <div class="flex gap-4">
          <ULink>Shipping</ULink>
          <ULink>Returns</ULink>
          <ULink>Contact</ULink>
        </div>
      </UContainer>
    </footer>

    <!-- Cart slideover -->
    <USlideover
      v-model:open="cartOpen"
      :title="`Your cart (${cartCount})`"
      description="Free shipping on orders over $75."
    >
      <template #body>
        <div
          v-if="!cart.length"
          class="h-full flex flex-col items-center justify-center gap-3 text-center"
        >
          <UIcon
            name="i-lucide-shopping-bag"
            class="size-10 text-(--ui-text-muted)"
            aria-hidden="true"
          />
          <p class="text-(--ui-text-muted)">Your cart is empty.</p>
        </div>
        <ul v-else class="divide-y divide-(--ui-border) -my-4">
          <li v-for="item in cart" :key="item.key" class="flex gap-4 py-4">
            <div
              class="size-20 shrink-0 rounded-(--ui-radius) flex items-center justify-center"
              :class="tileTone[item.tone]"
            >
              <UIcon :name="item.icon" class="size-9" aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0 flex flex-col gap-2">
              <div class="flex justify-between gap-2">
                <div class="min-w-0">
                  <p
                    class="text-sm font-medium text-(--ui-text-highlighted) truncate"
                  >
                    {{ item.name }}
                  </p>
                  <p class="text-xs text-(--ui-text-muted)">
                    {{ item.variant }}
                  </p>
                </div>
                <span class="text-sm font-semibold text-(--ui-text-highlighted)">
                  {{ formatPrice(item.price * item.quantity) }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <UInputNumber
                  v-model="item.quantity"
                  :min="1"
                  :max="10"
                  size="sm"
                  class="w-28"
                  :aria-label="`Quantity for ${item.name}`"
                />
                <UButton
                  icon="i-lucide-trash-2"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  :aria-label="`Remove ${item.name}`"
                  @click="removeItem(item.key)"
                />
              </div>
            </div>
          </li>
        </ul>
      </template>

      <template #footer>
        <div class="w-full space-y-3">
          <div class="flex justify-between text-base font-semibold">
            <span class="text-(--ui-text-highlighted)">Subtotal</span>
            <span class="text-(--ui-text-highlighted)">{{
              formatPrice(subtotal)
            }}</span>
          </div>
          <p class="text-xs text-(--ui-text-muted)">
            Shipping and taxes calculated at checkout.
          </p>
          <UButton
            label="Checkout"
            trailing-icon="i-lucide-arrow-right"
            size="lg"
            block
            :disabled="!cart.length"
            @click="goToCheckout"
          />
          <UButton
            label="Continue shopping"
            color="neutral"
            variant="ghost"
            block
            @click="cartOpen = false"
          />
        </div>
      </template>
    </USlideover>
  </div>
</template>
