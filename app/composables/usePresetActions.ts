import type { ThemePreset } from "~/types/theme";
import { useThemeStore } from "~/stores/theme";

/** Page a previewed theme opens on: a full template shows it off best. */
const PREVIEW_ROUTE = "/templates/landing";

/**
 * Actions for a built-in theme shown outside the editor (theme gallery and
 * theme detail pages): preview it in the builder, or add it to My Themes.
 */
export function usePresetActions() {
  const store = useThemeStore();
  const toast = useToast();

  /** Apply the preset (undoable) and open a template to preview it. */
  async function previewPreset(preset: ThemePreset) {
    store.loadPreset(preset);
    toast.add({
      title: `${preset.name} theme applied`,
      description: "Undo from the sidebar if you want your previous theme back.",
      icon: "i-lucide-check",
      color: "success",
    });
    await navigateTo(PREVIEW_ROUTE);
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
