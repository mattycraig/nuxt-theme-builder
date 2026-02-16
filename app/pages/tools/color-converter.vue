<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";

const meta = TOOL_CATEGORIES[0]!.items.find(
  (i) => String(i.to) === "/tools/color-converter",
);

useSchemaOrg([
  defineSoftwareApp({
    name: "Color Converter — Nuxt UI Theme Builder",
    description: String(meta?.description ?? ""),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    offers: { price: 0, priceCurrency: "USD" },
  }),
]);
</script>

<template>
  <UContainer>
    <div class="space-y-8">
      <UPageHeader
        headline="Tools"
        :title="String(meta?.label ?? 'Color Converter')"
        :description="String(meta?.description ?? '')"
        :links="[
          {
            label: 'All Tools',
            icon: 'i-lucide-arrow-left',
            to: '/tools',
            color: 'neutral' as const,
            variant: 'ghost' as const,
          },
        ]"
      />
      <ToolsColorConverter />
    </div>
  </UContainer>
</template>
