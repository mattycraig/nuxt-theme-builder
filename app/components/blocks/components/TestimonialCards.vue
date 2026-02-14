<script setup lang="ts">
const testimonials = [
  {
    quote:
      "The theme builder saved us hours of design work. We had a beautiful, consistent design system in minutes.",
    name: "Sarah Chen",
    role: "Lead Designer at TechCorp",
    initials: "SC",
    rating: 5,
  },
  {
    quote:
      "Incredible tool for prototyping. Being able to see changes live across all components is a game changer.",
    name: "Marcus Rivera",
    role: "Frontend Engineer at StartupXYZ",
    initials: "MR",
    rating: 5,
  },
  {
    quote:
      "We use the theme builder for every new project. The export feature makes integration effortless.",
    name: "Alex Kim",
    role: "CTO at DesignLab",
    initials: "AK",
    rating: 5,
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Decorative gradient orbs -->
    <div
      class="pointer-events-none absolute -top-32 left-1/4 size-[30rem] rounded-full bg-(--ui-primary)/10 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 right-1/4 size-[22rem] rounded-full bg-(--ui-secondary)/8 blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <UBadge
          label="Testimonials"
          color="primary"
          variant="subtle"
          size="lg"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-3"
        >
          Loved by developers
        </h2>
        <p class="text-lg text-(--ui-text-muted) max-w-xl mx-auto">
          See why teams choose this builder for their design systems.
        </p>
      </div>

      <UPageGrid>
        <UPageCard
          v-for="(t, i) in testimonials"
          :key="t.name"
          class="testimonial-card group"
          :style="{ animationDelay: `${i * 120}ms` }"
        >
          <div class="relative space-y-5 p-3">
            <!-- Oversized decorative quote mark -->
            <span
              class="absolute -top-1 -left-1 text-6xl font-serif leading-none text-(--ui-primary) opacity-15 select-none"
              aria-hidden="true"
              >&ldquo;</span
            >

            <!-- Star rating -->
            <div
              class="flex gap-0.5 pt-4"
              role="img"
              :aria-label="`${t.rating} out of 5 stars`"
            >
              <UIcon
                v-for="star in t.rating"
                :key="star"
                name="i-lucide-star"
                class="size-4 text-amber-400"
                aria-hidden="true"
              />
            </div>

            <blockquote class="text-(--ui-text-muted) leading-relaxed">
              {{ t.quote }}
            </blockquote>

            <USeparator />

            <div class="flex items-center gap-3">
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

<style scoped>
.testimonial-card {
  animation: testimonialFadeUp 0.6s ease-out both;
}

@keyframes testimonialFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-card {
    animation: none;
  }
}
</style>
