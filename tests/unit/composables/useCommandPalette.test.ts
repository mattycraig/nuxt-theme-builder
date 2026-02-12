import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

import { useCommandPalette } from "~/composables/useCommandPalette";

const mockColorMode = reactive({ value: "light", preference: "light" });
mockNuxtImport("useColorMode", () => {
  return () => mockColorMode;
});

const mockRoute = reactive({ path: "/" });
mockNuxtImport("useRoute", () => {
  return () => mockRoute;
});

const mockNavigateTo = vi.fn();
mockNuxtImport("navigateTo", () => {
  return (...args: unknown[]) => mockNavigateTo(...args);
});

const mockStore = reactive({
  canUndo: false,
  canRedo: false,
  undo: vi.fn(),
  redo: vi.fn(),
  resetToDefaults: vi.fn(),
  activePresetName: null as string | null,
  hasUnsavedChanges: false,
});
mockNuxtImport("useThemeStore", () => {
  return () => mockStore;
});

const mockQuickSave = vi.fn();
const mockOpenSaveAs = vi.fn();
mockNuxtImport("useSaveThemeModal", () => {
  return () => ({
    quickSave: mockQuickSave,
    openSaveAs: mockOpenSaveAs,
  });
});

mockNuxtImport("useLayoutNavigation", () => {
  return () => ({
    allNavItems: computed(() => [
      { label: "Home", icon: "i-lucide-home", to: "/" },
      { label: "AI Generate", icon: "i-lucide-sparkles", to: "/ai" },
    ]),
  });
});

