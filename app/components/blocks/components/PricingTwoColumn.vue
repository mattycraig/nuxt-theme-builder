<script setup lang="ts">
const plans = [
  {
    title: "Free",
    description: "For personal projects and experimentation.",
    price: "$0",
    features: [
      "Up to 3 projects",
      "Core components",
      "Community support",
      "Basic export",
    ],
    button: {
      label: "Get Started",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
  {
    title: "Pro",
    description: "For professionals who need the full toolkit.",
    price: "$29",
    tagline: "per month",
    badge: "Recommended",
    features: [
      "Unlimited projects",
      "All components & blocks",
      "Priority email support",
      "Advanced export options",
      "Team collaboration",
    ],
    button: {
      label: "Upgrade to Pro",
      color: "primary" as const,
    },
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Simple, transparent pricing
        </h2>
        <p class="text-lg text-(--ui-text-muted)">
          Choose the plan that works for you.
        </p>
      </div>
      <UPricingPlans :plans="plans" compact />
    </div>
  </section>
</template>
