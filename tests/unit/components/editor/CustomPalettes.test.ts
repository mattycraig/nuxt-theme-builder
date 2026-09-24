import { describe, it, expect } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import CustomPalettes from "~/components/editor/CustomPalettes.vue";
import { CUSTOM_PALETTE_MAX } from "~/types/theme";
import type { CustomPalette } from "~/types/theme";

const BRAND: CustomPalette = { name: "brand", color: "#f5c518" };

async function mountPalettes(palettes: CustomPalette[] = []) {
  const wrapper = await mountWithUApp(CustomPalettes, { props: { palettes } });
  return { wrapper, target: () => wrapper.findComponent(CustomPalettes) };
}

function findButton(
  wrapper: Awaited<ReturnType<typeof mountWithUApp>>,
  text: string,
) {
  return wrapper.findAll("button").find((b) => b.text().trim() === text);
}

describe("EditorCustomPalettes", () => {
  it("explains the feature when there are no palettes", async () => {
    const { wrapper } = await mountPalettes();
    expect(wrapper.text()).toContain("Generate a full 50–950 palette");
    expect(findButton(wrapper, "New palette")).toBeDefined();
  });

  it("creates a palette with a suggested name and default color", async () => {
    const { wrapper, target } = await mountPalettes([BRAND]);
    await findButton(wrapper, "New palette")!.trigger("click");

    const form = wrapper.find('form[aria-label="New custom palette"]');
    expect(form.exists()).toBe(true);
    expect(form.find("input").element.value).toBe("brand-2");

    await form.trigger("submit");
    expect(target().emitted("create")).toEqual([["brand-2", "#f5c518"]]);
    expect(wrapper.find('form[aria-label="New custom palette"]').exists()).toBe(
      false,
    );
  });

  it("creates with a shorthand color typed just before pressing Enter", async () => {
    const { wrapper, target } = await mountPalettes();
    await findButton(wrapper, "New palette")!.trigger("click");
    const form = wrapper.find('form[aria-label="New custom palette"]');
    const hex = form.find('input[aria-label="Base color"]');
    await hex.setValue("#fc0");
    await hex.trigger("keydown", { key: "Enter" });
    await form.trigger("submit");
    expect(target().emitted("create")).toEqual([["brand", "#ffcc00"]]);
  });

  it("blocks names that are taken or reserved", async () => {
    const { wrapper, target } = await mountPalettes([BRAND]);
    await findButton(wrapper, "New palette")!.trigger("click");
    const input = wrapper.find('form[aria-label="New custom palette"] input');

    await input.setValue("Brand");
    expect(wrapper.text()).toContain('A palette named "brand" already exists');
    expect(findButton(wrapper, "Create")!.attributes("disabled")).toBeDefined();

    await input.setValue("yellow");
    expect(wrapper.text()).toContain("built-in palette or role name");

    await wrapper.find('form[aria-label="New custom palette"]').trigger("submit");
    expect(target().emitted("create")).toBeUndefined();
  });

  it("lists each palette with its generated shades", async () => {
    const { wrapper } = await mountPalettes([BRAND]);
    const list = wrapper.find('ul[aria-label="Custom palettes"]');
    expect(list.text()).toContain("brand");
    expect(
      list.find('[role="img"]').attributes("aria-label"),
    ).toBe("brand palette, 50 to 950, base color at shade 400");
  });

  it("emits color changes with the palette name", async () => {
    const { wrapper, target } = await mountPalettes([BRAND]);
    const hex = wrapper.find('input[aria-label="brand base color"]');
    await hex.setValue("#1E3A8A");
    expect(target().emitted("update:color")).toEqual([["brand", "#1e3a8a"]]);
  });

  it(`disables new palettes at the limit of ${CUSTOM_PALETTE_MAX}`, async () => {
    const palettes = Array.from({ length: CUSTOM_PALETTE_MAX }, (_, i) => ({
      name: `brand-${i}`,
      color: "#f5c518",
    }));
    const { wrapper } = await mountPalettes(palettes);
    expect(
      findButton(wrapper, "New palette")!.attributes("disabled"),
    ).toBeDefined();
  });
});
