import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  shouldShowConsentToast,
  buildConsentToastConfig,
} from "~/composables/useCookieConsent";

/**
 * Tests for the decision and configuration logic exported from useCookieConsent.
 * Uses real exports — no duplicated logic.
 */

describe("useCookieConsent — decision logic", () => {
  beforeEach(() => {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  });

  describe("shouldShowConsentToast", () => {
    it("returns true when no prior acceptance", () => {
      expect(shouldShowConsentToast()).toBe(true);
    });

    it("returns false when consent already accepted", () => {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "accepted");
      expect(shouldShowConsentToast()).toBe(false);
    });

    it("returns false for any truthy storage value", () => {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "dismissed");
      expect(shouldShowConsentToast()).toBe(false);
    });
  });

  describe("buildConsentToastConfig", () => {
    it("configures toast as persistent (duration: 0, close: false)", () => {
      const config = buildConsentToastConfig(vi.fn(), vi.fn());
      expect(config.duration).toBe(0);
      expect(config.close).toBe(false);
    });

    it("includes descriptive title", () => {
      const config = buildConsentToastConfig(vi.fn(), vi.fn());
      expect(config.title).toBe("Cookie & Storage Notice");
    });

    it("includes Accept and Privacy Policy actions", () => {
      const config = buildConsentToastConfig(vi.fn(), vi.fn());
      expect(config.actions).toHaveLength(2);
      expect(config.actions[0].label).toBe("Accept");
      expect(config.actions[1].label).toBe("Privacy Policy");
    });

    it("calls onAccept handler when Accept action is clicked", () => {
      const onAccept = vi.fn();
      const config = buildConsentToastConfig(onAccept, vi.fn());
      config.actions[0].onClick();
      expect(onAccept).toHaveBeenCalledOnce();
    });

    it("calls onPrivacy handler when Privacy Policy action is clicked", () => {
      const onPrivacy = vi.fn();
      const config = buildConsentToastConfig(vi.fn(), onPrivacy);
      config.actions[1].onClick();
      expect(onPrivacy).toHaveBeenCalledOnce();
    });
  });

  describe("accept action (integration)", () => {
    it("prevents toast from showing on subsequent visits", () => {
      expect(shouldShowConsentToast()).toBe(true);

      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "accepted");

      expect(shouldShowConsentToast()).toBe(false);
    });
  });
});
