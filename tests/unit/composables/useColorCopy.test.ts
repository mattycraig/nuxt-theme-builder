import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const copyFn = vi.fn();
const toastAddFn = vi.fn();

mockNuxtImport("useClipboard", () => () => ({ copy: copyFn }));
mockNuxtImport("useToast", () => () => ({ add: toastAddFn }));

describe("useColorCopy", () => {
  beforeEach(() => {
    copyFn.mockClear();
    toastAddFn.mockClear();
  });

  async function getColorCopy() {
    const mod = await import("~/composables/useColorCopy");
    return mod.useColorCopy();
  }

  it("copies the value to clipboard", async () => {
    const { copyColor } = await getColorCopy();

    copyColor("Primary", "#3b82f6");

    expect(copyFn).toHaveBeenCalledOnce();
    expect(copyFn).toHaveBeenCalledWith("#3b82f6");
  });

  it("shows a success toast with label and value", async () => {
    const { copyColor } = await getColorCopy();

    copyColor("Primary", "#3b82f6");

    expect(toastAddFn).toHaveBeenCalledOnce();
    const call = toastAddFn.mock.calls[0][0];
    expect(call.title).toBe("Copied!");
    expect(call.description).toBe("Primary: #3b82f6");
    expect(call.color).toBe("success");
    expect(call.icon).toBe("i-lucide-clipboard-check");
  });

  it("handles different label/value combinations", async () => {
    const { copyColor } = await getColorCopy();

    copyColor("Background", "rgb(255, 255, 255)");

    expect(copyFn).toHaveBeenCalledWith("rgb(255, 255, 255)");
    expect(toastAddFn.mock.calls[0][0].description).toBe(
      "Background: rgb(255, 255, 255)",
    );
  });

  it("handles empty values", async () => {
    const { copyColor } = await getColorCopy();

    copyColor("", "");

    expect(copyFn).toHaveBeenCalledWith("");
    expect(toastAddFn.mock.calls[0][0].description).toBe(": ");
  });
});
