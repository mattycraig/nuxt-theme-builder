<script setup lang="ts">
import { PAGE_DESCRIPTIONS, SITE_URL, OG_IMAGE_URL } from "~/utils/seoDescriptions";

const title = "Nuxt UI Theme Builder — Visual Design-Token Editor";

useSeoMeta({
  title,
  description: PAGE_DESCRIPTIONS["/"],
  ogTitle: title,
  ogDescription: PAGE_DESCRIPTIONS["/"],
  ogType: "website",
  ogImage: OG_IMAGE_URL,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: PAGE_DESCRIPTIONS["/"],
  twitterImage: OG_IMAGE_URL,
});

useHead({
  link: [
    { rel: "canonical", href: SITE_URL },
  ],
});

useSchemaOrg([
  defineWebSite({ name: "Nuxt UI Theme Builder" }),
  defineWebPage({
    name: "Nuxt UI Theme Builder — Visual Design-Token Editor",
    description: PAGE_DESCRIPTIONS["/"],
  }),
]);
</script>

<template>
  <div class="relative isolate">
    <div
      class="home-wash pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]"
      aria-hidden="true"
    />

    <div
      class="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-14 sm:gap-28 sm:px-10 sm:py-20"
    >
      <HomeHero />
      <HomeExplore />
      <HomeExport />

      <section
        aria-labelledby="home-oss-heading"
        class="flex flex-col gap-6 border-t border-(--ui-border) pt-12 sm:flex-row sm:items-end sm:justify-between"
      >
        <div class="flex max-w-xl flex-col gap-2">
          <h2
            id="home-oss-heading"
            class="text-2xl font-bold tracking-tight text-(--ui-text-highlighted)"
          >
            Free, open source, and private
          </h2>
          <p class="text-(--ui-text-muted)">
            No account needed. Your themes stay in your browser, and AI
            generation uses your own API key. Built with Nuxt, Nuxt UI and
            Tailwind CSS.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <UButton
            label="Star on GitHub"
            icon="i-simple-icons-github"
            to="https://github.com/mattycraig/nuxt-theme-builder"
            target="_blank"
            color="neutral"
            variant="outline"
          />
          <UButton
            label="Read the guides"
            icon="i-lucide-book-open"
            to="/learn"
            color="neutral"
            variant="ghost"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* One quiet wash of the primary color behind the hero; it follows the theme. */
.home-wash {
  background: radial-gradient(
    ellipse 70% 60% at 75% 0%,
    color-mix(in oklab, var(--ui-primary) 12%, transparent),
    transparent 70%
  );
}
</style>
