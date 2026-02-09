/**
 * Manages the drag-to-resize behavior for the preview panel.
 *
 * Supports preset widths (mobile/tablet/desktop) and free-form drag resize.
 * Both left and right handles move symmetrically to keep the preview centered.
 */
export function usePreviewResize() {
  const previewWidth = ref<"mobile" | "tablet" | "desktop">("desktop");
  const customWidth = ref<number | null>(null);
  const isDragging = ref(false);
  const previewArea = ref<HTMLElement>();

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
  ];

  const currentPreviewWidth = computed(() => {
    if (customWidth.value !== null) return `${customWidth.value}px`;
    return PRESET_WIDTHS.find((o) => o.value === previewWidth.value)!.width;
  });

  const displayWidth = computed(() => {
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
      const newWidth = Math.round(
        Math.max(320, Math.min(startWidth + delta, maxW)),
      );
      customWidth.value = newWidth;
    }

    function onMouseUp() {
      isDragging.value = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function onCustomWidthInput(val: string | number) {
    const num = Number(val);
    if (!isNaN(num) && num >= 320) {
      customWidth.value = Math.min(num, previewArea.value?.clientWidth ?? 1920);
    } else if (val === "" || val == null) {
      customWidth.value = null;
    }
  }

  return {
    previewWidth,
    customWidth,
    isDragging,
    previewArea,
    PRESET_WIDTHS,
    currentPreviewWidth,
    displayWidth,
    startResize,
    onCustomWidthInput,
  };
}
