<script setup lang="ts">
const features = [
  {
    icon: "i-lucide-palette",
    title: "Visual Builder",
    description:
      "Design your theme visually with an intuitive point-and-click editor. Changes reflect instantly across all components.",
  },
  {
    icon: "i-lucide-code",
    title: "Export Anywhere",
    description:
      "Generate ready-to-use config files, CSS variables, or JSON. Drop into any Nuxt project in seconds.",
  },
  {
    icon: "i-lucide-moon",
    title: "Dark Mode",
    description:
      "First-class dark mode support with independent light and dark palettes. Automatic contrast optimization.",
  },
  {
    icon: "i-lucide-component",
    title: "125+ Components",
    description:
      "Every component in Nuxt UI v4 is themed and ready. From buttons to data tables, everything stays consistent.",
  },
  {
    icon: "i-lucide-smartphone",
    title: "Fully Responsive",
    description:
      "Components adapt to every screen size. Build once, deploy everywhere — mobile, tablet, and desktop.",
  },
  {
    icon: "i-lucide-zap",
    title: "Blazing Fast",
    description:
      "Built on Nuxt 4 and Tailwind CSS v4 for optimal performance. Tiny bundles, fast renders, smooth interactions.",
  },
];
</script>

<template>
  <section>
    <UPageSection
      headline="Features"
      title="Everything you need to build"
      description="A complete toolkit for designing, previewing, and shipping polished design systems."
      :features="features"
    />
  </section>
</template>
