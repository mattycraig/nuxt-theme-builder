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

const ALL_PALETTES = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const;

const NEUTRAL_PALETTES = ["slate", "gray", "zinc", "neutral", "stone"] as const;

const SHADE_VALUES = [
  "white",
  "black",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const FONT_OPTIONS = [
  "Public Sans",
  "DM Sans",
  "Figtree",
  "Geist",
  "Inter",
  "Lato",
  "Montserrat",
  "Nunito",
  "Open Sans",
  "Outfit",
  "Plus Jakarta Sans",
  "Poppins",
  "Raleway",
  "Roboto",
  "Source Sans 3",
  "Space Grotesk",
  "Work Sans",
  "Lora",
  "Merriweather",
  "Playfair Display",
  "Source Serif 4",
  "Libre Baskerville",
  "DM Serif Display",
  "Crimson Text",
  "JetBrains Mono",
  "Fira Code",
  "Source Code Pro",
  "IBM Plex Mono",
  "Space Mono",
  "Sora",
  "Archivo",
  "Lexend",
  "Urbanist",
  "Bricolage Grotesque",
] as const;

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
  radius: z.number().min(0).max(2),
  font: z.enum(FONT_OPTIONS),
  lightOverrides: tokenOverridesSchema.nullable(),
  darkOverrides: tokenOverridesSchema.nullable(),
  explanation: z.string(),
});

const FALLBACK_LIGHT_OVERRIDES: z.infer<typeof tokenOverridesSchema> = {
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
  border: { default: "200", muted: "200", accented: "300", inverted: "800" },
};

const FALLBACK_DARK_OVERRIDES: z.infer<typeof tokenOverridesSchema> = {
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
  border: { default: "800", muted: "700", accented: "700", inverted: "200" },
};

const requestSchema = z.object({
  prompt: z.string().min(1).max(2000),
  apiKey: z.string().min(1),
  provider: z.enum(["openai", "anthropic", "google"]),
  model: z.string().min(1),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .nullable(),
});

const SYSTEM_PROMPT = `You are a UI theme designer for Nuxt UI v4. Generate beautiful, harmonious themes by selecting from the available design tokens.

## Available Values

### Color Palettes (for semantic colors)
Chromatic: red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
Neutral: slate, gray, zinc, neutral, stone

### Semantic Color Roles
- primary: Main brand color, used for buttons, links, and interactive elements
- secondary: Supporting color for secondary actions and accents
- success: Positive outcomes, confirmations, completed states
- info: Informational content, helpful tips, neutral notifications
- warning: Caution states, potential issues, attention-needed scenarios
- error: Errors, destructive actions, critical alerts

### Neutral Palette (for backgrounds, text, borders)
Options: slate (cool blue-gray), gray (pure gray), zinc (warm gray), neutral (true neutral), stone (warm brownish gray)

### Border Radius
Range: 0 to 2 (in rem). 0 = sharp corners, 0.375 = standard, 0.5 = moderately rounded, 1 = very rounded

### Fonts (pick ONE)
Sans-serif: Public Sans, DM Sans, Figtree, Geist, Inter, Lato, Montserrat, Nunito, Open Sans, Outfit, Plus Jakarta Sans, Poppins, Raleway, Roboto, Source Sans 3, Space Grotesk, Work Sans
Serif: Lora, Merriweather, Playfair Display, Source Serif 4, Libre Baskerville, DM Serif Display, Crimson Text
Monospace: JetBrains Mono, Fira Code, Source Code Pro, IBM Plex Mono, Space Mono
Display: Sora, Archivo, Lexend, Urbanist, Bricolage Grotesque

### Token Overrides (OPTIONAL — shade values for light and dark mode)
These are optional. Only include them if the user asks for fine-grained control over text/bg/border shades, or if you have a strong design reason.
If omitted, sensible defaults will be applied automatically.

Available shades: white, black, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

**Light mode overrides** (text should be dark on light backgrounds):
- text: dimmed (lightest text), muted, toned, default (body text), highlighted (headings), inverted (text on dark bg)
- bg: default (page bg), muted (subtle sections), elevated (cards), accented (highlighted areas), inverted (dark sections)
- border: default (standard borders), muted (subtle borders), accented (emphasized borders), inverted (on dark bg)

**Dark mode overrides** (text should be light on dark backgrounds):
- Same structure but inverted: lighter text shades, darker background shades

## Design Principles
1. Choose colors that harmonize — complementary or analogous palettes work well
2. Ensure the neutral palette complements the primary color temperature (cool neutrals for cool primaries, warm for warm)
3. Keep warning colors warm (amber/yellow/orange) and error colors attention-grabbing (red/rose)
4. Font choice should match the theme mood — serif for elegance, sans-serif for modern, monospace for technical
5. Radius should match the theme personality — sharp for professional/technical, rounded for friendly/playful

## Example Outputs

### Professional Blue Theme
colors: { primary: "blue", secondary: "sky", success: "emerald", info: "cyan", warning: "amber", error: "rose" }
neutral: "slate", radius: 0.375, font: "Inter"
lightOverrides.text: { dimmed: "400", muted: "500", toned: "600", default: "700", highlighted: "900", inverted: "white" }
lightOverrides.bg: { default: "white", muted: "50", elevated: "100", accented: "200", inverted: "900" }
lightOverrides.border: { default: "200", muted: "200", accented: "300", inverted: "900" }
darkOverrides.text: { dimmed: "500", muted: "400", toned: "300", default: "200", highlighted: "white", inverted: "900" }
darkOverrides.bg: { default: "900", muted: "800", elevated: "800", accented: "700", inverted: "white" }
darkOverrides.border: { default: "800", muted: "700", accented: "700", inverted: "white" }

### Warm Creative Theme
colors: { primary: "orange", secondary: "rose", success: "emerald", info: "sky", warning: "yellow", error: "red" }
neutral: "stone", radius: 0.75, font: "Playfair Display"

ONLY use values from the lists above. Do not invent custom colors, fonts, or shades.
Provide a brief "explanation" field describing your design choices and why they work well together.`;

// Per-IP rate limiting (simple in-memory store)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
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
    }[] = [{ role: "system", content: SYSTEM_PROMPT }];

    if (conversationHistory?.length) {
      const recentHistory = conversationHistory.slice(-6);
      for (const msg of recentHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: "user", content: prompt });

    const result = await generateObject({
      model: aiModel,
      schema: aiThemeSchema,
      messages,
      maxRetries: 2,
      abortSignal: AbortSignal.timeout(60_000),
    });

    const { explanation, lightOverrides, darkOverrides, ...themeFields } =
      result.object;

    const DEFAULT_COLOR_SHADES = {
      primary: "500" as const,
      secondary: "500" as const,
      success: "500" as const,
      info: "500" as const,
      warning: "500" as const,
      error: "500" as const,
    };

    const themeConfig = {
      ...themeFields,
      lightOverrides: lightOverrides ?? FALLBACK_LIGHT_OVERRIDES,
      darkOverrides: darkOverrides ?? FALLBACK_DARK_OVERRIDES,
      colorShades: { ...DEFAULT_COLOR_SHADES },
      darkColors: { ...themeFields.colors },
      darkColorShades: { ...DEFAULT_COLOR_SHADES },
      darkNeutral: themeFields.neutral,
      darkRadius: themeFields.radius,
      darkFont: themeFields.font,
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
