import { test, expect } from "@playwright/test";

test.describe("Export Flow", () => {
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

  test("should open export panel and show export tabs", async ({ page }) => {
    await test.step("Click Export / Import button", async () => {
      const exportButton = page
        .getByRole("button", { name: /Export/i })
        .first();
      await exportButton.click();
    });

    await test.step("Verify export panel is visible with tabs", async () => {
      await expect(
        page.getByRole("heading", { name: "Export / Import" }),
      ).toBeVisible();

      // Check the export tabs are present
      await expect(page.getByText("app.config.ts")).toBeVisible();
      await expect(page.getByRole("tab", { name: "CSS" })).toBeVisible();
      await expect(page.getByRole("tab", { name: "JSON" })).toBeVisible();
    });
  });

  test("should display app.config.ts export content by default", async ({
    page,
  }) => {
    await test.step("Open export panel", async () => {
      await page
        .getByRole("button", { name: /Export/i })
        .first()
        .click();
    });

    await test.step("Verify app.config code is visible", async () => {
      // app.config.ts tab should be active by default and show code
      await expect(page.getByText("export default")).toBeVisible();
    });
  });

  test("should switch between export tabs", async ({ page }) => {
    await test.step("Open export panel", async () => {
      await page
        .getByRole("button", { name: /Export/i })
        .first()
        .click();
    });

    await test.step("Switch to CSS tab", async () => {
      await page.getByRole("tab", { name: "CSS" }).click();
      // CSS output should contain CSS custom properties
      await expect(page.getByText("--ui-")).toBeVisible();
    });

    await test.step("Switch to JSON tab", async () => {
      await page.getByRole("tab", { name: "JSON" }).click();
      // JSON output should contain JSON structure
      await expect(page.getByText('"colors"')).toBeVisible();
    });

    await test.step("Switch back to app.config.ts tab", async () => {
      await page.getByText("app.config.ts").click();
      await expect(page.getByText("export default")).toBeVisible();
    });
  });

  test("should close export panel", async ({ page }) => {
    await test.step("Open then close export panel", async () => {
      await page
        .getByRole("button", { name: /Export/i })
        .first()
        .click();
      await expect(
        page.getByRole("heading", { name: "Export / Import" }),
      ).toBeVisible();

      // Close using the close button
      const closeButton = page.getByRole("button", {
        name: "Close panel",
      });
      await closeButton.click();

      // Panel should be closed
      await expect(
        page.getByRole("heading", { name: "Export / Import" }),
      ).not.toBeVisible();
    });
  });
});
