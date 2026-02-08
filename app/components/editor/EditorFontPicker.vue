<script setup lang="ts">
import { FONT_OPTIONS } from "~/types/theme";

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const items = FONT_OPTIONS.map((f) => ({
  label: f,
  value: f,
}));
</script>

<template>
  <div>
    <label class="text-xs font-medium text-(--ui-text-muted) mb-1 block"
      >Font Family</label
    >
    <USelect
      :model-value="modelValue"
      :items="items"
      class="w-full"
      @update:model-value="emit('update:modelValue', $event as string)"
    />
  </div>
</template>
