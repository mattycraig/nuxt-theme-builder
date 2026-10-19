import { describe, it, expect } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import RandomizeLocks from "~/components/editor/RandomizeLocks.vue";

describe("EditorRandomizeLocks", () => {
  it("shows an open lock when nothing is locked", async () => {
    const wrapper = await mountWithUApp(RandomizeLocks, {
      props: { modelValue: [] },
    });
    const button = wrapper.find("button");
    expect(button.attributes("aria-label")).toBe("Choose what randomize keeps");
    expect(button.text()).toBe("");
  });

  it("shows how many parts are locked", async () => {
    const wrapper = await mountWithUApp(RandomizeLocks, {
      props: { modelValue: ["primary", "font"] },
    });
    const button = wrapper.find("button");
    expect(button.text()).toBe("2");
    expect(button.attributes("aria-label")).toBe(
      "Choose what randomize keeps (2 locked)",
    );
  });
});
