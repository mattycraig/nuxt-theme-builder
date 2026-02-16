import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import Chat from "~/components/ai/Chat.vue";

async function mountChat() {
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: Chat as any },
    template: `<NuxtUiApp><Target /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("AiChat", () => {
  it("renders the AI Theme Generator heading", async () => {
    const wrapper = await mountChat();
    expect(wrapper.text()).toContain("AI Theme Generator");
  });

  it("renders the empty state with description", async () => {
    const wrapper = await mountChat();
    expect(wrapper.text()).toContain(
      "Describe the look and feel you want",
    );
  });

  it("renders API key required alert when not configured", async () => {
    const wrapper = await mountChat();
    expect(wrapper.text()).toContain("API key required");
  });

  it("renders Open Settings button", async () => {
    const wrapper = await mountChat();
    const buttons = wrapper.findAll("button");
    const settingsBtn = buttons.find(
      (b) =>
        b.text().includes("Open Settings") ||
        b.attributes("aria-label") === "Open AI settings",
    );
    expect(settingsBtn).toBeDefined();
  });

  it("renders the chat prompt input", async () => {
    const wrapper = await mountChat();
    const html = wrapper.html();
    expect(html).toContain("Enter your API key in settings to start");
  });

  it("renders New conversation button", async () => {
    const wrapper = await mountChat();
    const newBtn = wrapper.find('button[aria-label="New conversation"]');
    expect(newBtn.exists()).toBe(true);
  });
});
