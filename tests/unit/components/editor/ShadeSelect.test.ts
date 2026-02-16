import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ShadeSelect from "~/components/editor/ShadeSelect.vue";
import App from "@nuxt/ui/runtime/components/App.vue";

async function mountShadeSelect(props: Record<string, unknown> = {}) {
  const defaultProps = {
    modelValue: "500",
    label: "Default",
    neutralPalette: "slate",
    ...props,
  };
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: ShadeSelect as any },
    setup() {
      return { props: defaultProps };
    },
    template: `<NuxtUiApp><Target v-bind="props" /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("EditorShadeSelect", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
  });

  it("renders the label", async () => {
    const wrapper = await mountShadeSelect({ label: "Muted" });
    const label = wrapper.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("Muted");
  });

  it("renders a select element for shade values", async () => {
    const wrapper = await mountShadeSelect();
    const html = wrapper.html();
    expect(html).toContain("Default: 500");
  });

  it("renders the ShadeStrip sub-component", async () => {
    const wrapper = await mountShadeSelect();
    const radiogroup = wrapper.find('[role="radiogroup"]');
    expect(radiogroup.exists()).toBe(true);
  });

  it("renders a swatch preview element", async () => {
    const wrapper = await mountShadeSelect({ neutralPalette: "zinc" });
    const swatches = wrapper.findAll('[aria-hidden="true"]');
    expect(swatches.length).toBeGreaterThan(0);
  });
});
