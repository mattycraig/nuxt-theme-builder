<script setup lang="ts">
import type { NeutralPalette } from "~/types/theme";
import { NEUTRAL_PALETTES } from "~/types/theme";
import { NEUTRAL_SWATCH_HEX } from "~/utils/defaults";

defineProps<{
  modelValue: NeutralPalette;
  label: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: NeutralPalette];
}>();

const items = NEUTRAL_PALETTES.map((p) => ({
  label: p.charAt(0).toUpperCase() + p.slice(1),
  value: p,
}));
</script>

<template>
  <div>
    <label class="text-xs font-medium text-(--ui-text-muted) mb-1 block">{{
      label
    }}</label>
    <USelect
      :model-value="modelValue"
      :items="items"
      class="w-full"
      @update:model-value="emit('update:modelValue', $event as NeutralPalette)"
    >
      <template #leading>
        <span
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border)"
          :style="{ backgroundColor: NEUTRAL_SWATCH_HEX[modelValue] }"
        />
      </template>
    </USelect>
  </div>
</template>
