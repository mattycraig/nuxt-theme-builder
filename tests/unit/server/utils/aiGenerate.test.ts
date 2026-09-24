import { describe, it, expect } from "vitest";
import { MockLanguageModelV4 } from "ai/test";
import { NoObjectGeneratedError } from "ai";
import { generateAiTheme } from "~~/server/utils/aiGenerate";
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
