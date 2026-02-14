<script setup lang="ts">
const posts = [
  {
    title: "Quick Tip: Custom Font Loading",
    description: "Optimize web font delivery for faster page loads.",
    date: "2025-01-22",
    authors: [{ name: "Elena Voss", avatar: { text: "EV" } }],
  },
  {
    title: "Theme Tokens Explained",
    description: "Understanding semantic vs literal design tokens.",
    date: "2025-01-19",
    authors: [{ name: "Raj Patel", avatar: { text: "RP" } }],
  },
  {
    title: "Dark Mode Done Right",
    description: "Best practices for designing dual-mode interfaces.",
    date: "2025-01-16",
    authors: [{ name: "Lena Müller", avatar: { text: "LM" } }],
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-(--ui-text-highlighted) mb-8">
        Recent Posts
      </h2>
      <UPageList divide>
        <div v-for="post in posts" :key="post.title" class="py-6">
          <div
            class="flex items-center gap-2 text-sm text-(--ui-text-muted) mb-1"
          >
            <time>{{ post.date }}</time>
            <span>·</span>
            <span>{{ post.authors?.[0]?.name }}</span>
          </div>
          <h3 class="text-lg font-semibold text-(--ui-text-highlighted) mb-1">
            {{ post.title }}
          </h3>
          <p class="text-(--ui-text-muted)">{{ post.description }}</p>
        </div>
      </UPageList>
    </div>
  </section>
</template>
