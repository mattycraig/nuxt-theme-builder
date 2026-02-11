<script setup lang="ts">
import type { SelectMenuItem } from "@nuxt/ui";
import { FONT_ENTRIES, type FontCategory } from "~/types/theme";

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const inputId = useId();

const categoryLabels: Record<FontCategory, string> = {
  "sans-serif": "Sans Serif",
  serif: "Serif",
  monospace: "Monospace",
  display: "Display",
};

const categoryOrder: FontCategory[] = [
  "sans-serif",
  "serif",
  "monospace",
  "display",
];

const items: SelectMenuItem[] = categoryOrder.flatMap((cat, i) => {
  const fonts = FONT_ENTRIES.filter((f) => f.category === cat);
  if (fonts.length === 0) return [];
  return [
    ...(i > 0 ? [{ type: "separator" as const }] : []),
    { type: "label" as const, label: categoryLabels[cat] },
    ...fonts.map((f) => ({
      label: f.name,
      value: f.name,
    })),
  ];
});
</script>

<template>
  <div>
    <label :for="inputId" class="text-xs font-medium mb-1 block"
      >Font Family</label
    >
    <USelectMenu
      :id="inputId"
      :model-value="modelValue"
      value-key="value"
      :items="items"
      :aria-label="`Font family: ${modelValue}`"
      class="w-full"
      :style="{ fontFamily: modelValue }"
      :ui="{
        label: 'text-muted uppercase text-xs',
      }"
      @update:model-value="emit('update:modelValue', $event as string)"
    >
      <template #item-label="{ item }">
        <span
          v-if="item && typeof item === 'object' && 'label' in item"
          :style="{ fontFamily: item.label as string }"
          class="font-medium"
        >
          {{ item.label }}
        </span>
      </template>
    </USelectMenu>
  </div>
</template>
