<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { COLOR_VISION_OPTIONS } from "~/utils/colorVision";

const { mode, active, setMode } = useColorVision();

const items = computed<DropdownMenuItem[][]>(() => [
  [{ label: "Simulate color vision", type: "label" }],
  COLOR_VISION_OPTIONS.map((option) => ({
    label: option.label,
    description: option.description,
    type: "checkbox" as const,
    checked: mode.value === option.id,
    onUpdateChecked: () => setMode(option.id),
  })),
]);
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UTooltip :text="active ? `Simulating ${active.label}` : 'Color vision'">
      <UButton
        icon="i-lucide-eye"
        :label="active?.label"
        :aria-label="
          active
            ? `Color vision simulation: ${active.label}`
            : 'Simulate color vision'
        "
        size="sm"
        variant="outline"
        :color="active ? 'primary' : 'neutral'"
      />
    </UTooltip>
  </UDropdownMenu>
</template>
