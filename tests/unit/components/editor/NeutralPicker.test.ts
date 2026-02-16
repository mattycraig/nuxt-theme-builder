import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import NeutralPicker from "~/components/editor/NeutralPicker.vue";
import { NEUTRAL_PALETTES } from "~/types/theme";

describe("EditorNeutralPicker", () => {
  async function mount(modelValue = "slate" as string, label = "Neutral") {
    return mountSuspended(NeutralPicker, {
      props: {
        modelValue: modelValue as any,
        label,
      },
    });
  }

  it("renders the label", async () => {
    const wrapper = await mount("slate", "Neutral Palette");
    const label = wrapper.find("label");
    expect(label.text()).toBe("Neutral Palette");
  });

  it("renders a radiogroup for palette selection", async () => {
    const wrapper = await mount();
    const radiogroup = wrapper.find("[role='radiogroup']");
    expect(radiogroup.exists()).toBe(true);
  });

  it("renders a radio button for each neutral palette", async () => {
    const wrapper = await mount();
    const radios = wrapper.findAll("[role='radio']");
    expect(radios.length).toBe(NEUTRAL_PALETTES.length);
  });

  it("marks the selected palette as checked", async () => {
    const wrapper = await mount("zinc");
    const radios = wrapper.findAll("[role='radio']");
    const checked = radios.filter(
      (r) => r.attributes("aria-checked") === "true",
    );
    expect(checked.length).toBe(1);
    expect(checked[0]!.attributes("aria-label")).toContain("Zinc");
  });

  it("emits update:modelValue when a palette radio is clicked", async () => {
    const wrapper = await mount("slate");
    const radios = wrapper.findAll("[role='radio']");
    // Click the second palette (not "slate")
    const targetRadio = radios.find(
      (r) => !r.attributes("aria-label")?.includes("Slate"),
    );
    await targetRadio!.trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });
});
