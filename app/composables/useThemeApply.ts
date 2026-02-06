import { useThemeStore } from "~/stores/theme";
import { shadeToCSS } from "~/utils/defaults";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";

/**
 * Reactively applies the current theme store state to the DOM.
 *
 * Strategy:
 * 1. Palette colors (primary, secondary, etc.) → mutate useAppConfig().ui.colors
 *    (Nuxt UI's built-in runtime plugin handles CSS variable injection automatically)
 * 2. Radius, font, and token overrides → inject via useHead() computed style
 */
export function useThemeApply() {
  const store = useThemeStore();
  const appConfig = useAppConfig();

  // --- 1. Sync semantic color palette mappings → app.config ---
  watchEffect(() => {
    const cfg = store.config;
    if (appConfig.ui?.colors) {
      appConfig.ui.colors.primary = cfg.colors.primary;
      appConfig.ui.colors.secondary = cfg.colors.secondary;
      appConfig.ui.colors.success = cfg.colors.success;
      appConfig.ui.colors.info = cfg.colors.info;
      appConfig.ui.colors.warning = cfg.colors.warning;
      appConfig.ui.colors.error = cfg.colors.error;
      appConfig.ui.colors.neutral = cfg.neutral;
    }
  });

  // --- 2. Inject radius, font, and token overrides via <style> ---
  const injectedCSS = computed(() => {
    const cfg = store.config;
    const lines: string[] = [];

    // :root overrides (light mode + global)
    lines.push(`:root {`);
    lines.push(
      `  --font-sans: '${cfg.font}', ui-sans-serif, system-ui, sans-serif;`,
    );
    lines.push(`  --ui-radius: ${cfg.radius}rem;`);

    // Light text overrides
    const lt = cfg.lightOverrides.text;
    const dlt = DEFAULT_LIGHT_OVERRIDES.text as unknown as Record<
      string,
      string
    >;
    for (const [key, shade] of Object.entries(lt)) {
      if (shade !== dlt[key]) {
        const varName = key === "default" ? "--ui-text" : `--ui-text-${key}`;
        lines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }

    // Light bg overrides
    const lb = cfg.lightOverrides.bg;
    const dlb = DEFAULT_LIGHT_OVERRIDES.bg as unknown as Record<string, string>;
    for (const [key, shade] of Object.entries(lb)) {
      if (shade !== dlb[key]) {
        const varName = key === "default" ? "--ui-bg" : `--ui-bg-${key}`;
        lines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }

    // Light border overrides
    const lbr = cfg.lightOverrides.border;
    const dlbr = DEFAULT_LIGHT_OVERRIDES.border as unknown as Record<
      string,
      string
    >;
    for (const [key, shade] of Object.entries(lbr)) {
      if (shade !== dlbr[key]) {
        const varName =
          key === "default" ? "--ui-border" : `--ui-border-${key}`;
        lines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }

    lines.push(`}`);

    // .dark overrides
    lines.push(`.dark {`);

    // Dark text overrides
    const dt = cfg.darkOverrides.text;
    const ddt = DEFAULT_DARK_OVERRIDES.text as unknown as Record<
      string,
      string
    >;
    for (const [key, shade] of Object.entries(dt)) {
      if (shade !== ddt[key]) {
        const varName = key === "default" ? "--ui-text" : `--ui-text-${key}`;
        lines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }

    // Dark bg overrides
    const db = cfg.darkOverrides.bg;
    const ddb = DEFAULT_DARK_OVERRIDES.bg as unknown as Record<string, string>;
    for (const [key, shade] of Object.entries(db)) {
      if (shade !== ddb[key]) {
        const varName = key === "default" ? "--ui-bg" : `--ui-bg-${key}`;
        lines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }

    // Dark border overrides
    const dbr = cfg.darkOverrides.border;
    const ddbr = DEFAULT_DARK_OVERRIDES.border as unknown as Record<
      string,
      string
    >;
    for (const [key, shade] of Object.entries(dbr)) {
      if (shade !== ddbr[key]) {
        const varName =
          key === "default" ? "--ui-border" : `--ui-border-${key}`;
        lines.push(`  ${varName}: ${shadeToCSS(shade as string)};`);
      }
    }

    lines.push(`}`);

    return lines.join("\n");
  });

  useHead({
    style: [
      {
        key: "theme-overrides",
        innerHTML: injectedCSS,
      },
    ],
  });
}
