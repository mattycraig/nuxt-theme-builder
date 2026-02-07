<script setup lang="ts">
const route = useRoute();
const isPreview = computed(() => "preview" in route.query);
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="isPreview ? 'preview' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
