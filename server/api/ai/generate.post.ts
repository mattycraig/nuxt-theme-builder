import { z } from "zod";
import { checkRateLimit, type RateLimitStore } from "~~/server/utils/rateLimit";
import { classifyAiError } from "~~/server/utils/aiErrorHandler";
import {
  AI_PROVIDER_IDS,
  createProviderModel,
  generateAiTheme,
} from "~~/server/utils/aiGenerate";

// ─── Limits ────────────────────────────────────────────────────────────

const AI_TIMEOUT_MS = 60_000;
const MAX_PROMPT_CHARS = 20_000;
const MAX_CONVERSATION_MESSAGES = 6;

const requestSchema = z.object({
  prompt: z.string().min(1).max(2000),
  apiKey: z.string().min(1).max(512),
  provider: z.enum(AI_PROVIDER_IDS),
  model: z.string().min(1).max(128),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .max(MAX_CONVERSATION_MESSAGES)
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
    return await generateAiTheme({
      model: createProviderModel(provider, model, apiKey),
      prompt,
      conversationHistory,
      abortSignal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });
  } catch (err: unknown) {
    console.error("[AI Generate Error]", err);

    const classified = classifyAiError(err);
    throw createError({
      statusCode: classified.statusCode,
      statusMessage: classified.statusMessage,
    });
  }
});
