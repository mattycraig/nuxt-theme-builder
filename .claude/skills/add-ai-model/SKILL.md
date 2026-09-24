---
name: add-ai-model
description: Add, update, or retire an AI provider model option for the BYOK theme generator (OpenAI, Anthropic, Google) and verify the server provider factory supports it. Use when model lists go stale or a new provider/model is requested.
argument-hint: "<provider> <model-id> [label]"
---

# Add or update an AI model: $ARGUMENTS

1. **Verify the model ID** against the provider's current documentation. Model IDs change and retire; don't guess. The server passes the string straight to the provider, so a bad ID only fails at request time.
2. **Model list**: edit `AI_MODELS` in `app/types/ai.ts` (`label`, `value`, one-line `description`). Order matters: the first model for a provider becomes the default when a user switches providers. If you retire the current `DEFAULT_AI_SETTINGS.model`, update it too. Users' saved settings in localStorage may still reference an old ID; they can reselect.
3. **New provider** (rare): add it to `AI_PROVIDERS` and `AI_PROVIDER_OPTIONS`, the `provider` enum in `requestSchema`, and `getProviderModel` in `server/api/ai/generate.post.ts`. Install the `@ai-sdk/<provider>` package with `pnpm add`. Map provider-specific errors in `server/utils/aiErrorHandler.ts`.
4. **Structured output**: `server/utils/aiGenerate.ts` calls `generateText` with `Output.object({ schema })` (AI SDK 7), and the system prompt goes in `instructions`. System messages inside `messages` are rejected. Confirm the model supports structured/JSON output through its AI SDK provider. `tests/unit/server/utils/aiGenerate.test.ts` exercises the call with `MockLanguageModelV4`.
5. **Tests**: update `tests/unit/composables/useAiSettings.test.ts` and any tests that assert on model lists, then run `pnpm vitest run tests/unit/composables/useAiSettings.test.ts tests/unit/server`.
6. **E2E**: AI e2e specs mock `/api/ai/generate`, so they only cover the settings UI. A real end-to-end check needs a key in the app UI via `/run-app`, and must never be committed.
