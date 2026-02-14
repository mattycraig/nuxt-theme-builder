<script setup lang="ts">
const features = [
  {
    icon: "i-lucide-layout-dashboard",
    title: "Dashboard Templates",
    description:
      "Pre-built admin layouts with charts, tables, and KPIs. Fully responsive and production-ready.",
    span: "lg:col-span-2",
  },
  {
    icon: "i-lucide-sparkles",
    title: "AI-Powered",
    description:
      "Generate themes with natural language prompts. Describe your vision and let AI do the work.",
    span: "",
  },
  {
    icon: "i-lucide-git-merge",
    title: "Version History",
    description:
      "Undo, redo, and compare theme snapshots. Never lose a design iteration.",
    span: "",
  },
  {
    icon: "i-lucide-globe",
    title: "Internationalization",
    description:
      "RTL support, locale-aware formatting, and accessible text rendering for a global audience.",
    span: "lg:col-span-2",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold text-(--ui-primary) mb-2">Platform</p>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          A feature for every need
        </h2>
      </div>
      <UPageGrid>
        <UPageCard
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
          :class="feature.span"
          variant="subtle"
        />
      </UPageGrid>
    </div>
  </section>
</template>
