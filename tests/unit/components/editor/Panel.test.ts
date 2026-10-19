import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import Panel from "~/components/editor/Panel.vue";

// Panel uses UTooltip (via child components) so needs UApp wrapper
async function mountPanel() {
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, EditorPanel: Panel as any },
    template: `<NuxtUiApp><EditorPanel /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("EditorPanel", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
  });

  it("renders the theme editor container", async () => {
    const wrapper = await mountPanel();
    expect(wrapper.find('[data-testid="theme-editor"]').exists()).toBe(true);
  });

  it("renders the toolbar with save button", async () => {
    const wrapper = await mountPanel();
    // Toolbar renders icon-only buttons, check for save aria-label
    const saveBtn = wrapper.find('button[aria-label*="Save"]');
    expect(saveBtn.exists()).toBe(true);
  });

  it("renders default-open editor sections", async () => {
    const wrapper = await mountPanel();
    const html = wrapper.html();
    expect(html).toContain("My Themes");
    expect(html).toContain("Theme Presets");
    expect(html).toContain("Color Mode");
    expect(html).toContain("Layout");
    expect(html).toContain("Semantic Colors");
    expect(html).toContain("Neutral Color");
    expect(html).toContain("Contrast Check");
  });

  it("renders collapsed sections for token overrides", async () => {
    const wrapper = await mountPanel();
    const html = wrapper.html();
    expect(html).toContain("Text Colors");
    expect(html).toContain("Background Colors");
    expect(html).toContain("Border Colors");
  });

  it("randomizes from its own Random Theme section, not Theme Presets", async () => {
    const store = useThemeStore();
    store.randomizeLocks = [];
    const wrapper = await mountPanel();
    const header = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Random Theme"));
    expect(header).toBeDefined();
    await header!.trigger("click");

    const before = JSON.stringify(store.config);
    const generate = wrapper
      .findAll("button")
      .find((b) => b.text() === "Generate random theme");
    expect(generate).toBeDefined();
    await generate!.trigger("click");
    expect(JSON.stringify(store.config)).not.toBe(before);
  });

  it("contains font picker and radius slider in Layout section", async () => {
    const wrapper = await mountPanel();
    expect(wrapper.html()).toContain("Font Family");
    expect(wrapper.html()).toContain("Border Radius");
  });

  it("renders semantic color pickers for all roles", async () => {
    const wrapper = await mountPanel();
    const html = wrapper.html();
    expect(html).toContain("Primary");
    expect(html).toContain("Secondary");
    expect(html).toContain("Success");
    expect(html).toContain("Warning");
    expect(html).toContain("Error");
    expect(html).toContain("Info");
  });

  it("copies the other mode's colors from the Color Mode section", async () => {
    const store = useThemeStore();
    store.setSemanticColorForMode("dark", "primary", "lime");
    const wrapper = await mountPanel();
    const button = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Copy from dark mode"));
    expect(button).toBeDefined();
    await button!.trigger("click");
    expect(store.config.colors.primary).toBe("lime");
    expect(store.config.colors.warning).toBe(store.config.darkColors.warning);
  });

  it("disables copying when both modes already match", async () => {
    const store = useThemeStore();
    store.copyModeSettings("light");
    const wrapper = await mountPanel();
    const button = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Copy from dark mode"));
    expect(button?.attributes("disabled")).toBeDefined();
    expect(wrapper.text()).toContain("already match dark mode");
  });

  it("renders the custom palettes section", async () => {
    const wrapper = await mountPanel();
    expect(wrapper.html()).toContain("Custom Palettes");
    expect(wrapper.text()).toContain("New palette");
  });

  it("previews custom palette colors live and commits one history entry", async () => {
    const store = useThemeStore();
    store.addCustomPalette("brand", "#f5c518");
    const wrapper = await mountPanel();

    const hex = wrapper.find('input[aria-label="brand base color"]');
    await hex.setValue("#e0b000");
    await hex.setValue("#1e3a8a");
    expect(store.config.customPalettes?.[0]?.color).toBe("#1e3a8a");

    await new Promise((resolve) => setTimeout(resolve, 400));
    store.undo();
    expect(store.config.customPalettes?.[0]?.color).toBe("#f5c518");
  });
});

