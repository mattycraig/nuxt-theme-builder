import { describe, it, expect, beforeEach } from "vitest";
import { useExportPanel } from "~/composables/useExportPanel";

describe("useExportPanel", () => {
  let panel: ReturnType<typeof useExportPanel>;

  beforeEach(() => {
    panel = useExportPanel();
    panel.close();
  });

  it("starts in closed state", () => {
    expect(panel.isOpen.value).toBe(false);
  });

  it("opens the panel", () => {
    panel.open();
    expect(panel.isOpen.value).toBe(true);
  });

  it("closes the panel", () => {
    panel.open();
    panel.close();
    expect(panel.isOpen.value).toBe(false);
  });

  it("toggles the panel state", () => {
    panel.toggle();
    expect(panel.isOpen.value).toBe(true);
    panel.toggle();
    expect(panel.isOpen.value).toBe(false);
  });

  it("shares state between multiple instances (singleton)", () => {
    const panel1 = useExportPanel();
    const panel2 = useExportPanel();
    panel1.open();
    expect(panel2.isOpen.value).toBe(true);
    panel2.close();
    expect(panel1.isOpen.value).toBe(false);
  });

  it("supports setting isOpen via computed setter", () => {
    panel.isOpen.value = true;
    expect(panel.isOpen.value).toBe(true);
    panel.isOpen.value = false;
    expect(panel.isOpen.value).toBe(false);
  });
});
