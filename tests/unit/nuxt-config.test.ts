import { describe, it, expect, vi, beforeAll } from "vitest";
import {
  LEARN_ROUTES,
  NOINDEX_DEMO_ROUTES,
  PUBLIC_STATIC_ROUTES,
  TOOL_ROUTES,
} from "~~/shared/constants/routes";

type RouteRule = { headers?: Record<string, string> };

let routeRules: Record<string, RouteRule>;

beforeAll(async () => {
  vi.stubGlobal("defineNuxtConfig", (config: unknown) => config);
  const { default: config } = await import("~~/nuxt.config");
  routeRules = (config as { routeRules: Record<string, RouteRule> }).routeRules;
  vi.unstubAllGlobals();
});

/**
 * Rules that apply to `path`, matched the way Nitro (and the sitemap module)
 * do: `/foo/**` covers `/foo` itself as well as everything below it.
 */
function rulesFor(path: string): RouteRule[] {
  return Object.entries(routeRules)
    .filter(([pattern]) => {
      if (!pattern.endsWith("/**")) return pattern === path;
      const prefix = pattern.slice(0, -3);
      return path === prefix || path.startsWith(`${prefix}/`);
    })
    .map(([, rule]) => rule);
}

function isNoindexed(path: string): boolean {
  return rulesFor(path).some((rule) =>
    Object.entries(rule.headers ?? {}).some(
      ([name, value]) =>
        name.toLowerCase() === "x-robots-tag" && value.includes("noindex"),
    ),
  );
}

describe("nuxt.config route rules", () => {
  // @nuxtjs/sitemap drops any route whose rules carry a noindex header
  it("never sends a noindex header for an indexable route", () => {
    for (const path of [...PUBLIC_STATIC_ROUTES, ...TOOL_ROUTES, ...LEARN_ROUTES]) {
      expect(isNoindexed(path), path).toBe(false);
    }
  });

  it("sends a noindex header for every demo route", () => {
    for (const path of NOINDEX_DEMO_ROUTES) {
      expect(isNoindexed(path), path).toBe(true);
    }
  });
});
