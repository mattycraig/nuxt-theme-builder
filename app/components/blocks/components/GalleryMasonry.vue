<script setup lang="ts">
const images = [
  {
    src: "https://picsum.photos/seed/mw1/600/800",
    alt: "Portrait in dramatic lighting",
    title: "Shadow Portrait",
    tag: "Portrait",
    height: "h-80",
  },
  {
    src: "https://picsum.photos/seed/mw2/600/400",
    alt: "Minimalist interior space",
    title: "Quiet Room",
    tag: "Interior",
    height: "h-52",
  },
  {
    src: "https://picsum.photos/seed/mw3/600/500",
    alt: "Street photography at night",
    title: "Night Walk",
    tag: "Street",
    height: "h-64",
  },
  {
    src: "https://picsum.photos/seed/mw4/600/400",
    alt: "Product photography on marble",
    title: "Product Edit",
    tag: "Product",
    height: "h-52",
  },
  {
    src: "https://picsum.photos/seed/mw5/600/700",
    alt: "Mountain landscape panorama",
    title: "Summit View",
    tag: "Landscape",
    height: "h-72",
  },
  {
    src: "https://picsum.photos/seed/mw6/600/500",
    alt: "Abstract color experiment",
    title: "Color Field",
    tag: "Abstract",
    height: "h-64",
  },
  {
    src: "https://picsum.photos/seed/mw7/600/600",
    alt: "Food styling overhead shot",
    title: "Table Scene",
    tag: "Food",
    height: "h-60",
  },
  {
    src: "https://picsum.photos/seed/mw8/600/400",
    alt: "Fashion editorial detail",
    title: "Fabric Study",
    tag: "Fashion",
    height: "h-52",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Dot grid pattern background -->
    <div
      class="absolute inset-0 masonry-dot-grid opacity-[0.03]"
      aria-hidden="true"
    />

    <!-- Ambient glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[40rem] rounded-full bg-(--ui-primary)/8 blur-[140px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-14">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
        >
          Creative Showcase
        </p>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-(--ui-text-highlighted)"
        >
          Inspiration Wall
        </h2>
        <p class="mt-3 text-lg text-(--ui-text-muted) max-w-md mx-auto">
          Discover diverse styles and perspectives in one place.
        </p>
      </div>

      <!-- Masonry -->
      <UPageColumns>
        <div
          v-for="img in images"
          :key="img.src"
          class="group relative overflow-hidden rounded-xl border border-(--ui-border)/60 bg-(--ui-bg-elevated) shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            :class="[
              'w-full object-cover transition-transform duration-700 group-hover:scale-105',
              img.height,
            ]"
            loading="lazy"
          >
          <!-- Glassmorphism overlay on hover -->
          <div
            class="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
            aria-hidden="true"
          >
            <div
              class="bg-(--ui-bg)/70 backdrop-blur-lg border-t border-(--ui-border)/40 px-4 py-3"
            >
              <div class="flex items-center justify-between gap-2">
                <span
                  class="text-sm font-semibold text-(--ui-text-highlighted) truncate"
                >
                  {{ img.title }}
                </span>
                <UBadge
                  :label="img.tag"
                  color="primary"
                  variant="subtle"
                  size="xs"
                />
              </div>
            </div>
          </div>
          <!-- Subtle top-left accent on hover -->
          <div
            class="pointer-events-none absolute -top-3 -left-3 size-16 rounded-full bg-(--ui-primary)/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />
        </div>
      </UPageColumns>
    </div>
  </section>
</template>

<style scoped>
.masonry-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
