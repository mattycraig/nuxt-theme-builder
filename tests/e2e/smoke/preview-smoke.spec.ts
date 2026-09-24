import { test, expect } from "@playwright/test";

// Pages are prerendered without their query string, so an iframe pointed at
// `/components/button?preview` receives the editor's HTML (with its own nested
// iframe) and only switches to the preview layout after hydration. The editor
// avoids that by loading the prerendered `/preview` shell and navigating it.
test.describe("Smoke - Preview iframe", () => {
  test.describe.configure({ timeout: 120_000 });

  test("loads one iframe document and renders the page with the preview layout", async ({
    page,
  }) => {
    const documents: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() !== "document") return;
      const url = new URL(request.url());
      documents.push(url.pathname + url.search);
    });

    await page.goto("/components/button");
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 60_000 },
    );

    const frame = page.frameLocator('iframe[title="Theme preview"]');
    await expect(
      frame.getByRole("heading", { level: 1, name: "Button" }),
    ).toBeVisible({ timeout: 30_000 });
    await expect(frame.getByTestId("theme-editor")).toHaveCount(0);

    const iframe = await page
      .locator('iframe[title="Theme preview"]')
      .elementHandle();
    const content = await iframe!.contentFrame();
    expect(new URL(content!.url()).pathname).toBe("/components/button");
    expect(content!.childFrames()).toHaveLength(0);

    expect(documents).toEqual(["/components/button", "/preview"]);
  });

  test("follows editor navigation without reloading the iframe", async ({
    page,
  }) => {
    await page.goto("/components/button");
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 60_000 },
    );
    const frame = page.frameLocator('iframe[title="Theme preview"]');
    await expect(
      frame.getByRole("heading", { level: 1, name: "Button" }),
    ).toBeVisible({ timeout: 30_000 });

    const documents: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() === "document") documents.push(request.url());
    });

    await page.getByRole("link", { name: "Templates", exact: true }).first().click();
    await expect(page).toHaveURL(/\/templates$/);

    const iframe = await page
      .locator('iframe[title="Theme preview"]')
      .elementHandle();
    const content = await iframe!.contentFrame();
    await expect
      .poll(() => new URL(content!.url()).pathname, { timeout: 30_000 })
      .toBe("/templates");
    await expect(frame.locator("main")).not.toBeEmpty();
    expect(documents).toEqual([]);
  });
});
