<script setup lang="ts">
const activeCategory = ref("all");

const categories = [
  { label: "All", value: "all" },
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Product", value: "product" },
  { label: "Tutorials", value: "tutorials" },
];

const posts = [
  {
    title: "Introducing Nuxt UI v4: A Complete Redesign",
    description:
      "We're excited to announce Nuxt UI v4, featuring a complete redesign with Tailwind CSS v4, new components, and improved developer experience.",
    date: "February 4, 2026",
    category: "product",
    badge: "Product",
    badgeColor: "primary",
    image: null,
    authors: [
      { name: "Sarah Chen", avatar: { text: "SC" } },
      { name: "Alex Kim", avatar: { text: "AK" } },
    ],
    featured: true,
  },
  {
    title: "Building a Design System with Theme Builder",
    description:
      "Learn how to create a consistent design system for your team using the Theme Builder's export features.",
    date: "February 1, 2026",
    category: "tutorials",
    badge: "Tutorial",
    badgeColor: "secondary",
    image: null,
    authors: [{ name: "Marcus Rivera", avatar: { text: "MR" } }],
    featured: false,
  },
  {
    title: "The Art of Color Palette Selection",
    description:
      "A deep dive into color theory and how to apply it when choosing palettes for web applications and design systems.",
    date: "January 28, 2026",
    category: "design",
    badge: "Design",
    badgeColor: "info",
    image: null,
    authors: [{ name: "Luna Park", avatar: { text: "LP" } }],
    featured: false,
  },
  {
    title: "Migrating from Nuxt UI v3 to v4",
    description:
      "A comprehensive guide to migrating your existing Nuxt UI v3 application to the new v4 with minimal breaking changes.",
    date: "January 25, 2026",
    category: "engineering",
    badge: "Engineering",
    badgeColor: "success",
    image: null,
    authors: [
      { name: "Dev Patel", avatar: { text: "DP" } },
      { name: "Sarah Chen", avatar: { text: "SC" } },
    ],
    featured: false,
  },
  {
    title: "Accessibility Best Practices for Nuxt UI",
    description:
      "How to ensure your Nuxt UI application is accessible to all users, including keyboard navigation and screen readers.",
    date: "January 20, 2026",
    category: "engineering",
    badge: "Engineering",
    badgeColor: "success",
    image: null,
    authors: [{ name: "Jamie Fox", avatar: { text: "JF" } }],
    featured: false,
  },
  {
    title: "Custom Animations with Nuxt UI Components",
    description:
      "Add beautiful, performant animations to your Nuxt UI components using Vue's transition system and CSS animations.",
    date: "January 15, 2026",
    category: "tutorials",
    badge: "Tutorial",
    badgeColor: "secondary",
    image: null,
    authors: [{ name: "Aria Santos", avatar: { text: "AS" } }],
    featured: false,
  },
  {
    title: "Designing Dark Mode That Users Love",
    description:
      "Tips and tricks for creating a dark mode theme that's easy on the eyes while maintaining brand consistency.",
    date: "January 10, 2026",
    category: "design",
    badge: "Design",
    badgeColor: "info",
    image: null,
    authors: [{ name: "Luna Park", avatar: { text: "LP" } }],
    featured: false,
  },
  {
    title: "Performance Optimization in Nuxt 4",
    description:
      "Key strategies for optimizing your Nuxt 4 application's performance, from lazy loading to code splitting.",
    date: "January 5, 2026",
    category: "engineering",
    badge: "Engineering",
    badgeColor: "success",
    image: null,
    authors: [{ name: "Dev Patel", avatar: { text: "DP" } }],
    featured: false,
  },
];

const filteredPosts = computed(() => {
  if (activeCategory.value === "all") return posts;
  return posts.filter((p) => p.category === activeCategory.value);
});

const featuredPost = computed(() => posts.find((p) => p.featured));
const gridPosts = computed(() =>
  filteredPosts.value.filter((p) => !p.featured),
);

const currentPage = ref(1);
const postsPerPage = 6;
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return gridPosts.value.slice(start, start + postsPerPage);
});
</script>

