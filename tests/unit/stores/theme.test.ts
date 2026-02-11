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

  describe("setSemanticColorForMode", () => {
    it("updates a semantic color", () => {
      store.setSemanticColorForMode("light", "primary", "red");
      expect(store.config.colors.primary).toBe("red");
    });

    it("does not alter other semantic colors", () => {
      const originalSecondary = store.config.colors.secondary;
      store.setSemanticColorForMode("light", "primary", "blue");
      expect(store.config.colors.secondary).toBe(originalSecondary);
    });

    it("updates dark colors independently", () => {
      store.setSemanticColorForMode("dark", "primary", "rose");
      expect(store.config.darkColors.primary).toBe("rose");
      expect(store.config.colors.primary).toBe(DEFAULT_THEME.colors.primary);
    });
  });

  describe("setNeutralForMode", () => {
    it("updates the neutral palette", () => {
      store.setNeutralForMode("light", "zinc");
      expect(store.config.neutral).toBe("zinc");
    });

    it("updates dark neutral independently", () => {
      store.setNeutralForMode("dark", "stone");
      expect(store.config.darkNeutral).toBe("stone");
    });
  });

  describe("setRadiusForMode", () => {
    it("updates the radius", () => {
      store.setRadiusForMode("light", 1.5);
      expect(store.config.radius).toBe(1.5);
    });

    it("updates dark radius independently", () => {
      store.setRadiusForMode("dark", 0.75);
      expect(store.config.darkRadius).toBe(0.75);
    });
  });

  describe("setFontForMode", () => {
    it("updates the font", () => {
      store.setFontForMode("light", "DM Sans");
      expect(store.config.font).toBe("DM Sans");
    });

    it("updates dark font independently", () => {
      store.setFontForMode("dark", "Geist");
      expect(store.config.darkFont).toBe("Geist");
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
    it("canUndo is true after making changes", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      expect(store.canUndo).toBe(true);
    });

    it("undoes the last change", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      store.undo();
      expect(store.config.radius).toBe(0.5);
    });

    it("redoes after undo", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      store.undo();
      store.redo();
      expect(store.config.radius).toBe(1.0);
    });

    it("discards forward history on new change after undo", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      store.undo();
      store.setRadiusForMode("light", 1.5);
      expect(store.canRedo).toBe(false);
      expect(store.config.radius).toBe(1.5);
    });

    it("caps history at MAX_HISTORY (50)", () => {
      for (let i = 0; i < 60; i++) {
        store.setRadiusForMode("light", i * 0.01);
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
      store.setSemanticColorForMode("light", "primary", "red");
      store.setRadiusForMode("light", 1.5);
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
      store.setSemanticColorForMode("light", "primary", "red");
      store.savePreset("My Preset");
      expect(store.savedPresets).toHaveLength(1);
      expect(store.savedPresets[0]!.name).toBe("My Preset");
      expect(store.savedPresets[0]!.config.colors.primary).toBe("red");
    });

    it("overwrites an existing preset with the same name", () => {
      store.savePreset("Test");
      store.setSemanticColorForMode("light", "primary", "amber");
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
      store.setSemanticColorForMode("light", "primary", "teal");
      // Saved preset should still have original value
      expect(store.savedPresets[0]!.config.colors.primary).not.toBe("teal");
    });
  });

  describe("duplicatePreset", () => {
    it("duplicates an existing preset with 'Copy of' prefix", () => {
      store.savePreset("Original");
      const { newName } = store.duplicatePreset("Original");
      expect(newName).toBe("Copy of Original");
      expect(store.savedPresets).toHaveLength(2);
    });

    it("appends counter when duplicate name already exists", () => {
      store.savePreset("Original");
      store.duplicatePreset("Original"); // "Copy of Original"
      const { newName } = store.duplicatePreset("Original");
      expect(newName).toBe("Copy of Original (2)");
      expect(store.savedPresets).toHaveLength(3);
    });

    it("throws when source preset does not exist", () => {
      expect(() => store.duplicatePreset("NonExistent")).toThrow(
        'Preset "NonExistent" not found',
      );
    });

    it("creates a deep copy of the source config", () => {
      store.setSemanticColorForMode("light", "primary", "red");
      store.savePreset("Source");
      store.duplicatePreset("Source");
      store.setSemanticColorForMode("light", "primary", "blue");
      store.savePreset("Source"); // overwrite
      const copy = store.savedPresets.find(
        (p) => p.name === "Copy of Source",
      );
      expect(copy!.config.colors.primary).toBe("red");
    });
  });

  describe("renamePreset", () => {
    it("renames an existing preset", () => {
      store.savePreset("Old Name");
      const result = store.renamePreset("Old Name", "New Name");
      expect(result.success).toBe(true);
      expect(store.savedPresets[0]!.name).toBe("New Name");
    });

    it("updates activePresetName when renaming the active preset", () => {
      store.savePreset("Active");
      expect(store.activePresetName).toBe("Active");
      store.renamePreset("Active", "Renamed");
      expect(store.activePresetName).toBe("Renamed");
    });

    it("fails with empty name", () => {
      store.savePreset("Test");
      const result = store.renamePreset("Test", "   ");
      expect(result.success).toBe(false);
      expect(result.error).toContain("empty");
    });

    it("fails when new name conflicts with existing preset", () => {
      store.savePreset("First");
      store.setSemanticColorForMode("light", "primary", "red");
      store.savePreset("Second");
      const result = store.renamePreset("First", "Second");
      expect(result.success).toBe(false);
      expect(result.error).toContain("already exists");
    });

    it("fails when source preset is not found", () => {
      const result = store.renamePreset("Ghost", "New Name");
      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");
    });

    it("trims whitespace from new names", () => {
      store.savePreset("Trimme");
      store.renamePreset("Trimme", "  Trimmed  ");
      expect(store.savedPresets[0]!.name).toBe("Trimmed");
    });
  });

  describe("hasUnsavedChanges", () => {
    it("returns false when no active preset", () => {
      expect(store.hasUnsavedChanges).toBe(false);
    });

    it("returns false right after saving a preset", () => {
      store.savePreset("Test");
      expect(store.hasUnsavedChanges).toBe(false);
    });

    it("returns true after modifying config with an active preset", () => {
      store.savePreset("Test");
      store.setRadiusForMode("light", 1.5);
      expect(store.hasUnsavedChanges).toBe(true);
    });

    it("returns false after re-saving the modified preset", () => {
      store.savePreset("Test");
      store.setRadiusForMode("light", 1.5);
      expect(store.hasUnsavedChanges).toBe(true);
      store.savePreset("Test");
      expect(store.hasUnsavedChanges).toBe(false);
    });
  });

  describe("undoAll", () => {
    it("reverts to the base state after multiple changes", () => {
      const baseRadius = store.config.radius;
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      store.setRadiusForMode("light", 1.5);
      store.undoAll();
      expect(store.config.radius).toBe(baseRadius);
    });

    it("does nothing when already at base", () => {
      const baseRadius = store.config.radius;
      store.undoAll();
      expect(store.config.radius).toBe(baseRadius);
    });

    it("resets historyIndex to historyBaseIndex", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      expect(store.canUndoAll).toBe(true);
      store.undoAll();
      expect(store.canUndoAll).toBe(false);
    });
  });

  describe("setSemanticShadeForMode", () => {
    it("sets a light color shade", () => {
      store.setSemanticShadeForMode("light", "primary", "400");
      expect(store.config.colorShades.primary).toBe("400");
    });

    it("sets a dark color shade independently", () => {
      store.setSemanticShadeForMode("dark", "primary", "600");
      expect(store.config.darkColorShades.primary).toBe("600");
      expect(store.config.colorShades.primary).toBe(
        DEFAULT_THEME.colorShades.primary,
      );
    });

    it("preserves other semantic shades", () => {
      const originalSecondary = store.config.colorShades.secondary;
      store.setSemanticShadeForMode("light", "primary", "300");
      expect(store.config.colorShades.secondary).toBe(originalSecondary);
    });
  });

  describe("setRadiusVisualForMode", () => {
    it("updates radius without pushing history", () => {
      store.setRadiusVisualForMode("light", 1.5);
      expect(store.config.radius).toBe(1.5);
    });

    it("updates dark radius without pushing history", () => {
      store.setRadiusVisualForMode("dark", 0.75);
      expect(store.config.darkRadius).toBe(0.75);
    });

    it("does not affect undo history", () => {
      const initialCanUndo = store.canUndo;
      store.setRadiusVisualForMode("light", 1.0);
      // canUndo should not have changed — no history was pushed
      // This is a visual-only update for slider dragging
      expect(store.canUndo).toBe(initialCanUndo);
    });
  });

  describe("loadPreset with invalid config", () => {
    it("silently skips loading an invalid preset", () => {
      const originalPrimary = store.config.colors.primary;
      const badPreset = {
        name: "Bad",
        config: { bad: "data" } as unknown as ThemeConfig,
      };
      store.loadPreset(badPreset);
      expect(store.config.colors.primary).toBe(originalPrimary);
    });
  });

  describe("activePresetName", () => {
    it("is empty by default", () => {
      expect(store.activePresetName).toBe("");
    });

    it("is set when saving a preset", () => {
      store.savePreset("MyPreset");
      expect(store.activePresetName).toBe("MyPreset");
    });

    it("is set when loading a preset", () => {
      const preset = { name: "Loaded", config: cloneTheme(DEFAULT_THEME) };
      store.loadPreset(preset);
      expect(store.activePresetName).toBe("Loaded");
    });

    it("is cleared when resetting to defaults", () => {
      store.savePreset("Active");
      store.resetToDefaults();
      expect(store.activePresetName).toBe("");
    });

    it("is cleared when deleting the active preset", () => {
      store.savePreset("ToDelete");
      expect(store.activePresetName).toBe("ToDelete");
      store.deletePreset("ToDelete");
      expect(store.activePresetName).toBe("");
    });

    it("is unchanged when deleting a non-active preset", () => {
      store.savePreset("Keep");
      store.setSemanticColorForMode("light", "primary", "red");
      store.savePreset("Delete");
      expect(store.activePresetName).toBe("Delete");
      store.deletePreset("Keep");
      expect(store.activePresetName).toBe("Delete");
    });
  });

  describe("savePreset timestamps", () => {
    it("sets createdAt and updatedAt on new presets", () => {
      store.savePreset("Stamped");
      const preset = store.savedPresets[0]!;
      expect(preset.createdAt).toBeDefined();
      expect(preset.updatedAt).toBeDefined();
      expect(preset.createdAt).toBeLessThanOrEqual(Date.now());
    });

    it("preserves original createdAt on overwrite", () => {
      store.savePreset("Stamped");
      const originalCreated = store.savedPresets[0]!.createdAt;
      store.setRadiusForMode("light", 1.0);
      store.savePreset("Stamped");
      expect(store.savedPresets[0]!.createdAt).toBe(originalCreated);
      expect(store.savedPresets[0]!.updatedAt).toBeGreaterThanOrEqual(
        originalCreated!,
      );
    });
  });
});
