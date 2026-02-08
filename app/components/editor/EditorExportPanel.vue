<script setup lang="ts">
type ExportTab = "appconfig" | "css" | "json";

const activeTab = ref<ExportTab>("appconfig");

const exportTabs = [
  { label: "app.config.ts", value: "appconfig" as const },
  { label: "CSS", value: "css" as const },
  { label: "JSON", value: "json" as const },
];

const { appConfigExport, cssExport, jsonExport, importJSON, downloadFile } =
  useThemeExport();
const { copy, copied } = useClipboard();
const toast = useToast();

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
  toast.add({
    title: "Copied to clipboard",
    icon: "i-lucide-check",
    color: "success",
  });
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
  toast.add({
    title: "File downloaded",
    icon: "i-lucide-download",
    color: "success",
  });
}

const importText = ref("");

function handleImport() {
  const trimmed = importText.value.trim();
  if (!trimmed) {
    toast.add({
      title: "Import failed",
      description: "Please paste JSON to import.",
      icon: "i-lucide-alert-circle",
      color: "error",
    });
    return;
  }
  const result = importJSON(trimmed);
  if (result.success) {
    toast.add({
      title: "Theme imported",
      description: "Theme applied successfully",
      icon: "i-lucide-check",
      color: "success",
    });
    importText.value = "";
  } else {
    toast.add({
      title: "Import failed",
      description: result.error || "Invalid theme JSON",
      icon: "i-lucide-alert-circle",
      color: "error",
    });
  }
}
</script>

<template>
  <div class="space-y-3">
    <UTabs
      v-model="activeTab"
      :items="exportTabs"
      value-key="value"
      size="xs"
      :content="false"
    />

    <!-- Code block -->
    <pre
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
    </div>
  </div>
</template>
