<script setup lang="ts">
import { SUGGESTION_PROMPTS } from "~/utils/aiPrompts";

const emit = defineEmits<{
  select: [prompt: string];
}>();
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-center">
    <UButton
      v-for="prompt in SUGGESTION_PROMPTS"
      :key="prompt"
      :label="prompt"
      variant="outline"
      color="neutral"
      size="sm"
      class="text-xs"
      @click="emit('select', prompt)"
    />
  </div>
</template>
