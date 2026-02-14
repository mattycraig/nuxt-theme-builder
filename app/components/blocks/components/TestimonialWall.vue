<script setup lang="ts">
const testimonials = [
  {
    quote: "The best theming tool for Vue and Nuxt — nothing else comes close.",
    name: "Ana Torres",
    role: "Senior Developer",
    initials: "AT",
  },
  {
    quote: "Saved us weeks of manual design work. The ROI was immediate.",
    name: "Ben Harper",
    role: "CTO",
    initials: "BH",
  },
  {
    quote: "Dark mode support is flawless. Our users noticed the difference.",
    name: "Chloe Liu",
    role: "UI Engineer",
    initials: "CL",
  },
  {
    quote: "Export to CSS variables plugged straight into our design system.",
    name: "Daniel Kim",
    role: "Frontend Lead",
    initials: "DK",
  },
  {
    quote: "Our design consistency has never been better across products.",
    name: "Eva Müller",
    role: "Product Designer",
    initials: "EM",
  },
  {
    quote: "Real-time preview across components feels like actual magic.",
    name: "Faisal Ahmed",
    role: "Fullstack Dev",
    initials: "FA",
  },
  {
    quote:
      "The AI prompts generated a better palette than we could've hand-picked.",
    name: "Grace Obi",
    role: "Creative Director",
    initials: "GO",
  },
  {
    quote: "We onboarded 3 new devs in an hour — they were shipping by lunch.",
    name: "Hiro Yamamoto",
    role: "Tech Lead",
    initials: "HY",
  },
  {
    quote: "Undo/redo makes bold experimentation completely risk-free.",
    name: "Isla Campbell",
    role: "Junior Dev",
    initials: "IC",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Central glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-(--ui-primary)/6 blur-[140px]"
      aria-hidden="true"
    />
    <!-- Dot grid texture -->
    <div
      class="absolute inset-0 wall-dot-grid opacity-[0.03]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14 space-y-3">
        <UBadge variant="subtle" size="sm" class="mb-2">
          <UIcon name="i-lucide-heart" class="size-3.5 mr-1" />
          Community
        </UBadge>
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Wall of love
        </h2>
        <p
          class="text-lg text-(--ui-text-muted) max-w-xl mx-auto leading-relaxed"
        >
          Real feedback from developers and designers who build with our tools
          every day.
        </p>
        <!-- Decorative gradient line -->
        <div class="flex justify-center pt-4">
          <div
            class="h-px w-32 bg-gradient-to-r from-transparent via-(--ui-primary)/40 to-transparent"
          />
        </div>
      </div>

      <UPageColumns>
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          class="wall-card group relative rounded-2xl border border-(--ui-border)/40 bg-(--ui-bg)/50 backdrop-blur-xl p-6 space-y-4 transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-lg"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <!-- Hover glow -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl bg-(--ui-primary)/0 group-hover:bg-(--ui-primary)/[0.03] transition-colors duration-300"
            aria-hidden="true"
          />

          <div class="relative">
            <UIcon
              name="i-lucide-quote"
              class="size-5 text-(--ui-primary)/40 mb-2"
              aria-hidden="true"
            />
            <blockquote>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                {{ t.quote }}
              </p>
            </blockquote>
          </div>

          <USeparator />

          <div class="relative flex items-center gap-3">
            <UAvatar :text="t.initials" size="sm" color="primary" />
            <div>
              <p class="text-sm font-semibold text-(--ui-text-highlighted)">
                {{ t.name }}
              </p>
              <p class="text-xs text-(--ui-text-muted)">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </UPageColumns>
    </div>
  </section>
</template>

<style scoped>
.wall-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

.wall-card {
  animation: wallFadeUp 0.5s ease-out both;
}

@keyframes wallFadeUp {
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
  .wall-card {
    animation: none;
  }
}
</style>
