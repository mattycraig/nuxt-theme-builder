<script setup lang="ts">
import type { ThemeConfig } from "~/types/theme";
import { SEMANTIC_COLOR_KEYS } from "~/types/theme";
import { CHROMATIC_SWATCH_HEX } from "~/utils/defaults";

defineProps<{
  config: ThemeConfig;
  size?: "sm" | "md";
}>();
</script>

<template>
  <span
    class="inline-flex items-center gap-0.5"
    :class="size === 'md' ? 'gap-1' : 'gap-0.5'"
    role="img"
    :aria-label="`Color palette: ${SEMANTIC_COLOR_KEYS.map((k) => config.colors[k]).join(', ')}`"
  >
    <span
      v-for="key in SEMANTIC_COLOR_KEYS"
      :key="key"
      class="rounded-full shrink-0"
      :class="size === 'md' ? 'size-3.5' : 'size-2.5'"
      :style="{ backgroundColor: CHROMATIC_SWATCH_HEX[config.colors[key]] }"
      :aria-hidden="true"
    />
  </span>
</template>
