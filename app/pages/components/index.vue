<script setup lang="ts">
import { COMPONENT_CATEGORIES } from "~/utils/navigation";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Components — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/components"],
  }),
]);
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Builder"
    title="Components"
    item-label="component"
    :categories="COMPONENT_CATEGORIES"
  />
</template>
