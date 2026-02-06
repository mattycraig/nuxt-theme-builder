import type {
  ThemeConfig,
  ThemePreset,
  SemanticColorKey,
  ChromaticPalette,
  NeutralPalette,
  NeutralShade,
} from "~/types/theme";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";

const MAX_HISTORY = 50;

export const useThemeStore = defineStore(
  "theme",
  () => {
    // --- Core State ---
    const config = ref<ThemeConfig>(cloneTheme(DEFAULT_THEME));
    const savedPresets = ref<ThemePreset[]>([]);

    // --- History (undo/redo) ---
    const history = ref<ThemeConfig[]>([cloneTheme(DEFAULT_THEME)]);
    const historyIndex = ref(0);

    function _pushHistory() {
      // Trim any future states if we're not at the end
      history.value = history.value.slice(0, historyIndex.value + 1);
      history.value.push(cloneTheme(config.value));
      if (history.value.length > MAX_HISTORY) {
        history.value.shift();
      } else {
        historyIndex.value++;
      }
    }

    const canUndo = computed(() => historyIndex.value > 0);
    const canRedo = computed(
      () => historyIndex.value < history.value.length - 1,
    );

    function undo() {
      if (!canUndo.value) return;
      historyIndex.value--;
      config.value = cloneTheme(history.value[historyIndex.value]!);
    }

    function redo() {
      if (!canRedo.value) return;
      historyIndex.value++;
      config.value = cloneTheme(history.value[historyIndex.value]!);
    }

    // --- Actions ---
    function setSemanticColor(key: SemanticColorKey, value: ChromaticPalette) {
      config.value.colors[key] = value;
      _pushHistory();
    }

    function setNeutral(value: NeutralPalette) {
      config.value.neutral = value;
      _pushHistory();
    }

    function setRadius(value: number) {
      config.value.radius = value;
      _pushHistory();
    }

    function setFont(value: string) {
      config.value.font = value;
      _pushHistory();
    }

    function setTextOverride(
      mode: "light" | "dark",
      token: string,
      shade: NeutralShade,
    ) {
      const target =
        mode === "light"
          ? config.value.lightOverrides
          : config.value.darkOverrides;
      (target.text as Record<string, NeutralShade>)[token] = shade;
      _pushHistory();
    }

    function setBgOverride(
      mode: "light" | "dark",
      token: string,
      shade: NeutralShade,
    ) {
      const target =
        mode === "light"
          ? config.value.lightOverrides
          : config.value.darkOverrides;
      (target.bg as Record<string, NeutralShade>)[token] = shade;
      _pushHistory();
    }

    function setBorderOverride(
      mode: "light" | "dark",
      token: string,
      shade: NeutralShade,
    ) {
      const target =
        mode === "light"
          ? config.value.lightOverrides
          : config.value.darkOverrides;
      (target.border as Record<string, NeutralShade>)[token] = shade;
      _pushHistory();
    }

    function resetToDefaults() {
      config.value = cloneTheme(DEFAULT_THEME);
      _pushHistory();
    }

    function loadConfig(newConfig: ThemeConfig) {
      config.value = cloneTheme(newConfig);
      _pushHistory();
    }

    // --- Presets ---
    function savePreset(name: string) {
      const existing = savedPresets.value.findIndex((p) => p.name === name);
      const preset: ThemePreset = { name, config: cloneTheme(config.value) };
      if (existing >= 0) {
        savedPresets.value[existing] = preset;
      } else {
        savedPresets.value.push(preset);
      }
    }

    function deletePreset(name: string) {
      savedPresets.value = savedPresets.value.filter((p) => p.name !== name);
    }

    function loadPreset(preset: ThemePreset) {
      loadConfig(preset.config);
    }

    return {
      // State
      config,
      savedPresets,
      // History
      canUndo,
      canRedo,
      undo,
      redo,
      // Actions
      setSemanticColor,
      setNeutral,
      setRadius,
      setFont,
      setTextOverride,
      setBgOverride,
      setBorderOverride,
      resetToDefaults,
      loadConfig,
      // Presets
      savePreset,
      deletePreset,
      loadPreset,
    };
  },
  {
    persist: {
      pick: ["config", "savedPresets"],
    },
  },
);
