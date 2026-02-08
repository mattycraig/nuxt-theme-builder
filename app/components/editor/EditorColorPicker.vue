<script setup lang="ts">
import type { ChromaticPalette } from "~/types/theme";
import { CHROMATIC_PALETTES } from "~/types/theme";
import { CHROMATIC_SWATCH_HEX } from "~/utils/defaults";

defineProps<{
  modelValue: ChromaticPalette;
  label: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: ChromaticPalette];
}>();

const inputId = useId();

const items = CHROMATIC_PALETTES.map((p) => ({
  label: p.charAt(0).toUpperCase() + p.slice(1),
  value: p,
}));
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="text-xs font-medium text-(--ui-text-muted) mb-1 block"
      >{{ label }}</label
    >
    <USelect
      :id="inputId"
      :model-value="modelValue"
      :items="items"
      class="w-full"
      @update:model-value="
        emit('update:modelValue', $event as ChromaticPalette)
      "
    >
      <template #leading>
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border)"
          :style="{ backgroundColor: CHROMATIC_SWATCH_HEX[modelValue] }"
        />
      </template>
    </USelect>
  </div>
</template>
