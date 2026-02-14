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
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold text-(--ui-primary) mb-2">Blog</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Latest articles
        </h2>
      </div>
      <UBlogPosts>
        <UBlogPost v-for="post in posts" :key="post.title" v-bind="post" />
      </UBlogPosts>
    </div>
  </section>
</template>
