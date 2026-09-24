import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { effectScope, type EffectScope } from "vue";
import { flushPromises } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { _resetSourceCodeState } from "~/composables/useSourceCode";

const routeRef = reactive({ path: "/templates/dashboard" });
// $fetch is a Nuxt auto-import, so mock it as one (a global stub is bypassed)
const fetchMock = vi.fn(async (_url: string) => "");
mockNuxtImport("$fetch", () => {
  return (...args: unknown[]) => fetchMock(...args);
});

mockNuxtImport("useRoute", () => {
  return () => routeRef;
});

// Mock useClipboard
const copiedRef = ref(false);
const copyFn = vi.fn();
vi.mock("@vueuse/core", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useClipboard: () => ({
      copy: copyFn,
      copied: copiedRef,
    }),
  };
});

describe("useSourceCode", () => {
  beforeEach(() => {
    _resetSourceCodeState();
    routeRef.path = "/templates/dashboard";
    copiedRef.value = false;
    copyFn.mockClear();
  });

  describe("hasSourcePage", () => {
    it("returns true for template paths", () => {
      routeRef.path = "/templates/dashboard";
      const { hasSourcePage } = useSourceCode();
      expect(hasSourcePage.value).toBe(true);
    });

    it("returns false for block paths", () => {
      routeRef.path = "/blocks/hero";
      const { hasSourcePage } = useSourceCode();
      expect(hasSourcePage.value).toBe(false);
    });

    it("returns false for templates index page", () => {
      routeRef.path = "/templates";
      const { hasSourcePage } = useSourceCode();
      expect(hasSourcePage.value).toBe(false);
    });

    it("returns false for component paths", () => {
      routeRef.path = "/components/buttons";
      const { hasSourcePage } = useSourceCode();
      expect(hasSourcePage.value).toBe(false);
    });

    it("returns false for root path", () => {
      routeRef.path = "/";
      const { hasSourcePage } = useSourceCode();
      expect(hasSourcePage.value).toBe(false);
    });
  });

  describe("sourceFilePath", () => {
    it("converts route path to file path", () => {
      routeRef.path = "/templates/dashboard";
      const { sourceFilePath } = useSourceCode();
      expect(sourceFilePath.value).toBe("app/pages/templates/dashboard.vue");
    });

    it("strips leading slash", () => {
      routeRef.path = "/blocks/hero";
      const { sourceFilePath } = useSourceCode();
      expect(sourceFilePath.value).toBe("app/pages/blocks/hero.vue");
    });
  });

  describe("viewMode", () => {
    it("defaults to preview", () => {
      const { viewMode } = useSourceCode();
      expect(viewMode.value).toBe("preview");
    });

    it("setViewMode changes mode", () => {
      const { viewMode, setViewMode } = useSourceCode();
      setViewMode("code");
      expect(viewMode.value).toBe("code");
    });

    it("setViewMode back to preview", () => {
      const { viewMode, setViewMode } = useSourceCode();
      setViewMode("code");
      setViewMode("preview");
      expect(viewMode.value).toBe("preview");
    });
  });

  describe("initial state", () => {
    it("sourceCode is empty initially", () => {
      const { sourceCode } = useSourceCode();
      expect(sourceCode.value).toBe("");
    });

    it("isLoadingSource is false initially", () => {
      const { isLoadingSource } = useSourceCode();
      expect(isLoadingSource.value).toBe(false);
    });

    it("sourceError is empty initially", () => {
      const { sourceError } = useSourceCode();
      expect(sourceError.value).toBe("");
    });
  });

  describe("copySource", () => {
    it("does not call copy when sourceCode is empty", () => {
      const { copySource } = useSourceCode();
      copySource();
      expect(copyFn).not.toHaveBeenCalled();
    });

    it("calls copy with sourceCode content when not empty", () => {
      const { sourceCode, copySource } = useSourceCode();
      sourceCode.value = "<template>Hello</template>";
      copySource();
      expect(copyFn).toHaveBeenCalledWith("<template>Hello</template>");
    });
  });

  describe("fetching", () => {
    let scope: EffectScope;

    // The layout, preview toolbar, and fullscreen overlay each call useSourceCode().
    function useInScope(callers = 1) {
      let api!: ReturnType<typeof useSourceCode>;
      for (let i = 0; i < callers; i++) {
        api = scope.run(() => useSourceCode())!;
      }
      return api;
    }

    async function showCode(api: ReturnType<typeof useSourceCode>, path: string) {
      api.setViewMode("preview");
      routeRef.path = path;
      await flushPromises();
      api.setViewMode("code");
      await flushPromises();
    }

    beforeEach(() => {
      scope = effectScope();
      fetchMock.mockReset();
      fetchMock.mockImplementation(async (url: string) => `source of ${url}`);
    });

    afterEach(() => {
      scope.stop();
    });

    it("shows the current route's source when returning to a cached route", async () => {
      const api = useInScope();

      await showCode(api, "/templates/dashboard");
      await showCode(api, "/templates/login");
      await showCode(api, "/templates/dashboard");

      expect(api.sourceCode.value).toBe("source of /api/source/templates/dashboard");
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("fetches once when several components share the composable", async () => {
      const api = useInScope(3);

      await showCode(api, "/templates/dashboard");

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(api.sourceCode.value).toBe("source of /api/source/templates/dashboard");
    });

    it("ignores a response that arrives after navigating to another route", async () => {
      let resolveSlow!: (value: string) => void;
      fetchMock.mockImplementationOnce(
        () => new Promise<string>((resolve) => (resolveSlow = resolve)),
      );
      const api = useInScope();

      await showCode(api, "/templates/dashboard");
      await showCode(api, "/templates/login");
      resolveSlow("stale dashboard source");
      await flushPromises();

      expect(api.sourceCode.value).toBe("source of /api/source/templates/login");
    });
  });
});
