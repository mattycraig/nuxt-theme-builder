import { describe, it, expect, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import HiddenRouteWrapper from "~/components/shared/HiddenRouteWrapper.vue";

/**
 * Tests for SharedHiddenRouteWrapper — verifies that the Proxy-based hook
 * interception correctly blocks dashboard sidebar hooks while passing
 * through all other hooks.
 */
describe("SharedHiddenRouteWrapper", () => {
  it("blocks dashboard:sidebar:toggle hook registration", async () => {
    const wrapper = await mountSuspended(HiddenRouteWrapper, {
      slots: { default: () => h("div", "child content") },
    });

    const nuxtApp = useNuxtApp();
    const callback = vi.fn();
    const unregister = nuxtApp.hook("dashboard:sidebar:toggle" as any, callback);

    // The Proxy returns a no-op function instead of registering
    expect(typeof unregister).toBe("function");

    // Fire the hook — callback should NOT have been registered
    await nuxtApp.hooks.callHook("dashboard:sidebar:toggle" as any);
    expect(callback).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it("blocks dashboard:sidebar:collapse hook registration", async () => {
    const wrapper = await mountSuspended(HiddenRouteWrapper, {
      slots: { default: () => h("div", "child content") },
    });

    const nuxtApp = useNuxtApp();
    const callback = vi.fn();
    nuxtApp.hook("dashboard:sidebar:collapse" as any, callback);

    await nuxtApp.hooks.callHook("dashboard:sidebar:collapse" as any);
    expect(callback).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it("passes through non-blocked hooks", async () => {
    const wrapper = await mountSuspended(HiddenRouteWrapper, {
      slots: { default: () => h("div", "child content") },
    });

    const nuxtApp = useNuxtApp();
    const callback = vi.fn();

    // A non-blocked hook should register normally
    nuxtApp.hook("app:error" as any, callback);
    await nuxtApp.hooks.callHook("app:error" as any);
    expect(callback).toHaveBeenCalled();

    wrapper.unmount();
  });

  it("restores original hook function on unmount", async () => {
    const nuxtApp = useNuxtApp();
    const originalHook = nuxtApp.hook;

    const wrapper = await mountSuspended(HiddenRouteWrapper, {
      slots: { default: () => h("div", "child content") },
    });

    // While mounted, hook should be the Proxy (different reference)
    expect(nuxtApp.hook).not.toBe(originalHook);

    wrapper.unmount();

    // After unmount, original hook is restored
    expect(nuxtApp.hook).toBe(originalHook);
  });

  it("renders slot content", async () => {
    const wrapper = await mountSuspended(HiddenRouteWrapper, {
      slots: { default: () => h("span", { class: "test-child" }, "Hello") },
    });

    expect(wrapper.find(".test-child").exists()).toBe(true);
    expect(wrapper.text()).toContain("Hello");

    wrapper.unmount();
  });
});
