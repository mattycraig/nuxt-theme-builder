<script setup lang="ts">
import { TEMPLATE_CATEGORIES } from "~/utils/navigation";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Templates — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/templates"],
  }),
]);
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Builder"
    title="Templates"
    item-label="template"
    :categories="TEMPLATE_CATEGORIES"
  >
    <template #description="{ totalCount }">
      {{ totalCount }} full page templates across
      {{ TEMPLATE_CATEGORIES.length }}
      {{ TEMPLATE_CATEGORIES.length === 1 ? "category" : "categories" }}
      — production-ready layouts showcasing your current theme.
    </template>
  </SharedCategoryIndex>
</template>
