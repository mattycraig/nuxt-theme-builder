<script setup lang="ts">
import type { AiMessage } from "~/types/ai";

defineProps<{
  message: AiMessage;
}>();

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<template>
  <div
    :class="[
      'flex gap-3 px-4 py-3',
      message.role === 'user' ? 'justify-end' : 'justify-start',
    ]"
  >
    <!-- AI avatar -->
    <div
      v-if="message.role === 'assistant'"
      class="shrink-0 size-8 rounded-full bg-(--ui-primary)/10 flex items-center justify-center"
      aria-hidden="true"
    >
      <UIcon name="i-lucide-sparkles" class="size-4 text-(--ui-primary)" />
    </div>

    <!-- Message bubble -->
    <div
      :class="[
        'max-w-[80%] rounded-[var(--ui-radius)] px-4 py-2.5',
        message.role === 'user'
          ? 'bg-(--ui-primary) text-white'
          : 'bg-(--ui-bg-elevated) text-(--ui-text-default) border border-(--ui-border)',
      ]"
    >
      <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>

      <!-- Theme preview card (only for assistant messages with a theme) -->
      <AiThemePreview
        v-if="message.themeConfig"
        :theme-config="message.themeConfig"
      />

      <p
        :class="[
          'text-[10px] mt-1.5',
          message.role === 'user' ? 'text-white/60' : 'text-(--ui-text-dimmed)',
        ]"
      >
        {{ formatTime(message.timestamp) }}
      </p>
    </div>

    <!-- User avatar -->
    <div
      v-if="message.role === 'user'"
      class="shrink-0 size-8 rounded-full bg-(--ui-bg-accented) flex items-center justify-center"
      aria-hidden="true"
    >
      <UIcon name="i-lucide-user" class="size-4 text-(--ui-text-muted)" />
    </div>
  </div>
</template>
