import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import FontPicker from "~/components/editor/FontPicker.vue";

describe("EditorFontPicker", () => {
  async function mount(modelValue = "Inter") {
    return mountSuspended(FontPicker, {
      props: { modelValue },
    });
  }

  it("renders the Font Family label", async () => {
    const wrapper = await mount();
    expect(wrapper.text()).toContain("Font Family");
  });

  it("renders a label element linked to the select", async () => {
    const wrapper = await mount();
    const label = wrapper.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe("Font Family");
    const forAttr = label.attributes("for");
    expect(forAttr).toBeTruthy();
  });

  it("displays the current model value", async () => {
    const wrapper = await mount("Fira Code");
    expect(wrapper.text()).toContain("Fira Code");
  });
});
