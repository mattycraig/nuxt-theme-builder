import type { AiSettings, AiProvider } from "~/types/ai";
import { DEFAULT_AI_SETTINGS, AI_MODELS } from "~/types/ai";

const AI_SETTINGS_STORAGE_KEY = "ai-settings";

/**
 * Reactive AI settings with dual-persistence strategy.
 *
 * API keys can optionally be persisted to localStorage (`persistKey` flag).
 * When not persisted, they live in session-only `useState` and disappear on
 * full page reload. Provider and model selections are always persisted.
 */
export function useAiSettings() {
  const persistedSettings = useLocalStorage<AiSettings>(
    AI_SETTINGS_STORAGE_KEY,
    {
      ...DEFAULT_AI_SETTINGS,
    },
  );

  const sessionKey = useState<string>("ai-session-key", () => "");

  const settings = computed<AiSettings>({
    get: () => ({
      ...persistedSettings.value,
      apiKey: persistedSettings.value.persistKey
        ? persistedSettings.value.apiKey
        : sessionKey.value,
    }),
    set: (val: AiSettings) => {
      if (val.persistKey) {
        persistedSettings.value = { ...val };
      } else {
        sessionKey.value = val.apiKey;
        persistedSettings.value = { ...val, apiKey: "" };
      }
    },
  });

  const apiKey = computed({
    get: () => settings.value.apiKey,
    set: (val: string) => {
      settings.value = { ...settings.value, apiKey: val };
    },
  });

  const provider = computed({
    get: () => settings.value.provider,
    set: (val: AiProvider) => {
      const models = AI_MODELS[val];
      const firstModel = models?.[0]?.value ?? "";
      settings.value = { ...settings.value, provider: val, model: firstModel };
    },
  });

  const model = computed({
    get: () => settings.value.model,
    set: (val: string) => {
      settings.value = { ...settings.value, model: val };
    },
  });

  const persistKey = computed({
    get: () => settings.value.persistKey,
    set: (val: boolean) => {
      const currentKey = settings.value.apiKey;
      if (val) {
        persistedSettings.value = {
          ...settings.value,
          persistKey: true,
          apiKey: currentKey,
        };
        sessionKey.value = "";
      } else {
        sessionKey.value = currentKey;
        persistedSettings.value = {
          ...settings.value,
          persistKey: false,
          apiKey: "",
        };
      }
    },
  });

  const isConfigured = computed(() => apiKey.value.length > 0);

  const availableModels = computed(() => AI_MODELS[provider.value] ?? []);

  function clearApiKey() {
    sessionKey.value = "";
    persistedSettings.value = {
      ...persistedSettings.value,
      apiKey: "",
    };
  }

  return {
    apiKey,
    provider,
    model,
    persistKey,
    isConfigured,
    availableModels,
    clearApiKey,
  };
}
