<script setup lang="ts">
const images = [
  {
    src: "https://picsum.photos/seed/lb1/800/600",
    alt: "Architectural facade with geometric patterns",
    title: "Facade Study",
    date: "Jan 2025",
  },
  {
    src: "https://picsum.photos/seed/lb2/600/600",
    alt: "Abstract water reflection",
    title: "Liquid Mirror",
    date: "Dec 2024",
  },
  {
    src: "https://picsum.photos/seed/lb3/600/800",
    alt: "Vertical botanical composition",
    title: "Vertical Green",
    date: "Nov 2024",
  },
  {
    src: "https://picsum.photos/seed/lb4/800/500",
    alt: "Desert landscape panorama",
    title: "Dune Horizon",
    date: "Oct 2024",
  },
  {
    src: "https://picsum.photos/seed/lb5/600/600",
    alt: "Textile close-up macro",
    title: "Woven Detail",
    date: "Sep 2024",
  },
  {
    src: "https://picsum.photos/seed/lb6/800/600",
    alt: "Rainy cityscape reflections",
    title: "Wet Streets",
    date: "Aug 2024",
  },
];

const selected = ref<number | null>(null);

function selectImage(index: number) {
  selected.value = selected.value === index ? null : index;
}
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Warm gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5"
      aria-hidden="true"
    />

    <!-- Decorative rings -->
    <div
      class="pointer-events-none absolute top-12 right-12 size-48 rounded-full border border-(--ui-primary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-16 left-8 size-32 rounded-full border border-(--ui-secondary)/10"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-14">
        <UBadge
          label="Archive"
          color="primary"
          variant="subtle"
          size="lg"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          Photo Archive
        </h2>
        <p
          class="mt-3 text-lg text-(--ui-text-muted) max-w-md mx-auto leading-relaxed"
        >
          Click to expand. A collection organized by time and memory.
        </p>
      </div>

      <!-- Grid with expandable items -->
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <div
          v-for="(img, i) in images"
          :key="img.src"
          class="lightbox-item group relative overflow-hidden rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-sm transition-all duration-500 cursor-pointer"
          :class="[
            selected === i
              ? 'col-span-2 row-span-2 shadow-2xl ring-2 ring-(--ui-primary)/30'
              : 'hover:shadow-lg',
          ]"
          :style="{ animationDelay: `${100 + i * 70}ms` }"
          role="button"
          :tabindex="0"
          :aria-label="`${selected === i ? 'Collapse' : 'Expand'} ${img.title}`"
          @click="selectImage(i)"
          @keydown.enter="selectImage(i)"
          @keydown.space.prevent="selectImage(i)"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            class="w-full object-cover transition-all duration-700"
            :class="[
              selected === i
                ? 'h-64 sm:h-96 group-hover:scale-102'
                : 'h-40 sm:h-52 group-hover:scale-110',
            ]"
            loading="lazy"
            width="800"
            height="600"
          >
          <!-- Always-visible title bar -->
          <div
            class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 transition-all duration-500"
            :class="selected === i ? 'pb-5' : ''"
          >
            <div class="flex items-end justify-between gap-2">
              <div>
                <p class="text-sm font-bold text-white">{{ img.title }}</p>
                <p v-if="selected === i" class="text-xs text-white/70 mt-0.5">
                  {{ img.date }}
                </p>
              </div>
              <UIcon
                :name="
                  selected === i ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'
                "
                class="size-4 text-white/60"
                aria-hidden="true"
              />
            </div>
          </div>

          <!-- Glow effect on selected -->
          <div
            v-if="selected === i"
            class="pointer-events-none absolute -top-6 -left-6 size-32 rounded-full bg-(--ui-primary)/15 blur-3xl"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lightbox-item {
  animation: lightboxFadeIn 0.6s ease-out both;
}

@keyframes lightboxFadeIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-item {
    animation: none;
  }
}
</style>
