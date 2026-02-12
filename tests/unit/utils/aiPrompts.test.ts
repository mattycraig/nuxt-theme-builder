import { describe, it, expect } from "vitest";
import {
  PROMPT_CATEGORIES,
  PROMPT_TEMPLATES,
  SUGGESTION_PROMPTS,
} from "~/utils/aiPrompts";
import type { PromptCategory } from "~/types/ai";

describe("aiPrompts", () => {
  describe("PROMPT_CATEGORIES", () => {
    it("is a non-empty array", () => {
      expect(PROMPT_CATEGORIES.length).toBeGreaterThan(0);
    });

    it("contains only string values", () => {
      for (const cat of PROMPT_CATEGORIES) {
        expect(typeof cat).toBe("string");
        expect(cat.length).toBeGreaterThan(0);
      }
    });

    it("has no duplicate categories", () => {
      const unique = new Set(PROMPT_CATEGORIES);
      expect(unique.size).toBe(PROMPT_CATEGORIES.length);
    });
  });

  describe("PROMPT_TEMPLATES", () => {
    it("is a non-empty array", () => {
      expect(PROMPT_TEMPLATES.length).toBeGreaterThan(0);
    });

    it("every template has required fields", () => {
      for (const tmpl of PROMPT_TEMPLATES) {
        expect(tmpl.id).toBeTruthy();
        expect(tmpl.label).toBeTruthy();
        expect(tmpl.description).toBeTruthy();
        expect(tmpl.icon).toBeTruthy();
        expect(tmpl.prompt).toBeTruthy();
        expect(tmpl.category).toBeTruthy();
      }
    });

    it("has no duplicate IDs", () => {
      const ids = PROMPT_TEMPLATES.map((t) => t.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    });

    it("every template category is in PROMPT_CATEGORIES", () => {
      for (const tmpl of PROMPT_TEMPLATES) {
        expect(PROMPT_CATEGORIES).toContain(tmpl.category);
      }
    });

    it("every category has at least one template", () => {
      for (const cat of PROMPT_CATEGORIES) {
        const matching = PROMPT_TEMPLATES.filter(
          (t) => t.category === (cat as PromptCategory),
        );
        expect(
          matching.length,
          `Category "${cat}" has no templates`,
        ).toBeGreaterThan(0);
      }
    });

    it("all icons follow the i-lucide-* pattern", () => {
      for (const tmpl of PROMPT_TEMPLATES) {
        expect(tmpl.icon).toMatch(/^i-lucide-/);
      }
    });

    it("prompts are non-trivial (at least 20 characters)", () => {
      for (const tmpl of PROMPT_TEMPLATES) {
        expect(
          tmpl.prompt.length,
          `Template "${tmpl.id}" has a short prompt`,
        ).toBeGreaterThan(20);
      }
    });

    it("labels are concise (under 30 characters)", () => {
      for (const tmpl of PROMPT_TEMPLATES) {
        expect(
          tmpl.label.length,
          `Template "${tmpl.id}" label is too long`,
        ).toBeLessThanOrEqual(30);
      }
    });
  });

  describe("SUGGESTION_PROMPTS", () => {
    it("is a non-empty array", () => {
      expect(SUGGESTION_PROMPTS.length).toBeGreaterThan(0);
    });

    it("contains only non-empty strings", () => {
      for (const prompt of SUGGESTION_PROMPTS) {
        expect(typeof prompt).toBe("string");
        expect(prompt.length).toBeGreaterThan(0);
      }
    });

    it("has no duplicates", () => {
      const unique = new Set(SUGGESTION_PROMPTS);
      expect(unique.size).toBe(SUGGESTION_PROMPTS.length);
    });

    it("prompts are descriptive (at least 15 characters)", () => {
      for (const prompt of SUGGESTION_PROMPTS) {
        expect(prompt.length).toBeGreaterThanOrEqual(15);
      }
    });
  });
});
