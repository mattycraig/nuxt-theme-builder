import type { ThemePreset } from "~/types/theme";
import { useThemeStore } from "~/stores/theme";

/**
 * Actions for a built-in theme shown outside the editor (theme gallery and
 * theme detail pages): preview it, or add it to My Themes.
 */
export function usePresetActions() {
  const store = useThemeStore();
  const toast = useToast();

  /** Apply the preset (undoable) in place, without leaving the page. */
  function previewPreset(preset: ThemePreset) {
    store.loadPreset(preset);
    toast.add({
      title: `${preset.name} theme applied`,
      description: "Undo from the sidebar if you want your previous theme back.",
      icon: "i-lucide-check",
      color: "success",
    });
  }

  /** Whether a saved theme with this preset's name is already in My Themes. */
  function isSaved(preset: ThemePreset) {
    return store.savedPresets.some((p) => p.name === preset.name);
  }

  /** Add the preset to My Themes without changing the current theme. */
  function savePreset(preset: ThemePreset) {
    const { saved, reason } = store.addToSavedPresets(preset);
    if (saved) {
      toast.add({
        title: "Theme saved",
        description: `"${preset.name}" is now in My Themes.`,
        icon: "i-lucide-check",
        color: "success",
      });
    } else if (reason === "exists") {
      toast.add({
        title: "Already saved",
        description: `"${preset.name}" is already in My Themes.`,
        icon: "i-lucide-bookmark",
        color: "neutral",
      });
    } else {
      toast.add({
        title: "Couldn't save theme",
        description: `"${preset.name}" has an invalid configuration.`,
        icon: "i-lucide-circle-alert",
        color: "error",
      });
    }
  }

  return { previewPreset, isSaved, savePreset };
}
