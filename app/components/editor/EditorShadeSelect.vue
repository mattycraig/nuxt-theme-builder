<script setup lang="ts">
import type { NeutralShade, NeutralPalette } from "~/types/theme";
import { SHADE_VALUES } from "~/types/theme";
import { NEUTRAL_HEX_MAP } from "~/utils/defaults";

const props = defineProps<{
  modelValue: NeutralShade;
  label: string;
  neutralPalette: NeutralPalette;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: NeutralShade];
}>();

const items = SHADE_VALUES.map((s) => ({
  label: s,
  value: s,
}));

function getSwatchHex(shade: NeutralShade): string {
  return NEUTRAL_HEX_MAP[props.neutralPalette]?.[shade] ?? "#888888";
}
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
      @update:model-value="emit('update:modelValue', $event as NeutralShade)"
    >
      <template #leading>
        <span
          class="size-3 rounded-full inline-block shrink-0 border border-[var(--ui-border)]"
          :style="{ backgroundColor: getSwatchHex(modelValue) }"
        />
      </template>
    </USelect>
  </div>
</template>
