<script setup lang="ts">
const links = [
  {
    label: "Get Started",
    icon: "i-lucide-arrow-right",
    trailing: true,
    size: "xl" as const,
    color: "primary" as const,
  },
  {
    label: "Star on GitHub",
    icon: "i-lucide-star",
    size: "xl" as const,
    variant: "outline" as const,
    color: "neutral" as const,
  },
];
</script>

<template>
  <section>
    <UPageHero
      headline="Open Source"
      title="The Nuxt UI Theme Builder"
      description="Design, preview, and export beautiful theme configurations for Nuxt UI v4. Real-time editing with live component previews across light and dark modes."
      :links="links"
    />
  </section>
</template>
