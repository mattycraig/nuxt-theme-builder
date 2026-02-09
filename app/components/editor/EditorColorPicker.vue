<script setup lang="ts">
import type { ChromaticPalette } from "~/types/theme";
import { CHROMATIC_PALETTES } from "~/types/theme";
import { CHROMATIC_SWATCH_HEX } from "~/utils/defaults";
import { capitalize } from "~/utils/helpers";

defineProps<{
  modelValue: ChromaticPalette;
  label: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: ChromaticPalette];
}>();

const inputId = useId();

const items = CHROMATIC_PALETTES.map((p) => ({
  label: capitalize(p),
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
      <template #item-leading="{ item }">
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border) self-center mr-3"
          :style="{
            backgroundColor: CHROMATIC_SWATCH_HEX[item.value as string],
          }"
        />
      </template>
    </USelect>
  </div>
</template>
