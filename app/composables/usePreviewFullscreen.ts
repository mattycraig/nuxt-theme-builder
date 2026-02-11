import { PRESET_WIDTHS } from "~/composables/usePreviewResize";

/**
 * Shared fullscreen preview state.
 *
 * Singleton pattern — module-level refs so every component calling
 * `usePreviewFullscreen()` shares the same fullscreen state.
 *
 * Iframe communication (postMessage, event listeners) is handled by
 * PreviewFullscreenOverlay.vue, which owns the iframe element.
 */

const _isFullscreen = ref(false);
const _fullscreenViewMode = ref<"preview" | "code">("preview");
const _fullscreenPreviewWidth = ref<"mobile" | "tablet" | "desktop">("desktop");
const _fullscreenCustomWidth = ref<number | null>(null);

// Auto-clear custom width when a preset is selected
watch(_fullscreenPreviewWidth, () => {
  _fullscreenCustomWidth.value = null;
});

export function usePreviewFullscreen() {
  const fullscreenCurrentWidth = computed(() => {
    if (_fullscreenCustomWidth.value !== null)
      return `${_fullscreenCustomWidth.value}px`;
    return PRESET_WIDTHS.find((o) => o.value === _fullscreenPreviewWidth.value)!
      .width;
  });

  function toggle() {
    _isFullscreen.value = !_isFullscreen.value;
    if (_isFullscreen.value) {
      _fullscreenViewMode.value = "preview";
      _fullscreenPreviewWidth.value = "desktop";
      _fullscreenCustomWidth.value = null;
    }
  }

  return {
    isFullscreen: _isFullscreen,
    fullscreenViewMode: _fullscreenViewMode,
    fullscreenPreviewWidth: _fullscreenPreviewWidth,
    fullscreenCustomWidth: _fullscreenCustomWidth,
    fullscreenCurrentWidth,
    toggle,
  };
}
