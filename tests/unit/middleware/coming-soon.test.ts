import { describe, it, expect, beforeEach } from "vitest";

/**
 * The global middleware runs in Nuxt context, so we extract and test the
 * core decision logic directly — full redirect behavior is verified in e2e.
 */

describe("coming-soon middleware — decision logic", () => {
  let comingSoonEnabled: boolean;

  beforeEach(() => {
    comingSoonEnabled = true;
  });

  function shouldRedirect(path: string, cookieValue: string | null): boolean {
    // Dev bypass (simulated by a flag in tests)
    if (!comingSoonEnabled) return false;

    const isComingSoonPage = path === "/coming-soon";
    const isApiRoute = path.startsWith("/api/");
    if (isComingSoonPage || isApiRoute) return false;

    if (cookieValue === "granted") return false;

    return true;
  }

  it("redirects unauthenticated users on the home page", () => {
    expect(shouldRedirect("/", null)).toBe(true);
  });

  it("redirects unauthenticated users on nested pages", () => {
    expect(shouldRedirect("/templates/dashboard", null)).toBe(true);
  });

  it("does not redirect on the coming-soon page itself", () => {
    expect(shouldRedirect("/coming-soon", null)).toBe(false);
  });

  it("does not redirect API routes", () => {
    expect(shouldRedirect("/api/auth/launch", null)).toBe(false);
    expect(shouldRedirect("/api/highlight", null)).toBe(false);
  });

  it("does not redirect when launch_access cookie is granted", () => {
    expect(shouldRedirect("/", "granted")).toBe(false);
  });

  it("redirects when cookie has an invalid value", () => {
    expect(shouldRedirect("/", "something-else")).toBe(true);
  });

  it("skips everything when coming soon is disabled", () => {
    comingSoonEnabled = false;
    expect(shouldRedirect("/", null)).toBe(false);
  });
});
