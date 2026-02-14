<script setup lang="ts">
const features = [
  {
    icon: "i-lucide-shield-check",
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, SSO, and role-based access controls.",
  },
  {
    icon: "i-lucide-git-branch",
    title: "Version Control",
    description:
      "Full history with branching and merging. Roll back any change with a single click.",
  },
  {
    icon: "i-lucide-users",
    title: "Team Collaboration",
    description:
      "Real-time multiplayer editing, comments, and approvals built right into the workflow.",
  },
  {
    icon: "i-lucide-gauge",
    title: "Performance Insights",
    description:
      "Built-in analytics dashboard. Track bundle sizes, render times, and Core Web Vitals.",
  },
  {
    icon: "i-lucide-plug",
    title: "Extensible Plugins",
    description:
      "A growing ecosystem of plugins and integrations. Build your own or install from the marketplace.",
  },
  {
    icon: "i-lucide-headset",
    title: "Priority Support",
    description:
      "Dedicated support engineers and a 99.9% uptime SLA. We're here when you need us.",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Atmospheric gradient orbs -->
    <div
      class="pointer-events-none absolute -top-32 -left-20 size-[30rem] rounded-full bg-(--ui-primary)/8 blur-[120px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 -right-16 size-[22rem] rounded-full bg-(--ui-secondary)/6 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 sm:mb-16">
        <UBadge
          label="Why Choose Us"
          color="primary"
          variant="subtle"
          size="sm"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Built for modern teams
        </h2>
        <p class="text-lg text-(--ui-text-muted) max-w-2xl mx-auto">
          Powerful features designed for speed, scale, and security.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="feat-spotlight group relative rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-(--ui-primary)/40 hover:shadow-lg hover:shadow-(--ui-primary)/5"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <!-- Hover glow -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl bg-(--ui-primary)/0 transition-all duration-300 group-hover:bg-(--ui-primary)/3"
            aria-hidden="true"
          />

          <div class="relative">
            <div
              class="size-11 rounded-xl bg-gradient-to-br from-(--ui-primary)/15 to-(--ui-primary)/5 flex items-center justify-center mb-4 ring-1 ring-(--ui-primary)/10 transition-all duration-300 group-hover:ring-(--ui-primary)/30 group-hover:shadow-md group-hover:shadow-(--ui-primary)/10"
            >
              <UIcon
                :name="feature.icon"
                class="size-5 text-(--ui-primary)"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-base font-semibold text-(--ui-text-highlighted) mb-2"
            >
              {{ feature.title }}
            </h3>
            <p class="text-sm text-(--ui-text-muted) leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feat-spotlight {
  animation: featFadeUp 0.6s ease-out both;
}

@keyframes featFadeUp {
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
  .feat-spotlight {
    animation: none;
  }
}
</style>
