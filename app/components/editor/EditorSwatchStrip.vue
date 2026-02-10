<script setup lang="ts">
import type { ThemeConfig } from "~/types/theme";
import { SEMANTIC_COLOR_KEYS } from "~/types/theme";
import { CHROMATIC_HEX_MAP, NEUTRAL_SWATCH_HEX } from "~/utils/defaults";

const props = withDefaults(
  defineProps<{
    config: ThemeConfig;
    width?: string;
  }>(),
  {
    width: "w-[70px]",
  },
);

function lightHex(key: string): string {
  const color = props.config.colors?.[key as keyof typeof props.config.colors];
  const shade =
    props.config.colorShades?.[key as keyof typeof props.config.colorShades] ??
    "500";
  return CHROMATIC_HEX_MAP[color as string]?.[shade] ?? "#71717a";
}

function darkHex(key: string): string {
  const color =
    props.config.darkColors?.[key as keyof typeof props.config.darkColors];
  const shade =
    props.config.darkColorShades?.[
      key as keyof typeof props.config.darkColorShades
    ] ?? "500";
  return CHROMATIC_HEX_MAP[color as string]?.[shade] ?? "#71717a";
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
        :style="{ backgroundColor: lightHex(key) }"
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
        :style="{ backgroundColor: darkHex(key) }"
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
