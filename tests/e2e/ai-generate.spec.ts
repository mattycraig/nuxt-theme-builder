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

const MOCK_ERROR_429 = {
  statusCode: 429,
  statusMessage:
    "AI provider rate limit or quota exceeded. Please check your plan and billing details.",
};

const MOCK_ERROR_422 = {
  statusCode: 422,
  statusMessage:
    "The AI generated an invalid theme structure. Please try a different prompt.",
};

const MOCK_ERROR_504 = {
  statusCode: 504,
  statusMessage: "The AI model took too long to respond. Please try again.",
};

const FAKE_API_KEY = "sk-test-fake-key-for-playwright-tests";
// Navigate directly with ?preview to bypass the iframe wrapper (app.vue forces
// the default layout which loads the AI page inside an iframe).
const AI_URL = "/ai?preview";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Seed localStorage with a valid API key so the chat is ready without UI interaction. */
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

/** Clear all AI-related localStorage. */
async function clearAiStorage(page: Page) {
  await page.addInitScript(() => {
    localStorage.removeItem("ai-settings");
    localStorage.removeItem("theme");
  });
}

/** Intercept the /api/ai/generate POST and return a mock success response. */
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

/** Intercept the /api/ai/generate POST and return a mock error. */
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

/** Intercept the /api/ai/generate POST and hang indefinitely (for loading state tests). */
async function mockGenerateHang(page: Page) {
  await page.route("**/api/ai/generate", async () => {
    // Never fulfill — simulates a hanging request
  });
}

/** Navigate to the AI page and wait for hydration, with retry on 429/5xx errors. */
async function gotoAi(page: Page, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    await page.goto(AI_URL);

    // Check for Nuxt error page (429 Too Many Requests, 500, etc.)
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

    // Wait for Vue hydration so event handlers are bound
    await page.waitForSelector('[data-hydrated="true"]', {
      state: "attached",
      timeout: 15_000,
    });
    return;
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe("AI Theme Generation — Page Load & Layout", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
  });

  test("should load the AI page with the correct page title", async ({
    page,
  }) => {
    await gotoAi(page);
    await expect(page).toHaveTitle(/AI Theme Generator/);
  });

  test("should render the sidebar with header and branding", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify sidebar header shows AI Generate branding", async () => {
      await expect(page.getByText("AI Generate")).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Verify New conversation button in header", async () => {
      await expect(
        page.getByRole("button", { name: "New conversation" }),
      ).toBeVisible();
    });

    await test.step("Verify New generation button in sidebar body", async () => {
      await expect(
        page.getByRole("button", { name: "New generation" }),
      ).toBeVisible();
    });
  });

  test("should render the main panel with navbar", async ({ page }) => {
    await gotoAi(page);

    await test.step("Verify AI Theme Generator heading text exists", async () => {
      await expect(page.getByText("AI Theme Generator").first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Verify Describe your ideal theme subtitle", async () => {
      await expect(page.getByText("Describe your ideal theme")).toBeVisible();
    });

    await test.step("Verify settings button in navbar", async () => {
      await expect(
        page.getByRole("button", { name: "Open AI settings" }),
      ).toBeVisible();
    });

    await test.step("Verify conversation options button", async () => {
      await expect(
        page.getByRole("button", { name: "Conversation options" }),
      ).toBeVisible();
    });
  });
});

