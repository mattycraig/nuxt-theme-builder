import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { useThemeStore } from "~/stores/theme";
import { DEFAULT_THEME } from "~/utils/defaults";

/**
 * Tests for useThemeApply composable.
 *
 * This composable handles the runtime theme application by:
 * 1. Watching store changes and updating appConfig.ui.colors (semantic palettes)
 * 2. Generating and injecting CSS variables for radius, typography, and overrides
 *
 * Testing strategy: Mount a component that uses useThemeApply and verify
 * that store mutations propagate to appConfig and trigger CSS updates.
 */

describe("useThemeApply", () => {
  it("should apply default theme colors to appConfig on mount", async () => {
    const { useThemeApply } = await import("~/composables/useThemeApply");

    const wrapper = await mountSuspended(
      defineComponent({
        setup() {
          useThemeApply();
          const appConfig = useAppConfig();
          return { appConfig };
        },
        template: "<div>Test</div>",
      }),
    );

    const { appConfig } = wrapper.vm as unknown as {
      appConfig: { ui: { colors: Record<string, string> } };
    };

    // Verify default colors are applied
    expect(appConfig.ui?.colors?.primary).toBe(DEFAULT_THEME.colors.primary);
    expect(appConfig.ui?.colors?.secondary).toBe(
      DEFAULT_THEME.colors.secondary,
    );
    expect(appConfig.ui?.colors?.success).toBe(DEFAULT_THEME.colors.success);
    expect(appConfig.ui?.colors?.error).toBe(DEFAULT_THEME.colors.error);
    expect(appConfig.ui?.colors?.neutral).toBe(DEFAULT_THEME.neutral);
  });

  it("should update appConfig when store semantic colors change", async () => {
    const { useThemeApply } = await import("~/composables/useThemeApply");

    const wrapper = await mountSuspended(
      defineComponent({
        setup() {
          useThemeApply();
          const store = useThemeStore();
          const appConfig = useAppConfig();
          return { store, appConfig };
        },
        template: "<div>Test</div>",
      }),
    );

    const { store, appConfig } = wrapper.vm as unknown as {
      store: ReturnType<typeof useThemeStore>;
      appConfig: { ui: { colors: Record<string, string> } };
    };

    // Change primary color
    store.setSemanticColorForMode("light", "primary", "blue");
    await nextTick();

    expect(appConfig.ui?.colors?.primary).toBe("blue");
  });

  it("should update appConfig when neutral palette changes", async () => {
    const { useThemeApply } = await import("~/composables/useThemeApply");

    const wrapper = await mountSuspended(
      defineComponent({
        setup() {
          useThemeApply();
          const store = useThemeStore();
          const appConfig = useAppConfig();
          return { store, appConfig };
        },
        template: "<div>Test</div>",
      }),
    );

    const { store, appConfig } = wrapper.vm as unknown as {
      store: ReturnType<typeof useThemeStore>;
      appConfig: { ui: { colors: Record<string, string> } };
    };

    // Change neutral palette
    store.setNeutralForMode("light", "zinc");
    await nextTick();

    expect(appConfig.ui?.colors?.neutral).toBe("zinc");
  });

  it("should reactively update when multiple colors change", async () => {
    const { useThemeApply } = await import("~/composables/useThemeApply");

    const wrapper = await mountSuspended(
      defineComponent({
        setup() {
          useThemeApply();
          const store = useThemeStore();
          const appConfig = useAppConfig();
          return { store, appConfig };
        },
        template: "<div>Test</div>",
      }),
    );

    const { store, appConfig } = wrapper.vm as unknown as {
      store: ReturnType<typeof useThemeStore>;
      appConfig: { ui: { colors: Record<string, string> } };
    };

    // Change multiple colors
    store.setSemanticColorForMode("light", "primary", "indigo");
    store.setSemanticColorForMode("light", "secondary", "purple");
    store.setSemanticColorForMode("light", "success", "emerald");
    await nextTick();

    expect(appConfig.ui?.colors?.primary).toBe("indigo");
    expect(appConfig.ui?.colors?.secondary).toBe("purple");
    expect(appConfig.ui?.colors?.success).toBe("emerald");
  });
});
