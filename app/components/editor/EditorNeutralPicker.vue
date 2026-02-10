<script setup lang="ts">
import type { NeutralPalette } from "~/types/theme";
import { NEUTRAL_PALETTES, NUMERIC_SHADE_KEYS } from "~/types/theme";
import { NEUTRAL_SWATCH_HEX, NEUTRAL_HEX_MAP } from "~/utils/defaults";
import { capitalize } from "~/utils/helpers";

defineProps<{
  modelValue: NeutralPalette;
  label: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: NeutralPalette];
}>();

const inputId = useId();

const items = NEUTRAL_PALETTES.map((p) => ({
  label: capitalize(p),
  value: p,
}));

function getShadeHex(palette: NeutralPalette, shade: string): string {
  return NEUTRAL_HEX_MAP[palette]?.[shade] ?? "#888888";
}
</script>

<template>
  <div>
    <label :for="inputId" class="text-xs font-medium mb-1 block">
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

    <div
      role="radiogroup"
      :aria-label="`${label} palette picker`"
      class="mt-2 flex flex-col gap-1"
    >
      <button
        v-for="palette in NEUTRAL_PALETTES"
        :key="palette"
        type="button"
        role="radio"
        :aria-checked="modelValue === palette"
        :aria-label="`${capitalize(palette)} neutral palette`"
        class="group flex items-center gap-2 w-full rounded-md px-1.5 py-1 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary) focus-visible:ring-offset-1"
        :class="
          modelValue === palette
            ? 'bg-(--ui-bg-elevated) ring-1 ring-(--ui-border-accented)'
            : 'hover:bg-(--ui-bg-muted)'
        "
        @click="emit('update:modelValue', palette)"
      >
        <span
          class="text-xs w-12 shrink-0 text-left truncate"
          :class="
            modelValue === palette
              ? 'font-semibold text-(--ui-text-highlighted)'
              : 'text-(--ui-text-muted) group-hover:text-(--ui-text-default)'
          "
        >
          {{ capitalize(palette) }}
        </span>
        <span class="flex flex-1 min-w-0">
          <span
            v-for="shade in NUMERIC_SHADE_KEYS"
            :key="shade"
            class="flex-1 h-5 first:rounded-l-sm last:rounded-r-sm"
            :style="{ backgroundColor: getShadeHex(palette, shade) }"
          />
        </span>
      </button>
    </div>
  </div>
</template>