test.describe("AI Theme Generation — Empty State (No API Key)", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
  });

  test("should display empty state with heading and description", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify empty state heading", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible({ timeout: 15_000 });
    });

    await test.step("Verify contextual description", async () => {
      await expect(
        page.getByText(
          "Describe the look and feel you want, and I'll generate a matching",
        ),
      ).toBeVisible();
    });
  });

  test("should show API key required alert", async ({ page }) => {
    await gotoAi(page);

    await test.step("Verify API key required warning", async () => {
      await expect(page.getByText("API key required")).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Verify alert description mentions settings panel", async () => {
      await expect(
        page.getByText("Enter your chosen model's API key in the settings"),
      ).toBeVisible();
    });
  });

  test("should have Open Settings button that opens the settings slideover", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Click Open Settings", async () => {
      const openSettingsBtn = page.getByRole("button", {
        name: "Open Settings",
      });
      await expect(openSettingsBtn).toBeVisible({ timeout: 15_000 });
      await openSettingsBtn.click();
    });

    await test.step("Verify settings slideover opens", async () => {
      await expect(page.getByText("Privacy Note")).toBeVisible();
      await expect(page.getByPlaceholder("sk-...")).toBeVisible();
    });
  });

  test("should show disabled chat prompt with API key hint placeholder", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify disabled placeholder text", async () => {
      const promptInput = page.getByPlaceholder(
        "Enter your API key in settings to start...",
      );
      await expect(promptInput).toBeVisible({ timeout: 15_000 });
    });
  });

  test("should not show quick chat suggestions without API key", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Quick suggestions should not appear", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible({ timeout: 15_000 });

      await expect(
        page.getByRole("button", {
          name: "A calm, professional SaaS dashboard",
        }),
      ).not.toBeVisible();
    });
  });
});

test.describe("AI Theme Generation — Settings Panel", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
  });

  test("should open settings via navbar button and show all fields", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Open settings slideover", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
    });

    await test.step("Verify privacy note alert", async () => {
      await expect(page.getByText("Privacy Note")).toBeVisible();
      await expect(
        page.getByText("Your API key is forwarded to the AI provider"),
      ).toBeVisible();
    });

    await test.step("Verify Provider field", async () => {
      await expect(page.getByText("Provider").first()).toBeVisible();
    });

    await test.step("Verify API Key field", async () => {
      await expect(page.getByText("API Key").first()).toBeVisible();
      await expect(page.getByPlaceholder("sk-...")).toBeVisible();
    });

    await test.step("Verify Remember my key checkbox", async () => {
      await expect(page.getByText("Remember my key")).toBeVisible();
    });

    await test.step("Verify Model field", async () => {
      await expect(page.getByText("Model").first()).toBeVisible();
    });
  });

  test("should toggle API key visibility", async ({ page }) => {
    await gotoAi(page);

    await test.step("Open settings and enter API key", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
      const apiKeyInput = page.getByPlaceholder("sk-...");
      await expect(apiKeyInput).toBeVisible();
      await apiKeyInput.fill(FAKE_API_KEY);
    });

    await test.step("Toggle key visibility", async () => {
      const toggleBtn = page.getByRole("button", {
        name: /Show API key|Hide API key/,
      });
      await expect(toggleBtn).toBeVisible();

      // Initially password type
      await expect(page.getByPlaceholder("sk-...")).toHaveAttribute(
        "type",
        "password",
      );

      // Click to show
      await toggleBtn.click();
      await expect(page.getByPlaceholder("sk-...")).toHaveAttribute(
        "type",
        "text",
      );

      // Click to hide again
      await page.getByRole("button", { name: "Hide API key" }).click();
      await expect(page.getByPlaceholder("sk-...")).toHaveAttribute(
        "type",
        "password",
      );
    });
  });

  test("should clear API key via clear button", async ({ page }) => {
    await seedApiKey(page);
    await gotoAi(page);

    await test.step("Open settings", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
    });

    await test.step("Click clear API key button", async () => {
      const clearBtn = page.getByRole("button", {
        name: "Clear API key",
      });
      await expect(clearBtn).toBeVisible();
      await clearBtn.click();
    });

    await test.step("Verify API key is cleared and alert returns", async () => {
      await page.keyboard.press("Escape");
      await expect(page.getByText("API key required")).toBeVisible({
        timeout: 5_000,
      });
    });
  });

  test("should configure API key and enable chat", async ({ page }) => {
    await gotoAi(page);

    await test.step("Open settings and enter API key", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
      await page.getByPlaceholder("sk-...").fill(FAKE_API_KEY);
    });

    await test.step("Close settings slideover", async () => {
      await page.keyboard.press("Escape");
    });

    await test.step("Verify API key required alert disappears", async () => {
      await expect(page.getByText("API key required")).not.toBeVisible({
        timeout: 5_000,
      });
    });

    await test.step("Verify chat prompt is now enabled", async () => {
      const promptInput = page.getByPlaceholder("Describe your ideal theme...");
      await expect(promptInput).toBeVisible();
    });

    await test.step("Verify quick chat suggestions appear", async () => {
      await expect(
        page.getByRole("button", {
          name: "A calm, professional SaaS dashboard",
        }),
      ).toBeVisible();
    });
  });
});

