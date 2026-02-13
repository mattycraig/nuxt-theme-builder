# Technical Debt: Component Testing Infrastructure

**Created:** February 13, 2026  
**Priority:** HIGH  
**Effort:** 24-32 hours  
**Impact:** Testing for 40+ Vue components (0% coverage)

---

## Problem Statement

All Vue components (40+ files) have **zero test coverage**. This includes:

- **Editor components** (16 files): ColorPicker, RadiusSlider, FontPicker, PresetSelector, etc.
- **AI components** (10+ files): Chat, Message, Settings panels
- **Preview components** (17 files): Component showcases for theme preview
- **Shared components** (7 files): CodeBlock, LoadingSpinner, SaveThemeModal

### Current Coverage

- **All components:** 0%
- **Risk Level:** HIGH (user-facing features untested)

---

## Impact

Without component tests, we cannot:

1. **Verify user interactions** (clicks, inputs, form submissions)
2. **Test prop validation** (required props, type checking)
3. **Validate event emissions** (parent-child communication)
4. **Test conditional rendering** (v-if/v-show logic)
5. **Verify store mutations** (state changes from components)
6. **Catch visual regressions** (UI breaking changes)
7. **Enable confident refactoring** (fear of breaking existing functionality)

**Business Risk:** UI bugs discovered in production, poor user experience, costly hotfixes.

---

## Component Priority Matrix

### Critical (Implement First) 🔴

**Editor Components** - Direct user interaction, store mutations

- `EditorColorPicker.vue` - Semantic color selection
- `EditorRadiusSlider.vue` - Border radius control
- `EditorFontPicker.vue` - Typography selection
- `EditorPresetSelector.vue` - Theme preset management
- `EditorNeutralPicker.vue` - Neutral palette selection

**Estimated Effort:** 8-10 hours (5 components × 1.5-2 hours each)

---

### High Priority (Implement Second) 🟡

**AI Components** - Complex user flows, external integrations

- `AiChat.vue` - Message thread, API calls, error handling
- `AiMessage.vue` - Message rendering, code blocks
- `AiSettingsPanel.vue` - API key validation, provider selection

**Shared Modal/Dialog Components**

- `SaveThemeModal.vue` - Form validation, store interaction
- `CodeBlock.vue` - Syntax highlighting, copy functionality

**Estimated Effort:** 10-12 hours (5-6 components × 2 hours each)

---

### Medium Priority (Smoke Tests) 🟢

**Preview/Showcase Components** - Mostly presentational

- All `Preview*.vue` showcase pages (17 files)
- Smoke tests to ensure mounting without errors
- Basic prop rendering verification

**Estimated Effort:** 6-8 hours (17 components × 20-30 min each)

---

## Testing Infrastructure Setup

### 1. Component Test Helper Utilities

```typescript
// tests/setup/component.ts
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import { useThemeStore } from "~/stores/theme";

export async function mountThemeAwareComponent(
  component: Component,
  options: MountOptions = {},
) {
  const wrapper = await mountSuspended(component, {
    global: {
      plugins: [
        createTestingPinia({
          stubActions: false,
          initialState: {
            theme: {
              config: DEFAULT_THEME_CONFIG,
            },
          },
        }),
      ],
      stubs: {
        // Stub Nuxt UI components if needed
        UButton: { template: "<button><slot /></button>" },
        UModal: { template: "<div><slot /></div>" },
      },
    },
    ...options,
  });

  return {
    wrapper,
    store: useThemeStore(),
  };
}
```

### 2. User Interaction Test Utilities

```typescript
// tests/setup/interactions.ts
export async function selectOption(wrapper, selector, value) {
  const select = wrapper.find(selector);
  await select.setValue(value);
  await wrapper.vm.$nextTick();
}

export async function clickButton(wrapper, text) {
  const button = wrapper.findAll("button").find((b) => b.text() === text);
  await button.trigger("click");
  await wrapper.vm.$nextTick();
}
```

### 3. Snapshot Testing Configuration

```typescript
// tests/setup/snapshots.ts
export function createComponentSnapshot(wrapper) {
  return {
    html: wrapper.html(),
    props: wrapper.props(),
    emitted: wrapper.emitted(),
  };
}
```

---

## Test Patterns and Examples

### Pattern 1: Editor Component Test

```typescript
// tests/unit/components/editor/ColorPicker.test.ts
import { describe, it, expect } from "vitest";
import { mountThemeAwareComponent } from "~/tests/setup/component";
import EditorColorPicker from "~/components/editor/ColorPicker.vue";

describe("EditorColorPicker", () => {
  it("should render with default semantic colors", async () => {
    const { wrapper } = await mountThemeAwareComponent(EditorColorPicker, {
      props: { modelValue: "primary", mode: "light" },
    });

    expect(wrapper.find('[data-testid="color-picker"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Primary");
  });

  it("should emit update when color changes", async () => {
    const { wrapper } = await mountThemeAwareComponent(EditorColorPicker, {
      props: { modelValue: "primary", mode: "light" },
    });

    await wrapper.find('[data-testid="color-blue"]').trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["blue"]);
  });

  it("should update store when color is selected", async () => {
    const { wrapper, store } = await mountThemeAwareComponent(
      EditorColorPicker,
      {
        props: { modelValue: "primary", mode: "light" },
      },
    );

    await wrapper.find('[data-testid="color-purple"]').trigger("click");

    expect(store.config.colors.light.primary).toBe("purple");
  });
});
```

### Pattern 2: AI Component Test

