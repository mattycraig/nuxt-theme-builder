import { describe, it, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import RandomizeButton from "~/components/editor/RandomizeButton.vue";
import type { RandomizeLockKey } from "~/types/theme";

async function mount(modelValue: RandomizeLockKey[]) {
  const randomize = vi.fn();
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, RandomizeButton: RandomizeButton as any },
    setup: () => ({ modelValue, randomize }),
    template: `<NuxtUiApp><RandomizeButton :model-value="modelValue" @randomize="randomize" /></NuxtUiApp>`,
  });
  const wrapper = await mountSuspended(Wrapper as any);
  return { wrapper, randomize };
}

describe("EditorRandomizeButton", () => {
  it("groups the randomize and lock buttons together", async () => {
    const { wrapper } = await mount([]);
    const group = wrapper.find('[role="group"][aria-label="Random theme"]');
    expect(group.exists()).toBe(true);
    expect(
      group.find('button[aria-label="Generate random theme"]').exists(),
    ).toBe(true);
    expect(
      group.find('button[aria-label="Choose what randomize keeps"]').exists(),
    ).toBe(true);
  });

  it("emits randomize from the main half", async () => {
    const { wrapper, randomize } = await mount([]);
    await wrapper
      .find('button[aria-label="Generate random theme"]')
      .trigger("click");
    expect(randomize).toHaveBeenCalledOnce();
  });

  it("shows how many parts are locked", async () => {
    const { wrapper } = await mount(["primary", "font"]);
    const button = wrapper.find(
      'button[aria-label="Choose what randomize keeps (2 locked)"]',
    );
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("2");
  });
});
