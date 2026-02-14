<script setup lang="ts">
const featured = {
  title: "The Future of Component Theming",
  description:
    "An in-depth look at how modern frameworks are evolving their theming capabilities, from CSS variables to design token systems. Learn where the industry is heading and how to prepare your projects.",
  date: "2025-01-20",
  badge: { label: "Featured", color: "primary" as const },
  image: {
    src: "https://picsum.photos/seed/featured/1200/600",
    alt: "Future of component theming",
  },
  authors: [{ name: "Jamie Dawson", avatar: { text: "JD" } }],
};

const recent = [
  {
    title: "Migrating from Tailwind v3 to v4",
    description:
      "A practical guide to updating your design tokens and theme config.",
    date: "2025-01-18",
    badge: { label: "Migration", color: "neutral" as const },
    authors: [{ name: "Priya Sharma", avatar: { text: "PS" } }],
  },
  {
    title: "Building Accessible Color Palettes",
    description: "Ensure your themes meet WCAG 2.2 contrast requirements.",
    date: "2025-01-12",
    badge: { label: "A11y", color: "neutral" as const },
    authors: [{ name: "David Okafor", avatar: { text: "DO" } }],
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Spotlight glow behind featured area -->
    <div
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[32rem] w-full max-w-4xl"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-[var(--ui-primary)]/6 via-transparent to-transparent rounded-[50%] blur-[60px]"
      />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <!-- Section heading -->
      <div class="text-center blog-featured-stagger">
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) tracking-tight"
        >
          From the blog
        </h2>
        <p class="mt-2 text-(--ui-text-muted) text-lg">
          The latest on design systems, theme engineering, and developer
          experience.
        </p>
      </div>

      <!-- Featured post with elevated card treatment -->
      <div
        class="blog-featured-stagger [animation-delay:120ms] rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/80 backdrop-blur-sm shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-(--ui-primary)/5"
      >
        <UBlogPost v-bind="featured" orientation="horizontal" />
      </div>

      <!-- Recent posts with border accent -->
      <div class="blog-featured-stagger [animation-delay:250ms]">
        <div class="flex items-center gap-3 mb-6">
          <h3
            class="text-sm font-semibold text-(--ui-text-muted) uppercase tracking-wider"
          >
            Recent
          </h3>
          <div
            class="flex-1 h-px bg-gradient-to-r from-(--ui-border) to-transparent"
            aria-hidden="true"
          />
        </div>
        <UBlogPosts orientation="horizontal">
          <div
            v-for="(post, i) in recent"
            :key="post.title"
            class="blog-featured-stagger group"
            :style="{ animationDelay: `${350 + i * 100}ms` }"
          >
            <UBlogPost
              v-bind="post"
              class="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md"
            />
          </div>
        </UBlogPosts>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-featured-stagger {
  animation: blogFeaturedFadeUp 0.65s ease-out both;
}

@keyframes blogFeaturedFadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-featured-stagger {
    animation: none;
  }
}
</style>
