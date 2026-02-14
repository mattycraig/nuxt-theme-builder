<script setup lang="ts">
const suggestions = [
  "Dashboard templates",
  "Landing pages",
  "E-commerce blocks",
  "Authentication",
];
</script>

<template>
  <section>
    <UPageHero
      headline="Documentation"
      title="What can we help you find?"
      description="Search our docs, guides, and API references to build faster."
    >
      <div class="w-full max-w-xl mx-auto space-y-4">
        <UInput
          icon="i-lucide-search"
          placeholder="Search documentation..."
          size="xl"
          class="w-full"
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
            class="cursor-pointer"
          />
        </div>
      </div>
    </UPageHero>
  </section>
</template>
