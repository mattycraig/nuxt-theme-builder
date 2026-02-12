import { test, expect } from "@playwright/test";

test.describe("Smoke - Core Theme Builder", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("theme");
      localStorage.removeItem("theme-builder");
      localStorage.removeItem("cookie-consent");
    });

    await page.goto("/");
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 30_000 },
    );
  });

  test("loads editor and applies a simple theme change", async ({ page }) => {
    const editor = page.getByTestId("theme-editor");
    await expect(editor).toBeVisible();

    const slider = page.getByRole("slider", { name: "Thumb" });
    await expect(slider).toBeVisible();

    const initialRadius = Number(await slider.getAttribute("aria-valuenow"));
    await slider.focus();
    await slider.press("ArrowRight");

    const newRadius = Number(await slider.getAttribute("aria-valuenow"));
    expect(newRadius).toBeGreaterThanOrEqual(initialRadius);
  });

  test("opens export panel and renders app config output", async ({ page }) => {
    await page
      .getByRole("button", { name: /Export/i })
      .first()
      .click();

    await expect(
      page.getByRole("heading", { name: "Export / Import" }),
    ).toBeVisible();
    await expect(
      page.getByRole("tab", { name: "app.config.ts" }),
    ).toBeVisible();
    await expect(page.getByText("export default")).toBeVisible();
  });

  test("navigates to a preview route from sidebar", async ({ page }) => {
    const templatesLink = page.getByRole("link", { name: "Templates" }).first();
    await expect(templatesLink).toBeVisible();
    await templatesLink.click();
    await expect(page).toHaveURL(/\/templates/);
  });
});
