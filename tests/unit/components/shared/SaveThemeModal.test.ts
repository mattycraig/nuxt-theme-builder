import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SaveThemeModal from "~/components/shared/SaveThemeModal.vue";

describe("SharedSaveThemeModal", () => {
  it("mounts without error", async () => {
    const wrapper = await mountSuspended(SaveThemeModal);
    expect(wrapper.exists()).toBe(true);
  });

  it("does not show modal content when closed", async () => {
    const wrapper = await mountSuspended(SaveThemeModal);
    // Modal should be closed by default
    const input = wrapper.find("#save-modal-name");
    expect(input.exists()).toBe(false);
  });
});
