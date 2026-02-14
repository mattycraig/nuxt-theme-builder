<script setup lang="ts">
const features = [
  {
    title: "10,000+",
    description: "Active users building themes every day",
    icon: "i-lucide-users",
  },
  {
    title: "50ms",
    description: "Average theme apply time",
    icon: "i-lucide-zap",
  },
  {
    title: "500+",
    description: "Pre-built presets and community themes",
    icon: "i-lucide-layers",
  },
  {
    title: "24/7",
    description: "Infrastructure uptime and monitoring",
    icon: "i-lucide-clock",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <UPageSection
      headline="By the Numbers"
      title="Built for scale and performance"
      description="Our platform handles millions of theme operations daily with blazing-fast response times."
      :features="features"
    />
  </section>
</template>
