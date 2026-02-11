<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";

useThemeApply();
</script>

<template>
  <div>
    <slot />
    <SaveThemeModal />
  </div>
</template>
