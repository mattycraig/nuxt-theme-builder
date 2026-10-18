import { describe, it, expect } from "vitest";
import { BUILT_IN_PRESETS } from "~/utils/presets";
import { getThemeContrastChecks } from "~/utils/themeContrast";

/**
 * Presets that copy a design system as-is, including its contrast gaps.
 * Nuxt UI's stock light mode puts white text on 500-level colors.
 */
const STOCK_LIGHT_MODE = new Set(["Nuxt UI"]);

function failures(config: (typeof BUILT_IN_PRESETS)[number]["config"], mode: "light" | "dark") {
  return getThemeContrastChecks(config, mode)
    .filter((check) => !check.passes)
    .map((check) => `${check.id} (${check.ratio.toFixed(2)}:1)`);
}

describe("built-in preset contrast", () => {
  describe.each(BUILT_IN_PRESETS.map((p) => [p.name, p] as const))(
    "%s",
    (name, preset) => {
      it("meets WCAG AA in dark mode", () => {
        expect(failures(preset.config, "dark")).toEqual([]);
      });

      it.skipIf(STOCK_LIGHT_MODE.has(name))("meets WCAG AA in light mode", () => {
        expect(failures(preset.config, "light")).toEqual([]);
      });
    },
  );

  it("only exempts presets that exist and still need it", () => {
    for (const name of STOCK_LIGHT_MODE) {
      const preset = BUILT_IN_PRESETS.find((p) => p.name === name);
      expect(preset, name).toBeDefined();
      expect(failures(preset!.config, "light"), name).not.toEqual([]);
    }
  });
});
