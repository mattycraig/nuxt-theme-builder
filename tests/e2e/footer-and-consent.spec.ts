import { test, expect } from "@playwright/test";

test.describe("Footer Navigation Links", () => {
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

  test("should display About, Privacy, and Contact links in sidebar footer", async ({
    page,
  }) => {
    await test.step("Verify footer utility links are visible", async () => {
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
  });

  test("should navigate to About page", async ({ page }) => {
    await test.step("Click About link and verify navigation", async () => {
      const aboutLink = page
        .getByRole("navigation", { name: "Utility pages" })
        .getByRole("link", { name: "About" });
      await aboutLink.click();
      await expect(page).toHaveURL(/\/about/);
    });
  });

  test("should navigate to Privacy page", async ({ page }) => {
    await test.step("Click Privacy link and verify navigation", async () => {
      const privacyLink = page
        .getByRole("navigation", { name: "Utility pages" })
        .getByRole("link", { name: "Privacy" });
      await privacyLink.click();
      await expect(page).toHaveURL(/\/privacy/);
    });
  });

  test("should navigate to Contact page", async ({ page }) => {
    await test.step("Click Contact link and verify navigation", async () => {
      const contactLink = page
        .getByRole("navigation", { name: "Utility pages" })
        .getByRole("link", { name: "Contact" });
      await contactLink.click();
      await expect(page).toHaveURL(/\/contact/);
    });
  });
});

test.describe("Cookie Consent Toast", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("theme");
      localStorage.removeItem("theme-builder");
      localStorage.removeItem("cookie-consent");
    });
  });

  test("should show cookie consent toast on first visit", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 30_000 },
    );

    await test.step("Verify consent toast appears", async () => {
      await expect(
        page.getByText("Cookie & Storage Notice", { exact: true }),
      ).toBeVisible({ timeout: 10_000 });
    });

    await test.step("Verify toast has Accept and Privacy Policy actions", async () => {
      await expect(page.getByRole("button", { name: "Accept" })).toBeVisible();
      await expect(
        page
          .getByRole("link", { name: "Privacy Policy" })
          .or(page.getByRole("button", { name: "Privacy Policy" })),
      ).toBeVisible();
    });
  });

  test("should hide toast and persist consent after clicking Accept", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 30_000 },
    );

    await test.step("Wait for toast and click Accept", async () => {
      await expect(
        page.getByText("Cookie & Storage Notice", { exact: true }),
      ).toBeVisible({ timeout: 10_000 });
      await page.getByRole("button", { name: "Accept" }).click();
    });

    await test.step("Verify toast is dismissed", async () => {
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

  test("should not show consent toast on return visit after acceptance", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem("cookie-consent", "accepted");
    });
    await page.goto("/");
    await page.waitForSelector(
      '[data-testid="theme-editor"][data-hydrated="true"]',
      { state: "visible", timeout: 30_000 },
    );

    await test.step("Verify consent toast does not appear", async () => {
      // Wait a moment for any toast to potentially appear
      await page.waitForTimeout(2000);
      await expect(
        page.getByText("Cookie & Storage Notice", { exact: true }),
      ).not.toBeVisible();
    });
  });
});
