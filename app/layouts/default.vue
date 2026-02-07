<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";
import { useThemeExport } from "~/composables/useThemeExport";
import { useThemeStore } from "~/stores/theme";
import type { NavigationMenuItem } from "@nuxt/ui";

useThemeApply();

const store = useThemeStore();
const { decodeFromHash } = useThemeExport();
const route = useRoute();

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

const currentPageLabel = computed(() => {
  const flat = items.flat().flatMap((g) => (Array.isArray(g) ? g : [g]));
  return flat.find((i) => i.to === route.path)?.label ?? "Preview";
});

// --- Iframe preview ---
const previewFrame = ref<HTMLIFrameElement>();
const iframeSrc = computed(() => `${route.path}?preview`);
const colorMode = useColorMode();

// Sync theme config to iframe on every change
watch(
  () => store.config,
  (newConfig) => {
    previewFrame.value?.contentWindow?.postMessage(
      {
        type: "theme-sync",
        config: JSON.parse(JSON.stringify(newConfig)),
      },
      "*",
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
      "*",
    );
  },
);

// When iframe signals it's ready, push full state
function handleIframeMessage(event: MessageEvent) {
  if (event.data?.type === "preview-ready") {
    previewFrame.value?.contentWindow?.postMessage(
      {
        type: "theme-sync",
        config: JSON.parse(JSON.stringify(store.config)),
      },
      "*",
    );
    previewFrame.value?.contentWindow?.postMessage(
      {
        type: "colormode-sync",
        mode: colorMode.preference,
      },
      "*",
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
        <span
          v-if="!collapsed"
          class="text-xs text-(--ui-text-dimmed) ms-auto truncate"
        >
          Nuxt UI Theme Builder
        </span>
      </template>
    </UDashboardSidebar>

    <main class="flex-1 h-full overflow-hidden flex flex-col">
      <!-- Navbar -->
      <UDashboardNavbar :title="currentPageLabel">
        <template #leading>
          <UDashboardSidebarCollapse />
          <USeparator orientation="vertical" class="h-6 mx-1" />
        </template>

        <template #right>
          <UBadge
            :label="displayWidth"
            variant="subtle"
            size="xs"
            color="neutral"
          />
          <UTooltip
            v-for="option in previewWidthOptions"
            :key="option.value"
            :text="option.label"
          >
            <UButton
              :icon="option.icon"
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
            class="h-full rounded-xl border border-(--ui-border) shadow-xl overflow-hidden"
          >
            <iframe
              ref="previewFrame"
              :src="iframeSrc"
              title="Theme preview"
              class="w-full h-full border-0"
              :class="{ 'pointer-events-none': isDragging }"
            />
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
    <!-- Hidden slot keeps NuxtPage mounted so Vue Router reactivity works -->
    <div class="hidden">
      <slot />
    </div>
  </UDashboardGroup>
</template>
