<script setup lang="ts">
defineProps<{
  iframeInitialSrc: string;
  iframeLoading: boolean;
  isDragging: boolean;
  currentPreviewWidth: string;
}>();

const emit = defineEmits<{
  iframeLoad: [];
  startResize: [event: MouseEvent, side: "left" | "right"];
}>();

const previewFrame = defineModel<HTMLIFrameElement | undefined>("previewFrame");
const previewArea = defineModel<HTMLElement | undefined>("previewArea");
</script>

<template>
  <div
    ref="previewArea"
    class="flex-1 overflow-hidden p-4 sm:p-6 flex justify-center items-stretch"
  >
    <div
      data-preview-wrapper
      class="relative h-full mx-auto"
      :class="[isDragging ? '' : 'transition-[width] duration-300 ease-in-out']"
      :style="{ width: currentPreviewWidth, maxWidth: '100%' }"
    >
      <!-- Left drag handle -->
      <div
        class="absolute -left-3 top-0 bottom-0 w-3 cursor-col-resize group flex items-center justify-center z-10"
        @mousedown.prevent="emit('startResize', $event, 'left')"
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
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          title="Theme preview"
          width="100%"
          height="100%"
          class="w-full h-full border-0"
          :class="{ 'pointer-events-none': isDragging }"
          @load="emit('iframeLoad')"
        >
          Your browser does not support iframes. Please use a modern browser to
          view the theme preview.
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
            <LoadingSpinner label="Loading preview…" />
          </div>
        </Transition>
      </div>

      <!-- Right drag handle -->
      <div
        class="absolute -right-3 top-0 bottom-0 w-3 cursor-col-resize group flex items-center justify-center z-10"
        @mousedown.prevent="emit('startResize', $event, 'right')"
      >
        <div
          class="w-1 h-16 rounded-full bg-(--ui-border) group-hover:bg-(--ui-primary) transition-colors"
        />
      </div>
    </div>
  </div>
</template>
