<script setup lang="ts">
import { PRESET_CATEGORIES } from "~/types/theme";
import { BUILT_IN_PRESETS, presetSlug } from "~/utils/presets";
import { resolveModeSwatches } from "~/utils/themeSwatches";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Nuxt UI Themes — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/themes"],
  }),
]);

const groups = PRESET_CATEGORIES.map((category) => ({
  category,
  themes: BUILT_IN_PRESETS.filter((p) => p.category === category).map(
    (p) => ({
      name: p.name,
      description: p.description ?? "",
      to: `/themes/${presetSlug(p.name)}`,
      light: resolveModeSwatches(p.config, "light"),
      dark: resolveModeSwatches(p.config, "dark"),
    }),
  ),
})).filter((group) => group.themes.length > 0);
</script>

<template>
  <UContainer>
    <div class="space-y-10 py-2">
      <UPageHeader
        headline="Theme Gallery"
        title="Free Nuxt UI Themes"
        :description="`${BUILT_IN_PRESETS.length} ready-made Nuxt UI v4 themes with light and dark modes. Open one to copy its app.config.ts and CSS, or load it in the Theme Builder and make it your own.`"
        :links="[
          {
            label: 'Back to Home',
            icon: 'i-lucide-arrow-left',
            to: '/',
            color: 'neutral' as const,
            variant: 'ghost' as const,
          },
        ]"
      />

      <section
        v-for="group in groups"
        :key="group.category"
        :aria-labelledby="`themes-${presetSlug(group.category)}`"
        class="space-y-4"
      >
        <h2
          :id="`themes-${presetSlug(group.category)}`"
          class="text-xl font-semibold text-(--ui-text-highlighted)"
        >
          {{ group.category }}
        </h2>
        <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <li v-for="theme in group.themes" :key="theme.to">
            <NuxtLink
              :to="theme.to"
              class="group flex h-full flex-col overflow-hidden rounded-xl border border-(--ui-border) transition-shadow hover:ring-2 hover:ring-(--ui-primary)/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
            >
              <span class="grid grid-cols-2" aria-hidden="true">
                <span
                  v-for="mode in [theme.light, theme.dark]"
                  :key="mode.mode"
                  class="flex h-20 items-end gap-1.5 p-3"
                  :style="{ backgroundColor: mode.bg }"
                >
                  <span
                    v-for="s in mode.semantic"
                    :key="s.key"
                    class="size-5 rounded-full"
                    :style="{ backgroundColor: s.color }"
                  />
                </span>
              </span>
              <span class="flex flex-1 flex-col gap-1 p-4">
                <span class="font-medium text-(--ui-text-highlighted)">
                  {{ theme.name }}
                </span>
                <span class="text-sm text-(--ui-text-muted)">
                  {{ theme.description }}
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section
        aria-labelledby="themes-guide"
        class="rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-muted)/30 p-6 sm:p-8"
      >
        <div class="max-w-3xl space-y-4">
          <h2
            id="themes-guide"
            class="text-2xl font-semibold text-(--ui-text-highlighted)"
          >
            How to use a Nuxt UI theme
          </h2>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            Every theme sets the six semantic colors (primary, secondary,
            success, info, warning, error), a neutral gray scale, a border
            radius, and a font, with separate values for light and dark mode.
            Nuxt UI reads the palette names from <code>app.config.ts</code>; the
            rest ships as CSS variables in your main stylesheet.
          </p>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            Treat a theme as a starting point. Load it in the builder, swap the
            primary color for your brand, check contrast, and export. The
            <NuxtLink
              to="/learn/theming/customize-colors"
              class="text-(--ui-primary) underline underline-offset-2"
            >
              color customization guide
            </NuxtLink>
            walks through each setting.
          </p>
        </div>
      </section>
    </div>
  </UContainer>
</template>
