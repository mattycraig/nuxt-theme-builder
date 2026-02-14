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
    <UPageCTA variant="subtle" :links="links">
      <template #title>
        <span class="flex flex-wrap items-center justify-center gap-3">
          <UBadge
            label="Limited Time"
            icon="i-lucide-clock"
            color="primary"
            variant="solid"
            size="sm"
          />
          <span>50% off all annual plans</span>
        </span>
      </template>
      <template #description>
        Upgrade now and lock in the best price. Offer expires soon — don't miss
        out.
      </template>
    </UPageCTA>
  </section>
</template>
