<script setup lang="ts">
import type { SelectMenuItem } from "@nuxt/ui";
import type { CustomPalette, NeutralShade, PaletteName } from "~/types/theme";
import { PALETTE_CATEGORY_ORDER, PALETTE_CATEGORIES } from "~/types/theme";
import {
  getPaletteShadeMap,
  getPaletteSwatch,
} from "~/utils/customPalettes";
import { capitalize } from "~/utils/helpers";

const props = withDefaults(
  defineProps<{
    modelValue: PaletteName;
    label: string;
    shade?: NeutralShade;
    customPalettes?: CustomPalette[];
  }>(),
  {
    shade: "500",
    customPalettes: () => [],
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: PaletteName];
  "update:shade": [value: NeutralShade];
  "create-palette": [];
}>();

const inputId = useId();
const open = ref(false);

const builtInItems: SelectMenuItem[] = PALETTE_CATEGORY_ORDER.flatMap(
  (cat, i) => {
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
  },
);

const items = computed<SelectMenuItem[]>(() => {
  if (props.customPalettes.length === 0) return builtInItems;
  return [
    { type: "label" as const, label: "Custom" },
    ...props.customPalettes.map((p) => ({ label: p.name, value: p.name })),
    { type: "separator" as const },
    ...builtInItems,
  ];
});

function swatch(name: string): string | undefined {
  return getPaletteSwatch(name, props.customPalettes);
}

const shadeHexMap = computed(() =>
  getPaletteShadeMap(props.modelValue, props.customPalettes),
);

function requestCreatePalette() {
  open.value = false;
  emit("create-palette");
}
</script>

<template>
  <div>
    <label :for="inputId" class="text-xs font-medium mb-1 block">
      {{ label }}
    </label>
    <USelectMenu
      :id="inputId"
      v-model:open="open"
      :model-value="modelValue"
      value-key="value"
      :items="items"
      :aria-label="`${label}: ${modelValue}`"
      class="w-full"
      :ui="{
        label: 'text-muted uppercase text-xs',
      }"
      @update:model-value="emit('update:modelValue', $event as PaletteName)"
    >
      <template #leading>
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border)"
          :style="{ backgroundColor: swatch(modelValue) }"
        />
      </template>
      <template #item-leading="{ item }">
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 ring-1 ring-(--ui-border) self-center mr-3"
          :style="{
            backgroundColor: swatch((item as { value: string }).value),
          }"
        />
      </template>
      <template #content-bottom>
        <div class="p-1 border-t border-(--ui-border)">
          <UButton
            icon="i-lucide-plus"
            label="Create custom palette"
            size="xs"
            variant="ghost"
            color="neutral"
            block
            class="justify-start"
            @click="requestCreatePalette"
          />
        </div>
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
