/**
 * Registers global keyboard shortcuts for the theme editor.
 *
 * Shortcuts:
 * - Ctrl/Cmd + Z → Undo
 * - Ctrl/Cmd + Shift + Z → Redo
 * - Ctrl/Cmd + S → Quick-save active theme (or open Save As)
 * - Ctrl/Cmd + Shift + S → Save As
 */
/**
 * Creates the keydown handler bound to the given action callbacks.
 * Exported for direct unit testing without lifecycle hooks.
 */
export function createKeydownHandler(actions: {
  undo: () => void;
  redo: () => void;
  smartSave: () => void;
  openSaveAs: () => void;
}) {
  return (e: KeyboardEvent) => {
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
      actions.smartSave();
    } else if (key === "s" && e.shiftKey) {
      e.preventDefault();
      actions.openSaveAs();
    }
  };
}

export function useKeyboardShortcuts() {
  const store = useThemeStore();
  const { smartSave, openSaveAs } = useSaveThemeModal();

  const handleKeydown = createKeydownHandler({
    undo: () => store.undo(),
    redo: () => store.redo(),
    smartSave,
    openSaveAs,
  });

  onMounted(() => {
    document.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
}
