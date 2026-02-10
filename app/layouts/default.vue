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

const { quickSave, openSaveAs } = useSaveThemeModal();

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
const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/": "A visual design-token editor for Nuxt UI v4. Configure colors, radius, fonts, and shades — preview every component live — then export and drop into your project.",
  "/help":
    "Learn how to use the Nuxt UI Theme Builder — configure design tokens, preview components, and export your theme as app.config.ts, CSS, or JSON.",
  // Component pages
  "/components":
    "Browse individual Nuxt UI v4 components — buttons, badges, alerts, cards, inputs, tables, and more — all styled with your current theme settings.",
  "/components/all":
    "A live showcase of every Nuxt UI v4 component rendered with your current theme — buttons, inputs, tables, cards, and more on a single page.",
  "/components/accordion":
    "Preview Nuxt UI accordion components styled with your theme — expandable content panels for FAQs, nested menus, and collapsible sections.",
  "/components/alerts":
    "Preview Nuxt UI alert components styled with your theme — informational, warning, error, and success notifications with icons and actions.",
  "/components/avatars":
    "Preview Nuxt UI avatar components styled with your theme — user profile images, initials, status indicators, and avatar groups.",
  "/components/badges":
    "Preview Nuxt UI badge components styled with your theme — status labels, counters, and tag indicators in multiple variants and colors.",
  "/components/buttons":
    "Preview Nuxt UI button components styled with your theme — solid, outline, ghost, and link variants across all semantic colors and sizes.",
  "/components/calendar":
    "Preview Nuxt UI calendar components styled with your theme — date pickers and calendar widgets for scheduling and date selection.",
  "/components/cards":
    "Preview Nuxt UI card components styled with your theme — content containers with headers, footers, images, and action areas.",
  "/components/dropdown":
    "Preview Nuxt UI dropdown components styled with your theme — context menus, action lists, and nested menu options.",
  "/components/inputs":
    "Preview Nuxt UI input components styled with your theme — text fields, selects, checkboxes, toggles, textareas, and form controls.",
  "/components/misc":
    "Preview miscellaneous Nuxt UI components styled with your theme — tooltips, separators, skeletons, and other utility elements.",
  "/components/navigation":
    "Preview Nuxt UI navigation components styled with your theme — breadcrumbs, pagination, command palette, and tab navigation.",
  "/components/progress":
    "Preview Nuxt UI progress components styled with your theme — progress bars, loading indicators, and step-based progress trackers.",
  "/components/table":
    "Preview Nuxt UI table components styled with your theme — sortable data tables with pagination, selection, and custom cell rendering.",
  "/components/tabs":
    "Preview Nuxt UI tab components styled with your theme — horizontal and vertical tab layouts for organizing content sections.",
  // Block pages
  "/blocks":
    "Explore pre-built layout blocks — hero sections, feature grids, CTAs, testimonials, stats, and FAQs — styled with your current Nuxt UI theme.",
  "/blocks/hero":
    "Preview hero section blocks styled with your theme — bold headlines, calls to action, and background imagery for landing-page headers.",
  "/blocks/features":
    "Preview feature grid blocks styled with your theme — icon-based feature highlights for showcasing product capabilities.",
  "/blocks/cta":
    "Preview call-to-action blocks styled with your theme — conversion-focused sections with buttons and persuasive copy.",
  "/blocks/testimonials":
    "Preview testimonial blocks styled with your theme — customer quotes, ratings, and social proof sections.",
  "/blocks/stats":
    "Preview statistics blocks styled with your theme — metric counters, KPI dashboards, and data-highlight sections.",
  "/blocks/faq":
    "Preview FAQ blocks styled with your theme — accordion-based question and answer sections for common inquiries.",
  // Template pages
  "/templates":
    "See your theme applied to full page templates — dashboards, blogs, pricing pages, login screens, and more — all built with Nuxt UI v4 components.",
  "/templates/dashboard":
    "Preview a dashboard template styled with your theme — sidebar navigation, data cards, charts, and admin panel layout.",
  "/templates/blog":
    "Preview a blog template styled with your theme — article cards, featured posts, categories, and reading-list layouts.",
  "/templates/pricing":
    "Preview a pricing page template styled with your theme — tiered pricing cards, feature comparisons, and billing toggle.",
  "/templates/landing":
    "Preview a landing page template styled with your theme — hero section, features, testimonials, and conversion-focused layout.",
  "/templates/chat":
    "Preview a chat application template styled with your theme — message bubbles, conversation list, and real-time messaging UI.",
  "/templates/editor":
    "Preview a rich text editor template styled with your theme — toolbar, content area, and formatting controls.",
  "/templates/error-page":
    "Preview an error page template styled with your theme — 404 and 500 error states with illustrations and navigation links.",
};

