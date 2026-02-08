import { useThemeStore } from "~/stores/theme";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";
import { generateThemeCSS } from "~/utils/cssGenerator";

export function useThemeApply() {
  const store = useThemeStore();
  const appConfig = useAppConfig();

  // Targeted watch: only fires when color palette assignments change
  watch(
    () => ({
      primary: store.config.colors.primary,
      secondary: store.config.colors.secondary,
      success: store.config.colors.success,
      info: store.config.colors.info,
      warning: store.config.colors.warning,
      error: store.config.colors.error,
      neutral: store.config.neutral,
    }),
    (colors) => {
      if (appConfig.ui?.colors) {
        appConfig.ui.colors.primary = colors.primary;
        appConfig.ui.colors.secondary = colors.secondary;
        appConfig.ui.colors.success = colors.success;
        appConfig.ui.colors.info = colors.info;
        appConfig.ui.colors.warning = colors.warning;
        appConfig.ui.colors.error = colors.error;
        appConfig.ui.colors.neutral = colors.neutral;
      }
    },
    { immediate: true },
  );

  // Split CSS generation: font/radius changes independently from token overrides
  const layoutCSS = computed(() => {
    const cfg = store.config;
    return `:root {\n  --font-sans: '${cfg.font}', ui-sans-serif, system-ui, sans-serif;\n  --ui-radius: ${cfg.radius}rem;\n}`;
  });

  const tokenCSS = computed(() => {
    const { rootCSS, darkCSS } = generateThemeCSS(
      store.config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    return [rootCSS, darkCSS].filter(Boolean).join("\n");
  });

  const injectedCSS = computed(() => {
    return [layoutCSS.value, tokenCSS.value].filter(Boolean).join("\n");
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
