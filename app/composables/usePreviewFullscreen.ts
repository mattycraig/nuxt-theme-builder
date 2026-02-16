import {
  getPresetWidth,
  getPresetHeight,
} from "~/composables/usePreviewResize";

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
const _fullscreenPreviewHeight = ref<"short" | "medium" | "auto">("auto");
const _fullscreenCustomHeight = ref<number | null>(null);

// Auto-clear custom dimensions when a preset is selected
watch(_fullscreenPreviewWidth, () => {
  _fullscreenCustomWidth.value = null;
});

watch(_fullscreenPreviewHeight, () => {
  _fullscreenCustomHeight.value = null;
});

export function usePreviewFullscreen() {
  const fullscreenCurrentWidth = computed(() => {
    if (_fullscreenCustomWidth.value !== null)
      return `${_fullscreenCustomWidth.value}px`;
    return getPresetWidth(_fullscreenPreviewWidth.value);
  });

  const fullscreenCurrentHeight = computed(() => {
    if (_fullscreenCustomHeight.value !== null)
      return `${_fullscreenCustomHeight.value}px`;
    return getPresetHeight(_fullscreenPreviewHeight.value);
  });

  function toggle() {
    _isFullscreen.value = !_isFullscreen.value;
    if (_isFullscreen.value) {
      _fullscreenViewMode.value = "preview";
      _fullscreenPreviewWidth.value = "desktop";
      _fullscreenCustomWidth.value = null;
      _fullscreenPreviewHeight.value = "auto";
      _fullscreenCustomHeight.value = null;
    }
  }

  function resetSize() {
    _fullscreenPreviewWidth.value = "desktop";
    _fullscreenCustomWidth.value = null;
    _fullscreenPreviewHeight.value = "auto";
    _fullscreenCustomHeight.value = null;
  }

  return {
    isFullscreen: _isFullscreen,
    fullscreenViewMode: _fullscreenViewMode,
    fullscreenPreviewWidth: _fullscreenPreviewWidth,
    fullscreenCustomWidth: _fullscreenCustomWidth,
    fullscreenPreviewHeight: _fullscreenPreviewHeight,
    fullscreenCustomHeight: _fullscreenCustomHeight,
    fullscreenCurrentWidth,
    fullscreenCurrentHeight,
    toggle,
    resetSize,
  };
}
