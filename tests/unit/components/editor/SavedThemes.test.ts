import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import SavedThemes from "~/components/editor/SavedThemes.vue";

async function mountSavedThemes() {
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: SavedThemes as any },
    template: `<NuxtUiApp><Target /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("EditorSavedThemes", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
  });

  it("shows empty state when no saved themes", async () => {
    const wrapper = await mountSavedThemes();
    expect(wrapper.text()).toContain("No saved themes yet");
  });

  it("renders the screen reader live region", async () => {
    const wrapper = await mountSavedThemes();
    const liveRegion = wrapper.find('[aria-live="polite"]');
    expect(liveRegion.exists()).toBe(true);
  });

  it("renders Generate with AI button in empty state", async () => {
    const wrapper = await mountSavedThemes();
    const aiButton = wrapper.find('a[href="/ai"]');
    expect(aiButton.exists()).toBe(true);
    expect(aiButton.text()).toContain("Generate with AI");
  });

  it("renders 'I'm feeling lucky!' random button in empty state", async () => {
    const wrapper = await mountSavedThemes();
    const luckyButton = wrapper.find(
      `button[aria-label="I'm feeling lucky! Generate random theme"]`,
    );
    expect(luckyButton.exists()).toBe(true);
  });

  it("shows theme list when themes are saved", async () => {
    const store = useThemeStore();
    store.savePreset("Test Theme");
    const wrapper = await mountSavedThemes();
    const list = wrapper.find('[role="list"]');
    expect(list.exists()).toBe(true);
    expect(wrapper.text()).toContain("Test Theme");
  });

  it("shows active indicator for the loaded theme", async () => {
    const store = useThemeStore();
    store.savePreset("Active Theme");
    store.loadPreset(store.savedPresets[0]!);
    const wrapper = await mountSavedThemes();
    const activeLabel = wrapper.find(
      'button[aria-label*="Active Theme"][aria-label*="active"]',
    );
    expect(activeLabel.exists()).toBe(true);
  });

  it("renders action dropdown for each saved theme", async () => {
    const store = useThemeStore();
    store.savePreset("My Theme");
    const wrapper = await mountSavedThemes();
    const actionBtn = wrapper.find(
      'button[aria-label="Actions for My Theme"]',
    );
    expect(actionBtn.exists()).toBe(true);
  });
});
