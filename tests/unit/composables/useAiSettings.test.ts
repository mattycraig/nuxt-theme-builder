import { describe, it, expect, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { AI_MODELS, DEFAULT_AI_SETTINGS } from "~/types/ai";
import { useAiSettings } from "~/composables/useAiSettings";

let mockPersistedSettings = { ...DEFAULT_AI_SETTINGS };
let mockSessionKey: string | undefined;

mockNuxtImport("useLocalStorage", () => {
  return (_key: string, defaultVal: unknown) =>
    ref(mockPersistedSettings ?? { ...(defaultVal as object) });
});

mockNuxtImport("useState", () => {
  return (_key: string, init?: () => string) =>
    ref(mockSessionKey ?? (init ? init() : ""));
});

describe("useAiSettings", () => {
  beforeEach(() => {
    mockPersistedSettings = { ...DEFAULT_AI_SETTINGS };
    mockSessionKey = undefined;
  });

  describe("initial state", () => {
    it("starts with empty API key", () => {
      const { apiKey } = useAiSettings();
      expect(apiKey.value).toBe("");
    });

    it("defaults to openai provider", () => {
      const { provider } = useAiSettings();
      expect(provider.value).toBe("openai");
    });

    it("defaults to gpt-4o-mini model", () => {
      const { model } = useAiSettings();
      expect(model.value).toBe("gpt-4o-mini");
    });

    it("defaults to not persisting key", () => {
      const { persistKey } = useAiSettings();
      expect(persistKey.value).toBe(false);
    });

    it("is not configured without API key", () => {
      const { isConfigured } = useAiSettings();
      expect(isConfigured.value).toBe(false);
    });
  });

  describe("apiKey", () => {
    it("setting apiKey marks as configured", () => {
      const { apiKey, isConfigured } = useAiSettings();
      apiKey.value = "sk-test-key-123";
      expect(isConfigured.value).toBe(true);
    });

    it("clearing apiKey marks as not configured", () => {
      const { apiKey, isConfigured } = useAiSettings();
      apiKey.value = "sk-test";
      apiKey.value = "";
      expect(isConfigured.value).toBe(false);
    });
  });

  describe("provider switching", () => {
    it("changes provider value", () => {
      const { provider } = useAiSettings();
      provider.value = "anthropic";
      expect(provider.value).toBe("anthropic");
    });

    it("auto-selects first model when provider changes", () => {
      const { provider, model } = useAiSettings();
      provider.value = "anthropic";
      const expectedModel = AI_MODELS.anthropic[0].value;
      expect(model.value).toBe(expectedModel);
    });

    it("auto-selects first google model when switching to google", () => {
      const { provider, model } = useAiSettings();
      provider.value = "google";
      const expectedModel = AI_MODELS.google[0].value;
      expect(model.value).toBe(expectedModel);
    });
  });

  describe("model", () => {
    it("can be set directly", () => {
      const { model } = useAiSettings();
      model.value = "gpt-4o";
      expect(model.value).toBe("gpt-4o");
    });
  });

  describe("availableModels", () => {
    it("returns openai models by default", () => {
      const { availableModels } = useAiSettings();
      expect(availableModels.value).toEqual(AI_MODELS.openai);
    });

    it("returns anthropic models when provider is anthropic", () => {
      const { provider, availableModels } = useAiSettings();
      provider.value = "anthropic";
      expect(availableModels.value).toEqual(AI_MODELS.anthropic);
    });

    it("returns google models when provider is google", () => {
      const { provider, availableModels } = useAiSettings();
      provider.value = "google";
      expect(availableModels.value).toEqual(AI_MODELS.google);
    });

    it("each model has label, value, and description", () => {
      const { availableModels } = useAiSettings();
      for (const m of availableModels.value) {
        expect(m).toHaveProperty("label");
        expect(m).toHaveProperty("value");
        expect(m).toHaveProperty("description");
        expect(m.value.length).toBeGreaterThan(0);
      }
    });
  });

  describe("clearApiKey", () => {
    it("clears the API key", () => {
      const { apiKey, clearApiKey, isConfigured } = useAiSettings();
      apiKey.value = "sk-test-key";
      clearApiKey();
      expect(isConfigured.value).toBe(false);
    });
  });

  describe("persistKey", () => {
    it("can be toggled on", () => {
      const { persistKey } = useAiSettings();
      persistKey.value = true;
      expect(persistKey.value).toBe(true);
    });

    it("can be toggled off", () => {
      const { persistKey } = useAiSettings();
      persistKey.value = true;
      persistKey.value = false;
      expect(persistKey.value).toBe(false);
    });
  });
});
