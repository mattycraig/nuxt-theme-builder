<script setup lang="ts">
const store = useThemeStore();
const colorMode = useColorMode();
const route = useRoute();

const {
  isFullscreen,
  fullscreenViewMode,
  fullscreenPreviewWidth,
  fullscreenCustomWidth,
  fullscreenCurrentWidth,
  toggle,
} = usePreviewFullscreen();

const {
  sourceCode,
  sourceFilePath,
  isLoadingSource,
  sourceError,
  hasSourcePage,
  setViewMode,
  retry: retrySource,
} = useSourceCode();

const { currentPageLabel } = useLayoutNavigation();

const iframeSrc = computed(() => `${route.path}?preview`);

// Trigger shared source fetch when switching to code view in fullscreen
watch(fullscreenViewMode, (mode) => {
  if (mode === "code") setViewMode("code");
});

// Iframe communication ──────────────────────────────────────────────

const fullscreenFrame = ref<HTMLIFrameElement>();

function postToFrame(data: Record<string, unknown>) {
  fullscreenFrame.value?.contentWindow?.postMessage(
    data,
    window.location.origin,
  );
}

function handleFrameLoad() {
  postToFrame({ type: "request-ready" });
}

function handleMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) return;
  if (event.source !== fullscreenFrame.value?.contentWindow) return;
  if (event.data?.type === "preview-ready") {
    postToFrame({
      type: "theme-sync",
      config: structuredClone(toRaw(store.config)),
    });
    postToFrame({ type: "colormode-sync", mode: colorMode.preference });
  }
}

// Keep fullscreen iframe in sync with theme and color mode
watch(
  () => store.config,
  (cfg) => {
    postToFrame({
      type: "theme-sync",
      config: structuredClone(toRaw(cfg)),
    });
  },
  { deep: true },
);

watch(
  () => colorMode.preference,
  (pref) => {
    postToFrame({ type: "colormode-sync", mode: pref });
  },
);

onKeyStroke("Escape", () => {
  if (isFullscreen.value) isFullscreen.value = false;
});

// Focus management: trap focus inside dialog and restore on close
const dialogRef = ref<HTMLElement>();
const triggerElement = ref<HTMLElement | null>(null);

watch(isFullscreen, async (open) => {
  if (open) {
    triggerElement.value = document.activeElement as HTMLElement | null;
    await nextTick();
    const firstFocusable = dialogRef.value?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();
  } else {
    triggerElement.value?.focus();
    triggerElement.value = null;
  }
});

function handleKeydownTrap(event: KeyboardEvent) {
  if (event.key !== "Tab") return;
  const focusable = dialogRef.value?.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (!focusable?.length) return;
  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener("message", handleMessage);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("message", handleMessage);
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isFullscreen"
        ref="dialogRef"
        class="fixed inset-0 z-50 bg-(--ui-bg) flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Fullscreen preview"
        @keydown="handleKeydownTrap"
      >
        <!-- Fullscreen toolbar -->
        <div
          class="flex items-center justify-between p-4 border-b border-(--ui-border) bg-(--ui-bg-elevated) shrink-0"
          role="toolbar"
          aria-label="Fullscreen preview controls"
        >
          <div class="flex items-center gap-2 min-w-0">
            <UIcon
              name="i-lucide-maximize"
              class="size-4 text-(--ui-text-muted) shrink-0"
              aria-hidden="true"
            />
            <span
              class="text-sm font-medium text-(--ui-text-highlighted) truncate"
            >
              Fullscreen Preview
            </span>
            <UBadge variant="subtle" size="xs" color="neutral" class="shrink-0">
              {{ currentPageLabel }}
            </UBadge>
          </div>

          <PreviewWidthControls
            v-model:active-preset="fullscreenPreviewWidth"
            v-model:custom-width="fullscreenCustomWidth"
            input-id="fs-custom-width"
          />

          <div class="flex items-center gap-2">
            <UColorModeSwitch />

            <USeparator
              v-if="hasSourcePage"
              orientation="vertical"
              class="h-6 mx-2"
            />

            <ViewModeToggle v-if="hasSourcePage" v-model="fullscreenViewMode" />

            <USeparator orientation="vertical" class="h-6 mx-2" :ui="{border:'dark:border-accented'}" />

            <UTooltip text="Exit fullscreen (Esc)">
              <UButton
                icon="i-lucide-minimize"
                aria-label="Exit fullscreen preview"
                size="sm"
                variant="outline"
                color="neutral"
                @click="toggle"
              />
            </UTooltip>
          </div>
        </div>

        <!-- Fullscreen source code view -->
        <SourceCodeView
          v-if="fullscreenViewMode === 'code' && hasSourcePage"
          :source="sourceCode"
          :file-path="sourceFilePath"
          :loading="isLoadingSource"
          :error="sourceError"
          class="flex-1 overflow-auto"
          @retry="retrySource"
        />

        <!-- Fullscreen iframe preview -->
        <div
          v-show="fullscreenViewMode === 'preview' || !hasSourcePage"
          class="flex-1 overflow-hidden flex justify-center bg-(--ui-bg-muted)"
        >
          <div
            class="h-full transition-[width] duration-300 ease-in-out"
            :style="{ width: fullscreenCurrentWidth, maxWidth: '100%' }"
          >
            <iframe
              ref="fullscreenFrame"
              :src="iframeSrc"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              title="Theme preview — fullscreen"
              width="100%"
              height="100%"
              class="w-full h-full border-0"
              @load="handleFrameLoad"
            >
              Your browser does not support iframes.
            </iframe>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
