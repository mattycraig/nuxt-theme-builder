import type {
  ThemeConfig,
  ThemePreset,
  SemanticColorKey,
  AnyPalette,
  NeutralPalette,
  NeutralShade,
  TextTokenKey,
  BgTokenKey,
  BorderTokenKey,
} from "~/types/theme";
import { ThemeConfigSchema } from "~/types/theme";
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

    // Mode-aware setters for per-light/dark settings ─────────────────

    function setSemanticColorForMode(
      mode: "light" | "dark",
      key: SemanticColorKey,
      value: AnyPalette,
    ) {
      if (mode === "light") {
        config.value.colors[key] = value;
      } else {
        config.value.darkColors[key] = value;
      }
      _pushHistory();
    }

    function setSemanticShadeForMode(
      mode: "light" | "dark",
      key: SemanticColorKey,
      shade: NeutralShade,
    ) {
      if (mode === "light") {
        config.value.colorShades[key] = shade;
      } else {
        config.value.darkColorShades[key] = shade;
      }
      _pushHistory();
    }

    function setNeutralForMode(mode: "light" | "dark", value: NeutralPalette) {
      if (mode === "light") {
        config.value.neutral = value;
      } else {
        config.value.darkNeutral = value;
      }
      _pushHistory();
    }

    function setRadiusForMode(mode: "light" | "dark", value: number) {
      if (mode === "light") {
        config.value.radius = value;
      } else {
        config.value.darkRadius = value;
      }
      _pushHistory();
    }

    function setRadiusVisualForMode(mode: "light" | "dark", value: number) {
      if (mode === "light") {
        config.value.radius = value;
      } else {
        config.value.darkRadius = value;
      }
    }

    function setFontForMode(mode: "light" | "dark", value: string) {
      if (mode === "light") {
        config.value.font = value;
      } else {
        config.value.darkFont = value;
      }
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

    // Config Management ──────────────────────────────────────────────

    function resetToDefaults() {
      config.value = cloneTheme(DEFAULT_THEME);
      activePresetName.value = "";
      _pushHistory();
      historyBaseIndex.value = historyIndex.value;
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

    /** Silently update config from iframe sync — no history push */
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
      config,
      savedPresets,
      activePresetName,
      hasUnsavedChanges,
      canUndo,
      canUndoAll,
      canRedo,
      undo,
      undoAll,
      redo,
      setSemanticColorForMode,
      setSemanticShadeForMode,
      setNeutralForMode,
      setRadiusForMode,
      setRadiusVisualForMode,
      setFontForMode,
      setTextOverride,
      setBgOverride,
      setBorderOverride,
      resetToDefaults,
      loadConfig,
      _syncConfig,
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
