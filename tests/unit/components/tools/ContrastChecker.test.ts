import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ContrastChecker from "~/components/tools/ContrastChecker.vue";

describe("ToolsContrastChecker", () => {
  async function mount() {
    return mountSuspended(ContrastChecker);
  }

  it("renders foreground and background color inputs", async () => {
    const wrapper = await mount();
    const fgInput = wrapper.find("[aria-label='Foreground hex color']");
    const bgInput = wrapper.find("[aria-label='Background hex color']");
    expect(fgInput.exists()).toBe(true);
    expect(bgInput.exists()).toBe(true);
  });

  it("renders color picker buttons", async () => {
    const wrapper = await mount();
    const fgPicker = wrapper.find(
      "[aria-label='Pick foreground color']",
    );
    const bgPicker = wrapper.find("[aria-label='Pick background color']");
    expect(fgPicker.exists()).toBe(true);
    expect(bgPicker.exists()).toBe(true);
  });

  it("renders the swap button", async () => {
    const wrapper = await mount();
    const allButtons = wrapper.findAll("button");
    const swapButton = allButtons.find((b) => b.text().includes("Swap"));
    expect(swapButton?.exists()).toBe(true);
  });

  it("displays a preview section with sample text", async () => {
    const wrapper = await mount();
    expect(wrapper.text()).toContain("Sample Text");
    expect(wrapper.text()).toContain(
      "The quick brown fox jumps over the lazy dog.",
    );
  });

  it("shows WCAG contrast results with default colors", async () => {
    const wrapper = await mount();
    // Default: fg=#1a1a2e, bg=#ffffff → high contrast → all should pass
    expect(wrapper.text()).toContain("Contrast Ratio");
    expect(wrapper.text()).toContain("AA Normal");
    expect(wrapper.text()).toContain("AA Large");
    expect(wrapper.text()).toContain("AAA Normal");
    expect(wrapper.text()).toContain("AAA Large");
  });

  it("displays Pass badges for high-contrast default colors", async () => {
    const wrapper = await mount();
    // fg=#1a1a2e on bg=#ffffff has very high contrast
    const passTexts = wrapper.findAll("span").filter((s) => s.text() === "Pass");
    expect(passTexts.length).toBeGreaterThanOrEqual(4);
  });

  it("has an accessible live region for results", async () => {
    const wrapper = await mount();
    const liveRegion = wrapper.find("[aria-live='polite']");
    expect(liveRegion.exists()).toBe(true);
    expect(liveRegion.attributes("aria-atomic")).toBe("true");
  });
});
