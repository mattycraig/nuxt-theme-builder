/**
 * Provides search groups and handlers for the UDashboardSearch command palette.
 *
 * Uses shared singletons (useThemeStore, useSaveThemeModal) and global
 * reactive state (useColorMode, useRoute), so it's safe to call from
 * any component and get consistent results.
 */
export function useCommandPalette() {
  const colorMode = useColorMode();
  const store = useThemeStore();
  const { quickSave, openSaveAs } = useSaveThemeModal();
  const { allNavItems } = useLayoutNavigation();

  const searchGroups = computed(() => [
    {
      id: "pages",
      label: "Preview Pages",
      items: allNavItems.value.map((item) => ({
        label: item.label,
        icon: item.icon,
        to: item.to,
      })),
    },
    {
      id: "actions",
      label: "Quick Actions",
      items: buildQuickActions(),
    },
  ]);

  function buildQuickActions() {
    return [
      {
        label: "Toggle Color Mode",
        icon: colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon",
        suffix:
          colorMode.value === "dark" ? "Switch to light" : "Switch to dark",
        onSelect() {
          colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
        },
      },
      {
        label: "Undo",
        icon: "i-lucide-undo-2",
        suffix: "Undo last change",
        kbds: ["meta", "Z"],
        disabled: !store.canUndo,
        onSelect: () => store.undo(),
      },
      {
        label: "Redo",
        icon: "i-lucide-redo-2",
        suffix: "Redo last change",
        kbds: ["meta", "shift", "Z"],
        disabled: !store.canRedo,
        onSelect: () => store.redo(),
      },
      {
        label: "Reset to Defaults",
        icon: "i-lucide-rotate-ccw",
        suffix: "Reset all theme settings",
        onSelect: () => store.resetToDefaults(),
      },
      {
        label: "Save Theme",
        icon: "i-lucide-save",
        suffix:
          store.activePresetName && store.hasUnsavedChanges
            ? `Save "${store.activePresetName}"`
            : "Save as new theme",
        kbds: ["meta", "S"],
        onSelect() {
          if (store.activePresetName && store.hasUnsavedChanges) {
            quickSave();
          } else {
            openSaveAs();
          }
        },
      },
      {
        label: "Save Theme As...",
        icon: "i-lucide-file-plus",
        suffix: "Save as a new theme with a name",
        kbds: ["meta", "shift", "S"],
        onSelect: () => openSaveAs(),
      },
    ];
  }

  function onSearchSelect(option: { to?: string }) {
    if (option.to) navigateTo(option.to);
  }

  return {
    searchGroups,
    onSearchSelect,
  };
}
