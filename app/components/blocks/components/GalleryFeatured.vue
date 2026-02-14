<script setup lang="ts">
const featured = {
  src: "https://picsum.photos/seed/feat-cinema/1200/600",
  alt: "Dashboard redesign project showcase",
  title: "Project Showcase: Dashboard Re-design",
  description:
    "A complete UI overhaul using the theme builder's export workflow.",
  category: "Case Study",
  stats: { views: "2.4k", likes: "186" },
};

const thumbnails = [
  {
    src: "https://picsum.photos/seed/cin1/400/300",
    alt: "Mobile interface concept",
    title: "Mobile Flow",
  },
  {
    src: "https://picsum.photos/seed/cin2/400/300",
    alt: "Component variations library",
    title: "Components",
  },
  {
    src: "https://picsum.photos/seed/cin3/400/300",
    alt: "Dark mode preview",
    title: "Dark Mode",
  },
  {
    src: "https://picsum.photos/seed/cin4/400/300",
    alt: "Color system documentation",
    title: "Color System",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Decorative ring elements -->
    <div
      class="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full border border-(--ui-primary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full border border-(--ui-secondary)/8"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Header -->
      <div class="text-center mb-4">
        <UBadge
          :label="featured.category"
          color="primary"
          variant="subtle"
          size="lg"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          Featured Work
        </h2>
      </div>

      <!-- Featured image area -->
      <div
        class="featured-entrance relative group overflow-hidden rounded-2xl border border-(--ui-border) shadow-2xl cursor-pointer"
      >
        <img
          :src="featured.src"
          :alt="featured.alt"
          class="w-full h-64 sm:h-[28rem] object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        >
        <!-- Cinematic gradient overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
          aria-hidden="true"
        />
        <!-- Content on the featured image -->
        <div class="absolute bottom-0 inset-x-0 p-6 sm:p-8">
          <div class="flex items-end justify-between gap-4">
            <div>
              <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">
                {{ featured.title }}
              </h3>
              <p class="text-sm text-white/75 max-w-md">
                {{ featured.description }}
              </p>
            </div>
            <div class="hidden sm:flex items-center gap-3 shrink-0">
              <div class="flex items-center gap-1.5 text-white/70">
                <UIcon name="i-lucide-eye" class="size-4" aria-hidden="true" />
                <span class="text-sm font-medium">{{
                  featured.stats.views
                }}</span>
              </div>
              <div class="flex items-center gap-1.5 text-white/70">
                <UIcon
                  name="i-lucide-heart"
                  class="size-4"
                  aria-hidden="true"
                />
                <span class="text-sm font-medium">{{
                  featured.stats.likes
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Floating export card -->
        <div
          class="featured-float absolute -bottom-3 -right-3 sm:bottom-6 sm:right-6 rounded-xl border border-(--ui-border)/60 bg-(--ui-bg)/80 backdrop-blur-lg px-4 py-3 shadow-lg hidden sm:flex items-center gap-3"
        >
          <div
            class="size-8 rounded-full bg-(--ui-primary)/15 flex items-center justify-center"
          >
            <UIcon
              name="i-lucide-image"
              class="size-4 text-(--ui-primary)"
              aria-hidden="true"
            />
          </div>
          <div>
            <p class="text-xs font-semibold text-(--ui-text-highlighted)">
              View Collection
            </p>
            <p class="text-xs text-(--ui-text-muted)">12 pieces</p>
          </div>
        </div>
      </div>

      <!-- Thumbnail strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          v-for="(thumb, i) in thumbnails"
          :key="thumb.src"
          class="featured-stagger group relative overflow-hidden rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
          :style="{ animationDelay: `${400 + i * 80}ms` }"
        >
          <img
            :src="thumb.src"
            :alt="thumb.alt"
            class="w-full h-32 sm:h-36 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          >
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3"
          >
            <span class="text-xs font-semibold text-white">{{
              thumb.title
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-entrance {
  animation: featuredSlideUp 0.8s ease-out both;
}

.featured-float {
  animation: featuredFloatUp 0.7s ease-out 0.5s both;
}

.featured-stagger {
  animation: featuredFadeUp 0.6s ease-out both;
}

@keyframes featuredSlideUp {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes featuredFloatUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes featuredFadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .featured-entrance,
  .featured-float,
  .featured-stagger {
    animation: none;
  }
}
</style>
