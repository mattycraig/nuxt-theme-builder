import { useThemeStore } from "~/stores/theme";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";
import { generateThemeCSS } from "~/utils/cssGenerator";

export function useThemeApply() {
  const store = useThemeStore();
  const appConfig = useAppConfig();

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
