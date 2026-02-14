<script setup lang="ts">
const features = [
  {
    title: "Visual Editing",
    description:
      "See every change instantly across all components as you build your theme.",
    icon: "i-lucide-eye",
  },
  {
    title: "Semantic Tokens",
    description:
      "Use named color roles — primary, secondary, neutral — instead of raw hex values.",
    icon: "i-lucide-palette",
  },
  {
    title: "Dark Mode Ready",
    description:
      "Every theme supports independent light and dark mode configurations.",
    icon: "i-lucide-moon",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <UPageSection
      headline="Why Choose Us"
      title="Design meets engineering"
      description="Our platform bridges the gap between design intent and production code, giving teams a shared language for visual quality."
      :features="features"
    />
  </section>
</template>
