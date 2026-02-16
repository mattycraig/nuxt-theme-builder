import { test, expect } from "@playwright/test";

/**
 * Visual regression tests for UI components and layouts.
 *
 * These tests capture screenshots at different viewports to detect
 * unintended visual changes in the theme builder interface.
 *
 * Run with: pnpm test:e2e tests/e2e/visual/
 * Update baselines: pnpm test:e2e tests/e2e/visual/ --update-snapshots
 */

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

test.describe("Visual Regression - Home", () => {
  for (const viewport of viewports) {
    test(`home page at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Wait for any animations to settle
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(`home-${viewport.name}.png`, {
        fullPage: false,
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});

test.describe("Visual Regression - Editor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("editor sidebar desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);

    // Focus on the editor sidebar area
    const sidebar = page.locator('[data-testid="editor-sidebar"]').first();
    if (await sidebar.isVisible()) {
      await expect(sidebar).toHaveScreenshot("editor-sidebar.png", {
        maxDiffPixelRatio: 0.01,
      });
    }
  });

  test("color picker open state", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Try to open a color picker if available
    const colorButton = page.locator('[data-testid="color-picker-trigger"]').first();
    if (await colorButton.isVisible()) {
      await colorButton.click();
      await page.waitForTimeout(300);

      await expect(page).toHaveScreenshot("color-picker-open.png", {
        maxDiffPixelRatio: 0.02,
      });
    }
  });
});

test.describe("Visual Regression - Components Preview", () => {
  for (const viewport of viewports) {
    test(`components page at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/components");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(`components-${viewport.name}.png`, {
        fullPage: false,
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});

test.describe("Visual Regression - Blocks Preview", () => {
  test("blocks index page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/blocks");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot("blocks-index.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.01,
    });
  });
});

test.describe("Visual Regression - Dark Mode", () => {
  test("home page dark mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Toggle to dark mode if light
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot("home-dark.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("home page light mode", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Ensure light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
    });
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot("home-light.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.01,
    });
  });
});
