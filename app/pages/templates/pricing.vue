<script setup lang="ts">
import type { PricingPlanProps } from "#ui/types";

const billingCycle = ref<"monthly" | "annual">("monthly");

const plans = computed<PricingPlanProps[]>(() => [
  {
    title: "Starter",
    description: "Perfect for side projects and small teams getting started.",
    price: "$0",
    billingCycle: billingCycle.value === "monthly" ? "/month" : "/year",
    features: [
      { title: "Up to 3 projects", icon: "i-lucide-folder" },
      { title: "Basic components", icon: "i-lucide-component" },
      { title: "Community support", icon: "i-lucide-message-circle" },
      { title: "1 team member", icon: "i-lucide-user" },
      { title: "Basic analytics", icon: "i-lucide-bar-chart-2" },
    ],
    button: {
      label: "Get Started",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
  {
    title: "Pro",
    description: "For growing teams that need more power and flexibility.",
    badge: "Most Popular",
    price: billingCycle.value === "monthly" ? "$29" : "$290",
    discount: billingCycle.value === "annual" ? "$348" : undefined,
    billingCycle: billingCycle.value === "monthly" ? "/month" : "/year",
    billingPeriod:
      billingCycle.value === "annual" ? "billed annually" : undefined,
    features: [
      { title: "Unlimited projects", icon: "i-lucide-folder" },
      { title: "All 125+ components", icon: "i-lucide-component" },
      { title: "Priority support", icon: "i-lucide-headphones" },
      { title: "Up to 10 team members", icon: "i-lucide-users" },
      { title: "Advanced analytics", icon: "i-lucide-bar-chart-2" },
      { title: "Custom themes", icon: "i-lucide-palette" },
      { title: "API access", icon: "i-lucide-code" },
    ],
    button: {
      label: "Start Free Trial",
      color: "primary" as const,
      variant: "solid" as const,
    },
    highlight: true,
    scale: true,
  },
  {
    title: "Enterprise",
    description: "For large organizations with custom requirements.",
    price: "Custom",
    features: [
      { title: "Everything in Pro", icon: "i-lucide-check" },
      { title: "Unlimited team members", icon: "i-lucide-users" },
      { title: "Dedicated support", icon: "i-lucide-shield" },
      { title: "Custom integrations", icon: "i-lucide-plug" },
      { title: "SSO & SAML", icon: "i-lucide-key" },
      { title: "SLA guarantee", icon: "i-lucide-file-check" },
      { title: "On-premise option", icon: "i-lucide-server" },
    ],
    button: {
      label: "Contact Sales",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
]);

const comparisonTiers = computed(() => [
  {
    id: "starter",
    title: "Starter",
    description: "For side projects.",
    price: "$0",
    billingCycle: billingCycle.value === "monthly" ? "/month" : "/year",
    button: {
      label: "Get Started",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
  {
    id: "pro",
    title: "Pro",
    description: "For growing teams.",
    price: billingCycle.value === "monthly" ? "$29" : "$290",
    discount: billingCycle.value === "annual" ? "$348" : undefined,
    billingCycle: billingCycle.value === "monthly" ? "/month" : "/year",
    badge: "Most Popular",
    button: { label: "Start Free Trial" },
    highlight: true,
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For large organizations.",
    price: "Custom",
    button: {
      label: "Contact Sales",
      color: "neutral" as const,
      variant: "outline" as const,
    },
  },
]);

const comparisonSections = [
  {
    title: "Usage",
    features: [
      {
        title: "Projects",
        tiers: { starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
      },
      {
        title: "Team Members",
        tiers: { starter: "1", pro: "10", enterprise: "Unlimited" },
      },
      {
        title: "Components",
        tiers: { starter: "Basic", pro: "All 125+", enterprise: "All 125+" },
      },
    ],
  },
  {
    title: "Features",
    features: [
      {
        title: "Analytics",
        tiers: { starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
      },
      {
        title: "Custom Themes",
        tiers: { starter: false, pro: true, enterprise: true },
      },
      {
        title: "API Access",
        tiers: { starter: false, pro: true, enterprise: true },
      },
    ],
  },
  {
    title: "Support & Security",
    features: [
      {
        title: "Support",
        tiers: {
          starter: "Community",
          pro: "Priority",
          enterprise: "Dedicated",
        },
      },
      {
        title: "SSO / SAML",
        tiers: { starter: false, pro: false, enterprise: true },
      },
      {
        title: "SLA",
        tiers: { starter: false, pro: false, enterprise: "99.99%" },
      },
    ],
  },
];

const faqItems = [
  {
    label: "What happens when my trial ends?",
    content:
      "After your 14-day trial, you can continue with the free Starter plan or upgrade to Pro. Your data is always safe.",
  },
  {
    label: "Can I change plans later?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    label: "Do you offer refunds?",
    content:
      "We offer a full refund within the first 30 days of your subscription. No questions asked.",
  },
  {
    label: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.",
  },
  {
    label: "Is there a discount for open source projects?",
    content:
      "Yes! Open source projects get 50% off the Pro plan. Contact us with your project details.",
  },
];
</script>

<template>
  <div class="py-12 sm:py-16 space-y-16 sm:space-y-24">
    <!-- Header -->
    <UContainer>
      <div class="text-center space-y-4 max-w-2xl mx-auto">
        <UBadge label="Pricing" variant="subtle" color="primary" />
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-(--ui-text-highlighted)"
        >
          Simple, transparent pricing
        </h1>
        <p class="text-lg text-(--ui-text-muted)">
          Choose the plan that's right for your team. All plans include a 14-day
          free trial.
        </p>

        <!-- Billing toggle -->
        <div class="flex items-center justify-center gap-3 pt-2">
          <span
            class="text-sm font-medium"
            :class="
              billingCycle === 'monthly'
                ? 'text-(--ui-text-highlighted)'
                : 'text-(--ui-text-muted)'
            "
          >
            Monthly
          </span>
          <USwitch
            :model-value="billingCycle === 'annual'"
            aria-label="Toggle annual billing"
            @update:model-value="billingCycle = $event ? 'annual' : 'monthly'"
          />
          <span
            class="text-sm font-medium"
            :class="
              billingCycle === 'annual'
                ? 'text-(--ui-text-highlighted)'
                : 'text-(--ui-text-muted)'
            "
          >
            Annual
          </span>
          <UBadge
            v-if="billingCycle === 'annual'"
            label="Save 17%"
            variant="subtle"
            color="success"
            size="xs"
          />
        </div>
      </div>
    </UContainer>

    <!-- Plans -->
    <UContainer>
      <UPricingPlans :plans="plans" compact />
    </UContainer>

    <!-- Comparison Table -->
    <UContainer>
      <div class="space-y-8">
        <div class="text-center">
          <h2
            class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted)"
          >
            Compare Plans
          </h2>
          <p class="mt-2 text-(--ui-text-muted)">
            See which plan is right for you with a detailed feature breakdown.
          </p>
        </div>

        <UPricingTable
          :tiers="comparisonTiers"
          :sections="comparisonSections"
        />
      </div>
    </UContainer>

    <UContainer>
      <USeparator />
    </UContainer>

    <!-- FAQ -->
    <UContainer>
      <div class="space-y-8 max-w-3xl mx-auto">
        <div class="text-center">
          <h2
            class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-2"
          >
            Frequently Asked Questions
          </h2>
          <p class="text-(--ui-text-muted)">
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <UAccordion :items="faqItems" />
      </div>
    </UContainer>

    <!-- Bottom CTA -->
    <UContainer>
      <div class="text-center space-y-4 pb-4">
        <p class="text-(--ui-text-muted)">
          Need a custom plan for your organization?
        </p>
        <UButton
          label="Contact Sales"
          icon="i-lucide-mail"
          size="lg"
          variant="outline"
          color="primary"
        />
      </div>
    </UContainer>
  </div>
</template>
