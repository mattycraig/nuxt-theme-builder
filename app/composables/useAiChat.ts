import type { AiMessage, AiGenerateResponse } from "~/types/ai";
import type { ThemeConfig } from "~/types/theme";
import { ThemeConfigSchema } from "~/types/theme";
import { showThemeAppliedToast } from "~/utils/helpers";

const MAX_CONVERSATION_WINDOW = 6;

/**
 * Manages the AI chat conversation state and server communication.
 *
 * Key design decisions:
 * - Messages are persisted across navigations via `useState` (SSR-safe
 *   shared state). They survive route changes but not full page reloads.
 * - Only the last 6 messages (see `MAX_CONVERSATION_WINDOW`) are sent
 *   to the server to control token cost and keep context focused.
 * - `regenerateLastMessage()` is destructive: it removes everything
 *   from the last user message onward and re-sends the prompt, so the
 *   chat history is rewritten rather than branched.
 * - Theme validation with `ThemeConfigSchema` happens both on the
 *   server (before response) and here on the client, as a defense-
 *   in-depth measure.
 */
export function useAiChat() {
  const messages = useState<AiMessage[]>("ai-chat-messages", () => []);
  const isGenerating = ref(false);
  const error = ref<string | null>(null);
  const toast = useToast();
  const store = useThemeStore();

  /** Generate a lightweight unique ID for chat messages. */
  function createId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function addMessage(
    role: AiMessage["role"],
    content: string,
    themeConfig?: ThemeConfig,
  ): AiMessage {
    const msg: AiMessage = {
      id: createId(),
      role,
      content,
      themeConfig,
      timestamp: Date.now(),
    };
    messages.value = [...messages.value, msg];
    return msg;
  }

  async function sendMessage(prompt: string) {
    if (!prompt.trim() || isGenerating.value) return;

    const { apiKey, provider, model, isConfigured } = useAiSettings();

    if (!isConfigured.value) {
      error.value = "Please enter your API key in the settings panel.";
      return;
    }

    error.value = null;
    addMessage("user", prompt.trim());
    isGenerating.value = true;

    try {
      const conversationHistory = messages.value
        .filter((m) => m.role !== "system")
        .slice(-MAX_CONVERSATION_WINDOW)
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));

      const response = await $fetch<AiGenerateResponse>("/api/ai/generate", {
        method: "POST",
        body: {
          prompt: prompt.trim(),
          apiKey: apiKey.value,
          provider: provider.value,
          model: model.value,
          conversationHistory,
        },
      });

      const validated = ThemeConfigSchema.safeParse(response.themeConfig);
      if (!validated.success) {
        addMessage(
          "assistant",
          "I generated a theme, but it didn't pass validation. Please try again with a different prompt.",
        );
        return;
      }

      const themeConfig = validated.data as ThemeConfig;

      addMessage("assistant", response.explanation, themeConfig);
    } catch (err: unknown) {
      const fetchError = err as {
        statusCode?: number;
        statusMessage?: string;
        data?: { statusMessage?: string; statusCode?: number };
      };
      const statusCode =
        fetchError.data?.statusCode || fetchError.statusCode || 500;
      const serverMessage =
        fetchError.data?.statusMessage || fetchError.statusMessage || "";

      let userMessage: string;
      if (serverMessage) {
        userMessage = serverMessage;
      } else if (statusCode === 504) {
        userMessage = "The request timed out. Please try again.";
      } else if (statusCode === 502) {
        userMessage =
          "The AI service is temporarily unavailable. Please try again shortly.";
      } else {
        userMessage = "Something went wrong. Please try again.";
      }

      error.value = userMessage;
      addMessage("assistant", userMessage);
    } finally {
      isGenerating.value = false;
    }
  }

  function applyTheme(config: ThemeConfig) {
    const validated = ThemeConfigSchema.safeParse(config);
    if (!validated.success) {
      toast.add({
        title: "Invalid theme",
        description: "This theme configuration is invalid.",
        color: "error",
        icon: "i-lucide-alert-circle",
      });
      return;
    }

    store.loadConfig(validated.data as ThemeConfig);
    showThemeAppliedToast(toast);
  }

  function regenerateLastMessage() {
    const lastUserIndex = messages.value
      .map((m, i) => ({ role: m.role, index: i }))
      .filter((m) => m.role === "user")
      .pop();

    if (!lastUserIndex) return;

    const lastUserMessage = messages.value[lastUserIndex.index];
    if (!lastUserMessage) return;
    // Remove everything from that user message onward
    messages.value = messages.value.slice(0, lastUserIndex.index);

    sendMessage(lastUserMessage.content);
  }

  function clearChat() {
    messages.value = [];
    error.value = null;
  }

  return {
    messages: computed(() => messages.value),
    isGenerating: computed(() => isGenerating.value),
    error: computed(() => error.value),
    sendMessage,
    regenerateLastMessage,
    applyTheme,
    clearChat,
  };
}
