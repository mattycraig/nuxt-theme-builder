<script setup lang="ts">
const billingCycle = ref<"monthly" | "annual">("monthly");

const plans = computed(() => [
  {
    title: "Starter",
    description: "Perfect for side projects and small teams getting started.",
    price: billingCycle.value === "monthly" ? "$0" : "$0",
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
    highlight: false,
  },
  {
    title: "Pro",
    description: "For growing teams that need more power and flexibility.",
    badge: "Most Popular",
    price: billingCycle.value === "monthly" ? "$29" : "$290",
    discount: billingCycle.value === "annual" ? "$348" : undefined,
    billingCycle: billingCycle.value === "monthly" ? "/month" : "/year",
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
  },
  {
    title: "Enterprise",
    description: "For large organizations with custom requirements.",
    price: "Custom",
    billingCycle: "",
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
    highlight: false,
  },
]);

const comparisonFeatures = [
  { name: "Projects", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Team Members", starter: "1", pro: "10", enterprise: "Unlimited" },
  {
    name: "Components",
    starter: "Basic",
    pro: "All 125+",
    enterprise: "All 125+",
  },
  {
    name: "Support",
    starter: "Community",
    pro: "Priority",
    enterprise: "Dedicated",
  },
  {
    name: "Analytics",
    starter: "Basic",
    pro: "Advanced",
    enterprise: "Advanced",
  },
  { name: "Custom Themes", starter: "—", pro: "✓", enterprise: "✓" },
  { name: "API Access", starter: "—", pro: "✓", enterprise: "✓" },
  { name: "SSO / SAML", starter: "—", pro: "—", enterprise: "✓" },
  { name: "SLA", starter: "—", pro: "—", enterprise: "99.99%" },
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
  <div class="p-6 sm:p-8 space-y-12 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <UBadge label="Pricing" variant="subtle" color="primary" />
      <h1 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
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

    <!-- Plans Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      <UCard
        v-for="plan in plans"
        :key="plan.title"
        :class="[
          plan.highlight
            ? 'ring-2 ring-(--ui-primary) scale-[1.02] shadow-xl'
            : 'shadow-sm',
        ]"
      >
        <div class="space-y-6 p-2">
          <!-- Header -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-semibold text-(--ui-text-highlighted)">
                {{ plan.title }}
              </h3>
              <UBadge
                v-if="plan.badge"
                :label="plan.badge"
                color="primary"
                size="xs"
              />
            </div>
            <p class="text-sm text-(--ui-text-muted)">{{ plan.description }}</p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-1">
            <span
              class="text-4xl font-extrabold text-(--ui-text-highlighted)"
              >{{ plan.price }}</span
            >
            <span class="text-sm text-(--ui-text-muted)">{{
              plan.billingCycle
            }}</span>
            <span
              v-if="plan.discount"
              class="text-sm text-(--ui-text-dimmed) line-through ml-2"
            >
              {{ plan.discount }}
            </span>
          </div>

          <!-- CTA Button -->
          <UButton v-bind="plan.button" block size="lg" />

          <USeparator />

          <!-- Features -->
          <ul class="space-y-3">
            <li
              v-for="feature in plan.features"
              :key="feature.title"
              class="flex items-center gap-3"
            >
              <UIcon
                :name="feature.icon"
                class="size-4 shrink-0"
                :class="
                  plan.highlight
                    ? 'text-(--ui-primary)'
                    : 'text-(--ui-text-muted)'
                "
              />
              <span class="text-sm text-(--ui-text)">{{ feature.title }}</span>
            </li>
          </ul>
        </div>
      </UCard>
    </div>

    <!-- Comparison Table -->
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-(--ui-text-highlighted) text-center">
        Compare Plans
      </h2>

      <UTable
        :data="comparisonFeatures"
        :columns="[
          { key: 'name', header: 'Feature' },
          { key: 'starter', header: 'Starter' },
          { key: 'pro', header: 'Pro' },
          { key: 'enterprise', header: 'Enterprise' },
        ]"
      />
    </div>

    <USeparator />

    <!-- FAQ -->
    <div class="space-y-6 max-w-3xl mx-auto">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
          Frequently Asked Questions
        </h2>
        <p class="text-(--ui-text-muted)">
          Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      <UAccordion :items="faqItems" />
    </div>

    <!-- Bottom CTA -->
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
  </div>
</template>
