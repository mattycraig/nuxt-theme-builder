import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ColorConverter from "~/components/tools/ColorConverter.vue";

describe("ToolsColorConverter", () => {
  async function mount() {
    return mountSuspended(ColorConverter);
  }

  it("renders a color input field", async () => {
    const wrapper = await mount();
    const input = wrapper.find(
      "[aria-label='Enter a color in any format (HEX, RGB, HSL, or OKLCH)']",
    );
    expect(input.exists()).toBe(true);
  });

  it("renders a color picker button", async () => {
    const wrapper = await mount();
    const picker = wrapper.find("[aria-label='Pick a color visually']");
    expect(picker.exists()).toBe(true);
  });

  it("shows conversion results for the default hex color", async () => {
    const wrapper = await mount();
    // Default is #3b82f6
    const text = wrapper.text();
    expect(text).toContain("HEX");
    expect(text).toContain("RGB");
    expect(text).toContain("HSL");
    expect(text).toContain("OKLCH");
  });

  it("displays detected format badge", async () => {
    const wrapper = await mount();
    // Default #3b82f6 should be detected as HEX
    expect(wrapper.text()).toContain("Detected");
    expect(wrapper.text()).toContain("HEX");
  });

  it("renders a color preview block", async () => {
    const wrapper = await mount();
    const preview = wrapper.find("[role='img']");
    expect(preview.exists()).toBe(true);
    expect(preview.attributes("aria-label")).toContain("Color preview");
  });

  it("renders copy buttons for each format", async () => {
    const wrapper = await mount();
    const copyBtns = wrapper.findAll("[aria-label*='Copy']");
    expect(copyBtns.length).toBe(4); // HEX, RGB, HSL, OKLCH
  });

  it("shows the color format reference card", async () => {
    const wrapper = await mount();
    expect(wrapper.text()).toContain("Color Format Reference");
    expect(wrapper.text()).toContain("Perceptual lightness");
  });
});
