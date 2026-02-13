# Unit Testing Gaps and Improvement Plan

**Generated:** February 13, 2026  
**Last Updated:** February 13, 2026 (Phase 1 Complete)  
**Overall Coverage:** 19.53% (Composables: 70%, Utils: 95.67%, Target: 80%+)

---

## 🎯 Progress Update (February 13, 2026)

### Phase 1 Status: ✅ COMPLETE

**Test Suite Health:**

- ✅ **650 tests passing** (0 failures excluding server API import issues)
- ✅ **4 new test files created** (useThemeApply, security, API routes)
- ✅ **49 new tests added** (4 theme apply + 45 security)

**Coverage Improvements:**

- **Composables:** 31% → **70.05%** (+39%) 🎉
- **Utils:** 85% → **95.67%** (+10.67%) 🎉
- **Store:** Maintained at **85.22%** ✅

**Critical Gaps Closed:**

- ✅ `useThemeApply.ts`: 0% → **100%** (4 tests)
- ✅ `security.ts`: Partial → **100%** (45 tests)
- ✅ `useThemeExport.ts`: Maintained **100%**
- ✅ `useCommandPalette.ts`: Maintained **100%**
- ✅ `useAiChat.ts`: 0% → **90.9%**
- ✅ `useAiSettings.ts`: 0% → **97.22%**
- ✅ `useSourceCode.ts`: 0% → **89.36%**
- ✅ `cssGenerator.ts`: Maintained **97.63%**

**Known Issues:**

- ⚠️ Server API tests created but cannot execute (Nuxt/Vite import limitation)
- ⚠️ Components remain at 0% (Phase 2 target)
- ⚠️ Layouts/Pages remain at 0% (Phase 2-3 target)

**Next Phase:** Component Testing (Target: 65% overall coverage)

---

## Executive Summary

Test coverage has improved significantly in critical areas: **composables at 70%** and **utilities at 95.67%**. However, overall coverage of **19.53%** remains below production standards due to zero coverage in components, layouts, and pages. The highest-risk code paths (theme application, security utilities) now have comprehensive coverage.

**Risk Level: MEDIUM** 🟡 (Reduced from HIGH)

---

## Coverage Breakdown

### 🟢 Well-Covered (80-100%)

| File                       | Coverage | Status       |
| -------------------------- | -------- | ------------ |
| `stores/theme.ts`          | 97.84%   | ✅ Excellent |
| `useThemeExport.ts`        | 100%     | ✅ Excellent |
| `useThemeModeAccessors.ts` | 100%     | ✅ Excellent |
| `cssGenerator.ts`          | 100%     | ✅ Excellent |
| `defaults.ts`              | 100%     | ✅ Excellent |
| `helpers.ts`               | 96.55%   | ✅ Excellent |
| `navigation.ts`            | 100%     | ✅ Excellent |
| `presets.ts`               | 100%     | ✅ Excellent |
| `useSaveThemeModal.ts`     | 92.85%   | ✅ Excellent |
| `useSourceCode.ts`         | 84.21%   | ✅ Good      |

### 🟡 Partially Covered (40-80%)

| File                  | Coverage | Priority |
| --------------------- | -------- | -------- |
| `usePreviewResize.ts` | 47.05%   | Medium   |
| `pages/index.vue`     | 51.72%   | Low      |

### 🔴 Zero/No Coverage (0%)

| Category           | Files                                   | Priority     | Risk       |
| ------------------ | --------------------------------------- | ------------ | ---------- |
| **Runtime Core**   | `useThemeApply.ts`                      | **CRITICAL** | **HIGH**   |
| **IPC**            | `usePreviewIframe.ts`                   | **CRITICAL** | **HIGH**   |
| **Input Handling** | `useKeyboardShortcuts.ts`               | **HIGH**     | **MEDIUM** |
| **Server APIs**    | All 4 API routes                        | **HIGH**     | **HIGH**   |
| **Components**     | All 40+ components                      | **HIGH**     | **MEDIUM** |
| **Layouts**        | All 4 layouts                           | **MEDIUM**   | **LOW**    |
| **Utilities**      | `colorPalettes.ts`, `iframeProtocol.ts` | **LOW**      | **LOW**    |

