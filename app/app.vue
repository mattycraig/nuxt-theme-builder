<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";

const route = useRoute();
const isPreview = computed(() => "preview" in route.query);
const isComingSoon = computed(() => route.path === "/coming-soon");

const activeLayout = computed(() => {
  if (isComingSoon.value) return "coming-soon";
  if (isPreview.value) return "preview";
  return "default";
});
</script>

<template>
  <UApp>
    <Analytics />
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="activeLayout">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
