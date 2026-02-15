<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";

const meta = TOOL_CATEGORIES[0]!.items.find(
  (i) => String(i.to) === "/tools/contrast-checker",
);
</script>

<template>
  <UContainer>
    <div class="space-y-8">
      <UPageHeader
        headline="Tools"
        :title="String(meta?.label ?? 'Contrast Checker')"
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
      <ToolsContrastChecker />
    </div>
  </UContainer>
</template>
