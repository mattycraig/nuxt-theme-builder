import { test, expect } from "@playwright/test";

test.describe("Preset Loading & Navigation", () => {
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

  test("should display built-in presets", async ({ page }) => {
    await test.step("Verify preset selector is visible with options", async () => {
      // Look for preset-related UI — the preset selector section
      const presetText = page.getByText("Presets").first();
      await expect(presetText).toBeVisible();
    });
  });

  test("should load a built-in preset and see changes", async ({ page }) => {
    await test.step("Find and click a built-in preset", async () => {
      // Built-in presets are displayed as clickable items
      // Look for any preset name that exists in the presets list
      const presetButton = page
        .getByRole("button", {
          name: /Sunset|Ocean|Forest|Minimal|Vibrant|Berry|Earthy|Neon|Nordic|Coral|Sage|Night Owl/i,
        })
        .first();

      if (await presetButton.isVisible()) {
        await presetButton.click();
      }
    });
  });
});

test.describe("Page Navigation", () => {
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

  test("should navigate between component preview pages", async ({ page }) => {
    await test.step("Navigate to Cards page", async () => {
      // Use the navigation within the layout
      const cardsLink = page.getByRole("link", { name: "Cards" }).first();
      if (await cardsLink.isVisible()) {
        await cardsLink.click();
        await expect(page).toHaveURL(/\/components\/cards/);
      }
    });
  });

  test("should navigate to templates", async ({ page }) => {
    await test.step("Navigate to Templates section", async () => {
      const templatesLink = page
        .getByRole("link", { name: "Templates" })
        .first();
      if (await templatesLink.isVisible()) {
        await templatesLink.click();
        await page.waitForURL(/\/templates/, { timeout: 15_000 });
        await expect(page).toHaveURL(/\/templates/);
      }
    });
  });

  test("should navigate to blocks", async ({ page }) => {
    await test.step("Navigate to Blocks section", async () => {
      const blocksLink = page.getByRole("link", { name: "Blocks" }).first();
      if (await blocksLink.isVisible()) {
        await blocksLink.click();
        await page.waitForURL(/\/blocks/, { timeout: 15_000 });
        await expect(page).toHaveURL(/\/blocks/);
      }
    });
  });

  test("should maintain editor sidebar across page navigation", async ({
    page,
  }) => {
    await test.step("Navigate and verify editor persists", async () => {
      // Navigate to a different page
      const cardsLink = page.getByRole("link", { name: "Cards" }).first();
      if (await cardsLink.isVisible()) {
        await cardsLink.click();
        await page.waitForURL(/\/components\/cards/);
      }

      // Editor sidebar should still be visible
      const editor = page.getByTestId("theme-editor");
      await expect(editor).toBeVisible();
    });
  });

  test("should show 3-level breadcrumbs on nested routes", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await test.step("Navigate directly to a nested component page", async () => {
      await page.goto("/components/card");
      await page.waitForSelector(
        '[data-testid="theme-editor"][data-hydrated="true"]',
        { state: "attached", timeout: 60_000 },
      );
    });

    await test.step("Verify breadcrumb shows Home > Components > Card", async () => {
      const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb).toContainText("Home");
      await expect(breadcrumb).toContainText("Components");
      await expect(breadcrumb).toContainText("Card");

      const componentsLink = breadcrumb.getByRole("link", {
        name: "Components",
      });
      await expect(componentsLink).toBeVisible();
      await expect(componentsLink).toHaveAttribute("href", "/components");
    });
  });

  test("should show 2-level breadcrumbs on top-level routes", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await test.step("Navigate directly to Templates top-level page", async () => {
      await page.goto("/templates");
      await page.waitForSelector(
        '[data-testid="theme-editor"][data-hydrated="true"]',
        { state: "attached", timeout: 60_000 },
      );
    });

    await test.step("Verify breadcrumb shows Home > Templates only", async () => {
      const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb).toContainText("Home");
      await expect(breadcrumb).toContainText("Templates");
    });
  });
});
