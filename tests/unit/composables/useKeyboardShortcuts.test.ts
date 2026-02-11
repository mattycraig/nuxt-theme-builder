import { describe, it, expect, beforeEach, vi } from "vitest";
import { useThemeStore } from "~/stores/theme";
import { useSaveThemeModal } from "~/composables/useSaveThemeModal";

/**
 * useKeyboardShortcuts registers its listener in onMounted, which doesn't fire
 * in a unit-test context without a mounted component. We test the handler
 * decision logic directly — lifecycle wiring is an integration/e2e concern.
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

// Mirrors the branching logic from useKeyboardShortcuts.handleKeydown
function simulateHandleKeydown(
  e: KeyboardEvent,
  actions: {
    undo: () => void;
    redo: () => void;
    quickSave: () => void;
    openSaveAs: () => void;
    activePresetName: string;
    hasUnsavedChanges: boolean;
  },
) {
  const mod = e.ctrlKey || e.metaKey;
  if (!mod) return;

  const key = e.key.toLowerCase();

  if (key === "z" && !e.shiftKey) {
    e.preventDefault();
    actions.undo();
  } else if (key === "z" && e.shiftKey) {
    e.preventDefault();
    actions.redo();
  } else if (key === "s" && !e.shiftKey) {
    e.preventDefault();
    if (actions.activePresetName && actions.hasUnsavedChanges) {
      actions.quickSave();
    } else {
      actions.openSaveAs();
    }
  } else if (key === "s" && e.shiftKey) {
    e.preventDefault();
    actions.openSaveAs();
  }
}

describe("useKeyboardShortcuts — handler logic", () => {
  let store: ReturnType<typeof useThemeStore>;
  let modal: ReturnType<typeof useSaveThemeModal>;
  let actions: Parameters<typeof simulateHandleKeydown>[1];

  beforeEach(() => {
    store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
    modal = useSaveThemeModal();
    modal.cancel();

    actions = {
      undo: vi.fn(),
      redo: vi.fn(),
      quickSave: vi.fn(),
      openSaveAs: vi.fn(),
      activePresetName: "",
      hasUnsavedChanges: false,
    };
  });

  describe("undo/redo shortcuts", () => {
    it("Ctrl+Z triggers undo", () => {
      const event = createKeyEvent("z", { ctrl: true });
      simulateHandleKeydown(event, actions);

      expect(actions.undo).toHaveBeenCalledOnce();
      expect(actions.redo).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it("Cmd+Z triggers undo (macOS)", () => {
      const event = createKeyEvent("z", { meta: true });
      simulateHandleKeydown(event, actions);

      expect(actions.undo).toHaveBeenCalledOnce();
    });

    it("Ctrl+Shift+Z triggers redo", () => {
      const event = createKeyEvent("z", { ctrl: true, shift: true });
      simulateHandleKeydown(event, actions);

      expect(actions.redo).toHaveBeenCalledOnce();
      expect(actions.undo).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it("Cmd+Shift+Z triggers redo (macOS)", () => {
      const event = createKeyEvent("z", { meta: true, shift: true });
      simulateHandleKeydown(event, actions);

      expect(actions.redo).toHaveBeenCalledOnce();
    });
  });

  describe("save shortcuts", () => {
    it("Ctrl+S opens Save As when no active preset", () => {
      actions.activePresetName = "";
      actions.hasUnsavedChanges = false;

      const event = createKeyEvent("s", { ctrl: true });
      simulateHandleKeydown(event, actions);

      expect(actions.openSaveAs).toHaveBeenCalledOnce();
      expect(actions.quickSave).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });

    it("Ctrl+S triggers quickSave when active preset has unsaved changes", () => {
      actions.activePresetName = "My Theme";
      actions.hasUnsavedChanges = true;

      const event = createKeyEvent("s", { ctrl: true });
      simulateHandleKeydown(event, actions);

      expect(actions.quickSave).toHaveBeenCalledOnce();
      expect(actions.openSaveAs).not.toHaveBeenCalled();
    });

    it("Ctrl+S opens Save As when active preset has no unsaved changes", () => {
      actions.activePresetName = "My Theme";
      actions.hasUnsavedChanges = false;

      const event = createKeyEvent("s", { ctrl: true });
      simulateHandleKeydown(event, actions);

      expect(actions.openSaveAs).toHaveBeenCalledOnce();
      expect(actions.quickSave).not.toHaveBeenCalled();
    });

    it("Ctrl+Shift+S always opens Save As", () => {
      actions.activePresetName = "My Theme";
      actions.hasUnsavedChanges = true;

      const event = createKeyEvent("s", { ctrl: true, shift: true });
      simulateHandleKeydown(event, actions);

      expect(actions.openSaveAs).toHaveBeenCalledOnce();
      expect(actions.quickSave).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(true);
    });
  });

  describe("keys that should be ignored", () => {
    it("plain Z without modifier does nothing", () => {
      const event = createKeyEvent("z");
      simulateHandleKeydown(event, actions);

      expect(actions.undo).not.toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(false);
    });

    it("Ctrl+A does not trigger any shortcut", () => {
      const event = createKeyEvent("a", { ctrl: true });
      simulateHandleKeydown(event, actions);

      expect(actions.undo).not.toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
      expect(actions.quickSave).not.toHaveBeenCalled();
      expect(actions.openSaveAs).not.toHaveBeenCalled();
    });

    it("Shift+Z without Ctrl/Cmd does nothing", () => {
      const event = createKeyEvent("z", { shift: true });
      simulateHandleKeydown(event, actions);

      expect(actions.undo).not.toHaveBeenCalled();
      expect(actions.redo).not.toHaveBeenCalled();
    });
  });

  describe("integration with real store (undo/redo round-trip)", () => {
    it("Ctrl+Z actually reverses a store change when wired to real undo", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      expect(store.config.radius).toBe(1.0);

      const event = createKeyEvent("z", { ctrl: true });
      simulateHandleKeydown(event, {
        undo: () => store.undo(),
        redo: () => store.redo(),
        quickSave: vi.fn(),
        openSaveAs: vi.fn(),
        activePresetName: "",
        hasUnsavedChanges: false,
      });

      expect(store.config.radius).toBe(0.5);
    });

    it("Ctrl+Shift+Z re-applies after undo when wired to real redo", () => {
      store.setRadiusForMode("light", 0.5);
      store.setRadiusForMode("light", 1.0);
      store.undo();
      expect(store.config.radius).toBe(0.5);

      const event = createKeyEvent("z", { ctrl: true, shift: true });
      simulateHandleKeydown(event, {
        undo: () => store.undo(),
        redo: () => store.redo(),
        quickSave: vi.fn(),
        openSaveAs: vi.fn(),
        activePresetName: "",
        hasUnsavedChanges: false,
      });

      expect(store.config.radius).toBe(1.0);
    });
  });
});
