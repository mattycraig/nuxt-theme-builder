# Technical Debt: Layout and Page Testing Strategy

**Created:** February 13, 2026  
**Priority:** MEDIUM  
**Effort:** 16-20 hours  
**Impact:** Integration testing for layouts and pages (0% coverage)

---

## Problem Statement

All layouts (4 files) and most pages (15+ files) have **zero test coverage**. These are high-level integration points that orchestrate multiple composables, components, and business logic.

### Affected Files

**Layouts (0% coverage):**

- `layouts/default.vue` - Main editor + preview shell
- `layouts/preview.vue` - Iframe preview mode
- `layouts/ai.vue` - AI chat interface
- `layouts/coming-soon.vue` - Launch gate

**Pages (0% coverage except index):**

- `pages/index.vue` (50% coverage)
- `pages/ai.vue`
- `pages/about.vue`
- `pages/help.vue`
- `pages/privacy.vue`
- `pages/contact.vue`
- `pages/coming-soon.vue`
- `pages/blocks/**/*.vue` (7 files)
- `pages/components/**/*.vue` (3 files)
- `pages/templates/**/*.vue` (10 files)

### Current Coverage

- **Layouts:** 0%
- **Pages:** ~3% (only index.vue partially covered)
- **Risk Level:** MEDIUM (integration issues, layout regressions)

---

## Impact

Without layout/page tests, we cannot:

1. **Verify layout orchestration** (composables wired correctly)
2. **Test navigation flows** (route changes, redirects)
3. **Validate layout-specific behavior** (iframe sync, keyboard shortcuts)
4. **Catch integration bugs** (component + composable + store interactions)
5. **Test page-level state management**
6. **Ensure SEO metadata is correct**

**Business Risk:** Layout bugs affect entire app, navigation failures block users, poor user experience.

---

## Testing Strategy

### Approach 1: Integration Tests (Recommended for Layouts)

Test layouts as integration units that compose multiple parts:

```typescript
// tests/integration/layouts/default.test.ts
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import DefaultLayout from "~/layouts/default.vue";

describe("Default Layout Integration", () => {
  it("should render editor panel and preview frame", async () => {
    const wrapper = await mountSuspended(DefaultLayout);

    expect(wrapper.find('[data-testid="editor-panel"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="preview-frame"]').exists()).toBe(true);
  });

  it("should apply theme changes to preview", async () => {
    const wrapper = await mountSuspended(DefaultLayout);
    const store = useThemeStore();

    store.setSemanticColorForMode("light", "primary", "purple");

    await wrapper.vm.$nextTick();

    // Verify theme sync message sent to iframe
    expect(window.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "SYNC_THEME",
        payload: expect.objectContaining({
          colors: expect.objectContaining({
            light: expect.objectContaining({ primary: "purple" }),
          }),
        }),
      }),
      "*",
    );
  });

  it("should handle keyboard shortcuts", async () => {
    const wrapper = await mountSuspended(DefaultLayout);
    const store = useThemeStore();

    // Simulate Ctrl+Z
    await wrapper.trigger("keydown", { key: "z", ctrlKey: true });

    expect(store.undo).toHaveBeenCalled();
  });
});
```

### Approach 2: E2E Tests (Recommended for User Flows)

Use Playwright for full user journey testing:

```typescript
// tests/e2e/layouts/theme-editing-flow.spec.ts
import { test, expect } from "@playwright/test";

test("theme editing flow", async ({ page }) => {
  await page.goto("/");

  // Change primary color
  await page.click('[data-testid="color-picker-primary"]');
  await page.click('[data-testid="color-option-blue"]');

  // Verify preview updates
  const previewFrame = page.frameLocator('[data-testid="preview-iframe"]');
  const button = previewFrame.locator("button").first();
  await expect(button).toHaveCSS("background-color", "rgb(59, 130, 246)"); // blue-500
});
```

### Approach 3: Snapshot Tests (Supplementary)

For pages that are mostly static content:

```typescript
// tests/unit/pages/about.test.ts
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AboutPage from "~/pages/about.vue";

describe("About Page", () => {
  it("should match snapshot", async () => {
    const wrapper = await mountSuspended(AboutPage);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render markdown content", async () => {
    const wrapper = await mountSuspended(AboutPage);
    expect(wrapper.text()).toContain("About Nuxt UI Theme Builder");
  });
});
```

---

## Priority Matrix

### Critical (Integration Tests) 🔴

**`layouts/default.vue`** - Main application layout

- Editor panel visibility
- Preview iframe integration
- Keyboard shortcut handling
- Theme sync to iframe
- Navigation state management
- Command palette integration

**Estimated Effort:** 6-8 hours

---

**`layouts/preview.vue`** - Iframe preview mode

- Message reception from parent
- Route synchronization
- Theme application
- Color mode handling
- Navigation event forwarding

**Estimated Effort:** 4-6 hours

---

### High Priority (Integration + E2E) 🟡

**`pages/index.vue`** - Marketing/home page

- Navigation to sections
- Responsive layout
- Call-to-action buttons
- Feature showcase

**Estimated Effort:** 2-3 hours

---

**`pages/ai.vue`** - AI theme generation

- Chat interface integration
- Settings panel interaction
- Theme preview updates
- Error state handling

**Estimated Effort:** 3-4 hours

---

### Medium Priority (Snapshot + Basic Tests) 🟢

**Static Pages** - About, Help, Privacy, Contact

