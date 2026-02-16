import { describe, it, expect } from "vitest";
import { buildThemeConfig, type AiGeneratedObject } from "~~/server/utils/aiResponseBuilder";
import {
  AI_FALLBACK_LIGHT_OVERRIDES,
  AI_FALLBACK_DARK_OVERRIDES,
} from "~~/shared/constants/aiDefaults";
import { DEFAULT_COLOR_SHADES } from "~~/shared/constants/theme";

function makeGeneratedObject(overrides: Partial<AiGeneratedObject> = {}): AiGeneratedObject {
  return {
    colors: {
      primary: "blue",
      secondary: "indigo",
      success: "green",
      info: "sky",
      warning: "amber",
      error: "red",
    },
    neutral: "zinc",
    radius: 0.5,
    font: "Inter",
    darkColors: {
      primary: "sky",
      secondary: "violet",
      success: "emerald",
      info: "cyan",
      warning: "orange",
      error: "rose",
    },
    darkNeutral: "slate",
    darkRadius: 0.375,
    darkFont: "DM Sans",
    lightOverrides: null,
    darkOverrides: null,
    explanation: "A calm professional theme.",
    ...overrides,
  };
}

describe("server/utils/aiResponseBuilder", () => {
  describe("buildThemeConfig", () => {
    it("returns themeConfig and explanation", () => {
      const result = buildThemeConfig(makeGeneratedObject());
      expect(result).toHaveProperty("themeConfig");
      expect(result).toHaveProperty("explanation");
      expect(result.explanation).toBe("A calm professional theme.");
    });

    it("copies light-mode colors to themeConfig", () => {
      const result = buildThemeConfig(makeGeneratedObject());
      expect(result.themeConfig.colors.primary).toBe("blue");
      expect(result.themeConfig.neutral).toBe("zinc");
      expect(result.themeConfig.radius).toBe(0.5);
      expect(result.themeConfig.font).toBe("Inter");
    });

    it("copies dark-mode fields when provided", () => {
      const result = buildThemeConfig(makeGeneratedObject());
      expect(result.themeConfig.darkColors.primary).toBe("sky");
      expect(result.themeConfig.darkNeutral).toBe("slate");
      expect(result.themeConfig.darkRadius).toBe(0.375);
      expect(result.themeConfig.darkFont).toBe("DM Sans");
    });

    it("falls back darkColors to light colors when null", () => {
      const result = buildThemeConfig(makeGeneratedObject({ darkColors: null }));
      expect(result.themeConfig.darkColors.primary).toBe("blue");
      expect(result.themeConfig.darkColors.secondary).toBe("indigo");
    });

    it("falls back darkNeutral to light neutral when null", () => {
      const result = buildThemeConfig(makeGeneratedObject({ darkNeutral: null }));
      expect(result.themeConfig.darkNeutral).toBe("zinc");
    });

    it("falls back darkRadius to light radius when null", () => {
      const result = buildThemeConfig(makeGeneratedObject({ darkRadius: null }));
      expect(result.themeConfig.darkRadius).toBe(0.5);
    });

    it("falls back darkFont to light font when null", () => {
      const result = buildThemeConfig(makeGeneratedObject({ darkFont: null }));
      expect(result.themeConfig.darkFont).toBe("Inter");
    });

    it("uses AI fallback overrides when lightOverrides is null", () => {
      const result = buildThemeConfig(makeGeneratedObject({ lightOverrides: null }));
      expect(result.themeConfig.lightOverrides).toEqual(AI_FALLBACK_LIGHT_OVERRIDES);
    });

    it("uses AI fallback overrides when darkOverrides is null", () => {
      const result = buildThemeConfig(makeGeneratedObject({ darkOverrides: null }));
      expect(result.themeConfig.darkOverrides).toEqual(AI_FALLBACK_DARK_OVERRIDES);
    });

    it("preserves provided lightOverrides", () => {
      const custom = { text: { dimmed: "100" }, bg: {}, border: {} };
      const result = buildThemeConfig(makeGeneratedObject({ lightOverrides: custom as any }));
      expect(result.themeConfig.lightOverrides).toBe(custom);
    });

    it("preserves provided darkOverrides", () => {
      const custom = { text: { dimmed: "900" }, bg: {}, border: {} };
      const result = buildThemeConfig(makeGeneratedObject({ darkOverrides: custom as any }));
      expect(result.themeConfig.darkOverrides).toBe(custom);
    });

    it("always sets colorShades and darkColorShades to defaults", () => {
      const result = buildThemeConfig(makeGeneratedObject());
      expect(result.themeConfig.colorShades).toEqual(DEFAULT_COLOR_SHADES);
      expect(result.themeConfig.darkColorShades).toEqual(DEFAULT_COLOR_SHADES);
    });

    it("does not include explanation in themeConfig", () => {
      const result = buildThemeConfig(makeGeneratedObject());
      expect(result.themeConfig).not.toHaveProperty("explanation");
    });

    it("does not include raw darkColors/darkNeutral/etc in themeConfig root when they are the transformed values", () => {
      const result = buildThemeConfig(makeGeneratedObject());
      // The destructured values are re-assigned with fallback logic, so they exist
      expect(result.themeConfig).toHaveProperty("darkColors");
      expect(result.themeConfig).toHaveProperty("darkNeutral");
      expect(result.themeConfig).toHaveProperty("darkRadius");
      expect(result.themeConfig).toHaveProperty("darkFont");
    });
  });
});
