<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { useThemeApply } from "~/composables/useThemeApply";
import { useThemeStore } from "~/stores/theme";
import { useSaveThemeModal } from "~/composables/useThemeExport";
import type { NavigationMenuItem } from "@nuxt/ui";

useThemeApply();

const store = useThemeStore();
const route = useRoute();
const {
  isOpen: saveModalOpen,
  themeName: saveModalThemeName,
  isOverwrite: saveModalIsOverwrite,
  openSaveAs,
  quickSave: saveModalQuickSave,
  confirm: saveModalConfirm,
  cancel: saveModalCancel,
} = useSaveThemeModal();

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

const items: NavigationMenuItem[][] = [
  [
    {
      label: "Components",
      icon: "i-lucide-layout-grid",
      to: "/",
    },
    {
      label: "Dashboard",
      icon: "i-lucide-layout-dashboard",
      to: "/dashboard",
    },
    {
      label: "Landing",
      icon: "i-lucide-rocket",
      to: "/landing",
    },
    {
      label: "Pricing",
      icon: "i-lucide-credit-card",
      to: "/pricing",
    },
    {
      label: "Login",
      icon: "i-lucide-log-in",
      to: "/login",
    },
    {
      label: "Blog",
      icon: "i-lucide-newspaper",
      to: "/blog",
    },
    {
      label: "Changelog",
      icon: "i-lucide-history",
      to: "/changelog",
    },
    {
      label: "Chat",
      icon: "i-lucide-message-circle",
      to: "/chat",
    },
    {
      label: "Editor",
      icon: "i-lucide-file-edit",
      to: "/editor",
    },
    {
      label: "Error",
      icon: "i-lucide-alert-triangle",
      to: "/error-page",
    },
  ],
];

const colorMode = useColorMode();

// Search groups - Editor settings and Preview pages
const searchGroups = computed(() => [
  {
    id: "pages",
    label: "Preview Pages",
    items: items.flat().map((item) => ({
      label: item.label,
      icon: item.icon,
      to: item.to,
    })),
  },
  {
    id: "actions",
    label: "Quick Actions",
    items: [
      {
        label: "Toggle Color Mode",
        icon: colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon",
        suffix:
          colorMode.value === "dark" ? "Switch to light" : "Switch to dark",
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
        onSelect() {
          store.undo();
        },
      },
      {
        label: "Redo",
        icon: "i-lucide-redo-2",
        suffix: "Redo last change",
        kbds: ["meta", "shift", "Z"],
        disabled: !store.canRedo,
        onSelect() {
          store.redo();
        },
      },
      {
        label: "Reset to Defaults",
        icon: "i-lucide-rotate-ccw",
        suffix: "Reset all theme settings",
        onSelect() {
          store.resetToDefaults();
        },
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
            saveModalQuickSave();
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
        onSelect() {
          openSaveAs();
        },
      },
    ],
  },
]);

const customWidth = ref<number | null>(null);
const isDragging = ref(false);
const previewArea = ref<HTMLElement>();

const currentPreviewWidth = computed(() => {
  if (customWidth.value !== null) return `${customWidth.value}px`;
  return previewWidthOptions.find((o) => o.value === previewWidth.value)!.width;
});

const displayWidth = computed(() => {
  if (customWidth.value !== null) return `${customWidth.value}px`;
  return previewWidthOptions.find((o) => o.value === previewWidth.value)!.width;
});

// When a preset is clicked, clear custom width
watch(previewWidth, () => {
  customWidth.value = null;
});

