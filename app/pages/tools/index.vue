<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Design Tools — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/tools"],
  }),
]);
</script>

<template>
  <SharedCategoryIndex
    headline="Theme Builder"
    title="Tools"
    item-label="tool"
    :categories="TOOL_CATEGORIES"
  >
    <template #after-content>
      <section
        aria-labelledby="tools-workflow-title"
        class="rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-muted)/30 p-6 sm:p-8"
      >
        <div class="max-w-3xl space-y-4">
          <h2
            id="tools-workflow-title"
            class="text-2xl font-semibold text-(--ui-text-highlighted)"
          >
            A practical workflow for building a Nuxt UI theme
          </h2>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            These tools are most useful as a sequence instead of isolated demos.
            Start in the palette viewer when you want to compare available color
            ramps, move to the palette generator when you need fast starting
            points, convert final values into the format your project expects,
            and finish with the contrast checker before you export tokens.
          </p>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            That workflow gives you a tighter feedback loop than editing raw
            config by hand because you can inspect hue families, validate exact
            color formats, and catch accessibility problems before the theme is
            applied across components, blocks, and full-page templates.
          </p>
        </div>
      </section>
    </template>
  </SharedCategoryIndex>
</template>
