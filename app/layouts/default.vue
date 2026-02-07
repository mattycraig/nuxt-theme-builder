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
  [
    {
      label: "Documentation",
      icon: "i-lucide-book-open",
      to: "https://ui.nuxt.com/docs",
      target: "_blank",
    },
    {
      label: "GitHub",
      icon: "i-lucide-github",
      to: "https://github.com/nuxt/ui",
      target: "_blank",
    },
  ],
];

/** Pages that should render full-width without the card wrapper */
// const fullWidthPages = [
//   "/landing",
//   "/login",
//   "/error-page",
//   "/chat",
//   "/editor",
//   "/dashboard",
// ];
// const isFullWidth = computed(() => fullWidthPages.includes(route.path));
const isFullWidth = false;

const currentPreviewWidth = computed(
  () => previewWidthOptions.find((o) => o.value === previewWidth.value)!.width,
);

const currentPageLabel = computed(() => {
  const flat = items.flat().flatMap((g) => (Array.isArray(g) ? g : [g]));
  return flat.find((i) => i.to === route.path)?.label ?? "Preview";
});

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
            :label="
              previewWidthOptions.find((o) => o.value === previewWidth)!.width
            "
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

      <!-- Preview area -->
      <div class="flex-1 overflow-y-auto bg-(--ui-bg-muted) p-4 sm:p-6">
        <!-- Full width pages (Landing, Login, Error, Chat, Editor, Dashboard) -->
        <div
          v-if="isFullWidth"
          class="mx-auto transition-[max-width] duration-300 ease-in-out"
          :style="{ maxWidth: currentPreviewWidth }"
        >
          <slot />
        </div>
        <!-- Card-wrapped pages (Components, Pricing, Blog, Changelog) -->
        <div
          v-else
          class="mx-auto rounded-xl bg-(--ui-bg) transition-[max-width] duration-300 ease-in-out border border-(--ui-border) shadow-xl"
          :style="{ maxWidth: currentPreviewWidth }"
        >
          <slot />
        </div>
      </div>
    </main>
  </UDashboardGroup>
</template>
