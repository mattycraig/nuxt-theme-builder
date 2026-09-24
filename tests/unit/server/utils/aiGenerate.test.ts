import { describe, it, expect, vi, afterEach } from "vitest";
import { MockLanguageModelV4 } from "ai/test";
import { APICallError, NoObjectGeneratedError } from "ai";
import { AI_MODELS, AI_PROVIDERS } from "~/types/ai";
import {
  createProviderModel,
  generateAiTheme,
} from "~~/server/utils/aiGenerate";
import { AI_SYSTEM_PROMPT } from "~~/server/utils/aiSystemPrompt";
import { classifyAiError } from "~~/server/utils/aiErrorHandler";

const colors = {
  primary: "violet",
  secondary: "sky",
  success: "emerald",
  info: "blue",
  warning: "amber",
  error: "rose",
};

const validTheme = {
  colors,
  neutral: "mauve",
  radius: 0.5,
  font: "Inter",
  darkColors: { ...colors, primary: "purple" },
  darkNeutral: "zinc",
  darkRadius: 0.5,
  darkFont: "Inter",
  lightOverrides: null,
  darkOverrides: null,
  explanation: "Violet on mauve for a soft, modern feel.",
};

function mockModel(json: unknown) {
  return new MockLanguageModelV4({
    doGenerate: {
      content: [{ type: "text", text: JSON.stringify(json) }],
      finishReason: { unified: "stop", raw: "stop" },
      usage: {
        inputTokens: { total: 10, noCache: 10, cacheRead: 0, cacheWrite: 0 },
        outputTokens: { total: 20, text: 20, reasoning: 0 },
      },
      warnings: [],
    },
  });
}

describe("generateAiTheme", () => {
  it("sends the system prompt as instructions, then history, then the prompt once", async () => {
    const model = mockModel(validTheme);

    await generateAiTheme({
      model,
      prompt: "Now make it warmer",
      conversationHistory: [
        { role: "user", content: "A calm violet theme" },
        { role: "assistant", content: "Violet on mauve." },
      ],
    });

    const prompt = model.doGenerateCalls[0]!.prompt;
    expect(prompt.map((m) => m.role)).toEqual([
      "system",
      "user",
      "assistant",
      "user",
    ]);
    expect(prompt[0]).toMatchObject({ role: "system", content: AI_SYSTEM_PROMPT });
    expect(JSON.stringify(prompt.at(-1))).toContain("Now make it warmer");
    expect(JSON.stringify(prompt).split("Now make it warmer")).toHaveLength(2);
  });

  it("returns a validated theme config and explanation", async () => {
    const result = await generateAiTheme({
      model: mockModel(validTheme),
      prompt: "A calm violet theme",
      conversationHistory: null,
    });

    expect(result.explanation).toBe(validTheme.explanation);
    expect(result.themeConfig.colors.primary).toBe("violet");
    expect(result.themeConfig.neutral).toBe("mauve");
    expect(result.themeConfig.darkColors.primary).toBe("purple");
    // Null overrides fall back to the server-side AI defaults
    expect(result.themeConfig.lightOverrides.text.default).toBeDefined();
  });

  it("rejects output that violates the schema with a 422-mapped error", async () => {
    const error = await generateAiTheme({
      model: mockModel({ ...validTheme, neutral: "not-a-palette" }),
      prompt: "Anything",
      conversationHistory: null,
    }).catch((err: unknown) => err);

    expect(NoObjectGeneratedError.isInstance(error)).toBe(true);
    expect(classifyAiError(error).statusCode).toBe(422);
  });
});

describe("listed models", () => {
  const API_KEY = "test-key-not-real";

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /** Run one generation through the real provider and capture its HTTP request. */
  async function captureRequest(
    provider: (typeof AI_PROVIDERS)[number],
    modelId: string,
  ) {
    const requests: { url: string; body: Record<string, unknown> }[] = [];
    vi.stubGlobal("fetch", async (url: string, init: RequestInit) => {
      requests.push({ url: String(url), body: JSON.parse(String(init.body)) });
      // 400 is not retried, so each model makes exactly one request.
      return new Response(JSON.stringify({ error: { message: "stubbed" } }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    });
    const error = await generateAiTheme({
      model: createProviderModel(provider, modelId, API_KEY),
      prompt: "A calm theme",
      conversationHistory: null,
    }).catch((e: unknown) => e);
    expect(APICallError.isInstance(error)).toBe(true);
    expect(requests).toHaveLength(1);
    return requests[0]!;
  }

  const cases = AI_PROVIDERS.flatMap((provider) =>
    AI_MODELS[provider].map((m) => [provider, m.value] as const),
  );

  // Reasoning models (GPT-6, Claude Opus 5.5) reject a forced tool call, so
  // every model must use the provider's native JSON-schema output instead.
  it.each(cases)(
    "%s %s requests native JSON-schema output",
    async (provider, modelId) => {
      const { url, body } = await captureRequest(provider, modelId);
      expect(url).not.toContain(API_KEY);

      if (provider === "openai") {
        expect(url).toMatch(/\/v1\/responses$/);
        expect(body).toMatchObject({
          model: modelId,
          text: { format: { type: "json_schema" } },
        });
        expect(body).not.toHaveProperty("temperature");
      } else if (provider === "anthropic") {
        expect(url).toMatch(/\/v1\/messages$/);
        expect(body).toMatchObject({
          model: modelId,
          output_config: { format: { type: "json_schema" } },
        });
        expect(body).not.toHaveProperty("tool_choice");
      } else {
        expect(url).toContain(`/models/${modelId}:generateContent`);
        const config = body.generationConfig as Record<string, unknown>;
        expect(config.responseMimeType).toBe("application/json");
        expect(config.responseJsonSchema ?? config.responseSchema).toBeDefined();
      }
    },
  );
});
