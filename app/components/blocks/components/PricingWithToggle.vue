<script setup lang="ts">
const billingCycle = ref<"monthly" | "annual">("monthly");

const monthlyPlans = [
  {
    title: "Hobby",
    description: "Perfect for side projects.",
    price: "$0",
    features: ["3 projects", "Core components", "Community support"],
    button: {
      label: "Start Free",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
  {
    title: "Pro",
    description: "For professionals and teams.",
    price: "$29",
    tagline: "per month",
    badge: "Popular",
    features: [
      "Unlimited projects",
      "All components",
      "Priority support",
      "Team access",
    ],
    button: { label: "Subscribe", color: "primary" as const },
  },
  {
    title: "Enterprise",
    description: "For large organizations.",
    price: "$99",
    tagline: "per month",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated support",
      "Custom SLA",
    ],
    button: {
      label: "Contact Sales",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
];

const annualPlans = monthlyPlans.map((plan) => ({
  ...plan,
  price: plan.price === "$0" ? "$0" : plan.price === "$29" ? "$24" : "$79",
  tagline: plan.price === "$0" ? undefined : "per month, billed annually",
  discount:
    plan.price === "$0" ? undefined : plan.price === "$29" ? "$29" : "$99",
}));

const currentPlans = computed(() =>
  billingCycle.value === "monthly" ? monthlyPlans : annualPlans,
);
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Choose your plan
        </h2>
        <p class="text-lg text-(--ui-text-muted) mb-6">
          Start free, then pay as you grow.
        </p>
        <div
          class="inline-flex items-center gap-3 rounded-full bg-(--ui-bg-elevated) p-1.5"
        >
          <UButton
            label="Monthly"
            size="sm"
            :variant="billingCycle === 'monthly' ? 'solid' : 'ghost'"
            :color="billingCycle === 'monthly' ? 'primary' : 'neutral'"
            @click="billingCycle = 'monthly'"
          />
          <UButton
            size="sm"
            :variant="billingCycle === 'annual' ? 'solid' : 'ghost'"
            :color="billingCycle === 'annual' ? 'primary' : 'neutral'"
            @click="billingCycle = 'annual'"
          >
            Annual
            <UBadge
              label="Save 17%"
              variant="subtle"
              color="success"
              size="xs"
              class="ml-1"
            />
          </UButton>
        </div>
      </div>
      <UPricingPlans :plans="currentPlans" />
    </div>
  </section>
</template>
