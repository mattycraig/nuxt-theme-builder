<script setup lang="ts">
const links = [
  {
    label: "Get Started for Free",
    icon: "i-lucide-arrow-right",
    trailing: true,
    size: "lg" as const,
    color: "primary" as const,
  },
  {
    label: "Talk to Sales",
    icon: "i-lucide-message-circle",
    size: "lg" as const,
    variant: "outline" as const,
    color: "neutral" as const,
  },
];
</script>

<template>
  <section>
    <UPageCta
      title="Ready to accelerate your workflow?"
      description="Join thousands of developers who build faster with our platform. No credit card required."
      :links="links"
    />
  </section>
</template>
