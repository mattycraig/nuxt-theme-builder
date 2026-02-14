<script setup lang="ts">
const tiers = [
  {
    id: "free",
    title: "Free",
    description: "For getting started.",
    price: "$0",
    button: {
      label: "Get Started",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
  {
    id: "pro",
    title: "Pro",
    description: "For professionals.",
    price: "$29/mo",
    badge: "Popular",
    highlight: true,
    button: { label: "Start Trial", color: "primary" as const },
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For large teams.",
    price: "$99/mo",
    button: {
      label: "Contact Sales",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
];

const sections = [
  {
    title: "Features",
    features: [
      {
        title: "Projects",
        tiers: { free: "3", pro: "Unlimited", enterprise: "Unlimited" },
      },
      {
        title: "Team members",
        tiers: { free: "1", pro: "10", enterprise: "Unlimited" },
      },
      {
        title: "Export formats",
        tiers: { free: "JSON", pro: "All formats", enterprise: "All formats" },
      },
      {
        title: "Components",
        tiers: { free: "Core only", pro: "All", enterprise: "All + Custom" },
      },
    ],
  },
  {
    title: "Support",
    features: [
      {
        title: "Community support",
        tiers: { free: true, pro: true, enterprise: true },
      },
      {
        title: "Email support",
        tiers: { free: false, pro: true, enterprise: true },
      },
      {
        title: "Priority support",
        tiers: { free: false, pro: false, enterprise: true },
      },
      {
        title: "Dedicated account manager",
        tiers: { free: false, pro: false, enterprise: true },
      },
    ],
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Compare plans
        </h2>
        <p class="text-lg text-(--ui-text-muted)">
          See which plan is right for you with a detailed feature breakdown.
        </p>
      </div>
      <UPricingTable :tiers="tiers" :sections="sections" />
    </div>
  </section>
</template>
