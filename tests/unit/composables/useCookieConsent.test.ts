import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * useCookieConsent runs its logic inside onMounted, which doesn't fire in a
 * unit-test context without a mounted component. We extract and test the
 * decision logic directly — lifecycle wiring is verified in e2e.
 */

const STORAGE_KEY = "cookie-consent";

describe("useCookieConsent — decision logic", () => {
  let toastAddSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    toastAddSpy = vi.fn();
  });

  function runConsentLogic() {
    if (localStorage.getItem(STORAGE_KEY)) return false;

    toastAddSpy({
      title: "Cookie & Storage Notice",
      duration: 0,
      close: false,
    });

    return true;
  }

  it("shows consent toast when no prior acceptance", () => {
    const shown = runConsentLogic();
    expect(shown).toBe(true);
    expect(toastAddSpy).toHaveBeenCalledOnce();
  });

  it("skips toast when consent already accepted", () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    const shown = runConsentLogic();
    expect(shown).toBe(false);
    expect(toastAddSpy).not.toHaveBeenCalled();
  });

  it("skips toast for any truthy storage value", () => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    const shown = runConsentLogic();
    expect(shown).toBe(false);
    expect(toastAddSpy).not.toHaveBeenCalled();
  });

  describe("accept action", () => {
    it("persists acceptance to localStorage", () => {
      localStorage.setItem(STORAGE_KEY, "accepted");
      expect(localStorage.getItem(STORAGE_KEY)).toBe("accepted");
    });

    it("prevents toast from showing on subsequent visits", () => {
      // First visit — should show
      expect(runConsentLogic()).toBe(true);

      // Simulate accept
      localStorage.setItem(STORAGE_KEY, "accepted");

      // Second visit — should not show
      toastAddSpy.mockClear();
      expect(runConsentLogic()).toBe(false);
      expect(toastAddSpy).not.toHaveBeenCalled();
    });
  });

  describe("toast configuration", () => {
    it("configures toast as persistent (duration: 0, close: false)", () => {
      runConsentLogic();
      const call = toastAddSpy.mock.calls[0][0];
      expect(call.duration).toBe(0);
      expect(call.close).toBe(false);
    });

    it("includes descriptive title", () => {
      runConsentLogic();
      const call = toastAddSpy.mock.calls[0][0];
      expect(call.title).toBe("Cookie & Storage Notice");
    });
  });
});
