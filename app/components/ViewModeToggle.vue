<script setup lang="ts">
const modelValue = defineModel<"preview" | "code">({ required: true });
</script>

<template>
  <UFieldGroup class="flex items-center" role="group" aria-label="View mode">
    <UTooltip text="Preview">
      <UButton
        icon="i-lucide-eye"
        aria-label="Preview"
        size="sm"
        variant="outline"
        :color="modelValue === 'preview' ? 'primary' : 'neutral'"
        :aria-pressed="modelValue === 'preview'"
        @click="modelValue = 'preview'"
      />
    </UTooltip>
    <UTooltip text="View source code">
      <UButton
        icon="i-lucide-code"
        aria-label="View source code"
        size="sm"
        variant="outline"
        :color="modelValue === 'code' ? 'primary' : 'neutral'"
        :aria-pressed="modelValue === 'code'"
        @click="modelValue = 'code'"
      />
    </UTooltip>
  </UFieldGroup>
</template>
