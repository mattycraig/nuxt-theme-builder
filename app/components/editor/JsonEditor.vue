<script setup lang="ts">
import { ThemeConfigSchema } from "~/types/theme";
import type { ThemeConfig } from "~/types/theme";
import { showThemeAppliedToast } from "~/utils/helpers";

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
  showThemeAppliedToast(toast);
}

function resetEditorText() {
  syncFromStore();
}
const editorFilename = computed(() => {
  const name = store.activePresetName;
  return name ? `${name}.json` : "theme.json";
});
</script>

<template>
  <SharedCodeBlock
    :code="jsonText"
    :filename="editorFilename"
    language="json"
    icon="i-lucide-braces"
    class="flex-1 min-h-0 m-2"
  >
    <template #toolbar-badges>
      <UBadge
        v-if="isDirty"
        label="Modified"
        variant="subtle"
        color="warning"
        size="xs"
      />
    </template>

    <!-- Editable textarea styled to match Shiki code theme -->
    <div class="flex-1 min-h-0">
      <label for="json-editor-textarea" class="sr-only">
        Theme configuration JSON
      </label>
      <textarea
        id="json-editor-textarea"
        :value="jsonText"
        wrap="soft"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        class="json-editor-textarea w-full h-full p-3 resize-none border-0 outline-none bg-transparent text-(--ui-text-highlighted) whitespace-pre-wrap break-all"
        :class="{
          'ring-2 ring-inset ring-(--ui-color-error-500)': parseError,
        }"
        :aria-invalid="!!parseError || undefined"
        aria-describedby="json-editor-error"
        @input="onInput"
      />
    </div>

    <template #footer>
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
            class="text-xs text-(--ui-color-error-500) whitespace-pre-wrap break-words font-mono flex-1 w-full pr-6"
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
        <UBadge
          v-if="!isDirty"
          label="In sync"
          variant="subtle"
          color="success"
          size="xs"
          class="ml-auto"
        />
        <UBadge
          v-else
          label="Unsaved"
          variant="subtle"
          color="warning"
          size="xs"
          class="ml-auto"
        />
      </div>
    </template>
  </SharedCodeBlock>
</template>

<style scoped>
.json-editor-textarea {
  font-family:
    ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono",
    monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  tab-size: 2;
  -moz-tab-size: 2;
}

.json-editor-textarea::placeholder {
  color: var(--ui-text-dimmed);
}

.json-editor-textarea:focus {
  outline: none;
}

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
