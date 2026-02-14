<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Atmospheric accent -->
    <div
      class="pointer-events-none absolute -top-20 -right-20 size-[28rem] rounded-full bg-(--ui-secondary)/8 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Text side -->
        <div class="content-split-text">
          <div class="flex items-start gap-4">
            <!-- Vertical accent bar -->
            <div
              class="hidden sm:block shrink-0 w-1 self-stretch rounded-full bg-gradient-to-b from-[var(--ui-primary)] to-[var(--ui-secondary)]"
              aria-hidden="true"
            />

            <div class="space-y-6">
              <div>
                <p
                  class="text-sm font-semibold tracking-widest uppercase text-(--ui-primary) mb-3"
                >
                  Our Story
                </p>
                <h2
                  class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.15]"
                >
                  From side project to
                  <span class="text-(--ui-primary)">platform</span>
                </h2>
              </div>

              <div class="space-y-4 text-(--ui-text-muted) leading-relaxed">
                <p>
                  It started with frustration. Copying color tokens between
                  projects, manually adjusting shades, and testing dark mode by
                  squinting at contrast ratios.
                </p>
                <p>
                  So we built the tool we wished existed — a visual builder that
                  generates production-ready theme configurations while you
                  experiment.
                </p>
              </div>

              <!-- Inline stat -->
              <div class="flex items-center gap-6 pt-2">
                <div>
                  <p class="text-2xl font-bold text-(--ui-text-highlighted)">
                    10k+
                  </p>
                  <p class="text-sm text-(--ui-text-muted)">Teams using it</p>
                </div>
                <div class="h-10 w-px bg-(--ui-border)" aria-hidden="true" />
                <div>
                  <p class="text-2xl font-bold text-(--ui-text-highlighted)">
                    50k+
                  </p>
                  <p class="text-sm text-(--ui-text-muted)">Themes exported</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Media side — layered card composition -->
        <div class="relative content-split-media">
          <!-- Background layer -->
          <div
            class="absolute inset-4 rounded-2xl bg-(--ui-primary)/5 border border-(--ui-primary)/10"
            aria-hidden="true"
          />
          <!-- Main media card -->
          <div
            class="relative rounded-2xl bg-(--ui-bg-elevated) border border-(--ui-border) shadow-2xl overflow-hidden"
          >
            <!-- Gradient strip at top -->
            <div
              class="h-1.5 bg-gradient-to-r from-[var(--ui-primary)] via-[var(--ui-secondary)] to-[var(--ui-primary)]"
              aria-hidden="true"
            />

            <div class="aspect-video flex items-center justify-center p-8">
              <div class="text-center space-y-3">
                <div
                  class="size-14 mx-auto rounded-2xl bg-(--ui-primary)/10 flex items-center justify-center"
                >
                  <UIcon
                    name="i-lucide-play"
                    class="size-7 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
                <p class="text-sm font-medium text-(--ui-text-muted)">
                  Watch our story
                </p>
              </div>
            </div>
          </div>

          <!-- Floating badge -->
          <div
            class="absolute -bottom-3 -right-3 rounded-xl border border-(--ui-border) bg-(--ui-bg) shadow-lg px-4 py-2.5 flex items-center gap-2 content-float"
          >
            <UIcon
              name="i-lucide-heart"
              class="size-4 text-(--ui-primary) shrink-0"
              aria-hidden="true"
            />
            <span class="text-sm font-medium text-(--ui-text-highlighted)">
              Open Source
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-split-text {
  animation: splitSlideIn 0.7s ease-out both;
}

.content-split-media {
  animation: splitSlideIn 0.7s ease-out both;
  animation-delay: 0.15s;
}

.content-float {
  animation: floatUp 0.5s ease-out both;
  animation-delay: 0.7s;
}

@keyframes splitSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatUp {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-split-text,
  .content-split-media,
  .content-float {
    animation: none;
  }
}
</style>
