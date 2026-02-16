import { z } from "zod";
import {
  generateObject,
  APICallError,
  RetryError,
  NoObjectGeneratedError,
} from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  ALL_PALETTES,
  NEUTRAL_PALETTES,
  SHADE_VALUES,
  FONT_OPTIONS,
  DEFAULT_COLOR_SHADES,
  RADIUS_MIN,
  RADIUS_MAX,
} from "~~/shared/constants/theme";
import {
  AI_FALLBACK_LIGHT_OVERRIDES,
  AI_FALLBACK_DARK_OVERRIDES,
} from "~~/shared/constants/aiDefaults";

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

// Per-IP rate limiting (simple in-memory store)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_STORE_MAX_KEYS = 10_000;

// Evicts expired entries when the map exceeds the key cap to prevent unbounded memory growth
function compactRateLimitMap(now: number) {
  if (rateLimitMap.size < RATE_LIMIT_STORE_MAX_KEYS) return;
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt <= now) {
      rateLimitMap.delete(key);
    }
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  compactRateLimitMap(now);
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

export default defineEventHandler(async (event) => {
  const ip =
    getRequestHeader(event, "x-forwarded-for")?.split(",")[0]?.trim() ||
    getRequestHeader(event, "x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
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

    const {
      explanation,
      lightOverrides,
      darkOverrides,
      darkColors,
      darkNeutral,
      darkRadius,
      darkFont,
      ...lightFields
    } = result.object;

    const themeConfig = {
      ...lightFields,
      lightOverrides: lightOverrides ?? AI_FALLBACK_LIGHT_OVERRIDES,
      darkOverrides: darkOverrides ?? AI_FALLBACK_DARK_OVERRIDES,
      colorShades: { ...DEFAULT_COLOR_SHADES },
      darkColors: darkColors ?? lightFields.colors,
      darkColorShades: { ...DEFAULT_COLOR_SHADES },
      darkNeutral: darkNeutral ?? lightFields.neutral,
      darkRadius: darkRadius ?? lightFields.radius,
      darkFont: darkFont ?? lightFields.font,
    };

    return {
      themeConfig,
      explanation,
    };
  } catch (err: unknown) {
    console.error("[AI Generate Error]", err);

    // Timeout / abort
    if (err instanceof Error && err.name === "TimeoutError") {
      throw createError({
        statusCode: 504,
        statusMessage:
          "The AI model took too long to respond. Please try again.",
      });
    }
    if (err instanceof DOMException && err.name === "AbortError") {
      throw createError({
        statusCode: 504,
        statusMessage: "Request was aborted due to timeout. Please try again.",
      });
    }

    // Schema validation failure — AI returned data that doesn't match
    if (NoObjectGeneratedError.isInstance(err)) {
      console.error(
        "[AI Generate] Schema validation failed. Raw text:",
        err.text?.slice(0, 500),
        "Cause:",
        err.cause,
      );
      throw createError({
        statusCode: 422,
        statusMessage:
          "The AI generated an invalid theme structure. Please try a different prompt.",
      });
    }

    // All retries exhausted
    if (RetryError.isInstance(err)) {
      const lastErr = err.lastError;
      const innerStatus =
        lastErr && typeof lastErr === "object" && "status" in lastErr
          ? (lastErr as { status?: number }).status
          : undefined;

      if (innerStatus === 429) {
        throw createError({
          statusCode: 429,
          statusMessage:
            "AI provider rate limit exceeded after retries. Please wait a moment and try again.",
        });
      }

      throw createError({
        statusCode: 502,
        statusMessage:
          "The AI service is temporarily unavailable after multiple attempts. Please try again shortly.",
      });
    }

    // API-level errors from the provider
    if (APICallError.isInstance(err)) {
      const status = err.statusCode;

      if (status === 401) {
        throw createError({
          statusCode: 401,
          statusMessage:
            "Invalid API key. Please check your key and try again.",
        });
      }

      if (status === 403) {
        throw createError({
          statusCode: 403,
          statusMessage:
            "Access denied by AI provider. Your key may lack permissions for this model.",
        });
      }

      if (status === 429) {
        throw createError({
          statusCode: 429,
          statusMessage:
            "AI provider rate limit or quota exceeded. Please check your plan and billing details.",
        });
      }

      if (status === 503 || status === 502) {
        throw createError({
          statusCode: 502,
          statusMessage:
            "The AI model is temporarily overloaded. Please try again in a few seconds.",
        });
      }

      // Content filtering
      if (
        err.message?.includes("content_filter") ||
        err.message?.includes("content management policy")
      ) {
        throw createError({
          statusCode: 400,
          statusMessage:
            "Your prompt was flagged by the AI provider's content filter. Please rephrase and try again.",
        });
      }
    }

    // Fallback: extract whatever info we can
    const error = err as {
      status?: number;
      statusCode?: number;
      message?: string;
      code?: string;
    };
    const status = error.status || error.statusCode || 500;
    const code = error.code || "";
    const message = error.message || "";

    if (status === 401 || code === "invalid_api_key") {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid API key. Please check your key and try again.",
      });
    }

    if (
      status === 429 ||
      message.includes("exceeded your current quota") ||
      message.includes("rate limit") ||
      message.includes("billing")
    ) {
      throw createError({
        statusCode: 429,
        statusMessage:
          "AI provider rate limit or quota exceeded. Please check your plan and billing details.",
      });
    }

    if (status === 403) {
      throw createError({
        statusCode: 403,
        statusMessage:
          "Access denied by AI provider. Your key may lack permissions for this model.",
      });
    }

    // Include a sanitized hint of the actual error for debugging
    const hint =
      message.length > 0 && message.length < 200 ? ` (${message})` : "";
    throw createError({
      statusCode: status >= 400 && status < 600 ? status : 500,
      statusMessage: `Failed to generate theme. Please try again.${hint}`,
    });
  }
});
