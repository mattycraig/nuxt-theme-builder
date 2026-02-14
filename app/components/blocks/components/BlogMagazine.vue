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
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          The Theme Builder Journal
        </h2>
      </div>
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <UBlogPost v-bind="hero" />
        </div>
        <aside>
          <h3
            class="text-sm font-semibold text-(--ui-text-muted) uppercase tracking-wider mb-4"
          >
            Trending
          </h3>
          <UPageList divide>
            <div v-for="(post, i) in sidebar" :key="post.title" class="py-4">
              <div class="flex gap-3">
                <span
                  class="text-2xl font-bold text-(--ui-primary) opacity-50"
                  >{{ String(i + 1).padStart(2, "0") }}</span
                >
                <div>
                  <p class="text-xs text-(--ui-text-muted) mb-1">
                    {{ post.category }} · {{ post.date }}
                  </p>
                  <h4
                    class="font-semibold text-(--ui-text-highlighted) text-sm leading-snug"
                  >
                    {{ post.title }}
                  </h4>
                </div>
              </div>
            </div>
          </UPageList>
        </aside>
      </div>
    </div>
  </section>
</template>
