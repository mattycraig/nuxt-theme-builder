import { useThemeStore } from "~/stores/theme";
import { ThemeConfigSchema } from "~/types/theme";
import type { ThemeConfig } from "~/types/theme";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";
import { generateExportCSS } from "~/utils/cssGenerator";
import { generateAppConfigExport } from "~/utils/appConfigGenerator";
import { generateDesignTokens, generateTailwindTheme } from "~/utils/tokenExport";
import { downloadFile } from "~/utils/helpers";

/**
 * Composable for exporting, importing, and sharing theme configurations.
 *
 * Provides computed export strings in five formats:
 * - `appConfigExport` — Nuxt `app.config.ts` with color palette assignments
 * - `cssExport` — Tailwind CSS v4 stylesheet with custom properties
 * - `jsonExport` — Raw JSON of the full ThemeConfig
 * - `designTokensExport` — Design Tokens JSON (Tokens Studio / Figma) for both modes
 * - `tailwindExport` — Standalone Tailwind CSS v4 theme for projects without Nuxt UI
 *
 * Also provides `importJSON()` for loading a config from pasted JSON,
 * and `downloadFile()` for triggering browser file downloads.
 */
export function useThemeExport() {
  const store = useThemeStore();

  const appConfigExport = computed(() =>
    generateAppConfigExport(store.config),
  );

  const cssExport = computed(() =>
    generateExportCSS(
      store.config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    ),
  );

  const jsonExport = computed(() => {
    return JSON.stringify(store.config, null, 2);
  });

  const designTokensExport = computed(() => generateDesignTokens(store.config));

  const tailwindExport = computed(() => generateTailwindTheme(store.config));

  function importJSON(json: string): { success: boolean; error?: string } {
    try {
      const raw = JSON.parse(json);
      const result = ThemeConfigSchema.safeParse(raw);
      if (!result.success) {
        const issues = result.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ");
        return {
          success: false,
          error: `Invalid theme JSON: ${issues}`,
        };
      }
      store.loadConfig(result.data as ThemeConfig);
      return { success: true };
    } catch (e: unknown) {
      return {
        success: false,
        error: `Failed to parse JSON: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  return {
    appConfigExport,
    cssExport,
    jsonExport,
    designTokensExport,
    tailwindExport,
    importJSON,
    downloadFile,
  };
}
