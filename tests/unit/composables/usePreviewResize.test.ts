import { describe, it, expect, beforeEach, vi } from "vitest";

describe("usePreviewResize", () => {
  let resize: ReturnType<typeof usePreviewResize>;

  beforeEach(() => {
    resize = usePreviewResize();
  });

  describe("initial state", () => {
    it("defaults to desktop preset", () => {
      expect(resize.previewWidth.value).toBe("desktop");
    });

    it("has no custom width initially", () => {
      expect(resize.customWidth.value).toBeNull();
    });

    it("is not dragging initially", () => {
      expect(resize.isDragging.value).toBe(false);
    });

    it("currentPreviewWidth returns 100% for desktop", () => {
      expect(resize.currentPreviewWidth.value).toBe("100%");
    });

    it("defaults to auto height preset", () => {
      expect(resize.previewHeight.value).toBe("auto");
    });

    it("has no custom height initially", () => {
      expect(resize.customHeight.value).toBeNull();
    });

    it("currentPreviewHeight returns 100% for auto", () => {
      expect(resize.currentPreviewHeight.value).toBe("100%");
    });
  });

  describe("preset widths", () => {
    it("PRESET_WIDTHS has mobile, tablet, desktop entries", () => {
      expect(resize.PRESET_WIDTHS).toHaveLength(3);
      const values = resize.PRESET_WIDTHS.map((p) => p.value);
      expect(values).toContain("mobile");
      expect(values).toContain("tablet");
      expect(values).toContain("desktop");
    });

    it("mobile preset sets 375px width", () => {
      resize.previewWidth.value = "mobile";
      // Flush the watch
      nextTick();
      expect(resize.currentPreviewWidth.value).toBe("375px");
    });

    it("tablet preset sets 768px width", () => {
      resize.previewWidth.value = "tablet";
      nextTick();
      expect(resize.currentPreviewWidth.value).toBe("768px");
    });

    it("selecting a preset clears custom width", async () => {
      resize.customWidth.value = 500;
      resize.previewWidth.value = "mobile";
      await nextTick();
      expect(resize.customWidth.value).toBeNull();
    });
  });

  describe("custom width", () => {
    it("currentPreviewWidth returns custom width in px when set", () => {
      resize.customWidth.value = 600;
      expect(resize.currentPreviewWidth.value).toBe("600px");
    });

    it("custom width overrides any preset selection", () => {
      resize.previewWidth.value = "mobile";
      resize.customWidth.value = 800;
      expect(resize.currentPreviewWidth.value).toBe("800px");
    });
  });

  describe("onCustomWidthInput", () => {
    it("accepts valid numeric string >= 320", () => {
      resize.onCustomWidthInput("500");
      expect(resize.customWidth.value).toBe(500);
    });

    it("accepts valid number >= 320", () => {
      resize.onCustomWidthInput(600);
      expect(resize.customWidth.value).toBe(600);
    });

    it("clamps to minimum 320", () => {
      resize.onCustomWidthInput("100");
      expect(resize.customWidth.value).toBeNull();
    });

    it("rejects NaN input", () => {
      resize.customWidth.value = 500;
      resize.onCustomWidthInput("abc");
      // NaN < 320, so falls through to null check
      expect(resize.customWidth.value).toBe(500);
    });

    it("clears custom width on empty string", () => {
      resize.customWidth.value = 500;
      resize.onCustomWidthInput("");
      expect(resize.customWidth.value).toBeNull();
    });

    it("clears custom width on null", () => {
      resize.customWidth.value = 500;
      resize.onCustomWidthInput(null as unknown as string);
      expect(resize.customWidth.value).toBeNull();
    });

    it("clamps to max viewport width", () => {
      // Without a previewArea element, max capped at 1920
      resize.onCustomWidthInput("9999");
      expect(resize.customWidth.value).toBeLessThanOrEqual(1920);
    });

    it("accepts exactly 320", () => {
      resize.onCustomWidthInput("320");
      expect(resize.customWidth.value).toBe(320);
    });
  });

  describe("handleKeyboardResize", () => {
    function setupArea(areaWidth: number, wrapperWidth: number) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-preview-wrapper", "");
      vi.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
        width: wrapperWidth,
        height: 0,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        toJSON: () => {},
      });

      const area = document.createElement("div");
      area.appendChild(wrapper);
      Object.defineProperty(area, "clientWidth", { value: areaWidth });

      resize.previewArea.value = area;
    }

    it("increases width by positive delta", () => {
      setupArea(1200, 800);
      resize.handleKeyboardResize(40);
      expect(resize.customWidth.value).toBe(840);
    });

    it("decreases width by negative delta", () => {
      setupArea(1200, 800);
      resize.handleKeyboardResize(-40);
      expect(resize.customWidth.value).toBe(760);
    });

    it("clamps to minimum 320", () => {
      setupArea(1200, 350);
      resize.handleKeyboardResize(-100);
      expect(resize.customWidth.value).toBe(320);
    });

    it("clamps to maximum area width", () => {
      setupArea(1000, 950);
      resize.handleKeyboardResize(200);
      expect(resize.customWidth.value).toBe(1000);
    });

    it("does nothing when previewArea is not set", () => {
      resize.customWidth.value = 500;
      resize.handleKeyboardResize(40);
      // customWidth unchanged because area is undefined
      expect(resize.customWidth.value).toBe(500);
    });

    it("uses area clientWidth as fallback when wrapper is missing", () => {
      const area = document.createElement("div");
      Object.defineProperty(area, "clientWidth", { value: 1000 });
      resize.previewArea.value = area;

      resize.handleKeyboardResize(-100);
      expect(resize.customWidth.value).toBe(900);
    });

    it("rounds result to nearest integer", () => {
      setupArea(1200, 805);
      resize.handleKeyboardResize(33);
      expect(resize.customWidth.value).toBe(838);
      expect(Number.isInteger(resize.customWidth.value)).toBe(true);
    });
  });

  describe("preset heights", () => {
    it("PRESET_HEIGHTS has short, medium, auto entries", () => {
      expect(resize.PRESET_HEIGHTS).toHaveLength(3);
      const values = resize.PRESET_HEIGHTS.map((p) => p.value);
      expect(values).toContain("short");
      expect(values).toContain("medium");
      expect(values).toContain("auto");
    });

    it("short preset sets 480px height", () => {
      resize.previewHeight.value = "short";
      nextTick();
      expect(resize.currentPreviewHeight.value).toBe("480px");
    });

    it("medium preset sets 720px height", () => {
      resize.previewHeight.value = "medium";
      nextTick();
      expect(resize.currentPreviewHeight.value).toBe("720px");
    });

    it("auto preset sets 100% height", () => {
      resize.previewHeight.value = "auto";
      nextTick();
      expect(resize.currentPreviewHeight.value).toBe("100%");
    });

    it("selecting a height preset clears custom height", async () => {
      resize.customHeight.value = 600;
      resize.previewHeight.value = "short";
      await nextTick();
      expect(resize.customHeight.value).toBeNull();
    });
  });

  describe("custom height", () => {
    it("currentPreviewHeight returns custom height in px when set", () => {
      resize.customHeight.value = 500;
      expect(resize.currentPreviewHeight.value).toBe("500px");
    });

    it("custom height overrides any preset selection", () => {
      resize.previewHeight.value = "short";
      resize.customHeight.value = 900;
      expect(resize.currentPreviewHeight.value).toBe("900px");
    });
  });

  describe("onCustomHeightInput", () => {
    it("accepts valid numeric string >= 200", () => {
      resize.onCustomHeightInput("500");
      expect(resize.customHeight.value).toBe(500);
    });

    it("accepts valid number >= 200", () => {
      resize.onCustomHeightInput(600);
      expect(resize.customHeight.value).toBe(600);
    });

    it("rejects value below minimum 200", () => {
      resize.onCustomHeightInput("100");
      expect(resize.customHeight.value).toBeNull();
    });

    it("rejects NaN input", () => {
      resize.customHeight.value = 500;
      resize.onCustomHeightInput("abc");
      expect(resize.customHeight.value).toBe(500);
    });

    it("clears custom height on empty string", () => {
      resize.customHeight.value = 500;
      resize.onCustomHeightInput("");
      expect(resize.customHeight.value).toBeNull();
    });

    it("clears custom height on null", () => {
      resize.customHeight.value = 500;
      resize.onCustomHeightInput(null as unknown as string);
      expect(resize.customHeight.value).toBeNull();
    });

    it("clamps to max fallback height when no area", () => {
      resize.onCustomHeightInput("9999");
      expect(resize.customHeight.value).toBeLessThanOrEqual(1080);
    });

    it("accepts exactly 200", () => {
      resize.onCustomHeightInput("200");
      expect(resize.customHeight.value).toBe(200);
    });
  });

  describe("handleKeyboardHeightResize", () => {
    function setupArea(areaHeight: number, wrapperHeight: number) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-preview-wrapper", "");
      vi.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
        width: 0,
        height: wrapperHeight,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        toJSON: () => {},
      });

      const area = document.createElement("div");
      area.appendChild(wrapper);
      Object.defineProperty(area, "clientHeight", { value: areaHeight });
      Object.defineProperty(area, "clientWidth", { value: 1200 });

      resize.previewArea.value = area;
    }

    it("increases height by positive delta", () => {
      setupArea(900, 600);
      resize.handleKeyboardHeightResize(40);
      expect(resize.customHeight.value).toBe(640);
    });

    it("decreases height by negative delta", () => {
      setupArea(900, 600);
      resize.handleKeyboardHeightResize(-40);
      expect(resize.customHeight.value).toBe(560);
    });

    it("clamps to minimum 200", () => {
      setupArea(900, 250);
      resize.handleKeyboardHeightResize(-100);
      expect(resize.customHeight.value).toBe(200);
    });

    it("clamps to maximum area height", () => {
      setupArea(800, 750);
      resize.handleKeyboardHeightResize(200);
      expect(resize.customHeight.value).toBe(800);
    });

    it("does nothing when previewArea is not set", () => {
      resize.customHeight.value = 500;
      resize.handleKeyboardHeightResize(40);
      expect(resize.customHeight.value).toBe(500);
    });

    it("uses area clientHeight as fallback when wrapper is missing", () => {
      const area = document.createElement("div");
      Object.defineProperty(area, "clientHeight", { value: 800 });
      Object.defineProperty(area, "clientWidth", { value: 1200 });
      resize.previewArea.value = area;

      resize.handleKeyboardHeightResize(-100);
      expect(resize.customHeight.value).toBe(700);
    });

    it("rounds result to nearest integer", () => {
      setupArea(900, 605);
      resize.handleKeyboardHeightResize(33);
      expect(resize.customHeight.value).toBe(638);
      expect(Number.isInteger(resize.customHeight.value)).toBe(true);
    });
  });

  describe("resetSize", () => {
    it("resets width preset to desktop", () => {
      resize.previewWidth.value = "mobile";
      resize.resetSize();
      expect(resize.previewWidth.value).toBe("desktop");
    });

    it("resets height preset to auto", () => {
      resize.previewHeight.value = "short";
      resize.resetSize();
      expect(resize.previewHeight.value).toBe("auto");
    });

    it("clears custom width", () => {
      resize.customWidth.value = 600;
      resize.resetSize();
      expect(resize.customWidth.value).toBeNull();
    });

    it("clears custom height", () => {
      resize.customHeight.value = 500;
      resize.resetSize();
      expect(resize.customHeight.value).toBeNull();
    });

    it("resets all dimensions at once", () => {
      resize.previewWidth.value = "tablet";
      resize.previewHeight.value = "medium";
      resize.customWidth.value = 999;
      resize.customHeight.value = 777;
      resize.resetSize();
      expect(resize.previewWidth.value).toBe("desktop");
      expect(resize.previewHeight.value).toBe("auto");
      expect(resize.customWidth.value).toBeNull();
      expect(resize.customHeight.value).toBeNull();
      expect(resize.currentPreviewWidth.value).toBe("100%");
      expect(resize.currentPreviewHeight.value).toBe("100%");
    });

    it("is idempotent when already at defaults", () => {
      resize.resetSize();
      expect(resize.previewWidth.value).toBe("desktop");
      expect(resize.previewHeight.value).toBe("auto");
      expect(resize.customWidth.value).toBeNull();
      expect(resize.customHeight.value).toBeNull();
    });
  });
});
