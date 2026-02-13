<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    size?: "sm" | "md";
  }>(),
  {
    label: "Loading…",
    size: "md",
  },
);
</script>

<template>
  <div class="flex flex-col items-center gap-3" role="status">
    <UIcon
      name="i-lucide-loader-2"
      :class="[
        'text-(--ui-primary) animate-spin',
        size === 'sm' ? 'size-6' : 'size-8',
      ]"
      aria-hidden="true"
    />
    <span class="text-sm text-(--ui-text-muted)">{{ label }}</span>
  </div>
</template>
