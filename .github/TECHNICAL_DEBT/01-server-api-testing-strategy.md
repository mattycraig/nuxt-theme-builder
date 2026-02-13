# Technical Debt: Server API Testing Strategy

**Created:** February 13, 2026  
**Priority:** HIGH  
**Effort:** 8-12 hours  
**Impact:** Testing infrastructure for all server routes

---

## Problem Statement

Server API route tests are created but cannot execute in the Vitest unit test environment due to Nuxt/Vite module resolution limitations. Attempting to import server routes with `import("~/server/api/...")` fails with:

```
Error: Failed to resolve import "~/server/api/ai/generate.post" from "tests/unit/server/api/ai/generate.test.ts". Does the file exist?
Plugin: vite:import-analysis
```

### Affected Files

- ❌ `tests/unit/server/api/ai/generate.test.ts` (created, 0% execution)
- ❌ `tests/unit/server/api/source/path.test.ts` (created, 0% execution)
- ❌ Future: `auth/launch.post.ts`, `highlight.post.ts`

### Current Coverage

- **All server API routes:** 0%
- **Risk Level:** HIGH (security-critical endpoints untested)

---

## Impact

Without server API tests, we cannot:

1. **Validate request/response schemas** (zod validation in `/api/ai/generate`)
2. **Test rate limiting** (per-IP rate limiting logic)
3. **Verify security controls** (path sanitization in `/api/source/[...path]`)
4. **Test error handling** (provider errors, timeouts, validation failures)
5. **Ensure authentication** (launch gate password validation)
6. **Prevent regressions** when refactoring server logic

**Business Risk:** Production bugs in AI generation, authentication, or source code access could impact all users.

---

## Root Cause

Nuxt server routes use:

- Virtual modules (`#source-code-map`)
- Server-only imports (h3, AI SDK)
- Nuxt build-time transformations
- Server context that doesn't exist in client-test environment

Vitest's "nuxt" environment is client-focused and doesn't support server route imports out of the box.

---

## Proposed Solutions

### Option 1: Nitro Test Utils (Recommended) ⭐

Use Nitro's built-in testing support (available in Nuxt 3.5+):

```typescript
// tests/unit/server/api/ai/generate.nitro.test.ts
import { describe, it, expect } from "vitest";
import { $fetch, setup } from "@nuxt/test-utils";

await setup({
  server: true,
});

describe("POST /api/ai/generate", () => {
  it("should generate theme with valid request", async () => {
    const response = await $fetch("/api/ai/generate", {
      method: "POST",
      body: {
        provider: "openai",
        model: "gpt-4",
        apiKey: "test-key",
        prompt: "Create a vibrant theme",
      },
    });

    expect(response).toMatchObject({
      colors: expect.any(Object),
      radius: expect.any(String),
    });
  });
});
```

**Pros:**

- Official Nuxt/Nitro approach
- Tests full request/response cycle
- Validates middleware, validation, error handling
- Server context is real

**Cons:**

- Requires spinning up server (slower than pure unit tests)
- May need better mocking for AI providers

**Effort:** 4-6 hours for setup + migration

---

### Option 2: Extract Handler Logic (Partial Solution)

Extract core logic from API handlers into testable functions:

```typescript
// server/utils/aiGeneration.ts
export async function generateThemeFromPrompt(
  provider: Provider,
  model: string,
  apiKey: string,
  prompt: string,
): Promise<ThemeConfig> {
  // Pure function, easily testable
}

// server/api/ai/generate.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // ... validation, rate limiting
  return await generateThemeFromPrompt(
    body.provider,
    body.model,
    body.apiKey,
    body.prompt,
  );
});
```

Then test `generateThemeFromPrompt` in isolation.

**Pros:**

- Fast unit tests
- No server spin-up required
- Tests core business logic

**Cons:**

- Doesn't test HTTP layer (validation, rate limiting, error responses)
- Requires refactoring existing routes
- Split between integration and unit tests

**Effort:** 6-8 hours for refactor + tests

---

### Option 3: Mock Nuxt Virtual Modules (Hacky, Not Recommended)

Manually mock virtual modules in test setup:

```typescript
vi.mock("#source-code-map", () => ({
  default: {
    "blocks/hero.vue": "<template>...</template>",
  },
}));
```

**Pros:**

- Tests run in unit test environment

**Cons:**

- Brittle, breaks with Nuxt updates
- Doesn't test real integrations
- High maintenance burden

**Effort:** 8-12 hours + ongoing maintenance

---

## Recommended Approach

**Use Option 1 (Nitro Test Utils) for comprehensive API testing:**

1. Create new test directory: `tests/integration/api/`
2. Configure Vitest to run integration tests separately
3. Use `@nuxt/test-utils` server mode for real HTTP testing
4. Mock external dependencies (OpenAI, Anthropic, Google AI)
5. Verify request validation, rate limiting, error handling

**Supplement with Option 2 where appropriate:**

- Extract complex business logic for pure function testing
- Keep HTTP layer thin (validation, orchestration only)

---

## Implementation Plan

### Phase 1: Infrastructure Setup (2-3 hours)

1. Install/configure `@nuxt/test-utils` server mode
2. Create `tests/integration/api/` directory
3. Set up Vitest config for integration tests
4. Create helper utilities for mocking AI providers

### Phase 2: Migrate Existing Tests (3-4 hours)

1. Migrate `ai/generate.test.ts` to integration style
2. Migrate `source/path.test.ts` to integration style
3. Add proper mocking for AI SDK providers

### Phase 3: Add Remaining Routes (3-4 hours)

1. Create tests for `auth/launch.post.ts`
2. Create tests for `highlight.post.ts`
3. Document patterns for future API tests

### Phase 4: CI Integration (1-2 hours)

1. Add integration test step to CI workflow
2. Configure separate coverage reporting
3. Set coverage thresholds for server routes

---

## Success Criteria

- [ ] All server API routes have integration tests
- [ ] Tests cover happy path, error cases, edge cases
- [ ] CI runs integration tests on every PR
- [ ] Coverage for server routes reaches 80%
- [ ] Test execution time < 60 seconds for all API tests
- [ ] Documentation updated with testing patterns

---

## References

- [Nuxt Test Utils - Server Testing](https://nuxt.com/docs/getting-started/testing#server-testing)
- [Nitro Testing Guide](https://nitro.unjs.io/guide/testing)
- [Vitest Multiple Configs](https://vitest.dev/guide/workspace)

---

## Related Issues

- Phase 1 Complete: Critical Path Coverage
- TESTING-GAPS-ANALYSIS.md updated with this technical debt

---

**Status:** Open  
**Assignee:** TBD  
**Milestone:** Phase 2 - Testing Infrastructure
