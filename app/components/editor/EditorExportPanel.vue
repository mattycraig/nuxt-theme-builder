<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

type ExportTab = "appconfig" | "css" | "json";

const activeTab = ref<ExportTab>("appconfig");

const exportTabs: TabsItem[] = [
  {
    label: "app.config.ts",
    icon: "i-lucide-file-cog",
    value: "appconfig",
  },
  {
    label: "CSS",
    icon: "i-lucide-palette",
    value: "css",
  },
  {
    label: "JSON",
    icon: "i-lucide-braces",
    value: "json",
  },
];

const { appConfigExport, cssExport, jsonExport, importJSON } = useThemeExport();
const toast = useToast();

const TAB_META: Record<
  ExportTab,
  { filename: string; language: string; mimeType: string }
> = {
  appconfig: {
    filename: "app.config.ts",
    language: "ts",
    mimeType: "text/typescript",
  },
  css: { filename: "main.css", language: "css", mimeType: "text/css" },
  json: {
    filename: "theme.json",
    language: "json",
    mimeType: "application/json",
  },
};

const exportSources: Record<ExportTab, ComputedRef<string>> = {
  appconfig: appConfigExport,
  css: cssExport,
  json: jsonExport,
};

const currentCode = computed(() => exportSources[activeTab.value]?.value ?? "");
const currentMeta = computed(
  () => TAB_META[activeTab.value] ?? TAB_META.appconfig,
);

const importOpen = ref(true);
const importText = ref("");
const importError = ref("");
const MAX_IMPORT_SIZE = 512 * 1024; // 512 KB

function handleImport() {
  importError.value = "";
  const trimmed = importText.value.trim();
  if (!trimmed) {
    importError.value = "Please paste theme JSON to import.";
    return;
  }
  if (trimmed.length > MAX_IMPORT_SIZE) {
    importError.value = "Pasted JSON is too large. Maximum is 512 KB.";
    return;
  }
  const result = importJSON(trimmed);
  if (result.success) {
    toast.add({
      title: "Theme imported",
      description: "Your theme configuration has been applied.",
      icon: "i-lucide-check-circle",
      color: "success",
    });
    importText.value = "";
    importError.value = "";
  } else {
    importError.value = result.error || "Invalid theme JSON.";
  }
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  if (file.size > MAX_IMPORT_SIZE) {
    importError.value = `File too large (${(file.size / 1024).toFixed(0)} KB). Maximum is 512 KB.`;
    target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result;
    if (typeof content === "string") {
      importText.value = content;
    }
  };
  reader.readAsText(file);
  target.value = "";
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Export section -->
    <section aria-labelledby="export-heading">
      <div class="flex items-center gap-2 mb-3">
        <UIcon
          name="i-lucide-file-output"
          class="size-4 text-(--ui-text-muted)"
        />
        <h3
          id="export-heading"
          class="text-sm font-semibold text-(--ui-text-highlighted)"
        >
          Export Theme
        </h3>
      </div>

      <UTabs
        v-model="activeTab"
        :items="exportTabs"
        value-key="value"
        variant="pill"
        size="xs"
        :content="false"
        class="mb-3"
      />

      <CodeBlock
        :code="currentCode"
        :filename="currentMeta.filename"
        :language="currentMeta.language"
        :download-mime-type="currentMeta.mimeType"
        max-height="18rem"
      />
    </section>

    <USeparator />

    <!-- Import section -->
    <section aria-labelledby="import-heading">
      <UCollapsible v-model:open="importOpen" class="flex flex-col gap-3">
        <button
          class="group flex items-center justify-between w-full text-left"
        >
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-file-input"
              class="size-4 text-(--ui-text-muted)"
            />
            <h3
              id="import-heading"
              class="text-sm font-semibold text-(--ui-text-highlighted)"
            >
              Import Theme
            </h3>
          </div>
          <UIcon
            name="i-lucide-chevron-down"
            class="size-4 text-(--ui-text-dimmed) transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </button>

        <template #content>
          <div class="flex flex-col gap-3">
            <p class="text-xs text-(--ui-text-muted)">
              Paste a theme JSON or upload a
              <code
                class="text-xs font-mono px-1 py-0.5 rounded bg-(--ui-bg-elevated)"
                >theme.json</code
              >
              file to apply.
            </p>

            <UTextarea
              v-model="importText"
              placeholder='{"colors":{"primary":"blue",...}}'
              aria-label="Theme JSON to import"
              :rows="5"
              class="font-mono"
              autoresize
              :ui="{ base: 'font-mono text-xs' }"
            />

            <!-- Import error -->
            <UAlert
              v-if="importError"
              :title="importError"
              icon="i-lucide-circle-alert"
              color="error"
              variant="subtle"
              :close="{
                icon: 'i-lucide-x',
                color: 'error' as const,
                variant: 'link' as const,
              }"
              @close="importError = ''"
            />

            <div class="flex items-center gap-2">
              <UButton
                label="Apply Theme"
                icon="i-lucide-check"
                color="primary"
                variant="soft"
                size="xs"
                :disabled="!importText.trim()"
                @click="handleImport"
              />

              <USeparator orientation="vertical" class="h-5" />

              <UTooltip text="Upload a theme.json file">
                <label
                  class="inline-flex items-center gap-1.5 cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-(--ui-text-muted) hover:text-(--ui-text) hover:bg-(--ui-bg-elevated) transition-colors"
                >
                  <UIcon name="i-lucide-folder-open" class="size-4" />
                  <span>Browse file</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    class="sr-only"
                    aria-label="Upload theme JSON file"
                    @change="handleFileUpload"
                  >
                </label>
              </UTooltip>
            </div>
          </div>
        </template>
      </UCollapsible>
    </section>
  </div>
</template>
