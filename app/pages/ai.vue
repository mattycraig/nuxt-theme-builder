<script setup lang="ts">
definePageMeta({
  layout: "ai",
});

useSeoMeta({
  title: "AI Theme Generator — Nuxt UI Theme Builder",
  description:
    "Generate custom Nuxt UI themes with AI. Describe your design vision and get a complete theme configuration you can apply instantly.",
});
</script>

<template>
  <AiChat />
</template>
