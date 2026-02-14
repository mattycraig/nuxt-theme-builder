<script setup lang="ts">
const products = [
  {
    name: "Starter Theme Pack",
    price: "$29",
    image: "https://picsum.photos/seed/prod1/400/400",
    badge: "New",
  },
  {
    name: "Pro Design System",
    price: "$79",
    image: "https://picsum.photos/seed/prod2/400/400",
    badge: "Popular",
  },
  {
    name: "Enterprise Kit",
    price: "$199",
    image: "https://picsum.photos/seed/prod3/400/400",
    badge: "",
  },
  {
    name: "Component Library",
    price: "$49",
    image: "https://picsum.photos/seed/prod4/400/400",
    badge: "Sale",
  },
  {
    name: "Icon Collection",
    price: "$19",
    image: "https://picsum.photos/seed/prod5/400/400",
    badge: "",
  },
  {
    name: "Template Bundle",
    price: "$99",
    image: "https://picsum.photos/seed/prod6/400/400",
    badge: "",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Shop themes
        </h2>
        <p class="mt-2 text-lg text-(--ui-text-muted)">
          Pre-built themes and design resources for every project.
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="p in products" :key="p.name" class="group">
          <div
            class="relative overflow-hidden rounded-lg border border-(--ui-border) mb-3"
          >
            <img
              :src="p.image"
              :alt="p.name"
              class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            >
            <UBadge
              v-if="p.badge"
              :label="p.badge"
              color="primary"
              class="absolute top-2 left-2"
            />
          </div>
          <h3 class="font-semibold text-(--ui-text-highlighted)">
            {{ p.name }}
          </h3>
          <p class="text-sm text-(--ui-primary) font-medium">{{ p.price }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
