import { useThemeStore } from "~/stores/theme";
import type { ThemeConfig } from "~/types/theme";
import {
  shadeToCSS,
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";

/**
 * Composable for exporting, importing, and sharing theme configurations.
 */
export function useThemeExport() {
  const store = useThemeStore();

  // --- Export: app.config.ts ---
  const appConfigExport = computed(() => {
    const cfg = store.config;
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
    return lines.join("\n");
  });

  // --- Export: CSS file ---
  const cssExport = computed(() => {
    const cfg = store.config;
    const lines: string[] = [];

    lines.push(`@import "tailwindcss";`);
    lines.push(`@import "@nuxt/ui";`);
    lines.push(``);

    // @theme for font
    lines.push(`@theme {`);
    lines.push(
      `  --font-sans: '${cfg.font}', ui-sans-serif, system-ui, sans-serif;`,
    );
    lines.push(`}`);
    lines.push(``);

    // :root overrides
    const rootLines: string[] = [];
    rootLines.push(`  --ui-radius: ${cfg.radius}rem;`);

    // Light text
    for (const [key, shade] of Object.entries(cfg.lightOverrides.text)) {
      if (
        shade !==
        (DEFAULT_LIGHT_OVERRIDES.text as unknown as Record<string, string>)[key]
      ) {
        const varName = key === "default" ? "--ui-text" : `--ui-text-${key}`;
        rootLines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }
    // Light bg
    for (const [key, shade] of Object.entries(cfg.lightOverrides.bg)) {
      if (
        shade !==
        (DEFAULT_LIGHT_OVERRIDES.bg as unknown as Record<string, string>)[key]
      ) {
        const varName = key === "default" ? "--ui-bg" : `--ui-bg-${key}`;
        rootLines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }
    // Light border
    for (const [key, shade] of Object.entries(cfg.lightOverrides.border)) {
      if (
        shade !==
        (DEFAULT_LIGHT_OVERRIDES.border as unknown as Record<string, string>)[
          key
        ]
      ) {
        const varName =
          key === "default" ? "--ui-border" : `--ui-border-${key}`;
        rootLines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }

    if (rootLines.length > 0) {
      lines.push(`:root {`);
      lines.push(...rootLines);
      lines.push(`}`);
      lines.push(``);
    }

    // .dark overrides
    const darkLines: string[] = [];
    for (const [key, shade] of Object.entries(cfg.darkOverrides.text)) {
      if (
        shade !==
        (DEFAULT_DARK_OVERRIDES.text as unknown as Record<string, string>)[key]
      ) {
        const varName = key === "default" ? "--ui-text" : `--ui-text-${key}`;
        darkLines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }
    for (const [key, shade] of Object.entries(cfg.darkOverrides.bg)) {
      if (
        shade !==
        (DEFAULT_DARK_OVERRIDES.bg as unknown as Record<string, string>)[key]
      ) {
        const varName = key === "default" ? "--ui-bg" : `--ui-bg-${key}`;
        darkLines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }
    for (const [key, shade] of Object.entries(cfg.darkOverrides.border)) {
      if (
        shade !==
        (DEFAULT_DARK_OVERRIDES.border as unknown as Record<string, string>)[
          key
        ]
      ) {
        const varName =
          key === "default" ? "--ui-border" : `--ui-border-${key}`;
        darkLines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }

    if (darkLines.length > 0) {
      lines.push(`.dark {`);
      lines.push(...darkLines);
      lines.push(`}`);
    }

    return lines.join("\n");
  });

  // --- Export: JSON ---
  const jsonExport = computed(() => {
    return JSON.stringify(store.config, null, 2);
  });

  // --- Import: JSON ---
  function importJSON(json: string): { success: boolean; error?: string } {
    try {
      const parsed = JSON.parse(json) as ThemeConfig;
      // Basic validation
      if (!parsed.colors || !parsed.neutral || parsed.radius === undefined) {
        return {
          success: false,
          error:
            "Invalid theme JSON: missing required fields (colors, neutral, radius).",
        };
      }
      store.loadConfig(parsed);
      return { success: true };
    } catch (e: unknown) {
      return {
        success: false,
        error: `Failed to parse JSON: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }

  // --- URL Hash sharing ---
  // (Removed share URL helpers: encodeToHash, decodeFromHash, getShareURL)

  // --- Download helper ---
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