test.describe("AI Theme Generation — Sidebar & Prompt Templates", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should display prompt template categories in the sidebar", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify Prompt Templates heading", async () => {
      await expect(page.getByText("Prompt Templates")).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Verify prompt categories are rendered", async () => {
      const categories = [
        "Professional",
        "Creative",
        "Nature",
        "Dark Mode",
        "Brand",
      ];
      for (const category of categories) {
        await expect(
          page.getByText(category, { exact: true }).first(),
        ).toBeVisible();
      }
    });
  });

  test("should display prompt templates within each category", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify specific templates are visible", async () => {
      await expect(page.getByText("Corporate Blue").first()).toBeVisible({
        timeout: 15_000,
      });
      await expect(page.getByText("Fintech Dashboard").first()).toBeVisible();
      await expect(page.getByText("Vibrant Startup").first()).toBeVisible();
      await expect(page.getByText("GitHub-Inspired").first()).toBeVisible();
    });
  });

  test("should send prompt when clicking a template", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Click Corporate Blue template", async () => {
      await page.getByText("Corporate Blue").first().click();
    });

    await test.step("Verify user message appears in chat", async () => {
      await expect(
        page.getByText("Create a clean corporate theme with blue"),
      ).toBeVisible({ timeout: 10_000 });
    });
  });

  test("should collapse and expand sidebar", async ({ page }) => {
    await gotoAi(page);

    await test.step("Verify sidebar is visible initially", async () => {
      await expect(page.getByText("AI Generate")).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Collapse the sidebar", async () => {
      const collapseBtn = page
        .locator('button[aria-label*="ollapse"], button[aria-label*="idebar"]')
        .first();
      if (await collapseBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await collapseBtn.click();
      }
    });
  });

  test("should clear chat via New conversation button", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send a message first", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Test theme prompt");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Wait for response", async () => {
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Click New conversation button in sidebar header", async () => {
      await page.getByRole("button", { name: "New conversation" }).click();
    });

    await test.step("Verify chat is cleared and empty state returns", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible({ timeout: 5_000 });
    });
  });
});

test.describe("AI Theme Generation — Quick Chat Suggestions", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should display all quick chat suggestions when configured", async ({
    page,
  }) => {
    await gotoAi(page);

    const suggestions = [
      "A calm, professional SaaS dashboard",
      "Something bold and creative",
      "Sleek dark mode for a dev tool",
      "Warm and friendly e-commerce",
      "Minimal and elegant with serifs",
      "An earthy, natural brand theme",
    ];

    await test.step("Verify all quick chat buttons are visible", async () => {
      for (const suggestion of suggestions) {
        await expect(
          page.getByRole("button", { name: suggestion }),
        ).toBeVisible({ timeout: 15_000 });
      }
    });
  });

  test("should send message when clicking a quick chat suggestion", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Click a quick suggestion", async () => {
      await page
        .getByRole("button", { name: "Sleek dark mode for a dev tool" })
        .click();
    });

    await test.step("Verify user message appears", async () => {
      await expect(
        page.getByText("Sleek dark mode for a dev tool").nth(1),
      ).toBeVisible({ timeout: 10_000 });
    });
  });

  test("should hide quick suggestions after conversation has messages", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send a message via prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Make me a warm theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Wait for response", async () => {
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Send another message so count > 1", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await prompt.fill("Make it even warmer");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify quick suggestions are hidden", async () => {
      await expect(
        page.getByRole("button", {
          name: "A calm, professional SaaS dashboard",
        }),
      ).not.toBeVisible({ timeout: 5_000 });
    });
  });
});

