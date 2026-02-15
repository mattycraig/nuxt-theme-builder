<script setup lang="ts">
import { LEARN_CATEGORIES } from "~/utils/navigation";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

useSeoMeta({
  title: "Learn — Nuxt UI Theme Builder",
  description: PAGE_DESCRIPTIONS["/learn"],
});

const articles = await queryCollection("learn").order("order", "ASC").all();

const featuredArticles = computed(() => articles.filter((a) => a.featured));
</script>

<template>
  <UPage>
    <UContainer>
      <div class="space-y-10">
        <UPageHeader
          headline="Learn"
          title="Guides, References & Tips"
          description="Everything you need to master Nuxt UI v4 theming — from color palettes and dark mode to Tailwind CSS v4 integration and design systems."
          :links="[
            {
              label: 'Back to Home',
              icon: 'i-lucide-arrow-left',
              to: '/',
              variant: 'ghost',
              color: 'neutral',
            },
          ]"
        />

        <!-- Featured Articles -->
        <section
          v-if="featuredArticles.length"
          aria-labelledby="featured-heading"
        >
          <h2
            id="featured-heading"
            class="text-xl font-semibold text-(--ui-text-highlighted) mb-4"
          >
            Featured
          </h2>
          <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            <li v-for="article in featuredArticles" :key="article.path">
              <LearnArticleCard
                :title="article.title ?? ''"
                :description="article.description"
                :to="article.path"
                :date="article.date"
                :category="article.category"
                :format="article.format"
                :featured="article.featured"
              />
            </li>
          </ul>
        </section>

        <USeparator v-if="featuredArticles.length" />

        <!-- Articles by Category -->
        <section
          v-for="cat in LEARN_CATEGORIES"
          :id="`category-${cat.slug}`"
          :key="cat.slug"
          :aria-labelledby="`heading-${cat.slug}`"
        >
          <div class="mb-6">
            <h2
              :id="`heading-${cat.slug}`"
              class="text-2xl font-semibold text-(--ui-text-highlighted)"
            >
              {{ cat.label }}
            </h2>
            <p class="text-sm text-(--ui-text-muted)">
              {{ cat.description }}
            </p>
          </div>

          <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            <li
              v-for="article in articles.filter((a) => a.category === cat.slug)"
              :key="article.path"
            >
              <LearnArticleCard
                :title="article.title ?? ''"
                :description="article.description"
                :to="article.path"
                :date="article.date"
                :category="article.category"
                :format="article.format"
                :featured="article.featured"
              />
            </li>
          </ul>

          <USeparator class="mt-8" />
        </section>
      </div>
    </UContainer>
  </UPage>
</template>
