import { describe, it, expect } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import ContrastCheck from "~/components/editor/ContrastCheck.vue";
import type { ContrastCheck as Check } from "~/utils/themeContrast";

function makeCheck(overrides: Partial<Check> = {}): Check {
  return {
    id: "body",
    label: "Body text",
    foreground: "#3f3f46",
    background: "#ffffff",
    ratio: 10.44,
    rating: "AAA",
    passes: true,
    ...overrides,
  };
}

describe("EditorContrastCheck", () => {
  it("says when every pair passes", async () => {
    const wrapper = await mountWithUApp(ContrastCheck, {
      props: { checks: [makeCheck(), makeCheck({ id: "muted" })] },
    });
    expect(wrapper.text()).toContain("All 2 pairs meet WCAG AA");
    expect(wrapper.findAll('[data-testid="contrast-failing"]')).toHaveLength(0);
  });

  it("lists failing pairs with their ratio and fix", async () => {
    const wrapper = await mountWithUApp(ContrastCheck, {
      props: {
        checks: [
          makeCheck(),
          makeCheck({
            id: "warning-solid",
            label: "Warning button",
            ratio: 3.2,
            rating: "AA Large",
            passes: false,
            fix: { kind: "role", role: "warning", shade: "700" },
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain("1 of 2 pairs are below WCAG AA");
    const row = wrapper.find('[data-testid="contrast-failing"]');
    expect(row.text()).toContain("Warning button");
    expect(row.text()).toContain("Use 700");
    expect(row.text()).toContain("3.20:1 · AA Large");
    expect(row.find("button").attributes("aria-label")).toBe(
      "Fix Warning button: set warning shade to 700",
    );
  });

  it("emits the fix when its button is clicked", async () => {
    const fix = { kind: "text", token: "muted", shade: "600" } as const;
    const wrapper = await mountWithUApp(ContrastCheck, {
      props: {
        checks: [makeCheck({ id: "muted", passes: false, rating: "Fail", ratio: 2, fix })],
      },
    });

    await wrapper.find('[data-testid="contrast-failing"] button').trigger("click");

    const emitted = wrapper.findComponent(ContrastCheck).emitted("fix");
    expect(emitted).toEqual([[fix]]);
  });

  it("shows no fix button when no shade passes", async () => {
    const wrapper = await mountWithUApp(ContrastCheck, {
      props: {
        checks: [makeCheck({ passes: false, rating: "Fail", ratio: 1.1 })],
      },
    });
    expect(wrapper.find('[data-testid="contrast-failing"] button').exists()).toBe(false);
  });
});