<template>
  <div class="p-6 sm:p-8 space-y-8 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="space-y-4">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)"
          >
            Blog
          </h1>
          <p class="text-lg text-(--ui-text-muted) mt-1">
            News, tutorials, and insights from the team.
          </p>
        </div>
        <UButton
          label="Subscribe"
          icon="i-lucide-rss"
          variant="outline"
          color="neutral"
        />
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="cat in categories"
          :key="cat.value"
          :label="cat.label"
          size="sm"
          :variant="activeCategory === cat.value ? 'soft' : 'ghost'"
          :color="activeCategory === cat.value ? 'primary' : 'neutral'"
          @click="
            activeCategory = cat.value;
            currentPage = 1;
          "
        />
      </div>
    </div>

    <!-- Featured Post (only on "all" view) -->
    <UCard
      v-if="activeCategory === 'all' && featuredPost"
      class="overflow-hidden"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Image placeholder -->
        <div
          class="aspect-video lg:aspect-auto rounded-lg bg-gradient-to-br from-[var(--ui-primary)]/20 to-[var(--ui-secondary)]/20 flex items-center justify-center"
        >
          <UIcon
            name="i-lucide-image"
            class="size-12 text-(--ui-text-dimmed)"
          />
        </div>

        <!-- Content -->
        <div class="flex flex-col justify-center space-y-4">
          <div class="flex items-center gap-2">
            <UBadge
              :label="featuredPost.badge"
              :color="featuredPost.badgeColor as any"
              variant="subtle"
              size="xs"
            />
            <UBadge label="Featured" color="primary" variant="soft" size="xs" />
          </div>
          <h2
            class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) leading-tight"
          >
            {{ featuredPost.title }}
          </h2>
          <p class="text-(--ui-text-muted) leading-relaxed">
            {{ featuredPost.description }}
          </p>
          <div class="flex items-center gap-4 pt-2">
            <div class="flex items-center gap-2">
              <UAvatarGroup :max="3" size="xs">
                <UAvatar
                  v-for="author in featuredPost.authors"
                  :key="author.name"
                  :text="author.avatar.text"
                  color="primary"
                />
              </UAvatarGroup>
              <span class="text-sm text-(--ui-text-muted)">
                {{ featuredPost.authors.map((a) => a.name).join(", ") }}
              </span>
            </div>
            <span class="text-sm text-(--ui-text-dimmed)">{{
              featuredPost.date
            }}</span>
          </div>
          <UButton
            label="Read Article"
            icon="i-lucide-arrow-right"
            trailing
            variant="outline"
            color="primary"
            class="self-start"
          />
        </div>
      </div>
    </UCard>

    <USeparator v-if="activeCategory === 'all' && featuredPost" />

    <!-- Posts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="post in paginatedPosts"
        :key="post.title"
        class="flex flex-col"
      >
        <!-- Image placeholder -->
        <div
          class="aspect-video rounded-lg bg-gradient-to-br from-[var(--ui-primary)]/10 to-[var(--ui-secondary)]/10 flex items-center justify-center mb-4"
        >
          <UIcon name="i-lucide-image" class="size-8 text-(--ui-text-dimmed)" />
        </div>

        <div class="flex flex-col flex-1 space-y-3">
          <!-- Category Badge -->
          <div class="flex items-center gap-2">
            <UBadge
              :label="post.badge"
              :color="post.badgeColor as any"
              variant="subtle"
              size="xs"
            />
            <span class="text-xs text-(--ui-text-dimmed)">{{ post.date }}</span>
          </div>

          <!-- Title -->
          <h3
            class="text-lg font-semibold text-(--ui-text-highlighted) leading-snug line-clamp-2"
          >
            {{ post.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-(--ui-text-muted) line-clamp-3 flex-1">
            {{ post.description }}
          </p>

          <!-- Authors -->
          <div class="flex items-center gap-2 pt-2">
            <UAvatarGroup :max="2" size="xs">
              <UAvatar
                v-for="author in post.authors"
                :key="author.name"
                :text="author.avatar.text"
                color="primary"
              />
            </UAvatarGroup>
            <span class="text-xs text-(--ui-text-muted)">
              {{ post.authors.map((a) => a.name).join(", ") }}
            </span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty state -->
    <div v-if="paginatedPosts.length === 0" class="text-center py-12">
      <UIcon
        name="i-lucide-file-x"
        class="size-12 text-(--ui-text-dimmed) mx-auto mb-4"
      />
      <h3 class="text-lg font-semibold text-(--ui-text-highlighted) mb-1">
        No posts found
      </h3>
      <p class="text-sm text-(--ui-text-muted)">
        There are no posts in this category yet.
      </p>
    </div>

    <!-- Pagination -->
    <div
      v-if="gridPosts.length > postsPerPage"
      class="flex justify-center pt-4"
    >
      <UPagination
        v-model:page="currentPage"
        :total="gridPosts.length"
        :items-per-page="postsPerPage"
        :show-edges="true"
      />
    </div>
  </div>
</template>
