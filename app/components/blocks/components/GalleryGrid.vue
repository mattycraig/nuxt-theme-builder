<script setup lang="ts">
const images = Array.from({ length: 9 }, (_, i) => ({
  src: `https://picsum.photos/seed/gallery${i + 1}/600/400`,
  alt: `Gallery image ${i + 1}`,
}));
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Gallery
        </h2>
        <p class="mt-2 text-lg text-(--ui-text-muted)">
          A showcase of work from our community.
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="img in images"
          :key="img.src"
          class="overflow-hidden rounded-lg border border-(--ui-border)"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            class="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>
