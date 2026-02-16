/**
 * Manages the drag-to-resize behavior for the preview panel.
 *
 * Supports preset widths (mobile/tablet/desktop) and free-form drag resize.
 * Both left and right handles move symmetrically to keep the preview centered.
 */

export const PRESET_WIDTHS = [
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
] as const;

export const PRESET_HEIGHTS = [
  {
    value: "short" as const,
    icon: "i-lucide-rectangle-horizontal",
    label: "Short (480px)",
    height: "480px",
  },
  {
    value: "medium" as const,
    icon: "i-lucide-square",
    label: "Medium (720px)",
    height: "720px",
  },
  {
    value: "auto" as const,
    icon: "i-lucide-move-vertical",
    label: "Auto (fill)",
    height: "100%",
  },
] as const;

export type PresetWidthKey = (typeof PRESET_WIDTHS)[number]["value"];
export type PresetHeightKey = (typeof PRESET_HEIGHTS)[number]["value"];

/** Look up the CSS width string for a named width preset. */
export function getPresetWidth(key: PresetWidthKey): string {
  return PRESET_WIDTHS.find((o) => o.value === key)!.width;
}

/** Look up the CSS height string for a named height preset. */
export function getPresetHeight(key: PresetHeightKey): string {
  return PRESET_HEIGHTS.find((o) => o.value === key)!.height;
}

const MIN_RESIZE_WIDTH = 320;
const MIN_RESIZE_HEIGHT = 200;

export function usePreviewResize() {
  const previewWidth = ref<"mobile" | "tablet" | "desktop">("desktop");
  const previewHeight = ref<"short" | "medium" | "auto">("auto");
  const customWidth = ref<number | null>(null);
  const customHeight = ref<number | null>(null);
  const isDragging = ref(false);
  const previewArea = ref<HTMLElement>();

  // Track active drag listeners for cleanup on unmount
  let cleanupDrag: (() => void) | null = null;

  const currentPreviewWidth = computed(() => {
    if (customWidth.value !== null) return `${customWidth.value}px`;
    return getPresetWidth(previewWidth.value);
  });

  const currentPreviewHeight = computed(() => {
    if (customHeight.value !== null) return `${customHeight.value}px`;
    return getPresetHeight(previewHeight.value);
  });

  // Selecting a preset clears any custom dimension
  watch(previewWidth, () => {
    customWidth.value = null;
  });

  watch(previewHeight, () => {
    customHeight.value = null;
  });

  /**
   * Start a symmetric drag-resize from one edge.
   * Multiplies delta by 2 so dragging one side keeps the preview centered.
   */
  function startResize(e: MouseEvent, side: "left" | "right") {
    e.preventDefault();
    isDragging.value = true;

    const area = previewArea.value;
    if (!area) return;

    const startX = e.clientX;
    const iframeWrapper = area.querySelector(
      "[data-preview-wrapper]",
    ) as HTMLElement | null;
    if (!iframeWrapper) return;

    const startWidth = iframeWrapper.getBoundingClientRect().width;
    const maxW = area.clientWidth;

    function onMouseMove(ev: MouseEvent) {
      const dx = ev.clientX - startX;
      const delta = side === "right" ? dx * 2 : -dx * 2;
      customWidth.value = Math.round(
        Math.max(MIN_RESIZE_WIDTH, Math.min(startWidth + delta, maxW)),
      );
    }

    function onMouseUp() {
      isDragging.value = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      cleanupDrag = null;
    }

    // Store cleanup in case component unmounts mid-drag
    cleanupDrag = onMouseUp;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function onCustomWidthInput(val: string | number) {
    const num = Number(val);
    if (!isNaN(num) && num >= MIN_RESIZE_WIDTH) {
      customWidth.value = Math.min(num, previewArea.value?.clientWidth ?? 1920);
    } else if (val === "" || val == null) {
      customWidth.value = null;
    }
  }

  function onCustomHeightInput(val: string | number) {
    const num = Number(val);
    if (!isNaN(num) && num >= MIN_RESIZE_HEIGHT) {
      customHeight.value = Math.min(
        num,
        previewArea.value?.clientHeight ?? 1080,
      );
    } else if (val === "" || val == null) {
      customHeight.value = null;
    }
  }

  function handleKeyboardResize(delta: number) {
    const area = previewArea.value;
    if (!area) return;
    const maxW = area.clientWidth;
    const wrapper = area.querySelector(
      "[data-preview-wrapper]",
    ) as HTMLElement | null;
    const currentW = wrapper ? wrapper.getBoundingClientRect().width : maxW;
    customWidth.value = Math.round(
      Math.max(MIN_RESIZE_WIDTH, Math.min(currentW + delta, maxW)),
    );
  }

  /**
   * Start a vertical drag-resize from the bottom edge.
   */
  function startHeightResize(e: MouseEvent) {
    e.preventDefault();
    isDragging.value = true;

    const area = previewArea.value;
    if (!area) return;

    const startY = e.clientY;
    const iframeWrapper = area.querySelector(
      "[data-preview-wrapper]",
    ) as HTMLElement | null;
    if (!iframeWrapper) return;

    const startHeight = iframeWrapper.getBoundingClientRect().height;
    const maxH = area.clientHeight;

    function onMouseMove(ev: MouseEvent) {
      const dy = ev.clientY - startY;
      customHeight.value = Math.round(
        Math.max(MIN_RESIZE_HEIGHT, Math.min(startHeight + dy, maxH)),
      );
    }

    function onMouseUp() {
      isDragging.value = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      cleanupDrag = null;
    }

    cleanupDrag = onMouseUp;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function handleKeyboardHeightResize(delta: number) {
    const area = previewArea.value;
    if (!area) return;
    const maxH = area.clientHeight;
    const wrapper = area.querySelector(
      "[data-preview-wrapper]",
    ) as HTMLElement | null;
    const currentH = wrapper ? wrapper.getBoundingClientRect().height : maxH;
    customHeight.value = Math.round(
      Math.max(MIN_RESIZE_HEIGHT, Math.min(currentH + delta, maxH)),
    );
  }

  function resetSize() {
    previewWidth.value = "desktop";
    previewHeight.value = "auto";
    customWidth.value = null;
    customHeight.value = null;
  }

  onUnmounted(() => {
    cleanupDrag?.();
  });

  return {
    previewWidth,
    previewHeight,
    customWidth,
    customHeight,
    isDragging,
    previewArea,
    PRESET_WIDTHS,
    PRESET_HEIGHTS,
    currentPreviewWidth,
    currentPreviewHeight,
    startResize,
    startHeightResize,
    onCustomWidthInput,
    onCustomHeightInput,
    handleKeyboardResize,
    handleKeyboardHeightResize,
    resetSize,
  };
}
