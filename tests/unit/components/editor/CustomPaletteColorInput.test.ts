import { describe, it, expect } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import CustomPaletteColorInput from "~/components/editor/CustomPaletteColorInput.vue";

async function mountInput(modelValue = "#f5c518") {
  const wrapper = await mountWithUApp(CustomPaletteColorInput, {
    props: { modelValue, label: "Base color" },
  });
  return {
    wrapper,
    input: wrapper.find('input[aria-label="Base color"]'),
    emitted: () =>
      wrapper.findComponent(CustomPaletteColorInput).emitted("update:modelValue"),
  };
}

describe("EditorCustomPaletteColorInput", () => {
  it("shows the current color", async () => {
    const { input, wrapper } = await mountInput();
    expect((input.element as HTMLInputElement).value).toBe("#f5c518");
    expect(
      wrapper.find('button[aria-label="Pick Base color"]').attributes("style"),
    ).toContain("background-color");
  });

  it("emits complete hex colors normalized to lowercase", async () => {
    const { input, emitted } = await mountInput();
    await input.setValue("#1E3A8A");
    expect(emitted()).toEqual([["#1e3a8a"]]);
  });

  it("doesn't emit shorthand while typing, only on blur", async () => {
    const { input, emitted } = await mountInput();
    await input.setValue("#1e3");
    expect(emitted()).toBeUndefined();
    await input.trigger("blur");
    expect(emitted()).toEqual([["#11ee33"]]);
  });

  it("marks invalid input and restores the color on blur", async () => {
    const { input, emitted } = await mountInput();
    await input.setValue("#zzz");
    expect(input.attributes("aria-invalid")).toBe("true");
    await input.trigger("blur");
    expect((input.element as HTMLInputElement).value).toBe("#f5c518");
    expect(emitted()).toBeUndefined();
  });
});
