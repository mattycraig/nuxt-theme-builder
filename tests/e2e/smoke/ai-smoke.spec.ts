import { test, expect, type Page, type Route } from "@playwright/test";

const FAKE_API_KEY = "sk-test-fake-key-for-playwright-tests";
const AI_URL = "/ai?preview";

const MOCK_RESPONSE = {
  themeConfig: {
    colors: {
      primary: "blue",
      secondary: "sky",
      success: "emerald",
      info: "cyan",
      warning: "amber",
      error: "rose",
    },
    colorShades: {
      primary: "500",
      secondary: "500",
      success: "500",
      info: "500",
      warning: "500",
      error: "500",
    },
    neutral: "slate",
    radius: 0.375,
    font: "Inter",
    darkColors: {
      primary: "sky",
      secondary: "indigo",
      success: "emerald",
      info: "teal",
      warning: "amber",
      error: "pink",
    },
    darkColorShades: {
      primary: "500",
      secondary: "500",
      success: "500",
      info: "500",
      warning: "500",
      error: "500",
    },
    darkNeutral: "zinc",
    darkRadius: 0.375,
    darkFont: "Inter",
    lightOverrides: {
      text: {
        dimmed: "400",
        muted: "500",
        toned: "600",
        default: "700",
        highlighted: "900",
        inverted: "white",
      },
      bg: {
        default: "white",
        muted: "50",
        elevated: "white",
        accented: "100",
        inverted: "900",
      },
      border: {
        default: "200",
        muted: "200",
        accented: "300",
        inverted: "800",
      },
    },
    darkOverrides: {
      text: {
        dimmed: "500",
        muted: "400",
        toned: "300",
        default: "200",
        highlighted: "white",
        inverted: "900",
      },
      bg: {
        default: "900",
        muted: "800",
        elevated: "800",
        accented: "700",
        inverted: "white",
      },
      border: {
        default: "800",
        muted: "700",
        accented: "700",
        inverted: "200",
      },
    },
  },
  explanation:
    "I created a professional blue theme with a calm, trustworthy feel for SaaS dashboards.",
};

async function seedApiKey(page: Page) {
  await page.addInitScript((key: string) => {
    localStorage.setItem(
      "ai-settings",
      JSON.stringify({
        apiKey: key,
        provider: "openai",
        model: "gpt-4o-mini",
        persistKey: true,
      }),
    );
  }, FAKE_API_KEY);
}

async function mockGenerateSuccess(page: Page) {
  await page.route("**/api/ai/generate", async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(MOCK_RESPONSE),
    });
  });
}

test.describe("Smoke - AI Theme Generation", () => {
  test.beforeEach(async ({ page }) => {
    await seedApiKey(page);
    await mockGenerateSuccess(page);
    await page.goto(AI_URL);
  });

  test("loads AI page and sends one generation prompt", async ({ page }) => {
    await expect(page).toHaveTitle(/AI Theme Generator/);

    const input = page.getByPlaceholder("Describe your ideal theme...");
    await expect(input).toBeVisible();

    await input.fill("Create a clean B2B dashboard theme");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText(/professional blue theme/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Apply & Preview Theme/i }),
    ).toBeVisible();
  });
});
