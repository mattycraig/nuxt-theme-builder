<script setup lang="ts">
const posts = [
  {
    title: "Getting Started with Theme Builder",
    description:
      "Learn how to create, preview, and export custom Nuxt UI themes in minutes.",
    date: "2025-01-15",
    badge: { label: "Tutorial", color: "primary" as const },
    image: {
      src: "https://picsum.photos/seed/blog1/800/400",
      alt: "Theme builder tutorial",
    },
    authors: [{ name: "Sarah Chen", avatar: { text: "SC" } }],
  },
  {
    title: "Design Systems at Scale",
    description:
      "How teams maintain brand consistency across dozens of applications using shared theme tokens.",
    date: "2025-01-10",
    badge: { label: "Guide", color: "neutral" as const },
    image: {
      src: "https://picsum.photos/seed/blog2/800/400",
      alt: "Design systems architecture",
    },
    authors: [{ name: "Marcus Rivera", avatar: { text: "MR" } }],
  },
  {
    title: "AI-Powered Color Palettes",
    description:
      "Discover how AI generates accessible, harmonious color systems from a single prompt.",
    date: "2025-01-05",
    badge: { label: "Feature", color: "primary" as const },
    image: {
      src: "https://picsum.photos/seed/blog3/800/400",
      alt: "AI color palette generation",
    },
    authors: [{ name: "Alex Kim", avatar: { text: "AK" } }],
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Atmospheric gradient orb -->
    <div
      class="pointer-events-none absolute -top-32 right-1/4 size-[28rem] rounded-full bg-(--ui-primary)/8 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 left-1/3 size-[20rem] rounded-full bg-(--ui-secondary)/6 blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header with accent line -->
      <div class="text-center mb-14 blog-grid-stagger">
        <div class="inline-flex items-center gap-2 mb-4">
          <span
            class="h-px w-8 bg-gradient-to-r from-transparent to-[var(--ui-primary)]"
            aria-hidden="true"
          />
          <p
            class="text-sm font-semibold text-(--ui-primary) uppercase tracking-wider"
          >
            Blog
          </p>
          <span
            class="h-px w-8 bg-gradient-to-l from-transparent to-[var(--ui-primary)]"
            aria-hidden="true"
          />
        </div>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) tracking-tight"
        >
          Latest articles
        </h2>
        <p class="mt-3 text-lg text-(--ui-text-muted) max-w-2xl mx-auto">
          Explore guides, deep dives, and community stories from our team.
        </p>
      </div>

      <!-- Posts grid with staggered entrance -->
      <UBlogPosts>
        <div
          v-for="(post, i) in posts"
          :key="post.title"
          class="blog-grid-stagger group"
          :style="{ animationDelay: `${150 + i * 100}ms` }"
        >
          <UBlogPost
            v-bind="post"
            class="h-full transition-all duration-300 group-hover:shadow-xl group-hover:shadow-(--ui-primary)/5 group-hover:-translate-y-1"
          />
        </div>
      </UBlogPosts>

      <!-- Bottom decorative element -->
      <div
        class="mt-12 flex justify-center blog-grid-stagger"
        style="animation-delay: 500ms"
      >
        <UButton
          label="View all posts"
          variant="ghost"
          color="primary"
          icon="i-lucide-arrow-right"
          trailing
          size="lg"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-grid-stagger {
  animation: blogGridFadeUp 0.6s ease-out both;
}

@keyframes blogGridFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-grid-stagger {
    animation: none;
  }
}
</style>
