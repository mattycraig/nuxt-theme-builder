<script setup lang="ts">
interface PresetOption {
  value: string;
  icon: string;
  label: string;
}

defineProps<{
  options: readonly PresetOption[];
  activePreset: string;
  customValue: number | null;
  groupLabel: string;
  size?: "xs" | "sm";
}>();

const emit = defineEmits<{
  select: [value: string];
}>();
</script>

<template>
  <UFieldGroup class="flex items-center" role="group" :aria-label="groupLabel">
    <UTooltip
      v-for="option in options"
      :key="option.value"
      :text="option.label"
    >
      <UButton
        :icon="option.icon"
        :aria-label="option.label"
        :size="size ?? 'sm'"
        variant="outline"
        :color="
          activePreset === option.value && customValue === null
            ? 'primary'
            : 'neutral'
        "
        :aria-pressed="activePreset === option.value && customValue === null"
        @click="emit('select', option.value)"
      />
    </UTooltip>
  </UFieldGroup>
</template>
