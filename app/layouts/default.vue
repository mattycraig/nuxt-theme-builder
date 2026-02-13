<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { useThemeApply } from "~/composables/useThemeApply";
import { usePreviewIframe } from "~/composables/usePreviewIframe";
import { usePreviewResize } from "~/composables/usePreviewResize";
import { useKeyboardShortcuts } from "~/composables/useKeyboardShortcuts";
import { useSourceCode } from "~/composables/useSourceCode";
import {
  PAGE_DESCRIPTIONS,
  DEFAULT_DESCRIPTION,
} from "~/utils/seoDescriptions";

useThemeApply();
useKeyboardShortcuts();
useCookieConsent();

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
const { previewFrame, iframeLoading, iframeInitialSrc, handleIframeLoad } =
  usePreviewIframe();

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
  ogImage: "https://www.nuxt-ui-themes.com/og-image.png",
  twitterCard: "summary_large_image",
  twitterImage: "https://www.nuxt-ui-themes.com/og-image.png",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: computed(() => `https://www.nuxt-ui-themes.com${route.path}`),
    },
  ],
});
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

      <!-- Preview area with resizable iframe -->
      <PreviewFrame
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
    </main>

    <!-- Fullscreen preview overlay -->
    <PreviewFullscreenOverlay />

    <!-- Command palette search -->
    <UDashboardSearch
      :groups="searchGroups"
      placeholder="Search pages & actions\u2026"
      @update:model-value="onSearchSelect"
    />

    <!--
      WARNING — Hidden page slot.
      NuxtPage is rendered here so Vue Router's route reactivity keeps
      working (iframeSrc, breadcrumbs, etc.), but the actual visible
      content is rendered inside the iframe. The `hidden` class +
      `inert` + `aria-hidden` ensure it is invisible to both sighted
      users and assistive technology. Do not remove this element.
    -->
    <div class="hidden" inert aria-hidden="true">
      <slot />
    </div>

    <!-- Singleton modals rendered at layout level -->
    <SharedSaveThemeModal />
    <EditorExportSlideover />

    <SpeedInsights />
  </UDashboardGroup>
</template>
