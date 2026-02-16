import { describe, it, expect } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import Message from "~/components/ai/Message.vue";
import type { AiMessage } from "~/types/ai";

const userMessage: AiMessage = {
  role: "user",
  content: "Generate a dark theme",
  timestamp: new Date("2025-01-15T10:30:00Z").getTime(),
};

const assistantMessage: AiMessage = {
  role: "assistant",
  content: "Here is your dark theme",
  timestamp: new Date("2025-01-15T10:30:05Z").getTime(),
};

describe("AiMessage", () => {
  it("renders user message content", async () => {
    const wrapper = await mountWithUApp(Message, {
      props: { message: userMessage },
    });
    expect(wrapper.text()).toContain("Generate a dark theme");
  });

  it("renders assistant message content", async () => {
    const wrapper = await mountWithUApp(Message, {
      props: { message: assistantMessage },
    });
    expect(wrapper.text()).toContain("Here is your dark theme");
  });

  it("shows user avatar for user messages", async () => {
    const wrapper = await mountWithUApp(Message, {
      props: { message: userMessage },
    });
    // User messages justify-end
    const outer = wrapper.find(".justify-end");
    expect(outer.exists()).toBe(true);
  });

  it("shows AI avatar for assistant messages", async () => {
    const wrapper = await mountWithUApp(Message, {
      props: { message: assistantMessage },
    });
    const outer = wrapper.find(".justify-start");
    expect(outer.exists()).toBe(true);
  });

  it("renders formatted timestamp", async () => {
    const wrapper = await mountWithUApp(Message, {
      props: { message: userMessage },
    });
    // Should contain time text (format depends on locale)
    const timeEl = wrapper.find(".text-\\[10px\\]");
    expect(timeEl.exists()).toBe(true);
    expect(timeEl.text()).toBeTruthy();
  });
});
