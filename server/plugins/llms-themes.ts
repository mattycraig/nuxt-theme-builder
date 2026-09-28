import { BUILT_IN_PRESETS, presetSlug } from "~~/app/utils/presets";

/** Adds the theme gallery to /llms.txt (nuxt-llms options in nuxt.config.ts). */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("llms:generate", (_event, options) => {
    options.sections.push({
      title: "Theme gallery",
      description:
        "Ready-made Nuxt UI v4 themes. Each page shows light and dark mode and the app.config.ts and CSS to copy.",
      links: BUILT_IN_PRESETS.map((preset) => ({
        title: `${preset.name} theme`,
        description: preset.description,
        href: `${options.domain}/themes/${presetSlug(preset.name)}`,
      })),
    });
  });
});
