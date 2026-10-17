import type { ComponentDefaults, ComponentGroup } from "~/types/theme";
import { COMPONENT_DEFAULT_TARGETS } from "~/types/theme";

const GROUPS = Object.keys(COMPONENT_DEFAULT_TARGETS) as ComponentGroup[];

/**
 * `defaultVariants` for every Nuxt UI app config key a theme's component
 * defaults cover, keyed by that app config key (`button`, `selectMenu`, …).
 * Keys with nothing set get `{}`, so applying the result also clears
 * defaults that were removed.
 */
export function getComponentDefaultVariants(
  components: ComponentDefaults | undefined,
): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  for (const group of GROUPS) {
    const variants = { ...components?.[group] } as Record<string, string>;
    for (const key of COMPONENT_DEFAULT_TARGETS[group]) {
      result[key] = { ...variants };
    }
  }
  return result;
}

/** Write a theme's component defaults into Nuxt UI's app config. */
export function applyComponentDefaults(
  ui: Record<string, unknown>,
  components: ComponentDefaults | undefined,
) {
  for (const [key, defaultVariants] of Object.entries(
    getComponentDefaultVariants(components),
  )) {
    const current = ui[key] as Record<string, unknown> | undefined;
    if (current) current.defaultVariants = defaultVariants;
    else ui[key] = { defaultVariants };
  }
}
