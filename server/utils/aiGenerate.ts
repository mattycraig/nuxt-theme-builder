import { z } from "zod";
import { generateText, Output, type LanguageModel } from "ai";
import { buildThemeConfig } from "~~/server/utils/aiResponseBuilder";
import { AI_SYSTEM_PROMPT } from "~~/server/utils/aiSystemPrompt";
import {
  ALL_PALETTES,
  NEUTRAL_PALETTES,
  SHADE_VALUES,
  FONT_OPTIONS,
  RADIUS_MIN,
  RADIUS_MAX,
} from "~~/shared/constants/theme";

const MAX_RETRIES = 2;

// ─── Response schema (built from shared constants) ────────────────────

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

export interface AiConversationMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Ask the model for a theme and validate it against the response schema.
 *
 * The system prompt goes in `instructions`: AI SDK 7 rejects system messages
 * inside `messages` by default. Schema mismatches throw NoObjectGeneratedError,
 * which `classifyAiError` maps to a 422.
 */
export async function generateAiTheme({
  model,
  prompt,
  conversationHistory,
  abortSignal,
}: {
  model: LanguageModel;
  prompt: string;
  conversationHistory: AiConversationMessage[] | null;
  abortSignal?: AbortSignal;
}) {
  const { output } = await generateText({
    model,
    instructions: AI_SYSTEM_PROMPT,
    messages: [
      ...(conversationHistory ?? []),
      { role: "user", content: prompt },
    ],
    output: Output.object({ schema: aiThemeSchema }),
    maxRetries: MAX_RETRIES,
    abortSignal,
  });

  return buildThemeConfig(output);
}
