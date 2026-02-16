import { describe, it, expect } from "vitest";
import {
  AI_FALLBACK_LIGHT_OVERRIDES,
  AI_FALLBACK_DARK_OVERRIDES,
  type TokenOverridesShape,
} from "~~/shared/constants/aiDefaults";
import { SHADE_VALUES } from "~~/shared/constants/theme";

const shadeSet = new Set<string>(SHADE_VALUES);

function validateOverrides(overrides: TokenOverridesShape, label: string) {
  describe(label, () => {
    it("has text, bg, and border keys", () => {
      expect(overrides).toHaveProperty("text");
      expect(overrides).toHaveProperty("bg");
      expect(overrides).toHaveProperty("border");
    });

    it("text has all required sub-keys", () => {
      const expected = ["dimmed", "muted", "toned", "default", "highlighted", "inverted"];
      for (const key of expected) {
        expect(overrides.text).toHaveProperty(key);
      }
    });

    it("bg has all required sub-keys", () => {
      const expected = ["default", "muted", "elevated", "accented", "inverted"];
      for (const key of expected) {
        expect(overrides.bg).toHaveProperty(key);
      }
    });

    it("border has all required sub-keys", () => {
      const expected = ["default", "muted", "accented", "inverted"];
      for (const key of expected) {
        expect(overrides.border).toHaveProperty(key);
      }
    });

    it("all values are valid shade strings", () => {
      for (const [, subObj] of Object.entries(overrides)) {
        for (const [, value] of Object.entries(subObj as Record<string, string>)) {
          expect(shadeSet.has(value), `"${value}" should be a valid shade`).toBe(true);
        }
      }
    });
  });
}

describe("shared/constants/aiDefaults", () => {
  validateOverrides(AI_FALLBACK_LIGHT_OVERRIDES, "AI_FALLBACK_LIGHT_OVERRIDES");
  validateOverrides(AI_FALLBACK_DARK_OVERRIDES, "AI_FALLBACK_DARK_OVERRIDES");

  it("light and dark have identical key structure", () => {
    const lightKeys = Object.keys(AI_FALLBACK_LIGHT_OVERRIDES).sort();
    const darkKeys = Object.keys(AI_FALLBACK_DARK_OVERRIDES).sort();
    expect(lightKeys).toEqual(darkKeys);

    for (const key of lightKeys) {
      const lightSubKeys = Object.keys(
        AI_FALLBACK_LIGHT_OVERRIDES[key as keyof TokenOverridesShape],
      ).sort();
      const darkSubKeys = Object.keys(
        AI_FALLBACK_DARK_OVERRIDES[key as keyof TokenOverridesShape],
      ).sort();
      expect(lightSubKeys).toEqual(darkSubKeys);
    }
  });
});
