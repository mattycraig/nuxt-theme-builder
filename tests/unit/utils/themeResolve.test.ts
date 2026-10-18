import { describe, it, expect } from "vitest";
import { NUMERIC_SHADE_KEYS } from "~/types/theme";
import { CHROMATIC_HEX_MAP, NEUTRAL_HEX_MAP } from "~/utils/colorPalettes";
import { generatePalette } from "~/utils/paletteGenerator";
import {
  resolveNeutralScale,
  resolveNeutralShade,
  resolveRoleColor,
  resolveRoleScale,
  resolveTokens,
  shiftScale,
  toHex,
} from "~/utils/themeResolve";
import { createThemeConfig } from "../../setup/fixtures";

const blue = CHROMATIC_HEX_MAP.blue!;

describe("themeResolve", () => {
  it("converts palette values to hex", () => {
    expect(toHex("#ABCDEF")).toBe("#abcdef");
    expect(toHex("oklch(1 0 0)")).toBe("#ffffff");
    expect(toHex(undefined)).toBe("#71717a");
  });

  describe("shiftScale", () => {
    it("leaves the scale alone at 500", () => {
      const scale = shiftScale(blue, "500");
      for (const shade of NUMERIC_SHADE_KEYS) {
        expect(scale[shade]).toBe(toHex(blue[shade]));
      }
    });

    it("moves the picked shade onto 500 and clamps at the ends", () => {
      const scale = shiftScale(blue, "700");
      expect(scale["500"]).toBe(toHex(blue["700"]));
      expect(scale["400"]).toBe(toHex(blue["600"]));
      expect(scale["800"]).toBe(toHex(blue["950"]));
      expect(scale["950"]).toBe(toHex(blue["950"]));
    });

    it("flattens the scale for white and black", () => {
      expect(new Set(Object.values(shiftScale(blue, "white")))).toEqual(
        new Set(["#ffffff"]),
      );
      expect(new Set(Object.values(shiftScale(blue, "black")))).toEqual(
        new Set(["#000000"]),
      );
    });
  });

  describe("role colors", () => {
    it("uses step 500 in light mode and 400 in dark mode, like Nuxt UI", () => {
      const config = createThemeConfig();
      config.colors.primary = "blue";
      config.colorShades.primary = "600";
      config.darkColors.primary = "blue";
      config.darkColorShades.primary = "500";

      expect(resolveRoleColor(config, "light", "primary")).toBe(
        toHex(blue["600"]),
      );
      expect(resolveRoleColor(config, "dark", "primary")).toBe(
        toHex(blue["400"]),
      );
    });

    it("reads each mode's own palette", () => {
      const config = createThemeConfig();
      config.colors.error = "blue";
      config.darkColors.error = "red";
      config.colorShades.error = "500";
      config.darkColorShades.error = "500";

      expect(resolveRoleScale(config, "light", "error")["500"]).toBe(
        toHex(blue["500"]),
      );
      expect(resolveRoleScale(config, "dark", "error")["500"]).toBe(
        toHex(CHROMATIC_HEX_MAP.red!["500"]),
      );
    });

    it("resolves custom palettes", () => {
      const config = createThemeConfig({
        customPalettes: [{ name: "brand", color: "#f5c518" }],
      });
      const palette = generatePalette("#f5c518")!;
      config.colors.primary = "brand";
      config.colorShades.primary = palette.anchor;

      expect(resolveRoleColor(config, "light", "primary")).toBe("#f5c518");
    });
  });

  describe("neutral tokens", () => {
    it("resolves the neutral scale for each mode", () => {
      const config = createThemeConfig({ neutral: "slate", darkNeutral: "stone" });
      expect(resolveNeutralScale(config, "light")["500"]).toBe(
        toHex(NEUTRAL_HEX_MAP.slate!["500"]),
      );
      expect(resolveNeutralScale(config, "dark")["500"]).toBe(
        toHex(NEUTRAL_HEX_MAP.stone!["500"]),
      );
    });

    it("maps white and black literally", () => {
      const config = createThemeConfig();
      expect(resolveNeutralShade(config, "light", "white")).toBe("#ffffff");
      expect(resolveNeutralShade(config, "dark", "black")).toBe("#000000");
    });

    it("resolves text, background and border tokens from overrides", () => {
      const config = createThemeConfig({ neutral: "zinc" });
      config.lightOverrides.text.muted = "600";
      const tokens = resolveTokens(config, "light");

      expect(tokens.text.muted).toBe(toHex(NEUTRAL_HEX_MAP.zinc!["600"]));
      expect(tokens.bg.default).toBe("#ffffff");
      expect(tokens.border.default).toBe(toHex(NEUTRAL_HEX_MAP.zinc!["200"]));
    });
  });
});
