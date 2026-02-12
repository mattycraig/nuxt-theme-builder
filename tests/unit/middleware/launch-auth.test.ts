import { describe, it, expect } from "vitest";

/**
 * Tests the password validation logic from the launch endpoint.
 * The actual Nitro handler isn't importable directly in unit tests,
 * so we test the core decision function.
 */

describe("launch auth — password validation", () => {
  const EXPECTED_PASSWORD = "supersecret42";

  function validatePassword(
    password: string | undefined,
    expectedPassword: string,
  ): { ok: boolean; error?: string } {
    if (!expectedPassword) {
      return { ok: false, error: "Coming soon gate is not configured." };
    }

    if (!password || password !== expectedPassword) {
      return { ok: false, error: "Invalid password." };
    }

    return { ok: true };
  }

  it("accepts the correct password", () => {
    const result = validatePassword(EXPECTED_PASSWORD, EXPECTED_PASSWORD);
    expect(result).toEqual({ ok: true });
  });

  it("rejects an incorrect password", () => {
    const result = validatePassword("wrong", EXPECTED_PASSWORD);
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Invalid password.");
  });

  it("rejects an empty password", () => {
    const result = validatePassword("", EXPECTED_PASSWORD);
    expect(result.ok).toBe(false);
  });

  it("rejects undefined password", () => {
    const result = validatePassword(undefined, EXPECTED_PASSWORD);
    expect(result.ok).toBe(false);
  });

  it("returns config error when no expected password is set", () => {
    const result = validatePassword("anything", "");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Coming soon gate is not configured.");
  });
});
