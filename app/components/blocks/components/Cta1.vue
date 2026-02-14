<script setup lang="ts">
const stats = [
  { value: "10k+", label: "Developers" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "Rating" },
];
</script>

<template>
  <section class="px-6 py-14 sm:py-20">
    <div
      class="mx-auto max-w-2xl rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) p-8 sm:p-10"
    >
      <div class="text-center">
        <h2
          class="text-2xl sm:text-3xl font-bold tracking-tight text-(--ui-text-highlighted) mb-3"
        >
          Ready to accelerate your workflow?
        </h2>
        <p class="text-(--ui-text-muted) max-w-md mx-auto mb-8 leading-relaxed">
          Join thousands of developers who build faster with our platform. No
          credit card required.
        </p>

        <!-- Social proof stats -->
        <div
          class="flex items-center justify-center gap-6 sm:gap-10 mb-8 pb-8 border-b border-(--ui-border)"
          role="list"
          aria-label="Platform statistics"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
            role="listitem"
          >
            <p
              class="text-xl sm:text-2xl font-bold text-(--ui-primary)"
            >
              {{ stat.value }}
            </p>
            <p class="text-xs sm:text-sm text-(--ui-text-muted)">
              {{ stat.label }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <UButton
            label="Get Started for Free"
            icon="i-lucide-arrow-right"
            trailing
            size="xl"
            color="primary"
          />
          <UButton
            label="Talk to Sales"
            icon="i-lucide-message-circle"
            size="xl"
            variant="outline"
            color="neutral"
          />
        </div>
      </div>
    </div>
  </section>
</template>
