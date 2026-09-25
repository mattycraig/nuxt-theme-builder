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

  test("keeps a custom palette assigned to primary after a reload", async ({
    page,
  }) => {
    // Resolve --ui-primary inside the preview iframe to an rgb() value
    const previewPrimary = () =>
      page
        .frameLocator("iframe")
        .first()
        .locator("body")
        .evaluate(() => {
          const probe = document.createElement("div");
          probe.style.backgroundColor = "var(--ui-primary)";
          document.body.appendChild(probe);
          const value = getComputedStyle(probe).backgroundColor;
          probe.remove();
          return value;
        })
        .catch(() => "");

    // Only demo routes render in the preview iframe
    await page.goto("/components/button");
    await waitForEditor(page);

    await page.getByRole("button", { name: "New palette" }).click();
    const form = page.getByRole("form", { name: "New custom palette" });
    await form.getByRole("textbox", { name: "Base color" }).fill("#f5c518");
    await form.getByRole("button", { name: "Create" }).click();
    await page.getByRole("button", { name: "Actions for brand" }).click();
    await page.getByRole("menuitem", { name: "Use for" }).hover();
    await page.getByRole("menuitem", { name: "Primary" }).click();

    await expect
      .poll(previewPrimary, { timeout: 30_000 })
      .toBe("rgb(245, 197, 24)");

    await page.reload();
    await waitForEditor(page);

    const config = (await readThemeCookie(page)).config;
    expect(config.customPalettes).toEqual([
      { name: "brand", color: "#f5c518" },
    ]);
    expect(config.colors.primary).toBe("brand");
    await expect
      .poll(previewPrimary, { timeout: 30_000 })
      .toBe("rgb(245, 197, 24)");
  });
});

