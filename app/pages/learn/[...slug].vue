<script setup lang="ts">
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

const route = useRoute();

const article = await queryCollection("learn").path(route.path).first();

if (!article) {
  throw createError({ statusCode: 404, statusMessage: "Article not found" });
}

const seoDescription =
  PAGE_DESCRIPTIONS[route.path as keyof typeof PAGE_DESCRIPTIONS] ??
  article.description ??
  "";

useSeoMeta({
  title: `${article.title} — Nuxt UI Theme Builder`,
  description: seoDescription,
});

const [prev, next] = await queryCollectionItemSurroundings("learn", route.path);

const categoryLabels: Record<string, string> = {
  theming: "Theming",
  components: "Components",
  tailwind: "Tailwind CSS",
  "best-practices": "Best Practices",
};

const formatLabels: Record<string, string> = {
  guide: "Guide",
  reference: "Reference",
  tip: "Quick Tip",
};
</script>

<template>
  <UPage>
    <UContainer>
      <article class="max-w-4xl mx-auto py-6">
        <!-- Header -->
        <header class="mb-8">
          <div class="flex items-center gap-2 mb-3 flex-wrap">
            <UBadge
              v-if="article.format"
              :label="formatLabels[article.format] ?? article.format"
              variant="subtle"
              color="primary"
              size="xs"
            />
            <UBadge
              :label="categoryLabels[article.category] ?? article.category"
              variant="soft"
              color="neutral"
              size="xs"
            />
            <UBadge
              v-for="tag in article.tags"
              :key="tag"
              :label="tag"
              variant="outline"
              color="neutral"
              size="xs"
            />
          </div>

          <h1
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-3"
          >
            {{ article.title }}
          </h1>
          <p v-if="article.description" class="text-lg text-(--ui-text-muted)">
            {{ article.description }}
          </p>

          <div v-if="article.date" class="mt-3 text-sm text-(--ui-text-dimmed)">
            <time :datetime="article.date">
              {{
                new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </time>
          </div>
        </header>

        <USeparator class="mb-8" />

        <!-- Content -->
        <div class="prose prose-sm dark:prose-invert max-w-none">
          <ContentRenderer :value="article" />
        </div>

        <USeparator class="my-8" />

        <!-- Prev/Next Navigation -->
        <nav
          v-if="prev || next"
          aria-label="Article navigation"
          class="flex items-stretch gap-4"
        >
          <NuxtLink
            v-if="prev"
            :to="prev.path"
            class="flex-1 group"
            :aria-label="`Previous article: ${prev.title}`"
          >
            <UCard
              class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all"
            >
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-arrow-left"
                  class="size-4 text-(--ui-text-dimmed) group-hover:text-(--ui-primary) transition-colors shrink-0"
                />
                <div class="min-w-0">
                  <p class="text-xs text-(--ui-text-dimmed)">Previous</p>
                  <p
                    class="text-sm font-medium text-(--ui-text-highlighted) truncate"
                  >
                    {{ prev.title }}
                  </p>
                </div>
              </div>
            </UCard>
          </NuxtLink>

          <div v-else class="flex-1" />

          <NuxtLink
            v-if="next"
            :to="next.path"
            class="flex-1 group text-right"
            :aria-label="`Next article: ${next.title}`"
          >
            <UCard
              class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all"
            >
              <div class="flex items-center justify-end gap-2">
                <div class="min-w-0">
                  <p class="text-xs text-(--ui-text-dimmed)">Next</p>
                  <p
                    class="text-sm font-medium text-(--ui-text-highlighted) truncate"
                  >
                    {{ next.title }}
                  </p>
                </div>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-(--ui-text-dimmed) group-hover:text-(--ui-primary) transition-colors shrink-0"
                />
              </div>
            </UCard>
          </NuxtLink>

          <div v-else class="flex-1" />
        </nav>

        <!-- Back to Learn -->
        <div class="mt-8 text-center">
          <UButton
            label="Back to All Articles"
            icon="i-lucide-arrow-left"
            to="/learn"
            variant="ghost"
            color="neutral"
          />
        </div>
      </article>
    </UContainer>
  </UPage>
</template>
