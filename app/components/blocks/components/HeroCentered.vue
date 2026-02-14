<template>
  <div class="px-6 py-20 sm:py-28 text-center">
    <UBadge
      label="New Release"
      color="primary"
      variant="subtle"
      size="lg"
      class="mb-6"
    />
    <h2
      class="text-3xl sm:text-5xl font-bold tracking-tight text-(--ui-text-highlighted) mb-4 max-w-2xl mx-auto"
    >
      Ship beautiful apps faster
    </h2>
    <p class="text-lg text-(--ui-text-muted) max-w-xl mx-auto mb-8">
      Build production-ready interfaces with a themeable component library
      powered by Tailwind CSS v4 and Nuxt.
    </p>
    <div class="flex flex-wrap items-center justify-center gap-3">
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
</template>
