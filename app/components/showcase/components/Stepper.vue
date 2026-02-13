<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Stepper"
      description="Multi-step progress indicator for wizard flows."
      :prop-hints="['items']"
    >
      <UStepper :items="steps" :default-value="1" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icons"
      description="Stepper steps with custom icons."
    >
      <UStepper :items="iconSteps" :default-value="2" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Descriptions"
      description="Stepper including step descriptions."
    >
      <UStepper :items="detailedSteps" :default-value="1" />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const steps = [
  { title: "Account", value: 1 },
  { title: "Profile", value: 2 },
  { title: "Review", value: 3 },
  { title: "Complete", value: 4 },
];

const iconSteps = [
  { title: "Cart", value: 1, icon: "i-lucide-shopping-cart" },
  { title: "Shipping", value: 2, icon: "i-lucide-truck" },
  { title: "Payment", value: 3, icon: "i-lucide-credit-card" },
  { title: "Confirmation", value: 4, icon: "i-lucide-check-circle" },
];

const detailedSteps = [
  {
    title: "Select plan",
    value: 1,
    description: "Choose the best plan for your team.",
  },
  {
    title: "Create account",
    value: 2,
    description: "Set up your credentials.",
  },
  { title: "Invite team", value: 3, description: "Add your team members." },
];
</script>
