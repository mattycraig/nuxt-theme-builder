<script setup lang="ts">
import { BLOCK_CATEGORIES } from "~/utils/navigation";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Blocks — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/blocks"],
  }),
]);
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Builder"
    title="Blocks"
    item-label="block"
    :categories="BLOCK_CATEGORIES"
  />
</template>
