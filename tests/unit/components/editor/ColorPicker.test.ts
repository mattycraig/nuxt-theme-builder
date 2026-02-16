import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import ColorPicker from "~/components/editor/ColorPicker.vue";

async function mountColorPicker(props: Record<string, unknown> = {}) {
  const defaultProps = {
    modelValue: "blue",
    label: "Primary",
    shade: "500",
    ...props,
  };
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: ColorPicker as any },
    setup() {
      return { props: defaultProps };
    },
    template: `<NuxtUiApp><Target v-bind="props" /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("EditorColorPicker", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
  });

  it("renders the label", async () => {
    const wrapper = await mountColorPicker({ label: "Primary" });
    expect(wrapper.text()).toContain("Primary");
  });

  it("renders label element linked to the select", async () => {
    const wrapper = await mountColorPicker({ label: "Success" });
    const label = wrapper.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("Success");
  });

  it("renders the ShadeStrip sub-component", async () => {
    const wrapper = await mountColorPicker();
    const radiogroup = wrapper.find('[role="radiogroup"]');
    expect(radiogroup.exists()).toBe(true);
  });

  it("displays the current palette value in aria-label", async () => {
    const wrapper = await mountColorPicker({
      modelValue: "emerald",
      label: "Success",
    });
    const html = wrapper.html();
    expect(html).toContain("Success: emerald");
  });
});
