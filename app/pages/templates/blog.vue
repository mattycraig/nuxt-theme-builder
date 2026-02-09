<script setup lang="ts">
const activeCategory = ref("all");

const categoryTabs = [
  { label: "All", value: "all", icon: "i-lucide-layout-grid" },
  { label: "Engineering", value: "engineering", icon: "i-lucide-code" },
  { label: "Design", value: "design", icon: "i-lucide-palette" },
  { label: "Product", value: "product", icon: "i-lucide-package" },
  { label: "Tutorials", value: "tutorials", icon: "i-lucide-graduation-cap" },
];

const categoryMenuItems = categoryTabs.map((c) => ({
  label: c.label,
  value: c.value,
  icon: c.icon,
}));

const posts = [
  {
    title: "Introducing Nuxt UI v4: A Complete Redesign",
    description:
      "We're excited to announce Nuxt UI v4, featuring a complete redesign with Tailwind CSS v4, new components, and improved developer experience.",
    date: "2026-02-04",
    category: "product",
    badge: {
      label: "Product",
      color: "primary" as const,
      variant: "subtle" as const,
    },
    image: {
      src: "https://picsum.photos/seed/nuxtui4/800/400",
      width: 800,
      height: 400,
      alt: "Nuxt UI v4 redesign",
    },
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
    date: "2026-02-01",
    category: "tutorials",
    badge: {
      label: "Tutorial",
      color: "secondary" as const,
      variant: "subtle" as const,
    },
    image: {
      src: "https://picsum.photos/seed/designsys/800/400",
      width: 800,
      height: 400,
      alt: "Building a design system",
    },
    authors: [{ name: "Marcus Rivera", avatar: { text: "MR" } }],
    featured: false,
  },
  {
    title: "The Art of Color Palette Selection",
    description:
      "A deep dive into color theory and how to apply it when choosing palettes for web applications and design systems.",
    date: "2026-01-28",
    category: "design",
    badge: {
      label: "Design",
      color: "info" as const,
      variant: "subtle" as const,
    },
    image: {
      src: "https://picsum.photos/seed/colorart/800/400",
      width: 800,
      height: 400,
      alt: "Color palette selection",
    },
    authors: [{ name: "Luna Park", avatar: { text: "LP" } }],
    featured: false,
  },
  {
    title: "Migrating from Nuxt UI v3 to v4",
    description:
      "A comprehensive guide to migrating your existing Nuxt UI v3 application to the new v4 with minimal breaking changes.",
    date: "2026-01-25",
    category: "engineering",
    badge: {
      label: "Engineering",
      color: "success" as const,
      variant: "subtle" as const,
    },
    image: {
      src: "https://picsum.photos/seed/migrate/800/400",
      width: 800,
      height: 400,
      alt: "Migration guide",
    },
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
    date: "2026-01-20",
    category: "engineering",
    badge: {
      label: "Engineering",
      color: "success" as const,
      variant: "subtle" as const,
    },
    image: {
      src: "https://picsum.photos/seed/a11y/800/400",
      width: 800,
      height: 400,
      alt: "Accessibility best practices",
    },
    authors: [{ name: "Jamie Fox", avatar: { text: "JF" } }],
    featured: false,
  },
  {
    title: "Custom Animations with Nuxt UI Components",
    description:
      "Add beautiful, performant animations to your Nuxt UI components using Vue's transition system and CSS animations.",
    date: "2026-01-15",
    category: "tutorials",
    badge: {
      label: "Tutorial",
      color: "secondary" as const,
      variant: "subtle" as const,
    },
    image: {
      src: "https://picsum.photos/seed/animate/800/400",
      width: 800,
      height: 400,
      alt: "Custom animations",
    },
    authors: [{ name: "Aria Santos", avatar: { text: "AS" } }],
    featured: false,
  },
  {
    title: "Designing Dark Mode That Users Love",
    description:
      "Tips and tricks for creating a dark mode theme that's easy on the eyes while maintaining brand consistency.",
    date: "2026-01-10",
    category: "design",
    badge: {
      label: "Design",
      color: "info" as const,
      variant: "subtle" as const,
    },
    image: {
      src: "https://picsum.photos/seed/darkmode/800/400",
      width: 800,
      height: 400,
      alt: "Dark mode design",
    },
    authors: [{ name: "Luna Park", avatar: { text: "LP" } }],
    featured: false,
  },
  {
    title: "Performance Optimization in Nuxt 4",
    description:
      "Key strategies for optimizing your Nuxt 4 application's performance, from lazy loading to code splitting.",
    date: "2026-01-05",
    category: "engineering",
    badge: {
      label: "Engineering",
      color: "success" as const,
      variant: "subtle" as const,
    },
    image: {
      src: "https://picsum.photos/seed/perfopt/800/400",
      width: 800,
      height: 400,
      alt: "Performance optimization",
    },
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
const totalPages = computed(() =>
  Math.ceil(gridPosts.value.length / postsPerPage),
);
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return gridPosts.value.slice(start, start + postsPerPage);
});

