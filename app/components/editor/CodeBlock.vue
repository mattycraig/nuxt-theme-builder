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
    hideDownload?: boolean;
    icon?: string;
  }>(),
  {
    language: "vue",
    maxHeight: "none",
    loading: false,
    error: "",
    downloadMimeType: "text/plain",
    hideDownload: false,
    icon: "i-lucide-file-code",
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

// Syntax highlighting via POST endpoint (avoids GET 414 URI Too Long for large files)
const highlightedHtml = ref("");
const isHighlighting = ref(false);

watch(
  () => props.code,
  async (code) => {
    if (!code) {
      highlightedHtml.value = "";
      return;
    }
    isHighlighting.value = true;
    try {
      const result = await $fetch<{ html: string }>("/api/highlight", {
        method: "POST",
        body: { code, lang: props.language },
      });
      highlightedHtml.value = result.html;
    } catch {
      // Fallback: render as plain preformatted text
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      highlightedHtml.value = `<pre><code>${escaped}</code></pre>`;
    } finally {
      isHighlighting.value = false;
    }
  },
  { immediate: true },
);

const showLoading = computed(
  () => props.loading || (!!props.code && !props.error && isHighlighting.value),
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
    class="flex flex-col rounded-lg border border-(--ui-border) overflow-hidden bg-(--ui-bg) code-block min-h-[200px] min-w-0"
    role="region"
    :aria-label="`Source code for ${filename}`"
  >
    <!-- Toolbar -->
    <div
      class="flex items-center justify-between px-3 py-1.5 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50"
    >
      <div class="flex items-center gap-2 min-w-0">
        <UIcon :name="icon" class="size-3.5 text-(--ui-text-dimmed) shrink-0" />
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
        <slot name="toolbar-badges" />
      </div>

      <div class="flex items-center gap-0.5 ml-2">
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
        <UTooltip v-if="!hideDownload" text="Download file">
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

    <!-- Content area -->
    <slot>
      <!-- Loading state (external fetch or MDC rendering) -->
      <div
        v-if="showLoading && !code"
        class="flex-1 flex items-center justify-center py-16"
      >
        <div class="flex flex-col items-center gap-3" role="status">
          <UIcon
            name="i-lucide-loader-2"
            class="size-8 text-(--ui-primary) animate-spin"
            aria-hidden="true"
          />
          <span class="text-sm text-(--ui-text-muted)">Loading source…</span>
        </div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="flex-1 flex flex-col items-center justify-center gap-4 p-8"
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
        class="code-block__content flex-1 min-h-0 overflow-auto relative px-4 py-2"
        :style="maxHeight !== 'none' ? { maxHeight } : undefined"
      >
        <!-- Overlay while highlighting -->
        <div
          v-if="isHighlighting"
          class="absolute inset-0 z-10 flex items-center justify-center bg-(--ui-bg)"
        >
          <div class="flex flex-col items-center gap-3" role="status">
            <UIcon
              name="i-lucide-loader-2"
              class="size-6 text-(--ui-primary) animate-spin"
              aria-hidden="true"
            />
            <span class="text-sm text-(--ui-text-muted)"
              >Highlighting code…</span
            >
          </div>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="highlightedHtml" />
      </div>

      <!-- Empty state -->
      <div v-else class="flex-1 flex items-center justify-center py-12">
        <p class="text-sm text-(--ui-text-muted)">No source code available.</p>
      </div>
    </slot>

    <!-- Footer -->
    <slot name="footer" />
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
