import { describe, it, expect, beforeEach } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import ColorVisionMenu from "~/components/preview/ColorVisionMenu.vue";
import ColorVisionFilters from "~/components/preview/ColorVisionFilters.vue";
import { useColorVision } from "~/composables/useColorVision";

describe("PreviewColorVisionMenu", () => {
  beforeEach(() => {
    useColorVision().setMode("none");
  });

  it("renders an unlabeled trigger for normal vision", async () => {
    const wrapper = await mountWithUApp(ColorVisionMenu);
    const button = wrapper.find('button[aria-label="Simulate color vision"]');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("");
  });

  it("names the active simulation on the trigger", async () => {
    useColorVision().setMode("tritanopia");
    const wrapper = await mountWithUApp(ColorVisionMenu);
    const button = wrapper.find("button");
    expect(button.text()).toContain("Tritanopia");
    expect(button.attributes("aria-label")).toBe(
      "Color vision simulation: Tritanopia",
    );
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
