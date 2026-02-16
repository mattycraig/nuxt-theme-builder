import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    environmentOptions: {
      nuxt: {
        domEnvironment: "happy-dom",
      },
    },
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      reportsDirectory: "coverage",
      include: ["app/**/*.{ts,vue}"],
      exclude: [
        "app/types/**",
        "app/assets/**",
        "app/data/**",
        // Presentational-only: pure Tailwind/demo templates with no testable logic
        "app/components/blocks/**",
        "app/components/showcase/**",
        "app/components/learn/**",
        // Pages and layouts are integration/E2E targets, not unit-testable
        "app/pages/**",
        "app/layouts/**",
        // Root app shell
        "app/app.vue",
        "app/app.config.ts",
        // Layout shell components — structural wrappers, E2E verified
        "app/components/layout/**",
        // Preview infrastructure — iframe/overlay management, E2E verified
        "app/components/preview/**",
      ],
      thresholds: {
        lines: 70,
        functions: 65,
        branches: 60,
        statements: 70,
      },
    },
  },
});
