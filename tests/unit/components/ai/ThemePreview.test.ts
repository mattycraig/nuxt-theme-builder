import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import ThemePreview from "~/components/ai/ThemePreview.vue";
import { DEFAULT_THEME } from "~/utils/defaults";

async function mountThemePreview(config = DEFAULT_THEME) {
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: ThemePreview as any },
    setup() {
      return { config };
    },
    template: `<NuxtUiApp><Target :theme-config="config" /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("AiThemePreview", () => {
  it("renders the preview group container", async () => {
    const wrapper = await mountThemePreview();
    const group = wrapper.find('[role="group"]');
    expect(group.exists()).toBe(true);
  });

  it("includes aria description with theme colors", async () => {
    const wrapper = await mountThemePreview();
    const group = wrapper.find('[role="group"]');
    const label = group.attributes("aria-label") ?? "";
    expect(label).toContain("primary");
    expect(label).toContain("neutral");
    expect(label).toContain("font");
    expect(label).toContain("radius");
  });

  it("renders Light and Dark mode labels", async () => {
    const wrapper = await mountThemePreview();
    const text = wrapper.text();
    expect(text).toContain("Light");
    expect(text).toContain("Dark");
  });

  it("renders Apply button", async () => {
    const wrapper = await mountThemePreview();
    const buttons = wrapper.findAll("button");
    const applyBtn = buttons.find((b) => b.text().includes("Apply"));
    expect(applyBtn).toBeDefined();
  });

  it("renders Export button", async () => {
    const wrapper = await mountThemePreview();
    const buttons = wrapper.findAll("button");
    const exportBtn = buttons.find((b) => b.text().includes("Export"));
    expect(exportBtn).toBeDefined();
  });

  it("renders semantic color swatches for each role", async () => {
    const wrapper = await mountThemePreview();
    const html = wrapper.html();
    expect(html).toContain("primary");
    expect(html).toContain("secondary");
    expect(html).toContain("success");
  });
});