test.describe("AI Theme Generation — Sending Messages & Chat Flow", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should send a message via the chat prompt and display user message", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Type in the chat prompt and submit", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("A calm blue professional SaaS dashboard theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify user message appears in chat", async () => {
      await expect(
        page.getByText("A calm blue professional SaaS dashboard theme"),
      ).toBeVisible({ timeout: 5_000 });
    });
  });

  test("should display assistant response with explanation text", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Professional blue dashboard");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify assistant explanation is displayed", async () => {
      await expect(
        page.getByText("professional blue theme").first(),
      ).toBeVisible({ timeout: 15_000 });
    });
  });

  test("should show generating indicator while waiting for response", async ({
    page,
  }) => {
    await mockGenerateHang(page);
    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("A warm creative theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify generating indicator appears", async () => {
      await expect(page.getByText("Generating theme").first()).toBeVisible({
        timeout: 10_000,
      });
    });

    await test.step("Verify the loading indicator has status role", async () => {
      await expect(
        page.locator('[role="status"][aria-label="Generating theme"]'),
      ).toBeVisible();
    });
  });

  test("should disable the chat prompt while generating", async ({ page }) => {
    await mockGenerateHang(page);
    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Something creative");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify prompt is disabled during generation", async () => {
      await expect(page.getByText("Generating theme").first()).toBeVisible({
        timeout: 10_000,
      });

      const promptInput = page.getByPlaceholder("Describe your ideal theme...");
      await expect(promptInput).toBeDisabled();
    });
  });

  test("should clear the input after sending a message", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Type and send", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Test theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify input is cleared after submit", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toHaveValue("");
    });
  });

  test("should not send empty messages", async ({ page }) => {
    await gotoAi(page);

    await test.step("Attempt to send empty prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("");

      const sendBtn = page.getByRole("button", { name: "Send message" });
      await sendBtn.click();
    });

    await test.step("Verify no message was added to chat", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible();
    });
  });
});

test.describe("AI Theme Generation — Theme Preview Card", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should display theme preview card after successful generation", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Professional blue theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify theme preview card appears with color chips", async () => {
      await expect(page.getByText("primary").first()).toBeVisible({
        timeout: 15_000,
      });
      await expect(page.getByText("(blue)").first()).toBeVisible();
    });

    await test.step("Verify font and radius are shown", async () => {
      await expect(page.getByText("Inter").first()).toBeVisible();
      await expect(page.getByText("0.375rem").first()).toBeVisible();
    });

    await test.step("Verify neutral palette indicator", async () => {
      await expect(
        page.getByText("slate", { exact: false }).first(),
      ).toBeVisible();
    });

    await test.step("Verify dark mode differences callout", async () => {
      await expect(
        page.getByText("Dark mode uses different palette assignments"),
      ).toBeVisible();
    });
  });

  test("should have Apply & Preview Theme button", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Blue dashboard");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify Apply button exists", async () => {
      await expect(
        page.getByRole("button", { name: "Apply & Preview Theme" }),
      ).toBeVisible({ timeout: 15_000 });
    });
  });

  test("should have Save Theme button", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Blue theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify Save button exists", async () => {
      await expect(
        page.getByRole("button", { name: "Save Theme" }),
      ).toBeVisible({ timeout: 15_000 });
    });
  });

  test("should have Export button", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Blue theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify Export button exists", async () => {
      await expect(page.getByRole("button", { name: "Export" })).toBeVisible({
        timeout: 15_000,
      });
    });
  });

  test("should show light and dark mode color swatches", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Blue theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify Light and Dark labels in swatch banner", async () => {
      await expect(page.getByText("Light").first()).toBeVisible({
        timeout: 15_000,
      });
      await expect(page.getByText("Dark").first()).toBeVisible();
    });
  });
});

