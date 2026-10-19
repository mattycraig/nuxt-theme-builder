import { describe, it, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import RandomTheme from "~/components/editor/RandomTheme.vue";
import type { RandomizeLockKey } from "~/types/theme";
import { RANDOMIZE_LOCK_KEYS } from "~/types/theme";

async function mount(initial: RandomizeLockKey[]) {
  const randomize = vi.fn();
  const locks = ref<RandomizeLockKey[]>(initial);
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, RandomTheme: RandomTheme as any },
    setup: () => ({ locks, randomize }),
    template: `<NuxtUiApp><RandomTheme v-model="locks" @randomize="randomize" /></NuxtUiApp>`,
  });
  const wrapper = await mountSuspended(Wrapper as any);
  return { wrapper, randomize, locks };
}

function findButton(wrapper: any, text: string) {
  return wrapper.findAll("button").find((b: any) => b.text() === text);
}

describe("EditorRandomTheme", () => {
  it("emits randomize from the labeled generate button", async () => {
    const { wrapper, randomize } = await mount([]);
    await findButton(wrapper, "Generate random theme").trigger("click");
    expect(randomize).toHaveBeenCalledOnce();
  });

  it("shows a visible checkbox for every lockable part", async () => {
    const { wrapper } = await mount([]);
    expect(wrapper.find("fieldset legend").text()).toBe(
      "Keep when randomizing",
    );
    expect(wrapper.findAll('[role="checkbox"]')).toHaveLength(
      RANDOMIZE_LOCK_KEYS.length,
    );
    expect(wrapper.text()).toContain("Primary");
    expect(wrapper.text()).toContain("Radius");
  });

  it("ticks the locked parts and toggles a part on click", async () => {
    const { wrapper, locks } = await mount(["font"]);
    const boxes = wrapper.findAll('[role="checkbox"]');
    const font = boxes[RANDOMIZE_LOCK_KEYS.indexOf("font")]!;
    const primary = boxes[RANDOMIZE_LOCK_KEYS.indexOf("primary")]!;
    expect(font.attributes("aria-checked")).toBe("true");
    expect(primary.attributes("aria-checked")).toBe("false");

    await primary.trigger("click");
    expect(locks.value).toEqual(["font", "primary"]);

    await font.trigger("click");
    expect(locks.value).toEqual(["primary"]);
  });

  it("shows Unlock all only while something is locked, and clears the locks", async () => {
    const { wrapper, locks } = await mount([]);
    expect(findButton(wrapper, "Unlock all")).toBeUndefined();

    locks.value = ["primary", "neutral"];
    await nextTick();
    await findButton(wrapper, "Unlock all").trigger("click");
    expect(locks.value).toEqual([]);
  });
});
