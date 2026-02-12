import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { ThemeConfig } from "~/types/theme";
import { DEFAULT_THEME } from "~/utils/defaults";

import { useAiChat } from "~/composables/useAiChat";

const mockToastAdd = vi.fn();
const mockLoadConfig = vi.fn();
const mock$fetch = vi.fn();
const mockApiKey = ref("");
const mockProvider = ref("openai");
const mockModel = ref("gpt-4o-mini");
const mockMessages = ref<unknown[]>([]);

mockNuxtImport("useState", () => {
  return (key: string, init?: () => unknown) => {
    if (key === "ai-chat-messages") return mockMessages;
    return ref(init ? init() : "");
  };
});

mockNuxtImport("useToast", () => {
  return () => ({ add: mockToastAdd });
});

mockNuxtImport("useThemeStore", () => {
  return () => ({
    loadConfig: mockLoadConfig,
    config: { ...DEFAULT_THEME },
  });
});

mockNuxtImport("useAiSettings", () => {
  return () => ({
    apiKey: mockApiKey,
    provider: mockProvider,
    model: mockModel,
    isConfigured: computed(() => mockApiKey.value.length > 0),
  });
});

vi.stubGlobal("$fetch", (...args: unknown[]) => mock$fetch(...args));

describe("useAiChat", () => {
  let chat: ReturnType<typeof useAiChat>;

  beforeEach(() => {
    mockMessages.value = [];
    mockApiKey.value = "";
    mockProvider.value = "openai";
    mockModel.value = "gpt-4o-mini";
    mockToastAdd.mockReset();
    mockLoadConfig.mockReset();
    mock$fetch.mockReset();
    chat = useAiChat();
  });

  describe("initial state", () => {
    it("starts with no messages", () => {
      expect(chat.messages.value).toEqual([]);
    });

    it("starts not generating", () => {
      expect(chat.isGenerating.value).toBe(false);
    });

    it("starts with no error", () => {
      expect(chat.error.value).toBeNull();
    });
  });

  describe("sendMessage", () => {
    it("does nothing on empty string", async () => {
      await chat.sendMessage("");
      expect(chat.messages.value).toHaveLength(0);
    });

    it("does nothing on whitespace-only string", async () => {
      await chat.sendMessage("   ");
      expect(chat.messages.value).toHaveLength(0);
    });

    it("sets error when not configured (no API key)", async () => {
      mockApiKey.value = "";
      await chat.sendMessage("Create a theme");
      expect(chat.error.value).toContain("API key");
    });

    it("adds user message before API call", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockResolvedValue({
        themeConfig: DEFAULT_THEME,
        explanation: "Here's your theme",
      });

      await chat.sendMessage("Create a blue theme");
      const userMsg = chat.messages.value.find(
        (m: { role: string }) => m.role === "user",
      );
      expect(userMsg).toBeDefined();
      expect(userMsg?.content).toBe("Create a blue theme");
    });

    it("calls $fetch with correct parameters", async () => {
      mockApiKey.value = "sk-test-key";
      mock$fetch.mockResolvedValue({
        themeConfig: DEFAULT_THEME,
        explanation: "Done",
      });

      await chat.sendMessage("Make it red");
      expect(mock$fetch).toHaveBeenCalledWith(
        "/api/ai/generate",
        expect.objectContaining({
          method: "POST",
          body: expect.objectContaining({
            prompt: "Make it red",
            apiKey: "sk-test-key",
            provider: "openai",
            model: "gpt-4o-mini",
          }),
        }),
      );
    });

    it("adds assistant message on successful response", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockResolvedValue({
        themeConfig: DEFAULT_THEME,
        explanation: "Here's a great theme",
      });

      await chat.sendMessage("Create a theme");
      const assistantMsg = chat.messages.value.find(
        (m: { role: string }) => m.role === "assistant",
      );
      expect(assistantMsg).toBeDefined();
      expect(assistantMsg?.content).toBe("Here's a great theme");
    });

    it("includes themeConfig in assistant message on valid response", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockResolvedValue({
        themeConfig: DEFAULT_THEME,
        explanation: "Theme ready",
      });

      await chat.sendMessage("Make theme");
      const assistantMsg = chat.messages.value.find(
        (m: { role: string; themeConfig?: unknown }) =>
          m.role === "assistant" && m.themeConfig,
      );
      expect(assistantMsg?.themeConfig).toBeDefined();
    });

    it("adds validation error message when themeConfig is invalid", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockResolvedValue({
        themeConfig: { invalidField: true },
        explanation: "Bad theme",
      });

      await chat.sendMessage("Create theme");
      const assistantMsg = chat.messages.value.find(
        (m: { role: string }) => m.role === "assistant",
      );
      expect(assistantMsg?.content).toContain("validation");
    });

    it("sets error on 504 timeout", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockRejectedValue({
        statusCode: 504,
      });

      await chat.sendMessage("Create theme");
      expect(chat.error.value).toContain("timed out");
    });

    it("sets error on 502 service unavailable", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockRejectedValue({
        statusCode: 502,
      });

      await chat.sendMessage("Create theme");
      expect(chat.error.value).toContain("temporarily unavailable");
    });

    it("uses server error message when provided", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockRejectedValue({
        data: {
          statusMessage: "Rate limit exceeded",
          statusCode: 429,
        },
      });

      await chat.sendMessage("Create theme");
      expect(chat.error.value).toBe("Rate limit exceeded");
    });

    it("sets generic error for unknown errors", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockRejectedValue({
        statusCode: 500,
      });

      await chat.sendMessage("Create theme");
      expect(chat.error.value).toContain("Something went wrong");
    });

    it("clears isGenerating after successful response", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockResolvedValue({
        themeConfig: DEFAULT_THEME,
        explanation: "Done",
      });

      await chat.sendMessage("Theme");
      expect(chat.isGenerating.value).toBe(false);
    });

    it("clears isGenerating after error", async () => {
      mockApiKey.value = "sk-test";
      mock$fetch.mockRejectedValue({ statusCode: 500 });

      await chat.sendMessage("Theme");
      expect(chat.isGenerating.value).toBe(false);
    });

    it("prevents concurrent sends", async () => {
      mockApiKey.value = "sk-test";
      let resolvePromise: (value: unknown) => void;
      mock$fetch.mockImplementation(
        () =>
          new Promise((resolve) => {
            resolvePromise = resolve;
          }),
      );

      // Start first send (don't await)
      const first = chat.sendMessage("Theme 1");
      // Try second send while first is pending
      await chat.sendMessage("Theme 2");

      // Only one user message should exist (the first one)
      const userMsgs = chat.messages.value.filter(
        (m: { role: string }) => m.role === "user",
      );
      expect(userMsgs).toHaveLength(1);
      expect(userMsgs[0].content).toBe("Theme 1");

      // Resolve first to clean up
      resolvePromise!({
        themeConfig: DEFAULT_THEME,
        explanation: "Done",
      });
      await first;
    });
  });

  describe("applyTheme", () => {
    it("loads valid theme config into store", () => {
      chat.applyTheme(DEFAULT_THEME);
      expect(mockLoadConfig).toHaveBeenCalledWith(DEFAULT_THEME);
    });

    it("shows success toast on valid theme", () => {
      chat.applyTheme(DEFAULT_THEME);
      expect(mockToastAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Theme applied",
          color: "success",
        }),
      );
    });

    it("shows error toast on invalid theme", () => {
      chat.applyTheme({ invalidField: true } as unknown as ThemeConfig);
      expect(mockToastAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Invalid theme",
          color: "error",
        }),
      );
    });

    it("does not call store.loadConfig on invalid theme", () => {
      chat.applyTheme({ invalidField: true } as unknown as ThemeConfig);
      expect(mockLoadConfig).not.toHaveBeenCalled();
    });
  });

  describe("regenerateLastMessage", () => {
    it("does nothing when there are no messages", () => {
      chat.regenerateLastMessage();
      expect(mock$fetch).not.toHaveBeenCalled();
    });

    it("does nothing when there are no user messages", () => {
      mockMessages.value.push({
        id: "1",
        role: "assistant",
        content: "Hello",
        timestamp: Date.now(),
      });
      chat = useAiChat();
      chat.regenerateLastMessage();
      expect(mock$fetch).not.toHaveBeenCalled();
    });
  });

  describe("clearChat", () => {
    it("clears all messages", () => {
      mockMessages.value.push({
        id: "1",
        role: "user",
        content: "Hello",
        timestamp: Date.now(),
      });
      chat = useAiChat();
      chat.clearChat();
      expect(chat.messages.value).toHaveLength(0);
    });

    it("clears error state", () => {
      // Manually set state through the composable
      mockApiKey.value = "";
      // Trigger an error by sending without config
      chat.sendMessage("test").then(() => {
        chat.clearChat();
        expect(chat.error.value).toBeNull();
      });
    });
  });
});
