<template>
  <section class="relative px-6 py-28 sm:py-40 text-center">
    <!-- Top decorative line -->
    <div
      class="mx-auto mb-16 w-12 h-px bg-gradient-to-r from-transparent via-[var(--ui-primary)] to-transparent"
      aria-hidden="true"
    />

    <h2
      class="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-(--ui-text-highlighted) leading-[0.95] max-w-4xl mx-auto"
    >
      Build something
      <span class="text-(--ui-primary)">remarkable.</span>
    </h2>

    <div class="mt-12">
      <UButton label="Start Building" size="xl" color="primary" />
    </div>

    <!-- Bottom decorative line -->
    <div
      class="mx-auto mt-16 w-12 h-px bg-gradient-to-r from-transparent via-[var(--ui-border)] to-transparent"
      aria-hidden="true"
    />
  </section>
</template>
