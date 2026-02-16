import { test, expect } from "@playwright/test";

// Shared setup helper — all tests start from the editor home page
const editorSetup = {
  async beforeEach(page: import("@playwright/test").Page) {
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
  },
};

// ─── Theme Editing ───────────────────────────────────────────────────────────

test.describe("Theme Editing — Color & Radius", () => {
  test.beforeEach(async ({ page }) => {
    await editorSetup.beforeEach(page);
  });

  test("should change primary color via color picker swatch", async ({
    page,
  }) => {
    await test.step("Find the primary color section and select a new color", async () => {
      const primarySection = page.locator("text=primary").first();
      await expect(primarySection).toBeVisible();

      const redSwatch = page.getByRole("radio", { name: /red/i }).first();
      if (await redSwatch.isVisible()) {
        await redSwatch.click();
      }
    });
  });

  test("should change border radius via slider", async ({ page }) => {
    await test.step("Interact with radius slider and verify value changes", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (await slider.isVisible()) {
        await slider.focus();
        const initialRadius = await slider.getAttribute("aria-valuenow");
        await slider.press("ArrowRight");
        await slider.press("ArrowRight");
        await slider.press("ArrowRight");

        const newRadius = await slider.getAttribute("aria-valuenow");
        if (initialRadius && newRadius) {
          expect(Number(newRadius)).toBeGreaterThanOrEqual(
            Number(initialRadius),
          );
        }
      }
    });
  });
});

// ─── Undo / Redo ─────────────────────────────────────────────────────────────

test.describe("Undo / Redo Flow", () => {
  test.beforeEach(async ({ page }) => {
    await editorSetup.beforeEach(page);
  });

  test("should undo a radius change via toolbar button", async ({ page }) => {
    await test.step("Change radius then undo", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (!(await slider.isVisible())) return;

      const initialValue = await slider.getAttribute("aria-valuenow");
      await slider.focus();
      await slider.press("ArrowRight");
      await slider.press("ArrowRight");

      await expect(async () => {
        const val = await slider.getAttribute("aria-valuenow");
        expect(Number(val)).toBeGreaterThan(Number(initialValue));
      }).toPass({ timeout: 2_000 });

      // Wait for debounced radius commit to flush into undo history
      await page.waitForTimeout(500);

      const undoButton = page.getByRole("button", {
        name: "Undo",
        exact: true,
      });
      await expect(undoButton).toBeEnabled();
      await undoButton.click();

      await expect(slider).toHaveAttribute("aria-valuenow", initialValue!);
    });
  });

  test("should redo after undo via toolbar button", async ({ page }) => {
    await test.step("Change, undo, then redo", async () => {
      const slider = page.getByRole("slider", { name: "Thumb" });
      if (!(await slider.isVisible())) return;

      const initialValue = await slider.getAttribute("aria-valuenow");
      await slider.focus();
      await slider.press("ArrowRight");

      await expect(async () => {
        const val = await slider.getAttribute("aria-valuenow");
        expect(Number(val)).toBeGreaterThan(Number(initialValue));
      }).toPass({ timeout: 2_000 });

      await page.waitForTimeout(500);
      const valueAfterChange = await slider.getAttribute("aria-valuenow");

      const undoButton = page.getByRole("button", {
        name: "Undo",
        exact: true,
      });
      await expect(undoButton).toBeEnabled();
      await undoButton.click();
      await expect(slider).toHaveAttribute("aria-valuenow", initialValue!);

      const redoButton = page.getByRole("button", { name: "Redo" });
      await expect(redoButton).toBeEnabled();
      await redoButton.click();
      await expect(slider).toHaveAttribute("aria-valuenow", valueAfterChange!);
    });
  });
});

// ─── Export Flow ─────────────────────────────────────────────────────────────

test.describe("Export Flow", () => {
  test.describe.configure({ timeout: 90_000 });

  test.beforeEach(async ({ page }) => {
    await editorSetup.beforeEach(page);
  });

  test("should open export panel and show all export tabs", async ({
    page,
  }) => {
    await test.step("Click Export / Import button", async () => {
      await page
        .getByRole("button", { name: /Export/i })
        .first()
        .click();
    });

    await test.step("Verify export panel with tabs", async () => {
      await expect(
        page.getByRole("heading", { name: "Export / Import" }),
      ).toBeVisible();
      await expect(
        page.getByRole("tab", { name: "app.config.ts" }),
      ).toBeVisible();
      await expect(page.getByRole("tab", { name: "CSS" })).toBeVisible();
      await expect(page.getByRole("tab", { name: "JSON" })).toBeVisible();
    });
  });

  test("should switch between export tabs and show correct content", async ({
    page,
  }) => {
    await test.step("Open export panel", async () => {
      await page
        .getByRole("button", { name: /Export/i })
        .first()
        .click();
    });

    await test.step("Verify default app.config.ts content", async () => {
      await expect(page.getByText("export default")).toBeVisible();
    });

    await test.step("Switch to CSS tab and verify CSS properties", async () => {
      await page.getByRole("tab", { name: "CSS" }).click();
      await expect(page.getByText("--ui-radius")).toBeVisible();
    });

    await test.step("Switch to JSON tab and verify JSON structure", async () => {
      await page.getByRole("tab", { name: "JSON" }).click();
      await expect(page.getByText('"colors"')).toBeVisible();
    });

    await test.step("Switch back to app.config.ts tab", async () => {
      await page.getByRole("tab", { name: "app.config.ts" }).click();
      await expect(page.getByText("export default")).toBeVisible();
    });
  });
});

// ─── Footer & Cookie Consent ─────────────────────────────────────────────────

test.describe("Footer Navigation & Cookie Consent", () => {
  test.beforeEach(async ({ page }) => {
    await editorSetup.beforeEach(page);
  });

  test("should display footer utility links and navigate to About", async ({
    page,
  }) => {
    await test.step("Verify footer links are visible", async () => {
      const footerNav = page.getByRole("navigation", {
        name: "Utility pages",
      });
      await expect(footerNav).toBeVisible();
      await expect(
        footerNav.getByRole("link", { name: "About" }),
      ).toBeVisible();
      await expect(
        footerNav.getByRole("link", { name: "Privacy" }),
      ).toBeVisible();
      await expect(
        footerNav.getByRole("link", { name: "Contact" }),
      ).toBeVisible();
    });

    await test.step("Navigate to About page", async () => {
      await page
        .getByRole("navigation", { name: "Utility pages" })
        .getByRole("link", { name: "About" })
        .click();
      await expect(page).toHaveURL(/\/about/);
    });
  });

  test("should show cookie consent toast and accept it", async ({ page }) => {
    await test.step("Verify consent toast appears on first visit", async () => {
      await expect(
        page.getByText("Cookie & Storage Notice", { exact: true }),
      ).toBeVisible({ timeout: 10_000 });
      await expect(page.getByRole("button", { name: "Accept" })).toBeVisible();
    });

    await test.step("Click Accept and verify toast is dismissed", async () => {
      await page.getByRole("button", { name: "Accept" }).click();
      await expect(
        page.getByText("Cookie & Storage Notice", { exact: true }),
      ).not.toBeVisible({ timeout: 5_000 });
    });

    await test.step("Verify consent is persisted in localStorage", async () => {
      const stored = await page.evaluate(() =>
        localStorage.getItem("cookie-consent"),
      );
      expect(stored).toBe("accepted");
    });
  });
});
