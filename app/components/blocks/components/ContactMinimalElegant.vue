<template>
  <section class="px-6 py-16 sm:py-24">
    <div class="relative max-w-2xl mx-auto text-center space-y-8 minimal-enter">
      <!-- Thin decorative line -->
      <div
        class="mx-auto w-12 h-px bg-gradient-to-r from-transparent via-(--ui-primary) to-transparent"
        aria-hidden="true"
      />

      <h2
        class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.1]"
      >
        Say hello
      </h2>

      <p
        class="text-lg sm:text-xl text-(--ui-text-muted) max-w-lg mx-auto leading-relaxed"
      >
        Questions, collaborations, or just want to chat? We're always happy to
        connect.
      </p>

      <a
        href="mailto:hello@themebuilder.dev"
        class="inline-block text-xl sm:text-2xl font-semibold text-(--ui-primary) hover:opacity-80 transition-opacity duration-200 underline underline-offset-4 decoration-(--ui-primary)/30 hover:decoration-(--ui-primary)/60"
      >
        hello@themebuilder.dev
      </a>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
        <UButton
          label="Send a Message"
          icon="i-lucide-mail"
          size="xl"
          color="primary"
        />
        <UButton
          label="Book a Call"
          icon="i-lucide-calendar"
          size="xl"
          variant="outline"
          color="neutral"
        />
      </div>

      <!-- Thin decorative line -->
      <div
        class="mx-auto w-12 h-px bg-gradient-to-r from-transparent via-(--ui-primary) to-transparent"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<style scoped>
.minimal-enter {
  animation: minimalFade 0.8s ease-out both;
}

@keyframes minimalFade {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .minimal-enter {
    animation: none;
  }
}
</style>
