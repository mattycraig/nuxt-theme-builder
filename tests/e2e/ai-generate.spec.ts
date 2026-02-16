import { test, expect, type Page, type Route } from "@playwright/test";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_THEME_CONFIG = {
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
};

const MOCK_EXPLANATION =
  "I created a professional blue theme with a calm, trustworthy feel. " +
  "Blue conveys reliability for SaaS dashboards, paired with emerald success states " +
  "and rose error indicators. The dark mode shifts to sky for better contrast on dark surfaces.";

const MOCK_RESPONSE = {
  themeConfig: MOCK_THEME_CONFIG,
  explanation: MOCK_EXPLANATION,
};

const MOCK_ERROR_401 = {
  statusCode: 401,
  statusMessage: "Invalid API key. Please check your key and try again.",
};

const FAKE_API_KEY = "sk-test-fake-key-for-playwright-tests";
const AI_URL = "/ai?preview";

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

async function clearAiStorage(page: Page) {
  await page.addInitScript(() => {
    localStorage.removeItem("ai-settings");
    localStorage.removeItem("theme");
  });
}

async function mockGenerateSuccess(page: Page, delay = 50) {
  await page.route("**/api/ai/generate", async (route: Route) => {
    if (delay > 0) await new Promise((r) => setTimeout(r, delay));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(MOCK_RESPONSE),
    });
  });
}

async function mockGenerateError(
  page: Page,
  error: { statusCode: number; statusMessage: string },
) {
  await page.route("**/api/ai/generate", async (route: Route) => {
    await route.fulfill({
      status: error.statusCode,
      contentType: "application/json",
      body: JSON.stringify({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage,
      }),
    });
  });
}

async function mockGenerateHang(page: Page) {
  await page.route("**/api/ai/generate", async () => {
    // Never fulfill — simulates a hanging request
  });
}

async function gotoAi(page: Page, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    await page.goto(AI_URL);

    const errorHeading = page.locator("h1").filter({
      hasText:
        /^(500|429|Too Many Requests|Server Error|Internal Server Error)$/,
    });
    if (await errorHeading.isVisible({ timeout: 2_000 }).catch(() => false)) {
      if (attempt < retries) {
        await page.waitForTimeout(2000 * attempt);
        continue;
      }
      throw new Error(`Server returned error page after ${retries} attempts`);
    }

    await page.waitForSelector('[data-hydrated="true"]', {
      state: "attached",
      timeout: 15_000,
    });
    return;
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe("AI Theme Generation — API Key Configuration Flow", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
  });

  test("should show API key required state, configure key, and enable chat", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify empty state and API key required alert", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible({ timeout: 15_000 });
      await expect(page.getByText("API key required")).toBeVisible();
      await expect(
        page.getByPlaceholder("Enter your API key in settings to start..."),
      ).toBeVisible();
    });

    await test.step("Open settings and enter API key", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
      await expect(page.getByText("Privacy Note")).toBeVisible();
      await expect(page.getByPlaceholder("sk-...")).toBeVisible();
      await page.getByPlaceholder("sk-...").fill(FAKE_API_KEY);
    });

    await test.step("Close settings and verify chat is enabled", async () => {
      await page.keyboard.press("Escape");
      await expect(page.getByText("API key required")).not.toBeVisible({
        timeout: 5_000,
      });
      await expect(
        page.getByPlaceholder("Describe your ideal theme..."),
      ).toBeVisible();
      await expect(
        page.getByRole("button", {
          name: "A calm, professional SaaS dashboard",
        }),
      ).toBeVisible();
    });
  });
});

