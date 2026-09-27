<script setup lang="ts">
import { BUILT_IN_PRESETS, findPresetBySlug, presetSlug } from "~/utils/presets";
import { resolveModeColors } from "~/utils/themeSwatches";
import { generateAppConfigExport } from "~/utils/appConfigGenerator";
import { generateExportCSS } from "~/utils/cssGenerator";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";
import { SITE_URL } from "~/utils/seoDescriptions";

const route = useRoute();
const slug = String(route.params.slug);
const preset = findPresetBySlug(slug);

if (!preset) {
  throw createError({ statusCode: 404, statusMessage: "Theme not found" });
}

const config = preset.config;
const light = resolveModeColors(config, "light");
const dark = resolveModeColors(config, "dark");
const isBrand = preset.category === "Brands";

const title = `${preset.name} Theme for Nuxt UI — Nuxt UI Theme Builder`;
const description = `${preset.description ?? ""} Copy the app.config.ts and CSS for this free Nuxt UI v4 theme, or load it in the Theme Builder.`.trim();
const ogImage = `${SITE_URL}/og/themes/${slug}.png`;

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${preset.name} theme color swatches`,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
});

const appConfigCode = generateAppConfigExport(config);
const cssCode = generateExportCSS(
  config,
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
);


const details = [
  {
    label: "Font",
    value:
      config.font === config.darkFont
        ? config.font
        : `${config.font} / ${config.darkFont} (dark)`,
  },
  {
    label: "Radius",
    value:
      config.radius === config.darkRadius
        ? `${config.radius}rem`
        : `${config.radius}rem / ${config.darkRadius}rem (dark)`,
  },
  {
    label: "Neutral",
    value:
      config.neutral === config.darkNeutral
        ? config.neutral
        : `${config.neutral} / ${config.darkNeutral} (dark)`,
  },
  { label: "Collection", value: preset.category ?? "Themes" },
];

const related = BUILT_IN_PRESETS.filter(
  (p) => p.category === preset.category && p.name !== preset.name,
).map((p) => ({
  name: p.name,
  description: p.description ?? "",
  to: `/themes/${presetSlug(p.name)}`,
  swatches: resolveModeColors(p.config, "light").semantic,
}));

const store = useThemeStore();
const toast = useToast();

async function openInBuilder() {
  store.loadPreset(preset!);
  toast.add({
    title: `${preset!.name} theme applied`,
    description: "Undo from the sidebar if you want your previous theme back.",
    icon: "i-lucide-check",
    color: "success",
  });
  await navigateTo("/templates/landing");
}
</script>

<template>
  <UContainer>
    <div class="space-y-10 py-2">
      <UPageHeader
        headline="Themes"
        :title="`${preset!.name} Theme for Nuxt UI`"
        :description="preset!.description"
        :links="[
          {
            label: 'All Themes',
            icon: 'i-lucide-arrow-left',
            to: '/themes',
            color: 'neutral' as const,
            variant: 'ghost' as const,
          },
        ]"
      />

      <div class="flex flex-wrap gap-3">
        <UButton
          label="Preview in the builder"
          icon="i-lucide-wand-sparkles"
          size="lg"
          @click="openInBuilder"
        />
        <UButton
          label="Copy the code"
          icon="i-lucide-code"
          size="lg"
          color="neutral"
          variant="outline"
          to="#export"
        />
      </div>

      <section aria-labelledby="theme-modes" class="space-y-4">
        <h2
          id="theme-modes"
          class="text-xl font-semibold text-(--ui-text-highlighted)"
        >
          Light and dark mode
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <ThemesModePreview :swatches="light" detailed />
          <ThemesModePreview :swatches="dark" detailed />
        </div>
        <dl class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="item in details"
            :key="item.label"
            class="rounded-(--ui-radius) border border-(--ui-border) p-3"
          >
            <dt class="text-xs text-(--ui-text-muted)">{{ item.label }}</dt>
            <dd class="mt-1 text-sm font-medium text-(--ui-text-highlighted)">
              {{ item.value }}
            </dd>
          </div>
        </dl>
        <p v-if="isBrand" class="text-sm text-(--ui-text-dimmed)">
          Inspired by {{ preset!.name }}'s brand colors. Not affiliated with or
          endorsed by {{ preset!.name }}.
        </p>
      </section>

      <section id="export" aria-labelledby="theme-export" class="space-y-4">
        <h2
          id="theme-export"
          class="text-xl font-semibold text-(--ui-text-highlighted)"
        >
          Use the {{ preset!.name }} theme in your project
        </h2>
        <p class="max-w-3xl text-sm leading-7 text-(--ui-text-muted)">
          Paste the palette assignments into <code>app.config.ts</code>, then
          add the CSS to your main stylesheet. The CSS carries everything app
          config can't express: the font, radius, shade shifts, and the
          separate dark-mode tokens. See
          <NuxtLink
            to="/learn/theming/export-and-share"
            class="text-(--ui-primary) underline underline-offset-2"
          >
            How to Export and Share Nuxt UI Themes
          </NuxtLink>
          for the details.
        </p>
        <div class="grid gap-4 lg:grid-cols-2">
          <SharedCodeBlock
            :code="appConfigCode"
            filename="app.config.ts"
            language="ts"
            max-height="28rem"
          />
          <SharedCodeBlock
            :code="cssCode"
            filename="main.css"
            language="css"
            download-mime-type="text/css"
            max-height="28rem"
          />
        </div>
      </section>

      <section
        v-if="related.length"
        aria-labelledby="theme-related"
        class="space-y-4"
      >
        <h2
          id="theme-related"
          class="text-xl font-semibold text-(--ui-text-highlighted)"
        >
          More {{ preset!.category }} themes
        </h2>
        <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in related" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="flex h-full flex-col gap-2 rounded-(--ui-radius) border border-(--ui-border) p-4 transition-colors hover:bg-(--ui-bg-elevated)/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
            >
              <span class="flex gap-1" aria-hidden="true">
                <span
                  v-for="s in item.swatches"
                  :key="s.key"
                  class="size-4 rounded-full"
                  :style="{ backgroundColor: s.color }"
                />
              </span>
              <span class="text-sm font-medium text-(--ui-text-highlighted)">
                {{ item.name }}
              </span>
              <span class="text-sm text-(--ui-text-muted)">
                {{ item.description }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <LearnRelatedGuides
        :paths="[
          '/learn/theming/customize-colors',
          '/learn/theming/dark-mode-guide',
          '/learn/best-practices/accessible-color-contrast',
        ]"
      />
    </div>
  </UContainer>
</template>
