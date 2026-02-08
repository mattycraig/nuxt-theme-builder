<script setup lang="ts">
type ExportTab = "appconfig" | "css" | "json";

const activeTab = ref<ExportTab>("appconfig");

const baseId = useId();
const tabIds: Record<ExportTab, string> = {
  appconfig: `${baseId}-tab-appconfig`,
  css: `${baseId}-tab-css`,
  json: `${baseId}-tab-json`,
};
const panelId = `${baseId}-tabpanel`;
const tabOrder: ExportTab[] = ["appconfig", "css", "json"];

function onTabKeydown(event: KeyboardEvent) {
  const idx = tabOrder.indexOf(activeTab.value);
  let next = -1;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    next = (idx + 1) % tabOrder.length;
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    next = (idx - 1 + tabOrder.length) % tabOrder.length;
  } else if (event.key === "Home") {
    event.preventDefault();
    next = 0;
  } else if (event.key === "End") {
    event.preventDefault();
    next = tabOrder.length - 1;
  }
  if (next !== -1) {
    activeTab.value = tabOrder[next];
    nextTick(() => {
      document.getElementById(tabIds[tabOrder[next]])?.focus();
    });
  }
}

const { appConfigExport, cssExport, jsonExport, importJSON, downloadFile } =
  useThemeExport();
const { copy, copied } = useClipboard();

const currentCode = computed(() => {
  switch (activeTab.value) {
    case "appconfig":
      return appConfigExport.value;
    case "css":
      return cssExport.value;
    case "json":
      return jsonExport.value;
    default:
      return "";
  }
});

function handleCopy() {
  copy(currentCode.value);
}

function handleDownload() {
  switch (activeTab.value) {
    case "appconfig":
      downloadFile(appConfigExport.value, "app.config.ts", "text/typescript");
      break;
    case "css":
      downloadFile(cssExport.value, "main.css", "text/css");
      break;
    case "json":
      downloadFile(jsonExport.value, "theme.json", "application/json");
      break;
  }
}

const importText = ref("");
const importStatus = ref<{ type: "success" | "error"; message: string } | null>(
  null,
);

function handleImport() {
  const trimmed = importText.value.trim();
  if (!trimmed) {
    importStatus.value = {
      type: "error",
      message: "Please paste JSON to import.",
    };
    clearStatus();
    return;
  }
  const result = importJSON(trimmed);
  if (result.success) {
    importStatus.value = {
      type: "success",
      message: "Theme imported successfully!",
    };
    importText.value = "";
  } else {
    importStatus.value = {
      type: "error",
      message: result.error || "Import failed.",
    };
  }
  clearStatus();
}

function clearStatus() {
  setTimeout(() => {
    importStatus.value = null;
  }, 3000);
}
</script>

<template>
  <div class="space-y-3">
    <!-- Tab buttons -->
    <div
      role="tablist"
      aria-label="Export format"
      class="flex gap-1"
      @keydown="onTabKeydown"
    >
      <UButton
        :id="tabIds.appconfig"
        label="app.config.ts"
        role="tab"
        :aria-selected="activeTab === 'appconfig'"
        :aria-controls="panelId"
        :tabindex="activeTab === 'appconfig' ? 0 : -1"
        :variant="activeTab === 'appconfig' ? 'solid' : 'ghost'"
        size="xs"
        @click="activeTab = 'appconfig'"
      />
      <UButton
        :id="tabIds.css"
        label="CSS"
        role="tab"
        :aria-selected="activeTab === 'css'"
        :aria-controls="panelId"
        :tabindex="activeTab === 'css' ? 0 : -1"
        :variant="activeTab === 'css' ? 'solid' : 'ghost'"
        size="xs"
        @click="activeTab = 'css'"
      />
      <UButton
        :id="tabIds.json"
        label="JSON"
        role="tab"
        :aria-selected="activeTab === 'json'"
        :aria-controls="panelId"
        :tabindex="activeTab === 'json' ? 0 : -1"
        :variant="activeTab === 'json' ? 'solid' : 'ghost'"
        size="xs"
        @click="activeTab = 'json'"
      />
    </div>

    <!-- Code block -->
    <pre
      :id="panelId"
      role="tabpanel"
      :aria-labelledby="tabIds[activeTab]"
      tabindex="0"
      class="bg-[var(--ui-bg-elevated)] rounded-lg p-3 text-xs leading-relaxed overflow-x-auto max-h-64 overflow-y-auto border border-[var(--ui-border)]"
    ><code>{{ currentCode }}</code></pre>

    <!-- Actions -->
    <div class="flex gap-2">
      <UButton
        :label="copied ? 'Copied!' : 'Copy'"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-clipboard'"
        :color="copied ? 'success' : 'neutral'"
        variant="soft"
        size="xs"
        @click="handleCopy"
      />
      <UButton
        label="Download"
        icon="i-lucide-download"
        variant="soft"
        size="xs"
        @click="handleDownload"
      />
    </div>

    <!-- Import section -->
    <div class="border-t border-[var(--ui-border)] pt-3 mt-3 space-y-2">
      <p
        class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted)"
      >
        Import JSON
      </p>
      <UTextarea
        v-model="importText"
        placeholder="Paste theme JSON here..."
        aria-label="Theme JSON to import"
        :rows="4"
      />
      <UButton
        label="Import"
        icon="i-lucide-upload"
        variant="soft"
        size="xs"
        @click="handleImport"
      />
      <p
        v-if="importStatus"
        aria-live="polite"
        class="text-xs font-medium"
        :class="
          importStatus.type === 'success'
            ? 'text-[var(--ui-color-success-500)]'
            : 'text-[var(--ui-color-error-500)]'
        "
      >
        {{ importStatus.message }}
      </p>
    </div>
  </div>
</template>
