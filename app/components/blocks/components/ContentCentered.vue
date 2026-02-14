<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Subtle radial glow behind content -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-(--ui-primary)/8 blur-[120px]"
      aria-hidden="true"
    />

    <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Decorative ornament -->
      <div
        class="content-stagger flex items-center justify-center gap-3 mb-8"
        aria-hidden="true"
      >
        <span
          class="h-px w-12 bg-gradient-to-r from-transparent to-(--ui-primary)/40"
        />
        <span class="size-1.5 rotate-45 bg-(--ui-primary)" />
        <span
          class="h-px w-12 bg-gradient-to-l from-transparent to-(--ui-primary)/40"
        />
      </div>

      <p
        class="content-stagger [animation-delay:80ms] text-sm font-semibold tracking-widest uppercase text-(--ui-primary) mb-5"
      >
        About Us
      </p>

      <h2
        class="content-stagger [animation-delay:160ms] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) mb-8 leading-[1.15]"
      >
        Building the future of
        <span
          class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
        >
          design systems
        </span>
      </h2>

      <!-- Pull-quote style lead paragraph -->
      <blockquote
        class="content-stagger [animation-delay:240ms] relative text-xl sm:text-2xl font-medium text-(--ui-text-highlighted)/80 leading-relaxed mb-8 italic"
      >
        <span
          class="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-(--ui-primary)/15 font-serif select-none"
          aria-hidden="true"
          >&ldquo;</span
        >
        We believe every team deserves beautiful, consistent interfaces without
        spending weeks on manual design work.
      </blockquote>

      <div
        class="content-stagger [animation-delay:320ms] h-px w-16 mx-auto bg-(--ui-border) mb-8"
        aria-hidden="true"
      />

      <p
        class="content-stagger [animation-delay:400ms] text-lg text-(--ui-text-muted) leading-relaxed"
      >
        From startups shipping their first product to enterprises maintaining
        dozens of applications, our theme builder puts the power of professional
        design systems in the hands of every developer — create, preview, and
        export production-ready themes in minutes.
      </p>
    </div>
  </section>
</template>

<style scoped>
.content-stagger {
  animation: contentFadeUp 0.6s ease-out both;
}

@keyframes contentFadeUp {
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
  .content-stagger {
    animation: none;
  }
}
</style>
