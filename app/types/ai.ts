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
];

export interface AiModelOption {
  label: string;
  value: string;
  description: string;
}

export const AI_MODELS: Record<AiProvider, AiModelOption[]> = {
  openai: [
    {
      label: "GPT-4o",
      value: "gpt-4o",
      description: "Best for creative themes.",
    },
    {
      label: "GPT-4o Mini",
      value: "gpt-4o-mini",
      description: "Quick iterations.",
    },
  ],
  anthropic: [],
  google: [],
};

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
  model: "gpt-4o-mini",
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

export interface AiGenerateError {
  error: string;
  code?: string;
}
