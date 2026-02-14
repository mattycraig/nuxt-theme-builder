<script setup lang="ts">
import type { Component } from "vue";
import { BLOCK_CATEGORIES } from "~/utils/navigation";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

function findBlockMeta(s: string) {
  for (const cat of BLOCK_CATEGORIES) {
    const item = cat.items.find((i) => String(i.to) === `/blocks/${s}`);
    if (item) return { item, category: cat };
  }
  return null;
}

const blockMeta = computed(() => findBlockMeta(slug.value));

if (!blockMeta.value) {
  throw createError({ statusCode: 404, message: "Block not found" });
}

function kebabToPascal(str: string): string {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

const blockModules = import.meta.glob<{ default: Component }>(
  "~/components/blocks/content/*.vue",
);

const blockContent = computed(() => {
  const name = kebabToPascal(slug.value);
  const key = Object.keys(blockModules).find((k) => k.endsWith(`/${name}.vue`));
  if (!key || !blockModules[key]) return null;
  return defineAsyncComponent(blockModules[key]!);
});
</script>

<template>
  <UContainer v-if="blockMeta">
    <div class="space-y-8">
      <UPageHeader
        headline="Blocks"
        :title="String(blockMeta.item.label ?? '')"
        :description="String(blockMeta.item.description ?? '')"
        :links="[
          {
            label: 'All Blocks',
            icon: 'i-lucide-arrow-left',
            to: '/blocks',
            color: 'neutral' as const,
            variant: 'ghost' as const,
          },
        ]"
      />
      <div class="space-y-12">
        <component :is="blockContent" v-if="blockContent" />
      </div>
    </div>
  </UContainer>
</template>
