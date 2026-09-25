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

  test("follows editor navigation without reloading the page", async ({
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
      if (request.resourceType() !== "document") return;
      const url = new URL(request.url());
      documents.push(url.pathname + url.search);
    });

    // Index pages render in the editor itself, without the iframe
    await page.getByRole("link", { name: "Templates", exact: true }).first().click();
    await expect(page).toHaveURL(/\/templates$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Templates" }),
    ).toBeVisible();
    await expect(page.locator("iframe")).toHaveCount(0);

    // A demo page brings back a fresh iframe, which repeats the handshake
    await page.locator('a[href="/templates/dashboard"]').first().click();
    await expect(page).toHaveURL(/\/templates\/dashboard$/);
    const iframe = await page
      .locator('iframe[title="Theme preview"]')
      .elementHandle({ timeout: 30_000 });
    const content = await iframe!.contentFrame();
    await expect
      .poll(() => new URL(content!.url()).pathname, { timeout: 30_000 })
      .toBe("/templates/dashboard");
    await expect(frame.locator("main")).not.toBeEmpty();
    expect(documents).toEqual(["/preview"]);
  });
});

// The iframe document is noindex, so content that only shows up through it
// doesn't count for search engines. Pages meant to be indexed render in the
// editor's own document instead.
test.describe("Smoke - Indexable pages", () => {
  test.describe.configure({ timeout: 120_000 });

  for (const { path, heading } of [
    { path: "/", heading: /The visual theme editor/ },
    {
      path: "/learn/theming/customize-colors",
      heading: "How to Customize Nuxt UI Theme Colors",
    },
  ]) {
    test(`renders ${path} in the page itself`, async ({ page }) => {
      const documents: string[] = [];
      page.on("request", (request) => {
        if (request.resourceType() === "document") {
          documents.push(new URL(request.url()).pathname);
        }
      });

      await page.goto(path);
      await page.waitForSelector(
        '[data-testid="theme-editor"][data-hydrated="true"]',
        { state: "visible", timeout: 60_000 },
      );

      await expect(
        page.getByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
      await expect(page.locator("iframe")).toHaveCount(0);
      expect(documents).toEqual([path]);
    });
  }
});
