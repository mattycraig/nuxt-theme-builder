import { describe, it, expect, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { useThemeStore } from "~/stores/theme";
import { DEFAULT_THEME } from "~/utils/defaults";

// Mock returns a ref — matches how the composable uses colorMode.value
// The real useColorMode() also has .preference and .forced, but this composable
// only reads .value, so a plain ref is sufficient here.
const colorModeRef = ref("light");
mockNuxtImport("useColorMode", () => {
  return () => colorModeRef;
});

describe("useThemeModeAccessors", () => {
  let store: ReturnType<typeof useThemeStore>;

  beforeEach(() => {
    store = useThemeStore();
    store.resetToDefaults();
    colorModeRef.value = "light";
  });

  it("mode returns 'light' when colorMode is light", () => {
    const { mode } = useThemeModeAccessors();
    expect(mode.value).toBe("light");
  });

  it("mode returns 'dark' when colorMode is dark", () => {
    colorModeRef.value = "dark";
    const { mode } = useThemeModeAccessors();
    expect(mode.value).toBe("dark");
  });

  it("mode defaults to 'light' for unexpected colorMode values", () => {
    colorModeRef.value = "auto";
    const { mode } = useThemeModeAccessors();
    expect(mode.value).toBe("light");
  });

  describe("light mode accessors", () => {
    it("currentColors returns light colors", () => {
      store.setSemanticColorForMode("light", "primary", "red");
      store.setSemanticColorForMode("dark", "primary", "blue");
      const { currentColors } = useThemeModeAccessors();
      expect(currentColors.value.primary).toBe("red");
    });

    it("currentColorShades returns light shades", () => {
      store.setSemanticShadeForMode("light", "primary", "400");
      store.setSemanticShadeForMode("dark", "primary", "600");
      const { currentColorShades } = useThemeModeAccessors();
      expect(currentColorShades.value.primary).toBe("400");
    });

    it("currentNeutral returns light neutral", () => {
      store.setNeutralForMode("light", "zinc");
      store.setNeutralForMode("dark", "stone");
      const { currentNeutral } = useThemeModeAccessors();
      expect(currentNeutral.value).toBe("zinc");
    });

    it("currentRadius returns light radius", () => {
      store.setRadiusForMode("light", 1.0);
      store.setRadiusForMode("dark", 0.5);
      const { currentRadius } = useThemeModeAccessors();
      expect(currentRadius.value).toBe(1.0);
    });

    it("currentFont returns light font", () => {
      store.setFontForMode("light", "Geist");
      store.setFontForMode("dark", "Lora");
      const { currentFont } = useThemeModeAccessors();
      expect(currentFont.value).toBe("Geist");
    });

    it("overrides returns lightOverrides", () => {
      store.setTextOverride("light", "dimmed", "300");
      const { overrides } = useThemeModeAccessors();
      expect(overrides.value.text.dimmed).toBe("300");
    });
  });

  describe("dark mode accessors", () => {
    beforeEach(() => {
      colorModeRef.value = "dark";
    });

    it("currentColors returns dark colors", () => {
      store.setSemanticColorForMode("light", "primary", "red");
      store.setSemanticColorForMode("dark", "primary", "blue");
      const { currentColors } = useThemeModeAccessors();
      expect(currentColors.value.primary).toBe("blue");
    });

    it("currentColorShades returns dark shades", () => {
      store.setSemanticShadeForMode("light", "primary", "400");
      store.setSemanticShadeForMode("dark", "primary", "600");
      const { currentColorShades } = useThemeModeAccessors();
      expect(currentColorShades.value.primary).toBe("600");
    });

    it("currentNeutral returns dark neutral", () => {
      store.setNeutralForMode("light", "zinc");
      store.setNeutralForMode("dark", "stone");
      const { currentNeutral } = useThemeModeAccessors();
      expect(currentNeutral.value).toBe("stone");
    });

    it("currentRadius returns dark radius", () => {
      store.setRadiusForMode("light", 1.0);
      store.setRadiusForMode("dark", 0.5);
      const { currentRadius } = useThemeModeAccessors();
      expect(currentRadius.value).toBe(0.5);
    });

    it("currentFont returns dark font", () => {
      store.setFontForMode("light", "Geist");
      store.setFontForMode("dark", "Lora");
      const { currentFont } = useThemeModeAccessors();
      expect(currentFont.value).toBe("Lora");
    });

    it("overrides returns darkOverrides", () => {
      store.setTextOverride("dark", "dimmed", "600");
      const { overrides } = useThemeModeAccessors();
      expect(overrides.value.text.dimmed).toBe("600");
    });
  });

  describe("reactivity", () => {
    it("updates when color mode changes", () => {
      store.setSemanticColorForMode("light", "primary", "red");
      store.setSemanticColorForMode("dark", "primary", "blue");

      const { currentColors } = useThemeModeAccessors();
      expect(currentColors.value.primary).toBe("red");

      colorModeRef.value = "dark";
      expect(currentColors.value.primary).toBe("blue");
    });

    it("updates when store config changes", () => {
      const { currentNeutral } = useThemeModeAccessors();
      expect(currentNeutral.value).toBe(DEFAULT_THEME.neutral);

      store.setNeutralForMode("light", "zinc");
      expect(currentNeutral.value).toBe("zinc");
    });
  });
});
