import { describe, it, expect } from "vitest";
import {
  MAX_SHARE_PARAM_LENGTH,
  SHARE_QUERY_KEY,
  buildShareUrl,
  decodeTheme,
  encodeTheme,
} from "~/utils/themeShare";
import { createThemeConfig } from "../../setup/fixtures";

/** Encode raw text the way share links do, to craft payloads by hand. */
async function compress(text: string): Promise<string> {
  const stream = new Blob([new TextEncoder().encode(text)])
    .stream()
    .pipeThrough(new CompressionStream("deflate-raw"));
  const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

describe("themeShare", () => {
  it("round-trips a theme through encode and decode", async () => {
    const config = createThemeConfig({
      neutral: "stone",
      radius: 0.75,
      customPalettes: [{ name: "brand", color: "#f5c518" }],
    });
    config.colors.primary = "brand";

    const decoded = await decodeTheme(await encodeTheme(config));

    expect(decoded).toEqual(config);
  });

  it("produces a short, URL-safe value", async () => {
    const encoded = await encodeTheme(createThemeConfig());

    expect(encoded).toMatch(/^1\.[A-Za-z0-9_-]+$/);
    expect(encoded.length).toBeLessThan(1000);
  });

  it("fills fields that older themes lack, like the schema does on import", async () => {
    const legacy = createThemeConfig() as Partial<ReturnType<typeof createThemeConfig>>;
    delete legacy.darkColors;
    const payload = await compress(JSON.stringify(legacy));

    const decoded = await decodeTheme(`1.${payload}`);

    expect(decoded?.darkColors).toEqual(legacy.colors);
  });

  it.each([
    ["an empty value", ""],
    ["an unknown version", "2.abc"],
    ["a missing payload", "1."],
    ["extra segments", "1.abc.def"],
    ["non-base64 characters", "1.ab$cd"],
    ["bytes that aren't deflate data", "1.aGVsbG8"],
    ["an oversized value", `1.${"a".repeat(MAX_SHARE_PARAM_LENGTH)}`],
  ])("rejects %s", async (_label, value) => {
    expect(await decodeTheme(value)).toBeNull();
  });

  it("rejects a payload that decodes to an invalid theme", async () => {
    const valid = await encodeTheme(createThemeConfig());
    const bad = createThemeConfig() as unknown as Record<string, unknown>;
    bad.radius = "huge";
    const payload = await compress(JSON.stringify(bad));

    expect(await decodeTheme(valid)).not.toBeNull();
    expect(await decodeTheme(`1.${payload}`)).toBeNull();
  });

  it("rejects a payload that inflates past the size cap", async () => {
    const payload = await compress(" ".repeat(200 * 1024));

    expect(payload.length).toBeLessThan(MAX_SHARE_PARAM_LENGTH);
    expect(await decodeTheme(`1.${payload}`)).toBeNull();
  });

  it("builds a link to the given page, replacing any existing query", async () => {
    const url = new URL(
      await buildShareUrl(
        "https://nuxt-ui-themes.com",
        "/templates/dashboard?x=1#top",
        createThemeConfig(),
      ),
    );

    expect(url.origin).toBe("https://nuxt-ui-themes.com");
    expect(url.pathname).toBe("/templates/dashboard");
    expect(url.hash).toBe("");
    expect([...url.searchParams.keys()]).toEqual([SHARE_QUERY_KEY]);
    expect(await decodeTheme(url.searchParams.get(SHARE_QUERY_KEY)!)).toEqual(
      createThemeConfig(),
    );
  });
});
