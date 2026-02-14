<script setup lang="ts">
const links = [
  {
    label: "Start Building",
    size: "xl" as const,
    color: "primary" as const,
  },
];
</script>

<template>
  <section>
    <UPageHero title="Build something remarkable." :links="links" />
  </section>
</template>
