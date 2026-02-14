<script setup lang="ts">
const images = [
  {
    src: "https://picsum.photos/seed/mas1/600/800",
    alt: "Tall image 1",
    height: "h-80",
  },
  {
    src: "https://picsum.photos/seed/mas2/600/400",
    alt: "Short image 2",
    height: "h-52",
  },
  {
    src: "https://picsum.photos/seed/mas3/600/500",
    alt: "Medium image 3",
    height: "h-64",
  },
  {
    src: "https://picsum.photos/seed/mas4/600/400",
    alt: "Short image 4",
    height: "h-52",
  },
  {
    src: "https://picsum.photos/seed/mas5/600/700",
    alt: "Tall image 5",
    height: "h-72",
  },
  {
    src: "https://picsum.photos/seed/mas6/600/500",
    alt: "Medium image 6",
    height: "h-64",
  },
  {
    src: "https://picsum.photos/seed/mas7/600/600",
    alt: "Square image 7",
    height: "h-60",
  },
  {
    src: "https://picsum.photos/seed/mas8/600/400",
    alt: "Short image 8",
    height: "h-52",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Inspiration wall
        </h2>
      </div>
      <UPageColumns>
        <div
          v-for="img in images"
          :key="img.src"
          class="overflow-hidden rounded-lg border border-(--ui-border)"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            :class="['w-full object-cover', img.height]"
            loading="lazy"
          >
        </div>
      </UPageColumns>
    </div>
  </section>
</template>
