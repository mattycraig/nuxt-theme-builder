import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  typedEntries,
  capitalize,
  timeAgo,
  sanitizeNavigationPath,
  downloadFile,
} from "~/utils/helpers";

describe("typedEntries", () => {
  it("returns entries of a simple object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const entries = typedEntries(obj);
    expect(entries).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });

  it("preserves string values", () => {
    const obj = { dimmed: "400", muted: "500" };
    const entries = typedEntries(obj);
    expect(entries).toEqual([
      ["dimmed", "400"],
      ["muted", "500"],
    ]);
  });

  it("returns empty array for empty object", () => {
    const entries = typedEntries({});
    expect(entries).toEqual([]);
  });
});

describe("capitalize", () => {
  it("capitalizes the first letter of a lowercase string", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("returns already-capitalized string unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("handles single character", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("returns empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });

  it("preserves rest of string", () => {
    expect(capitalize("fooBar")).toBe("FooBar");
  });
});

describe("timeAgo", () => {
  it("returns 'just now' for timestamps less than 60 seconds ago", () => {
    expect(timeAgo(Date.now() - 30_000)).toBe("just now");
  });

  it("returns minutes for timestamps less than an hour ago", () => {
    expect(timeAgo(Date.now() - 5 * 60_000)).toBe("5m ago");
  });

  it("returns hours for timestamps less than a day ago", () => {
    expect(timeAgo(Date.now() - 3 * 3_600_000)).toBe("3h ago");
  });

  it("returns days for timestamps less than a month ago", () => {
    expect(timeAgo(Date.now() - 7 * 86_400_000)).toBe("7d ago");
  });

  it("returns months for timestamps less than a year ago", () => {
    expect(timeAgo(Date.now() - 90 * 86_400_000)).toBe("3mo ago");
  });

  it("returns years for old timestamps", () => {
    expect(timeAgo(Date.now() - 400 * 86_400_000)).toBe("1y ago");
  });
});

describe("sanitizeNavigationPath", () => {
  it("returns pathname for a valid relative path", () => {
    expect(sanitizeNavigationPath("/components/buttons")).toBe(
      "/components/buttons",
    );
  });

  it("returns pathname for a clean absolute URL on same origin", () => {
    const result = sanitizeNavigationPath(
      `${window.location.origin}/blocks/hero`,
    );
    expect(result).toBe("/blocks/hero");
  });

  it("rejects cross-origin URLs", () => {
    expect(sanitizeNavigationPath("https://evil.com/steal")).toBeNull();
  });

  it("resolves path traversal to a clean path", () => {
    // new URL resolves .. segments, result is /etc/passwd which passes the regex
    expect(sanitizeNavigationPath("/path/../etc/passwd")).toBe("/etc/passwd");
  });

  it("rejects non-string input", () => {
    expect(sanitizeNavigationPath(123 as unknown as string)).toBeNull();
  });

  it("returns root for empty string", () => {
    // new URL("", origin) resolves to origin root
    expect(sanitizeNavigationPath("")).toBe("/");
  });
});

describe("downloadFile", () => {
  let createElementSpy: ReturnType<typeof vi.spyOn>;
  let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let capturedBlob: Blob | null;
  let mockAnchor: {
    href: string;
    download: string;
    click: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    capturedBlob = null;
    mockAnchor = { href: "", download: "", click: vi.fn() };
    createElementSpy = vi
      .spyOn(document, "createElement")
      .mockReturnValue(mockAnchor as unknown as HTMLElement);
    createObjectURLSpy = vi
      .spyOn(URL, "createObjectURL")
      .mockImplementation((blob: Blob) => {
        capturedBlob = blob;
        return "blob:test-url";
      });
    revokeObjectURLSpy = vi
      .spyOn(URL, "revokeObjectURL")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    createElementSpy.mockRestore();
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });

  it("creates a blob with correct content and mime type, then triggers download", () => {
    downloadFile("hello world", "test.txt", "text/plain");
    expect(createObjectURLSpy).toHaveBeenCalledOnce();
    expect(capturedBlob).toBeInstanceOf(Blob);
    expect(capturedBlob!.type).toBe("text/plain");
    expect(capturedBlob!.size).toBe(11);
    expect(mockAnchor.download).toBe("test.txt");
    expect(mockAnchor.click).toHaveBeenCalledOnce();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:test-url");
  });

  it("uses default mime type text/plain when not provided", () => {
    downloadFile("content", "file.txt");
    expect(capturedBlob).toBeInstanceOf(Blob);
    expect(capturedBlob!.type).toBe("text/plain");
  });

  it("creates blob with custom mime type", () => {
    downloadFile('{"key": "value"}', "data.json", "application/json");
    expect(capturedBlob!.type).toBe("application/json");
    expect(capturedBlob!.size).toBe(16);
  });
});
