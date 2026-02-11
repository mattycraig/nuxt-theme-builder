import { describe, it, expect, beforeEach } from "vitest";
import { usePreviewFullscreen } from "~/composables/usePreviewFullscreen";

describe("usePreviewFullscreen", () => {
  let fullscreen: ReturnType<typeof usePreviewFullscreen>;

  beforeEach(() => {
    fullscreen = usePreviewFullscreen();
    // Reset singleton state between tests
    fullscreen.isFullscreen.value = false;
    fullscreen.fullscreenViewMode.value = "preview";
    fullscreen.fullscreenPreviewWidth.value = "desktop";
    fullscreen.fullscreenCustomWidth.value = null;
  });

  describe("initial state", () => {
    it("is not fullscreen by default", () => {
      expect(fullscreen.isFullscreen.value).toBe(false);
    });

    it("defaults to preview view mode", () => {
      expect(fullscreen.fullscreenViewMode.value).toBe("preview");
    });

    it("defaults to desktop preset", () => {
      expect(fullscreen.fullscreenPreviewWidth.value).toBe("desktop");
    });

    it("has no custom width initially", () => {
      expect(fullscreen.fullscreenCustomWidth.value).toBeNull();
    });

    it("returns 100% width for desktop preset", () => {
      expect(fullscreen.fullscreenCurrentWidth.value).toBe("100%");
    });
  });

  describe("toggle", () => {
    it("enters fullscreen on first toggle", () => {
      fullscreen.toggle();
      expect(fullscreen.isFullscreen.value).toBe(true);
    });

    it("exits fullscreen on second toggle", () => {
      fullscreen.toggle();
      fullscreen.toggle();
      expect(fullscreen.isFullscreen.value).toBe(false);
    });

    it("resets view mode to preview when entering fullscreen", () => {
      fullscreen.fullscreenViewMode.value = "code";
      fullscreen.toggle();
      expect(fullscreen.fullscreenViewMode.value).toBe("preview");
    });

    it("resets preset to desktop when entering fullscreen", () => {
      fullscreen.fullscreenPreviewWidth.value = "mobile";
      fullscreen.toggle();
      expect(fullscreen.fullscreenPreviewWidth.value).toBe("desktop");
    });

    it("clears custom width when entering fullscreen", () => {
      fullscreen.fullscreenCustomWidth.value = 500;
      fullscreen.toggle();
      expect(fullscreen.fullscreenCustomWidth.value).toBeNull();
    });

    it("does not reset state when exiting fullscreen", () => {
      fullscreen.toggle(); // enter
      fullscreen.fullscreenViewMode.value = "code";
      fullscreen.fullscreenPreviewWidth.value = "tablet";
      fullscreen.toggle(); // exit
      // State is preserved during exit — toggle only resets on enter
      expect(fullscreen.isFullscreen.value).toBe(false);
    });
  });

  describe("fullscreenCurrentWidth", () => {
    it("returns 375px for mobile preset", () => {
      fullscreen.fullscreenPreviewWidth.value = "mobile";
      expect(fullscreen.fullscreenCurrentWidth.value).toBe("375px");
    });

    it("returns 768px for tablet preset", () => {
      fullscreen.fullscreenPreviewWidth.value = "tablet";
      expect(fullscreen.fullscreenCurrentWidth.value).toBe("768px");
    });

    it("returns 100% for desktop preset", () => {
      fullscreen.fullscreenPreviewWidth.value = "desktop";
      expect(fullscreen.fullscreenCurrentWidth.value).toBe("100%");
    });

    it("returns custom width in px when set", () => {
      fullscreen.fullscreenCustomWidth.value = 640;
      expect(fullscreen.fullscreenCurrentWidth.value).toBe("640px");
    });

    it("custom width takes priority over preset", () => {
      fullscreen.fullscreenPreviewWidth.value = "mobile";
      fullscreen.fullscreenCustomWidth.value = 1024;
      expect(fullscreen.fullscreenCurrentWidth.value).toBe("1024px");
    });
  });

  describe("preset clears custom width", () => {
    it("clears custom width when preset changes", async () => {
      fullscreen.fullscreenCustomWidth.value = 600;
      fullscreen.fullscreenPreviewWidth.value = "tablet";
      await nextTick();
      expect(fullscreen.fullscreenCustomWidth.value).toBeNull();
    });

    it("clears custom width when switching from mobile to desktop", async () => {
      fullscreen.fullscreenPreviewWidth.value = "mobile";
      await nextTick();
      fullscreen.fullscreenCustomWidth.value = 500;
      fullscreen.fullscreenPreviewWidth.value = "desktop";
      await nextTick();
      expect(fullscreen.fullscreenCustomWidth.value).toBeNull();
    });
  });

  describe("singleton behavior", () => {
    it("shares state across multiple calls", () => {
      const a = usePreviewFullscreen();
      const b = usePreviewFullscreen();
      a.isFullscreen.value = true;
      expect(b.isFullscreen.value).toBe(true);
    });

    it("shares custom width across instances", () => {
      const a = usePreviewFullscreen();
      const b = usePreviewFullscreen();
      a.fullscreenCustomWidth.value = 777;
      expect(b.fullscreenCustomWidth.value).toBe(777);
    });

    it("shares view mode across instances", () => {
      const a = usePreviewFullscreen();
      const b = usePreviewFullscreen();
      a.fullscreenViewMode.value = "code";
      expect(b.fullscreenViewMode.value).toBe("code");
    });
  });
});
