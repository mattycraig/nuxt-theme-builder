import { z } from "zod";
import {
  generateObject,
} from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { checkRateLimit, type RateLimitStore } from "~~/server/utils/rateLimit";
import { classifyAiError } from "~~/server/utils/aiErrorHandler";
import { buildThemeConfig } from "~~/server/utils/aiResponseBuilder";
import {
  ALL_PALETTES,
  NEUTRAL_PALETTES,
  SHADE_VALUES,
  FONT_OPTIONS,
  RADIUS_MIN,
  RADIUS_MAX,
} from "~~/shared/constants/theme";

// ─── Limits ────────────────────────────────────────────────────────────

const AI_TIMEOUT_MS = 60_000;
const MAX_PROMPT_CHARS = 20_000;
const MAX_RETRIES = 2;
const MAX_CONVERSATION_MESSAGES = 6;

// ─── Zod schemas (built from shared constants) ────────────────────────

const anyPaletteSchema = z.enum(ALL_PALETTES);
const neutralPaletteSchema = z.enum(NEUTRAL_PALETTES);
const neutralShadeSchema = z.enum(SHADE_VALUES);

const semanticColorsSchema = z.object({
  primary: anyPaletteSchema,
  secondary: anyPaletteSchema,
  success: anyPaletteSchema,
  info: anyPaletteSchema,
  warning: anyPaletteSchema,
  error: anyPaletteSchema,
});

const tokenOverridesSchema = z.object({
  text: z.object({
    dimmed: neutralShadeSchema,
    muted: neutralShadeSchema,
    toned: neutralShadeSchema,
    default: neutralShadeSchema,
    highlighted: neutralShadeSchema,
    inverted: neutralShadeSchema,
  }),
  bg: z.object({
    default: neutralShadeSchema,
    muted: neutralShadeSchema,
    elevated: neutralShadeSchema,
    accented: neutralShadeSchema,
    inverted: neutralShadeSchema,
  }),
  border: z.object({
    default: neutralShadeSchema,
    muted: neutralShadeSchema,
    accented: neutralShadeSchema,
    inverted: neutralShadeSchema,
  }),
});

const aiThemeSchema = z.object({
  colors: semanticColorsSchema,
  neutral: neutralPaletteSchema,
  radius: z.number().min(RADIUS_MIN).max(RADIUS_MAX),
  font: z.enum(FONT_OPTIONS),
  darkColors: semanticColorsSchema,
  darkNeutral: neutralPaletteSchema,
  darkRadius: z.number().min(RADIUS_MIN).max(RADIUS_MAX),
  darkFont: z.enum(FONT_OPTIONS),
  lightOverrides: tokenOverridesSchema.nullable(),
  darkOverrides: tokenOverridesSchema.nullable(),
  explanation: z.string(),
});

/**
 * Server-side fallback overrides use values from shared/constants/aiDefaults.ts.
 * These intentionally differ from client defaults for optimal AI output.
 */

const requestSchema = z.object({
  prompt: z.string().min(1).max(2000),
  apiKey: z.string().min(1).max(512),
  provider: z.enum(["openai", "anthropic", "google"]),
  model: z.string().min(1).max(128),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .max(6)
    .nullable(),
});

const rateLimitMap: RateLimitStore = new Map();

export default defineEventHandler(async (event) => {
  // Prefer platform-specific headers that are harder to spoof,
  // then fall back to proxy headers
  const ip =
    getRequestHeader(event, "cf-connecting-ip") ||
    getRequestHeader(event, "fly-client-ip") ||
    getRequestHeader(event, "true-client-ip") ||
    getRequestHeader(event, "x-real-ip") ||
    getRequestHeader(event, "x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkRateLimit(rateLimitMap, ip)) {
    throw createError({
      statusCode: 429,
      statusMessage: "Rate limit exceeded. Please wait before trying again.",
    });
  }

  const body = await readBody(event);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body.",
    });
  }

  const { prompt, apiKey, provider, model, conversationHistory } = parsed.data;

  const totalChars =
    prompt.length +
    (conversationHistory?.reduce((sum, msg) => sum + msg.content.length, 0) ??
      0);

  if (totalChars > MAX_PROMPT_CHARS) {
    throw createError({
      statusCode: 413,
      statusMessage: "Prompt payload is too large.",
    });
  }

  try {
    function getProviderModel(p: string, m: string, key: string) {
      switch (p) {
        case "anthropic": {
          const anthropic = createAnthropic({ apiKey: key });
          return anthropic(m);
        }
        case "google": {
          const google = createGoogleGenerativeAI({ apiKey: key });
          return google(m);
        }
        default: {
          const openai = createOpenAI({ apiKey: key });
          return openai(m);
        }
      }
    }

    const aiModel = getProviderModel(provider, model, apiKey);

    const messages: {
      role: "user" | "assistant" | "system";
      content: string;
    }[] = [{ role: "system", content: AI_SYSTEM_PROMPT }];

    if (conversationHistory?.length) {
      const recentHistory = conversationHistory.slice(
        -MAX_CONVERSATION_MESSAGES,
      );
      for (const msg of recentHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: "user", content: prompt });

    const result = await generateObject({
      model: aiModel,
      schema: aiThemeSchema,
      messages,
      maxRetries: MAX_RETRIES,
      abortSignal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });

    return buildThemeConfig(result.object);
  } catch (err: unknown) {
    console.error("[AI Generate Error]", err);

    const classified = classifyAiError(err);
    throw createError({
      statusCode: classified.statusCode,
      statusMessage: classified.statusMessage,
    });
  }
});
