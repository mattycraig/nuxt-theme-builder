<script setup lang="ts">
const testimonials = [
  {
    quote:
      "The theme builder saved us hours of design work. We had a beautiful, consistent design system in minutes.",
    name: "Sarah Chen",
    role: "Lead Designer at TechCorp",
    initials: "SC",
  },
  {
    quote:
      "Incredible tool for prototyping. Being able to see changes live across all components is a game changer.",
    name: "Marcus Rivera",
    role: "Frontend Engineer at StartupXYZ",
    initials: "MR",
  },
  {
    quote:
      "We use the theme builder for every new project. The export feature makes integration effortless.",
    name: "Alex Kim",
    role: "CTO at DesignLab",
    initials: "AK",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold text-(--ui-primary) mb-2">
          Testimonials
        </p>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Loved by developers
        </h2>
      </div>
      <UPageGrid>
        <UPageCard v-for="t in testimonials" :key="t.name">
          <div class="space-y-4 p-2">
            <UIcon
              name="i-lucide-quote"
              class="size-8 text-(--ui-primary) opacity-40"
              aria-hidden="true"
            />
            <p class="text-(--ui-text-muted) leading-relaxed">
              "{{ t.quote }}"
            </p>
            <div class="flex items-center gap-3 pt-2">
              <UAvatar :text="t.initials" size="md" color="primary" />
              <div>
                <p class="font-semibold text-(--ui-text-highlighted)">
                  {{ t.name }}
                </p>
                <p class="text-sm text-(--ui-text-muted)">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
