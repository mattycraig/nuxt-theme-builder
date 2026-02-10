<script setup lang="ts">
defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const inputId = useId();

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
      <label :for="inputId" class="text-xs font-medium">Border Radius</label>
      <span class="text-xs font-mono text-(--ui-text-toned)">{{
        formatValue(modelValue)
      }}</span>
    </div>
    <USlider
      :id="inputId"
      :model-value="modelValue"
      :min="0"
      :max="1"
      :step="0.125"
      aria-label="Border Radius"
      @update:model-value="onUpdate"
    />
  </div>
</template>
