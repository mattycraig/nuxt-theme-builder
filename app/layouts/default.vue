<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { useThemeApply } from "~/composables/useThemeApply";
import { usePreviewIframe } from "~/composables/usePreviewIframe";
import { usePreviewResize } from "~/composables/usePreviewResize";
import { useKeyboardShortcuts } from "~/composables/useKeyboardShortcuts";
import { NAVIGATION_ITEMS, flattenNavigationItems } from "~/utils/navigation";

useThemeApply();
useKeyboardShortcuts();

const route = useRoute();
const colorMode = useColorMode();
const store = useThemeStore();

// ─── Iframe Preview ────────────────────────────────────────────────────────
const { previewFrame, iframeLoading, iframeInitialSrc, handleIframeLoad } =
  usePreviewIframe();

// ─── Preview Resize ────────────────────────────────────────────────────────
const {
  previewWidth,
  customWidth,
  isDragging,
  previewArea,
  PRESET_WIDTHS,
  currentPreviewWidth,
  displayWidth,
  startResize,
  onCustomWidthInput,
} = usePreviewResize();

// ─── Navigation ────────────────────────────────────────────────────────────
const allNavItems = computed(() => flattenNavigationItems(NAVIGATION_ITEMS));

const currentPageLabel = computed(
  () => allNavItems.value.find((i) => i.to === route.path)?.label ?? "Preview",
);

// ─── Search ────────────────────────────────────────────────────────────────
const searchGroups = computed(() => [
  {
    id: "pages",
    label: "Preview Pages",
    items: allNavItems.value.map((item) => ({
      label: item.label,
      icon: item.icon,
      to: item.to,
    })),
  },
  {
    id: "actions",
    label: "Quick Actions",
    items: buildQuickActions(),
  },
]);

function buildQuickActions() {
  const { quickSave, openSaveAs } = useSaveThemeModal();
  return [
    {
      label: "Toggle Color Mode",
      icon: colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon",
      suffix: colorMode.value === "dark" ? "Switch to light" : "Switch to dark",
      onSelect() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
      },
    },
    {
      label: "Undo",
      icon: "i-lucide-undo-2",
      suffix: "Undo last change",
      kbds: ["meta", "Z"],
      disabled: !store.canUndo,
      onSelect: () => store.undo(),
    },
    {
      label: "Redo",
      icon: "i-lucide-redo-2",
      suffix: "Redo last change",
      kbds: ["meta", "shift", "Z"],
      disabled: !store.canRedo,
      onSelect: () => store.redo(),
    },
    {
      label: "Reset to Defaults",
      icon: "i-lucide-rotate-ccw",
      suffix: "Reset all theme settings",
      onSelect: () => store.resetToDefaults(),
    },
    {
      label: "Save Theme",
      icon: "i-lucide-save",
      suffix:
        store.activePresetName && store.hasUnsavedChanges
          ? `Save "${store.activePresetName}"`
          : "Save as new theme",
      kbds: ["meta", "S"],
      onSelect() {
        if (store.activePresetName && store.hasUnsavedChanges) {
          quickSave();
        } else {
          openSaveAs();
        }
      },
    },
    {
      label: "Save Theme As...",
      icon: "i-lucide-file-plus",
      suffix: "Save as a new theme with a name",
      kbds: ["meta", "shift", "S"],
      onSelect: () => openSaveAs(),
    },
  ];
}

// ─── SEO ───────────────────────────────────────────────────────────────────
const seoTitle = computed(
  () => `${currentPageLabel.value} — Nuxt UI Theme Builder`,
);

useSeoMeta({
  title: seoTitle,
  description:
    "Visually configure Nuxt UI v4 design tokens and export your theme.",
  ogTitle: seoTitle,
  ogDescription:
    "Visually configure Nuxt UI v4 design tokens and export your theme.",
  ogType: "website",
  twitterCard: "summary_large_image",
});

function onSearchSelect(option: { to?: string }) {
  if (option.to) navigateTo(option.to);
}
</script>

