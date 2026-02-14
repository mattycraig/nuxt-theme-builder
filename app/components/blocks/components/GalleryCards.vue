<script setup lang="ts">
const items = [
  {
    title: "Modern Dashboard",
    category: "Web App",
    src: "https://picsum.photos/seed/gc1/600/400",
    alt: "Modern dashboard design",
  },
  {
    title: "E-commerce Redesign",
    category: "Website",
    src: "https://picsum.photos/seed/gc2/600/400",
    alt: "E-commerce redesign",
  },
  {
    title: "Mobile Banking",
    category: "Mobile",
    src: "https://picsum.photos/seed/gc3/600/400",
    alt: "Mobile banking app",
  },
  {
    title: "SaaS Landing Page",
    category: "Marketing",
    src: "https://picsum.photos/seed/gc4/600/400",
    alt: "SaaS landing page",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Portfolio
        </h2>
      </div>
      <UPageGrid>
        <UPageCard
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :description="item.category"
        >
          <template #header>
            <img
              :src="item.src"
              :alt="item.alt"
              class="w-full h-48 object-cover"
              loading="lazy"
            >
          </template>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
