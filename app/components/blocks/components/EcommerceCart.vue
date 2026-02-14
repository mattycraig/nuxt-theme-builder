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
  <section class="py-16 sm:py-24">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-(--ui-text-highlighted) mb-8">
        Shopping Cart
      </h2>
      <UPageCard>
        <div class="divide-y divide-(--ui-border)">
          <div
            v-for="item in items"
            :key="item.name"
            class="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-16 h-16 rounded-lg object-cover border border-(--ui-border)"
              loading="lazy"
            >
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
        <USeparator class="my-4" />
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-(--ui-text-muted)">Subtotal</span>
            <span class="text-(--ui-text-highlighted)">${{ subtotal }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-(--ui-text-muted)">Tax</span>
            <span class="text-(--ui-text-highlighted)">${{ tax }}</span>
          </div>
          <USeparator />
          <div class="flex justify-between text-base font-bold pt-2">
            <span class="text-(--ui-text-highlighted)">Total</span>
            <span class="text-(--ui-primary)">${{ total }}</span>
          </div>
        </div>
        <UButton
          label="Checkout"
          icon="i-lucide-credit-card"
          color="primary"
          block
          class="mt-6"
        />
      </UPageCard>
    </div>
  </section>
</template>
