<script setup lang="ts">
const hero = {
  title: "The Complete Guide to Design Tokens",
  description:
    "Everything you need to know about creating, managing, and scaling design tokens across your organization. From color palettes to spacing scales, we cover it all.",
  date: "2025-01-23",
  badge: { label: "Cover Story", color: "primary" as const },
  image: {
    src: "https://picsum.photos/seed/mag-hero/1200/500",
    alt: "Design tokens guide",
  },
  authors: [
    { name: "Sarah Chen", avatar: { text: "SC" } },
    { name: "Marcus Rivera", avatar: { text: "MR" } },
  ],
};

const sidebar = [
  {
    title: "Undo/Redo: Under the Hood",
    date: "2025-01-20",
    category: "Engineering",
  },
  {
    title: "Color Theory for Developers",
    date: "2025-01-18",
    category: "Design",
  },
  {
    title: "Performance Meets Aesthetics",
    date: "2025-01-15",
    category: "Tutorial",
  },
  {
    title: "Community Spotlight: March",
    date: "2025-01-12",
    category: "Community",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Decorative corner rings -->
    <div
      class="pointer-events-none absolute -top-16 -right-16 size-[18rem] rounded-full border border-(--ui-primary)/8"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-20 -left-20 size-[14rem] rounded-full border border-(--ui-secondary)/8"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Masthead-style header -->
      <div class="text-center mb-12 blog-mag-stagger">
        <div class="inline-block mb-4">
          <div
            class="h-px w-full bg-gradient-to-r from-transparent via-(--ui-border) to-transparent mb-4"
            aria-hidden="true"
          />
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) tracking-tight"
          >
            The Theme Builder Journal
          </h2>
          <div
            class="h-px w-full bg-gradient-to-r from-transparent via-(--ui-border) to-transparent mt-4"
            aria-hidden="true"
          />
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main featured article -->
        <div class="lg:col-span-2 blog-mag-stagger [animation-delay:100ms]">
          <div
            class="rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/80 backdrop-blur-sm overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-(--ui-primary)/5"
          >
            <UBlogPost v-bind="hero" />
          </div>
        </div>

        <!-- Trending sidebar -->
        <aside class="blog-mag-stagger [animation-delay:200ms]">
          <div
            class="rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg-elevated)/50 backdrop-blur-sm p-6 h-full"
          >
            <div class="flex items-center gap-2 mb-5">
              <UIcon
                name="i-lucide-trending-up"
                class="size-4 text-(--ui-primary)"
                aria-hidden="true"
              />
              <h3
                class="text-sm font-semibold text-(--ui-primary) uppercase tracking-wider"
              >
                Trending
              </h3>
            </div>

            <UPageList>
              <div
                v-for="(post, i) in sidebar"
                :key="post.title"
                role="listitem"
                class="blog-mag-stagger group py-4"
                :style="{ animationDelay: `${300 + i * 80}ms` }"
              >
                <div class="flex gap-4 items-start">
                  <span
                    class="text-2xl font-bold bg-gradient-to-b from-[var(--ui-primary)] to-[var(--ui-primary)]/30 bg-clip-text text-transparent select-none shrink-0 leading-none"
                  >
                    {{ String(i + 1).padStart(2, "0") }}
                  </span>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <UBadge
                        :label="post.category"
                        variant="subtle"
                        color="neutral"
                        size="xs"
                      />
                      <span class="text-xs text-(--ui-text-muted)">{{
                        post.date
                      }}</span>
                    </div>
                    <h4
                      class="font-semibold text-(--ui-text-highlighted) text-sm leading-snug transition-colors duration-200 group-hover:text-(--ui-primary)"
                    >
                      {{ post.title }}
                    </h4>
                  </div>
                </div>
              </div>
            </UPageList>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-mag-stagger {
  animation: blogMagFadeIn 0.6s ease-out both;
}

@keyframes blogMagFadeIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-mag-stagger {
    animation: none;
  }
}
</style>
