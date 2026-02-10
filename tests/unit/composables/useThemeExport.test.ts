import { describe, it, expect, beforeEach } from "vitest";
import { useThemeExport } from "~/composables/useThemeExport";
import { useThemeStore } from "~/stores/theme";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";

describe("useThemeExport", () => {
  let store: ReturnType<typeof useThemeStore>;
  let exportComposable: ReturnType<typeof useThemeExport>;

  beforeEach(() => {
    store = useThemeStore();
    store.resetToDefaults();
    exportComposable = useThemeExport();
  });

  describe("appConfigExport", () => {
    it("generates valid app config output", () => {
      const output = exportComposable.appConfigExport.value;
      expect(output).toContain("defineAppConfig(");
      expect(output).toContain(`primary: '${DEFAULT_THEME.colors.primary}'`);
      expect(output).toContain(`neutral: '${DEFAULT_THEME.neutral}'`);
    });

    it("reflects store changes", () => {
      store.setSemanticColorForMode("light", "primary", "red");
      const output = exportComposable.appConfigExport.value;
      expect(output).toContain("primary: 'red'");
    });

    it("includes all semantic color keys", () => {
      const output = exportComposable.appConfigExport.value;
      expect(output).toContain("primary:");
      expect(output).toContain("secondary:");
      expect(output).toContain("success:");
      expect(output).toContain("info:");
      expect(output).toContain("warning:");
      expect(output).toContain("error:");
    });

    it("adds shade override comment when shade differs from 500", () => {
      store.setSemanticShadeForMode("light", "primary", "400");
      const output = exportComposable.appConfigExport.value;
      expect(output).toContain("shifted from default 500");
      expect(output).toContain("400");
    });

    it("adds dark palette comment when dark color differs from light", () => {
      store.setSemanticColorForMode("dark", "primary", "red");
      const output = exportComposable.appConfigExport.value;
      expect(output).toContain("Dark mode uses different palettes");
      expect(output).toContain("red");
    });

    it("contains ui.colors structure", () => {
      const output = exportComposable.appConfigExport.value;
      expect(output).toContain("ui: {");
      expect(output).toContain("colors: {");
    });
  });

  describe("cssExport", () => {
    it("includes tailwind and nuxt ui imports", () => {
      const output = exportComposable.cssExport.value;
      expect(output).toContain('@import "tailwindcss"');
      expect(output).toContain('@import "@nuxt/ui"');
    });

    it("includes font configuration", () => {
      const output = exportComposable.cssExport.value;
      expect(output).toContain(`--font-sans: '${DEFAULT_THEME.font}'`);
    });

    it("includes radius in :root", () => {
      const output = exportComposable.cssExport.value;
      expect(output).toContain(`--ui-radius: ${DEFAULT_THEME.radius}rem`);
    });

    it("reflects font changes", () => {
      store.setFontForMode("light", "DM Sans");
      const output = exportComposable.cssExport.value;
      expect(output).toContain("--font-sans: 'DM Sans'");
    });
  });

  describe("jsonExport", () => {
    it("outputs valid JSON", () => {
      const output = exportComposable.jsonExport.value;
      const parsed = JSON.parse(output);
      expect(parsed.colors.primary).toBe(DEFAULT_THEME.colors.primary);
      expect(parsed.radius).toBe(DEFAULT_THEME.radius);
    });

    it("reflects store changes", () => {
      store.setRadiusForMode("light", 1.5);
      const parsed = JSON.parse(exportComposable.jsonExport.value);
      expect(parsed.radius).toBe(1.5);
    });
  });

  describe("importJSON", () => {
    it("imports valid JSON successfully", () => {
      const custom = cloneTheme(DEFAULT_THEME);
      custom.colors.primary = "amber";
      const result = exportComposable.importJSON(JSON.stringify(custom));
      expect(result.success).toBe(true);
      expect(store.config.colors.primary).toBe("amber");
    });

    it("returns error for invalid JSON syntax", () => {
      const result = exportComposable.importJSON("not json at all");
      expect(result.success).toBe(false);
      expect(result.error).toContain("Failed to parse JSON");
    });

    it("returns error for valid JSON that fails schema validation", () => {
      const result = exportComposable.importJSON(
        JSON.stringify({ colors: { primary: "invalid-color" } }),
      );
      expect(result.success).toBe(false);
      expect(result.error).toContain("Invalid theme JSON");
    });

    it("does not modify store on import failure", () => {
      const originalPrimary = store.config.colors.primary;
      exportComposable.importJSON("bad json");
      expect(store.config.colors.primary).toBe(originalPrimary);
    });

    it("handles deeply nested invalid fields", () => {
      const payload = JSON.stringify({
        ...DEFAULT_THEME,
        lightOverrides: { text: { dimmed: "invalid-shade" } },
      });
      const result = exportComposable.importJSON(payload);
      expect(result.success).toBe(false);
    });

    it("imports config with optional dark fields omitted", () => {
      const {
        darkColors,
        darkColorShades,
        darkNeutral,
        darkRadius,
        darkFont,
        ...rest
      } = cloneTheme(DEFAULT_THEME);
      const result = exportComposable.importJSON(JSON.stringify(rest));
      expect(result.success).toBe(true);
      // Dark fields should be filled from light values after schema transform
      expect(store.config.darkColors.primary).toBe(rest.colors.primary);
    });
  });

  describe("jsonExport round-trip", () => {
    it("exported JSON can be re-imported", () => {
      store.setSemanticColorForMode("light", "primary", "pink");
      store.setRadiusForMode("light", 0.75);
      const json = exportComposable.jsonExport.value;
      store.resetToDefaults();

      const result = exportComposable.importJSON(json);
      expect(result.success).toBe(true);
      expect(store.config.colors.primary).toBe("pink");
      expect(store.config.radius).toBe(0.75);
    });

    it("includes dark mode fields in JSON export", () => {
      store.setSemanticColorForMode("dark", "primary", "rose");
      store.setNeutralForMode("dark", "zinc");
      const parsed = JSON.parse(exportComposable.jsonExport.value);
      expect(parsed.darkColors.primary).toBe("rose");
      expect(parsed.darkNeutral).toBe("zinc");
    });
  });
});
