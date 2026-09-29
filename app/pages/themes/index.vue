<script setup lang="ts">
import { THEME_CATEGORIES } from "~/utils/navigation";
import { BUILT_IN_PRESETS, presetSlug } from "~/utils/presets";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Nuxt UI Themes — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/themes"],
  }),
]);

const categories = THEME_CATEGORIES.filter((cat) => cat.items.length > 0);

const presetByPath = new Map(
  BUILT_IN_PRESETS.map((p) => [`/themes/${presetSlug(p.name)}`, p]),
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
        <li
          v-for="item in category.items"
          :key="String(item.to)"
          class="flex"
        >
          <ThemesGalleryCard
            v-if="presetByPath.get(String(item.to))"
            :preset="presetByPath.get(String(item.to))!"
            :to="String(item.to)"
          />
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
