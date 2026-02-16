import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Section from "~/components/editor/Section.vue";

describe("EditorSection", () => {
  async function mount(
    props: Partial<{
      icon: string;
      label: string;
      defaultOpen: boolean;
      open: boolean;
      modeBadge: string;
    }> = {},
  ) {
    return mountSuspended(Section, {
      props: {
        icon: "i-lucide-palette",
        label: "Test Section",
        ...props,
      },
      slots: {
        default: () => "Section content slot",
      },
    });
  }

  it("renders the section label text", async () => {
    const wrapper = await mount();
    expect(wrapper.text()).toContain("Test Section");
  });

  it("renders with a toggle button", async () => {
    const wrapper = await mount();
    const btn = wrapper.find("button");
    expect(btn.exists()).toBe(true);
  });

  it("renders a mode badge when modeBadge prop is set", async () => {
    const wrapper = await mount({ modeBadge: "dark" });
    expect(wrapper.text()).toContain("dark");
  });

  it("starts open when defaultOpen is true", async () => {
    const wrapper = await mount({ defaultOpen: true });
    expect(wrapper.text()).toContain("Section content slot");
  });

  it("starts closed when defaultOpen is false", async () => {
    const wrapper = await mount({ defaultOpen: false });
    expect(wrapper.text()).not.toContain("Section content slot");
  });
});
