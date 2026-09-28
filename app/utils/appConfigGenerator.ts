import { SEMANTIC_COLOR_KEYS } from "~/types/theme";
import type { ThemeConfig } from "~/types/theme";

/**
 * Serialize a theme's palette assignments as a Nuxt `app.config.ts`, with
 * comments pointing at the CSS export for anything app config can't express
 * (custom palettes, shade shifts, dark-mode palettes).
 */
export function generateAppConfigExport(cfg: ThemeConfig): string {
  const hasShadeOverrides = SEMANTIC_COLOR_KEYS.some(
    (k) => cfg.colorShades[k] !== "500",
  );
  const hasDarkColorDiffs = SEMANTIC_COLOR_KEYS.some(
    (k) =>
      cfg.darkColors[k] !== cfg.colors[k] ||
      cfg.darkColorShades[k] !== cfg.colorShades[k],
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
  const customPaletteNames = (cfg.customPalettes ?? []).map((p) => p.name);
  if (customPaletteNames.length > 0) {
    lines.push(``);
    lines.push(
      `// Custom palettes (${customPaletteNames.join(", ")}) — add the @theme static block from the CSS export to your main.css`,
    );
  }
  if (hasShadeOverrides || hasDarkColorDiffs) {
    lines.push(``);
    lines.push(
      `// Dark mode and shade overrides — add the CSS variables from the CSS export to your main.css`,
    );
  }
  if (hasDarkColorDiffs) {
    lines.push(`// Dark mode uses different palettes:`);
    for (const key of SEMANTIC_COLOR_KEYS) {
      if (cfg.darkColors[key] !== cfg.colors[key]) {
        lines.push(
          `//   ${key}: ${cfg.darkColors[key]} (light: ${cfg.colors[key]})`,
        );
      }
    }
  }
  if (hasShadeOverrides) {
    for (const key of SEMANTIC_COLOR_KEYS) {
      if (cfg.colorShades[key] !== "500") {
        lines.push(
          `// ${key}: ${cfg.colors[key]}-${cfg.colorShades[key]} (shifted from default 500)`,
        );
      }
    }
  }
  return lines.join("\n");
}
