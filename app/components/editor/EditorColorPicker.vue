<script setup lang="ts">
import type { ChromaticPalette, NeutralShade } from "~/types/theme";
import { CHROMATIC_PALETTES } from "~/types/theme";
import { CHROMATIC_SWATCH_HEX, CHROMATIC_HEX_MAP } from "~/utils/defaults";
import { capitalize } from "~/utils/helpers";

const props = withDefaults(
  defineProps<{
    modelValue: ChromaticPalette;
    label: string;
    shade?: NeutralShade;
  }>(),
  {
    shade: "500",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: ChromaticPalette];
  "update:shade": [value: NeutralShade];
}>();

const inputId = useId();

const items = CHROMATIC_PALETTES.map((p) => ({
  label: capitalize(p),
  value: p,
}));

const shadeHexMap = computed(() =>
  CHROMATIC_HEX_MAP[props.modelValue] ?? {},
);
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="text-xs font-medium text-(--ui-text-muted) mb-1 block"
    >
      {{ label }}
    </label>
    <USelect
      :id="inputId"
      :model-value="modelValue"
      :items="items"
      :aria-label="`${label}: ${modelValue}`"
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

    <EditorShadeStrip
      class="mt-1.5"
      :model-value="shade"
      :hex-map="shadeHexMap"
      :aria-label="`Select ${label} shade`"
      @update:model-value="emit('update:shade', $event)"
    />
  </div>
</template>
