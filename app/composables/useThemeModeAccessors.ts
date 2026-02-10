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

  const currentColors = computed(() =>
    mode.value === "light" ? store.config.colors : store.config.darkColors,
  );

  const currentColorShades = computed(() =>
    mode.value === "light"
      ? store.config.colorShades
      : store.config.darkColorShades,
  );

  const currentNeutral = computed(() =>
    mode.value === "light" ? store.config.neutral : store.config.darkNeutral,
  );

  const currentRadius = computed(() =>
    mode.value === "light" ? store.config.radius : store.config.darkRadius,
  );

  const currentFont = computed(() =>
    mode.value === "light" ? store.config.font : store.config.darkFont,
  );

  const overrides = computed(() =>
    mode.value === "light"
      ? store.config.lightOverrides
      : store.config.darkOverrides,
  );

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
