<script setup lang="ts">
const featured = {
  src: "https://picsum.photos/seed/feat-gallery/1200/600",
  alt: "Featured gallery item",
  title: "Project Showcase: Dashboard Re-design",
  description:
    "A complete UI overhaul using the theme builder's export workflow.",
};

const thumbnails = Array.from({ length: 4 }, (_, i) => ({
  src: `https://picsum.photos/seed/thumb${i + 1}/400/300`,
  alt: `Thumbnail ${i + 1}`,
}));
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="text-center mb-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Featured work
        </h2>
      </div>
      <div
        class="overflow-hidden rounded-xl border border-(--ui-border) relative"
      >
        <img
          :src="featured.src"
          :alt="featured.alt"
          class="w-full h-64 sm:h-96 object-cover"
          loading="lazy"
        >
        <div
          class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6"
        >
          <h3 class="text-xl font-bold text-white">{{ featured.title }}</h3>
          <p class="text-sm text-white/80 mt-1">{{ featured.description }}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          v-for="thumb in thumbnails"
          :key="thumb.src"
          class="overflow-hidden rounded-lg border border-(--ui-border)"
        >
          <img
            :src="thumb.src"
            :alt="thumb.alt"
            class="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>