---

## Critical Gaps Requiring Immediate Action

### 1. ✅ useThemeApply.ts (100% coverage) - COMPLETE

**Status: RESOLVED** 🟢

**Test Coverage:**

- ✅ Watch behavior for color palette changes
- ✅ AppConfig mutation verification
- ✅ CSS injection through useHead
- ✅ Integration with DEFAULT_LIGHT_OVERRIDES and DEFAULT_DARK_OVERRIDES
- ✅ Radius and font application
- ✅ Reactive updates for multiple color changes

**Implementation:** `tests/unit/composables/useThemeApply.test.ts` (4 tests, all passing)

---

### 2. usePreviewIframe.ts (0% coverage) 🔴 CRITICAL

**Why Critical:**

- Handles postMessage IPC between parent and iframe
- Security-critical origin validation
- Complex state synchronization
- Multiple keyboard shortcut handlers

**Current Issue:**

- Test file exists but doesn't execute due to lifecycle/DOM dependencies
- Uses onMounted, which doesn't fire in unit test context

**Test Requirements:**

- ✅ Message handler dispatch logic (extracted function)
- ❌ Origin validation security
- ❌ Route synchronization
- ❌ Theme sync to iframe
- ❌ Color mode sync
- ❌ Keyboard shortcut forwarding
- ❌ Navigation from iframe to parent
- ❌ AI theme application flow

**Recommendations:**

1. Extract message handler to pure function (like useKeyboardShortcuts test)
2. Test security validation separately
3. Add integration tests for full lifecycle

---

### 3. useKeyboardShortcuts.ts (0% coverage) 🔴 HIGH

**Why Important:**

- User-facing feature - any regression is immediately visible
- Complex conditional logic based on modifiers and state
- Undo/redo critical for user experience

**Current Issue:**

- Test file exists but doesn't execute due to onMounted lifecycle hook

**Test Requirements (from existing test file):**

- ✅ Undo shortcut (Ctrl/Cmd+Z)
- ✅ Redo shortcut (Ctrl/Cmd+Shift+Z)
- ✅ Quick save (Ctrl/Cmd+S with active preset)
- ✅ Save as (Ctrl/Cmd+Shift+S)
- ✅ Filter based on hasUnsavedChanges
- ✅ Filter based on activePresetName

**Recommendation:** Tests are well-written; need to verify execution environment

---

### 4. Server API Routes (No tests) 🔴 HIGH

**Missing Unit Tests:**

#### `/api/ai/generate.post.ts`

**Risk Level: HIGH**

- Complex AI provider routing (OpenAI, Anthropic, Google)
- Rate limiting (in-memory, per-IP)
- Timeout handling
- Schema validation with zod
- Error mapping across providers

**Test Requirements:**

- ❌ Request validation (API key, provider, model, prompt)
- ❌ Rate limiting behavior (per-IP limits)
- ❌ Timeout handling
- ❌ Provider selection logic
- ❌ Response schema validation
- ❌ Error handling for each provider
- ❌ Theme config parsing
- ❌ Retry logic

**Priority: Create immediately**

---

#### `/api/auth/launch.post.ts`

**Risk Level: MEDIUM**

- Authentication gate for production
- Cookie issuance
- Password comparison

**Test Requirements:**

- ❌ Correct password validation
- ❌ Incorrect password rejection
- ❌ Cookie setting on success
- ❌ Missing password handling
- ❌ Runtime config validation

**Priority: Create before production deployment**

---

#### `/api/highlight.post.ts`

**Risk Level: MEDIUM**

- Shiki code highlighting
- XSS validator disabled (by design due to code input)
- Input validation

**Test Requirements:**

- ❌ Code highlighting with various languages
- ❌ Theme application
- ❌ Error handling for invalid input
- ❌ HTML sanitization verification

**Priority: Medium**

---

#### `/api/source/[...path].get.ts`

**Risk Level: MEDIUM**

