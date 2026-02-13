<script setup lang="ts">
import type { ThemeConfig } from "~/types/theme";
import { SEMANTIC_COLOR_KEYS } from "~/types/theme";
import { ALL_HEX_MAP, NEUTRAL_SWATCH_HEX } from "~/utils/colorPalettes";

const props = withDefaults(
  defineProps<{
    config: ThemeConfig;
    width?: string;
  }>(),
  {
    width: "w-[70px]",
  },
);

function getColorHex(
  colors: Record<string, string>,
  shades: Record<string, string>,
  key: string,
): string {
  const color = colors[key];
  const shade = shades[key] ?? "500";
  return ALL_HEX_MAP[color as string]?.[shade] ?? "#71717a";
}

const lightNeutralHex = computed(
  () => NEUTRAL_SWATCH_HEX[props.config.neutral as string] ?? "#71717a",
);

const darkNeutralHex = computed(
  () =>
    NEUTRAL_SWATCH_HEX[
      (props.config.darkNeutral ?? props.config.neutral) as string
    ] ?? "#71717a",
);

const ariaLabel = computed(() => {
  const colors = SEMANTIC_COLOR_KEYS.map(
    (k) => props.config.colors?.[k as keyof typeof props.config.colors],
  )
    .filter(Boolean)
    .join(", ");
  return `Colors: ${colors}`;
});
</script>

<template>
  <div
    class="flex flex-col gap-0.5 shrink-0"
    :class="width"
    role="img"
    :aria-label="ariaLabel"
  >
    <div class="flex h-2 rounded-full overflow-hidden">
      <span
        v-for="key in SEMANTIC_COLOR_KEYS"
        :key="`l-${key}`"
        class="flex-1 mx-[0.5px]"
        :style="{
          backgroundColor: getColorHex(config.colors, config.colorShades, key),
        }"
        aria-hidden="true"
      />
      <span
        class="flex-1 mx-[0.5px]"
        :style="{ backgroundColor: lightNeutralHex }"
        aria-hidden="true"
      />
    </div>
    <div class="flex h-2 rounded-full overflow-hidden">
      <span
        v-for="key in SEMANTIC_COLOR_KEYS"
        :key="`d-${key}`"
        class="flex-1 mx-[0.5px]"
        :style="{
          backgroundColor: getColorHex(
            config.darkColors,
            config.darkColorShades,
            key,
          ),
        }"
        aria-hidden="true"
      />
      <span
        class="flex-1 mx-[0.5px]"
        :style="{ backgroundColor: darkNeutralHex }"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
