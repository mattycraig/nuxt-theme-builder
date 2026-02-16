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
  const { smartSave, openSaveAs } = useSaveThemeModal();

  function handleKeydown(e: KeyboardEvent) {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;

    const key = e.key.toLowerCase();

    if (key === "z" && !e.shiftKey) {
      e.preventDefault();
      store.undo();
    } else if (key === "z" && e.shiftKey) {
      e.preventDefault();
      store.redo();
    } else if (key === "s" && !e.shiftKey) {
      e.preventDefault();
      smartSave();
    } else if (key === "s" && e.shiftKey) {
      e.preventDefault();
      openSaveAs();
    }
  }

  onMounted(() => {
    document.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown);
  });
}