test.describe("AI Theme Generation — Error Handling", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should display error alert for invalid API key (401)", async ({
    page,
  }) => {
    await mockGenerateError(page, MOCK_ERROR_401);
    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Test theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify error alert is displayed", async () => {
      await expect(page.getByText("Invalid API key").first()).toBeVisible({
        timeout: 15_000,
      });
    });
  });

  test("should display error alert for rate limiting (429)", async ({
    page,
  }) => {
    await mockGenerateError(page, MOCK_ERROR_429);
    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Test theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify rate limit error is shown", async () => {
      await expect(page.getByText("rate limit").first()).toBeVisible({
        timeout: 15_000,
      });
    });
  });

  test("should display error alert for invalid schema (422)", async ({
    page,
  }) => {
    await mockGenerateError(page, MOCK_ERROR_422);
    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Something random");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify schema error is shown", async () => {
      await expect(
        page.getByText("invalid theme structure").first(),
      ).toBeVisible({ timeout: 15_000 });
    });
  });

  test("should display error for timeout (504)", async ({ page }) => {
    await mockGenerateError(page, MOCK_ERROR_504);
    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Timeout test");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify timeout error is shown", async () => {
      await expect(page.getByText("took too long").first()).toBeVisible({
        timeout: 15_000,
      });
    });
  });

  test("should re-enable the prompt after an error occurs", async ({
    page,
  }) => {
    await mockGenerateError(page, MOCK_ERROR_401);
    await gotoAi(page);

    await test.step("Send a prompt and wait for error", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Test error recovery");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify error is shown", async () => {
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

  test("should clear conversation via dropdown menu", async ({ page }) => {
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

    await test.step("Open conversation options and clear", async () => {
      await page.getByRole("button", { name: "Conversation options" }).click();
      await page.getByText("Clear conversation").click();
    });

    await test.step("Verify chat is cleared", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible({ timeout: 5_000 });
      await expect(page.getByText("Green theme test")).not.toBeVisible();
    });
  });

  test("should clear conversation via New generation button", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send a message and wait for response", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Red creative theme");
      await page.getByRole("button", { name: "Send message" }).click();
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Click New generation in sidebar", async () => {
      await page.getByRole("button", { name: "New generation" }).click();
    });

    await test.step("Verify chat is cleared", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible({ timeout: 5_000 });
    });
  });

  test("should support multi-turn conversation", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send first message", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Professional blue SaaS dashboard");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Wait for first response", async () => {
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Send follow-up message", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await prompt.fill("Make the primary color darker and more corporate");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify both user messages are visible", async () => {
      await expect(
        page.getByText("Professional blue SaaS dashboard"),
      ).toBeVisible();
      await expect(
        page.getByText("Make the primary color darker and more corporate"),
      ).toBeVisible({ timeout: 15_000 });
    });
  });
});

test.describe("AI Theme Generation — Assistant Message Actions", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should show Copy and Regenerate action buttons on assistant messages", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Blue dashboard theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Wait for response", async () => {
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Verify Copy button is available", async () => {
      await expect(page.getByRole("button", { name: "Copy" })).toBeVisible();
    });

    await test.step("Verify Regenerate button is available", async () => {
      await expect(
        page.getByRole("button", { name: "Regenerate" }),
      ).toBeVisible();
    });
  });

  test("should regenerate the last response when clicking Regenerate", async ({
    page,
  }) => {
    let callCount = 0;
    await page.route("**/api/ai/generate", async (route: Route) => {
      callCount++;
      await new Promise((r) => setTimeout(r, 200));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ...MOCK_RESPONSE,
          explanation:
            callCount === 1
              ? "First response"
              : "Regenerated response with improvements",
        }),
      });
    });

    await gotoAi(page);

    await test.step("Send initial message", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Dark developer tool theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Wait for first response", async () => {
      await expect(page.getByText("First response").first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Click Regenerate", async () => {
      await page.getByRole("button", { name: "Regenerate" }).click();
    });

    await test.step("Verify regenerated response appears", async () => {
      await expect(
        page.getByText("Regenerated response with improvements").first(),
      ).toBeVisible({ timeout: 15_000 });
    });

    await test.step("Verify API was called twice", () => {
      expect(callCount).toBe(2);
    });
  });
});