test.describe("AI Theme Generation — Happy Path: Generate, Preview & Apply", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should send prompt, display response with preview card, and apply theme", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send a theme prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("A calm blue professional SaaS dashboard theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify user message and assistant response appear", async () => {
      await expect(
        page.getByText("A calm blue professional SaaS dashboard theme"),
      ).toBeVisible({ timeout: 5_000 });
      await expect(
        page.getByText("professional blue theme").first(),
      ).toBeVisible({ timeout: 15_000 });
    });

    await test.step("Verify theme preview card with color chips and metadata", async () => {
      await expect(page.getByText("primary").first()).toBeVisible();
      await expect(page.getByText("(blue)").first()).toBeVisible();
      await expect(page.getByText("Inter").first()).toBeVisible();
      await expect(page.getByText("0.375rem").first()).toBeVisible();
    });

    await test.step("Verify action buttons are present", async () => {
      await expect(
        page.getByRole("button", { name: "Apply & Preview Theme" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Save Theme" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Export" }),
      ).toBeVisible();
    });

    await test.step("Apply theme and verify success", async () => {
      await page
        .getByRole("button", { name: "Apply & Preview Theme" })
        .click();
      await expect(page.getByText("Theme applied").first()).toBeVisible({
        timeout: 5_000,
      });
    });
  });

  test("should show generating indicator and disable prompt during generation", async ({
    page,
  }) => {
    await mockGenerateHang(page);
    await gotoAi(page);

    await test.step("Send a prompt and verify loading state", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("A warm creative theme");
      await page.getByRole("button", { name: "Send message" }).click();

      await expect(page.getByText("Generating theme").first()).toBeVisible({
        timeout: 10_000,
      });
      await expect(prompt).toBeDisabled();
      await expect(
        page.locator('[role="status"][aria-label="Generating theme"]'),
      ).toBeVisible();
    });
  });

  test("should send correct request body including model and conversation history", async ({
    page,
  }) => {
    let lastCapturedBody: Record<string, unknown> | null = null;
    await page.route("**/api/ai/generate", async (route: Route) => {
      lastCapturedBody = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_RESPONSE),
      });
    });

    await gotoAi(page);

    await test.step("Send first message and verify request body", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("A warm sunset themed dashboard");
      await page.getByRole("button", { name: "Send message" }).click();

      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
      expect(lastCapturedBody).not.toBeNull();
      expect(lastCapturedBody!.prompt).toBe("A warm sunset themed dashboard");
      expect(lastCapturedBody!.apiKey).toBe(FAKE_API_KEY);
      expect(lastCapturedBody!.provider).toBe("openai");
      expect(lastCapturedBody!.model).toBe("gpt-4o-mini");
    });

    await test.step("Send follow-up and verify conversation history", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await prompt.fill("Make it warmer");
      await page.getByRole("button", { name: "Send message" }).click();

      await expect(async () => {
        expect(lastCapturedBody).not.toBeNull();
        const history = lastCapturedBody!.conversationHistory as Array<{
          role: string;
          content: string;
        }>;
        expect(history).toBeDefined();
        expect(history.length).toBeGreaterThanOrEqual(2);
      }).toPass({ timeout: 5_000 });
    });
  });
});

test.describe("AI Theme Generation — Error Handling", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should display error for invalid API key and re-enable prompt after error", async ({
    page,
  }) => {
    await mockGenerateError(page, MOCK_ERROR_401);
    await gotoAi(page);

    await test.step("Send prompt and verify error", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Test error recovery");
      await page.getByRole("button", { name: "Send message" }).click();

      await expect(page.getByText("Invalid API key").first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Verify prompt is re-enabled after error", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeEnabled();
    });
  });
});

test.describe("AI Theme Generation — Conversation Management", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should clear conversation and return to empty state", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send a message and wait for response", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Green theme test");
      await page.getByRole("button", { name: "Send message" }).click();
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Clear conversation and verify empty state", async () => {
      await page.getByRole("button", { name: "Conversation options" }).click();
      await page.getByText("Clear conversation").click();

      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible({ timeout: 5_000 });
      await expect(page.getByText("Green theme test")).not.toBeVisible();
    });
  });
});

test.describe("AI Theme Generation — Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
  });

  test("should have accessible labels on all interactive elements", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify accessible labels on key controls", async () => {
      await expect(
        page.getByRole("button", { name: "Open AI settings" }),
      ).toBeVisible({ timeout: 15_000 });
      await expect(
        page.getByRole("button", { name: "Conversation options" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "New conversation" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Send message" }),
      ).toBeVisible();
    });

    await test.step("Verify heading hierarchy", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible();
    });
  });

  test("should have accessible generating indicator and theme preview", async ({
    page,
  }) => {
    await seedApiKey(page);
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme and verify accessible preview", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Accessible theme");
      await page.getByRole("button", { name: "Send message" }).click();

      const previewGroup = page.locator('[role="group"]').first();
      await expect(previewGroup).toBeVisible({ timeout: 15_000 });
      await expect(previewGroup).toHaveAttribute("aria-label", /Theme with/);
    });
  });
});
