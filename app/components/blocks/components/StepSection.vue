<script setup lang="ts">
const features = [
  {
    title: "Create your project",
    description:
      "Initialize a new Nuxt application with the UI module pre-configured.",
    icon: "i-lucide-folder-plus",
  },
  {
    title: "Design your theme",
    description:
      "Use the visual editor to customize colors, typography, and spacing tokens.",
    icon: "i-lucide-palette",
  },
  {
    title: "Preview in real time",
    description:
      "See changes reflected instantly across components, blocks, and full page templates.",
    icon: "i-lucide-eye",
  },
  {
    title: "Export and deploy",
    description:
      "Download your theme as app.config.ts, CSS variables, or JSON and add it to your project.",
    icon: "i-lucide-rocket",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <UPageSection
      headline="How It Works"
      title="Four steps to your perfect theme"
      description="From zero to production-ready theme in minutes."
      :features="features"
    />
  </section>
</template>
