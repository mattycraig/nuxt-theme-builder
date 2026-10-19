/**
 * Color vision deficiency simulation for the preview iframe.
 *
 * Each mode is an SVG `feColorMatrix` (applied in linear RGB, the filter
 * default) rendered once by `PreviewColorVisionFilters` and referenced from
 * CSS with `filter: url(#…)`. The protan, deutan, and tritan matrices are
 * Machado, Oliveira & Fernandes (2009) at full severity; achromatopsia maps
 * every color to its relative luminance.
 */

export type ColorVisionMode =
  | "none"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

export interface ColorVisionOption {
  id: ColorVisionMode;
  label: string;
  description: string;
}

export const COLOR_VISION_OPTIONS: readonly ColorVisionOption[] = [
  { id: "none", label: "Normal vision", description: "No simulation" },
  { id: "protanopia", label: "Protanopia", description: "No red cones" },
  { id: "deuteranopia", label: "Deuteranopia", description: "No green cones" },
  { id: "tritanopia", label: "Tritanopia", description: "No blue cones" },
  { id: "achromatopsia", label: "Achromatopsia", description: "No color" },
];

const LUMINANCE = "0.2126 0.7152 0.0722 0 0";

/** 4×5 `feColorMatrix` values for each simulated mode. */
export const COLOR_VISION_MATRICES: Record<
  Exclude<ColorVisionMode, "none">,
  string
> = {
  protanopia: [
    "0.152286 1.052583 -0.204868 0 0",
    "0.114503 0.786281 0.099216 0 0",
    "-0.003882 -0.048116 1.051998 0 0",
    "0 0 0 1 0",
  ].join(" "),
  deuteranopia: [
    "0.367322 0.860646 -0.227968 0 0",
    "0.280085 0.672501 0.047413 0 0",
    "-0.011820 0.042940 0.968881 0 0",
    "0 0 0 1 0",
  ].join(" "),
  tritanopia: [
    "1.255528 -0.076749 -0.178779 0 0",
    "-0.078411 0.930809 0.147602 0 0",
    "0.004733 0.691367 0.303900 0 0",
    "0 0 0 1 0",
  ].join(" "),
  achromatopsia: [LUMINANCE, LUMINANCE, LUMINANCE, "0 0 0 1 0"].join(" "),
};

/** Element id of the SVG filter for a mode. */
export function colorVisionFilterId(
  mode: Exclude<ColorVisionMode, "none">,
): string {
  return `color-vision-${mode}`;
}

/** CSS `filter` value for a mode, or `undefined` for normal vision. */
export function colorVisionFilter(mode: ColorVisionMode): string | undefined {
  return mode === "none" ? undefined : `url(#${colorVisionFilterId(mode)})`;
}
