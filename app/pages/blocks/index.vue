<script setup lang="ts">
const blocks = [
  {
    title: "Hero Section",
    description:
      "A bold hero banner with headline, subtitle, and call-to-action buttons.",
    icon: "i-lucide-megaphone",
    to: "/blocks/hero",
  },
  {
    title: "Features Grid",
    description:
      "A responsive grid showcasing product features with icons and descriptions.",
    icon: "i-lucide-grid-3x3",
    to: "/blocks/features",
  },
  {
    title: "CTA Section",
    description:
      "Call-to-action banners designed to drive user engagement and conversions.",
    icon: "i-lucide-mouse-pointer-click",
    to: "/blocks/cta",
  },
  {
    title: "Testimonials",
    description:
      "Customer testimonial cards with avatars, quotes, and ratings.",
    icon: "i-lucide-quote",
    to: "/blocks/testimonials",
  },
  {
    title: "Stats Section",
    description:
      "Key metrics and statistics displayed in an eye-catching layout.",
    icon: "i-lucide-bar-chart-3",
    to: "/blocks/stats",
  },
  {
    title: "FAQ Section",
    description: "Frequently asked questions in an accordion layout.",
    icon: "i-lucide-circle-help",
    to: "/blocks/faq",
  },
];
</script>

<template>
  <div class="p-6 space-y-8 max-w-5xl mx-auto">
    <UPageHeader
      headline="Theme Builder"
      title="Blocks"
      description="Pre-built layout blocks you can compose into full pages. Each block showcases your current theme settings."
      :links="[
        {
          label: 'Back to Home',
          icon: 'i-lucide-arrow-left',
          to: '/',
          variant: 'ghost',
          color: 'neutral',
        },
      ]"
    />

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="block in blocks"
        :key="block.title"
        :to="block.to"
        class="block"
      >
        <UCard
          class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all cursor-pointer"
        >
          <div class="flex items-start gap-3">
            <div
              class="shrink-0 size-10 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center"
            >
              <UIcon :name="block.icon" class="size-5 text-(--ui-primary)" />
            </div>
            <div>
              <h2 class="font-semibold text-(--ui-text-highlighted) mb-1">
                {{ block.title }}
              </h2>
              <p class="text-sm text-(--ui-text-muted)">
                {{ block.description }}
              </p>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
