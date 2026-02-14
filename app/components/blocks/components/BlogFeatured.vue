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
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          From the blog
        </h2>
      </div>
      <UBlogPost v-bind="featured" orientation="horizontal" />
      <UBlogPosts orientation="horizontal">
        <UBlogPost v-for="post in recent" :key="post.title" v-bind="post" />
      </UBlogPosts>
    </div>
  </section>
</template>
