import type {
  ThemeConfig,
  ThemePreset,
  SemanticColorKey,
  AnyPalette,
  ChromaticPalette,
  NeutralPalette,
  NeutralShade,
  TextTokenKey,
  BgTokenKey,
  BorderTokenKey,
} from "~/types/theme";
import {
  ThemeConfigSchema,
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  SEMANTIC_COLOR_KEYS,
  FONT_OPTIONS,
} from "~/types/theme";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";

const MAX_HISTORY = 50;

/**
 * Central theme store — single source of truth for all design token configuration.
 * Supports undo/redo, named presets, and localStorage persistence.
 */

export const useThemeStore = defineStore(
  "theme",
  () => {
    // State ──────────────────────────────────────────────────────────

    const config = ref<ThemeConfig>(cloneTheme(DEFAULT_THEME));
    const savedPresets = shallowRef<ThemePreset[]>([]);
    const activePresetName = ref<string>("");

    // Undo / Redo History ────────────────────────────────────────────

    const history = shallowRef<ThemeConfig[]>([cloneTheme(DEFAULT_THEME)]);
    const historyIndex = ref(0);
    /**
     * Snapshot index used by `undoAll()` to jump back to the state
     * when the user last loaded a config, preset, or reset to defaults.
     * Updated in `loadConfig`, `loadPreset`, and `resetToDefaults`.
     */
    const historyBaseIndex = ref(0);

    function _pushHistory() {
      const newHistory = history.value.slice(0, historyIndex.value + 1);
      newHistory.push(cloneTheme(config.value));
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
        if (historyBaseIndex.value > 0) historyBaseIndex.value--;
      } else {
        historyIndex.value++;
      }
      history.value = newHistory;
    }

    const canUndo = computed(() => historyIndex.value > 0);
    const canUndoAll = computed(
      () => historyIndex.value > historyBaseIndex.value,
    );
    const canRedo = computed(
      () => historyIndex.value < history.value.length - 1,
    );

    const hasUnsavedChanges = computed(() => {
      if (!activePresetName.value) return false;
      const active = savedPresets.value.find(
        (p) => p.name === activePresetName.value,
      );
      if (!active) return false;
      return JSON.stringify(config.value) !== JSON.stringify(active.config);
    });

    function undo() {
      if (!canUndo.value) return;
      historyIndex.value--;
      config.value = cloneTheme(history.value[historyIndex.value]!);
    }

    function undoAll() {
      if (!canUndoAll.value) return;
      const target = Math.max(historyBaseIndex.value, 0);
      if (historyIndex.value === target) return;
      historyIndex.value = target;
      config.value = cloneTheme(history.value[target]!);
    }

    function redo() {
      if (!canRedo.value) return;
      historyIndex.value++;
      config.value = cloneTheme(history.value[historyIndex.value]!);
    }

    // Setters (each pushes history for undo support) ────────────────

    /** Resolve the config field for light vs dark mode */
    function _modeField<K extends keyof ThemeConfig>(
      mode: "light" | "dark",
      lightKey: K,
      darkKey: K,
    ): K {
      return mode === "light" ? lightKey : darkKey;
    }

    function _overrides(mode: "light" | "dark") {
      return mode === "light"
        ? config.value.lightOverrides
        : config.value.darkOverrides;
    }

    function setSemanticColorForMode(
      mode: "light" | "dark",
      key: SemanticColorKey,
      value: AnyPalette,
    ) {
      config.value[_modeField(mode, "colors", "darkColors")][key] = value;
      _pushHistory();
    }

    function setSemanticShadeForMode(
      mode: "light" | "dark",
      key: SemanticColorKey,
      shade: NeutralShade,
    ) {
      config.value[_modeField(mode, "colorShades", "darkColorShades")][key] =
        shade;
      _pushHistory();
    }

    function setNeutralForMode(mode: "light" | "dark", value: NeutralPalette) {
      config.value[_modeField(mode, "neutral", "darkNeutral")] = value;
      _pushHistory();
    }

    function setRadiusForMode(mode: "light" | "dark", value: number) {
      config.value[_modeField(mode, "radius", "darkRadius")] = value;
      _pushHistory();
    }

    /** Update radius without creating history entry (used during drag) */
    function setRadiusVisualForMode(mode: "light" | "dark", value: number) {
      config.value[_modeField(mode, "radius", "darkRadius")] = value;
    }

    function setFontForMode(mode: "light" | "dark", value: string) {
      config.value[_modeField(mode, "font", "darkFont")] = value;
      _pushHistory();
    }

    function setTextOverride(
      mode: "light" | "dark",
      token: TextTokenKey,
      shade: NeutralShade,
    ) {
      _overrides(mode).text[token] = shade;
      _pushHistory();
    }

    function setBgOverride(
      mode: "light" | "dark",
      token: BgTokenKey,
      shade: NeutralShade,
    ) {
      _overrides(mode).bg[token] = shade;
      _pushHistory();
    }

    function setBorderOverride(
      mode: "light" | "dark",
      token: BorderTokenKey,
      shade: NeutralShade,
    ) {
      _overrides(mode).border[token] = shade;
      _pushHistory();
    }

    // Config Management ──────────────────────────────────────────────

    function resetToDefaults() {
      config.value = cloneTheme(DEFAULT_THEME);
      activePresetName.value = "Default";
      _pushHistory();
      historyBaseIndex.value = historyIndex.value;
    }

    function randomizeTheme() {
      const pick = <T>(arr: readonly T[]): T =>
        arr[Math.floor(Math.random() * arr.length)]!;
      const randRadius = +(Math.random() * 1.5).toFixed(3);
      const font = pick(FONT_OPTIONS);
      const neutral = pick(NEUTRAL_PALETTES);

      // Constrain semantic roles to sensible color spectrums
      const SEMANTIC_SPECTRUM: Partial<
        Record<SemanticColorKey, readonly ChromaticPalette[]>
      > = {
        success: ["lime", "green", "emerald", "teal"],
        info: ["cyan", "sky", "blue", "indigo"],
        warning: ["yellow", "amber", "orange"],
        error: ["red", "rose", "pink", "fuchsia"],
      };

      const pickForKey = (key: SemanticColorKey) =>
        pick(SEMANTIC_SPECTRUM[key] ?? CHROMATIC_PALETTES);

      const lightColors = {} as Record<string, string>;
      const darkColors = {} as Record<string, string>;
      for (const key of SEMANTIC_COLOR_KEYS) {
        lightColors[key] = pickForKey(key);
        darkColors[key] = pickForKey(key);
      }

      config.value = {
        ...cloneTheme(DEFAULT_THEME),
        colors: lightColors as ThemeConfig["colors"],
        darkColors: darkColors as ThemeConfig["darkColors"],
        neutral,
        darkNeutral: pick(NEUTRAL_PALETTES),
        radius: randRadius,
        darkRadius: randRadius,
        font,
        darkFont: font,
      };
      activePresetName.value = "";
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
        config.value = cloneTheme(result.data as ThemeConfig);
      }
      _pushHistory();
      historyBaseIndex.value = historyIndex.value;
    }

    /**
     * Silently update config from iframe sync — no history push.
     *
     * Unlike `loadConfig`, this is for continuous sync (e.g., parent
     * pushing theme changes to the preview iframe) where each update
     * must not pollute the undo history or reset the undo-all anchor.
     */
    function _syncConfig(newConfig: unknown) {
      const result = ThemeConfigSchema.safeParse(newConfig);
      if (!result.success) return;
      config.value = cloneTheme(result.data as ThemeConfig);
    }

    // Preset CRUD ────────────────────────────────────────────────────

    function savePreset(name: string): { isUpdate: boolean } {
      const now = Date.now();
      const existing = savedPresets.value.findIndex((p) => p.name === name);
      const isUpdate = existing >= 0;
      const preset: ThemePreset = {
        name,
        config: cloneTheme(config.value),
        createdAt: isUpdate
          ? (savedPresets.value[existing]!.createdAt ?? now)
          : now,
        updatedAt: now,
      };
      const updated = [...savedPresets.value];
      if (isUpdate) {
        updated[existing] = preset;
      } else {
        updated.push(preset);
      }
      savedPresets.value = updated;
      activePresetName.value = name;
      return { isUpdate };
    }

    function duplicatePreset(sourceName: string): { newName: string } {
      const source = savedPresets.value.find((p) => p.name === sourceName);
      if (!source) throw new Error(`Preset "${sourceName}" not found`);
      const existingNames = new Set(savedPresets.value.map((p) => p.name));
      let newName = `Copy of ${sourceName}`;
      let counter = 1;
      while (existingNames.has(newName)) {
        counter++;
        newName = `Copy of ${sourceName} (${counter})`;
      }
      const now = Date.now();
      const preset: ThemePreset = {
        name: newName,
        config: cloneTheme(source.config),
        createdAt: now,
        updatedAt: now,
      };
      savedPresets.value = [...savedPresets.value, preset];
      return { newName };
    }

    function deletePreset(name: string) {
      if (activePresetName.value === name) {
        activePresetName.value = "";
      }
      savedPresets.value = savedPresets.value.filter((p) => p.name !== name);
    }

    function renamePreset(
      oldName: string,
      newName: string,
    ): { success: boolean; error?: string } {
      const trimmed = newName.trim();
      if (!trimmed) return { success: false, error: "Name cannot be empty" };
      const duplicate = savedPresets.value.some(
        (p) => p.name === trimmed && p.name !== oldName,
      );
      if (duplicate)
        return {
          success: false,
          error: `A theme named "${trimmed}" already exists`,
        };
      const updated = [...savedPresets.value];
      const idx = updated.findIndex((p) => p.name === oldName);
      if (idx < 0) return { success: false, error: "Theme not found" };
      updated[idx] = {
        ...updated[idx],
        name: trimmed,
        updatedAt: Date.now(),
      } as ThemePreset;
      savedPresets.value = updated;
      if (activePresetName.value === oldName) {
        activePresetName.value = trimmed;
      }
      return { success: true };
    }

    function loadPreset(preset: ThemePreset) {
      const result = ThemeConfigSchema.safeParse(preset.config);
      if (!result.success) {
        console.warn(
          "Invalid preset config, skipping load:",
          result.error.issues,
        );
        return;
      }
      config.value = cloneTheme(result.data as ThemeConfig);
      activePresetName.value = preset.name;
      _pushHistory();
      historyBaseIndex.value = historyIndex.value;
    }

    // Public API ─────────────────────────────────────────────────────

    return {
      // State
      config,
      savedPresets,
      activePresetName,
      hasUnsavedChanges,

      // History
      canUndo,
      canUndoAll,
      canRedo,
      undo,
      undoAll,
      redo,

      // Per-field setters
      setSemanticColorForMode,
      setSemanticShadeForMode,
      setNeutralForMode,
      setRadiusForMode,
      setRadiusVisualForMode,
      setFontForMode,
      setTextOverride,
      setBgOverride,
      setBorderOverride,

      // Config management
      resetToDefaults,
      randomizeTheme,
      loadConfig,
      _syncConfig,

      // Preset CRUD
      savePreset,
      duplicatePreset,
      deletePreset,
      renamePreset,
      loadPreset,
    };
  },
  {
    persist: {
      pick: ["config", "savedPresets", "activePresetName"],
      afterHydrate(ctx) {
        const result = ThemeConfigSchema.safeParse(ctx.store.config);
        if (!result.success) {
          console.warn(
            "Persisted theme config is invalid (schema changed?), resetting to defaults:",
            result.error.issues,
          );
          ctx.store.config = cloneTheme(DEFAULT_THEME);
        } else {
          ctx.store.config = cloneTheme(result.data as ThemeConfig);
        }

        if (Array.isArray(ctx.store.savedPresets)) {
          const valid = ctx.store.savedPresets.filter(
            (p: ThemePreset) =>
              p?.name && ThemeConfigSchema.safeParse(p.config).success,
          );
          if (valid.length !== ctx.store.savedPresets.length) {
            console.warn(
              `Removed ${ctx.store.savedPresets.length - valid.length} invalid saved preset(s) on hydration.`,
            );
            ctx.store.savedPresets = valid;
          }
        }
      },
    },
  },
);
