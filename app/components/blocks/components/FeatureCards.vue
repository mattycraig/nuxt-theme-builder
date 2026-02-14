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
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 sm:mb-16">
        <p class="text-sm font-semibold text-(--ui-primary) mb-2">
          Capabilities
        </p>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Powerful features, simple interface
        </h2>
        <p class="text-lg text-(--ui-text-muted) max-w-2xl mx-auto">
          Everything you need to create a cohesive design system in minutes.
        </p>
      </div>
      <UPageGrid>
        <UPageCard
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </UPageGrid>
    </div>
  </section>
</template>