```typescript
// tests/unit/components/ai/Chat.test.ts
import { describe, it, expect, vi } from "vitest";
import { mountThemeAwareComponent } from "~/tests/setup/component";
import AiChat from "~/components/ai/Chat.vue";

describe("AiChat", () => {
  it("should display empty state when no messages", async () => {
    const { wrapper } = await mountThemeAwareComponent(AiChat);

    expect(wrapper.text()).toContain("Start a conversation");
  });

  it("should send message when form is submitted", async () => {
    const { wrapper } = await mountThemeAwareComponent(AiChat);

    await wrapper.find("textarea").setValue("Create a blue theme");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("send")).toBeTruthy();
    expect(wrapper.emitted("send")[0][0]).toMatchObject({
      content: "Create a blue theme",
    });
  });

  it("should display error when API key is missing", async () => {
    const { wrapper } = await mountThemeAwareComponent(AiChat);

    // Mock missing API key
    const aiSettings = useAiSettings();
    aiSettings.apiKey.value = "";

    await wrapper.find("form").trigger("submit");

    expect(wrapper.text()).toContain("API key is required");
  });
});
```

### Pattern 3: Smoke Test for Preview Components

```typescript
// tests/unit/components/showcase/Accordion.test.ts
import { describe, it, expect } from "vitest";
import { mountThemeAwareComponent } from "~/tests/setup/component";
import ShowcaseAccordion from "~/components/showcase/components/Accordion.vue";

describe("ShowcaseAccordion (smoke test)", () => {
  it("should mount without errors", async () => {
    const { wrapper } = await mountThemeAwareComponent(ShowcaseAccordion);

    expect(wrapper.exists()).toBe(true);
  });

  it("should render accordion items", async () => {
    const { wrapper } = await mountThemeAwareComponent(ShowcaseAccordion);

    const items = wrapper.findAll('[data-testid^="accordion-item"]');
    expect(items.length).toBeGreaterThan(0);
  });
});
```

---

## Implementation Plan

### Phase 1: Infrastructure Setup (4-6 hours)

1. ✅ Create `tests/setup/component.ts` with helper utilities
2. ✅ Configure `@pinia/testing` for store mocking
3. ✅ Create test data fixtures (sample themes, colors, etc.)
4. ✅ Document testing patterns in README

### Phase 2: Editor Components (8-10 hours)

1. `EditorColorPicker.vue` (2 hours)
   - Prop validation
   - Color selection
   - Store mutation
   - Event emission

2. `EditorRadiusSlider.vue` (1.5 hours)
   - Slider interaction
   - Value updates
   - Visual/semantic modes

3. `EditorFontPicker.vue` (1.5 hours)
   - Font selection
   - Google Fonts integration
   - Store updates

4. `EditorPresetSelector.vue` (2 hours)
   - Preset loading
   - Save/delete actions
   - Overwrite confirmation

5. `EditorNeutralPicker.vue` (1.5 hours)
   - Neutral color selection
   - Light/dark mode handling

### Phase 3: AI Components (10-12 hours)

1. `AiChat.vue` (4 hours)
   - Message rendering
   - Form submission
   - API error handling
   - Loading states

2. `AiMessage.vue` (2 hours)
   - Message types (user/assistant)
   - Code block rendering
   - Theme preview integration

3. `AiSettingsPanel.vue` (3 hours)
   - API key validation
   - Provider/model selection
   - Settings persistence

4. `AiPromptTemplates.vue` (1 hour)
   - Template selection
   - Custom prompt input

### Phase 4: Shared Components (4-6 hours)

1. `SaveThemeModal.vue` (2 hours)
2. `CodeBlock.vue` (1.5 hours)
3. `LoadingSpinner.vue` (0.5 hour)

### Phase 5: Preview Components Smoke Tests (6-8 hours)

- Batch implementation for all 17 showcase components
- Focus on mount success and basic rendering

---

## Success Criteria

- [ ] All editor components have comprehensive tests (80%+ coverage)
- [ ] All AI components have feature tests (70%+ coverage)
- [ ] All shared components have unit tests (90%+ coverage)
- [ ] All preview components have smoke tests (mounting + basic assertions)
- [ ] Overall component coverage reaches 60%+
- [ ] CI includes component test execution
- [ ] Test execution time < 45 seconds for all component tests
- [ ] Documentation includes component testing guide

---

## Challenges and Mitigations

### Challenge 1: Nuxt UI Component Stubs

**Problem:** Components use `@nuxt/ui` deeply  
**Solution:** Create comprehensive stub map or use real components with shallow mounting

### Challenge 2: Store State Management

**Problem:** Components tightly coupled to Pinia store  
**Solution:** Use `@pinia/testing` with proper initial state

### Challenge 3: Async Operations

**Problem:** API calls, file uploads, delayed rendering  
**Solution:** Mock composables, use `waitFor` from testing-library

### Challenge 4: Visual/Style Testing

**Problem:** Can't verify visual appearance in unit tests  
**Solution:** Supplement with Playwright visual regression tests (Phase 3)

---

## References

- [Vue Test Utils Documentation](https://test-utils.vuejs.org/)
- [Nuxt Test Utils Component Testing](https://nuxt.com/docs/getting-started/testing#component-testing)
- [Pinia Testing Guide](https://pinia.vuejs.org/cookbook/testing.html)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)

---

## Related Issues

- Phase 1 Complete: Critical Path Coverage
- Technical Debt: Server API Testing Strategy
- TESTING-GAPS-ANALYSIS.md updated with this technical debt

---

**Status:** Open  
**Assignee:** TBD  
**Milestone:** Phase 2 - Component Coverage  
**Target:** 65% overall coverage
