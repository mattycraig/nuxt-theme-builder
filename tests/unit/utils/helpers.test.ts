import { describe, it, expect } from "vitest";
import { typedEntries } from "~/utils/helpers";

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