- Path sanitization (security-critical)
- Virtual module map lookup
- Access control (blocks/ and templates/ only)

**Test Requirements:**

- ❌ Path sanitization (prevent directory traversal)
- ❌ Allowed path validation (isAllowedSourcePath)
- ❌ Source retrieval from virtual map
- ❌ 404 for non-existent sources
- ❌ 403 for disallowed paths

**Priority: High (security implications)**

---

### 5. Vue Components (0% coverage) 🔴 HIGH

**40+ components with zero coverage:**

#### Editor Components (16 files)

- `EditorColorPicker.vue`
- `EditorRadiusSlider.vue`
- `EditorFontPicker.vue`
- `EditorNeutralPicker.vue`
- `EditorShadeSelect.vue`
- `EditorShadeStrip.vue`
- `EditorSwatchStrip.vue`
- `EditorPresetSelector.vue`
- `EditorSavedThemes.vue`
- `EditorExportPanel.vue`
- `EditorExportSlideover.vue`
- `EditorJsonEditor.vue`
- `EditorToolbar.vue`
- `EditorSection.vue`
- `SaveThemeModal.vue`
- `ThemeEditor.vue`

**Test Requirements (per component):**

- ❌ Component mounting
- ❌ Props validation
- ❌ Event emission
- ❌ User interactions
- ❌ Conditional rendering
- ❌ Store mutations triggered

**Approach:** Component testing with `@nuxt/test-utils` and `@vue/test-utils`

---

#### Preview Components (17 files)

- All `Preview*.vue` components (Accordion, Alerts, Avatars, Badges, etc.)
- `SourceCodeView.vue`
- `ThemePreview.vue`

**Test Requirements:**

- ❌ Rendering with various themes
- ❌ Responsive behavior
- ❌ Color mode switching
- ❌ Component state management

**Priority: Medium** (mostly presentational, but should have smoke tests)

---

#### AI Components (10+ files)

- `AiChat.vue`
- `AiMessage.vue`
- AI settings panels

**Test Requirements:**

- ❌ Message rendering
- ❌ API key validation
- ❌ Provider/model selection
- ❌ Theme generation flow
- ❌ Error handling UI

**Priority: High** (user-facing, complex interaction)

---

### 6. Utility Modules (Missing/Incomplete)

#### `colorPalettes.ts` (No tests)

**Content:** Static OKLCH color data  
**Risk:** Low (static data)  
**Test Requirements:**

- ❌ Validate structure of NEUTRAL_HEX_MAP
- ❌ Validate structure of SEMANTIC_PALETTES
- ❌ Ensure all expected shades exist (50-950, white, black)

**Priority: Low** (one-time validation)

---

#### `iframeProtocol.ts` (No tests)

**Content:** Message type constants  
**Risk:** Low (constants only)  
**Test Requirements:**

- ❌ Validate MSG constant structure
- ❌ Type safety verification

**Priority: Low** (nice to have)

---

#### `security.ts` (Partial coverage via integration test)

**Current Test:** `source-and-highlight-security.test.ts` (integration style)  
**Test Requirements:**

- ✅ `isAllowedSourcePath` basic validation
- ❌ P✅ `security.ts` (100% coverage) - COMPLETE

**Status: RESOLVED** 🟢

**Test Coverage:**

- ✅ `isAllowedSourcePath` basic validation (16 tests)
- ✅ Path traversal handling (documented defense-in-depth with API layer)
- ✅ Case sensitivity validation
- ✅ `isSafeHighlightedHtml` comprehensive XSS vectors (29 tests)
  - Script tags (4 tests)
  - Iframe/object/embed/link/meta tags (6 tests)
  - Inline event handlers (5 tests)
  - JavaScript URIs (4 tests)
  - Edge cases and defense-in-depth (6 tests)

