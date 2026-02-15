<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Builder"
    title="Tools"
    item-label="tool"
    :categories="TOOL_CATEGORIES"
  />
</template>
