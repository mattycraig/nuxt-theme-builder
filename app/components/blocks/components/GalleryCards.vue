<script setup lang="ts">
const items = [
  {
    title: "Modern Dashboard",
    description:
      "A full-stack analytics platform with real-time data visualization.",
    category: "Web App",
    src: "https://picsum.photos/seed/bp1/800/500",
    alt: "Modern dashboard interface design",
    icon: "i-lucide-layout-dashboard",
    span: "lg:col-span-2",
    orientation: "horizontal" as const,
  },
  {
    title: "E-commerce Redesign",
    description:
      "Complete storefront overhaul with conversion-optimized checkout.",
    category: "Website",
    src: "https://picsum.photos/seed/bp2/600/400",
    alt: "E-commerce redesign showcase",
    icon: "i-lucide-shopping-bag",
  },
  {
    title: "Mobile Banking",
    description: "Secure and intuitive financial management on the go.",
    category: "Mobile",
    src: "https://picsum.photos/seed/bp3/600/400",
    alt: "Mobile banking app interface",
    icon: "i-lucide-smartphone",
  },
  {
    title: "SaaS Landing Page",
    description: "High-converting launch page with A/B tested components.",
    category: "Marketing",
    src: "https://picsum.photos/seed/bp4/800/500",
    alt: "SaaS landing page design",
    icon: "i-lucide-rocket",
    span: "lg:col-span-2",
    orientation: "horizontal" as const,
    reverse: true,
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Warm gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--ui-primary)]/4 via-transparent to-[var(--ui-secondary)]/4"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-14">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
        >
          <span class="text-(--ui-text-highlighted)">Portfolio</span>
        </h2>
        <p
          class="mt-3 text-lg text-(--ui-text-muted) max-w-lg mx-auto leading-relaxed"
        >
          Selected projects showcasing design systems and component
          architecture.
        </p>
      </div>

      <!-- Bento grid -->
      <UPageGrid>
        <UPageCard
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :orientation="item.orientation"
          :reverse="item.reverse"
          :class="item.span"
          spotlight
          spotlight-color="primary"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="w-full h-full min-h-40 object-cover rounded-lg"
            loading="lazy"
            width="600"
            height="400"
          >
          <template #footer>
            <div class="flex items-center justify-between">
              <UBadge
                :label="item.category"
                color="primary"
                variant="subtle"
                size="xs"
              />
              <span class="text-xs text-(--ui-text-muted)">View project</span>
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
