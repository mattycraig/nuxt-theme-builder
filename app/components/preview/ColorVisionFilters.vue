<script setup lang="ts">
import {
  COLOR_VISION_MATRICES,
  colorVisionFilterId,
} from "~/utils/colorVision";

const modes = Object.keys(COLOR_VISION_MATRICES) as Array<
  keyof typeof COLOR_VISION_MATRICES
>;
</script>

<template>
  <!-- Filter definitions referenced by the preview iframes' CSS filter -->
  <svg
    aria-hidden="true"
    focusable="false"
    width="0"
    height="0"
    class="absolute size-0 overflow-hidden"
  >
    <defs>
      <filter
        v-for="m in modes"
        :id="colorVisionFilterId(m)"
        :key="m"
        color-interpolation-filters="linearRGB"
      >
        <feColorMatrix type="matrix" :values="COLOR_VISION_MATRICES[m]" />
      </filter>
    </defs>
  </svg>
</template>
