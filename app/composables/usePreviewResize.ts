/**
 * Manages the drag-to-resize behavior for the preview panel.
 *
 * Supports preset widths (mobile/tablet/desktop) and free-form drag resize.
 * Both left and right handles move symmetrically to keep the preview centered.
 */

const PRESET_WIDTHS = [
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

const MIN_RESIZE_WIDTH = 320;

export function usePreviewResize() {
  const previewWidth = ref<"mobile" | "tablet" | "desktop">("desktop");
  const customWidth = ref<number | null>(null);
  const isDragging = ref(false);
  const previewArea = ref<HTMLElement>();

  // Track active drag listeners for cleanup on unmount
  let cleanupDrag: (() => void) | null = null;

  const currentPreviewWidth = computed(() => {
    if (customWidth.value !== null) return `${customWidth.value}px`;
    return PRESET_WIDTHS.find((o) => o.value === previewWidth.value)!.width;
  });

  // Selecting a preset clears any custom width
  watch(previewWidth, () => {
    customWidth.value = null;
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

  onUnmounted(() => {
    cleanupDrag?.();
  });

  return {
    previewWidth,
    customWidth,
    isDragging,
    previewArea,
    PRESET_WIDTHS,
    currentPreviewWidth,
    startResize,
    onCustomWidthInput,
  };
}
