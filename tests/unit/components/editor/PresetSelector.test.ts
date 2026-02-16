import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import PresetSelector from "~/components/editor/preset/Selector.vue";

async function mountSelector() {
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: PresetSelector as any },
    template: `<NuxtUiApp><Target /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("EditorPresetSelector", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
  });

  it("renders the preset select with aria-label", async () => {
    const wrapper = await mountSelector();
    const html = wrapper.html();
    expect(html).toContain("Theme preset");
  });

  it("renders random theme button", async () => {
    const wrapper = await mountSelector();
    const button = wrapper.find(
      'button[aria-label="Generate random theme"]',
    );
    expect(button.exists()).toBe(true);
  });

  it("auto-loads first preset for fresh store", async () => {
    const store = useThemeStore();
    await mountSelector();
    expect(store.activePresetName).toBeTruthy();
  });
});
