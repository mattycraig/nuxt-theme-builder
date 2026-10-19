import { describe, it, expect, beforeEach } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import ColorVisionBadge from "~/components/preview/ColorVisionBadge.vue";
import ColorVisionFilters from "~/components/preview/ColorVisionFilters.vue";
import { useColorVision } from "~/composables/useColorVision";

describe("PreviewColorVisionBadge", () => {
  beforeEach(() => {
    useColorVision().setMode("none");
  });

  it("renders nothing for normal vision", async () => {
    const wrapper = await mountWithUApp(ColorVisionBadge);
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("names the active simulation and turns it off on click", async () => {
    useColorVision().setMode("tritanopia");
    const wrapper = await mountWithUApp(ColorVisionBadge);
    const button = wrapper.find("button");
    expect(button.text()).toContain("Tritanopia");
    expect(button.attributes("aria-label")).toBe(
      "Simulating Tritanopia. Turn off color vision simulation",
    );
    await button.trigger("click");
    expect(useColorVision().mode.value).toBe("none");
  });
});

describe("PreviewColorVisionFilters", () => {
  it("defines one SVG filter per simulated mode", async () => {
    const wrapper = await mountWithUApp(ColorVisionFilters);
    const ids = wrapper.findAll("filter").map((f) => f.attributes("id"));
    expect(ids).toEqual([
      "color-vision-protanopia",
      "color-vision-deuteranopia",
      "color-vision-tritanopia",
      "color-vision-achromatopsia",
    ]);
  });
});
