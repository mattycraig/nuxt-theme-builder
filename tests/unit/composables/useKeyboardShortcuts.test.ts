import { describe, it, expect, beforeEach, vi } from "vitest";
import { useThemeStore } from "~/stores/theme";
import { useSaveThemeModal } from "~/composables/useSaveThemeModal";
import { createKeydownHandler } from "~/composables/useKeyboardShortcuts";

/**
 * Tests for the keydown handler logic exported from useKeyboardShortcuts.
 * Uses the real `createKeydownHandler` factory — no duplicated logic.
 */

function createKeyEvent(
  key: string,
  mods: { ctrl?: boolean; shift?: boolean; meta?: boolean } = {},
): KeyboardEvent {
  return new KeyboardEvent("keydown", {
    key,
    ctrlKey: mods.ctrl ?? false,
    shiftKey: mods.shift ?? false,
    metaKey: mods.meta ?? false,
    bubbles: true,
    cancelable: true,
  });
}

describe("useKeyboardShortcuts — handler logic", () => {
  let store: ReturnType<typeof useThemeStore>;
  let modal: ReturnType<typeof useSaveThemeModal>;
  let actions: {
    undo: ReturnType<typeof vi.fn>;
    redo: ReturnType<typeof vi.fn>;
    smartSave: ReturnType<typeof vi.fn>;
    openSaveAs: ReturnType<typeof vi.fn>;
  };
  let handleKeydown: (e: KeyboardEvent) => void;

  beforeEach(() => {
    store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
    modal = useSaveThemeModal();
    modal.cancel();

    actions = {
      undo: vi.fn(),
      redo: vi.fn(),
      smartSave: vi.fn(),
      openSaveAs: vi.fn(),
    };
    handleKeydown = createKeydownHandler(actions);
  });

  describe("undo/redo shortcuts", () => {
    it("Ctrl+Z triggers undo", () => {
      const event = createKeyEvent("z", { ctrl: true });
      handleKeydown(event);

      expect(actions.undo).toHaveBeenCalledOnce();
      expect(actions.redo).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it("Cmd+Z triggers undo (macOS)", () => {
      const event = createKeyEvent("z", { meta: true });
      handleKeydown(event);

      expect(actions.undo).toHaveBeenCalledOnce();
    });

    it("Ctrl+Shift+Z triggers redo", () => {
      const event = createKeyEvent("z", { ctrl: true, shift: true });
      handleKeydown(event);

      expect(actions.redo).toHaveBeenCalledOnce();
      expect(actions.undo).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it("Cmd+Shift+Z triggers redo (macOS)", () => {
      const event = createKeyEvent("z", { meta: true, shift: true });
      handleKeydown(event);

      expect(actions.redo).toHaveBeenCalledOnce();
    });
  });

  describe("save shortcuts", () => {
    it("Ctrl+S triggers smartSave", () => {
      const event = createKeyEvent("s", { ctrl: true });
      handleKeydown(event);

      expect(actions.smartSave).toHaveBeenCalledOnce();
      expect(actions.openSaveAs).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it("Cmd+S triggers smartSave (macOS)", () => {
      const event = createKeyEvent("s", { meta: true });
      handleKeydown(event);

      expect(actions.smartSave).toHaveBeenCalledOnce();
    });

    it("Ctrl+Shift+S opens Save As", () => {
      const event = createKeyEvent("s", { ctrl: true, shift: true });
      handleKeydown(event);

      expect(actions.openSaveAs).toHaveBeenCalledOnce();
      expect(actions.smartSave).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it("Cmd+Shift+S opens Save As (macOS)", () => {
      const event = createKeyEvent("s", { meta: true, shift: true });
      handleKeydown(event);

      expect(actions.openSaveAs).toHaveBeenCalledOnce();
      expect(actions.smartSave).not.toHaveBeenCalled();
    });
  });

  describe("keys that should be ignored", () => {
    it("plain Z without modifier does nothing", () => {
      const event = createKeyEvent("z");
      handleKeydown(event);

      expect(actions.undo).not.toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(false);
    });

    it("Ctrl+A does not trigger any shortcut", () => {
      const event = createKeyEvent("a", { ctrl: true });
      handleKeydown(event);

      expect(actions.undo).not.toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
      expect(actions.smartSave).not.toHaveBeenCalled();
      expect(actions.openSaveAs).not.toHaveBeenCalled();
    });

    it("Shift+Z without Ctrl/Cmd does nothing", () => {
      const event = createKeyEvent("z", { shift: true });
      handleKeydown(event);

      expect(actions.undo).not.toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
    });
  });

  describe("integration with real store (undo/redo round-trip)", () => {
    it("Ctrl+Z actually reverses a store change when wired to real undo", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      expect(store.config.radius).toBe(1.0);

      const realHandler = createKeydownHandler({
        undo: () => store.undo(),
        redo: () => store.redo(),
        smartSave: vi.fn(),
        openSaveAs: vi.fn(),
      });

      const event = createKeyEvent("z", { ctrl: true });
      realHandler(event);

      expect(store.config.radius).toBe(0.5);
    });

    it("Ctrl+Shift+Z re-applies after undo when wired to real redo", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      store.undo();
      expect(store.config.radius).toBe(0.5);

      const realHandler = createKeydownHandler({
        undo: () => store.undo(),
        redo: () => store.redo(),
        smartSave: vi.fn(),
        openSaveAs: vi.fn(),
      });

      const event = createKeyEvent("z", { ctrl: true, shift: true });
      realHandler(event);

      expect(store.config.radius).toBe(1.0);
    });
  });
});
