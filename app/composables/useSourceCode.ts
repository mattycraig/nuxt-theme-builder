/**
 * Manages the preview/code view toggle and source code fetching.
 *
 * Singleton pattern — state refs are module-level so every component
 * calling `useSourceCode()` shares the same view mode and source data.
 * Watchers are re-registered per caller but operate on the same refs
 * (idempotent) and are properly cleaned up by Vue on component unmount.
 */

/** Route prefixes whose pages have embedded source available. */
const SOURCE_ELIGIBLE_PREFIXES = ["/templates"] as const;

const sourceCache = new Map<string, string>();
/** In-flight requests, so callers toggling code view at once share one fetch. */
const pendingRequests = new Map<string, Promise<void>>();
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
  pendingRequests.clear();
}

function stripLeadingSlash(path: string): string {
  return path.replace(/^\//, "");
}

export function useSourceCode() {
  const route = useRoute();
  const { copy, copied } = useClipboard();

  const routeKey = computed(() => stripLeadingSlash(route.path));

  const hasSourcePage = computed(() => {
    const path = route.path;
    return (
      SOURCE_ELIGIBLE_PREFIXES.some((prefix) => path.startsWith(prefix)) &&
      path !== "/templates"
    );
  });

  const sourceFilePath = computed(() => `app/pages/${routeKey.value}.vue`);

  function fetchSource(): Promise<void> {
    const key = routeKey.value;
    if (!key) return Promise.resolve();

    const cached = sourceCache.get(key);
    if (cached !== undefined) {
      _sourceCode.value = cached;
      _sourceError.value = "";
      return Promise.resolve();
    }

    const pending = pendingRequests.get(key);
    if (pending) return pending;

    _isLoadingSource.value = true;
    _sourceError.value = "";

    const request = $fetch<string>(`/api/source/${key}`, {
      responseType: "text",
    })
      .then((content) => {
        sourceCache.set(key, content);
        // Drop responses for a route the user has already navigated away from
        if (routeKey.value === key) _sourceCode.value = content;
      })
      .catch(() => {
        if (routeKey.value === key) {
          _sourceError.value = "Failed to load source code.";
          _sourceCode.value = "";
        }
      })
      .finally(() => {
        pendingRequests.delete(key);
        _isLoadingSource.value = pendingRequests.size > 0;
      });

    pendingRequests.set(key, request);
    return request;
  }

  function setViewMode(mode: "preview" | "code") {
    _viewMode.value = mode;
  }

  // Reset to preview when the route changes
  watch(
    () => route.path,
    () => {
      _viewMode.value = "preview";
      _sourceCode.value = "";
      _sourceError.value = "";
    },
  );

  // Load source on switch to code view (served from cache when available)
  watch(_viewMode, (mode) => {
    if (mode === "code") fetchSource();
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
