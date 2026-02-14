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
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Stories and insights
        </h2>
        <p class="mt-2 text-lg text-(--ui-text-muted)">
          Tips, guides, and behind-the-scenes from our team.
        </p>
      </div>
      <UPageGrid>
        <UPageCard
          v-for="post in posts"
          :key="post.title"
          :title="post.title"
          :description="post.description"
        >
          <template #header>
            <img
              :src="post.image.src"
              :alt="post.image.alt"
              class="w-full h-48 object-cover"
              loading="lazy"
            >
          </template>
          <template #footer>
            <div
              class="flex items-center justify-between text-sm text-(--ui-text-muted)"
            >
              <span>{{ post.authors?.[0]?.name }}</span>
              <time>{{ post.date }}</time>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
