<script setup lang="ts">
const products = [
  {
    name: "Starter Theme Pack",
    price: "$29",
    image: "https://picsum.photos/seed/prod1/400/400",
    badge: "New",
    accent: "primary",
  },
  {
    name: "Pro Design System",
    price: "$79",
    image: "https://picsum.photos/seed/prod2/400/400",
    badge: "Popular",
    accent: "secondary",
  },
  {
    name: "Enterprise Kit",
    price: "$199",
    image: "https://picsum.photos/seed/prod3/400/400",
    badge: "",
    accent: "primary",
  },
  {
    name: "Component Library",
    price: "$49",
    image: "https://picsum.photos/seed/prod4/400/400",
    badge: "Sale",
    accent: "secondary",
  },
  {
    name: "Icon Collection",
    price: "$19",
    image: "https://picsum.photos/seed/prod5/400/400",
    badge: "",
    accent: "primary",
  },
  {
    name: "Template Bundle",
    price: "$99",
    image: "https://picsum.photos/seed/prod6/400/400",
    badge: "",
    accent: "secondary",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Atmospheric gradient orbs -->
    <div
      class="pointer-events-none absolute -top-32 -left-24 size-[30rem] rounded-full bg-(--ui-primary)/10 blur-[120px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 -right-16 size-[22rem] rounded-full bg-(--ui-secondary)/8 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-14">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
        >
          Our Collection
        </p>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) tracking-tight"
        >
          Shop themes
        </h2>
        <p class="mt-3 text-lg text-(--ui-text-muted) max-w-xl mx-auto">
          Pre-built themes and design resources for every project.
        </p>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(p, i) in products"
          :key="p.name"
          class="ecom-grid-enter relative group cursor-pointer"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <!-- Glow halo -->
          <div
            class="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            :class="
              p.accent === 'primary'
                ? 'bg-(--ui-primary)/8'
                : 'bg-(--ui-secondary)/8'
            "
            style="filter: blur(18px)"
            aria-hidden="true"
          />

          <div
            class="relative rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated)/80 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-(--ui-primary)/30"
          >
            <!-- Image -->
            <div class="relative overflow-hidden">
              <img
                :src="p.image"
                :alt="p.name"
                class="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width="400"
                height="400"
              >
              <!-- Gradient overlay on hover -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-[var(--ui-bg)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <UBadge
                v-if="p.badge"
                :label="p.badge"
                color="primary"
                variant="subtle"
                class="absolute top-3 left-3"
              />
            </div>

            <!-- Content -->
            <div class="p-4">
              <h3
                class="font-semibold text-(--ui-text-highlighted) group-hover:text-(--ui-primary) transition-colors duration-200"
              >
                {{ p.name }}
              </h3>
              <p
                class="mt-1 text-lg font-bold bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
              >
                {{ p.price }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecom-grid-enter {
  animation: ecomFadeUp 0.6s ease-out both;
}

@keyframes ecomFadeUp {
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
  .ecom-grid-enter {
    animation: none;
  }
}
</style>
