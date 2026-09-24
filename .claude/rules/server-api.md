---
paths:
  - "server/**"
  - "app/utils/security.ts"
  - "nuxt.config.ts"
---

# Server and security rules

- Validate every request body with a strict zod schema (`safeParse`, then a 400 with a generic `statusMessage`). Never echo raw input or internal error details back to the client; log server-side with a `[Tag]` prefix instead.
- Import cross-layer values from `~~/shared/...`. The app-layer `~/types/*` modules are not meant for server code.
- `/api/ai/generate` is BYOK. The API key arrives in the request body and must never be logged, persisted, cached, or included in error messages. Keep the timeout (`AbortSignal.timeout`), `maxRetries`, `classifyAiError` mapping, payload limits, and the per-IP rate limit.
- The in-memory rate limiter is per server instance (weak on serverless). Don't treat it as a security boundary.
- `/api/source/[...path]` must reject `..`, null bytes, and anything outside `templates/` (`isAllowedSourcePath`). Content comes only from the build-time virtual map, never from disk.
- `/api/highlight` disables the nuxt-security XSS validator by route rule because it accepts raw code. Its output must still pass `isSafeHighlightedHtml`.
- CSP uses nonces + `strict-dynamic`. New third-party scripts, fonts, or connect targets need matching CSP entries in `nuxt.config.ts`.
- Route rules: demo routes (`/components/**`, `/blocks/**`, `/templates/**`) are `noindex`. ISR is enabled only for Vercel production builds (`enableIsrRouteRules`). `/api/**` and `/ai` are never cached.
