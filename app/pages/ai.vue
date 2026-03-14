<script setup lang="ts">
import {
  SITE_URL,
  OG_IMAGE_URL,
  INDEXABLE_ROBOTS,
} from "~/utils/seoDescriptions";

definePageMeta({
  layout: "ai",
});

const title = "AI Theme Generator — Nuxt UI Theme Builder";
const description =
  "Generate custom Nuxt UI themes with AI. Describe your design vision and get a complete theme configuration you can apply instantly.";

useSeoMeta({
  title,
  description,
  robots: INDEXABLE_ROBOTS,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogImage: OG_IMAGE_URL,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: OG_IMAGE_URL,
});

useHead({
  link: [{ rel: "canonical", href: `${SITE_URL}/ai` }],
});

useSchemaOrg([
  defineWebPage({
    name: title,
    description,
  }),
]);
</script>

<template>
  <AiChat />
</template>
