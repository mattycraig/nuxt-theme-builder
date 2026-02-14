<script setup lang="ts">
const links = [
  {
    label: "Claim Your Discount",
    icon: "i-lucide-arrow-right",
    trailing: true,
    size: "lg" as const,
    color: "primary" as const,
  },
];
</script>

<template>
  <section>
    <UPageCta
      title="Limited time: 50% off all annual plans"
      description="Upgrade now and lock in the best price. Offer ends soon — don't miss out."
      variant="subtle"
      :links="links"
    />
  </section>
</template>