// Drag-to-resize logic — each handle drags independently, both edges move symmetrically
function startResize(e: MouseEvent, side: "left" | "right") {
  e.preventDefault();
  isDragging.value = true;

  const area = previewArea.value;
  if (!area) return;

  const startX = e.clientX;
  // Resolve current rendered width (works for both pixel and 100%)
  const iframeWrapper = area.querySelector(
    "[data-preview-wrapper]",
  ) as HTMLElement | null;
  if (!iframeWrapper) return;
  const startWidth = iframeWrapper.getBoundingClientRect().width;
  const maxW = area.clientWidth;

  function onMouseMove(ev: MouseEvent) {
    const dx = ev.clientX - startX;
    // Multiply by 2 so dragging one side keeps the preview centered
    const delta = side === "right" ? dx * 2 : -dx * 2;
    const newWidth = Math.round(
      Math.max(320, Math.min(startWidth + delta, maxW)),
    );
    customWidth.value = newWidth;
  }

  function onMouseUp() {
    isDragging.value = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

function onCustomWidthInput(val: string | number) {
  const num = Number(val);
  if (!isNaN(num) && num >= 320) {
    customWidth.value = Math.min(num, previewArea.value?.clientWidth ?? 1920);
  } else if (val === "" || val == null) {
    customWidth.value = null;
  }
}

const currentPageLabel = computed(() => {
  const flat = items.flat().flatMap((g) => (Array.isArray(g) ? g : [g]));
  return flat.find((i) => i.to === route.path)?.label ?? "Preview";
});

// --- Iframe preview ---
const previewFrame = ref<HTMLIFrameElement>();
const iframeLoading = ref(true);
const iframeReady = ref(false);

// Load the iframe once with the initial route; subsequent navigation happens via postMessage
const iframeSrc = computed(() => `${route.path}?preview`);
const iframeInitialSrc = ref(`${route.path}?preview`);

// Navigate iframe internally via postMessage instead of reloading
watch(iframeSrc, (newSrc) => {
  if (!iframeReady.value) return;
  iframeLoading.value = true;
  previewFrame.value?.contentWindow?.postMessage(
    { type: "navigate", path: newSrc },
    window.location.origin,
  );
});

// Sync theme config to iframe on every change
watch(
  () => store.config,
  (newConfig) => {
    previewFrame.value?.contentWindow?.postMessage(
      {
        type: "theme-sync",
        config: structuredClone(toRaw(newConfig)),
      },
      window.location.origin,
    );
  },
  { deep: true },
);

// Sync color mode preference to iframe
watch(
  () => colorMode.preference,
  (pref) => {
    previewFrame.value?.contentWindow?.postMessage(
      {
        type: "colormode-sync",
        mode: pref,
      },
      window.location.origin,
    );
  },
);

// When iframe signals it's ready, push full state
function handleIframeMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) return;

  if (event.data?.type === "preview-ready") {
    iframeReady.value = true;
    iframeLoading.value = false;
    previewFrame.value?.contentWindow?.postMessage(
      {
        type: "theme-sync",
        config: structuredClone(toRaw(store.config)),
      },
      window.location.origin,
    );
    previewFrame.value?.contentWindow?.postMessage(
      {
        type: "colormode-sync",
        mode: colorMode.preference,
      },
      window.location.origin,
    );
  }
}

function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") {
    e.preventDefault();
    store.undo();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") {
    e.preventDefault();
    store.redo();
  }
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "s") {
    e.preventDefault();
    if (store.activePresetName && store.hasUnsavedChanges) {
      saveModalQuickSave();
    } else {
      openSaveAs();
    }
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "s") {
    e.preventDefault();
    openSaveAs();
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener("keydown", handleKeydown);
    window.addEventListener("message", handleIframeMessage);
  }
});
onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("message", handleIframeMessage);
  }
});

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

// Handle search command selection
function onSearchSelect(option: any) {
  if (option.to) {
    navigateTo(option.to);
  }
}
</script>

