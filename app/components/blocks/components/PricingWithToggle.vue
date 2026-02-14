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
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Warm gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5"
      aria-hidden="true"
    />

    <!-- Corner accent orbs -->
    <div
      class="pointer-events-none absolute -top-20 -right-20 size-[18rem] rounded-full bg-(--ui-primary)/8 blur-[80px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-16 -left-16 size-[14rem] rounded-full bg-(--ui-secondary)/6 blur-[60px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12 pricing-stagger">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]"
        >
          <span class="text-(--ui-text-highlighted)">Choose your </span>
          <span
            class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
          >
            plan
          </span>
        </h2>
        <p
          class="text-lg text-(--ui-text-muted) mb-8 max-w-lg mx-auto leading-relaxed"
        >
          Start free, then pay as you grow. Switch between billing cycles
          anytime.
        </p>

        <!-- Elevated toggle pill -->
        <div
          class="inline-flex items-center gap-1 rounded-full border border-(--ui-border)/60 bg-(--ui-bg)/80 backdrop-blur-sm p-1.5 shadow-lg"
        >
          <UButton
            label="Monthly"
            size="sm"
            :variant="billingCycle === 'monthly' ? 'solid' : 'ghost'"
            :color="billingCycle === 'monthly' ? 'primary' : 'neutral'"
            class="rounded-full"
            @click="billingCycle = 'monthly'"
          />
          <UButton
            size="sm"
            :variant="billingCycle === 'annual' ? 'solid' : 'ghost'"
            :color="billingCycle === 'annual' ? 'primary' : 'neutral'"
            class="rounded-full"
            @click="billingCycle = 'annual'"
          >
            Annual
            <UBadge
              label="Save 17%"
              variant="subtle"
              color="success"
              size="xs"
              class="ml-1.5"
            />
          </UButton>
        </div>
      </div>

      <!-- Plans -->
      <div class="pricing-stagger [animation-delay:200ms]">
        <UPricingPlans :plans="currentPlans" />
      </div>

      <!-- Bottom note -->
      <div class="pricing-stagger [animation-delay:400ms] text-center mt-10">
        <div
          class="inline-flex items-center gap-4 text-sm text-(--ui-text-muted)"
        >
          <span class="flex items-center gap-1.5">
            <UIcon
              name="i-lucide-credit-card"
              class="size-4 text-(--ui-primary)"
              aria-hidden="true"
            />
            No credit card required
          </span>
          <span class="h-3 w-px bg-(--ui-border)" aria-hidden="true" />
          <span class="flex items-center gap-1.5">
            <UIcon
              name="i-lucide-refresh-cw"
              class="size-4 text-(--ui-primary)"
              aria-hidden="true"
            />
            Cancel anytime
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-stagger {
  animation: pricingFadeUp 0.7s ease-out both;
}

@keyframes pricingFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-stagger {
    animation: none;
  }
}
</style>
