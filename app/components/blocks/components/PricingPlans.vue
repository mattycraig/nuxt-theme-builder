<script setup lang="ts">
const plans = [
  {
    title: "Starter",
    description: "For individuals and small projects.",
    price: "$0",
    features: [
      "Up to 3 projects",
      "Basic components",
      "Community support",
      "Light & dark mode",
    ],
    button: {
      label: "Get Started",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
  {
    title: "Pro",
    description: "For professionals and growing teams.",
    price: "$29",
    badge: "Most Popular",
    tagline: "per month",
    features: [
      "Unlimited projects",
      "All components & blocks",
      "Priority support",
      "Custom themes",
      "Team collaboration",
      "Export all formats",
    ],
    button: {
      label: "Start Free Trial",
      color: "primary" as const,
    },
  },
  {
    title: "Enterprise",
    description: "For organizations with advanced needs.",
    price: "$99",
    tagline: "per month",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Onboarding & training",
    ],
    button: {
      label: "Contact Sales",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold text-(--ui-primary) mb-2">Pricing</p>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Plans for every team
        </h2>
        <p class="text-lg text-(--ui-text-muted) max-w-2xl mx-auto">
          Start free and scale as you grow. No hidden fees.
        </p>
      </div>
      <UPricingPlans :plans="plans" />
    </div>
  </section>
</template>
