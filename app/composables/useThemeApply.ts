import { useThemeStore } from "~/stores/theme";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";
import { generateThemeCSS } from "~/utils/cssGenerator";

export function useThemeApply() {
  const store = useThemeStore();
  const appConfig = useAppConfig();

  // Nuxt UI's appConfig.ui.colors controls the base (light mode) palette assignment.
  // Dark mode palette differences are handled entirely via CSS variable overrides in .dark {}.
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

  // CSS injection covers radius, font, token overrides, shade-shifted palette overrides,
  // AND dark-mode-specific palette/neutral/radius/font overrides
  const injectedCSS = computed(() => {
    const { rootCSS, darkCSS } = generateThemeCSS(
      store.config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    return [rootCSS, darkCSS].filter(Boolean).join("\n");
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
