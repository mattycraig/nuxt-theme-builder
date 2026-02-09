<script setup lang="ts">
defineProps<{
  source: string;
  filePath: string;
  loading: boolean;
  error: string;
  copied: boolean;
}>();

const emit = defineEmits<{
  copy: [];
  retry: [];
}>();
</script>

<template>
  <div
    class="flex-1 overflow-hidden bg-(--ui-bg-muted) p-4 sm:p-6 flex justify-center items-stretch"
  >
    <div
      class="relative h-full w-full rounded-xl border border-(--ui-border) shadow-xl overflow-hidden bg-(--ui-bg)"
      role="region"
      aria-label="Source code"
    >
      <!-- Header bar -->
      <div
        class="flex items-center justify-between px-4 py-2.5 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50"
      >
        <div class="flex items-center gap-2 min-w-0">
          <UIcon
            name="i-lucide-file-code"
            class="size-4 text-(--ui-text-muted) shrink-0"
          />
          <span class="text-xs font-mono text-(--ui-text-muted) truncate">
            {{ filePath }}
          </span>
        </div>

        <UTooltip :text="copied ? 'Copied!' : 'Copy source'">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            :color="copied ? 'success' : 'neutral'"
            variant="ghost"
            size="xs"
            :aria-label="
              copied ? 'Source copied to clipboard' : 'Copy source code'
            "
            @click="emit('copy')"
          />
        </UTooltip>
      </div>

      <!-- Loading state -->
      <div
        v-if="loading"
        class="absolute inset-0 top-10 flex items-center justify-center bg-(--ui-bg)/60 backdrop-blur-sm z-10"
      >
        <div class="flex flex-col items-center gap-3">
          <UIcon
            name="i-lucide-loader-2"
            class="size-8 text-(--ui-primary) animate-spin"
          />
          <span class="text-sm text-(--ui-text-muted)"> Loading source… </span>
        </div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center h-full gap-4 p-8"
      >
        <UIcon name="i-lucide-alert-circle" class="size-10 text-(--ui-error)" />
        <p class="text-sm text-(--ui-text-muted)">
          {{ error }}
        </p>
        <UButton
          label="Retry"
          icon="i-lucide-refresh-cw"
          variant="soft"
          size="sm"
          @click="emit('retry')"
        />
      </div>

      <!-- Source code -->
      <div
        v-else-if="source"
        class="h-[calc(100%-2.75rem)] overflow-auto source-code-view"
      >
        <MDC :value="`\`\`\`vue\n${source}\n\`\`\``" />
      </div>

      <!-- Empty state -->
      <div v-else class="flex items-center justify-center h-full">
        <p class="text-sm text-(--ui-text-muted)">No source code available.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.source-code-view :deep(pre) {
  margin: 0;
  border-radius: 0;
  border: none;
  min-height: 100%;
  font-size: 0.8125rem;
  line-height: 1.7;
  background-color: transparent;
  padding-top: 0;
}

.source-code-view :deep(pre code) {
  font-family:
    ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono",
    monospace;
}

.source-code-view :deep(button) {
  display: none;
}
</style>
