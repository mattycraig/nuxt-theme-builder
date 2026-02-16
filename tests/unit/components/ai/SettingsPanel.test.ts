import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import SettingsPanel from "~/components/ai/SettingsPanel.vue";

async function mountSettings() {
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: SettingsPanel as any },
    template: `<NuxtUiApp><Target /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("AiSettingsPanel", () => {
  it("renders the privacy alert", async () => {
    const wrapper = await mountSettings();
    expect(wrapper.text()).toContain("Privacy Note");
  });

  it("renders Provider select", async () => {
    const wrapper = await mountSettings();
    expect(wrapper.text()).toContain("Provider");
  });

  it("renders API Key input", async () => {
    const wrapper = await mountSettings();
    const apiKeyInput = wrapper.find("#ai-api-key");
    expect(apiKeyInput.exists()).toBe(true);
  });

  it("renders show/hide key toggle", async () => {
    const wrapper = await mountSettings();
    const toggleBtn = wrapper.find(
      'button[aria-label="Show API key"], button[aria-label="Hide API key"]',
    );
    expect(toggleBtn.exists()).toBe(true);
  });

  it("renders Remember my key checkbox", async () => {
    const wrapper = await mountSettings();
    expect(wrapper.text()).toContain("Remember my key");
  });

  it("renders Model select", async () => {
    const wrapper = await mountSettings();
    expect(wrapper.text()).toContain("Model");
  });
});
