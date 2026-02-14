<script setup lang="ts">
const stats = [
  { value: "10k+", label: "Active users", icon: "i-lucide-users" },
  { value: "5M+", label: "Themes generated", icon: "i-lucide-palette" },
  { value: "99.9%", label: "Uptime", icon: "i-lucide-shield-check" },
  { value: "150+", label: "Countries", icon: "i-lucide-globe" },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold text-(--ui-primary) mb-2">Our Impact</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Trusted worldwide
        </h2>
      </div>
      <UPageGrid>
        <UPageCard v-for="s in stats" :key="s.label" :icon="s.icon">
          <div class="text-center p-2">
            <p class="text-4xl font-bold text-(--ui-primary)">{{ s.value }}</p>
            <p class="mt-1 text-sm text-(--ui-text-muted)">{{ s.label }}</p>
          </div>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
