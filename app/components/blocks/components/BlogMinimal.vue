<script setup lang="ts">
const posts = [
  {
    title: "Quick Tip: Custom Font Loading",
    description: "Optimize web font delivery for faster page loads.",
    date: "2025-01-22",
    authors: [{ name: "Elena Voss", avatar: { text: "EV" } }],
    readTime: "3 min read",
  },
  {
    title: "Theme Tokens Explained",
    description: "Understanding semantic vs literal design tokens.",
    date: "2025-01-19",
    authors: [{ name: "Raj Patel", avatar: { text: "RP" } }],
    readTime: "6 min read",
  },
  {
    title: "Dark Mode Done Right",
    description: "Best practices for designing dual-mode interfaces.",
    date: "2025-01-16",
    authors: [{ name: "Lena Müller", avatar: { text: "LM" } }],
    readTime: "5 min read",
  },
];
</script>

<template>
  <section class="relative py-16 sm:py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with editorial feel -->
      <div class="mb-10 blog-minimal-stagger">
        <h2
          class="text-3xl font-bold text-(--ui-text-highlighted) tracking-tight"
        >
          Recent Posts
        </h2>
        <div
          class="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)]"
          aria-hidden="true"
        />
      </div>

      <!-- Timeline-accented post list -->
      <div class="relative">
        <!-- Vertical timeline line -->
        <div
          class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--ui-primary)]/30 via-(--ui-border) to-transparent"
          aria-hidden="true"
        />

        <UPageList>
          <div
            v-for="(post, i) in posts"
            :key="post.title"
            role="listitem"
            class="blog-minimal-stagger group relative pl-8 py-6 transition-colors duration-200"
            :style="{ animationDelay: `${100 + i * 120}ms` }"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-0 top-8 -translate-x-1/2 size-2.5 rounded-full border-2 border-(--ui-primary)/40 bg-(--ui-bg) transition-all duration-300 group-hover:border-(--ui-primary) group-hover:bg-(--ui-primary) group-hover:scale-125"
              aria-hidden="true"
            />

            <!-- Hover accent bar -->
            <div
              class="absolute left-3 top-6 bottom-6 w-0.5 rounded-full bg-(--ui-primary) opacity-0 transition-all duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div
              class="flex items-center gap-2 text-sm text-(--ui-text-muted) mb-1.5"
            >
              <time>{{ post.date }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ post.authors?.[0]?.name }}</span>
              <span aria-hidden="true">·</span>
              <span class="text-(--ui-primary)/70">{{ post.readTime }}</span>
            </div>
            <h3
              class="text-lg font-semibold text-(--ui-text-highlighted) mb-1 transition-colors duration-200 group-hover:text-(--ui-primary)"
            >
              {{ post.title }}
            </h3>
            <p class="text-(--ui-text-muted) leading-relaxed">
              {{ post.description }}
            </p>
          </div>
        </UPageList>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-minimal-stagger {
  animation: blogMinimalSlide 0.5s ease-out both;
}

@keyframes blogMinimalSlide {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-minimal-stagger {
    animation: none;
  }
}
</style>