describe("useCommandPalette", () => {
  let palette: ReturnType<typeof useCommandPalette>;

  beforeEach(() => {
    mockColorMode.value = "light";
    mockColorMode.preference = "light";
    mockStore.canUndo = false;
    mockStore.canRedo = false;
    mockStore.activePresetName = null;
    mockStore.hasUnsavedChanges = false;
    mockNavigateTo.mockReset();
    mockQuickSave.mockReset();
    mockOpenSaveAs.mockReset();
    mockStore.undo.mockReset();
    mockStore.redo.mockReset();
    mockStore.resetToDefaults.mockReset();
    palette = useCommandPalette();
  });

  describe("searchGroups structure", () => {
    it("returns two groups: pages and actions", () => {
      const groups = palette.searchGroups.value;
      expect(groups).toHaveLength(2);
      expect(groups[0].id).toBe("pages");
      expect(groups[1].id).toBe("actions");
    });

    it("pages group contains nav items", () => {
      const pages = palette.searchGroups.value[0];
      expect(pages.label).toBe("Preview Pages");
      expect(pages.items.length).toBeGreaterThan(0);
      expect(pages.items[0].label).toBe("Home");
    });

    it("actions group contains quick actions", () => {
      const actions = palette.searchGroups.value[1];
      expect(actions.label).toBe("Quick Actions");
      expect(actions.items.length).toBeGreaterThan(0);
    });
  });

  describe("quick actions", () => {
    function getAction(label: string) {
      const actions = palette.searchGroups.value[1].items;
      return actions.find((a: { label: string }) => a.label === label);
    }

    it("includes Toggle Color Mode action", () => {
      expect(getAction("Toggle Color Mode")).toBeDefined();
    });

    it("includes Undo action", () => {
      expect(getAction("Undo")).toBeDefined();
    });

    it("includes Redo action", () => {
      expect(getAction("Redo")).toBeDefined();
    });

    it("includes Reset to Defaults action", () => {
      expect(getAction("Reset to Defaults")).toBeDefined();
    });

    it("includes Save Theme action", () => {
      expect(getAction("Save Theme")).toBeDefined();
    });

    it("includes Save Theme As action", () => {
      expect(getAction("Save Theme As...")).toBeDefined();
    });

    describe("color mode toggle", () => {
      it("shows moon icon in light mode", () => {
        mockColorMode.value = "light";
        const action = getAction("Toggle Color Mode");
        expect(action.icon).toBe("i-lucide-moon");
      });

      it("shows sun icon in dark mode", () => {
        mockColorMode.value = "dark";
        const action = getAction("Toggle Color Mode");
        expect(action.icon).toBe("i-lucide-sun");
      });

      it('shows "Switch to dark" suffix in light mode', () => {
        mockColorMode.value = "light";
        const action = getAction("Toggle Color Mode");
        expect(action.suffix).toBe("Switch to dark");
      });

      it('shows "Switch to light" suffix in dark mode', () => {
        mockColorMode.value = "dark";
        const action = getAction("Toggle Color Mode");
        expect(action.suffix).toBe("Switch to light");
      });

      it("toggles preference to dark when currently light", () => {
        mockColorMode.value = "light";
        const action = getAction("Toggle Color Mode");
        action.onSelect();
        expect(mockColorMode.preference).toBe("dark");
      });

      it("toggles preference to light when currently dark", () => {
        mockColorMode.value = "dark";
        const action = getAction("Toggle Color Mode");
        action.onSelect();
        expect(mockColorMode.preference).toBe("light");
      });
    });

    describe("undo/redo disabled state", () => {
      it("undo is disabled when canUndo is false", () => {
        mockStore.canUndo = false;
        const action = getAction("Undo");
        expect(action.disabled).toBe(true);
      });

      it("undo is enabled when canUndo is true", () => {
        mockStore.canUndo = true;
        const action = getAction("Undo");
        expect(action.disabled).toBe(false);
      });

      it("redo is disabled when canRedo is false", () => {
        mockStore.canRedo = false;
        const action = getAction("Redo");
        expect(action.disabled).toBe(true);
      });

      it("redo is enabled when canRedo is true", () => {
        mockStore.canRedo = true;
        const action = getAction("Redo");
        expect(action.disabled).toBe(false);
      });
    });

    describe("undo/redo execution", () => {
      it("calls store.undo when Undo is selected", () => {
        const action = getAction("Undo");
        action.onSelect();
        expect(mockStore.undo).toHaveBeenCalled();
      });

      it("calls store.redo when Redo is selected", () => {
        const action = getAction("Redo");
        action.onSelect();
        expect(mockStore.redo).toHaveBeenCalled();
      });

      it("calls store.resetToDefaults when Reset is selected", () => {
        const action = getAction("Reset to Defaults");
        action.onSelect();
        expect(mockStore.resetToDefaults).toHaveBeenCalled();
      });
    });

    describe("save action behavior", () => {
      it('shows "Save as new theme" when no active preset', () => {
        mockStore.activePresetName = null;
        const action = getAction("Save Theme");
        expect(action.suffix).toBe("Save as new theme");
      });

      it("shows save preset name when active preset has unsaved changes", () => {
        mockStore.activePresetName = "My Theme";
        mockStore.hasUnsavedChanges = true;
        const action = getAction("Save Theme");
        expect(action.suffix).toBe('Save "My Theme"');
      });

      it("calls quickSave when active preset has unsaved changes", () => {
        mockStore.activePresetName = "My Theme";
        mockStore.hasUnsavedChanges = true;
        const action = getAction("Save Theme");
        action.onSelect();
        expect(mockQuickSave).toHaveBeenCalled();
      });

      it("calls openSaveAs when no active preset", () => {
        mockStore.activePresetName = null;
        mockStore.hasUnsavedChanges = false;
        const action = getAction("Save Theme");
        action.onSelect();
        expect(mockOpenSaveAs).toHaveBeenCalled();
      });

      it("Save As always calls openSaveAs", () => {
        const action = getAction("Save Theme As...");
        action.onSelect();
        expect(mockOpenSaveAs).toHaveBeenCalled();
      });
    });
  });

  describe("onSearchSelect", () => {
    it("navigates when option has a 'to' property", () => {
      palette.onSearchSelect({ to: "/ai" });
      expect(mockNavigateTo).toHaveBeenCalledWith("/ai");
    });

    it("does not navigate when option has no 'to' property", () => {
      palette.onSearchSelect({});
      expect(mockNavigateTo).not.toHaveBeenCalled();
    });
  });
});
