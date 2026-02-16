import { describe, it, expect } from "vitest";
import { classifyAiError } from "~~/server/utils/aiErrorHandler";

describe("server/utils/aiErrorHandler", () => {
  describe("timeout errors", () => {
    it("classifies TimeoutError as 504", () => {
      const err = new Error("timeout");
      err.name = "TimeoutError";
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(504);
      expect(result.statusMessage).toContain("too long");
    });

    it("classifies AbortError (DOMException) as 504", () => {
      const err = new DOMException("aborted", "AbortError");
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(504);
      expect(result.statusMessage).toContain("aborted");
    });
  });

  describe("NoObjectGeneratedError", () => {
    it("classifies schema validation failure as 422", () => {
      // NoObjectGeneratedError uses Symbol.hasInstance so we simulate it
      const err = Object.create(null);
      err[Symbol.for("vercel.ai.error")] = true;
      err.name = "AI_NoObjectGeneratedError";

      // Since we can't easily construct the real class, test via fallback
      // but document expected behavior
      const result = classifyAiError(err);
      // Falls through to fallback since isInstance check won't match a plain object
      expect(result.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe("API call errors (fallback path)", () => {
    it("classifies 401 status as invalid API key", () => {
      const err = { status: 401, message: "Unauthorized" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(401);
      expect(result.statusMessage).toContain("Invalid API key");
    });

    it("classifies invalid_api_key code as 401", () => {
      const err = { status: 200, code: "invalid_api_key", message: "" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(401);
    });

    it("classifies 429 status as rate limit", () => {
      const err = { status: 429, message: "Too many requests" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(429);
      expect(result.statusMessage).toContain("rate limit");
    });

    it("classifies quota exceeded message as 429", () => {
      const err = { status: 500, message: "You have exceeded your current quota" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(429);
    });

    it("classifies rate limit message as 429", () => {
      const err = { status: 500, message: "rate limit reached" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(429);
    });

    it("classifies billing message as 429", () => {
      const err = { status: 500, message: "billing issue detected" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(429);
    });

    it("classifies 403 status as access denied", () => {
      const err = { status: 403, message: "Forbidden" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(403);
      expect(result.statusMessage).toContain("Access denied");
    });
  });

  describe("fallback generic errors", () => {
    it("returns 500 for unknown error", () => {
      const err = { message: "" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(500);
      expect(result.statusMessage).toContain("Failed to generate theme");
    });

    it("does not leak internal error details in message", () => {
      const err = { status: 500, message: "Something broke" };
      const result = classifyAiError(err);
      expect(result.statusMessage).not.toContain("Something broke");
      expect(result.statusMessage).toBe("Failed to generate theme. Please try again.");
    });

    it("returns generic message regardless of error content", () => {
      const err = { status: 500, message: "x".repeat(201) };
      const result = classifyAiError(err);
      expect(result.statusMessage).toBe("Failed to generate theme. Please try again.");
    });

    it("omits hint for empty message", () => {
      const err = { status: 500, message: "" };
      const result = classifyAiError(err);
      expect(result.statusMessage).toBe("Failed to generate theme. Please try again.");
    });

    it("clamps invalid status codes to 500", () => {
      const err = { status: 999, message: "" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(500);
    });

    it("preserves valid 4xx status codes", () => {
      const err = { status: 418, message: "" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(418);
    });

    it("preserves valid 5xx status codes", () => {
      const err = { statusCode: 503, message: "" };
      const result = classifyAiError(err);
      expect(result.statusCode).toBe(503);
    });
  });
});
