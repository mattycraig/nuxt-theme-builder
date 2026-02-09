<script setup lang="ts">
import type { NeutralPalette } from "~/types/theme";
import { NEUTRAL_PALETTES } from "~/types/theme";
import { NEUTRAL_SWATCH_HEX, NEUTRAL_HEX_MAP } from "~/utils/defaults";
import { capitalize } from "~/utils/helpers";

const props = defineProps<{
  modelValue: NeutralPalette;
  label: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: NeutralPalette];
}>();

const inputId = useId();

const SHADE_KEYS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const items = NEUTRAL_PALETTES.map((p) => ({
  label: capitalize(p),
  value: p,
}));

function getShadeHex(shade: string): string {
  return NEUTRAL_HEX_MAP[props.modelValue]?.[shade] ?? "#888888";
}
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
      @update:model-value="emit('update:modelValue', $event as NeutralPalette)"
    >
      <template #leading>
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border)"
          :style="{ backgroundColor: NEUTRAL_SWATCH_HEX[modelValue] }"
        />
      </template>
      <template #item-leading="{ item }">
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border) self-center mr-3"
          :style="{ backgroundColor: NEUTRAL_SWATCH_HEX[item.value as string] }"
        />
      </template>
    </USelect>

    <!-- Shade preview strip: 50–950 of selected neutral -->
    <div
      class="mt-1.5 flex"
      role="img"
      :aria-label="`${capitalize(modelValue)} palette shades from 50 to 950`"
    >
      <span
        v-for="shade in SHADE_KEYS"
        :key="shade"
        class="flex-1 h-4 first:rounded-l-sm last:rounded-r-sm"
        :style="{ backgroundColor: getShadeHex(shade) }"
      />
    </div>
  </div>
</template>
