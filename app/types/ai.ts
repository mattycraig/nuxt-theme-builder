import type { ThemeConfig } from "~/types/theme";

// AI Provider Configuration ───────────────────────────────────────────────

export const AI_PROVIDERS = ["openai", "anthropic", "google"] as const;
export type AiProvider = (typeof AI_PROVIDERS)[number];

export interface AiProviderOption {
  label: string;
  value: AiProvider;
  icon: string;
}

export const AI_PROVIDER_OPTIONS: AiProviderOption[] = [
  { label: "OpenAI", value: "openai", icon: "i-lucide-bot" },
  { label: "Anthropic", value: "anthropic", icon: "i-lucide-brain" },
  { label: "Google Gemini", value: "google", icon: "i-lucide-sparkles" },
];

export interface AiModelOption {
  label: string;
  value: string;
  description: string;
}

/**
 * Model options per provider. The first entry is the provider's default:
 * it's selected when the user switches providers, and it replaces a saved
 * model ID that is no longer listed. Verify IDs against the provider's docs;
 * the server passes them through unchanged.
 */
export const AI_MODELS: Record<AiProvider, AiModelOption[]> = {
  openai: [
    {
      label: "GPT-6 Luna",
      value: "gpt-6-luna",
      description: "Fast and affordable.",
    },
    {
      label: "GPT-6 Sol",
      value: "gpt-6-sol",
      description: "Stronger reasoning for detailed themes.",
    },
    {
      label: "GPT-6 Astra",
      value: "gpt-6-astra",
      description: "Most capable, highest cost.",
    },
  ],
  anthropic: [
    {
      label: "Claude Sonnet 5",
      value: "claude-sonnet-5",
      description: "Best balance of speed and quality.",
    },
    {
      label: "Claude Haiku 4.5",
      value: "claude-haiku-4-5",
      description: "Fastest and most affordable.",
    },
    {
      label: "Claude Opus 5.5",
      value: "claude-opus-5-5",
      description: "Most capable for complex themes.",
    },
  ],
  google: [
    {
      label: "Gemini 3.8 Flash",
      value: "gemini-3.8-flash",
      description: "Fast, capable, and cost-effective.",
    },
    {
      label: "Gemini 3.5 Flash-Lite",
      value: "gemini-3.5-flash-lite",
      description: "Quickest and cheapest.",
    },
  ],
};

/** The listed model, or the provider's default when the ID isn't listed (e.g. retired). */
export function resolveAiModel(provider: AiProvider, model: string): string {
  const models = AI_MODELS[provider] ?? [];
  if (models.some((m) => m.value === model)) return model;
  return models[0]?.value ?? model;
}

// AI Settings ────────────────────────────────────────────────────────────

export interface AiSettings {
  apiKey: string;
  provider: AiProvider;
  model: string;
  persistKey: boolean;
}

export const DEFAULT_AI_SETTINGS: AiSettings = {
  apiKey: "",
  provider: "openai",
  model: "gpt-6-luna",
  persistKey: false,
};

// AI Chat Messages ───────────────────────────────────────────────────────

export interface AiMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  themeConfig?: ThemeConfig;
  timestamp: number;
}

// Prompt Templates ───────────────────────────────────────────────────────

export type PromptCategory =
  | "Professional"
  | "Creative"
  | "Nature"
  | "Dark Mode"
  | "Brand";

export interface PromptTemplate {
  id: string;
  label: string;
  description: string;
  icon: string;
  prompt: string;
  category: PromptCategory;
}

// Server Route Types ─────────────────────────────────────────────────────

export interface AiGenerateRequest {
  prompt: string;
  apiKey: string;
  provider: AiProvider;
  model: string;
  conversationHistory?: Pick<AiMessage, "role" | "content">[];
}

export interface AiGenerateResponse {
  themeConfig: ThemeConfig;
  explanation: string;
}
