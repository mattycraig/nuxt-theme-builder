<script setup lang="ts">
const features = [
  {
    icon: "i-lucide-layers",
    title: "Design Tokens",
    description:
      "Centralized tokens for colors, typography, spacing, shadows, and radii. Change once, update everywhere.",
  },
  {
    icon: "i-lucide-monitor",
    title: "Live Preview",
    description:
      "See every change reflected instantly across 125+ components. Toggle between light and dark mode in real time.",
  },
  {
    icon: "i-lucide-download",
    title: "One-Click Export",
    description:
      "Export your theme as app.config.ts, CSS custom properties, or JSON. Ready to drop into any Nuxt project.",
  },
  {
    icon: "i-lucide-history",
    title: "Undo & Redo",
    description:
      "Full change history with unlimited undo and redo. Experiment freely without losing previous work.",
  },
];

function padIndex(i: number): string {
  return String(i + 1).padStart(2, "0");
}
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 sm:mb-16">
        <UBadge
          label="Capabilities"
          color="primary"
          variant="subtle"
          size="sm"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Powerful features, simple interface
        </h2>
        <p class="text-lg text-(--ui-text-muted) max-w-2xl mx-auto">
          Everything you need to create a cohesive design system in minutes.
        </p>
      </div>

      <!-- Numbered editorial grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="feat-card-entry group relative"
          :style="{ animationDelay: `${i * 100}ms` }"
        >
          <div
            class="relative flex gap-5 rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg) p-6 transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-lg"
          >
            <!-- Gradient accent stripe -->
            <div
              class="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-(--ui-primary)/60 to-(--ui-primary)/10 transition-all duration-300 group-hover:from-(--ui-primary) group-hover:to-(--ui-secondary)/40"
              aria-hidden="true"
            />

            <!-- Large step number -->
            <div class="shrink-0 pl-3">
              <span
                class="text-4xl font-black tracking-tighter text-(--ui-primary)/15 transition-colors duration-300 group-hover:text-(--ui-primary)/30"
                aria-hidden="true"
              >
                {{ padIndex(i) }}
              </span>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0 pt-1">
              <div class="flex items-center gap-2.5 mb-2">
                <div
                  class="size-8 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center ring-1 ring-(--ui-primary)/10 transition-all duration-300 group-hover:bg-(--ui-primary)/15 group-hover:ring-(--ui-primary)/25"
                >
                  <UIcon
                    :name="feature.icon"
                    class="size-4 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  class="text-base font-semibold text-(--ui-text-highlighted)"
                >
                  {{ feature.title }}
                </h3>
              </div>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feat-card-entry {
  animation: featCardSlide 0.6s ease-out both;
}

@keyframes featCardSlide {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .feat-card-entry {
    animation: none;
  }
}
</style>
