import { describe, it, expect, beforeEach } from "vitest";
import { useColorVision } from "~/composables/useColorVision";

describe("useColorVision", () => {
  beforeEach(() => {
    useColorVision().setMode("none");
  });

  it("starts with normal vision and no filter", () => {
    const { mode, filter, active } = useColorVision();
    expect(mode.value).toBe("none");
    expect(filter.value).toBeUndefined();
    expect(active.value).toBeUndefined();
  });

  it("shares the selected mode between callers", () => {
    useColorVision().setMode("protanopia");
    const { filter, active } = useColorVision();
    expect(filter.value).toBe("url(#color-vision-protanopia)");
    expect(active.value?.label).toBe("Protanopia");
  });
});
