<script setup lang="ts">
const testimonials = [
  {
    quote:
      "The theme builder saved us weeks of design work. We configured our brand colors and exported a production-ready config in under an hour.",
    name: "Sarah Chen",
    role: "Lead Designer at TechCorp",
    avatar: "SC",
  },
  {
    quote:
      "Being able to see every component update live as I tweak the tokens is a game-changer. My designers and I finally speak the same language.",
    name: "Marcus Rodriguez",
    role: "Frontend Engineer at StartupIO",
    avatar: "MR",
  },
  {
    quote:
      "We use the exported themes across three products. The consistency it brings to our design system is incredible.",
    name: "Emily Nakamura",
    role: "VP of Product at DesignLab",
    avatar: "EN",
  },
  {
    quote:
      "I love how the presets give me a starting point, then I can fine-tune every shade. The undo/redo makes experimenting risk-free.",
    name: "David Park",
    role: "Indie Developer",
    avatar: "DP",
  },
];
</script>

<template>
  <div class="p-6 space-y-12 max-w-5xl mx-auto">
    <div>
      <UButton
        label="Back to Blocks"
        to="/blocks"
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        size="sm"
        class="mb-4"
      />
      <h2 class="text-2xl font-bold mb-1">Testimonials</h2>
      <p class="text-sm text-(--ui-text-muted)">
        Social proof blocks with customer quotes and avatars.
      </p>
    </div>

    <!-- Grid layout -->
    <section
      class="rounded-xl border border-(--ui-border) bg-(--ui-bg) p-6 sm:p-10"
    >
      <div class="text-center mb-10">
        <h3 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
          Loved by developers
        </h3>
        <p class="text-(--ui-text-muted)">
          See what people are saying about the theme builder.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 gap-6">
        <UCard v-for="t in testimonials" :key="t.name">
          <div class="space-y-4">
            <p class="text-(--ui-text-muted) italic leading-relaxed">
              "{{ t.quote }}"
            </p>
            <div class="flex items-center gap-3">
              <UAvatar :text="t.avatar" size="sm" />
              <div>
                <p class="text-sm font-semibold text-(--ui-text-highlighted)">
                  {{ t.name }}
                </p>
                <p class="text-xs text-(--ui-text-muted)">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </section>
  </div>
</template>
