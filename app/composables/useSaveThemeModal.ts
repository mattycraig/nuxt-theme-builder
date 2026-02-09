import { useThemeStore } from "~/stores/theme";

// Module-level state so all callers share the same modal instance
const _saveModalOpen = ref(false);
const _saveModalName = ref("");

/**
 * Shared composable for the save-theme modal state.
 *
 * This is a singleton pattern — multiple callers (toolbar, keyboard shortcut,
 * saved-themes section) all control the same modal. The actual `<UModal>` is
 * rendered once in `SaveThemeModal.vue`.
 */
export function useSaveThemeModal() {
  const store = useThemeStore();
  const toast = useToast();

  const isOpen = computed({
    get: () => _saveModalOpen.value,
    set: (val: boolean) => {
      _saveModalOpen.value = val;
    },
  });

  const themeName = computed({
    get: () => _saveModalName.value,
    set: (val: string) => {
      _saveModalName.value = val;
    },
  });

  const isOverwrite = computed(() => {
    const name = _saveModalName.value.trim();
    return name ? store.savedPresets.some((p) => p.name === name) : false;
  });

  /** Open the "Save As" dialog with an optional pre-filled name */
  function openSaveAs(prefill = "") {
    _saveModalName.value = prefill;
    _saveModalOpen.value = true;
  }

  /** Quick-save the active preset (overwrite in-place) without opening the modal */
  function quickSave() {
    if (!store.activePresetName || !store.hasUnsavedChanges) return;
    store.savePreset(store.activePresetName);
    toast.add({
      title: "Theme updated",
      description: `"${store.activePresetName}" saved`,
      icon: "i-lucide-check",
      color: "success",
    });
  }

  function confirm() {
    const name = _saveModalName.value.trim();
    if (!name) return;
    const { isUpdate } = store.savePreset(name);
    _saveModalOpen.value = false;
    _saveModalName.value = "";
    const action = isUpdate ? "updated" : "saved";
    toast.add({
      title: `Theme ${action}`,
      description: `"${name}" ${action} successfully`,
      icon: "i-lucide-check",
      color: "success",
    });
  }

  function cancel() {
    _saveModalOpen.value = false;
    _saveModalName.value = "";
  }

  return {
    isOpen,
    themeName,
    isOverwrite,
    openSaveAs,
    quickSave,
    confirm,
    cancel,
  };
}
