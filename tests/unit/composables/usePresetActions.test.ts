import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { usePresetActions } from "~/composables/usePresetActions";
import { useThemeStore } from "~/stores/theme";
import { BUILT_IN_PRESETS } from "~/utils/presets";

const { navigateToMock, toastAddMock } = vi.hoisted(() => ({
  navigateToMock: vi.fn(),
  toastAddMock: vi.fn(),
}));

mockNuxtImport("navigateTo", () => navigateToMock);
mockNuxtImport("useToast", () => () => ({ add: toastAddMock }));

describe("usePresetActions", () => {
  let store: ReturnType<typeof useThemeStore>;
  const cherry = BUILT_IN_PRESETS.find((p) => p.name === "Cherry")!;

  beforeEach(() => {
    navigateToMock.mockClear();
    toastAddMock.mockClear();
    store = useThemeStore();
    store.resetToDefaults();
    store.savedPresets.splice(0);
  });

  it("previewPreset applies the theme without leaving the page", () => {
    const { previewPreset } = usePresetActions();
    previewPreset(cherry);
    expect(store.activePresetName).toBe("Cherry");
    expect(store.config.colors.primary).toBe(cherry.config.colors.primary);
    expect(navigateToMock).not.toHaveBeenCalled();
  });

  it("savePreset adds the theme to My Themes without applying it", () => {
    const { savePreset, isSaved } = usePresetActions();
    const primaryBefore = store.config.colors.primary;

    expect(isSaved(cherry)).toBe(false);
    savePreset(cherry);

    expect(isSaved(cherry)).toBe(true);
    expect(store.savedPresets.map((p) => p.name)).toEqual(["Cherry"]);
    expect(store.config.colors.primary).toBe(primaryBefore);
    expect(toastAddMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Theme saved" }),
    );
  });

  it("savePreset tells the user when the theme is already saved", () => {
    const { savePreset } = usePresetActions();
    savePreset(cherry);
    savePreset(cherry);

    expect(store.savedPresets).toHaveLength(1);
    expect(toastAddMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ title: "Already saved" }),
    );
  });
});
