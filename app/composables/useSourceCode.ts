/**
 * Manages the preview/code view toggle and source code fetching.
 * Fetches .vue source from the server API on demand and caches results.
 */

// Module-level cache shared across all composable instances
const sourceCache = new Map<string, string>();

function stripLeadingSlash(path: string): string {
  return path.replace(/^\//, "");
}

export function useSourceCode() {
  const route = useRoute();

  const viewMode = ref<"preview" | "code">("preview");
  const sourceCode = ref("");
  const isLoadingSource = ref(false);
  const sourceError = ref("");

  const { copy, copied } = useClipboard();

  const routeKey = computed(() => stripLeadingSlash(route.path));

  const hasSourcePage = computed(
    () =>
      route.path.startsWith("/templates") || route.path.startsWith("/blocks"),
  );

  const sourceFilePath = computed(() => `app/pages/${routeKey.value}.vue`);

  watch(
    () => route.path,
    () => {
      viewMode.value = "preview";
      sourceError.value = "";
    },
  );

  async function fetchSource() {
    const key = routeKey.value;
    if (!key) return;

    if (sourceCache.has(key)) {
      sourceCode.value = sourceCache.get(key)!;
      return;
    }

    isLoadingSource.value = true;
    sourceError.value = "";

    try {
      const content = await $fetch<string>(`/api/source/${key}`, {
        responseType: "text",
      });
      sourceCache.set(key, content);
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
    if (mode === "code" && !sourceCache.has(routeKey.value)) {
      fetchSource();
    }
  }

  function copySource() {
    if (sourceCode.value) {
      copy(sourceCode.value);
    }
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
    retry: fetchSource,
  };
}
