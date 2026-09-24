<script setup lang="ts">
import type { NumericShade } from "~/types/theme";
import { NUMERIC_SHADE_KEYS } from "~/types/theme";

const props = defineProps<{
  name: string;
  shades: Record<NumericShade, string>;
  /** Shade holding the exact base color; marked with a dot. */
  anchor: NumericShade;
}>();

const ariaLabel = computed(
  () =>
    `${props.name} palette, 50 to 950, base color at shade ${props.anchor}`,
);
</script>

<template>
  <div class="flex h-5 rounded-sm overflow-hidden" role="img" :aria-label="ariaLabel">
    <span
      v-for="shade in NUMERIC_SHADE_KEYS"
      :key="shade"
      class="flex-1 flex items-center justify-center"
      :style="{ backgroundColor: shades[shade] }"
      :title="`${name}-${shade}: ${shades[shade]}`"
    >
      <span
        v-if="shade === anchor"
        aria-hidden="true"
        class="size-1.5 rounded-full bg-white ring-1 ring-black/40"
      />
    </span>
  </div>
</template>