- Markdown rendering
- Navigation links
- SEO metadata

**Estimated Effort:** 4 pages × 0.5 hours = 2 hours

---

**Preview Pages** - Blocks, Components, Templates

- Route mounting
- Theme application
- Source code retrieval
- Navigation between previews

**Estimated Effort:** 20 pages × 15-20 min = 5-6 hours

---

## Implementation Plan

### Phase 1: Layout Integration Tests (10-14 hours)

1. **Setup Integration Test Infrastructure** (2-3 hours)
   - Create `tests/integration/layouts/` directory
   - Configure test utilities for layout mounting
   - Set up iframe mocking/simulation
   - Create layout test fixtures

2. **`layouts/default.vue` Tests** (6-8 hours)
   - Editor panel rendering
   - Preview frame integration
   - Keyboard shortcut handling
   - Theme synchronization
   - Command palette integration
   - Navigation state management
   - Fullscreen mode toggle
   - Source code view toggle

3. **`layouts/preview.vue` Tests** (4-6 hours)
   - postMessage reception
   - Route synchronization
   - Theme application
   - Color mode handling
   - Keyboard event forwarding
   - Navigation to parent

4. **`layouts/ai.vue` and `layouts/coming-soon.vue` Tests** (1-2 hours)
   - Basic mounting and rendering
   - Expected component presence

---

### Phase 2: Page Tests (6-8 hours)

1. **High-Priority Pages** (5-7 hours)
   - `pages/index.vue` integration tests
   - `pages/ai.vue` integration tests
   - Focus on user interactions and state management

2. **Static Pages** (2 hours)
   - Snapshot tests for About, Help, Privacy, Contact
   - Markdown rendering verification
   - SEO metadata checks

3. **Preview Pages** (deferred to E2E)
   - Focus E2E tests on preview navigation flows
   - Skip unit tests for these (too integration-heavy)

---

### Phase 3: E2E Test Enhancement (Optional, 8-12 hours)

1. **Theme Editing Flows**
   - Color changes reflected in preview
   - Radius adjustments update UI
   - Font changes apply correctly
   - Preset switching works

2. **AI Generation Flows**
   - Prompt submission
   - Theme generation
   - Apply to workspace
   - Error handling

3. **Navigation Flows**
   - Route navigation
   - Source code viewing
   - Fullscreen toggle
   - Preview resize

---

## Test Infrastructure Patterns

### Layout Test Helper

```typescript
// tests/setup/layout.ts
export async function mountLayout(
  layout: Component,
  options: LayoutMountOptions = {},
) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: options.routes || [],
  });

  return await mountSuspended(layout, {
    global: {
      plugins: [createTestingPinia(), router],
      mocks: {
        $route: options.route || { path: "/" },
        $router: router,
      },
    },
    ...options,
  });
}
```

### Iframe Mock Helper

```typescript
// tests/setup/iframe.ts
export function mockIframePostMessage() {
  const messages: any[] = [];

  vi.spyOn(window, "postMessage").mockImplementation((message) => {
    messages.push(message);
  });

  return {
    getMessages: () => messages,
    clearMessages: () => (messages.length = 0),
  };
}
```

---

## Success Criteria

- [ ] `layouts/default.vue` has comprehensive integration tests (80%+ coverage)
- [ ] `layouts/preview.vue` has integration tests (70%+ coverage)
- [ ] `layouts/ai.vue` and `layouts/coming-soon.vue` have basic tests (50%+ coverage)
- [ ] `pages/index.vue` has integration tests (70%+ coverage)
- [ ] `pages/ai.vue` has integration tests (60%+ coverage)
- [ ] Static pages have snapshot tests
- [ ] CI includes layout/page test execution
- [ ] E2E tests cover critical user flows
- [ ] Overall layout coverage reaches 50%+, page coverage reaches 40%+

---

## Challenges and Mitigations

### Challenge 1: Iframe Testing Complexity

**Problem:** Testing iframe postMessage and synchronization  
**Solution:** Mock iframe communication, test message dispatching separately from rendering

### Challenge 2: Router Integration

**Problem:** Layouts depend on Nuxt Router  
**Solution:** Use `@nuxt/test-utils` router mocking, test navigation in isolation

### Challenge 3: Full-Page State Management

**Problem:** Layouts coordinate multiple composables and stores  
**Solution:** Use `createTestingPinia` with realistic initial state, test one concern at a time

### Challenge 4: Markdown Content Loading

**Problem:** Static pages load markdown at build time  
**Solution:** Mock markdown content or include actual files in test context

---

## Deferred Work (Future Phases)

- Visual regression testing (Playwright screenshots)
- Performance testing (Lighthouse CI)
- Accessibility testing (axe-core integration)
- Cross-browser testing (Safari, Firefox)

---

## References

- [Nuxt Test Utils Layout Testing](https://nuxt.com/docs/getting-started/testing#layout-testing)
- [Vue Router Testing](https://test-utils.vuejs.org/guide/advanced/vue-router.html)
- [Playwright Component Testing](https://playwright.dev/docs/test-components)

---

## Related Issues

- Phase 1 Complete: Critical Path Coverage
- Technical Debt: Server API Testing Strategy
- Technical Debt: Component Testing Infrastructure
- TESTING-GAPS-ANALYSIS.md updated with this technical debt

---

**Status:** Open  
**Assignee:** TBD  
**Milestone:** Phase 3 - Integration Coverage  
**Target:** 80% overall coverage
