import { describe, it, expect } from "vitest";
import { createThemeConfig } from "../../setup/fixtures";
import {
  getModeSurface,
  getModeSwatches,
  resolveModeColors,
} from "~/utils/themeSwatches";
import {
  ALL_HEX_MAP,
  CHROMATIC_HEX_MAP,
  NEUTRAL_HEX_MAP,
} from "~/utils/colorPalettes";
import { generatePalette } from "~/utils/paletteGenerator";

describe("getModeSwatches", () => {
  it("returns the six semantic roles plus neutral", () => {
    const swatches = getModeSwatches(createThemeConfig(), "light");
    expect(swatches.map((s) => s.key)).toEqual([
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "error",
      "neutral",
    ]);
  });

  it("uses each mode's own palette and shade", () => {
    const config = createThemeConfig();
    config.colors.primary = "indigo";
    config.colorShades.primary = "600";
    config.darkColors.primary = "violet";
    config.darkColorShades.primary = "400";

    const light = getModeSwatches(config, "light")[0]!;
    const dark = getModeSwatches(config, "dark")[0]!;

    expect(light).toMatchObject({ palette: "indigo", shade: "600" });
    expect(light.color).toBe(ALL_HEX_MAP.indigo!["600"]);
    expect(dark).toMatchObject({ palette: "violet", shade: "400" });
    expect(dark.color).toBe(ALL_HEX_MAP.violet!["400"]);
  });

  it("uses the dark neutral for the dark row", () => {
    const config = createThemeConfig({ neutral: "zinc", darkNeutral: "slate" });
    expect(getModeSwatches(config, "light").at(-1)!.color).toBe(
      NEUTRAL_HEX_MAP.zinc!["500"],
    );
    expect(getModeSwatches(config, "dark").at(-1)!.color).toBe(
      NEUTRAL_HEX_MAP.slate!["500"],
    );
  });

  it("resolves white and black shades", () => {
    const config = createThemeConfig();
    config.colorShades.primary = "white";
    config.darkColorShades.primary = "black";
    expect(getModeSwatches(config, "light")[0]!.color).toBe("#ffffff");
    expect(getModeSwatches(config, "dark")[0]!.color).toBe("#000000");
  });

  it("resolves custom palettes", () => {
    const config = createThemeConfig({
      customPalettes: [{ name: "brand", color: "#f5c518" }],
    });
    config.colors.primary = "brand";
    config.colorShades.primary = "500";
    expect(getModeSwatches(config, "light")[0]!.color).toBe(
      generatePalette("#f5c518")!.shades["500"],
    );
  });
});

describe("getModeSurface", () => {
  it("uses each mode's background token and neutral", () => {
    const config = createThemeConfig({ neutral: "zinc", darkNeutral: "slate" });
    config.lightOverrides.bg.default = "white";
    config.darkOverrides.bg.default = "900";
    expect(getModeSurface(config, "light")).toBe("#ffffff");
    expect(getModeSurface(config, "dark")).toBe(NEUTRAL_HEX_MAP.slate!["900"]);
  });

  it("follows a changed dark background token", () => {
    const config = createThemeConfig();
    config.darkOverrides.bg.default = "black";
    expect(getModeSurface(config, "dark")).toBe("#000000");
  });
});

describe("resolveModeColors", () => {
  const config = createThemeConfig({
    colors: {
      primary: "orange",
      secondary: "rose",
      success: "emerald",
      info: "sky",
      warning: "yellow",
      error: "red",
    },
    darkColors: {
      primary: "violet",
      secondary: "fuchsia",
      success: "teal",
      info: "cyan",
      warning: "amber",
      error: "pink",
    },
    neutral: "zinc",
    darkNeutral: "slate",
    radius: 0.25,
    darkRadius: 0.5,
  });

  it("uses the light palettes, shades, and neutral in light mode", () => {
    const light = resolveModeColors(config, "light");
    const primary = light.semantic[0]!;
    expect(primary).toMatchObject({ key: "primary", palette: "orange" });
    expect(primary.color).toBe(
      CHROMATIC_HEX_MAP.orange![config.colorShades.primary],
    );
    expect(light.neutral).toBe("zinc");
    expect(light.bg).toBe(
      NEUTRAL_HEX_MAP.zinc![config.lightOverrides.bg.default],
    );
    expect(light.radius).toBe(0.25);
  });

  it("uses the dark palettes, shades, and neutral in dark mode", () => {
    const dark = resolveModeColors(config, "dark");
    expect(dark.semantic.map((s) => s.palette)).toEqual([
      "violet",
      "fuchsia",
      "teal",
      "cyan",
      "amber",
      "pink",
    ]);
    expect(dark.semantic[0]!.color).toBe(
      CHROMATIC_HEX_MAP.violet![config.darkColorShades.primary],
    );
    expect(dark.bg).toBe(
      NEUTRAL_HEX_MAP.slate![config.darkOverrides.bg.default],
    );
    expect(dark.radius).toBe(0.5);
  });

  it("resolves custom palettes from their base color", () => {
    const custom = createThemeConfig({
      customPalettes: [{ name: "brand", color: "#ff5a1f" }],
      colors: { ...config.colors, primary: "brand" },
    });
    const primary = resolveModeColors(custom, "light").semantic[0]!;
    expect(primary.palette).toBe("brand");
    expect(primary.color).not.toBe("transparent");
  });
});
