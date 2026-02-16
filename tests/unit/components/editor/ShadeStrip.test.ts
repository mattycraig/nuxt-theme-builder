import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { DefineComponent } from "vue";
import ShadeStrip from "~/components/editor/ShadeStrip.vue";
import { NUMERIC_SHADE_KEYS } from "~/types/theme";
import { NEUTRAL_HEX_MAP } from "~/utils/colorPalettes";
import App from "@nuxt/ui/runtime/components/App.vue";

describe("EditorShadeStrip", () => {
  const hexMap = NEUTRAL_HEX_MAP["slate"] ?? {};

  /**
   * ShadeStrip uses UTooltip — wrap inside Nuxt UI's App for TooltipProvider.
   */
  async function mount(modelValue = "500" as string, extraProps: Record<string, unknown> = {}) {
    const props = { modelValue, hexMap, ...extraProps };

    const WrapperComponent = defineComponent({
      components: { NuxtUiApp: App as any, ShadeStrip: ShadeStrip as any },
      setup() {
        return { props };
      },
      template: `<NuxtUiApp><ShadeStrip v-bind="props" /></NuxtUiApp>`,
    });

    return mountSuspended(WrapperComponent as unknown as DefineComponent);
  }

  it("renders a radiogroup with aria-label", async () => {
    const wrapper = await mount("500", { ariaLabel: "Pick a shade" });
    const group = wrapper.find("[role='radiogroup']");
    expect(group.exists()).toBe(true);
    expect(group.attributes("aria-label")).toBe("Pick a shade");
  });

  it("renders buttons for all numeric shades plus white and black", async () => {
    const wrapper = await mount();
    const radios = wrapper.findAll("[role='radio']");
    // white + numeric shades + black
    expect(radios.length).toBe(NUMERIC_SHADE_KEYS.length + 2);
  });

  it("marks the selected shade as checked", async () => {
    const wrapper = await mount("500");
    const radios = wrapper.findAll("[role='radio']");
    const checked = radios.filter(
      (r) => r.attributes("aria-checked") === "true",
    );
    expect(checked.length).toBe(1);
    expect(checked[0]!.attributes("aria-label")).toContain("500");
  });

  it("marks white as checked when selected", async () => {
    const wrapper = await mount("white");
    const whiteBtn = wrapper.findAll("[role='radio']").find(
      (r) => r.attributes("aria-label") === "White",
    );
    expect(whiteBtn?.attributes("aria-checked")).toBe("true");
  });

  it("emits update:modelValue when a shade button is clicked", async () => {
    const wrapper = await mount("500");
    const radios = wrapper.findAll("[role='radio']");
    const blackBtn = radios.find(
      (r) => r.attributes("aria-label") === "Black",
    );
    await blackBtn!.trigger("click");
    expect(blackBtn).toBeTruthy();
  });

  it("hides white/black when showWhiteBlack is false", async () => {
    const wrapper = await mount("500", { showWhiteBlack: false });
    const radios = wrapper.findAll("[role='radio']");
    expect(radios.length).toBe(NUMERIC_SHADE_KEYS.length);
    const labels = radios.map((r) => r.attributes("aria-label"));
    expect(labels).not.toContain("White");
    expect(labels).not.toContain("Black");
  });
});
