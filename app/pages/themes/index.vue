<script setup lang="ts">
import { THEME_CATEGORIES } from "~/utils/navigation";
import { BUILT_IN_PRESETS, presetSlug } from "~/utils/presets";
import { resolveModeColors } from "~/utils/themeSwatches";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Nuxt UI Themes — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/themes"],
  }),
]);

const categories = THEME_CATEGORIES.filter((cat) => cat.items.length > 0);

const themeByPath = new Map(
  BUILT_IN_PRESETS.map((p) => [
    `/themes/${presetSlug(p.name)}`,
    {
      name: p.name,
      modes: [
        resolveModeColors(p.config, "light"),
        resolveModeColors(p.config, "dark"),
      ],
    },
  ]),
);
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Gallery"
    title="Free Nuxt UI Themes"
    item-label="theme"
    :categories="categories"
  >
    <template #description>
      {{ BUILT_IN_PRESETS.length }} ready-made Nuxt UI v4 themes with light and
      dark modes. Open one to copy its app.config.ts and CSS, or load it in the
      Theme Builder and make it your own.
    </template>

    <template #grid="{ category }">
      <ul class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" role="list">
        <li v-for="item in category.items" :key="String(item.to)">
          <NuxtLink
            :to="String(item.to)"
            class="group flex h-full flex-col overflow-hidden rounded-xl border border-(--ui-border) transition-shadow hover:ring-2 hover:ring-(--ui-primary)/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
          >
            <span class="grid grid-cols-2" aria-hidden="true">
              <span
                v-for="mode in themeByPath.get(String(item.to))?.modes"
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
                {{ themeByPath.get(String(item.to))?.name ?? item.label }}
              </span>
              <span class="text-sm text-(--ui-text-muted)">
                {{ item.description }}
              </span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </template>

    <template #after-content>
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
    </template>
  </SharedCategoryIndex>
</template>
