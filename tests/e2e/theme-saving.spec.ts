import { test, expect } from "@playwright/test";

test.describe("Theme Saving - Unified Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("theme");
      localStorage.removeItem("theme-builder");
    });
    await page.goto("/");
    // Wait for Vue hydration — data-hydrated is set in onMounted
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 30_000 },
    );
  });

  test("should show empty state in My Themes with toolbar hint", async ({
    page,
  }) => {
    await test.step("Verify empty state UI", async () => {
      const emptyText = page.getByText("No saved themes yet.");
      await expect(emptyText).toBeVisible();

      const hintText = page.getByText(
        "button in the toolbar to save your current theme",
      );
      await expect(hintText).toBeVisible();
    });

    await test.step("Screenshot empty state", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/my-themes-empty-state.png",
        fullPage: false,
      });
    });
  });

  test("should save a new theme via toolbar save button", async ({ page }) => {
    await test.step("Click toolbar save button to open modal", async () => {
      const saveButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveButton.click();

      await expect(page.getByText("Save theme")).toBeVisible();
      const nameInput = page.getByLabel("Theme name");
      await expect(nameInput).toBeVisible();
    });

    await test.step("Type theme name and save", async () => {
      await page.getByLabel("Theme name").fill("Test Theme");
      await page.getByRole("button", { name: "Save" }).click();
    });

    await test.step("Verify theme appears in My Themes list", async () => {
      await expect(
        page.getByRole("button", { name: /Load theme: Test Theme/ }),
      ).toBeVisible();
    });

    await test.step("Screenshot saved theme", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/my-themes-with-saved-theme.png",
        fullPage: false,
      });
    });
  });

  test("should show overwrite warning in save modal for duplicate name", async ({
    page,
  }) => {
    await test.step("Save an initial theme via toolbar", async () => {
      const saveButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveButton.click();
      await page.getByLabel("Theme name").fill("Duplicate Test");
      await page.getByRole("button", { name: "Save" }).click();
    });

    await test.step("Open 'Save as new' button", async () => {
      const saveAsButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveAsButton.click();
    });

    await test.step("Type duplicate name and verify warning", async () => {
      await page.getByLabel("Theme name").fill("Duplicate Test");

      const warning = page.getByText('Will overwrite "Duplicate Test"');
      await expect(warning).toBeVisible();

      const updateButton = page.getByRole("button", { name: "Update" });
      await expect(updateButton).toBeVisible();
    });

    await test.step("Screenshot overwrite warning", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/save-modal-overwrite-warning.png",
        fullPage: false,
      });
    });
  });

  test("should show dropdown menu with theme actions", async ({ page }) => {
    await test.step("Save a theme first", async () => {
      const saveButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveButton.click();
      await page.getByLabel("Theme name").fill("Menu Test Theme");
      await page.getByRole("button", { name: "Save" }).click();
    });

    await test.step("Open dropdown menu on saved theme", async () => {
      const actionsButton = page.getByRole("button", {
        name: "Actions for Menu Test Theme",
      });
      await actionsButton.click();
    });

    await test.step("Verify dropdown items", async () => {
      await expect(
        page.getByRole("menuitem", { name: "Rename" }),
      ).toBeVisible();
      await expect(
        page.getByRole("menuitem", { name: "Duplicate" }),
      ).toBeVisible();
      await expect(
        page.getByRole("menuitem", { name: "Download JSON" }),
      ).toBeVisible();
      await expect(
        page.getByRole("menuitem", { name: "Delete" }),
      ).toBeVisible();
    });

    await test.step("Screenshot dropdown menu", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/my-themes-dropdown-menu.png",
        fullPage: false,
      });
    });
  });

  test("should show active theme indicator after saving", async ({ page }) => {
    await test.step("Save and verify active state", async () => {
      const saveButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveButton.click();
      await page.getByLabel("Theme name").fill("Active Theme");
      await page.getByRole("button", { name: "Save" }).click();

      await expect(
        page.getByRole("button", { name: /Load theme: Active Theme/ }),
      ).toBeVisible();
    });

    await test.step("Screenshot active theme state", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/my-themes-active-indicator.png",
        fullPage: false,
      });
    });
  });

  test("should rename theme via modal", async ({ page }) => {
    await test.step("Save a theme then open rename modal", async () => {
      const saveButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveButton.click();
      await page.getByLabel("Theme name").fill("Rename Me");
      await page.getByRole("button", { name: "Save" }).click();

      const actionsButton = page.getByRole("button", {
        name: "Actions for Rename Me",
      });
      await actionsButton.click();
      await page.getByRole("menuitem", { name: "Rename" }).click();
    });

    await test.step("Verify rename modal opens with current name", async () => {
      await expect(page.getByText("Rename theme")).toBeVisible();
      const renameInput = page.getByLabel("Rename theme: Rename Me");
      await expect(renameInput).toBeVisible();
      await expect(renameInput).toHaveValue("Rename Me");

      const renameButton = page.getByRole("button", { name: "Rename" });
      await expect(renameButton).toBeVisible();
    });

    await test.step("Rename the theme", async () => {
      const renameInput = page.getByLabel("Rename theme: Rename Me");
      await renameInput.clear();
      await renameInput.fill("Renamed Theme");
      await page.getByRole("button", { name: "Rename" }).click();
    });

    await test.step("Verify renamed theme appears", async () => {
      await expect(
        page.getByRole("button", { name: /Load theme: Renamed Theme/ }),
      ).toBeVisible();
    });

    await test.step("Screenshot rename result", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/my-themes-rename-result.png",
        fullPage: false,
      });
    });
  });

  test("should show delete confirmation modal", async ({ page }) => {
    await test.step("Save and trigger delete", async () => {
      const saveButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveButton.click();
      await page.getByLabel("Theme name").fill("Delete Me");
      await page.getByRole("button", { name: "Save" }).click();

      const actionsButton = page.getByRole("button", {
        name: "Actions for Delete Me",
      });
      await actionsButton.click();
      await page.getByRole("menuitem", { name: "Delete" }).click();
    });

    await test.step("Verify delete modal", async () => {
      await expect(
        page.getByText("Are you sure you want to delete"),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Delete" }).last(),
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
    });

    await test.step("Screenshot delete modal", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/my-themes-delete-modal.png",
        fullPage: false,
      });
    });
  });

  test("should show active theme name and save-as button in toolbar", async ({
    page,
  }) => {
    await test.step("Save initial theme via toolbar", async () => {
      const saveButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveButton.click();
      await page.getByLabel("Theme name").fill("Quick Save Test");
      await page.getByRole("button", { name: "Save" }).click();
      await expect(
        page.getByRole("button", { name: /Load theme: Quick Save Test/ }),
      ).toBeVisible();
    });

    await test.step("Verify toolbar shows active theme name and save-as button", async () => {
      const saveAsButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await expect(saveAsButton).toBeVisible();
    });

    await test.step("Screenshot toolbar with active theme", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/toolbar-active-theme-save.png",
        fullPage: false,
      });
    });
  });

  test("should show Modified badge on active theme with unsaved changes", async ({
    page,
  }) => {
    await test.step("Save a theme", async () => {
      const saveButton = page.getByRole("button", {
        name: "Save as new theme",
      });
      await saveButton.click();
      await page.getByLabel("Theme name").fill("Modified Test");
      await page.getByRole("button", { name: "Save" }).click();
    });

    await test.step("Modify theme to trigger unsaved state", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      await slider.focus();
      await slider.press("ArrowRight");
    });

    await test.step("Verify unsaved changes indicator appears", async () => {
      const unsavedIndicator = page.getByRole("status", {
        name: /unsaved changes/i,
      });
      await expect(unsavedIndicator).toBeVisible();
    });

    await test.step("Screenshot unsaved changes indicator", async () => {
      await page.screenshot({
        path: "tests/e2e/screenshots/my-themes-modified-badge.png",
        fullPage: false,
      });
    });
  });
});