const DEFAULT_DESCRIPTION =
  "Visually configure Nuxt UI v4 design tokens — colors, radius, fonts, and shades — preview every component live, then export as app.config.ts, CSS, or JSON.";

const seoTitle = computed(
  () => `${currentPageLabel.value} — Nuxt UI Theme Builder`,
);

const seoDescription = computed(
  () => PAGE_DESCRIPTIONS[route.path] ?? DEFAULT_DESCRIPTION,
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: "website",
  ogImage: "https://nuxt-theme-builder.vercel.app/og-image.png",
  twitterCard: "summary_large_image",
  twitterImage: "https://nuxt-theme-builder.vercel.app/og-image.png",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: computed(
        () => `https://nuxt-theme-builder.vercel.app${route.path}`,
      ),
    },
  ],
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
      :collapsed-size="0"
      :min-size="300"
      :max-size="600"
      :default-size="300"
      :ui="{
        root: 'min-w-0 overflow-hidden data-[collapsed=true]:invisible',
        header: 'border-b border-default sm:px-4',
        body: 'p-0 sm:p-0',
        footer: 'border-t border-default py-4',
      }"
    >
      <!-- <template #header>
        <p
          class="text-lg font-bold text-[var(--ui-text-highlighted)] truncate flex items-center gap-2"
          role="banner"
        >
          <UIcon
            name="i-lucide-palette"
            class="size-5 text-(--ui-primary)"
            aria-hidden="true"
          />
          Nuxt UI Builder
        </p>
      </template> -->

      <template #default>
        <ThemeEditor />
      </template>

      <template #footer>
        <UButton
          icon="i-lucide-import"
          label="Export / Import Theme"
          block
          size="md"
          variant="solid"
          color="primary"
          @click="useExportPanel().open()"
        />
      </template>
    </UDashboardSidebar>

    <!-- Main Content ──────────────────────────────────────────────── -->
    <main id="maincontent" class="flex-1 h-full overflow-hidden flex flex-col">
      <!-- Bar 1: Top Navbar — page identity + global actions ────── -->
      <UDashboardNavbar title="Nuxt UI Theme Builder">
        <template #leading>
          <UDashboardSidebarCollapse />
          <USeparator orientation="vertical" class="h-6 mx-2" />
          <UIcon
            name="i-lucide-palette"
            class="size-5 text-(--ui-primary)"
            aria-hidden="true"
          />
        </template>

        <template #right>
          <!-- Desktop: full horizontal navigation menu -->
          <UNavigationMenu
            :items="NAVIGATION_ITEMS"
            class="hidden lg:flex flex-1 min-w-max"
          />

          <!-- Mobile: compact dropdown -->
          <UDropdownMenu :items="mobileNavItems" class="lg:hidden ml-4">
            <UButton
              :label="currentPageLabel"
              variant="ghost"
              color="neutral"
              trailing-icon="i-lucide-chevron-down"
            />
          </UDropdownMenu>

          <UTooltip text="Help & Documentation">
            <UButton
              icon="i-lucide-circle-help"
              aria-label="Help & Documentation"
              variant="ghost"
              color="neutral"
              to="/help"
            />
          </UTooltip>

          <UTooltip text="Search pages & actions">
            <UDashboardSearchButton collapsed />
          </UTooltip>

          <USeparator orientation="vertical" class="h-6 mx-2 hidden sm:block" />

          <div class="hidden sm:block">
            <UColorModeSwitch />
          </div>
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
                :label="currentPreviewWidth"
                variant="subtle"
                size="sm"
                color="neutral"
                class="font-mono tabular-nums"
                :aria-label="`Current preview width: ${currentPreviewWidth}`"
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
                  class="w-full"
                  :ui="{ base: 'rounded-[var(--ui-radius)]!' }"
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
    <div class="hidden" inert aria-hidden="true">
      <slot />
    </div>

    <!-- Save-theme modal (singleton rendered at layout level) -->
    <SaveThemeModal />

    <!-- Export/Import slideover (singleton rendered at layout level) -->
    <EditorExportSlideover />

    <SpeedInsights />
  </UDashboardGroup>
</template>
