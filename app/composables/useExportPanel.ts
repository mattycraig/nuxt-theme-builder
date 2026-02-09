const _exportPanelOpen = ref(false);

/**
 * Shared composable for the export/import slideover panel.
 *
 * Singleton pattern — the `<USlideover>` is rendered once in
 * `EditorExportSlideover.vue` at the layout level, and any component
 * can open it via `useExportPanel().open()`.
 */
export function useExportPanel() {
  const isOpen = computed({
    get: () => _exportPanelOpen.value,
    set: (val: boolean) => {
      _exportPanelOpen.value = val;
    },
  });

  function open() {
    _exportPanelOpen.value = true;
  }

  function close() {
    _exportPanelOpen.value = false;
  }

  function toggle() {
    _exportPanelOpen.value = !_exportPanelOpen.value;
  }

  return { isOpen, open, close, toggle };
}
