<script setup lang="ts">
import { BLOCK_CATEGORIES } from "~/utils/navigation";
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Builder"
    title="Blocks"
    item-label="block"
    :categories="BLOCK_CATEGORIES"
  />
</template>
