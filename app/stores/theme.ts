import type {
  ThemeConfig,
  ThemePreset,
  SemanticColorKey,
  ChromaticPalette,
  NeutralPalette,
  NeutralShade,
  TextTokenKey,
  BgTokenKey,
  BorderTokenKey,
} from "~/types/theme";
import { ThemeConfigSchema } from "~/types/theme";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";

const MAX_HISTORY = 50;

export const useThemeStore = defineStore(
  "theme",
  () => {
    const config = ref<ThemeConfig>(cloneTheme(DEFAULT_THEME));
    const savedPresets = ref<ThemePreset[]>([]);

    const history = ref<ThemeConfig[]>([cloneTheme(DEFAULT_THEME)]);
    const historyIndex = ref(0);

    function _pushHistory() {
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
      token: TextTokenKey,
      shade: NeutralShade,
    ) {
      const target =
        mode === "light"
          ? config.value.lightOverrides
          : config.value.darkOverrides;
      target.text[token] = shade;
      _pushHistory();
    }

    function setBgOverride(
      mode: "light" | "dark",
      token: BgTokenKey,
      shade: NeutralShade,
    ) {
      const target =
        mode === "light"
          ? config.value.lightOverrides
          : config.value.darkOverrides;
      target.bg[token] = shade;
      _pushHistory();
    }

    function setBorderOverride(
      mode: "light" | "dark",
      token: BorderTokenKey,
      shade: NeutralShade,
    ) {
      const target =
        mode === "light"
          ? config.value.lightOverrides
          : config.value.darkOverrides;
      target.border[token] = shade;
      _pushHistory();
    }

    function resetToDefaults() {
      config.value = cloneTheme(DEFAULT_THEME);
      _pushHistory();
    }

    function loadConfig(newConfig: ThemeConfig) {
      const result = ThemeConfigSchema.safeParse(newConfig);
      if (!result.success) {
        console.warn(
          "Invalid theme config passed to loadConfig, falling back to defaults:",
          result.error.issues,
        );
        config.value = cloneTheme(DEFAULT_THEME);
      } else {
        config.value = cloneTheme(result.data);
      }
      _pushHistory();
    }

    /** Silently update config from iframe sync — no history push */
    function _syncConfig(newConfig: ThemeConfig) {
      config.value = cloneTheme(newConfig);
    }

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
      config,
      savedPresets,
      canUndo,
      canRedo,
      undo,
      redo,
      setSemanticColor,
      setNeutral,
      setRadius,
      setFont,
      setTextOverride,
      setBgOverride,
      setBorderOverride,
      resetToDefaults,
      loadConfig,
      _syncConfig,
      savePreset,
      deletePreset,
      loadPreset,
    };
  },
  {
    persist: {
      pick: ["config", "savedPresets"],
      afterHydrate(ctx) {
        const result = ThemeConfigSchema.safeParse(ctx.store.config);
        if (!result.success) {
          console.warn(
            "Persisted theme config is invalid (schema changed?), resetting to defaults:",
            result.error.issues,
          );
          ctx.store.config = cloneTheme(DEFAULT_THEME);
        }
      },
    },
  },
);
