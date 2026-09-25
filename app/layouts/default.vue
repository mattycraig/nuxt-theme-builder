<script setup lang="ts">
import { useThemeApply } from "~/composables/useThemeApply";
import { usePreviewIframe } from "~/composables/usePreviewIframe";
import { usePreviewResize } from "~/composables/usePreviewResize";
import { useKeyboardShortcuts } from "~/composables/useKeyboardShortcuts";
import { useSourceCode } from "~/composables/useSourceCode";
import {
  PAGE_DESCRIPTIONS,
  PAGE_TITLES,
  DEFAULT_DESCRIPTION,
  SITE_URL,
  OG_IMAGE_URL,
  INDEXABLE_ROBOTS,
} from "~/utils/seoDescriptions";
import { NOINDEX_DEMO_ROUTES } from "~~/shared/constants/routes";

useThemeApply();
useKeyboardShortcuts();

const route = useRoute();

// Source code viewer (singleton — shared with PreviewFullscreenOverlay)
const {
  viewMode,
  sourceCode,
  sourceFilePath,
  isLoadingSource,
  sourceError,
  hasSourcePage,
  retry: retrySource,
} = useSourceCode();

// Iframe preview ────────────────────────────────────────────────────────
const {
  previewFrame,
  iframeLoading,
  iframeInitialSrc,
  isFramed,
  handleIframeLoad,
} = usePreviewIframe();

// Direct pages scroll inside the page container, which the router's
// window-based scroll behavior doesn't reach.
const pageScroll = useTemplateRef<HTMLElement>("pageScroll");
watch(
  () => [route.path, route.hash] as const,
  ([path, hash], [previousPath]) => {
    const container = pageScroll.value;
    if (!container || isFramed.value) return;
    const target =
      hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else if (path !== previousPath) container.scrollTop = 0;
  },
  { flush: "post" },
);

// Preview resize ────────────────────────────────────────────────────────
const {
  previewWidth,
  previewHeight,
  customWidth,
  customHeight,
  isDragging,
  previewArea,
  currentPreviewWidth,
  currentPreviewHeight,
  startResize,
  startHeightResize,
  handleKeyboardResize,
  handleKeyboardHeightResize,
} = usePreviewResize();

// Fullscreen (singleton — shared with PreviewFullscreenOverlay)
const { isFullscreen: isPreviewFullscreen } = usePreviewFullscreen();

// Navigation & search ───────────────────────────────────────────────────
const { currentPageLabel } = useLayoutNavigation();
const { searchGroups, onSearchSelect } = useCommandPalette();

// SEO ───────────────────────────────────────────────────────────────────
const SECTION_SUFFIXES: Record<string, string> = {
  "/components": " Component",
  "/blocks": " Block",
  "/templates": " Template",
};

const seoTitle = computed(() => {
  const explicitTitle = PAGE_TITLES[route.path];
  if (explicitTitle) {
    return explicitTitle;
  }

  const label = currentPageLabel.value;
  const section = Object.keys(SECTION_SUFFIXES).find(
    (prefix) =>
      route.path.startsWith(prefix + "/") && route.path !== prefix,
  );
  const qualifiedLabel = section
    ? `${label}${SECTION_SUFFIXES[section]}`
    : label;
  return `${qualifiedLabel} — Nuxt UI Theme Builder`;
});

const seoDescription = computed(
  () => PAGE_DESCRIPTIONS[route.path] ?? DEFAULT_DESCRIPTION,
);

const noindexDemoRouteSet = new Set<string>(NOINDEX_DEMO_ROUTES);
const seoRobots = computed(() =>
  noindexDemoRouteSet.has(route.path) ? "noindex, follow" : INDEXABLE_ROBOTS,
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  robots: seoRobots,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: "website",
  ogImage: OG_IMAGE_URL,
  twitterCard: "summary_large_image",
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: OG_IMAGE_URL,
});

useHead({
  link: [
    {
      rel: "canonical",
      href: computed(() => `${SITE_URL}${route.path}`),
    },
  ],
});

useSchemaOrg([
  defineWebPage({
    name: seoTitle,
    description: seoDescription,
  }),
]);
</script>

<template>
  <UDashboardGroup unit="px" storage-key="theme-builder">
    <a href="#maincontent" class="skip-link">Skip to main content</a>

    <!-- Sidebar (Theme Editor) -->
    <LayoutSidebar />

    <!-- Main Content -->
    <main
      id="maincontent"
      class="flex-1 h-full overflow-hidden flex flex-col bg-(--ui-bg-muted)"
    >
      <LayoutNavbar />

      <!-- Preview controls toolbar -->
      <LayoutPreviewToolbar
        v-model:preview-width="previewWidth"
        v-model:custom-width="customWidth"
        v-model:preview-height="previewHeight"
        v-model:custom-height="customHeight"
        :framed="isFramed"
      />

      <!-- Source code view (replaces iframe when active) -->
      <PreviewSourceCode
        v-if="viewMode === 'code' && hasSourcePage && !isPreviewFullscreen"
        :source="sourceCode"
        :file-path="sourceFilePath"
        :loading="isLoadingSource"
        :error="sourceError"
        @retry="retrySource"
      />

      <!-- Preview area with resizable iframe (demo routes only) -->
      <PreviewFrame
        v-if="isFramed"
        v-show="
          (viewMode === 'preview' || !hasSourcePage) && !isPreviewFullscreen
        "
        v-model:preview-frame="previewFrame"
        v-model:preview-area="previewArea"
        :iframe-initial-src="iframeInitialSrc"
        :iframe-loading="iframeLoading"
        :is-dragging="isDragging"
        :current-preview-width="currentPreviewWidth"
        :current-preview-height="currentPreviewHeight"
        @iframe-load="handleIframeLoad"
        @start-resize="startResize"
        @start-height-resize="startHeightResize"
        @keyboard-resize="handleKeyboardResize"
        @keyboard-height-resize="handleKeyboardHeightResize"
      />

      <!--
        Page slot. Demo routes (isFramedRoute) are shown by the iframe, so
        their copy here stays hidden and inert: NuxtPage still renders it to
        keep route reactivity working (iframeSrc, breadcrumbs, etc.). Every
        other page is shown here directly, so search engines see its content
        as part of the page (the iframe document is noindex). The same two
        elements switch between both modes so the page never moves between
        containers and remounts. Do not remove this slot.

        SharedHiddenRouteWrapper blocks dashboard:sidebar:toggle/collapse
        hook registrations from demo pages' UDashboardSidebar instances,
        which would otherwise open the wrong sidebar at mobile widths.
      -->
      <div
        :class="isFramed ? 'hidden' : 'flex-1 min-h-0 p-4 sm:px-6'"
        :inert="isFramed"
      >
        <div
          ref="pageScroll"
          :class="
            isFramed
              ? undefined
              : 'h-full overflow-y-auto rounded-xl border border-(--ui-border-accented) shadow-xl bg-(--ui-bg)'
          "
        >
          <SharedHiddenRouteWrapper>
            <slot />
          </SharedHiddenRouteWrapper>
        </div>
      </div>
    </main>

    <!-- Fullscreen preview overlay -->
    <PreviewFullscreenOverlay />

    <!-- Command palette search -->
    <UDashboardSearch
      :groups="searchGroups"
      placeholder="Search pages & actions\u2026"
      @update:model-value="onSearchSelect"
    />

    <!-- Singleton modals rendered at layout level -->
    <SharedSaveThemeModal />
    <EditorExportSlideover />

  </UDashboardGroup>
</template>
