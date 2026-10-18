/**
 * Pack a theme into a short URL-safe string for share links, and unpack one
 * back into a validated `ThemeConfig`.
 *
 * Format: `<version>.<base64url(deflate-raw(JSON))>`. The version prefix
 * lets the format change later without breaking links already shared.
 */
import type { ThemeConfig } from "~/types/theme";
import { ThemeConfigSchema } from "~/types/theme";

/** Query parameter that carries a shared theme (`/?theme=1.…`). */
export const SHARE_QUERY_KEY = "theme";

const SHARE_VERSION = "1";

/** Longest encoded theme accepted from a URL. A full theme is ~600 characters. */
export const MAX_SHARE_PARAM_LENGTH = 8 * 1024;

/** Cap on the decompressed JSON, so a crafted link can't inflate into megabytes. */
const MAX_DECODED_BYTES = 64 * 1024;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  try {
    const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
    return Uint8Array.from(binary, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

async function readAll(
  stream: ReadableStream<Uint8Array>,
  maxBytes: number,
): Promise<Uint8Array | null> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

function pipeBytes(
  bytes: Uint8Array,
  transform: CompressionStream | DecompressionStream,
): ReadableStream<Uint8Array> {
  return new Blob([bytes as BlobPart]).stream().pipeThrough(transform);
}

/** Encode a theme for a share link. */
export async function encodeTheme(config: ThemeConfig): Promise<string> {
  const json = new TextEncoder().encode(JSON.stringify(config));
  const compressed = await readAll(
    pipeBytes(json, new CompressionStream("deflate-raw")),
    Number.POSITIVE_INFINITY,
  );
  return `${SHARE_VERSION}.${toBase64Url(compressed!)}`;
}

/**
 * Decode a share-link value into a validated theme, or `null` when it is
 * malformed, too large, from an unknown version, or fails the schema.
 */
export async function decodeTheme(value: string): Promise<ThemeConfig | null> {
  if (!value || value.length > MAX_SHARE_PARAM_LENGTH) return null;
  const [version, payload, ...rest] = value.split(".");
  if (version !== SHARE_VERSION || !payload || rest.length) return null;
  const bytes = fromBase64Url(payload);
  if (!bytes) return null;
  try {
    const json = await readAll(
      pipeBytes(bytes, new DecompressionStream("deflate-raw")),
      MAX_DECODED_BYTES,
    );
    if (!json) return null;
    const result = ThemeConfigSchema.safeParse(
      JSON.parse(new TextDecoder().decode(json)),
    );
    return result.success ? (result.data as ThemeConfig) : null;
  } catch {
    return null;
  }
}

/** Absolute URL that opens `path` with `config` loaded. */
export async function buildShareUrl(
  origin: string,
  path: string,
  config: ThemeConfig,
): Promise<string> {
  const url = new URL(path, origin);
  url.search = "";
  url.hash = "";
  url.searchParams.set(SHARE_QUERY_KEY, await encodeTheme(config));
  return url.toString();
}
