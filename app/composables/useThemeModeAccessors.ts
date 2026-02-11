import type { ThemeConfig } from "~/types/theme";

/**
 * Provides mode-aware computed accessors for the current theme settings.
 * Reads from the light or dark config branch based on the active color mode.
 */
export function useThemeModeAccessors() {
  const store = useThemeStore();
  const colorMode = useColorMode();

  const mode = computed<"light" | "dark">(() =>
    colorMode.value === "dark" ? "dark" : "light",
  );

  /** Pick the light or dark config field based on current mode */
  function modeField<K extends keyof ThemeConfig>(lightKey: K, darkKey: K) {
    return computed(
      () => store.config[mode.value === "light" ? lightKey : darkKey],
    );
  }

  const currentColors = modeField("colors", "darkColors");
  const currentColorShades = modeField("colorShades", "darkColorShades");
  const currentNeutral = modeField("neutral", "darkNeutral");
  const currentRadius = modeField("radius", "darkRadius");
  const currentFont = modeField("font", "darkFont");
  const overrides = modeField("lightOverrides", "darkOverrides");

  return {
    mode,
    currentColors,
    currentColorShades,
    currentNeutral,
    currentRadius,
    currentFont,
    overrides,
  };
}
