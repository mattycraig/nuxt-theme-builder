import { describe, it, expect, beforeEach } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import Slideover from "~/components/editor/export/Slideover.vue";

describe("EditorExportSlideover", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
  });

  it("renders without errors", async () => {
    const wrapper = await mountWithUApp(Slideover);
    expect(wrapper.exists()).toBe(true);
  });

  it("contains a hidden trigger span", async () => {
    const wrapper = await mountWithUApp(Slideover);
    const hiddenSpan = wrapper.find("span.hidden");
    expect(hiddenSpan.exists()).toBe(true);
  });
});
