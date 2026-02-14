<script setup lang="ts">
const features = [
  "Unlimited projects",
  "All components & blocks",
  "Light & dark mode",
  "Export to all formats",
  "Priority email support",
  "Free updates for life",
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
      <UPageCard class="text-center">
        <div class="space-y-6 p-2">
          <div>
            <h2
              class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-2"
            >
              One plan. Everything included.
            </h2>
            <p class="text-(--ui-text-muted)">
              Simple pricing with no tiers to compare.
            </p>
          </div>
          <div>
            <span class="text-5xl font-extrabold text-(--ui-text-highlighted)"
              >$49</span
            >
            <span class="text-(--ui-text-muted) ml-1">/ lifetime</span>
          </div>
          <ul class="space-y-3 text-left" role="list">
            <li
              v-for="feature in features"
              :key="feature"
              class="flex items-center gap-2"
            >
              <UIcon
                name="i-lucide-check"
                class="text-(--ui-primary) size-5 shrink-0"
                aria-hidden="true"
              />
              <span class="text-(--ui-text-muted)">{{ feature }}</span>
            </li>
          </ul>
          <UButton
            label="Get Lifetime Access"
            size="xl"
            color="primary"
            block
          />
        </div>
      </UPageCard>
    </div>
  </section>
</template>
