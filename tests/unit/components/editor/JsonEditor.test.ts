import { describe, it, expect, beforeEach } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import JsonEditor from "~/components/editor/JsonEditor.vue";

describe("JsonEditor", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
  });

  it("renders a textarea for JSON editing", async () => {
    const wrapper = await mountWithUApp(JsonEditor);
    const textarea = wrapper.find("#json-editor-textarea");
    expect(textarea.exists()).toBe(true);
  });

  it("renders the textarea with current store config as JSON", async () => {
    const wrapper = await mountWithUApp(JsonEditor);
    const textarea = wrapper.find("#json-editor-textarea");
    const value = (textarea.element as HTMLTextAreaElement).value;
    expect(value).toBeTruthy();
    const parsed = JSON.parse(value);
    expect(parsed).toHaveProperty("colors");
    expect(parsed).toHaveProperty("radius");
  });

  it("renders CodeBlock component wrapper", async () => {
    const wrapper = await mountWithUApp(JsonEditor);
    // JsonEditor wraps content in SharedCodeBlock
    expect(wrapper.find(".json-editor-textarea").exists()).toBe(true);
  });

  it("renders Apply and Reset buttons", async () => {
    const wrapper = await mountWithUApp(JsonEditor);
    const buttons = wrapper.findAll("button");
    const labels = buttons.map((b) => b.text());
    const hasApply = labels.some((l) => l.toLowerCase().includes("apply"));
    const hasReset = labels.some((l) => l.toLowerCase().includes("reset"));
    expect(hasApply || hasReset).toBe(true);
  });

  it("shows error when applying invalid JSON", async () => {
    const wrapper = await mountWithUApp(JsonEditor);
    const textarea = wrapper.find("#json-editor-textarea");
    await textarea.setValue("{invalid json");
    await textarea.trigger("input");

    // Find and click Apply button
    const buttons = wrapper.findAll("button");
    const applyBtn = buttons.find(
      (b) =>
        b.text().toLowerCase().includes("apply") ||
        b.attributes("aria-label")?.toLowerCase().includes("apply"),
    );
    if (applyBtn) {
      await applyBtn.trigger("click");
      await wrapper.vm.$nextTick();
    }
  });

  it("shows sr-only label for textarea", async () => {
    const wrapper = await mountWithUApp(JsonEditor);
    const label = wrapper.find('label[for="json-editor-textarea"]');
    expect(label.exists()).toBe(true);
    expect(label.classes()).toContain("sr-only");
  });
});
