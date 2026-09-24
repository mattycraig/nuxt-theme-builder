<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { PREVIEW_SHELL_PATH } from "~~/shared/constants/routes";

useCookieConsent();

const route = useRoute();
const isPreview = computed(
  () => "preview" in route.query || route.path === PREVIEW_SHELL_PATH,
);
const isComingSoon = computed(() => route.path === "/coming-soon");

const activeLayout = computed(() => {
  if (isComingSoon.value) return "coming-soon";
  if (isPreview.value) return "preview";
  return "default";
});
</script>

<template>
  <UApp>
    <SpeedInsights />
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="activeLayout">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
