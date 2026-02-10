<script setup lang="ts">
import { ThemeConfigSchema } from "~/types/theme";
import type { ThemeConfig } from "~/types/theme";

const store = useThemeStore();

const jsonText = ref("");
const parseError = ref("");
const isDirty = ref(false);

function syncFromStore() {
  jsonText.value = JSON.stringify(store.config, null, 2);
  parseError.value = "";
  isDirty.value = false;
}

onMounted(syncFromStore);

watch(
  () => store.config,
  () => {
    if (!isDirty.value) {
      syncFromStore();
    }
  },
  { deep: true },
);

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  jsonText.value = target.value;
  isDirty.value = true;
  parseError.value = "";
}

const toast = useToast();

function applyChanges() {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText.value);
  } catch (e) {
    parseError.value =
      e instanceof SyntaxError ? e.message : "Invalid JSON syntax";
    return;
  }

  const result = ThemeConfigSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n");
    parseError.value = issues;
    return;
  }

  store.loadConfig(result.data as ThemeConfig);
  isDirty.value = false;
  parseError.value = "";
  toast.add({
    title: "Theme applied",
    icon: "i-lucide-check",
    color: "success",
  });
}

function resetEditorText() {
  syncFromStore();
}

const { copy, copied } = useClipboard();

function handleCopy() {
  if (!jsonText.value) return;
  copy(jsonText.value);
  toast.add({
    title: "Copied to clipboard",
    icon: "i-lucide-check",
    color: "success",
  });
}

const lineCount = computed(() =>
  jsonText.value ? jsonText.value.split("\n").length : 0,
);
</script>

<template>
  <div
    class="flex flex-col h-full"
    role="region"
    aria-label="JSON theme editor"
  >
    <!-- Toolbar -->
    <div
      class="flex items-center justify-between px-3 py-1.5 border-b border-(--ui-border) bg-(--ui-bg-elevated)/50"
    >
      <div class="flex items-center gap-2 min-w-0">
        <UIcon
          name="i-lucide-braces"
          class="size-3.5 text-(--ui-text-dimmed) shrink-0"
        />
        <span class="text-xs font-mono text-(--ui-text-muted) truncate">
          theme.json
        </span>
        <UBadge
          v-if="lineCount > 0"
          :label="`${lineCount} lines`"
          variant="subtle"
          color="neutral"
          size="xs"
        />
        <UBadge
          v-if="isDirty"
          label="Modified"
          variant="subtle"
          color="warning"
          size="xs"
        />
      </div>

      <div class="flex items-center gap-0.5">
        <UTooltip :text="copied ? 'Copied!' : 'Copy JSON'">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            :color="copied ? 'success' : 'neutral'"
            :aria-label="
              copied ? 'Copied to clipboard' : 'Copy JSON to clipboard'
            "
            variant="ghost"
            size="xs"
            :disabled="!jsonText"
            @click="handleCopy"
          />
        </UTooltip>
      </div>
    </div>

    <!-- Editor area -->
    <div class="flex-1 min-h-0 overflow-auto">
      <label for="json-editor-textarea" class="sr-only">
        Theme configuration JSON
      </label>
      <textarea
        id="json-editor-textarea"
        :value="jsonText"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        class="json-editor-textarea w-full h-full min-h-[400px] p-3 font-mono text-[13px] leading-[1.7] resize-none border-0 outline-none bg-transparent text-(--ui-text-highlighted)"
        :class="{
          'ring-2 ring-inset ring-(--ui-color-error-500)': parseError,
        }"
        :aria-invalid="!!parseError || undefined"
        aria-describedby="json-editor-error"
        @input="onInput"
      />
    </div>

    <!-- Error display -->
    <div
      v-if="parseError"
      id="json-editor-error"
      role="alert"
      class="px-3 py-2 border-t border-(--ui-color-error-500)/30 bg-(--ui-color-error-500)/5"
    >
      <div class="flex items-start gap-2">
        <UIcon
          name="i-lucide-alert-circle"
          class="size-4 text-(--ui-color-error-500) shrink-0 mt-0.5"
        />
        <pre
          class="text-xs text-(--ui-color-error-500) whitespace-pre-wrap break-words font-mono flex-1"
          >{{ parseError }}</pre
        >
      </div>
    </div>

    <!-- Action bar -->
    <div
      class="flex items-center gap-2 px-3 py-2 border-t border-(--ui-border) bg-(--ui-bg-elevated)/50"
    >
      <UButton
        label="Apply"
        icon="i-lucide-check"
        size="sm"
        color="primary"
        :disabled="!isDirty"
        @click="applyChanges"
      />
      <UButton
        label="Reset"
        icon="i-lucide-rotate-ccw"
        size="sm"
        variant="ghost"
        color="neutral"
        :disabled="!isDirty"
        @click="resetEditorText"
      />
      <span v-if="!isDirty" class="text-xs text-(--ui-text-dimmed) ml-auto">
        In sync with theme
      </span>
      <span v-else class="text-xs text-(--ui-color-warning-500) ml-auto">
        Unapplied changes
      </span>
    </div>
  </div>
</template>

<style scoped>
.json-editor-textarea {
  tab-size: 2;
  -moz-tab-size: 2;
  font-family:
    ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono",
    monospace;
}

.json-editor-textarea::placeholder {
  color: var(--ui-text-dimmed);
}

.json-editor-textarea:focus {
  outline: none;
}

/* Ensure sr-only hides the label visually but keeps it accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
