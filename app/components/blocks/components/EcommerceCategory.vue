<script setup lang="ts">
const categories = [
  {
    name: "Dashboard Themes",
    count: 24,
    icon: "i-lucide-layout-dashboard",
    image: "https://picsum.photos/seed/cat1/600/400",
  },
  {
    name: "Landing Pages",
    count: 18,
    icon: "i-lucide-rocket",
    image: "https://picsum.photos/seed/cat2/600/400",
  },
  {
    name: "E-commerce",
    count: 12,
    icon: "i-lucide-shopping-bag",
    image: "https://picsum.photos/seed/cat3/600/400",
  },
  {
    name: "Blog Templates",
    count: 15,
    icon: "i-lucide-file-text",
    image: "https://picsum.photos/seed/cat4/600/400",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Browse by category
        </h2>
      </div>
      <UPageGrid>
        <UPageCard v-for="cat in categories" :key="cat.name">
          <template #header>
            <img
              :src="cat.image"
              :alt="cat.name"
              class="w-full h-40 object-cover"
              loading="lazy"
            >
          </template>
          <div class="flex items-center justify-between p-2">
            <div class="flex items-center gap-3">
              <UIcon
                :name="cat.icon"
                class="size-5 text-(--ui-primary)"
                aria-hidden="true"
              />
              <h3 class="font-semibold text-(--ui-text-highlighted)">
                {{ cat.name }}
              </h3>
            </div>
            <UBadge :label="`${cat.count} items`" variant="subtle" />
          </div>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
