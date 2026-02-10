import { describe, it, expect } from "vitest";
import { BUILT_IN_PRESETS } from "~/utils/presets";
import { ThemeConfigSchema } from "~/types/theme";

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

  it("Nuxt UI preset matches official defaults", () => {
    const nuxtUi = BUILT_IN_PRESETS.find((p) => p.name === "Nuxt UI");
    expect(nuxtUi).toBeDefined();
    expect(nuxtUi!.config.colors.primary).toBe("green");
    expect(nuxtUi!.config.colors.secondary).toBe("blue");
    expect(nuxtUi!.config.neutral).toBe("slate");
  });

  it("Default preset is in the list", () => {
    const defaultPreset = BUILT_IN_PRESETS.find((p) => p.name === "Default");
    expect(defaultPreset).toBeDefined();
  });
});
