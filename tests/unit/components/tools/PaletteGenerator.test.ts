import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import PaletteGenerator from "~/components/tools/PaletteGenerator.vue";

async function mountPaletteGenerator() {
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: PaletteGenerator as any },
    template: `<NuxtUiApp><Target /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("ToolsPaletteGenerator", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
  });

  it("renders Generate button", async () => {
    const wrapper = await mountPaletteGenerator();
    const buttons = wrapper.findAll("button");
    const generateBtn = buttons.find((b) => b.text().includes("Generate"));
    expect(generateBtn).toBeDefined();
  });

  it("renders Apply to Theme button", async () => {
    const wrapper = await mountPaletteGenerator();
    const buttons = wrapper.findAll("button");
    const applyBtn = buttons.find((b) =>
      b.text().includes("Apply to Theme"),
    );
    expect(applyBtn).toBeDefined();
  });

  it("renders palette cards for all semantic roles", async () => {
    const wrapper = await mountPaletteGenerator();
    const text = wrapper.text();
    expect(text).toContain("primary");
    expect(text).toContain("secondary");
    expect(text).toContain("success");
    expect(text).toContain("warning");
    expect(text).toContain("error");
    expect(text).toContain("info");
  });

  it("renders lock/unlock buttons for each role", async () => {
    const wrapper = await mountPaletteGenerator();
    const lockButtons = wrapper.findAll('button[aria-label*="Lock"]');
    // 6 roles: primary, secondary, success, warning, error, info
    expect(lockButtons.length).toBeGreaterThanOrEqual(6);
  });

  it("renders shade preview swatches", async () => {
    const wrapper = await mountPaletteGenerator();
    const swatchImages = wrapper.findAll('[role="img"]');
    expect(swatchImages.length).toBeGreaterThanOrEqual(6);
  });

  it("renders export section with heading", async () => {
    const wrapper = await mountPaletteGenerator();
    const heading = wrapper.find("#palette-export-heading");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("Export Palette");
  });

  it("renders export format tabs", async () => {
    const wrapper = await mountPaletteGenerator();
    const html = wrapper.html();
    expect(html).toContain("app.config.ts");
    expect(html).toContain("CSS Variables");
    expect(html).toContain("JSON");
  });
});
