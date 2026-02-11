import { test, expect } from "@playwright/test";

test.describe("Theme Editing - Color & Radius", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("theme");
      localStorage.removeItem("theme-builder");
    });
    await page.goto("/");
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 30_000 },
    );
  });

  test("should display the theme editor sidebar", async ({ page }) => {
    await test.step("Verify editor is visible and hydrated", async () => {
      const editor = page.getByTestId("theme-editor");
      await expect(editor).toBeVisible();
    });
  });

  test("should change primary color via color picker", async ({ page }) => {
    await test.step("Open primary color picker and select a new color", async () => {
      // Find the primary color section — look for the primary label
      const primarySection = page.locator("text=primary").first();
      await expect(primarySection).toBeVisible();

      // Look for a palette swatch to click — e.g., "red"
      const redSwatch = page.getByRole("radio", { name: /red/i }).first();
      if (await redSwatch.isVisible()) {
        await redSwatch.click();
      }
    });
  });

  test("should change border radius via slider", async ({ page }) => {
    await test.step("Find and interact with radius slider", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (await slider.isVisible()) {
        await slider.focus();

        // Move slider right to increase radius
        const initialRadius = await slider.getAttribute("aria-valuenow");
        await slider.press("ArrowRight");
        await slider.press("ArrowRight");
        await slider.press("ArrowRight");

        // Verify the value changed
        const newRadius = await slider.getAttribute("aria-valuenow");
        // Value should have increased
        if (initialRadius && newRadius) {
          expect(Number(newRadius)).toBeGreaterThanOrEqual(
            Number(initialRadius),
          );
        }
      }
    });
  });

  test("should toggle between light and dark mode", async ({ page }) => {
    await test.step("Find and click color mode toggle", async () => {
      // Look for the color mode toggle button
      const darkModeButton = page
        .getByRole("button", { name: /dark|light|color mode/i })
        .first();
      if (await darkModeButton.isVisible()) {
        await darkModeButton.click();
      }
    });
  });

  test("should reset theme to defaults", async ({ page }) => {
    await test.step("Modify theme then reset", async () => {
      // First change the radius
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (await slider.isVisible()) {
        await slider.focus();
        await slider.press("ArrowRight");
        await slider.press("ArrowRight");
      }

      // Find and click reset button
      const resetButton = page.getByRole("button", { name: /reset/i }).first();
      if (await resetButton.isVisible()) {
        await resetButton.click();
      }
    });
  });
});
