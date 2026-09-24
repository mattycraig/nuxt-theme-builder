import { describe, it, expect } from "vitest";
import { AI_SYSTEM_PROMPT } from "~~/server/utils/aiSystemPrompt";
import {
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  FONT_OPTIONS,
  SHADE_VALUES,
} from "~~/shared/constants/theme";

// The prompt tells the model to use ONLY listed values, so anything missing
// here can never be generated even though the response schema accepts it.
describe("AI_SYSTEM_PROMPT", () => {
  it.each(NEUTRAL_PALETTES)("offers the %s neutral palette", (palette) => {
    const neutralSection = AI_SYSTEM_PROMPT.split("### Neutral Palette")[1]!;
    expect(neutralSection).toMatch(new RegExp(`\\b${palette}\\b`));
  });

  it.each(CHROMATIC_PALETTES)("offers the %s chromatic palette", (palette) => {
    expect(AI_SYSTEM_PROMPT).toMatch(new RegExp(`\\b${palette}\\b`));
  });

  it.each([...FONT_OPTIONS])("offers the %s font", (font) => {
    expect(AI_SYSTEM_PROMPT).toContain(font);
  });

  it("lists every token override shade", () => {
    expect(AI_SYSTEM_PROMPT).toContain(
      `Available shades: ${SHADE_VALUES.join(", ")}`,
    );
  });
});
