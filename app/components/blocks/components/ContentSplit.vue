<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-sm font-semibold text-(--ui-primary) mb-2">
            Our Story
          </p>
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-6"
          >
            From side project to platform
          </h2>
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
            <p>
              Today, thousands of teams use our platform to ship consistent,
              accessible designs faster than ever.
            </p>
          </div>
        </div>
        <div
          class="bg-(--ui-bg-elevated) rounded-xl aspect-video flex items-center justify-center border border-(--ui-border)"
        >
          <UIcon
            name="i-lucide-play-circle"
            class="size-16 text-(--ui-text-muted) opacity-40"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>
