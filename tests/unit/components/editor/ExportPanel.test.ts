import { describe, it, expect, beforeEach } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "@nuxt/ui/runtime/components/App.vue";
import ExportPanel from "~/components/editor/export/Panel.vue";

async function mountExportPanel() {
  const Wrapper = defineComponent({
    components: { NuxtUiApp: App as any, Target: ExportPanel as any },
    template: `<NuxtUiApp><Target /></NuxtUiApp>`,
  });
  return mountSuspended(Wrapper as any);
}

describe("EditorExportPanel", () => {
  beforeEach(() => {
    const store = useThemeStore();
    store.resetToDefaults();
  });

  it("renders the Export Theme heading", async () => {
    const wrapper = await mountExportPanel();
    const heading = wrapper.find("#export-heading");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("Export Theme");
  });

  it("renders the Import Theme heading", async () => {
    const wrapper = await mountExportPanel();
    const heading = wrapper.find("#import-heading");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("Import Theme");
  });

  it("renders export format tabs", async () => {
    const wrapper = await mountExportPanel();
    const html = wrapper.html();
    expect(html).toContain("app.config.ts");
    expect(html).toContain("CSS");
    expect(html).toContain("JSON");
  });

  it("renders import textarea", async () => {
    const wrapper = await mountExportPanel();
    const textarea = wrapper.find(
      'textarea[aria-label="Theme JSON to import"]',
    );
    expect(textarea.exists()).toBe(true);
  });

  it("renders Apply Theme button (disabled when empty)", async () => {
    const wrapper = await mountExportPanel();
    const buttons = wrapper.findAll("button");
    const applyBtn = buttons.find((b) => b.text().includes("Apply Theme"));
    expect(applyBtn).toBeDefined();
    expect(applyBtn!.attributes("disabled")).toBeDefined();
  });

  it("renders file upload label", async () => {
    const wrapper = await mountExportPanel();
    const fileInput = wrapper.find('input[type="file"]');
    expect(fileInput.exists()).toBe(true);
    expect(fileInput.attributes("accept")).toBe(".json,application/json");
  });
});
