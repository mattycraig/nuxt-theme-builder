import { describe, it, expect } from "vitest";
import {
  PAGE_DESCRIPTIONS,
  DEFAULT_DESCRIPTION,
} from "~/utils/seoDescriptions";

describe("seoDescriptions", () => {
  describe("PAGE_DESCRIPTIONS", () => {
    it("is a non-empty object", () => {
      const keys = Object.keys(PAGE_DESCRIPTIONS);
      expect(keys.length).toBeGreaterThan(0);
    });

    it("all keys are valid URL paths starting with /", () => {
      for (const key of Object.keys(PAGE_DESCRIPTIONS)) {
        expect(key.startsWith("/"), `Key "${key}" should start with /`).toBe(
          true,
        );
      }
    });

    it("all values are non-empty strings", () => {
      for (const [key, value] of Object.entries(PAGE_DESCRIPTIONS)) {
        expect(typeof value).toBe("string");
        expect(
          value.length,
          `Description for "${key}" should not be empty`,
        ).toBeGreaterThan(0);
      }
    });

    it("includes the root path", () => {
      expect(PAGE_DESCRIPTIONS["/"]).toBeDefined();
    });

    it("descriptions are meaningful (at least 30 characters)", () => {
      for (const [key, value] of Object.entries(PAGE_DESCRIPTIONS)) {
        expect(
          value.length,
          `Description for "${key}" is too short`,
        ).toBeGreaterThan(30);
      }
    });

    it("no keys contain query parameters", () => {
      for (const key of Object.keys(PAGE_DESCRIPTIONS)) {
        expect(key).not.toContain("?");
      }
    });

    it("no keys contain hash fragments", () => {
      for (const key of Object.keys(PAGE_DESCRIPTIONS)) {
        expect(key).not.toContain("#");
      }
    });

    it("has no duplicate values", () => {
      const values = Object.values(PAGE_DESCRIPTIONS);
      const unique = new Set(values);
      expect(unique.size).toBe(values.length);
    });
  });

  describe("DEFAULT_DESCRIPTION", () => {
    it("is a non-empty string", () => {
      expect(typeof DEFAULT_DESCRIPTION).toBe("string");
      expect(DEFAULT_DESCRIPTION.length).toBeGreaterThan(0);
    });

    it("is a meaningful description (at least 30 characters)", () => {
      expect(DEFAULT_DESCRIPTION.length).toBeGreaterThan(30);
    });
  });
});
