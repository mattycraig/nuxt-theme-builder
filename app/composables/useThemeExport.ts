import { useThemeStore } from "~/stores/theme";
import { ThemeConfigSchema, SEMANTIC_COLOR_KEYS } from "~/types/theme";
import type { ThemeConfig } from "~/types/theme";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";
import {
  generateOverrideLines,
  generateShadeOverrideLines,
} from "~/utils/cssGenerator";

/**
 * Composable for exporting, importing, and sharing theme configurations.
 *
 * Provides computed export strings in three formats:
 * - `appConfigExport` — Nuxt `app.config.ts` with color palette assignments
 * - `cssExport` — Tailwind CSS v4 stylesheet with custom properties
 * - `jsonExport` — Raw JSON of the full ThemeConfig
 *
 * Also provides `importJSON()` for loading a config from pasted JSON,
 * and `downloadFile()` for triggering browser file downloads.
 */
export function useThemeExport() {
  const store = useThemeStore();

  const appConfigExport = computed(() => {
    const cfg = store.config;
    const hasShadeOverrides = SEMANTIC_COLOR_KEYS.some(
      (k) => cfg.colorShades[k] !== "500",
    );
    const lines: string[] = [];
    lines.push(`export default defineAppConfig({`);
    lines.push(`  ui: {`);
    lines.push(`    colors: {`);
    lines.push(`      primary: '${cfg.colors.primary}',`);
    lines.push(`      secondary: '${cfg.colors.secondary}',`);
    lines.push(`      success: '${cfg.colors.success}',`);
    lines.push(`      info: '${cfg.colors.info}',`);
    lines.push(`      warning: '${cfg.colors.warning}',`);
    lines.push(`      error: '${cfg.colors.error}',`);
    lines.push(`      neutral: '${cfg.neutral}',`);
    lines.push(`    },`);
    lines.push(`  },`);
    lines.push(`})`);
    if (hasShadeOverrides) {
      lines.push(``);
      lines.push(
        `// Shade overrides — add the CSS variables from the CSS export to your main.css`,
      );
      for (const key of SEMANTIC_COLOR_KEYS) {
        if (cfg.colorShades[key] !== "500") {
          lines.push(
            `// ${key}: ${cfg.colors[key]}-${cfg.colorShades[key]} (shifted from default 500)`,
          );
        }
      }
    }
    return lines.join("\n");
  });

  const cssExport = computed(() => {
    const cfg = store.config;
    const lines: string[] = [];

    lines.push(`@import "tailwindcss";`);
    lines.push(`@import "@nuxt/ui";`);
    lines.push(``);

    // @theme for font (Tailwind v4 convention)
    lines.push(`@theme {`);
    lines.push(
      `  --font-sans: '${cfg.font}', ui-sans-serif, system-ui, sans-serif;`,
    );
    lines.push(`}`);
    lines.push(``);

    // :root overrides
    const rootOverrideLines = generateOverrideLines(
      cfg.lightOverrides,
      DEFAULT_LIGHT_OVERRIDES,
    );
    const shadeOverrideLines = generateShadeOverrideLines(
      cfg.colors,
      cfg.colorShades,
    );
    const rootLines: string[] = [`  --ui-radius: ${cfg.radius}rem;`];
    rootLines.push(...rootOverrideLines);
    rootLines.push(...shadeOverrideLines);

    if (rootLines.length > 0) {
      lines.push(`:root {`);
      lines.push(...rootLines);
      lines.push(`}`);
      lines.push(``);
    }

    // .dark overrides
    const darkOverrideLines = generateOverrideLines(
      cfg.darkOverrides,
      DEFAULT_DARK_OVERRIDES,
    );

    if (darkOverrideLines.length > 0) {
      lines.push(`.dark {`);
      lines.push(...darkOverrideLines);
      lines.push(`}`);
    }

    return lines.join("\n");
  });

  const jsonExport = computed(() => {
    return JSON.stringify(store.config, null, 2);
  });

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

  function downloadFile(
    content: string,
    filename: string,
    mimeType: string = "text/plain",
  ) {
    if (!import.meta.client) return;
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    appConfigExport,
    cssExport,
    jsonExport,
    importJSON,
    downloadFile,
  };
}
