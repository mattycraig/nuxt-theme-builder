import { describe, it, expect } from "vitest";
import {
  COLOR_VISION_MATRICES,
  COLOR_VISION_OPTIONS,
  colorVisionFilter,
  colorVisionFilterId,
} from "~/utils/colorVision";

function rows(matrix: string): number[][] {
  const values = matrix.split(" ").map(Number);
  return [0, 1, 2, 3].map((r) => values.slice(r * 5, r * 5 + 5));
}

describe("colorVision", () => {
  it("has no filter for normal vision", () => {
    expect(colorVisionFilter("none")).toBeUndefined();
  });

  it("references the SVG filter for each simulated mode", () => {
    expect(colorVisionFilter("deuteranopia")).toBe(
      `url(#${colorVisionFilterId("deuteranopia")})`,
    );
  });

  it("offers a matrix for every option except normal vision", () => {
    const simulated = COLOR_VISION_OPTIONS.filter((o) => o.id !== "none").map(
      (o) => o.id,
    );
    expect(Object.keys(COLOR_VISION_MATRICES).sort()).toEqual(
      simulated.sort(),
    );
  });

  it.each(Object.entries(COLOR_VISION_MATRICES))(
    "%s is a valid 4×5 matrix that keeps white white and alpha unchanged",
    (_, matrix) => {
      const m = rows(matrix);
      expect(matrix.split(" ").map(Number).every(Number.isFinite)).toBe(true);
      expect(matrix.split(" ")).toHaveLength(20);
      for (const row of m.slice(0, 3)) {
        expect(row[0]! + row[1]! + row[2]!).toBeCloseTo(1, 4);
      }
      expect(m[3]).toEqual([0, 0, 0, 1, 0]);
    },
  );
});