<template>
  <UDashboardGroup unit="px" storage-key="theme-builder">
    <a href="#maincontent" class="skip-link">Skip to main content</a>

    <!-- ─── Sidebar (Theme Editor) ─────────────────────────────────────── -->
    <UDashboardSidebar
      resizable
      collapsible
      :min-size="300"
      :max-size="600"
      :default-size="300"
      :ui="{
        header: 'border-b border-default sm:px-4',
        body: 'p-0 sm:p-0',
      }"
    >
      <template #header="{ collapsed }">
        <h1
          v-if="!collapsed"
          class="text-lg font-bold text-[var(--ui-text-highlighted)] truncate flex items-center gap-2"
        >
          <UIcon name="i-lucide-palette" class="size-5 text-(--ui-primary)" />
          Nuxt UI Builder
        </h1>
        <UIcon
          v-else
          name="i-lucide-palette"
          class="size-5 text-(--ui-primary) mx-auto"
        />
      </template>

      <template #default="{ collapsed }">
        <ThemeEditor :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <!-- ─── Main Content ──────────────────────────────────────────────── -->
    <main id="maincontent" class="flex-1 h-full overflow-hidden flex flex-col">
      <!-- Navbar with preview width controls -->
      <UDashboardNavbar :title="currentPageLabel">
        <template #leading>
          <UDashboardSidebarCollapse />
          <USeparator orientation="vertical" class="h-6 mx-1" />
        </template>

        <template #right>
          <UDashboardSearchButton collapsed class="me-2" />

          <!-- Custom width popover -->
          <UPopover>
            <UTooltip text="Set custom preview width">
              <UButton
                :label="displayWidth"
                variant="subtle"
                size="xs"
                color="neutral"
                aria-label="Set custom preview width"
              />
            </UTooltip>
            <template #content>
              <div class="p-3 space-y-2">
                <label
                  for="custom-width-input"
                  class="text-xs font-medium text-(--ui-text-muted) block"
                >
                  Custom width (px)
                </label>
                <UInput
                  id="custom-width-input"
                  type="number"
                  :model-value="customWidth ?? ''"
                  :min="320"
                  placeholder="e.g. 480"
                  size="xs"
                  @update:model-value="onCustomWidthInput"
                />
              </div>
            </template>
          </UPopover>

          <!-- Preset width toggles -->
          <UTooltip
            v-for="option in PRESET_WIDTHS"
            :key="option.value"
            :text="option.label"
          >
            <UButton
              :icon="option.icon"
              :aria-label="option.label"
              size="sm"
              :variant="previewWidth === option.value ? 'soft' : 'ghost'"
              :color="previewWidth === option.value ? 'primary' : 'neutral'"
              @click="previewWidth = option.value"
            />
          </UTooltip>
          <USeparator orientation="vertical" class="h-6 mx-2" />
          <UColorModeSwitch />
        </template>
      </UDashboardNavbar>

      <!-- Navigation toolbar -->
      <UDashboardToolbar :ui="{ root: 'overflow-visible' }">
        <UNavigationMenu
          :items="NAVIGATION_ITEMS"
          highlight
          class="flex-1 min-w-max"
        />
      </UDashboardToolbar>

      <!-- Preview area with resizable iframe -->
      <PreviewFrame
        v-model:preview-frame="previewFrame"
        v-model:preview-area="previewArea"
        :iframe-initial-src="iframeInitialSrc"
        :iframe-loading="iframeLoading"
        :is-dragging="isDragging"
        :current-preview-width="currentPreviewWidth"
        @iframe-load="handleIframeLoad"
        @start-resize="startResize"
      />
    </main>

    <!-- Command palette search -->
    <UDashboardSearch
      :groups="searchGroups"
      placeholder="Search pages & actions..."
      @update:model-value="onSearchSelect"
    />

    <!-- Hidden slot keeps NuxtPage mounted so Vue Router reactivity works -->
    <div class="hidden">
      <slot />
    </div>

    <!-- Save-theme modal (singleton rendered at layout level) -->
    <SaveThemeModal />

    <SpeedInsights />
  </UDashboardGroup>
</template>
