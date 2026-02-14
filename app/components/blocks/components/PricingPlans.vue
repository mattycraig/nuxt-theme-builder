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
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Decorative gradient orbs for atmospheric depth -->
    <div
      class="pointer-events-none absolute -top-32 left-1/4 size-[36rem] rounded-full bg-(--ui-primary)/12 blur-[120px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 right-1/4 size-[28rem] rounded-full bg-(--ui-secondary)/8 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with gradient text -->
      <div class="text-center mb-14 pricing-stagger">
        <p
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-(--ui-primary) mb-3 tracking-wide uppercase"
        >
          <UIcon name="i-lucide-sparkles" class="size-4" aria-hidden="true" />
          Pricing
        </p>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]"
        >
          <span
            class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
          >
            Plans for every
          </span>
          <span class="text-(--ui-text-highlighted)"> team</span>
        </h2>
        <p
          class="text-lg text-(--ui-text-muted) max-w-2xl mx-auto leading-relaxed"
        >
          Start free and scale as you grow. No hidden fees, no surprises.
        </p>
      </div>

      <!-- Plans with staggered entrance -->
      <div class="pricing-stagger [animation-delay:200ms]">
        <UPricingPlans :plans="plans" />
      </div>

      <!-- Bottom trust signal -->
      <div class="pricing-stagger [animation-delay:400ms] text-center mt-10">
        <p
          class="text-sm text-(--ui-text-muted) flex items-center justify-center gap-1.5"
        >
          <UIcon
            name="i-lucide-shield-check"
            class="size-4 text-(--ui-primary)"
            aria-hidden="true"
          />
          30-day money-back guarantee on all paid plans
        </p>
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
