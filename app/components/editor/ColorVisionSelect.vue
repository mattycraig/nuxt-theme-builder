<script setup lang="ts">
import type { ColorVisionMode } from "~/utils/colorVision";
import { COLOR_VISION_OPTIONS } from "~/utils/colorVision";

const mode = defineModel<ColorVisionMode>({ required: true });

const inputId = useId();
const hintId = useId();

const items = COLOR_VISION_OPTIONS.map((o) => ({
  label: o.label,
  description: o.description,
  value: o.id,
}));
</script>

<template>
  <div>
    <label :for="inputId" class="text-xs font-medium mb-1 block">
      Preview as
    </label>
    <USelect
      :id="inputId"
      v-model="mode"
      :items="items"
      icon="i-lucide-eye"
      :aria-describedby="hintId"
      class="w-full"
    />
    <p :id="hintId" class="mt-1.5 text-xs text-(--ui-text-muted)">
      Shows the page next to the editor the way people with a color vision
      deficiency see it. Your theme isn't changed.
    </p>
  </div>
</template>
