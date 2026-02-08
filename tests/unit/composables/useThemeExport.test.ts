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
      store.setSemanticColor("primary", "red");
      const output = exportComposable.appConfigExport.value;
      expect(output).toContain("primary: 'red'");
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
      store.setFont("DM Sans");
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
      store.setRadius(1.5);
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
  });
});
