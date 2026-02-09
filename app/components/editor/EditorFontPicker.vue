<script setup lang="ts">
import { FONT_OPTIONS } from "~/types/theme";

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const inputId = useId();

const items = FONT_OPTIONS.map((f) => ({
  label: f,
  value: f,
}));
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="text-xs font-medium text-(--ui-text-muted) mb-1 block"
      >Font Family</label
    >
    <USelect
      :id="inputId"
      :model-value="modelValue as (typeof FONT_OPTIONS)[number]"
      :items="items"
      :aria-label="`Font family: ${modelValue}`"
      class="w-full"
      :style="{ fontFamily: modelValue }"
      @update:model-value="emit('update:modelValue', $event as string)"
    >
      <template #item-label="{ item }">
        <span :style="{ fontFamily: item.label }" class="font-medium">{{
          item.label
        }}</span>
      </template>
    </USelect>
  </div>
</template>
