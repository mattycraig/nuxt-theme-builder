/**
 * Manages the preview/code view toggle and source code fetching.
 * Fetches .vue source from the server API on demand and caches results.
 */
export function useSourceCode() {
  const route = useRoute();

  const viewMode = ref<"preview" | "code">("preview");
  const sourceCode = ref("");
  const isLoadingSource = ref(false);
  const sourceError = ref("");
  const sourceCache = new Map<string, string>();

  const { copy, copied } = useClipboard();

  const hasSourcePage = computed(() => {
    const path = route.path;
    return path.startsWith("/templates") || path.startsWith("/blocks");
  });

  const sourceFilePath = computed(() => {
    const path = route.path.replace(/^\//, "");
    return `app/pages/${path}.vue`;
  });

  watch(
    () => route.path,
    () => {
      viewMode.value = "preview";
      sourceError.value = "";
    },
  );

  async function fetchSource() {
    const path = route.path.replace(/^\//, "");
    if (!path) return;

    if (sourceCache.has(path)) {
      sourceCode.value = sourceCache.get(path)!;
      return;
    }

    isLoadingSource.value = true;
    sourceError.value = "";

    try {
      const content = await $fetch<string>(`/api/source/${path}`, {
        responseType: "text",
      });
      sourceCache.set(path, content);
      sourceCode.value = content;
    } catch {
      sourceError.value = "Failed to load source code.";
      sourceCode.value = "";
    } finally {
      isLoadingSource.value = false;
    }
  }

  function setViewMode(mode: "preview" | "code") {
    viewMode.value = mode;
    if (mode === "code" && !sourceCache.has(route.path.replace(/^\//, ""))) {
      fetchSource();
    }
  }

  function copySource() {
    if (sourceCode.value) {
      copy(sourceCode.value);
    }
  }

  function retry() {
    fetchSource();
  }

  return {
    viewMode,
    sourceCode,
    sourceFilePath,
    isLoadingSource,
    sourceError,
    hasSourcePage,
    copied,
    setViewMode,
    copySource,
    retry,
  };
}
