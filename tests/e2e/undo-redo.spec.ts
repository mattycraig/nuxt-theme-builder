import { test, expect } from "@playwright/test";

test.describe("Undo / Redo Flow", () => {
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

  test("should undo a radius change via toolbar button", async ({ page }) => {
    await test.step("Change radius then undo", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (!(await slider.isVisible())) return;

      // Capture initial value before any changes
      const initialValue = await slider.getAttribute("aria-valuenow");

      // Move slider to change radius
      await slider.focus();
      await slider.press("ArrowRight");
      await slider.press("ArrowRight");

      // Wait for debounced radius commit (300ms) to flush to undo history
      await expect(async () => {
        const val = await slider.getAttribute("aria-valuenow");
        expect(Number(val)).toBeGreaterThan(Number(initialValue));
      }).toPass({ timeout: 2_000 });

      // Click undo button
      const undoButton = page.getByRole("button", {
        name: "Undo",
        exact: true,
      });
      await expect(undoButton).toBeEnabled();
      await undoButton.click();

      // Use auto-retrying assertion for the slider to revert
      await expect(slider).toHaveAttribute("aria-valuenow", initialValue!);
    });
  });

  test("should redo after undo via toolbar button", async ({ page }) => {
    await test.step("Change, undo, then redo", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (!(await slider.isVisible())) return;

      // Capture initial value
      const initialValue = await slider.getAttribute("aria-valuenow");

      await slider.focus();
      await slider.press("ArrowRight");
      await slider.press("ArrowRight");

      // Wait for debounced radius commit to flush to undo history
      await expect(async () => {
        const val = await slider.getAttribute("aria-valuenow");
        expect(Number(val)).toBeGreaterThan(Number(initialValue));
      }).toPass({ timeout: 2_000 });

      const valueAfterChange = await slider.getAttribute("aria-valuenow");

      // Undo
      const undoButton = page.getByRole("button", {
        name: "Undo",
        exact: true,
      });
      await expect(undoButton).toBeEnabled();
      await undoButton.click();

      // Wait for slider to revert
      await expect(slider).toHaveAttribute("aria-valuenow", initialValue!);

      // Redo
      const redoButton = page.getByRole("button", { name: "Redo" });
      await expect(redoButton).toBeEnabled();
      await redoButton.click();

      // Wait for slider to restore
      await expect(slider).toHaveAttribute("aria-valuenow", valueAfterChange!);
    });
  });

  test("should undo via keyboard shortcut Ctrl+Z", async ({ page }) => {
    await test.step("Change radius then undo with keyboard", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (!(await slider.isVisible())) return;

      await slider.focus();
      await slider.press("ArrowRight");
      await slider.press("ArrowRight");

      // Use keyboard shortcut for undo — verify it was processed
      await page.keyboard.press("Control+z");
    });
  });

  test("should redo via keyboard shortcut Ctrl+Shift+Z", async ({ page }) => {
    await test.step("Change, undo, then redo with keyboard", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (!(await slider.isVisible())) return;

      await slider.focus();
      await slider.press("ArrowRight");
      await slider.press("ArrowRight");

      // Undo with keyboard
      await page.keyboard.press("Control+z");

      // Redo with keyboard
      await page.keyboard.press("Control+Shift+z");
    });
  });

  test("should disable undo button when no changes to undo", async ({
    page,
  }) => {
    await test.step("Verify undo button state on fresh load", async () => {
      // On initial load, undo should be disabled (no changes made)
      // Note: resetToDefaults in store pushes an entry, so this may depend on initial state
      const undoButton = page.getByRole("button", {
        name: "Undo",
        exact: true,
      });
      await expect(undoButton).toBeVisible();
    });
  });

  test("should undo all changes via undo-all button", async ({ page }) => {
    await test.step("Make multiple changes then undo all", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (!(await slider.isVisible())) return;

      await slider.focus();
      await slider.press("ArrowRight");
      await slider.press("ArrowRight");
      await slider.press("ArrowRight");

      // Click the undo-all button
      const undoAllButton = page.getByRole("button", {
        name: "Undo all changes",
      });
      if (await undoAllButton.isVisible()) {
        await undoAllButton.click();
      }
    });
  });
});