<template>
  <UDashboardGroup unit="px" storage-key="theme-builder">
    <a href="#maincontent" class="skip-link">Skip to main content</a>
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

    <main id="maincontent" class="flex-1 h-full overflow-hidden flex flex-col">
      <!-- Navbar -->
      <UDashboardNavbar :title="currentPageLabel">
        <template #leading>
          <UDashboardSidebarCollapse />
          <USeparator orientation="vertical" class="h-6 mx-1" />
        </template>

        <template #right>
          <UDashboardSearchButton collapsed class="me-2" />
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
          <UTooltip
            v-for="option in previewWidthOptions"
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
      <UDashboardToolbar class="overflow-x-auto">
        <UNavigationMenu :items="items" highlight class="flex-1 min-w-max" />
      </UDashboardToolbar>

      <!-- Preview area (iframe-based for true viewport responsive behavior) -->
      <div
        ref="previewArea"
        class="flex-1 overflow-hidden bg-(--ui-bg-muted) p-4 sm:p-6 flex justify-center items-stretch"
      >
        <div
          data-preview-wrapper
          class="relative h-full mx-auto"
          :class="[
            isDragging ? '' : 'transition-[width] duration-300 ease-in-out',
          ]"
          :style="{ width: currentPreviewWidth, maxWidth: '100%' }"
        >
          <!-- Left drag handle -->
          <div
            class="absolute -left-3 top-0 bottom-0 w-3 cursor-col-resize group flex items-center justify-center z-10"
            @mousedown.prevent="startResize($event, 'left')"
          >
            <div
              class="w-1 h-16 rounded-full bg-(--ui-border) group-hover:bg-(--ui-primary) transition-colors"
            />
          </div>

          <!-- Iframe -->
          <div
            class="relative h-full rounded-xl border border-(--ui-border) shadow-xl overflow-hidden"
          >
            <iframe
              ref="previewFrame"
              :src="iframeInitialSrc"
              title="Theme preview"
              class="w-full h-full border-0"
              :class="{ 'pointer-events-none': isDragging }"
            >
              Your browser does not support iframes. Please use a modern browser
              to view the theme preview.
            </iframe>
            <!-- Loading overlay -->
            <Transition
              enter-active-class="transition-opacity duration-200"
              leave-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
            >
              <div
                v-if="iframeLoading"
                class="absolute inset-0 flex items-center justify-center bg-(--ui-bg)/60 backdrop-blur-sm z-10"
              >
                <div class="flex flex-col items-center gap-3">
                  <UIcon
                    name="i-lucide-loader-2"
                    class="size-8 text-(--ui-primary) animate-spin"
                  />
                  <span class="text-sm text-(--ui-text-muted)"
                    >Loading preview…</span
                  >
                </div>
              </div>
            </Transition>
          </div>

          <!-- Right drag handle -->
          <div
            class="absolute -right-3 top-0 bottom-0 w-3 cursor-col-resize group flex items-center justify-center z-10"
            @mousedown.prevent="startResize($event, 'right')"
          >
            <div
              class="w-1 h-16 rounded-full bg-(--ui-border) group-hover:bg-(--ui-primary) transition-colors"
            />
          </div>
        </div>
      </div>
    </main>
    <UDashboardSearch
      :groups="searchGroups"
      placeholder="Search pages & actions..."
      @update:model-value="onSearchSelect"
    />

    <!-- Hidden slot keeps NuxtPage mounted so Vue Router reactivity works -->
    <div class="hidden">
      <slot />
    </div>

    <!-- Save-theme modal (shared via composable, rendered once at layout level) -->
    <UModal
      :open="saveModalOpen"
      title="Save theme"
      :description="
        saveModalIsOverwrite
          ? `A theme named &quot;${saveModalThemeName.trim()}&quot; already exists. Saving will overwrite it.`
          : 'Give your theme a name to save it.'
      "
      @close="saveModalCancel()"
    >
      <template #body>
        <div class="space-y-3">
          <div>
            <label
              for="save-modal-name"
              class="text-xs font-medium text-(--ui-text-muted) block mb-1.5"
            >
              Theme name
            </label>
            <UInput
              id="save-modal-name"
              v-model="saveModalThemeName"
              placeholder="My theme..."
              aria-label="Theme name"
              size="lg"
              autofocus
              class="w-full"
              @keyup.enter="saveModalConfirm()"
              @keyup.escape="saveModalCancel()"
            />
          </div>
          <div
            v-if="saveModalIsOverwrite"
            class="text-xs text-(--ui-color-warning-500) flex items-center gap-1.5 px-2.5 py-2 rounded-md bg-(--ui-color-warning-500)/8"
            role="status"
          >
            <UIcon
              name="i-lucide-alert-triangle"
              class="size-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>Will overwrite "{{ saveModalThemeName.trim() }}"</span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2 ml-auto">
          <UButton label="Cancel" variant="ghost" @click="saveModalCancel()" />
          <UButton
            :label="saveModalIsOverwrite ? 'Update' : 'Save'"
            color="primary"
            variant="solid"
            icon="i-lucide-save"
            :disabled="!saveModalThemeName.trim()"
            @click="saveModalConfirm()"
          />
        </div>
      </template>
    </UModal>

    <SpeedInsights />
  </UDashboardGroup>
</template>
