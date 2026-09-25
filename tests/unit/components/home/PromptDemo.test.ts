import { describe, it, expect, beforeEach } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import PromptDemo from "~/components/home/PromptDemo.vue";
import { BUILT_IN_PRESETS } from "~/utils/presets";
import { HOME_EXAMPLE_PROMPTS } from "~/utils/homePrompts";

describe("HomePromptDemo", () => {
  beforeEach(() => {
    useThemeStore().resetToDefaults();
  });

  it("maps every example prompt to a built-in preset", () => {
    const names = new Set(BUILT_IN_PRESETS.map((p) => p.name));
    for (const example of HOME_EXAMPLE_PROMPTS) {
      expect(names).toContain(example.preset);
    }
  });

  it("renders one button per example prompt", async () => {
    const wrapper = await mountWithUApp(PromptDemo);
    const group = wrapper.find('[aria-label="Example prompts"]');
    expect(group.findAll("button")).toHaveLength(HOME_EXAMPLE_PROMPTS.length);
  });

  it("loads the matching preset and announces it when an example is clicked", async () => {
    const store = useThemeStore();
    const wrapper = await mountWithUApp(PromptDemo);
    const example = HOME_EXAMPLE_PROMPTS[0]!;
    const button = wrapper
      .findAll("button")
      .find((b) => b.text() === example.prompt)!;

    await button.trigger("click");

    expect(store.activePresetName).toBe(example.preset);
    expect(button.attributes("aria-pressed")).toBe("true");
    expect(wrapper.find('[aria-live="polite"]').text()).toBe(
      `Applied the ${example.preset} preset.`,
    );
  });

  it("can be undone like any other preset change", async () => {
    const store = useThemeStore();
    const before = JSON.stringify(store.config);
    const wrapper = await mountWithUApp(PromptDemo);
    const example = HOME_EXAMPLE_PROMPTS[0]!;
    await wrapper
      .findAll("button")
      .find((b) => b.text() === example.prompt)!
      .trigger("click");

    expect(JSON.stringify(store.config)).not.toBe(before);
    store.undo();
    expect(JSON.stringify(store.config)).toBe(before);
  });

  it("links to the AI page for real generation", async () => {
    const wrapper = await mountWithUApp(PromptDemo);
    const link = wrapper.find('a[href="/ai"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toContain("Try it yourself");
  });
});
