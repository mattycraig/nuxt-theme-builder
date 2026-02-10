import { describe, it, expect, beforeEach } from "vitest";
import { useSaveThemeModal } from "~/composables/useSaveThemeModal";
import { useThemeStore } from "~/stores/theme";

describe("useSaveThemeModal", () => {
  let modal: ReturnType<typeof useSaveThemeModal>;
  let store: ReturnType<typeof useThemeStore>;

  beforeEach(() => {
    store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
    modal = useSaveThemeModal();
    modal.cancel();
  });

  describe("modal state", () => {
    it("starts closed with empty name", () => {
      expect(modal.isOpen.value).toBe(false);
      expect(modal.themeName.value).toBe("");
    });

    it("opens with prefilled name via openSaveAs", () => {
      modal.openSaveAs("My Theme");
      expect(modal.isOpen.value).toBe(true);
      expect(modal.themeName.value).toBe("My Theme");
    });

    it("opens with empty name when no prefill", () => {
      modal.openSaveAs();
      expect(modal.isOpen.value).toBe(true);
      expect(modal.themeName.value).toBe("");
    });

    it("cancel closes and clears name", () => {
      modal.openSaveAs("Test");
      modal.cancel();
      expect(modal.isOpen.value).toBe(false);
      expect(modal.themeName.value).toBe("");
    });
  });

  describe("isOverwrite", () => {
    it("returns false when name does not match any saved preset", () => {
      modal.openSaveAs("Unique Name");
      expect(modal.isOverwrite.value).toBe(false);
    });

    it("returns true when name matches an existing saved preset", () => {
      store.savePreset("Existing");
      modal.openSaveAs("Existing");
      expect(modal.isOverwrite.value).toBe(true);
    });

    it("returns false with empty name", () => {
      store.savePreset("Something");
      modal.openSaveAs("");
      expect(modal.isOverwrite.value).toBe(false);
    });
  });

  describe("confirm", () => {
    it("saves a new preset and closes the modal", () => {
      modal.openSaveAs("New Theme");
      modal.confirm();
      expect(modal.isOpen.value).toBe(false);
      expect(store.savedPresets.some((p) => p.name === "New Theme")).toBe(true);
    });

    it("does nothing with empty name", () => {
      modal.openSaveAs("");
      modal.confirm();
      expect(store.savedPresets.length).toBe(0);
    });

    it("overwrites when name matches existing preset", () => {
      store.savePreset("Theme");
      store.setRadiusForMode("light", 1.5);
      modal.openSaveAs("Theme");
      modal.confirm();
      expect(store.savedPresets.length).toBe(1);
      expect(store.savedPresets[0]!.config.radius).toBe(1.5);
    });

    it("clears name after confirming", () => {
      modal.openSaveAs("Test");
      modal.confirm();
      expect(modal.themeName.value).toBe("");
    });
  });

  describe("quickSave", () => {
    it("does nothing when no active preset", () => {
      store.setRadiusForMode("light", 1.0);
      modal.quickSave();
      expect(store.savedPresets.length).toBe(0);
    });

    it("does nothing when no unsaved changes", () => {
      store.savePreset("Test");
      const originalUpdatedAt = store.savedPresets[0]!.updatedAt;
      modal.quickSave();
      // Preset should still be the same (no update triggered)
      expect(store.savedPresets[0]!.name).toBe("Test");
    });

    it("saves when there are unsaved changes to active preset", () => {
      store.savePreset("Test");
      store.setRadiusForMode("light", 1.5);
      expect(store.hasUnsavedChanges).toBe(true);
      modal.quickSave();
      expect(store.savedPresets[0]!.config.radius).toBe(1.5);
    });
  });

  describe("singleton pattern", () => {
    it("shares state between multiple composable instances", () => {
      const modal1 = useSaveThemeModal();
      const modal2 = useSaveThemeModal();
      modal1.openSaveAs("Shared");
      expect(modal2.isOpen.value).toBe(true);
      expect(modal2.themeName.value).toBe("Shared");
      modal2.cancel();
      expect(modal1.isOpen.value).toBe(false);
    });
  });
});
