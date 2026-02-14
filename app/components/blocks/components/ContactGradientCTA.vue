<template>
  <section class="relative isolate overflow-hidden px-6 py-20 sm:py-28">
    <!-- Full-width gradient band -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[var(--ui-primary)]/8 via-transparent to-[var(--ui-secondary)]/8"
      aria-hidden="true"
    />

    <!-- Decorative rings -->
    <div
      class="pointer-events-none absolute top-8 left-8 size-48 rounded-full border border-(--ui-primary)/8"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-8 right-8 size-32 rounded-full border border-(--ui-secondary)/8"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[28rem] rounded-full border border-(--ui-primary)/5"
      aria-hidden="true"
    />

    <div
      class="relative max-w-3xl mx-auto text-center space-y-8 gradient-cta-enter"
    >
      <UBadge label="We're Hiring" color="primary" variant="subtle" size="lg" />

      <h2
        class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]"
      >
        <span class="text-(--ui-text-highlighted)">Ready to </span>
        <span
          class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
        >
          work together?
        </span>
      </h2>

      <p
        class="text-lg sm:text-xl text-(--ui-text-muted) max-w-xl mx-auto leading-relaxed"
      >
        Whether you have a project in mind or just want to explore
        possibilities, we'd love to start the conversation.
      </p>

      <!-- Contact summary strip -->
      <div
        class="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-(--ui-text-muted)"
      >
        <span class="flex items-center gap-2">
          <UIcon
            name="i-lucide-mail"
            class="size-4 text-(--ui-primary)"
            aria-hidden="true"
          />
          hello@themebuilder.dev
        </span>
        <span
          class="hidden sm:block w-px h-4 bg-(--ui-border)"
          aria-hidden="true"
        />
        <span class="flex items-center gap-2">
          <UIcon
            name="i-lucide-map-pin"
            class="size-4 text-(--ui-primary)"
            aria-hidden="true"
          />
          San Francisco, CA
        </span>
        <span
          class="hidden sm:block w-px h-4 bg-(--ui-border)"
          aria-hidden="true"
        />
        <span class="flex items-center gap-2">
          <UIcon
            name="i-lucide-clock"
            class="size-4 text-(--ui-primary)"
            aria-hidden="true"
          />
          24h Response
        </span>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
        <UButton
          label="Get in Touch"
          icon="i-lucide-arrow-right"
          trailing
          size="xl"
          color="primary"
        />
        <UButton
          label="Schedule a Call"
          icon="i-lucide-calendar"
          size="xl"
          variant="outline"
          color="neutral"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.gradient-cta-enter {
  animation: gradientCTAFade 0.8s ease-out both;
}

@keyframes gradientCTAFade {
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
  .gradient-cta-enter {
    animation: none;
  }
}
</style>
