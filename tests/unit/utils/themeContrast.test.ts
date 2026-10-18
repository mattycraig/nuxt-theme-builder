import { describe, it, expect } from "vitest";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";
import {
  WCAG_AA,
  getThemeContrastChecks,
  rateContrast,
} from "~/utils/themeContrast";
import type { ContrastFix } from "~/utils/themeContrast";
import type { ThemeConfig } from "~/types/theme";

function applyFix(config: ThemeConfig, mode: "light" | "dark", fix: ContrastFix) {
  const next = cloneTheme(config);
  if (fix.kind === "role") {
    next[mode === "dark" ? "darkColorShades" : "colorShades"][fix.role] =
      fix.shade;
  } else {
    next[mode === "dark" ? "darkOverrides" : "lightOverrides"].text[fix.token] =
      fix.shade;
  }
  return next;
}

describe("themeContrast", () => {
  it("rates ratios against the WCAG thresholds", () => {
    expect(rateContrast(7)).toBe("AAA");
    expect(rateContrast(4.5)).toBe("AA");
    expect(rateContrast(3)).toBe("AA Large");
    expect(rateContrast(2.99)).toBe("Fail");
  });

  it("checks text pairs plus a label and text pair for each role", () => {
    const checks = getThemeContrastChecks(DEFAULT_THEME, "light");
    expect(checks).toHaveLength(4 + 6 * 2);
    expect(checks.map((c) => c.id)).toContain("primary-solid");
    expect(checks.map((c) => c.id)).toContain("text-muted-on-bg-elevated");
  });

  it("measures the colors Nuxt UI renders", () => {
    const checks = getThemeContrastChecks(DEFAULT_THEME, "light");
    const body = checks.find((c) => c.id === "text-default-on-bg-default")!;
    expect(body.background).toBe("#ffffff");
    expect(body.ratio).toBeGreaterThan(10);
    expect(body.rating).toBe("AAA");
    expect(body.fix).toBeUndefined();
  });

  it("flags low-contrast roles and suggests a passing shade", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.colors.warning = "amber";
    config.colorShades.warning = "500";

    const warning = getThemeContrastChecks(config, "light").find(
      (c) => c.id === "warning-solid",
    )!;

    expect(warning.passes).toBe(false);
    expect(warning.fix).toMatchObject({ kind: "role", role: "warning" });

    const fixed = applyFix(config, "light", warning.fix!);
    const after = getThemeContrastChecks(fixed, "light").filter((c) =>
      c.id.startsWith("warning-"),
    );
    expect(after.every((c) => c.passes)).toBe(true);
  });

  it("picks the nearest passing shade", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.colors.secondary = "sky";
    config.colorShades.secondary = "600";

    const secondary = getThemeContrastChecks(config, "light").find(
      (c) => c.id === "secondary-text",
    )!;

    expect(secondary.fix).toEqual({ kind: "role", role: "secondary", shade: "700" });
  });

  it("fixes text tokens on every surface they are checked on", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.lightOverrides.text.muted = "400";

    const muted = getThemeContrastChecks(config, "light").filter((c) =>
      c.id.startsWith("text-muted"),
    );
    expect(muted.every((c) => !c.passes)).toBe(true);
    const fix = muted[0]!.fix!;
    expect(fix).toMatchObject({ kind: "text", token: "muted" });

    const after = getThemeContrastChecks(applyFix(config, "light", fix), "light");
    expect(
      after.filter((c) => c.id.startsWith("text-muted")).every((c) => c.passes),
    ).toBe(true);
  });

  it("checks dark mode against the dark surfaces", () => {
    const checks = getThemeContrastChecks(DEFAULT_THEME, "dark");
    const label = checks.find((c) => c.id === "primary-solid")!;
    // Solid labels use text-inverted, which is dark in dark mode
    expect(label.foreground).not.toBe("#ffffff");
    expect(checks.every((c) => c.ratio >= 1)).toBe(true);
  });

  it("leaves the fix out when no shade can pass", () => {
    const config = cloneTheme(DEFAULT_THEME);
    // Mid-gray labels on a white page: labels need a light role color and
    // text on the page needs a dark one, so no shade passes both
    config.lightOverrides.text.inverted = "500";

    const primary = getThemeContrastChecks(config, "light").filter((c) =>
      c.id.startsWith("primary-"),
    );
    expect(primary.some((c) => c.ratio < WCAG_AA)).toBe(true);
    expect(primary.every((c) => c.passes || c.fix === undefined)).toBe(true);
  });
});
