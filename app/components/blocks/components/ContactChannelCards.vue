<script setup lang="ts">
const channels = [
  {
    icon: "i-lucide-mail",
    title: "Email Us",
    description: "Send us a message any time — we respond within 24 hours.",
    action: "hello@themebuilder.dev",
    actionLabel: "Send an email",
    color: "primary" as const,
  },
  {
    icon: "i-lucide-message-circle",
    title: "Live Chat",
    description:
      "Chat with our support team in real time during business hours.",
    action: "#",
    actionLabel: "Start a chat",
    color: "secondary" as const,
  },
  {
    icon: "i-lucide-book-open",
    title: "Help Center",
    description: "Browse our docs, guides, and frequently asked questions.",
    action: "#",
    actionLabel: "Browse docs",
    color: "info" as const,
  },
  {
    icon: "i-lucide-calendar",
    title: "Schedule a Call",
    description:
      "Book a 15-minute intro call with our team at your convenience.",
    action: "#",
    actionLabel: "Pick a time",
    color: "success" as const,
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden px-6 py-20 sm:py-28">
    <!-- Warm gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5"
      aria-hidden="true"
    />

    <!-- Decorative rings -->
    <div
      class="pointer-events-none absolute -top-16 right-8 size-[16rem] rounded-full border border-(--ui-primary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-12 -left-12 size-[12rem] rounded-full border border-(--ui-secondary)/10"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto">
      <div class="text-center mb-14 space-y-4">
        <UBadge
          label="Support"
          color="primary"
          variant="subtle"
          size="lg"
          class="channel-stagger"
        />
        <h2
          class="channel-stagger [animation-delay:80ms] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          How can we help?
        </h2>
        <p
          class="channel-stagger [animation-delay:160ms] text-lg text-(--ui-text-muted) max-w-lg mx-auto leading-relaxed"
        >
          Choose the way that works best for you. We're here whenever you need
          us.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-5">
        <div
          v-for="(ch, i) in channels"
          :key="ch.title"
          class="channel-stagger group relative rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-(--ui-primary)/40 hover:shadow-lg hover:shadow-(--ui-primary)/5"
          :style="{ animationDelay: `${(i + 3) * 80}ms` }"
        >
          <!-- Subtle glow on hover -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl bg-(--ui-primary)/0 group-hover:bg-(--ui-primary)/[0.02] transition-colors duration-300"
            aria-hidden="true"
          />

          <div class="relative space-y-4">
            <div
              class="size-12 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center group-hover:bg-(--ui-primary)/15 transition-colors duration-200"
            >
              <UIcon
                :name="ch.icon"
                class="size-6 text-(--ui-primary)"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 class="text-lg font-bold text-(--ui-text-highlighted) mb-1">
                {{ ch.title }}
              </h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                {{ ch.description }}
              </p>
            </div>
            <p
              class="text-sm font-semibold text-(--ui-primary) flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200"
            >
              {{ ch.actionLabel }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4"
                aria-hidden="true"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.channel-stagger {
  animation: channelFadeUp 0.6s ease-out both;
}

@keyframes channelFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .channel-stagger {
    animation: none;
  }
}
</style>
