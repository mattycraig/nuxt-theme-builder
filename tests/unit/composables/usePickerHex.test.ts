import { describe, it, expect } from "vitest";
import { usePickerHex } from "~/composables/usePickerHex";

describe("usePickerHex", () => {
  describe("getter", () => {
    it("returns resolvedHex when it is non-null", () => {
      const source = ref("blue");
      const resolvedHex = ref<string | null>("#3b82f6");
      const fallback = "#000000";

      const hex = usePickerHex(source, resolvedHex, fallback);

      expect(hex.value).toBe("#3b82f6");
    });

    it("returns fallback when resolvedHex is null", () => {
      const source = ref("unknown-color");
      const resolvedHex = ref<string | null>(null);
      const fallback = "#ff0000";

      const hex = usePickerHex(source, resolvedHex, fallback);

      expect(hex.value).toBe("#ff0000");
    });

    it("updates reactively when resolvedHex changes", () => {
      const source = ref("blue");
      const resolvedHex = ref<string | null>("#3b82f6");
      const fallback = "#000000";

      const hex = usePickerHex(source, resolvedHex, fallback);
      expect(hex.value).toBe("#3b82f6");

      resolvedHex.value = "#ef4444";
      expect(hex.value).toBe("#ef4444");
    });

    it("switches to fallback when resolvedHex becomes null", () => {
      const source = ref("blue");
      const resolvedHex = ref<string | null>("#3b82f6");
      const fallback = "#000000";

      const hex = usePickerHex(source, resolvedHex, fallback);
      expect(hex.value).toBe("#3b82f6");

      resolvedHex.value = null;
      expect(hex.value).toBe("#000000");
    });
  });

  describe("setter", () => {
    it("writes to source ref", () => {
      const source = ref("blue");
      const resolvedHex = ref<string | null>("#3b82f6");
      const fallback = "#000000";

      const hex = usePickerHex(source, resolvedHex, fallback);
      hex.value = "#22c55e";

      expect(source.value).toBe("#22c55e");
    });

    it("does not modify resolvedHex directly", () => {
      const source = ref("blue");
      const resolvedHex = ref<string | null>("#3b82f6");
      const fallback = "#000000";

      const hex = usePickerHex(source, resolvedHex, fallback);
      hex.value = "#22c55e";

      // resolvedHex stays as-is; source is what changes
      expect(resolvedHex.value).toBe("#3b82f6");
    });
  });

  describe("edge cases", () => {
    it("handles empty string source", () => {
      const source = ref("");
      const resolvedHex = ref<string | null>(null);
      const fallback = "#ffffff";

      const hex = usePickerHex(source, resolvedHex, fallback);

      expect(hex.value).toBe("#ffffff");
    });

    it("handles empty string fallback", () => {
      const source = ref("test");
      const resolvedHex = ref<string | null>(null);
      const fallback = "";

      const hex = usePickerHex(source, resolvedHex, fallback);

      expect(hex.value).toBe("");
    });
  });
});