function onCategoryChange(value: string | number) {
  activeCategory.value = String(value);
  currentPage.value = 1;
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Header -->
    <UPageHero
      title="Blog"
      description="News, tutorials, and insights from the team."
      headline="Latest Updates"
      :links="[
        {
          label: 'Subscribe to RSS',
          icon: 'i-lucide-rss',
          variant: 'outline' as const,
          color: 'neutral' as const,
        },
        {
          label: 'Follow us',
          icon: 'i-lucide-twitter',
          variant: 'ghost' as const,
          color: 'neutral' as const,
        },
      ]"
    />

    <UContainer class="py-8 sm:py-12 space-y-8 sm:space-y-12">
      <!-- Category Filter: SelectMenu on mobile, Tabs on desktop -->
      <div class="md:hidden">
        <USelectMenu
          :model-value="activeCategory"
          :items="categoryMenuItems"
          value-key="value"
          icon="i-lucide-filter"
          placeholder="Filter by category"
          :search-input="false"
          class="w-full"
          @update:model-value="onCategoryChange"
        />
      </div>
      <div class="hidden md:block">
        <UTabs
          :model-value="activeCategory"
          :items="categoryTabs"
          variant="pill"
          size="lg"
          :content="false"
          value-key="value"
          class="w-full"
          @update:model-value="onCategoryChange"
        />
      </div>

      <!-- Featured Post (only on "all" view) -->
      <UBlogPost
        v-if="activeCategory === 'all' && featuredPost"
        :title="featuredPost.title"
        :description="featuredPost.description"
        :date="featuredPost.date"
        :badge="featuredPost.badge"
        :image="featuredPost.image"
        :authors="featuredPost.authors"
        orientation="horizontal"
        variant="outline"
        :ui="{
          title: 'text-xl sm:text-2xl',
          description: 'line-clamp-3',
        }"
      />

      <USeparator
        v-if="activeCategory === 'all' && featuredPost"
        label="Latest Posts"
        color="neutral"
      />

      <!-- Posts Grid using UBlogPosts + UBlogPost -->
      <UBlogPosts v-if="paginatedPosts.length > 0">
        <UBlogPost
          v-for="post in paginatedPosts"
          :key="post.title"
          :title="post.title"
          :description="post.description"
          :date="post.date"
          :badge="post.badge"
          :image="post.image"
          :authors="post.authors"
          variant="outline"
        />
      </UBlogPosts>

      <!-- Empty state -->
      <UEmpty
        v-if="paginatedPosts.length === 0"
        icon="i-lucide-file-x"
        title="No posts found"
        description="There are no posts in this category yet."
        :actions="[
          {
            label: 'View all posts',
            icon: 'i-lucide-arrow-left',
            variant: 'subtle' as const,
            color: 'neutral' as const,
          },
        ]"
        @click="activeCategory = 'all'"
      />

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center pt-4">
        <UPagination
          v-model:page="currentPage"
          :total="gridPosts.length"
          :items-per-page="postsPerPage"
          :show-edges="true"
        />
      </div>
    </UContainer>
  </div>
</template>
