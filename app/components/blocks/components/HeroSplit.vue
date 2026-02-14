<template>
  <div class="grid lg:grid-cols-2 gap-8 p-6 sm:p-12 items-center">
    <div>
      <UBadge label="v4.0" color="secondary" variant="subtle" class="mb-4" />
      <h2
        class="text-3xl sm:text-4xl font-bold tracking-tight text-(--ui-text-highlighted) mb-4"
      >
        Design tokens, your way
      </h2>
      <p class="text-lg text-(--ui-text-muted) mb-6">
        Visually configure every color, radius, and font — then export a single
        config file for your project.
      </p>
      <div class="flex flex-wrap gap-3">
        <UButton label="Open Builder" size="lg" color="primary" />
        <UButton
          label="View on GitHub"
          size="lg"
          variant="ghost"
          color="neutral"
          icon="i-lucide-external-link"
          trailing
        />
      </div>
    </div>
    <div
      class="aspect-[4/3] rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border) flex items-center justify-center"
    >
      <div class="text-center text-(--ui-text-muted)">
        <UIcon
          name="i-lucide-image"
          class="size-12 mb-2 mx-auto opacity-40"
          aria-hidden="true"
        />
        <p class="text-sm">Hero image placeholder</p>
      </div>
    </div>
  </div>
</template>
