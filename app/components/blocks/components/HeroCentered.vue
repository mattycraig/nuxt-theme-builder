<template>
  <div class="relative isolate overflow-hidden px-6 py-24 sm:py-32 text-center">
    <!-- Decorative gradient orbs -->
    <div
      class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-(--ui-primary)/15 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-32 -right-24 size-[25rem] rounded-full bg-(--ui-secondary)/10 blur-[80px]"
      aria-hidden="true"
    />

    <!-- Content -->
    <div class="relative">
      <UBadge
        label="New Release"
        color="primary"
        variant="subtle"
        size="lg"
        class="hero-stagger mb-8"
      />

      <h2
        class="hero-stagger [animation-delay:100ms] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.1]"
      >
        <span
          class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
        >
          Ship beautiful apps
        </span>
        <span class="text-(--ui-text-highlighted)"> faster than ever</span>
      </h2>

      <p
        class="hero-stagger [animation-delay:200ms] text-lg sm:text-xl text-(--ui-text-muted) max-w-xl mx-auto mb-10 leading-relaxed"
      >
        Build production-ready interfaces with a themeable component library
        powered by Tailwind CSS v4 and Nuxt.
      </p>

      <div
        class="hero-stagger [animation-delay:300ms] flex flex-wrap items-center justify-center gap-4"
      >
        <UButton
          label="Get Started"
          size="xl"
          color="primary"
          icon="i-lucide-arrow-right"
          trailing
        />
        <UButton
          label="Documentation"
          size="xl"
          variant="outline"
          color="neutral"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-stagger {
  animation: heroFadeUp 0.7s ease-out both;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-stagger {
    animation: none;
  }
}
</style>
