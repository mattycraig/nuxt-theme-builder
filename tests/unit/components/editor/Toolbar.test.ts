import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { DefineComponent } from "vue";
import Toolbar from "~/components/editor/Toolbar.vue";
import { useThemeStore } from "~/stores/theme";
import App from "@nuxt/ui/runtime/components/App.vue";

/**
 * Toolbar uses UTooltip which requires TooltipProvider context.
 * Wrap inside Nuxt UI's App component to provide it.
 */
async function mountToolbar(props: { jsonMode?: boolean } = {}) {
  const WrapperComponent = defineComponent({
    components: { NuxtUiApp: App as any, Toolbar: Toolbar as any },
    setup() {
      return { toolbarProps: { jsonMode: false, ...props } };
    },
    template: `<NuxtUiApp><Toolbar v-bind="toolbarProps" /></NuxtUiApp>`,
  });

  return mountSuspended(WrapperComponent as unknown as DefineComponent);
}

describe("EditorToolbar", () => {
  it("renders undo, redo, and undo-all buttons", async () => {
    const wrapper = await mountToolbar();
    const undoBtn = wrapper.find("[aria-label='Undo']");
    const redoBtn = wrapper.find("[aria-label='Redo']");
    const undoAllBtn = wrapper.find("[aria-label='Undo all changes']");
    expect(undoBtn.exists()).toBe(true);
    expect(redoBtn.exists()).toBe(true);
    expect(undoAllBtn.exists()).toBe(true);
  });

  it("renders the reset button", async () => {
    const wrapper = await mountToolbar();
    const resetBtn = wrapper.find("[aria-label='Reset to defaults']");
    expect(resetBtn.exists()).toBe(true);
  });

  it("renders a JSON editor toggle button", async () => {
    const wrapper = await mountToolbar({ jsonMode: false });
    const toggleBtn = wrapper.find(
      "[aria-label='Switch to JSON editor']",
    );
    expect(toggleBtn.exists()).toBe(true);
  });

  it("shows visual editor label when jsonMode is true", async () => {
    const wrapper = await mountToolbar({ jsonMode: true });
    const toggleBtn = wrapper.find(
      "[aria-label='Switch to visual editor']",
    );
    expect(toggleBtn.exists()).toBe(true);
  });

  it("disables undo when store has no history", async () => {
    const wrapper = await mountToolbar();
    const store = useThemeStore();
    expect(store.canUndo).toBe(false);
    const undoBtn = wrapper.find("[aria-label='Undo']");
    expect(undoBtn.attributes("disabled")).toBeDefined();
  });

  it("disables redo when store has no forward history", async () => {
    const wrapper = await mountToolbar();
    const store = useThemeStore();
    expect(store.canRedo).toBe(false);
    const redoBtn = wrapper.find("[aria-label='Redo']");
    expect(redoBtn.attributes("disabled")).toBeDefined();
  });

  it("renders the save button", async () => {
    const wrapper = await mountToolbar();
    const allButtons = wrapper.findAll("button");
    const saveBtn = allButtons.find((b) => {
      const label = b.attributes("aria-label") ?? "";
      return label.toLowerCase().includes("save") || label.toLowerCase().includes("theme");
    });
    expect(saveBtn?.exists()).toBe(true);
  });
});