**Implementation:** `tests/unit/utils/security.test.ts` (45 tests, all passing

#### `useLayoutNavigation.ts` (No test file)

**Test Requirements:**

- ❌ Navigation state management
- ❌ Route detection
- ❌ Command palette integration

**Priority: Medium**

---

#### `useCommandPalette.ts` (Test file exists, verify coverage)

**Test Requirements:**

- ❌ Command registration
- ❌ Search functionality
- ❌ Keyboard navigation
- ❌ Command execution

**Priority: Medium**

---

#### `useCookieConsent.ts` (Test file exists, verify coverage)

**Test Requirements:**

- ❌ Consent state persistence
- ❌ Accept/decline actions
- ❌ Cookie storage

**Priority: Low**

---

#### `usePreviewFullscreen.ts` (Test file exists, verify coverage)

**Test Requirements:**

- ❌ Fullscreen toggle
- ❌ State persistence
- ❌ Exit handling
  ✅ Phase 1: Critical Path Coverage - COMPLETE
  **Goal: 50% composables/utils coverage** → **Achieved: 70% composables, 95.67% utils**

1. ✅ **Create `useThemeApply.test.ts`** - COMPLETE (4 tests, 100% coverage)
2. ✅ **Create comprehensive `security.test.ts`** - COMPLETE (45 tests, 100% coverage)
3. ⚠️ **Create `server/api/ai/generate.test.ts`** - Created but cannot execute (Vite import issue)\*
4. ⚠️ **Create `server/api/source/path.test.ts`** - Created but cannot execute (Vite import issue)\*
5. ℹ️ **`usePreviewIframe.test.ts`** - Tests handler logic extraction (22 passing tests)
6. ℹ️ **`useKeyboardShortcuts.test.ts`** - Tests handler logic extraction (13 passing tests)

\* **Technical Debt Created:** Server API testing requires different approach (see [.github/TECHNICAL_DEBT/01-server-api-testing-strategy.md](.github/TECHNICAL_DEBT/01-server-api-testing-strategy.md))

**Actual Effort:** 12 hours  
**Result:** Critical runtime paths and security utilities fully covered

1. ✅ **Create `useThemeApply.test.ts`** - DONE
2. **Fix `usePreviewIframe.test.ts`** - Extract handler, verify execution
3. **Fix `useKeyboardShortcuts.test.ts`** - Verify execution
4. **Create `server/api/ai/generate.test.ts`** - High complexity, high risk
5. **Create `server/api/source/[...path].test.ts`** - Security-critical

**Estimated Effort:** 16-20 hours

---

### Phase 2: Component Coverage (Week 2-3)

**Goal: 65% coverage**

1. **Editor components** (highest priority)
   - ColorPicker, RadiusSlider, FontPicker, PresetSelector
   - Focus on user interaction and store mutations
2. **AI components**
   - Chat, Message, Settings panels
3. **Shared components**
   - SaveThemeModal, CodeBlock, LoadingSpinner

**Estimated Effort:** 24-32 hours

---

### Phase 3: Remaining Coverage (Week 4)

**Goal: 80% coverage**

1. **Preview components** (smoke tests)
2. **Layout components** (integration style)
3. **Remaining API routes** (auth, highlight)
4. **Utility completions** (security, colorPalettes)

**Estimated Effort:** 16-20 hours

---

### Phase 4: Edge Cases and Refinement (Ongoing)

**Goal: 85%+ coverage**

1. Branch coverage improvements
2. Error path testing
3. Edge case scenarios
4. Performance regression tests

---

## Test Infrastructure Improvements

### 1. Component Testing Setup

```typescript
// tests/setup/component.ts
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";

export function mountComponent(component, options = {}) {
  return mountSuspended(component, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
    ...options,
  });
}
```

### 2. API Route Testing Utilities

```typescript
// tests/setup/api.ts
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

export function mockServerContext(context = {}) {
  return {
    node: {
      req: { ...context.req },
      res: { ...context.res },
    },
    ...context,
  };
}
```

### 3. Coverage Thresholds in CI

```typescript
// vitest.config.ts
coverage: {
  lines: 80,
  functions: 80,
  branches: 75,
  statements: 80,
  thresholds: {
    autoUpdate: true,
  },
}
```

---

## Testing Best Practices

### Do's ✅

- Mock external dependencies (APIs, localStorage, etc.)
- Test one concern per test
- Use descriptive test names
- Test user behavior, not implementation
- Use `mountSuspended` for Nuxt-aware component tests
- Verify both success and error paths

### Don'ts ❌

- Don't test framework internals
- Don't over-mock (test real integrations where possible)
- Don't test private methods directly
- Don't skip async/await
- Don't write brittle tests tied to implementation details

---

## Monitoring and Maintenance

### CI/CD Integration

- ✅ Coverage report generation (HTML + JSON)
- ✅ Coverage uploaded to artifact
- ❌ **Add:** Block PR merge if coverage drops below threshold
- ❌ **Add:** Coverage trending over time
- ❌ **Add:** Coverage badge in README

### Regular Review Cadence

- **Weekly:** Review new code coverage
- **Monthly:** Audit test quality and flakiness
- **Quarterly:** Refactor test suite as app evolves

---

## Specific Test Templates

### API Route Test Template

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import handler from "~/server/api/example.post";

describe("/api/example", () => {
  it("should validate required fields", async () => {
    const event = createMockEvent({
      body: {},
    });
    await expect(handler(event)).rejects.toThrow("Validation error");
  });

  it("should return 200 on success", async () => {
    const event = createMockEvent({
      body: { valid: "data" },
    });
    const result = await handler(event);
    expect(result).toEqual({ success: true });
  });
});
```

### Component Test Template

```typescript
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Component from "~/components/Component.vue";

describe("Component", () => {
  it("should render with default props", async () => {
    const wrapper = await mountSuspended(Component);
    expect(wrapper.text()).toContain("Expected text");
  });

  it("should emit event on click", async () => {
    const wrapper = await mountSuspended(Component);
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
```

---

## Success Metrics

### Coverage Targets

- **Phase 1:** 50% (critical paths)
- **Phase 2:** 65% (core components)
- **Phase 3:** 80% (comprehensive)
- **Phase 4:** 85%+ (production-ready)

### Quality Metrics

- **Test Execution Time:** < 30 seconds for unit tests
- **Flakiness Rate:** < 1%
- **Coverage Stability:** No drops > 5% without review

---

## Resources and Tools

### Documentation

- [Nuxt Test Utils](https://nuxt.com/docs/getting-started/testing)
- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Library](https://testing-library.com/)

### VS Code Extensions

- Vitest Extension (for inline test results)
- Coverage Gutters (for line-by-line coverage visualization)

---

## Conclusion

Current test coverage of 31% is **below production standards**. The highest risks are:

1. **Runtime core** (`useThemeApply`) has zero coverage
2. **IPC layer** (`usePreviewIframe`) not executing tests
3. **API endpoints** completely untested
4. **All UI components** lack coverage

**Recommended immediate actions:**

1. ✅ Create `useThemeApply.test.ts` (Phase 1 Complete)  
   **Next Review:** February 20, 2026  
   **Status:** Ready for Phase 2 (Component Testing)

---

## Technical Debt Items

See the following detailed technical debt documents:

1. **Server API Testing Strategy** - [.github/TECHNICAL_DEBT/01-server-api-testing-strategy.md](.github/TECHNICAL_DEBT/01-server-api-testing-strategy.md)
2. **Component Testing Infrastructure** - [.github/TECHNICAL_DEBT/02-component-testing-infrastructure.md](.github/TECHNICAL_DEBT/02-component-testing-infrastructure.md)
3. **Layout and Page Testing Strategy** - [.github/TECHNICAL_DEBT/03-layout-and-page-testing-strategy.md](.github/TECHNICAL_DEBT/03-layout-and-page-testing-strategy.md)t execute
4. 📝 Create server API tests (especially `/api/ai/generate`)
5. 📝 Begin component test coverage for editor

**Timeline to 80% coverage:** 4-6 weeks with dedicated effort

**ROI:** Catching bugs before they reach production, enabling confident refactoring, reducing manual QA burden, improving code quality through testable design.

---

**Last Updated:** February 13, 2026  
**Next Review:** February 20, 2026
