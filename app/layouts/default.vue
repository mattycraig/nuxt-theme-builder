<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { useThemeApply } from "~/composables/useThemeApply";
import { usePreviewIframe } from "~/composables/usePreviewIframe";
import { usePreviewResize } from "~/composables/usePreviewResize";
import { useKeyboardShortcuts } from "~/composables/useKeyboardShortcuts";
import { NAVIGATION_ITEMS, flattenNavigationItems } from "~/utils/navigation";
import { useSourceCode } from "~/composables/useSourceCode";

useThemeApply();
useKeyboardShortcuts();

// Source code viewer ────────────────────────────────────────────────────
const {
  viewMode,
  sourceCode,
  sourceFilePath,
  isLoadingSource,
  sourceError,
  hasSourcePage,
  setViewMode,
  retry: retrySource,
} = useSourceCode();

const route = useRoute();
const colorMode = useColorMode();
const store = useThemeStore();

// Iframe Preview ────────────────────────────────────────────────────────
const { previewFrame, iframeLoading, iframeInitialSrc, handleIframeLoad } =
  usePreviewIframe();

// Preview Resize ────────────────────────────────────────────────────────
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

// Navigation ────────────────────────────────────────────────────────────
const allNavItems = computed(() => flattenNavigationItems(NAVIGATION_ITEMS));

const currentPageLabel = computed(
  () => allNavItems.value.find((i) => i.to === route.path)?.label ?? "Preview",
);

// Breadcrumb ────────────────────────────────────────────────────────────
const breadcrumbItems = computed(() => {
  const items: { label: string; icon?: string; to?: string }[] = [
    { label: "Home", icon: "i-lucide-home", to: "/" },
  ];

  if (route.path === "/") return items;

  const topLevel = (NAVIGATION_ITEMS[0] ?? []).find(
    (nav) =>
      nav.to === route.path ||
      nav.children?.some((c) => c.to && route.path.startsWith(String(c.to))),
  );

  if (topLevel) {
    items.push({
      label: topLevel.label ?? "",
      icon: topLevel.icon as string | undefined,
      to: String(topLevel.to),
    });

    if (topLevel.to !== route.path) {
      const child = topLevel.children?.find((c) => String(c.to) === route.path);
      if (child) {
        items.push({
          label: child.label ?? "",
          icon: child.icon as string | undefined,
          to: String(child.to),
        });
      }
    }
  }

  return items;
});

// Search ────────────────────────────────────────────────────────────────
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

// SEO ───────────────────────────────────────────────────────────────────
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

// Mobile navigation dropdown ─────────────────────────────────────────
const mobileNavItems = computed(() => [
  (NAVIGATION_ITEMS[0] ?? []).map((item) => ({
    label: item.label,
    icon: item.icon as string,
    to: String(item.to),
    children: item.children?.map((child) => ({
      label: child.label,
      icon: child.icon as string,
      to: child.to ? String(child.to) : undefined,
    })),
  })),
]);

function onSearchSelect(option: { to?: string }) {
  if (option.to) navigateTo(option.to);
}
</script>

