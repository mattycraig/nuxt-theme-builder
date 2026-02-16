import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import CodeBlock from "~/components/shared/CodeBlock.vue";

async function mountCodeBlock(props: Record<string, unknown> = {}) {
  const defaultProps = {
    code: 'console.log("hello")',
    filename: "test.js",
    language: "js",
    ...props,
  };
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: CodeBlock as any },
    setup() {
      return { props: defaultProps };
    },
    template: `<NuxtUiApp><Target v-bind="props" /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("SharedCodeBlock", () => {
  it("renders the region with filename aria-label", async () => {
    const wrapper = await mountCodeBlock({ filename: "app.config.ts" });
    const region = wrapper.find('[role="region"]');
    expect(region.exists()).toBe(true);
    expect(region.attributes("aria-label")).toBe(
      "Source code for app.config.ts",
    );
  });

  it("renders the filename in the header", async () => {
    const wrapper = await mountCodeBlock({ filename: "styles.css" });
    expect(wrapper.text()).toContain("styles.css");
  });

  it("renders line count", async () => {
    const wrapper = await mountCodeBlock({
      code: "line1\nline2\nline3",
    });
    expect(wrapper.text()).toContain("3 lines");
  });

  it("renders copy button", async () => {
    const wrapper = await mountCodeBlock();
    const copyBtn = wrapper.find('button[aria-label="Copy code to clipboard"]');
    expect(copyBtn.exists()).toBe(true);
  });

  it("renders download button when hideDownload is false", async () => {
    const wrapper = await mountCodeBlock({ hideDownload: false });
    const downloadBtn = wrapper.find('button[aria-label="Download file"]');
    expect(downloadBtn.exists()).toBe(true);
  });

  it("hides download button when hideDownload is true", async () => {
    const wrapper = await mountCodeBlock({ hideDownload: true });
    const downloadBtn = wrapper.find('button[aria-label="Download file"]');
    expect(downloadBtn.exists()).toBe(false);
  });

  it("shows loading state", async () => {
    const wrapper = await mountCodeBlock({ loading: true, code: "" });
    expect(wrapper.text()).toContain("Loading");
  });

  it("shows error state with retry button", async () => {
    const wrapper = await mountCodeBlock({ error: "Failed to load" });
    expect(wrapper.text()).toContain("Failed to load");
    const retry = Array.from(wrapper.findAll("button")).find((b) =>
      b.text().includes("Retry"),
    );
    expect(retry).toBeDefined();
  });
});
