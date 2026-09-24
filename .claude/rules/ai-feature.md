---
paths:
  - "server/api/ai/**"
  - "server/utils/ai*.ts"
  - "shared/constants/aiDefaults.ts"
  - "app/types/ai.ts"
  - "app/composables/useAi*.ts"
  - "app/components/ai/**"
  - "app/pages/ai.vue"
  - "app/utils/aiPrompts.ts"
---

# AI feature rules

- Provider and model options live in `app/types/ai.ts` (`AI_PROVIDERS`, `AI_MODELS`, `DEFAULT_AI_SETTINGS`). The server accepts any model string for a known provider, so a wrong model ID only fails at the provider. Verify IDs against the provider's docs before adding them.
- `server/utils/aiSystemPrompt.ts` generates its palette/font/shade lists from `shared/constants/theme.ts`, and `tests/unit/server/utils/aiSystemPrompt.test.ts` checks it. Never hand-write value lists there.
- `useAiChat` sends up to `MAX_CONVERSATION_WINDOW` _prior_ turns as `conversationHistory`. The current prompt goes separately as `prompt` (the server appends it), so don't include it twice. The server caps history at 6 messages and total characters at 20,000.
- Generated themes are validated three times: zod `generateObject` schema on the server, `ThemeConfigSchema` in `useAiChat`, and again when applied via postMessage in `usePreviewIframe`. Keep all three.
- API keys stay client-side: session `useState` by default, localStorage only when the user opts in (`persistKey`). Never send them anywhere except `/api/ai/generate`.
- The AI page runs inside the preview iframe and asks the parent to apply, save, or export via `MSG.APPLY_AI_THEME`.
- E2E AI tests mock `/api/ai/generate` with `page.route`, so no real keys are needed.
