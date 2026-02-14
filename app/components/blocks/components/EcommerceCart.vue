<script setup lang="ts">
const items = [
  {
    name: "Pro Design System",
    price: 79,
    quantity: 1,
    image: "https://picsum.photos/seed/cart1/100/100",
  },
  {
    name: "Icon Collection",
    price: 19,
    quantity: 2,
    image: "https://picsum.photos/seed/cart2/100/100",
  },
];

const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
const tax = Math.round(subtotal * 0.08 * 100) / 100;
const total = subtotal + tax;
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Background glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[28rem] rounded-full bg-(--ui-primary)/6 blur-[120px]"
      aria-hidden="true"
    />

    <div class="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="ecom-cart-enter flex items-center gap-3 mb-8">
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-(--ui-primary)/12"
        >
          <UIcon
            name="i-lucide-shopping-cart"
            class="size-5 text-(--ui-primary)"
            aria-hidden="true"
          />
        </div>
        <h2 class="text-2xl font-bold text-(--ui-text-highlighted)">
          Shopping Cart
        </h2>
        <UBadge
          :label="`${items.length} items`"
          color="primary"
          variant="subtle"
          size="sm"
          class="ml-auto"
        />
      </div>

      <!-- Glass card -->
      <div
        class="ecom-cart-enter [animation-delay:100ms] rounded-3xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl shadow-2xl p-6 sm:p-8"
      >
        <!-- Items -->
        <div class="divide-y divide-(--ui-border)/60">
          <div
            v-for="(item, i) in items"
            :key="item.name"
            class="ecom-cart-item flex items-center gap-4 py-5 first:pt-0 last:pb-0"
            :style="{ animationDelay: `${200 + i * 80}ms` }"
          >
            <div
              class="relative shrink-0 overflow-hidden rounded-xl border border-(--ui-border)/50"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="size-16 object-cover"
                loading="lazy"
              >
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-(--ui-text-highlighted) truncate">
                {{ item.name }}
              </h3>
              <p class="text-sm text-(--ui-text-muted)">
                Qty: {{ item.quantity }}
              </p>
            </div>
            <p class="font-semibold text-(--ui-text-highlighted)">
              ${{ item.price * item.quantity }}
            </p>
          </div>
        </div>

        <!-- Accent line separator -->
        <div class="my-6 flex items-center gap-3" aria-hidden="true">
          <div class="flex-1 h-px bg-(--ui-border)/60" />
          <div class="size-1.5 rounded-full bg-(--ui-primary)/40" />
          <div class="size-1.5 rounded-full bg-(--ui-secondary)/40" />
          <div class="size-1.5 rounded-full bg-(--ui-primary)/40" />
          <div class="flex-1 h-px bg-(--ui-border)/60" />
        </div>

        <!-- Summary -->
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-(--ui-text-muted)">Subtotal</span>
            <span class="font-medium text-(--ui-text-highlighted)"
              >${{ subtotal }}</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-(--ui-text-muted)">Tax</span>
            <span class="font-medium text-(--ui-text-highlighted)"
              >${{ tax }}</span
            >
          </div>
          <div
            class="flex justify-between text-lg font-bold pt-3 border-t border-(--ui-border)/40"
          >
            <span class="text-(--ui-text-highlighted)">Total</span>
            <span
              class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              ${{ total }}
            </span>
          </div>
        </div>

        <UButton
          label="Checkout"
          icon="i-lucide-credit-card"
          color="primary"
          size="lg"
          block
          class="mt-6"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecom-cart-enter {
  animation: ecomCartIn 0.6s ease-out both;
}

.ecom-cart-item {
  animation: ecomCartItem 0.5s ease-out both;
}

@keyframes ecomCartIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ecomCartItem {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ecom-cart-enter,
  .ecom-cart-item {
    animation: none;
  }
}
</style>
