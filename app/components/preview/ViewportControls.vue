<script setup lang="ts">
import { PRESET_WIDTHS } from "~/composables/usePreviewResize";

const activeWidth = defineModel<"mobile" | "tablet" | "desktop">(
  "activeWidth",
  { required: true },
);
const customWidth = defineModel<number | null>("customWidth", {
  required: true,
});
const activeHeight = defineModel<"short" | "medium" | "auto">("activeHeight", {
  required: true,
});
const customHeight = defineModel<number | null>("customHeight", {
  required: true,
});

withDefaults(
  defineProps<{
    idPrefix?: string;
  }>(),
  { idPrefix: "vp" },
);
</script>

<template>
  <div class="flex items-center gap-3">
    <PreviewPresetButtons
      :options="PRESET_WIDTHS"
      :active-preset="activeWidth"
      :custom-value="customWidth"
      group-label="Change preview width"
      @select="activeWidth = $event as typeof activeWidth"
    />

    <USeparator
      orientation="vertical"
      class="h-6"
      :ui="{ border: 'dark:border-accented' }"
    />

    <PreviewViewportSettings
      v-model:active-width="activeWidth"
      v-model:custom-width="customWidth"
      v-model:active-height="activeHeight"
      v-model:custom-height="customHeight"
      :id-prefix="idPrefix"
    />
  </div>
</template>
