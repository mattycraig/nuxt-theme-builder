<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";

useThemeApply();
</script>

<template>
  <main>
    <slot />
    <SharedSaveThemeModal />
  </main>
</template>
