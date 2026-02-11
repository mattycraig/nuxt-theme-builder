<script setup lang="ts">
const emit = defineEmits<{
  selectPrompt: [prompt: string];
}>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <!-- Prompt templates section -->
    <div class="px-1 pt-2">
      <h2
        class="flex items-center gap-2 pb-2 text-sm font-semibold tracking-wide"
      >
        <UIcon name="i-lucide-lightbulb" class="size-4" aria-hidden="true" />
        Prompt Templates
      </h2>
      <USeparator class="my-2" />
      <AiPromptTemplates @select="emit('selectPrompt', $event)" />
    </div>
  </div>
</template>
