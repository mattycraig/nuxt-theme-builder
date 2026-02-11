import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const routeRef = reactive({ path: "/templates/dashboard" });
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

    it("returns true for block paths", () => {
      routeRef.path = "/blocks/hero";
      const { hasSourcePage } = useSourceCode();
      expect(hasSourcePage.value).toBe(true);
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
});