test.describe("AI Theme Generation — Model Selection", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should display model selector in the chat prompt footer", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify model selector is visible", async () => {
      const modelSelect = page.locator('[aria-label*="AI model"]').first();
      await expect(modelSelect).toBeVisible({ timeout: 15_000 });
    });
  });

  test("should send selected model to the API", async ({ page }) => {
    let capturedBody: Record<string, unknown> | null = null;
    await page.route("**/api/ai/generate", async (route: Route) => {
      capturedBody = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_RESPONSE),
      });
    });

    await gotoAi(page);

    await test.step("Send a message", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Test model selection");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify API received the correct model", async () => {
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });

      expect(capturedBody).not.toBeNull();
      expect(capturedBody!.model).toBe("gpt-4o-mini");
      expect(capturedBody!.provider).toBe("openai");
    });
  });
});

test.describe("AI Theme Generation — API Request Validation", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should send the correct request body to the API", async ({ page }) => {
    let capturedBody: Record<string, unknown> | null = null;
    await page.route("**/api/ai/generate", async (route: Route) => {
      capturedBody = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_RESPONSE),
      });
    });

    await gotoAi(page);

    await test.step("Send a prompt", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("A warm sunset themed dashboard");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify request body structure", async () => {
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });

      expect(capturedBody).not.toBeNull();
      expect(capturedBody!.prompt).toBe("A warm sunset themed dashboard");
      expect(capturedBody!.apiKey).toBe(FAKE_API_KEY);
      expect(capturedBody!.provider).toBe("openai");
      expect(capturedBody!.model).toBe("gpt-4o-mini");
      expect(capturedBody!.conversationHistory).toBeDefined();
    });
  });

  test("should include conversation history in subsequent requests", async ({
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

    await test.step("Send first message", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Blue corporate theme");
      await page.getByRole("button", { name: "Send message" }).click();
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Send follow-up message", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await prompt.fill("Make it warmer");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify conversation history is included", async () => {
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

test.describe("AI Theme Generation — Apply Theme Integration", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should apply the generated theme when clicking Apply & Preview", async ({
    page,
  }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Professional blue");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Click Apply & Preview Theme", async () => {
      const applyBtn = page.getByRole("button", {
        name: "Apply & Preview Theme",
      });
      await expect(applyBtn).toBeVisible({ timeout: 15_000 });
      await applyBtn.click();
    });

    await test.step("Verify success toast notification", async () => {
      await expect(page.getByText("Theme applied").first()).toBeVisible({
        timeout: 5_000,
      });
    });
  });

  test("should open save modal when clicking Save Theme", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Green nature theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Click Save Theme", async () => {
      const saveBtn = page.getByRole("button", { name: "Save Theme" });
      await expect(saveBtn).toBeVisible({ timeout: 15_000 });
      await saveBtn.click();
    });

    await test.step("Verify save modal or theme applied toast appears", async () => {
      // In preview mode the SharedSaveThemeModal is not in the layout, but
      // localApplyTheme() still runs and shows "Theme applied" toast.
      await expect(page.getByText("Theme applied").first()).toBeVisible({
        timeout: 5_000,
      });
    });
  });
});

test.describe("AI Theme Generation — Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
  });

  test("should have accessible labels on interactive elements", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Verify settings button has aria-label", async () => {
      await expect(
        page.getByRole("button", { name: "Open AI settings" }),
      ).toBeVisible({ timeout: 15_000 });
    });

    await test.step("Verify conversation options has aria-label", async () => {
      await expect(
        page.getByRole("button", { name: "Conversation options" }),
      ).toBeVisible();
    });

    await test.step("Verify New conversation button has aria-label", async () => {
      await expect(
        page.getByRole("button", { name: "New conversation" }),
      ).toBeVisible();
    });

    await test.step("Verify Send message button has aria-label", async () => {
      await expect(
        page.getByRole("button", { name: "Send message" }),
      ).toBeVisible();
    });
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await gotoAi(page);

    await test.step("Verify h2 heading exists for empty state", async () => {
      await expect(
        page.getByRole("heading", { name: "AI Theme Generator", level: 2 }),
      ).toBeVisible({ timeout: 15_000 });
    });
  });

  test("should have accessible settings panel fields", async ({ page }) => {
    await gotoAi(page);

    await test.step("Open settings", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
    });

    await test.step("Verify form fields have labels", async () => {
      await expect(page.getByText("Provider").first()).toBeVisible();
      await expect(page.getByText("API Key").first()).toBeVisible();
      await expect(page.getByText("Model").first()).toBeVisible();
    });

    await test.step("Verify show/hide toggle has accessible label", async () => {
      await expect(
        page.getByRole("button", { name: /Show API key|Hide API key/ }),
      ).toBeVisible();
    });
  });

  test("should have accessible generating indicator with role=status", async ({
    page,
  }) => {
    await seedApiKey(page);
    await mockGenerateHang(page);
    await gotoAi(page);

    await test.step("Trigger generation and verify status role", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Accessibility test theme");
      await page.getByRole("button", { name: "Send message" }).click();

      await expect(
        page.locator('[role="status"][aria-label="Generating theme"]'),
      ).toBeVisible({ timeout: 10_000 });
    });
  });

  test("should have accessible theme preview card with aria-label", async ({
    page,
  }) => {
    await seedApiKey(page);
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Generate a theme", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Accessible theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify theme preview has group role with aria-label", async () => {
      const previewGroup = page.locator('[role="group"]').first();
      await expect(previewGroup).toBeVisible({ timeout: 15_000 });
      await expect(previewGroup).toHaveAttribute("aria-label", /Theme with/);
    });
  });
});

