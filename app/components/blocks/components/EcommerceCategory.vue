<script setup lang="ts">
const categories = [
  {
    name: "Dashboard Themes",
    count: 24,
    icon: "i-lucide-layout-dashboard",
    image: "https://picsum.photos/seed/cat1/600/400",
    accent: "primary",
  },
  {
    name: "Landing Pages",
    count: 18,
    icon: "i-lucide-rocket",
    image: "https://picsum.photos/seed/cat2/600/400",
    accent: "secondary",
  },
  {
    name: "E-commerce",
    count: 12,
    icon: "i-lucide-shopping-bag",
    image: "https://picsum.photos/seed/cat3/600/400",
    accent: "primary",
  },
  {
    name: "Blog Templates",
    count: 15,
    icon: "i-lucide-file-text",
    image: "https://picsum.photos/seed/cat4/600/400",
    accent: "secondary",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Warm gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5"
      aria-hidden="true"
    />

    <!-- Decorative rings -->
    <div
      class="pointer-events-none absolute -top-16 right-8 size-[18rem] rounded-full border border-(--ui-primary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-12 -left-12 size-[12rem] rounded-full border border-(--ui-secondary)/10"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
        >
          Explore
        </p>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) tracking-tight"
        >
          Browse by category
        </h2>
        <p class="mt-3 text-lg text-(--ui-text-muted) max-w-lg mx-auto">
          Find the perfect starting point for your next project.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(cat, i) in categories"
          :key="cat.name"
          class="ecom-cat-enter relative group cursor-pointer"
          :style="{ animationDelay: `${i * 100}ms` }"
        >
          <!-- Glow halo -->
          <div
            class="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            :class="
              cat.accent === 'primary'
                ? 'bg-(--ui-primary)/8'
                : 'bg-(--ui-secondary)/8'
            "
            style="filter: blur(16px)"
            aria-hidden="true"
          />

          <div
            class="relative rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated)/80 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-(--ui-primary)/30"
          >
            <!-- Image -->
            <div class="relative overflow-hidden h-40">
              <img
                :src="cat.image"
                :alt="cat.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              >
              <div
                class="absolute inset-0 bg-gradient-to-t from-[var(--ui-bg)]/70 to-transparent"
                aria-hidden="true"
              />
              <!-- Item count overlay -->
              <div class="absolute bottom-3 right-3">
                <UBadge
                  :label="`${cat.count} items`"
                  color="primary"
                  variant="subtle"
                  size="sm"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="p-4 flex items-center gap-3">
              <div
                class="flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                :class="
                  cat.accent === 'primary'
                    ? 'bg-(--ui-primary)/12'
                    : 'bg-(--ui-secondary)/12'
                "
              >
                <UIcon
                  :name="cat.icon"
                  class="size-5"
                  :class="
                    cat.accent === 'primary'
                      ? 'text-(--ui-primary)'
                      : 'text-(--ui-secondary)'
                  "
                  aria-hidden="true"
                />
              </div>
              <h3
                class="font-semibold text-(--ui-text-highlighted) group-hover:text-(--ui-primary) transition-colors duration-200"
              >
                {{ cat.name }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecom-cat-enter {
  animation: ecomCatUp 0.6s ease-out both;
}

@keyframes ecomCatUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ecom-cat-enter {
    animation: none;
  }
}
</style>
