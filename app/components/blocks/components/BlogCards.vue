<script setup lang="ts">
const posts = [
  {
    title: "Theme Variables Deep Dive",
    description: "Explore the CSS custom properties that power Nuxt UI themes.",
    date: "2025-01-21",
    badge: { label: "Technical", color: "primary" as const },
    image: {
      src: "https://picsum.photos/seed/card1/600/300",
      alt: "Theme variables",
    },
    authors: [{ name: "Tom Bailey", avatar: { text: "TB" } }],
  },
  {
    title: "Responsive Typography Scales",
    description:
      "How to build a fluid type system that scales across breakpoints.",
    date: "2025-01-17",
    badge: { label: "Design", color: "neutral" as const },
    image: {
      src: "https://picsum.photos/seed/card2/600/300",
      alt: "Typography scales",
    },
    authors: [{ name: "Mia Santos", avatar: { text: "MS" } }],
  },
  {
    title: "Component State Management",
    description: "Patterns for managing complex UI state in Vue composables.",
    date: "2025-01-13",
    badge: { label: "Engineering", color: "neutral" as const },
    image: {
      src: "https://picsum.photos/seed/card3/600/300",
      alt: "State management",
    },
    authors: [{ name: "Hiro Yamamoto", avatar: { text: "HY" } }],
  },
  {
    title: "Shipping Your First Theme",
    description: "A step-by-step guide from design to production deployment.",
    date: "2025-01-09",
    badge: { label: "Tutorial", color: "primary" as const },
    image: {
      src: "https://picsum.photos/seed/card4/600/300",
      alt: "Shipping themes",
    },
    authors: [{ name: "Isla Campbell", avatar: { text: "IC" } }],
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Dot grid pattern background -->
    <div
      class="absolute inset-0 blog-cards-dotgrid opacity-[0.03]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-14 blog-cards-stagger">
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) tracking-tight"
        >
          Stories and insights
        </h2>
        <p class="mt-3 text-lg text-(--ui-text-muted) max-w-xl mx-auto">
          Tips, guides, and behind-the-scenes from our team.
        </p>
      </div>

      <!-- Cards grid with hover lift and glow -->
      <UPageGrid>
        <div
          v-for="(post, i) in posts"
          :key="post.title"
          class="blog-cards-stagger group"
          :style="{ animationDelay: `${120 + i * 80}ms` }"
        >
          <UPageCard
            :title="post.title"
            :description="post.description"
            class="h-full relative overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:shadow-(--ui-primary)/8 group-hover:-translate-y-1 group-hover:border-(--ui-primary)/20"
          >
            <template #header>
              <div class="relative overflow-hidden">
                <img
                  :src="post.image.src"
                  :alt="post.image.alt"
                  class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                >
                <!-- Floating category badge -->
                <div class="absolute top-3 left-3">
                  <UBadge
                    :label="post.badge.label"
                    :color="post.badge.color"
                    variant="solid"
                    size="sm"
                    class="shadow-md"
                  />
                </div>
              </div>
            </template>
            <template #footer>
              <div
                class="flex items-center justify-between text-sm text-(--ui-text-muted)"
              >
                <div class="flex items-center gap-2">
                  <UAvatar :text="post.authors[0]?.avatar?.text" size="xs" />
                  <span>{{ post.authors[0]?.name }}</span>
                </div>
                <time class="text-(--ui-text-muted)/70">{{ post.date }}</time>
              </div>
            </template>
          </UPageCard>
        </div>
      </UPageGrid>
    </div>
  </section>
</template>

<style scoped>
.blog-cards-dotgrid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

.blog-cards-stagger {
  animation: blogCardsFadeUp 0.55s ease-out both;
}

@keyframes blogCardsFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-cards-stagger {
    animation: none;
  }
}
</style>
