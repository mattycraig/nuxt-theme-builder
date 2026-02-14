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
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Dot grid pattern background -->
    <div
      class="absolute inset-0 pricing-dot-grid opacity-[0.04]"
      aria-hidden="true"
    />

    <!-- Centered glow behind the cards -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[32rem] rounded-full bg-(--ui-primary)/10 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header inside a frosted glass panel -->
      <div
        class="text-center mb-12 mx-auto max-w-xl rounded-2xl border border-(--ui-border)/40 bg-(--ui-bg)/50 backdrop-blur-xl p-6 sm:p-8 shadow-lg pricing-stagger"
      >
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-2"
        >
          Simple Pricing
        </p>
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-3 tracking-tight"
        >
          Simple, transparent pricing
        </h2>
        <p class="text-(--ui-text-muted) leading-relaxed">
          Choose the plan that works for you. Upgrade or downgrade anytime.
        </p>
      </div>

      <!-- Plans -->
      <div class="pricing-stagger [animation-delay:200ms]">
        <UPricingPlans :plans="plans" compact />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

.pricing-stagger {
  animation: pricingFadeUp 0.7s ease-out both;
}

@keyframes pricingFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
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