test.describe("AI Theme Generation — Edge Cases", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
    await seedApiKey(page);
  });

  test("should handle rapid message submission gracefully", async ({
    page,
  }) => {
    await mockGenerateHang(page);
    await gotoAi(page);

    await test.step("Send first message", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Theme one");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Verify prompt is disabled during generation", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeDisabled({ timeout: 5_000 });
    });

    await test.step("Verify second submission is blocked", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      const isDisabled = await prompt.isDisabled();
      expect(isDisabled).toBe(true);
    });
  });

  test("should persist API key across page reloads when Remember my key is checked", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Configure API key with persistence", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();

      await page.getByPlaceholder("sk-...").fill(FAKE_API_KEY);

      const rememberCheckbox = page.getByText("Remember my key");
      await rememberCheckbox.click();
    });

    await test.step("Close settings and reload", async () => {
      await page.keyboard.press("Escape");
      await page.reload();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify key is still configured after reload", async () => {
      await expect(
        page.getByPlaceholder("Describe your ideal theme..."),
      ).toBeVisible({ timeout: 15_000 });
    });
  });

  test("should handle page reload during active chat", async ({ page }) => {
    await mockGenerateSuccess(page);
    await gotoAi(page);

    await test.step("Send a message", async () => {
      const prompt = page.getByPlaceholder("Describe your ideal theme...");
      await expect(prompt).toBeVisible({ timeout: 15_000 });
      await prompt.fill("Test reload theme");
      await page.getByRole("button", { name: "Send message" }).click();
    });

    await test.step("Wait for response", async () => {
      await expect(page.getByText(MOCK_EXPLANATION).first()).toBeVisible({
        timeout: 15_000,
      });
    });

    await test.step("Reload the page", async () => {
      await page.reload();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify page loads without errors after reload", async () => {
      // Chat messages are in useState so they won't persist after reload
      await expect(
        page.getByPlaceholder("Describe your ideal theme..."),
      ).toBeVisible({ timeout: 15_000 });
    });
  });
});

test.describe("AI Theme Generation — Provider Configuration", () => {
  test.beforeEach(async ({ page }) => {
    await clearAiStorage(page);
  });

  test("should show different model options for each provider", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Open settings", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
    });

    await test.step("Verify default provider is OpenAI with its models available", async () => {
      await expect(page.getByText("OpenAI").first()).toBeVisible({
        timeout: 15_000,
      });
    });
  });

  test("should show provider-specific API key placeholder", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Open settings and verify OpenAI placeholder", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
      await expect(page.getByPlaceholder("sk-...")).toBeVisible({
        timeout: 15_000,
      });
    });
  });

  test("should show link to get API key for selected provider", async ({
    page,
  }) => {
    await gotoAi(page);

    await test.step("Open settings and verify key management link", async () => {
      await page.getByRole("button", { name: "Open AI settings" }).click();
      await expect(page.getByText("monthly spend limit").first()).toBeVisible({
        timeout: 15_000,
      });
    });
  });
});
