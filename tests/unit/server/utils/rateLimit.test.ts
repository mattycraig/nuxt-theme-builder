import { describe, it, expect, beforeEach } from "vitest";
import {
  checkRateLimit,
  compactRateLimitMap,
  type RateLimitStore,
} from "~~/server/utils/rateLimit";

describe("server/utils/rateLimit", () => {
  let store: RateLimitStore;

  beforeEach(() => {
    store = new Map();
  });

  describe("checkRateLimit", () => {
    it("allows first request from a new IP", () => {
      expect(checkRateLimit(store, "1.2.3.4", 1000, 60_000, 5)).toBe(true);
      expect(store.get("1.2.3.4")?.count).toBe(1);
    });

    it("allows requests up to the max limit", () => {
      const now = 1000;
      for (let i = 0; i < 5; i++) {
        expect(checkRateLimit(store, "1.2.3.4", now, 60_000, 5)).toBe(true);
      }
    });

    it("blocks requests exceeding the max limit", () => {
      const now = 1000;
      for (let i = 0; i < 5; i++) {
        checkRateLimit(store, "1.2.3.4", now, 60_000, 5);
      }
      expect(checkRateLimit(store, "1.2.3.4", now, 60_000, 5)).toBe(false);
    });

    it("resets after the window expires", () => {
      const now = 1000;
      for (let i = 0; i < 5; i++) {
        checkRateLimit(store, "1.2.3.4", now, 60_000, 5);
      }
      expect(checkRateLimit(store, "1.2.3.4", now, 60_000, 5)).toBe(false);

      // After window expires
      const afterWindow = now + 60_001;
      expect(checkRateLimit(store, "1.2.3.4", afterWindow, 60_000, 5)).toBe(true);
      expect(store.get("1.2.3.4")?.count).toBe(1);
    });

    it("tracks different IPs independently", () => {
      const now = 1000;
      for (let i = 0; i < 5; i++) {
        checkRateLimit(store, "1.1.1.1", now, 60_000, 5);
      }
      expect(checkRateLimit(store, "1.1.1.1", now, 60_000, 5)).toBe(false);
      expect(checkRateLimit(store, "2.2.2.2", now, 60_000, 5)).toBe(true);
    });

    it("increments count on subsequent requests", () => {
      const now = 1000;
      checkRateLimit(store, "1.2.3.4", now, 60_000, 5);
      expect(store.get("1.2.3.4")?.count).toBe(1);
      checkRateLimit(store, "1.2.3.4", now, 60_000, 5);
      expect(store.get("1.2.3.4")?.count).toBe(2);
      checkRateLimit(store, "1.2.3.4", now, 60_000, 5);
      expect(store.get("1.2.3.4")?.count).toBe(3);
    });

    it("uses default parameters when not specified", () => {
      expect(checkRateLimit(store, "10.0.0.1")).toBe(true);
      expect(store.has("10.0.0.1")).toBe(true);
    });
  });

  describe("compactRateLimitMap", () => {
    it("does nothing when store is below max keys", () => {
      store.set("1.1.1.1", { count: 1, resetAt: 500 });
      store.set("2.2.2.2", { count: 1, resetAt: 500 });
      compactRateLimitMap(store, 1000, 10);
      expect(store.size).toBe(2);
    });

    it("evicts expired entries when store reaches max keys", () => {
      for (let i = 0; i < 5; i++) {
        store.set(`expired-${i}`, { count: 1, resetAt: 500 });
      }
      for (let i = 0; i < 3; i++) {
        store.set(`active-${i}`, { count: 1, resetAt: 2000 });
      }
      expect(store.size).toBe(8);

      compactRateLimitMap(store, 1000, 5);
      expect(store.size).toBe(3);
      expect(store.has("active-0")).toBe(true);
      expect(store.has("expired-0")).toBe(false);
    });

    it("keeps entries whose resetAt is in the future", () => {
      store.set("future", { count: 3, resetAt: 2000 });
      store.set("past", { count: 5, resetAt: 500 });

      compactRateLimitMap(store, 1000, 1);
      expect(store.has("future")).toBe(true);
      expect(store.has("past")).toBe(false);
    });

    it("skips compaction when below maxKeys threshold", () => {
      store.set("a", { count: 1, resetAt: 100 });
      compactRateLimitMap(store, 1000, 10);
      // Even though "a" is expired, it's not evicted because store.size < maxKeys
      expect(store.has("a")).toBe(true);
    });
  });
});
