import { describe, it, expect } from "vitest";
import { mountWithUApp } from "../../../setup/component";
import CategoryIndex from "~/components/shared/CategoryIndex.vue";
import type { ComponentCategory } from "~/types/components";

const mockCategories: ComponentCategory[] = [
  {
    name: "Buttons",
    icon: "i-lucide-mouse-pointer",
    items: [
      { label: "Primary Button", path: "/components/button-primary" },
      { label: "Ghost Button", path: "/components/button-ghost" },
    ],
  },
  {
    name: "Inputs",
    icon: "i-lucide-text-cursor",
    items: [
      { label: "Text Input", path: "/components/input-text" },
    ],
  },
];

describe("CategoryIndex", () => {
  it("renders headline and title", async () => {
    const wrapper = await mountWithUApp(CategoryIndex, {
      props: {
        headline: "UI Library",
        title: "Components",
        itemLabel: "component",
        categories: mockCategories,
      },
    });
    const html = wrapper.html();
    expect(html).toContain("Components");
    expect(html).toContain("UI Library");
  });

  it("renders search input with accessible label", async () => {
    const wrapper = await mountWithUApp(CategoryIndex, {
      props: {
        headline: "UI Library",
        title: "Components",
        itemLabel: "component",
        categories: mockCategories,
      },
    });
    const label = wrapper.find("label.sr-only");
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain("Search");
  });

  it("renders filter section with aria-label", async () => {
    const wrapper = await mountWithUApp(CategoryIndex, {
      props: {
        headline: "UI Library",
        title: "Components",
        itemLabel: "component",
        categories: mockCategories,
      },
    });
    const section = wrapper.find('section[aria-label="Components filters"]');
    expect(section.exists()).toBe(true);
  });

  it("shows total item count", async () => {
    const wrapper = await mountWithUApp(CategoryIndex, {
      props: {
        headline: "UI Library",
        title: "Components",
        itemLabel: "component",
        categories: mockCategories,
      },
    });
    const html = wrapper.html();
    // 3 total items across 2 categories
    expect(html).toContain("3");
  });

  it("renders category items", async () => {
    const wrapper = await mountWithUApp(CategoryIndex, {
      props: {
        headline: "UI Library",
        title: "Components",
        itemLabel: "component",
        categories: mockCategories,
      },
    });
    // Categories should be rendered as links/items
    const links = wrapper.findAll("a");
    expect(links.length).toBeGreaterThan(0);
  });

  it("uses custom searchId when provided", async () => {
    const wrapper = await mountWithUApp(CategoryIndex, {
      props: {
        headline: "UI Library",
        title: "Components",
        itemLabel: "component",
        categories: mockCategories,
        searchId: "custom-search",
      },
    });
    const input = wrapper.find("#custom-search");
    expect(input.exists()).toBe(true);
  });
});
