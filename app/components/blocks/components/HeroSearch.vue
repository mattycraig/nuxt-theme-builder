<script setup lang="ts">
const suggestions = [
  "Dashboard templates",
  "Landing pages",
  "E-commerce blocks",
  "Authentication",
];
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <!-- Warm gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5"
      aria-hidden="true"
    />

    <!-- Decorative rings -->
    <div
      class="pointer-events-none absolute -top-20 right-0 size-[20rem] rounded-full border border-(--ui-primary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-16 -left-16 size-[14rem] rounded-full border border-(--ui-secondary)/10"
      aria-hidden="true"
    />

    <UPageHero
      headline="Documentation"
      description="Search our docs, guides, and API references to build faster."
    >
      <template #title>
        <h2 class="text-5xl sm:text-7xl font-bold tracking-tight text-(--ui-text-highlighted)">
          What can we help you find?
        </h2>
      </template>
      <div class="w-full max-w-xl mx-auto space-y-5">
        <UInput
          icon="i-lucide-search"
          placeholder="Search documentation..."
          size="xl"
          class="w-full shadow-lg"
          aria-label="Search documentation"
        />
        <div class="flex flex-wrap items-center justify-center gap-2">
          <span class="text-sm text-(--ui-text-muted)">Popular:</span>
          <UBadge
            v-for="item in suggestions"
            :key="item"
            :label="item"
            variant="subtle"
            color="neutral"
            size="sm"
            class="cursor-pointer transition-all duration-200 hover:ring-1 hover:ring-(--ui-primary)/30 hover:shadow-sm"
          />
        </div>
      </div>
    </UPageHero>
  </section>
</template>
