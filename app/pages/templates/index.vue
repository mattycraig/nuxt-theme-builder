<script setup lang="ts">
const templates = [
  {
    title: "Dashboard",
    description:
      "Admin dashboard with stats, charts, tables, and sidebar navigation.",
    icon: "i-lucide-layout-dashboard",
    to: "/templates/dashboard",
  },
  {
    title: "Landing Page",
    description:
      "Marketing landing page with hero, features, testimonials, and CTA sections.",
    icon: "i-lucide-rocket",
    to: "/templates/landing",
  },
  {
    title: "Pricing",
    description:
      "Pricing page with plan comparison, toggle billing, and feature lists.",
    icon: "i-lucide-credit-card",
    to: "/templates/pricing",
  },
  {
    title: "Login",
    description: "Authentication page with login and registration forms.",
    icon: "i-lucide-log-in",
    to: "/templates/login",
  },
  {
    title: "Blog",
    description:
      "Blog listing with featured posts, categories, and newsletter signup.",
    icon: "i-lucide-newspaper",
    to: "/templates/blog",
  },
  {
    title: "Changelog",
    description:
      "Product changelog with version history, release notes, and contributors.",
    icon: "i-lucide-history",
    to: "/templates/changelog",
  },
  {
    title: "Chat",
    description:
      "AI chat interface with conversation history and message bubbles.",
    icon: "i-lucide-message-circle",
    to: "/templates/chat",
  },
  {
    title: "Editor",
    description:
      "Rich text editor with toolbar, mentions, and markdown support.",
    icon: "i-lucide-file-edit",
    to: "/templates/editor",
  },
  {
    title: "Error Page",
    description:
      "Error state pages for 404, 500, 403, and other HTTP status codes.",
    icon: "i-lucide-alert-triangle",
    to: "/templates/error-page",
  },
];
</script>

<template>
  <div class="p-6 space-y-8 max-w-5xl mx-auto">
    <div>
      <h2 class="text-2xl font-bold mb-1">Templates</h2>
      <p class="text-sm text-(--ui-text-muted)">
        Full page templates that demonstrate your theme in real-world contexts.
        Each template is a complete, production-ready page layout.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="template in templates"
        :key="template.title"
        :to="template.to"
        class="block"
      >
        <UCard
          class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all cursor-pointer"
        >
          <div class="flex items-start gap-3">
            <div
              class="shrink-0 size-10 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center"
            >
              <UIcon :name="template.icon" class="size-5 text-(--ui-primary)" />
            </div>
            <div>
              <h3 class="font-semibold text-(--ui-text-highlighted) mb-1">
                {{ template.title }}
              </h3>
              <p class="text-sm text-(--ui-text-muted)">
                {{ template.description }}
              </p>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
