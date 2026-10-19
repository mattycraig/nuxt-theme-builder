import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ColorVisionSelect from "~/components/editor/ColorVisionSelect.vue";

describe("EditorColorVisionSelect", () => {
  it("labels the select and explains what it does", async () => {
    const wrapper = await mountSuspended(ColorVisionSelect, {
      props: { modelValue: "none" },
    });
    const label = wrapper.find("label");
    expect(label.text()).toBe("Preview as");
    const select = wrapper.find(`#${label.attributes("for")}`);
    expect(select.exists()).toBe(true);
    const hint = wrapper.find(`#${select.attributes("aria-describedby")}`);
    expect(hint.text()).toContain("Your theme isn't changed");
  });

  it("shows the selected mode", async () => {
    const wrapper = await mountSuspended(ColorVisionSelect, {
      props: { modelValue: "deuteranopia" },
    });
    expect(wrapper.text()).toContain("Deuteranopia");
  });
});
