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

const inputId = useId();

const NUMERIC_SHADES: NeutralShade[] = [
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
];

const items = SHADE_VALUES.map((s) => ({
  label: s,
  value: s,
}));

function getSwatchHex(shade: NeutralShade): string {
  return NEUTRAL_HEX_MAP[props.neutralPalette]?.[shade] ?? "#888888";
}

function selectShade(shade: NeutralShade) {
  emit("update:modelValue", shade);
}

function needsDarkIndicator(shade: NeutralShade): boolean {
  const lightShades = ["50", "100", "200", "300"];
  return lightShades.includes(shade) || shade === "white";
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
      @update:model-value="emit('update:modelValue', $event as NeutralShade)"
    >
      <template #leading>
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 border border-[var(--ui-border)]"
          :style="{ backgroundColor: getSwatchHex(modelValue) }"
        />
      </template>
      <template #item-leading="{ item }">
        <span
          aria-hidden="true"
          class="size-3 rounded-full inline-block shrink-0 border border-[var(--ui-border)] self-center mr-3"
          :style="{
            backgroundColor: getSwatchHex(item.value as NeutralShade),
          }"
        />
      </template>
    </USelect>

    <!-- Shade swatch selector: visual 50–950 strip -->
    <fieldset class="mt-1.5" :aria-label="`${label} shade picker`">
      <div class="flex items-center gap-1">
        <!-- White shortcut -->
        <button
          type="button"
          :aria-label="`Select white`"
          :aria-pressed="modelValue === 'white'"
          class="size-6 shrink-0 rounded-sm border transition-shadow cursor-pointer"
          :class="
            modelValue === 'white'
              ? 'ring-2 ring-(--ui-primary) border-[var(--ui-primary)]'
              : 'border-[var(--ui-border)] hover:border-[var(--ui-border-accented)]'
          "
          :style="{ backgroundColor: '#ffffff' }"
          @click="selectShade('white')"
        >
          <span class="sr-only">White</span>
        </button>

        <!-- 50–950 shade strip -->
        <UFieldGroup size="xs" class="flex-1 min-w-0">
          <UButton
            v-for="shade in NUMERIC_SHADES"
            :key="shade"
            :aria-label="`Select shade ${shade}`"
            :aria-pressed="modelValue === shade"
            color="neutral"
            variant="ghost"
            size="xs"
            square
            :class="[
              '!p-0 flex-1 min-w-0',
              modelValue === shade ? 'ring-2 ring-(--ui-primary) z-10' : '',
            ]"
            @click="selectShade(shade)"
          >
            <span
              aria-hidden="true"
              class="w-full h-5 block"
              :style="{ backgroundColor: getSwatchHex(shade) }"
            />
            <!-- Selection indicator dot -->
            <span
              v-if="modelValue === shade"
              aria-hidden="true"
              class="absolute inset-0 flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-check"
                :class="[
                  'size-3',
                  needsDarkIndicator(shade) ? 'text-gray-800' : 'text-white',
                ]"
              />
            </span>
          </UButton>
        </UFieldGroup>

        <!-- Black shortcut -->
        <button
          type="button"
          :aria-label="`Select black`"
          :aria-pressed="modelValue === 'black'"
          class="size-6 shrink-0 rounded-sm border transition-shadow cursor-pointer"
          :class="
            modelValue === 'black'
              ? 'ring-2 ring-(--ui-primary) border-[var(--ui-primary)]'
              : 'border-[var(--ui-border)] hover:border-[var(--ui-border-accented)]'
          "
          :style="{ backgroundColor: '#000000' }"
          @click="selectShade('black')"
        >
          <span class="sr-only">Black</span>
        </button>
      </div>
    </fieldset>
  </div>
</template>
