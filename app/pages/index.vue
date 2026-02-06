<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";
import { useThemeExport } from "~/composables/useThemeExport";
import { useThemeStore } from "~/stores/theme";

useThemeApply();

const store = useThemeStore();
const { decodeFromHash } = useThemeExport();

const previewWidth = ref<"mobile" | "tablet" | "desktop">("desktop");

const previewWidthOptions = [
  {
    value: "mobile" as const,
    icon: "i-lucide-smartphone",
    label: "Mobile",
    width: "375px",
  },
  {
    value: "tablet" as const,
    icon: "i-lucide-tablet",
    label: "Tablet",
    width: "768px",
  },
  {
    value: "desktop" as const,
    icon: "i-lucide-monitor",
    label: "Desktop",
    width: "100%",
  },
];

const currentPreviewWidth = computed(
  () => previewWidthOptions.find((o) => o.value === previewWidth.value)!.width,
);

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") {
    e.preventDefault();
    store.undo();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") {
    e.preventDefault();
    store.redo();
  }
}

onMounted(() => {
  if (import.meta.client) document.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  if (import.meta.client)
    document.removeEventListener("keydown", handleKeydown);
});

onMounted(() => {
  if (import.meta.client && window.location.hash) {
    const hash = window.location.hash;
    const prefix = "#theme=";
    if (hash.startsWith(prefix)) {
      const encoded = hash.slice(prefix.length);
      const result = decodeFromHash(encoded);
      if (!result.success)
        console.warn("Failed to load theme from URL:", result.error);
    }
  }
});

useHead({
  title: "Nuxt UI Theme Builder",
  meta: [
    {
      name: "description",
      content:
        "Visually configure Nuxt UI v4 design tokens and export your theme.",
    },
  ],
});
</script>

<template>
  <UDashboardGroup unit="px" storage-key="theme-builder">
    <UDashboardSidebar
      resizable
      collapsible
      :min-size="300"
      :max-size="600"
      :default-size="360"
    >
      <template #header="{ collapsed }">
        <h1
          v-if="!collapsed"
          class="text-lg font-bold text-[var(--ui-text-highlighted)] truncate"
        >
          Nuxt UI Theme Builder
        </h1>
        <UIcon
          v-else
          name="i-lucide-palette"
          class="size-5 text-(--ui-primary) mx-auto"
        />
        <div v-if="!collapsed" class="flex items-center gap-1 ms-auto">
          <UTooltip text="Undo">
            <UButton
              icon="i-lucide-undo-2"
              variant="ghost"
              size="xs"
              :disabled="!store.canUndo"
              @click="store.undo()"
            />
          </UTooltip>
          <UTooltip text="Redo">
            <UButton
              icon="i-lucide-redo-2"
              variant="ghost"
              size="xs"
              :disabled="!store.canRedo"
              @click="store.redo()"
            />
          </UTooltip>
          <UTooltip text="Reset to defaults">
            <UButton
              icon="i-lucide-rotate-ccw"
              color="error"
              variant="ghost"
              size="xs"
              @click="store.resetToDefaults()"
            />
          </UTooltip>
        </div>
      </template>

      <template #default="{ collapsed }">
        <ThemeEditor :collapsed="collapsed" />
      </template>

      <template #footer="{ collapsed }">
        <UDashboardSidebarCollapse />
        <span
          v-if="!collapsed"
          class="text-xs text-(--ui-text-dimmed) ms-auto truncate"
        >
          Nuxt UI Theme Builder
        </span>
      </template>
    </UDashboardSidebar>

    <main class="flex-1 h-full overflow-hidden flex flex-col">
      <!-- Toolbar -->
      <div
        class="shrink-0 flex items-center justify-between px-4 h-[var(--ui-header-height)] border-b border-(--ui-border)"
      >
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-(--ui-text-muted)"
            >Preview</span
          >
          <UBadge
            v-if="previewWidth !== 'desktop'"
            :label="
              previewWidthOptions.find((o) => o.value === previewWidth)!.width
            "
            variant="subtle"
            size="xs"
          />
        </div>
        <div class="flex items-center gap-1">
          <UColorModeSwitch />
          <USeparator orientation="vertical" class="h-4 mx-1" />
          <UTooltip
            v-for="option in previewWidthOptions"
            :key="option.value"
            :text="option.label"
          >
            <UButton
              :icon="option.icon"
              size="xs"
              :variant="previewWidth === option.value ? 'soft' : 'ghost'"
              :color="previewWidth === option.value ? 'primary' : 'neutral'"
              @click="previewWidth = option.value"
            />
          </UTooltip>
        </div>
      </div>

      <!-- Preview area -->
      <div class="flex-1 overflow-y-auto bg-(--ui-bg-muted) p-4">
        <div
          class="mx-auto rounded-xl bg-(--ui-bg) transition-[max-width] duration-300 ease-in-out border border-(--ui-border)"
          :style="{ maxWidth: currentPreviewWidth }"
        >
          <ThemePreview />
        </div>
      </div>
    </main>
  </UDashboardGroup>
</template>
