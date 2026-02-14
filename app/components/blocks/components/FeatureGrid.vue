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
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 sm:mb-16">
        <p class="text-sm font-semibold text-(--ui-primary) mb-2">
          Why Choose Us
        </p>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Built for modern teams
        </h2>
        <p class="text-lg text-(--ui-text-muted) max-w-2xl mx-auto">
          Powerful features designed for speed, scale, and security.
        </p>
      </div>
      <UPageGrid>
        <UPageFeature
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </UPageGrid>
    </div>
  </section>
</template>
