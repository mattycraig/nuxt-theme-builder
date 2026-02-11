/**
 * Manages the preview/code view toggle and source code fetching.
 *
 * Singleton pattern — state refs are module-level so every component
 * calling `useSourceCode()` shares the same view mode and source data.
 * Watchers are re-registered per caller but operate on the same refs
 * (idempotent) and are properly cleaned up by Vue on component unmount.
 */

const sourceCache = new Map<string, string>();
const _viewMode = ref<"preview" | "code">("preview");
const _sourceCode = ref("");
const _isLoadingSource = ref(false);
const _sourceError = ref("");

/** Reset singleton state — exposed for test isolation */
export function _resetSourceCodeState() {
  _viewMode.value = "preview";
  _sourceCode.value = "";
  _isLoadingSource.value = false;
  _sourceError.value = "";
  sourceCache.clear();
}

function stripLeadingSlash(path: string): string {
  return path.replace(/^\//, "");
}

export function useSourceCode() {
  const route = useRoute();
  const { copy, copied } = useClipboard();

  const routeKey = computed(() => stripLeadingSlash(route.path));

  const hasSourcePage = computed(
    () =>
      route.path.startsWith("/templates") || route.path.startsWith("/blocks"),
  );

  const sourceFilePath = computed(() => `app/pages/${routeKey.value}.vue`);

  async function fetchSource() {
    const key = routeKey.value;
    if (!key) return;

    if (sourceCache.has(key)) {
      _sourceCode.value = sourceCache.get(key)!;
      return;
    }

    _isLoadingSource.value = true;
    _sourceError.value = "";

    try {
      const content = await $fetch<string>(`/api/source/${key}`, {
        responseType: "text",
      });
      sourceCache.set(key, content);
      _sourceCode.value = content;
    } catch {
      _sourceError.value = "Failed to load source code.";
      _sourceCode.value = "";
    } finally {
      _isLoadingSource.value = false;
    }
  }

  function setViewMode(mode: "preview" | "code") {
    _viewMode.value = mode;
  }

  // Reset to preview when the route changes
  watch(
    () => route.path,
    () => {
      _viewMode.value = "preview";
      _sourceError.value = "";
    },
  );

  // Auto-fetch source on switch to code view
  watch(_viewMode, (mode) => {
    if (mode === "code" && !sourceCache.has(routeKey.value)) {
      fetchSource();
    }
  });

  function copySource() {
    if (_sourceCode.value) {
      copy(_sourceCode.value);
    }
  }

  return {
    viewMode: _viewMode,
    sourceCode: _sourceCode,
    sourceFilePath,
    isLoadingSource: _isLoadingSource,
    sourceError: _sourceError,
    hasSourcePage,
    copied,
    setViewMode,
    copySource,
    retry: fetchSource,
  };
}
