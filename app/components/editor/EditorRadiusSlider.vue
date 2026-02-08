<script setup lang="ts">
defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

function formatValue(rem: number): string {
  const px = Math.round(rem * 16);
  return `${rem}rem (${px}px)`;
}

function onUpdate(val: number | undefined) {
  if (val !== undefined) {
    emit("update:modelValue", val);
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <label class="text-xs font-medium text-(--ui-text-muted)"
        >Border Radius</label
      >
      <span class="text-xs font-mono text-(--ui-text-toned)">{{
        formatValue(modelValue)
      }}</span>
    </div>
    <USlider
      :model-value="modelValue"
      :min="0"
      :max="2"
      :step="0.125"
      aria-label="Border Radius"
      @update:model-value="onUpdate"
    />
  </div>
</template>
