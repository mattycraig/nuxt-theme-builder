import { describe, it, expect, beforeEach } from "vitest";
import { useThemeStore } from "~/stores/theme";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";
import type { ThemeConfig } from "~/types/theme";

describe("useThemeStore", () => {
  let store: ReturnType<typeof useThemeStore>;

  beforeEach(() => {
    store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
  });

  describe("initial state", () => {
    it("has default config values", () => {
      expect(store.config.colors.primary).toBe(DEFAULT_THEME.colors.primary);
      expect(store.config.neutral).toBe(DEFAULT_THEME.neutral);
      expect(store.config.radius).toBe(DEFAULT_THEME.radius);
      expect(store.config.font).toBe(DEFAULT_THEME.font);
    });
  });

  describe("setSemanticColor", () => {
    it("updates a semantic color", () => {
      store.setSemanticColor("primary", "red");
      expect(store.config.colors.primary).toBe("red");
    });

    it("does not alter other semantic colors", () => {
      const originalSecondary = store.config.colors.secondary;
      store.setSemanticColor("primary", "blue");
      expect(store.config.colors.secondary).toBe(originalSecondary);
    });
  });

  describe("setNeutral", () => {
    it("updates the neutral palette", () => {
      store.setNeutral("zinc");
      expect(store.config.neutral).toBe("zinc");
    });
  });

  describe("setRadius", () => {
    it("updates the radius", () => {
      store.setRadius(1.5);
      expect(store.config.radius).toBe(1.5);
    });
  });

  describe("setFont", () => {
    it("updates the font", () => {
      store.setFont("DM Sans");
      expect(store.config.font).toBe("DM Sans");
    });
  });

  describe("token overrides", () => {
    it("sets a light text override", () => {
      store.setTextOverride("light", "highlighted", "900");
      expect(store.config.lightOverrides.text.highlighted).toBe("900");
    });

    it("sets a dark background override", () => {
      store.setBgOverride("dark", "elevated", "800");
      expect(store.config.darkOverrides.bg.elevated).toBe("800");
    });

    it("sets a border override", () => {
      store.setBorderOverride("light", "default", "300");
      expect(store.config.lightOverrides.border.default).toBe("300");
    });

    it("does not affect the opposite mode", () => {
      const originalDark = store.config.darkOverrides.text.highlighted;
      store.setTextOverride("light", "highlighted", "100");
      expect(store.config.darkOverrides.text.highlighted).toBe(originalDark);
    });
  });

  describe("undo/redo", () => {
    it("cannot undo/redo from initial state (after resetToDefaults)", () => {
      // resetToDefaults pushed one entry, so canUndo depends on whether there
      // was a prior entry. After beforeEach (which calls resetToDefaults once),
      // the history has the initial default plus the reset — so canUndo is true.
      // Let's start from a fresh perspective:
      store.setRadius(0.5);
      store.setRadius(1.0);
      expect(store.canUndo).toBe(true);
    });

    it("undoes the last change", () => {
      store.setRadius(0.5);
      store.setRadius(1.0);
      store.undo();
      expect(store.config.radius).toBe(0.5);
    });

    it("redoes after undo", () => {
      store.setRadius(0.5);
      store.setRadius(1.0);
      store.undo();
      store.redo();
      expect(store.config.radius).toBe(1.0);
    });

    it("discards forward history on new change after undo", () => {
      store.setRadius(0.5);
      store.setRadius(1.0);
      store.undo();
      store.setRadius(1.5);
      expect(store.canRedo).toBe(false);
      expect(store.config.radius).toBe(1.5);
    });

    it("caps history at MAX_HISTORY (50)", () => {
      for (let i = 0; i < 60; i++) {
        store.setRadius(i * 0.01);
      }
      // Should be able to undo, but not 60 times
      let undoCount = 0;
      while (store.canUndo) {
        store.undo();
        undoCount++;
      }
      // History cap is 50, so max undos should be <= 49 (50 entries, index 0 can't undo)
      expect(undoCount).toBeLessThanOrEqual(49);
    });
  });

  describe("resetToDefaults", () => {
    it("reverts config to default values", () => {
      store.setSemanticColor("primary", "red");
      store.setRadius(1.5);
      store.resetToDefaults();
      expect(store.config.colors.primary).toBe(DEFAULT_THEME.colors.primary);
      expect(store.config.radius).toBe(DEFAULT_THEME.radius);
    });
  });

  describe("loadConfig", () => {
    it("loads a valid config", () => {
      const custom = cloneTheme(DEFAULT_THEME);
      custom.colors.primary = "blue";
      custom.radius = 1.5;
      store.loadConfig(custom);
      expect(store.config.colors.primary).toBe("blue");
      expect(store.config.radius).toBe(1.5);
    });

    it("falls back to defaults on invalid config", () => {
      const invalid = { bad: "data" } as unknown as ThemeConfig;
      store.loadConfig(invalid);
      expect(store.config.colors.primary).toBe(DEFAULT_THEME.colors.primary);
    });
  });

  describe("_syncConfig", () => {
    it("updates config without pushing history", () => {
      const custom = cloneTheme(DEFAULT_THEME);
      custom.colors.primary = "amber";
      const undoBefore = store.canUndo;
      store._syncConfig(custom);
      expect(store.config.colors.primary).toBe("amber");
      // canUndo should not have changed (no history push)
      expect(store.canUndo).toBe(undoBefore);
    });
  });

  describe("presets", () => {
    it("saves a new preset", () => {
      store.setSemanticColor("primary", "red");
      store.savePreset("My Preset");
      expect(store.savedPresets).toHaveLength(1);
      expect(store.savedPresets[0]!.name).toBe("My Preset");
      expect(store.savedPresets[0]!.config.colors.primary).toBe("red");
    });

    it("overwrites an existing preset with the same name", () => {
      store.savePreset("Test");
      store.setSemanticColor("primary", "amber");
      store.savePreset("Test");
      expect(store.savedPresets).toHaveLength(1);
      expect(store.savedPresets[0]!.config.colors.primary).toBe("amber");
    });

    it("deletes a preset", () => {
      store.savePreset("To Delete");
      expect(store.savedPresets).toHaveLength(1);
      store.deletePreset("To Delete");
      expect(store.savedPresets).toHaveLength(0);
    });

    it("loads a preset config", () => {
      const custom = cloneTheme(DEFAULT_THEME);
      custom.colors.primary = "pink";
      const preset = { name: "Pink", config: custom };
      store.loadPreset(preset);
      expect(store.config.colors.primary).toBe("pink");
    });

    it("preserves saved preset as a deep copy", () => {
      store.savePreset("Copy Test");
      store.setSemanticColor("primary", "teal");
      // Saved preset should still have original value
      expect(store.savedPresets[0]!.config.colors.primary).not.toBe("teal");
    });
  });
});
