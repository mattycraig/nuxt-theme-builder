<script setup lang="ts">
const previewWidth = defineModel<"mobile" | "tablet" | "desktop">(
  "previewWidth",
  { required: true },
);
const customWidth = defineModel<number | null>("customWidth", {
  required: true,
});

const { breadcrumbItems } = useLayoutNavigation();
const { viewMode, hasSourcePage } = useSourceCode();
const { isFullscreen, toggle: toggleFullscreen } = usePreviewFullscreen();
const exportPanel = useExportPanel();
</script>

<template>
  <div
    class="hidden md:flex items-center justify-between gap-1.5 md:px-6 md:pt-6 shrink-0 relative"
    role="toolbar"
    aria-label="Preview controls"
  >
    <UBreadcrumb
      :items="breadcrumbItems"
      :ui="{ linkLeadingIcon: 'size-4', link: 'text-xs' }"
    />

    <PreviewWidthControls
      v-model:active-preset="previewWidth"
      v-model:custom-width="customWidth"
      input-id="main-custom-width"
      class="absolute left-1/2 -translate-x-1/2"
    />

    <div class="flex items-center gap-2">
      <ViewModeToggle v-if="hasSourcePage" v-model="viewMode" />

      <USeparator
        v-if="hasSourcePage"
        orientation="vertical"
        class="h-6 mx-2"
      />

      <!-- Fullscreen toggle -->
      <UTooltip :text="isFullscreen ? 'Exit fullscreen' : 'Fullscreen preview'">
        <UButton
          :icon="isFullscreen ? 'i-lucide-minimize' : 'i-lucide-maximize'"
          :aria-label="
            isFullscreen
              ? 'Exit fullscreen preview'
              : 'Expand preview to fullscreen'
          "
          size="sm"
          variant="outline"
          :color="isFullscreen ? 'primary' : 'neutral'"
          :aria-pressed="isFullscreen"
          @click="toggleFullscreen"
        />
      </UTooltip>

      <USeparator orientation="vertical" class="h-6 mx-2" />

      <!-- Export/Import Button -->
      <UButton
        icon="i-lucide-import"
        label="Export / Import"
        size="sm"
        variant="solid"
        color="primary"
        @click="exportPanel.open()"
      />
    </div>
  </div>
</template>
