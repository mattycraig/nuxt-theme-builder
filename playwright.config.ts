import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

const isCI =
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.CI === "true";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/e2e/test-results",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [["html", { open: "never" }], ["github"]] : "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: isCI
      ? "[ -d .output ] || NITRO_PRESET=node-server NODE_OPTIONS=--max-old-space-size=8192 pnpm build; NITRO_HOST=0.0.0.0 NITRO_PORT=3000 node .output/server/index.mjs"
      : "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !isCI,
    timeout: 180_000,
  },
});
