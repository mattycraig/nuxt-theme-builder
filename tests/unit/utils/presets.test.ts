import { describe, it, expect } from "vitest";
import { BUILT_IN_PRESETS } from "~/utils/presets";
import { ThemeConfigSchema } from "~/types/theme";
import { getPaletteShadeMap } from "~/utils/customPalettes";

describe("BUILT_IN_PRESETS", () => {
  it("contains at least one preset", () => {
    expect(BUILT_IN_PRESETS.length).toBeGreaterThan(0);
  });

  it("all presets have a non-empty name", () => {
    for (const preset of BUILT_IN_PRESETS) {
      expect(preset.name).toBeTruthy();
      expect(typeof preset.name).toBe("string");
    }
  });

  it("all presets have builtIn flag set to true", () => {
    for (const preset of BUILT_IN_PRESETS) {
      expect(preset.builtIn).toBe(true);
    }
  });

  it("all preset names are unique", () => {
    const names = BUILT_IN_PRESETS.map((p) => p.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it.each(BUILT_IN_PRESETS.map((p) => [p.name, p.config]))(
    "preset '%s' has a valid ThemeConfig",
    (_name, config) => {
      const result = ThemeConfigSchema.safeParse(config);
      expect(result.success).toBe(true);
    },
  );

  it.each(BUILT_IN_PRESETS.map((p) => [p.name, p.config]))(
    "preset '%s' has dark-mode fields populated",
    (_name, config) => {
      const result = ThemeConfigSchema.safeParse(config);
      if (result.success) {
        expect(result.data.darkColors).toBeDefined();
        expect(result.data.darkNeutral).toBeDefined();
        expect(result.data.darkRadius).toBeDefined();
        expect(result.data.darkFont).toBeDefined();
      }
    },
  );

  it("all presets have a non-empty description", () => {
    for (const preset of BUILT_IN_PRESETS) {
      expect(preset.description).toBeTruthy();
      expect(typeof preset.description).toBe("string");
    }
  });

  it("Nuxt UI preset exists and passes schema validation", () => {
    const nuxtUi = BUILT_IN_PRESETS.find((p) => p.name === "Nuxt UI");
    expect(nuxtUi).toBeDefined();
    const result = ThemeConfigSchema.safeParse(nuxtUi!.config);
    expect(result.success).toBe(true);
  });

  it("Nuxt UI preset matches Nuxt UI's shipped color defaults", () => {
    const config = BUILT_IN_PRESETS.find((p) => p.name === "Nuxt UI")!.config;
    expect(config.colors).toMatchObject({
      secondary: "blue",
      info: "blue",
      warning: "yellow",
      error: "red",
    });
    expect(config.neutral).toBe("slate");
    expect(config.radius).toBe(0.25);
    // Nuxt UI itself uses the 500 shade in light mode and 400 in dark mode, so
    // the preset must not shift either (a dark "400" would render 300).
    expect(Object.values(config.colorShades)).toEqual(Array(6).fill("500"));
    expect(Object.values(config.darkColorShades)).toEqual(Array(6).fill("500"));
  });

  it("Nuxt UI preset uses the Nuxt brand green, not Tailwind's green", () => {
    const config = BUILT_IN_PRESETS.find((p) => p.name === "Nuxt UI")!.config;
    const nuxtGreen: Record<string, string> = {
      "50": "#effdf5",
      "100": "#d9fbe8",
      "200": "#b3f5d1",
      "300": "#75edae",
      "400": "#00dc82",
      "500": "#00c16a",
      "600": "#00a155",
      "700": "#007f45",
      "800": "#016538",
      "900": "#0a5331",
      "950": "#052e16",
    };
    const channels = (hex: string) =>
      [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

    for (const colors of [config.colors, config.darkColors]) {
      expect(colors.primary).toBe(colors.success);
      const shades = getPaletteShadeMap(colors.primary, config.customPalettes);
      expect(shades["400"]).toBe("#00dc82");
      for (const [shade, expected] of Object.entries(nuxtGreen)) {
        const actual = channels(shades[shade]!);
        channels(expected).forEach((value, i) =>
          expect(Math.abs(actual[i]! - value)).toBeLessThanOrEqual(8),
        );
      }
    }
  });

  it("Default preset exists and passes schema validation", () => {
    const defaultPreset = BUILT_IN_PRESETS.find((p) => p.name === "Default");
    expect(defaultPreset).toBeDefined();
    const result = ThemeConfigSchema.safeParse(defaultPreset!.config);
    expect(result.success).toBe(true);
  });
});
