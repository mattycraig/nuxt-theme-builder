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
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Subtle gradient swash -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--ui-primary)]/3 via-transparent to-[var(--ui-secondary)]/3"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 pricing-stagger">
        <UBadge
          label="Feature Comparison"
          color="primary"
          variant="subtle"
          size="lg"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--ui-text-highlighted) mb-4 tracking-tight"
        >
          Compare plans
        </h2>
        <p
          class="text-lg text-(--ui-text-muted) max-w-xl mx-auto leading-relaxed"
        >
          See which plan is right for you with a detailed feature breakdown.
        </p>
      </div>

      <!-- Chrome-framed table wrapper -->
      <div class="pricing-stagger [animation-delay:200ms]">
        <div
          class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-xl overflow-hidden"
        >
          <!-- Window chrome bar -->
          <div
            class="flex items-center gap-2 px-4 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated)"
            aria-hidden="true"
          >
            <span class="size-3 rounded-full bg-red-400/80" />
            <span class="size-3 rounded-full bg-yellow-400/80" />
            <span class="size-3 rounded-full bg-green-400/80" />
            <span class="ml-3 text-xs text-(--ui-text-muted) font-mono"
              >pricing-comparison.config</span
            >
          </div>

          <!-- Table content -->
          <div class="p-2 sm:p-4">
            <UPricingTable :tiers="tiers" :sections="sections" />
          </div>
        </div>
      </div>

      <!-- Floating upgrade nudge -->
      <div class="pricing-float mt-6 flex justify-center">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-(--ui-border) bg-(--ui-bg) shadow-md px-4 py-2"
        >
          <UIcon
            name="i-lucide-zap"
            class="size-4 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="text-sm text-(--ui-text-muted)">
            All paid plans include a
            <strong class="text-(--ui-text-highlighted)"
              >14-day free trial</strong
            >
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

.pricing-float {
  animation: pricingFloatUp 0.5s ease-out both;
  animation-delay: 0.6s;
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

@keyframes pricingFloatUp {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-stagger,
  .pricing-float {
    animation: none;
  }
}
</style>
