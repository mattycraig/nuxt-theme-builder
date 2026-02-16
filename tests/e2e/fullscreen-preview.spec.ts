import { test, expect } from "@playwright/test";

test.describe("Fullscreen Preview", () => {
  test.describe.configure({ timeout: 90_000 });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("theme");
      localStorage.removeItem("theme-builder");
    });
    await page.goto("/");
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 60_000 },
    );
  });

  test("should open and close fullscreen preview", async ({ page }) => {
    await test.step("Open fullscreen via toolbar button", async () => {
      const expandButton = page.getByRole("button", {
        name: "Expand preview to fullscreen",
      });
      await expect(expandButton).toBeVisible();
      await expandButton.click();
    });

    await test.step("Verify fullscreen overlay is visible", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      await expect(dialog).toBeVisible();

      // Toolbar should be present
      const toolbar = dialog.getByRole("toolbar", {
        name: "Fullscreen preview controls",
      });
      await expect(toolbar).toBeVisible();

      // Exit button should be present
      const exitButton = dialog.getByRole("button", {
        name: "Exit fullscreen preview",
      });
      await expect(exitButton).toBeVisible();
    });

    await test.step("Close fullscreen via exit button", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      const exitButton = dialog.getByRole("button", {
        name: "Exit fullscreen preview",
      });
      await exitButton.click();
      await expect(dialog).not.toBeVisible();
    });
  });

  test("should close fullscreen with Escape key", async ({ page }) => {
    await test.step("Open fullscreen", async () => {
      await page
        .getByRole("button", { name: "Expand preview to fullscreen" })
        .click();
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      await expect(dialog).toBeVisible();
    });

    await test.step("Press Escape to close", async () => {
      await page.keyboard.press("Escape");
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      await expect(dialog).not.toBeVisible();
    });
  });

  test("should show width controls in fullscreen", async ({ page }) => {
    await test.step("Open fullscreen", async () => {
      await page
        .getByRole("button", { name: "Expand preview to fullscreen" })
        .click();
    });

    await test.step("Verify width preset buttons exist", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      const mobileButton = dialog.getByRole("button", { name: "Mobile" });
      const tabletButton = dialog.getByRole("button", { name: "Tablet" });
      const desktopButton = dialog.getByRole("button", { name: "Desktop" });

      await expect(mobileButton).toBeVisible();
      await expect(tabletButton).toBeVisible();
      await expect(desktopButton).toBeVisible();
    });

    await test.step("Switch to mobile width", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      await dialog.getByRole("button", { name: "Mobile" }).click();

      // Width label should update in the viewport settings button
      const widthButton = dialog.getByRole("button", {
        name: /Viewport settings/,
      });
      await expect(widthButton).toContainText("375px");
    });

    await test.step("Switch to tablet width", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      await dialog.getByRole("button", { name: "Tablet" }).click();

      const widthButton = dialog.getByRole("button", {
        name: /Viewport settings/,
      });
      await expect(widthButton).toContainText("768px");
    });
  });

  test("should contain an iframe for the preview", async ({ page }) => {
    await test.step("Open fullscreen", async () => {
      await page
        .getByRole("button", { name: "Expand preview to fullscreen" })
        .click();
    });

    await test.step("Verify iframe is present", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      const iframe = dialog.locator("iframe");
      await expect(iframe).toBeVisible();
      await expect(iframe).toHaveAttribute(
        "title",
        "Theme preview — fullscreen",
      );
    });
  });

  test("should show current page label in fullscreen toolbar", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await test.step("Navigate to a template page", async () => {
      // Navigate to dashboard template first
      await page.goto("/templates/dashboard");
      await page.waitForSelector(
        '[data-testid="theme-editor"][data-hydrated="true"]',
        { state: "visible", timeout: 60_000 },
      );
    });

    await test.step("Open fullscreen and verify page label", async () => {
      await page
        .getByRole("button", { name: "Expand preview to fullscreen" })
        .click();
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText("Dashboard");
    });
  });

  test("should toggle between preview and source code in fullscreen", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await test.step("Navigate to a template page with source", async () => {
      await page.goto("/templates/dashboard");
      await page.waitForSelector(
        '[data-testid="theme-editor"][data-hydrated="true"]',
        { state: "visible", timeout: 60_000 },
      );
    });

    await test.step("Open fullscreen", async () => {
      await page
        .getByRole("button", { name: "Expand preview to fullscreen" })
        .click();
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      await expect(dialog).toBeVisible();
    });

    await test.step("Switch to source code view", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      const sourceButton = dialog.getByRole("button", {
        name: "View source code",
      });
      await sourceButton.click();
      await expect(sourceButton).toHaveAttribute("aria-pressed", "true");
    });

    await test.step("Switch back to preview", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      const previewButton = dialog.getByLabel("Preview", { exact: true });
      await previewButton.click();
      await expect(previewButton).toHaveAttribute("aria-pressed", "true");
    });
  });

  test("should show color mode toggle in fullscreen", async ({ page }) => {
    await test.step("Open fullscreen", async () => {
      await page
        .getByRole("button", { name: "Expand preview to fullscreen" })
        .click();
    });

    await test.step("Verify color mode switch is present", async () => {
      const dialog = page.getByRole("dialog", {
        name: "Fullscreen preview",
      });
      const colorModeSwitch = dialog.getByRole("switch");
      await expect(colorModeSwitch).toBeVisible();
    });
  });
});
