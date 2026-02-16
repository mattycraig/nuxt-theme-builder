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
  });

  it("renders collapsed sections for token overrides", async () => {
    const wrapper = await mountPanel();
    const html = wrapper.html();
    expect(html).toContain("Text Colors");
    expect(html).toContain("Background Colors");
    expect(html).toContain("Border Colors");
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
});
