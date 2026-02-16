/**
 * Server-side AI fallback token overrides.
 *
 * Applied when the AI model omits token overrides from its response.
 * These intentionally differ from the client-side defaults in `app/utils/defaults.ts`
 * (e.g., `bg.elevated = "white"` here vs `"100"` there) to produce the best
 * result for AI-generated themes specifically.
 *
 * @module shared/constants/aiDefaults
 */

export interface TokenOverridesShape {
  text: {
    dimmed: string;
    muted: string;
    toned: string;
    default: string;
    highlighted: string;
    inverted: string;
  };
  bg: {
    default: string;
    muted: string;
    elevated: string;
    accented: string;
    inverted: string;
  };
  border: {
    default: string;
    muted: string;
    accented: string;
    inverted: string;
  };
}

/** Light-mode fallback overrides for AI-generated themes. */
export const AI_FALLBACK_LIGHT_OVERRIDES: TokenOverridesShape = {
  text: {
    dimmed: "400",
    muted: "500",
    toned: "600",
    default: "700",
    highlighted: "900",
    inverted: "white",
  },
  bg: {
    default: "white",
    muted: "50",
    elevated: "white",
    accented: "100",
    inverted: "900",
  },
  border: { default: "200", muted: "200", accented: "300", inverted: "800" },
};

/** Dark-mode fallback overrides for AI-generated themes. */
export const AI_FALLBACK_DARK_OVERRIDES: TokenOverridesShape = {
  text: {
    dimmed: "500",
    muted: "400",
    toned: "300",
    default: "200",
    highlighted: "white",
    inverted: "900",
  },
  bg: {
    default: "900",
    muted: "800",
    elevated: "800",
    accented: "700",
    inverted: "white",
  },
  border: { default: "800", muted: "700", accented: "700", inverted: "200" },
};
