<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";

const route = useRoute();
const isPreview = computed(() => "preview" in route.query);
</script>

<template>
  <UApp>
    <Analytics />
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="isPreview ? 'preview' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
