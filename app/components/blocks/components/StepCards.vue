<script setup lang="ts">
const steps = [
  {
    icon: "i-lucide-wand-2",
    title: "Design",
    description: "Use the visual editor or AI to generate your theme.",
  },
  {
    icon: "i-lucide-monitor",
    title: "Preview",
    description: "See changes across real components and full pages.",
  },
  {
    icon: "i-lucide-download",
    title: "Export",
    description: "Download as app.config.ts, CSS, or JSON.",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Simple workflow
        </h2>
      </div>
      <UPageGrid>
        <UPageCard
          v-for="(step, i) in steps"
          :key="step.title"
          :icon="step.icon"
          :title="`Step ${i + 1}: ${step.title}`"
          :description="step.description"
        />
      </UPageGrid>
    </div>
  </section>
</template>
