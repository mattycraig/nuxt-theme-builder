<script setup lang="ts">
import type { Component } from "vue";
import { COMPONENT_CATEGORIES } from "~/utils/navigation";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

function findComponentMeta(s: string) {
  for (const cat of COMPONENT_CATEGORIES) {
    const item = cat.items.find((i) => String(i.to) === `/components/${s}`);
    if (item) return { item, category: cat };
  }
  return null;
}

const componentMeta = computed(() => findComponentMeta(slug.value));

if (!componentMeta.value) {
  throw createError({ statusCode: 404, message: "Component not found" });
}

function kebabToPascal(str: string): string {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// Lazy-load showcase components via Vite glob import
const showcaseModules = import.meta.glob<{ default: Component }>(
  "~/components/showcase/components/*.vue",
);

const showcaseComponent = computed(() => {
  const name = kebabToPascal(slug.value);
  const key = Object.keys(showcaseModules).find((k) =>
    k.endsWith(`/${name}.vue`),
  );
  if (!key || !showcaseModules[key]) return null;
  return defineAsyncComponent(showcaseModules[key]!);
});
</script>

<template>
  <ShowcasePageLayout
    v-if="componentMeta"
    :title="String(componentMeta.item.label ?? '')"
    :description="String(componentMeta.item.description ?? '')"
    :category="componentMeta.category.label"
    :docs-url="`https://ui.nuxt.com/components/${slug}`"
  >
    <component :is="showcaseComponent" v-if="showcaseComponent" />
  </ShowcasePageLayout>
</template>
