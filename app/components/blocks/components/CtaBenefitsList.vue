<script setup lang="ts">
const benefits = [
  { icon: "i-lucide-zap", text: "Instant setup — deploy in under 2 minutes" },
  {
    icon: "i-lucide-shield-check",
    text: "Enterprise-grade security built in",
  },
  {
    icon: "i-lucide-headphones",
    text: "Priority support with dedicated engineers",
  },
];
</script>

<template>
  <section class="px-6 py-16 sm:py-20">
    <div
      class="mx-auto max-w-lg rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) p-8 sm:p-10"
    >
      <h2
        class="text-2xl font-bold tracking-tight text-(--ui-text-highlighted) mb-2"
      >
        Everything you need to ship faster
      </h2>
      <p class="text-(--ui-text-muted) mb-6">
        Start free and scale when you're ready.
      </p>

      <ul class="space-y-4 mb-8" role="list" aria-label="What you get">
        <li
          v-for="benefit in benefits"
          :key="benefit.text"
          class="flex items-start gap-3"
        >
          <span
            class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-(--ui-primary)/10"
            aria-hidden="true"
          >
            <UIcon :name="benefit.icon" class="size-3.5 text-(--ui-primary)" />
          </span>
          <span class="text-sm text-(--ui-text-highlighted)">
            {{ benefit.text }}
          </span>
        </li>
      </ul>

      <UButton
        label="Get Started Free"
        icon="i-lucide-arrow-right"
        trailing
        size="lg"
        color="primary"
        block
      />
      <p class="mt-3 text-center text-xs text-(--ui-text-dimmed)">
        No credit card required
      </p>
    </div>
  </section>
</template>
