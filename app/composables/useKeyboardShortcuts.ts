import { useThemeStore } from "~/stores/theme";
import { useSaveThemeModal } from "~/composables/useSaveThemeModal";

/**
 * Registers global keyboard shortcuts for the theme editor.
 *
 * Shortcuts:
 * - Ctrl/Cmd + Z → Undo
 * - Ctrl/Cmd + Shift + Z → Redo
 * - Ctrl/Cmd + S → Quick-save active theme (or open Save As)
 * - Ctrl/Cmd + Shift + S → Save As
 */
export function useKeyboardShortcuts() {
  const store = useThemeStore();
  const { quickSave, openSaveAs } = useSaveThemeModal();

  function handleKeydown(e: KeyboardEvent) {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;

    switch (true) {
      case !e.shiftKey && e.key === "z":
        e.preventDefault();
        store.undo();
        break;

      case e.shiftKey && e.key === "z":
        e.preventDefault();
        store.redo();
        break;

      case !e.shiftKey && e.key === "s":
        e.preventDefault();
        if (store.activePresetName && store.hasUnsavedChanges) {
          quickSave();
        } else {
          openSaveAs();
        }
        break;

      case e.shiftKey && e.key === "s":
        e.preventDefault();
        openSaveAs();
        break;
    }
  }

  onMounted(() => {
    if (import.meta.client) {
      document.addEventListener("keydown", handleKeydown);
    }
  });

  onUnmounted(() => {
    if (import.meta.client) {
      document.removeEventListener("keydown", handleKeydown);
    }
  });
}
