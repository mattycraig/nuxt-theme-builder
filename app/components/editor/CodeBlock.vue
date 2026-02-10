<script setup lang="ts">
import { downloadFile } from "~/utils/helpers";

const props = withDefaults(
  defineProps<{
    code: string;
    filename: string;
    language?: string;
    maxHeight?: string;
    loading?: boolean;
    error?: string;
    downloadMimeType?: string;
  }>(),
  {
    language: "vue",
    maxHeight: "none",
    loading: false,
    error: "",
    downloadMimeType: "text/plain",
  },
);

const emit = defineEmits<{
  retry: [];
}>();

const { copy, copied } = useClipboard();
const toast = useToast();

const lineCount = computed(() =>
  props.code ? props.code.split("\n").length : 0,
);

const mdcValue = computed(
  () => `\`\`\`${props.language}\n${props.code}\n\`\`\``,
);

function handleCopy() {
  if (!props.code) return;
  copy(props.code);
  toast.add({
    title: "Copied to clipboard",
    icon: "i-lucide-check",
    color: "success",
  });
}

function handleDownload() {
  if (!props.code) return;
  downloadFile(props.code, props.filename, props.downloadMimeType);
  toast.add({
    title: "File downloaded",
    icon: "i-lucide-download",
    color: "success",
  });
}
</script>

<template>
  <div
    class="rounded-lg border border-(--ui-border) overflow-hidden bg-(--ui-bg) code-block min-h-[200px]"
    role="region"
    :aria-label="`Source code for ${filename}`"
  >
    <!-- Toolbar -->
    <div
      class="flex items-center justify-between px-3 py-1.5 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50"
    >
      <div class="flex items-center gap-2 min-w-0">
        <UIcon
          name="i-lucide-file-code"
          class="size-3.5 text-(--ui-text-dimmed) shrink-0"
        />
        <span class="text-xs font-mono text-(--ui-text-muted) truncate">
          {{ filename }}
        </span>
        <UBadge
          v-if="lineCount > 0"
          :label="`${lineCount} lines`"
          variant="subtle"
          color="neutral"
          size="xs"
        />
      </div>

      <div class="flex items-center gap-0.5">
        <UTooltip :text="copied ? 'Copied!' : 'Copy to clipboard'">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            :color="copied ? 'success' : 'neutral'"
            :aria-label="
              copied ? 'Copied to clipboard' : 'Copy code to clipboard'
            "
            variant="ghost"
            size="xs"
            :disabled="!code"
            @click="handleCopy"
          />
        </UTooltip>
        <UTooltip text="Download file">
          <UButton
            icon="i-lucide-download"
            aria-label="Download file"
            color="neutral"
            variant="ghost"
            size="xs"
            :disabled="!code"
            @click="handleDownload"
          />
        </UTooltip>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-16">
      <div class="flex flex-col items-center gap-3">
        <UIcon
          name="i-lucide-loader-2"
          class="size-8 text-(--ui-primary) animate-spin"
        />
        <span class="text-sm text-(--ui-text-muted)">Loading source…</span>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center gap-4 p-8"
    >
      <UIcon name="i-lucide-alert-circle" class="size-10 text-(--ui-error)" />
      <p class="text-sm text-(--ui-text-muted)">{{ error }}</p>
      <UButton
        label="Retry"
        icon="i-lucide-refresh-cw"
        variant="soft"
        size="sm"
        @click="emit('retry')"
      />
    </div>

    <!-- Code content with syntax highlighting -->
    <div
      v-else-if="code"
      class="code-block__content overflow-auto"
      :style="maxHeight !== 'none' ? { maxHeight } : undefined"
    >
      <MDC :value="mdcValue" />
    </div>

    <!-- Empty state -->
    <div v-else class="flex items-center justify-center py-12">
      <p class="text-sm text-(--ui-text-muted)">No source code available.</p>
    </div>
  </div>
</template>

<style scoped>
.code-block__content :deep(pre) {
  margin: 0;
  border-radius: 0;
  border: none;
  min-height: 100%;
  font-size: 0.8125rem;
  line-height: 1.7;
  background-color: transparent;
  padding-top: 0;
}

.code-block__content :deep(pre code) {
  font-family:
    ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono",
    monospace;
}

/* Hide the MDC built-in copy button since we have our own */
.code-block__content :deep(button) {
  display: none;
}
</style>
