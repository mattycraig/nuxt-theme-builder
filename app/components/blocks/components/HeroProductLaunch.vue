<script setup lang="ts">
const links = [
  {
    label: "Try it Free",
    icon: "i-lucide-arrow-right",
    trailing: true,
    size: "xl" as const,
    color: "primary" as const,
  },
  {
    label: "Watch Demo",
    icon: "i-lucide-play",
    size: "xl" as const,
    variant: "outline" as const,
    color: "neutral" as const,
  },
];
const logos = ["Vercel", "Netlify", "AWS", "Cloudflare", "GitHub"];
</script>

<template>
  <section class="relative isolate overflow-hidden bg-(--ui-bg-elevated)">
    <!-- Top glow -->
    <div
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[40rem] rounded-full bg-(--ui-primary)/10 blur-[120px]"
      aria-hidden="true"
    />

    <!-- Grid texture -->
    <div
      class="pointer-events-none absolute inset-0 hero-grid-lines opacity-[0.03]"
      aria-hidden="true"
    />

    <div class="relative px-6 py-20 sm:py-28 text-center">
      <!-- Pulsing badge with glow -->
      <div class="mb-8 inline-flex relative">
        <span
          class="absolute inset-0 -m-1 rounded-full bg-(--ui-primary)/20 blur-md launch-glow"
          aria-hidden="true"
        />
        <UBadge
          label="Now Available — v4.0"
          color="primary"
          variant="subtle"
          size="lg"
          class="relative"
        />
      </div>

      <h2
        class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.1]"
      >
        <span class="text-(--ui-text-highlighted)">Ship polished products</span>
        <br >
        <span
          class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
        >
          faster than ever
        </span>
      </h2>

      <p
        class="text-lg sm:text-xl text-(--ui-text-muted) max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        A complete design system with 125+ components, built-in dark mode, and
        first-class TypeScript support. From prototype to production in record
        time.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 mb-16">
        <UButton v-for="link in links" :key="link.label" v-bind="link" />
      </div>

      <!-- Trust logos -->
      <div class="border-t border-(--ui-border)/50 pt-10">
        <p class="text-sm text-(--ui-text-muted) mb-6">Trusted by teams at</p>
        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <span
            v-for="logo in logos"
            :key="logo"
            class="text-sm font-semibold text-(--ui-text-muted) opacity-40 tracking-wide uppercase transition-opacity hover:opacity-70"
          >
            {{ logo }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.launch-glow {
  animation: glowPulse 3s ease-in-out infinite;
}

.hero-grid-lines {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .launch-glow {
    animation: none;
  }
}
</style>
