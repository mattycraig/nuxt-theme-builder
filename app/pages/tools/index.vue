<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Design Tools — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/tools"],
  }),
]);
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Builder"
    title="Tools"
    item-label="tool"
    :categories="TOOL_CATEGORIES"
  />
</template>
