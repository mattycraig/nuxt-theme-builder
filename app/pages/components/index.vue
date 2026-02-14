<script setup lang="ts">
import { COMPONENT_CATEGORIES } from "~/utils/navigation";
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Builder"
    title="Components"
    item-label="component"
    :categories="COMPONENT_CATEGORIES"
    compact
  />
</template>
