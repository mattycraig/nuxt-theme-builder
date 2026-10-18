<script setup lang="ts">
import type { BadgeProps } from "@nuxt/ui";
import type { ChangelogCollectionItem } from "@nuxt/content";

// File names start with the date, so this is newest first.
const entries = await queryCollection("changelog").order("stem", "DESC").all();

const BADGES: Record<ChangelogCollectionItem["badge"], BadgeProps> = {
  new: { label: "New", color: "primary", variant: "solid" },
  improved: { label: "Improved", color: "success", variant: "subtle" },
  fixed: { label: "Fixed", color: "neutral", variant: "subtle" },
};

useSchemaOrg([
  defineWebPage({ "@type": "CollectionPage" }),
]);
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader
        headline="What's new"
        title="New in the Theme Builder"
        description="New features and improvements, newest first. Each entry links to the feature or a guide on using it."
        :links="[
          {
            label: 'View on GitHub',
            icon: 'i-simple-icons-github',
            to: 'https://github.com/mattycraig/nuxt-theme-builder',
            target: '_blank',
            variant: 'outline',
            color: 'neutral',
          },
        ]"
      />

      <UPageBody>
        <UChangelogVersions
          :indicator-motion="false"
          :ui="{ indicator: 'inset-y-0' }"
        >
          <UChangelogVersion
            v-for="entry in entries"
            :key="entry.stem"
            :title="entry.title"
            :description="entry.description"
            :date="entry.date"
            :badge="BADGES[entry.badge]"
            :image="
              entry.image
                ? {
                    ...entry.image,
                    width: 1600,
                    height: 900,
                    loading: 'lazy',
                    decoding: 'async',
                  }
                : undefined
            "
            :ui="{
              root: 'flex items-start',
              container: 'max-w-2xl w-full mx-0 lg:ms-8',
              title: 'text-2xl',
              date: 'font-mono text-xs/9 text-(--ui-text-highlighted)',
              indicator: 'sticky top-0 shrink-0 pt-6 -mt-6',
              imageWrapper: 'ring ring-(--ui-border) bg-(--ui-bg-elevated)',
            }"
          >
            <template #body>
              <div class="prose prose-sm dark:prose-invert max-w-none mt-5">
                <ContentRenderer :value="entry" />
              </div>
            </template>

            <template v-if="entry.links?.length" #actions>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-for="link in entry.links"
                  :key="link.to"
                  :label="link.label"
                  :icon="link.icon"
                  :to="link.to"
                  color="neutral"
                  variant="outline"
                  size="sm"
                />
              </div>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>
      </UPageBody>
    </UContainer>
  </UPage>
</template>
