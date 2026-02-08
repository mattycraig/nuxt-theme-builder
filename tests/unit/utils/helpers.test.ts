import { describe, it, expect } from "vitest";
import { typedEntries, timeAgo } from "~/utils/helpers";

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
