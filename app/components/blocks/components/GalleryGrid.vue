<script setup lang="ts">
const images = [
  {
    src: "https://picsum.photos/seed/sg1/600/400",
    alt: "Abstract composition with warm tones",
    title: "Warm Abstraction",
    category: "Abstract",
  },
  {
    src: "https://picsum.photos/seed/sg2/600/400",
    alt: "Architectural detail in monochrome",
    title: "Concrete Lines",
    category: "Architecture",
  },
  {
    src: "https://picsum.photos/seed/sg3/600/400",
    alt: "Natural texture close-up",
    title: "Earth Texture",
    category: "Nature",
  },
  {
    src: "https://picsum.photos/seed/sg4/600/400",
    alt: "Urban landscape at dusk",
    title: "City Glow",
    category: "Urban",
  },
  {
    src: "https://picsum.photos/seed/sg5/600/400",
    alt: "Minimal studio still life",
    title: "Object Study",
    category: "Still Life",
  },
  {
    src: "https://picsum.photos/seed/sg6/600/400",
    alt: "Aerial geometric patterns",
    title: "Grid From Above",
    category: "Aerial",
  },
  {
    src: "https://picsum.photos/seed/sg7/600/400",
    alt: "Light and shadow play",
    title: "Chiaroscuro",
    category: "Abstract",
  },
  {
    src: "https://picsum.photos/seed/sg8/600/400",
    alt: "Botanical illustration detail",
    title: "Flora Study",
    category: "Nature",
  },
  {
    src: "https://picsum.photos/seed/sg9/600/400",
    alt: "Industrial machinery detail",
    title: "Machine Heart",
    category: "Industrial",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Atmospheric gradient orbs -->
    <div
      class="pointer-events-none absolute -top-32 left-1/4 size-[35rem] rounded-full bg-(--ui-primary)/10 blur-[120px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 right-1/4 size-[25rem] rounded-full bg-(--ui-secondary)/8 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-14">
        <UBadge
          label="Collection"
          color="primary"
          variant="subtle"
          size="lg"
          class="gallery-stagger mb-4"
        />
        <h2
          class="gallery-stagger [animation-delay:80ms] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
        >
          <span
            class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
          >
            Curated
          </span>
          <span class="text-(--ui-text-highlighted)"> Gallery</span>
        </h2>
        <p
          class="gallery-stagger [animation-delay:160ms] mt-3 text-lg text-(--ui-text-muted) max-w-lg mx-auto leading-relaxed"
        >
          A handpicked collection of work from our creative community.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        <div
          v-for="(img, i) in images"
          :key="img.src"
          class="gallery-stagger group relative overflow-hidden rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
          :style="{ animationDelay: `${200 + i * 60}ms` }"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            class="w-full h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width="600"
            height="400"
          >
          <!-- Hover overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4"
            aria-hidden="true"
          >
            <span
              class="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1"
            >
              {{ img.category }}
            </span>
            <span class="text-sm font-bold text-white">
              {{ img.title }}
            </span>
          </div>
          <!-- Corner glow on hover -->
          <div
            class="pointer-events-none absolute -top-4 -right-4 size-20 rounded-full bg-(--ui-primary)/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-stagger {
  animation: galleryFadeUp 0.7s ease-out both;
}

@keyframes galleryFadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-stagger {
    animation: none;
  }
}
</style>
