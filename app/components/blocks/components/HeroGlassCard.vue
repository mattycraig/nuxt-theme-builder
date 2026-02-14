<template>
  <section class="relative isolate overflow-hidden px-6 py-20 sm:py-28">
    <!-- Dot grid pattern -->
    <div
      class="absolute inset-0 hero-dot-grid opacity-[0.04]"
      aria-hidden="true"
    />

    <!-- Glow spot -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[30rem] rounded-full bg-(--ui-primary)/10 blur-[100px]"
      aria-hidden="true"
    />

    <!-- Glass card -->
    <div
      class="relative mx-auto max-w-2xl rounded-3xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl p-8 sm:p-12 shadow-2xl"
    >
      <div class="text-center space-y-6">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase"
        >
          Open Source
        </p>
        <h2
          class="text-3xl sm:text-5xl font-bold tracking-tight text-(--ui-text-highlighted) leading-[1.15]"
        >
          The Nuxt UI Theme Builder
        </h2>
        <p
          class="text-lg text-(--ui-text-muted) max-w-lg mx-auto leading-relaxed"
        >
          Design, preview, and export beautiful theme configurations for Nuxt UI
          v4. Real-time editing with live component previews across light and
          dark modes.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <UButton
            label="Get Started"
            icon="i-lucide-arrow-right"
            trailing
            size="xl"
            color="primary"
          />
          <UButton
            label="Star on GitHub"
            icon="i-lucide-star"
            size="xl"
            variant="outline"
            color="neutral"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
