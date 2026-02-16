import { describe, it, expect } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import PaletteViewer from "~/components/tools/PaletteViewer.vue";

describe("PaletteViewer", () => {
  it("renders chromatic and neutral palette sections", async () => {
    const wrapper = await mountWithUApp(PaletteViewer);
    const html = wrapper.html();
    expect(html).toContain("Chromatic Palettes");
    expect(html).toContain("Neutral Palettes");
  });

  it("renders palette name labels", async () => {
    const wrapper = await mountWithUApp(PaletteViewer);
    const html = wrapper.html();
    // Should contain well-known palette names
    expect(html).toContain("red");
    expect(html).toContain("blue");
    expect(html).toContain("green");
  });

  it("renders swatch buttons with aria-labels", async () => {
    const wrapper = await mountWithUApp(PaletteViewer);
    const buttons = wrapper.findAll("button[aria-label]");
    expect(buttons.length).toBeGreaterThan(0);
    const label = buttons[0].attributes("aria-label") ?? "";
    expect(label).toContain("Click to copy");
  });

  it("renders shade groups with role=group", async () => {
    const wrapper = await mountWithUApp(PaletteViewer);
    const groups = wrapper.findAll('[role="group"]');
    expect(groups.length).toBeGreaterThan(0);
    const label = groups[0].attributes("aria-label") ?? "";
    expect(label).toContain("palette shades");
  });

  it("renders search input for filtering", async () => {
    const wrapper = await mountWithUApp(PaletteViewer);
    const input = wrapper.find('input[aria-label="Filter palettes by name"]');
    expect(input.exists()).toBe(true);
  });

  it("renders HEX and OKLCH format buttons", async () => {
    const wrapper = await mountWithUApp(PaletteViewer);
    const buttons = wrapper.findAll("button");
    const labels = buttons.map((b) => b.text());
    expect(labels).toContain("HEX");
    expect(labels).toContain("OKLCH");
  });

  it("renders 11 shade keys per palette row", async () => {
    const wrapper = await mountWithUApp(PaletteViewer);
    const groups = wrapper.findAll('[role="group"]');
    if (groups.length > 0) {
      const shadeButtons = groups[0].findAll("button");
      expect(shadeButtons.length).toBe(11);
    }
  });
});
