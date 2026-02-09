<script setup lang="ts">
import type { ChromaticPalette, NeutralShade } from "~/types/theme";
import { CHROMATIC_PALETTES, NUMERIC_SHADE_KEYS } from "~/types/theme";
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

function getShadeHex(shade: string): string {
  return CHROMATIC_HEX_MAP[props.modelValue]?.[shade] ?? "#888888";
}

function isLightShade(shade: string): boolean {
  const lightShades = ["50", "100", "200", "300", "white"];
  return lightShades.includes(shade);
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

    <!-- Shade selector: white + 50–950 strip + black -->
    <div
      class="mt-1.5 flex items-center gap-1"
      role="radiogroup"
      :aria-label="`Select ${label} shade`"
    >
      <!-- White -->
      <button
        type="button"
        role="radio"
        :aria-checked="shade === 'white'"
        aria-label="White"
        class="size-5 shrink-0 rounded-sm border cursor-pointer transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        :class="
          shade === 'white'
            ? 'ring-2 ring-gray-800 border-gray-800'
            : 'border-(--ui-border) hover:border-(--ui-border-accented)'
        "
        :style="{ backgroundColor: '#ffffff' }"
        @click="emit('update:shade', 'white')"
      />

      <!-- Numeric shades 50–950 -->
      <div class="flex flex-1 min-w-0">
        <button
          v-for="s in NUMERIC_SHADE_KEYS"
          :key="s"
          type="button"
          role="radio"
          :aria-checked="shade === s"
          :aria-label="`${capitalize(modelValue)} ${s}`"
          class="flex-1 h-5 first:rounded-l-sm last:rounded-r-sm relative cursor-pointer transition-transform hover:scale-y-125 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
          :class="[
            shade === s
              ? 'ring-2 z-10 scale-y-[1.4] ' +
                (isLightShade(s) ? 'ring-gray-800' : 'ring-white')
              : '',
          ]"
          :style="{ backgroundColor: getShadeHex(s) }"
          @click="emit('update:shade', s)"
        />
      </div>

      <!-- Black -->
      <button
        type="button"
        role="radio"
        :aria-checked="shade === 'black'"
        aria-label="Black"
        class="size-5 shrink-0 rounded-sm border cursor-pointer transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        :class="
          shade === 'black'
            ? 'ring-2 ring-white border-white'
            : 'border-(--ui-border) hover:border-(--ui-border-accented)'
        "
        :style="{ backgroundColor: '#000000' }"
        @click="emit('update:shade', 'black')"
      />
    </div>
  </div>
</template>
