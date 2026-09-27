import { describe, it, expect } from "vitest";
import { resolveModeSwatches } from "~/utils/themeSwatches";
import { CHROMATIC_HEX_MAP, NEUTRAL_HEX_MAP } from "~/utils/colorPalettes";
import { createThemeConfig } from "../../setup/fixtures";

describe("resolveModeSwatches", () => {
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
    const light = resolveModeSwatches(config, "light");
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
    const dark = resolveModeSwatches(config, "dark");
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
    const primary = resolveModeSwatches(custom, "light").semantic[0]!;
    expect(primary.palette).toBe("brand");
    expect(primary.color).not.toBe("transparent");
  });
});
