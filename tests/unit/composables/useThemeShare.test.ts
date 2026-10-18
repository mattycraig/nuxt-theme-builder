import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useThemeShare } from "~/composables/useThemeShare";
import { useThemeStore } from "~/stores/theme";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";
import { SHARE_QUERY_KEY, decodeTheme, encodeTheme } from "~/utils/themeShare";
import { createThemeConfig } from "../../setup/fixtures";

const copyFn = vi.fn();
const toastAddFn = vi.fn();
const mockRoute = reactive({
  path: "/templates/dashboard",
  hash: "",
  query: {} as Record<string, unknown>,
});

mockNuxtImport("useClipboard", () => () => ({ copy: copyFn }));
mockNuxtImport("useToast", () => () => ({ add: toastAddFn }));
mockNuxtImport("useRoute", () => () => mockRoute);

describe("useThemeShare", () => {
  let store: ReturnType<typeof useThemeStore>;
  let replaceFn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = useThemeStore();
    store.resetToDefaults();
    store.activePresetName = "";
    copyFn.mockReset().mockResolvedValue(undefined);
    toastAddFn.mockClear();
    vi.restoreAllMocks();
    replaceFn = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(useRouter(), "replace").mockImplementation(replaceFn);
    mockRoute.query = {};
  });

  describe("copyShareLink", () => {
    it("copies a link to the current page that carries the theme", async () => {
      store.setSemanticColorForMode("light", "primary", "lime");

      await useThemeShare().copyShareLink();

      expect(copyFn).toHaveBeenCalledOnce();
      const url = new URL(copyFn.mock.calls[0]![0]);
      expect(url.origin).toBe(window.location.origin);
      expect(url.pathname).toBe("/templates/dashboard");
      const shared = await decodeTheme(url.searchParams.get(SHARE_QUERY_KEY)!);
      expect(shared?.colors.primary).toBe("lime");
      expect(toastAddFn.mock.calls[0]![0].title).toBe("Share link copied");
    });

    it("shows an error when the copy fails", async () => {
      copyFn.mockRejectedValue(new Error("denied"));

      await useThemeShare().copyShareLink();

      expect(toastAddFn.mock.calls[0]![0].color).toBe("error");
    });
  });

  describe("loadSharedTheme", () => {
    it("does nothing without a theme in the query", async () => {
      await useThemeShare().loadSharedTheme();

      expect(replaceFn).not.toHaveBeenCalled();
      expect(toastAddFn).not.toHaveBeenCalled();
    });

    it("loads a shared theme, clears the query, and keeps undo", async () => {
      store.activePresetName = "My Theme";
      const shared = createThemeConfig({ neutral: "stone", radius: 1 });
      mockRoute.query = { [SHARE_QUERY_KEY]: await encodeTheme(shared), x: "1" };

      await useThemeShare().loadSharedTheme();

      expect(replaceFn).toHaveBeenCalledWith({
        path: "/templates/dashboard",
        query: { x: "1" },
        hash: "",
      });
      expect(store.config).toEqual(shared);
      expect(store.activePresetName).toBe("");
      expect(toastAddFn.mock.calls[0]![0].title).toBe("Shared theme loaded");

      store.undo();
      expect(store.config).toEqual(cloneTheme(DEFAULT_THEME));
    });

    it("keeps the current theme and warns when the link is broken", async () => {
      store.setNeutralForMode("light", "slate");
      const before = cloneTheme(store.config);
      mockRoute.query = { [SHARE_QUERY_KEY]: "1.not-a-theme" };

      await useThemeShare().loadSharedTheme();

      expect(replaceFn).toHaveBeenCalledOnce();
      expect(store.config).toEqual(before);
      expect(toastAddFn.mock.calls[0]![0].color).toBe("warning");
    });

    it("ignores a repeated query parameter", async () => {
      mockRoute.query = { [SHARE_QUERY_KEY]: ["1.a", "1.b"] };

      await useThemeShare().loadSharedTheme();

      expect(store.config).toEqual(cloneTheme(DEFAULT_THEME));
      expect(toastAddFn.mock.calls[0]![0].color).toBe("warning");
    });
  });
});
