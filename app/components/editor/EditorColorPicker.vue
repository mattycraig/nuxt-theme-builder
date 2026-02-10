<script setup lang="ts">
import type { SelectMenuItem } from "@nuxt/ui";
import type { AnyPalette, NeutralShade } from "~/types/theme";
import { PALETTE_CATEGORY_ORDER, PALETTE_CATEGORIES } from "~/types/theme";
import { ALL_SWATCH_HEX, ALL_HEX_MAP } from "~/utils/defaults";
import { capitalize } from "~/utils/helpers";

const props = withDefaults(
  defineProps<{
    modelValue: AnyPalette;
    label: string;
    shade?: NeutralShade;
  }>(),
  {
    shade: "500",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: AnyPalette];
  "update:shade": [value: NeutralShade];
}>();

const inputId = useId();

const items: SelectMenuItem[] = PALETTE_CATEGORY_ORDER.flatMap((cat, i) => {
  const palettes = PALETTE_CATEGORIES[cat];
  if (palettes.length === 0) return [];
  return [
    ...(i > 0 ? [{ type: "separator" as const }] : []),
    { type: "label" as const, label: cat },
    ...palettes.map((p) => ({
      label: capitalize(p),
      value: p,
    })),
  ];
});

const shadeHexMap = computed(() => ALL_HEX_MAP[props.modelValue] ?? {});
</script>

<template>
  <div>
    <label :for="inputId" class="text-xs font-medium mb-1 block">
      {{ label }}
    </label>
    <USelectMenu
      :id="inputId"
      :model-value="modelValue"
      value-key="value"
      :items="items"
      :aria-label="`${label}: ${modelValue}`"
      class="w-full"
      :ui="{
        label: 'text-muted uppercase text-xs',
      }"
      @update:model-value="emit('update:modelValue', $event as AnyPalette)"
    >
      <template #leading>
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border)"
          :style="{ backgroundColor: ALL_SWATCH_HEX[modelValue] }"
        />
      </template>
      <template #item-leading="{ item }">
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border) self-center mr-3"
          :style="{
            backgroundColor: ALL_SWATCH_HEX[(item as { value: string }).value],
          }"
        />
      </template>
    </USelectMenu>

    <EditorShadeStrip
      class="mt-1.5"
      :model-value="shade"
      :hex-map="shadeHexMap"
      :aria-label="`Select ${label} shade`"
      @update:model-value="emit('update:shade', $event)"
    />
  </div>
</template>
