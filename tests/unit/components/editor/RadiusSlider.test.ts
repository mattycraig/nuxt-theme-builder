import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import RadiusSlider from "~/components/editor/RadiusSlider.vue";

describe("EditorRadiusSlider", () => {
  async function mount(modelValue = 0.5) {
    return mountSuspended(RadiusSlider, {
      props: { modelValue },
    });
  }

  it("renders the label and formatted value", async () => {
    const wrapper = await mount(0.5);
    const text = wrapper.text();
    expect(text).toContain("Border Radius");
    expect(text).toContain("0.5rem (8px)");
  });

  it("formats 0rem correctly", async () => {
    const wrapper = await mount(0);
    expect(wrapper.text()).toContain("0rem (0px)");
  });

  it("formats 1rem correctly", async () => {
    const wrapper = await mount(1);
    expect(wrapper.text()).toContain("1rem (16px)");
  });

  it("formats 0.125rem correctly", async () => {
    const wrapper = await mount(0.125);
    expect(wrapper.text()).toContain("0.125rem (2px)");
  });

  it("renders a slider element", async () => {
    const wrapper = await mount(0.5);
    const slider = wrapper.find("[role='slider']");
    expect(slider.exists()).toBe(true);
  });
});
