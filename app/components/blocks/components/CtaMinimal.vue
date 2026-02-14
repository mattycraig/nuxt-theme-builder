<script setup lang="ts">
const links = [
  {
    label: "Get Started",
    size: "lg" as const,
    color: "primary" as const,
  },
];
</script>

<template>
  <section>
    <UPageCta title="Start building today." :links="links" />
  </section>
</template>