<template>
  <UDashboardGroup unit="px" storage-key="theme-builder">
    <a href="#maincontent" class="skip-link">Skip to main content</a>

    <!-- Sidebar (Theme Editor) ─────────────────────────────────────── -->
    <UDashboardSidebar
      resizable
      collapsible
      :min-size="300"
      :max-size="600"
      :default-size="300"
      :ui="{
        header: 'border-b border-default sm:px-4',
        body: 'p-0 sm:p-0',
        footer: 'border-t border-default py-4',
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

      <template #footer="{ collapsed }">
        <UButton
          v-if="!collapsed"
          icon="i-lucide-import"
          label="Export / Import Theme"
          block
          size="md"
          variant="solid"
          color="primary"
          @click="useExportPanel().open()"
        />
        <UTooltip v-else text="Export / Import Theme">
          <UButton
            icon="i-lucide-import"
            aria-label="Export Theme"
            size="sm"
            variant="solid"
            color="primary"
            @click="useExportPanel().open()"
          />
        </UTooltip>
      </template>
    </UDashboardSidebar>

    <!-- Main Content ──────────────────────────────────────────────── -->
    <main id="maincontent" class="flex-1 h-full overflow-hidden flex flex-col">
      <!-- Bar 1: Top Navbar — page identity + global actions ────── -->
      <UDashboardNavbar>
        <template #leading>
          <UDashboardSidebarCollapse />
          <USeparator orientation="vertical" class="h-6 mx-2" />
        </template>

        <template #trailing>
          <!-- Desktop: full horizontal navigation menu -->
          <UNavigationMenu
            :items="NAVIGATION_ITEMS"
            class="hidden md:flex flex-1 min-w-max"
          />

          <!-- Mobile: compact dropdown -->
          <UDropdownMenu :items="mobileNavItems" class="md:hidden">
            <UButton
              :label="currentPageLabel"
              variant="ghost"
              color="neutral"
              trailing-icon="i-lucide-chevron-down"
            />
          </UDropdownMenu>
        </template>

        <template #right>
          <UDashboardSearchButton />
          <USeparator orientation="vertical" class="h-6 mx-2" />

          <!-- Future slot: localization dropdown, etc. -->
          <UColorModeSwitch />
        </template>
      </UDashboardNavbar>

      <!-- Bar 2: Navigation — page switching + breadcrumbs ──────── -->
      <!-- <UDashboardToolbar>
      </UDashboardToolbar> -->

      <!-- Bar 3: Preview controls — viewport sizing + actions ───── -->
      <div
        class="hidden md:flex items-center justify-between gap-1.5 md:px-6 md:pt-6 shrink-0 bg-(--ui-bg-muted) relative"
        role="toolbar"
        aria-label="Preview controls"
      >
        <UBreadcrumb
          :items="breadcrumbItems"
          :ui="{ linkLeadingIcon: 'size-4', link: 'text-xs' }"
        />

        <UFieldGroup
          class="flex items-center absolute left-1/2 -translate-x-1/2"
          role="group"
          aria-label="Change preview width"
        >
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
              variant="outline"
              :color="previewWidth === option.value ? 'primary' : 'neutral'"
              :aria-pressed="previewWidth === option.value"
              @click="previewWidth = option.value"
            />
          </UTooltip>

          <!-- Custom width popover -->
          <UPopover>
            <UTooltip text="Set custom preview width">
              <UButton
                :label="displayWidth"
                variant="subtle"
                size="sm"
                color="neutral"
                class="font-mono tabular-nums"
                aria-label="Set custom preview width"
              />
            </UTooltip>
            <template #content>
              <div class="p-3 space-y-2">
                <label
                  for="custom-width-input"
                  class="text-sm font-medium text-(--ui-text-muted) block"
                >
                  Custom width (px)
                </label>
                <UInput
                  id="custom-width-input"
                  type="number"
                  :model-value="customWidth ?? ''"
                  :min="320"
                  placeholder="e.g. 480"
                  size="sm"
                  @update:model-value="onCustomWidthInput"
                />
              </div>
            </template>
          </UPopover>
        </UFieldGroup>

        <div class="flex items-center gap-2">
          <!-- Preview / Code toggle -->
          <UFieldGroup
            v-if="hasSourcePage"
            class="flex items-center"
            role="group"
            aria-label="View mode"
          >
            <UTooltip text="Preview">
              <UButton
                icon="i-lucide-eye"
                aria-label="Preview"
                size="sm"
                variant="outline"
                :color="viewMode === 'preview' ? 'primary' : 'neutral'"
                :aria-pressed="viewMode === 'preview'"
                @click="setViewMode('preview')"
              />
            </UTooltip>
            <UTooltip text="View source code">
              <UButton
                icon="i-lucide-code"
                aria-label="View source code"
                size="sm"
                variant="outline"
                :color="viewMode === 'code' ? 'primary' : 'neutral'"
                :aria-pressed="viewMode === 'code'"
                @click="setViewMode('code')"
              />
            </UTooltip>
          </UFieldGroup>

          <USeparator
            v-if="hasSourcePage"
            orientation="vertical"
            class="h-6 mx-2"
          />

          <!-- Export/Import Button -->
          <UButton
            icon="i-lucide-import"
            label="Export / Import"
            size="sm"
            variant="solid"
            color="primary"
            @click="useExportPanel().open()"
          />
        </div>
      </div>

      <!-- Source code view (replaces iframe when active) -->
      <SourceCodeView
        v-if="viewMode === 'code' && hasSourcePage"
        :source="sourceCode"
        :file-path="sourceFilePath"
        :loading="isLoadingSource"
        :error="sourceError"
        @retry="retrySource"
      />

      <!-- Preview area with resizable iframe -->
      <PreviewFrame
        v-show="viewMode === 'preview' || !hasSourcePage"
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
      placeholder="Search pages & actions\u2026"
      @update:model-value="onSearchSelect"
    />

    <!-- Hidden slot keeps NuxtPage mounted so Vue Router reactivity works -->
    <div class="hidden">
      <slot />
    </div>

    <!-- Save-theme modal (singleton rendered at layout level) -->
    <SaveThemeModal />

    <!-- Export/Import slideover (singleton rendered at layout level) -->
    <EditorExportSlideover />

    <SpeedInsights />
  </UDashboardGroup>
</template>
