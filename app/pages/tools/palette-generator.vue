<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";

const meta = TOOL_CATEGORIES[0]!.items.find(
  (i) => String(i.to) === "/tools/palette-generator",
);
</script>

<template>
  <UContainer>
    <div class="space-y-8">
      <UPageHeader
        headline="Tools"
        :title="String(meta?.label ?? 'Palette Generator')"
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
      <ToolsPaletteGenerator />
    </div>
  </UContainer>
</template>
