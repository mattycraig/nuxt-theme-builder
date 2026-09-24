import { test, expect, type Page } from "@playwright/test";

// No addInitScript storage reset here: it would run again on reload() and
// wipe the very state these tests check. Each test gets a fresh context.
test.describe("Smoke - Persistence across reloads", () => {
  test.describe.configure({ timeout: 120_000 });

  async function waitForEditor(page: Page) {
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 60_000 },
    );
  }

  async function readThemeCookie(page: Page) {
    const cookie = (await page.context().cookies()).find(
      (c) => c.name === "theme",
    );
    return cookie ? JSON.parse(decodeURIComponent(cookie.value)) : null;
  }

  test("keeps saved themes after a reload", async ({ page }) => {
    await page.goto("/");
    await waitForEditor(page);

    await page.getByRole("button", { name: "Save as new theme" }).click();
    await page.getByLabel("Theme name").fill("Persisted Theme");
    await page.getByRole("button", { name: "Save" }).click();
    const savedTheme = page.getByRole("button", {
      name: /Load theme: Persisted Theme/,
    });
    await expect(savedTheme).toBeVisible();

    await page.reload();
    await waitForEditor(page);

    await expect(savedTheme).toBeVisible();
  });

  test("undo after a reload returns to the reloaded theme, not the defaults", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForEditor(page);
    const lucky = page.getByRole("button", { name: /I'm feeling lucky/ });

    await lucky.click();
    await expect
      .poll(async () => (await readThemeCookie(page))?.config.font)
      .toBeTruthy();
    await page.reload();
    await waitForEditor(page);
    const reloaded = (await readThemeCookie(page)).config;

    await lucky.click();
    await expect
      .poll(async () => (await readThemeCookie(page))?.config)
      .not.toEqual(reloaded);
    await page.keyboard.press("ControlOrMeta+z");

    await expect
      .poll(async () => (await readThemeCookie(page))?.config)
      .toEqual(reloaded);
  });
});
