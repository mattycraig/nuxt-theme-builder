<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          How it works
        </h2>
      </div>
      <UPageColumns>
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-(--ui-text-highlighted)">
            1. Choose your palette
          </h3>
          <p class="text-(--ui-text-muted) leading-relaxed">
            Pick a primary color and neutral scheme, or let AI generate an
            entire palette from a text prompt. Every combination is checked for
            contrast compliance.
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-(--ui-text-highlighted)">
            2. Customize tokens
          </h3>
          <p class="text-(--ui-text-muted) leading-relaxed">
            Fine-tune border radius, typography, spacing, and individual shade
            overrides. Preview changes across real components, blocks, and full
            page templates.
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-(--ui-text-highlighted)">
            3. Export and ship
          </h3>
          <p class="text-(--ui-text-muted) leading-relaxed">
            Export your finished theme as an app.config.ts file, CSS variables,
            or raw JSON. Drop it into any Nuxt UI project and go.
          </p>
        </div>
      </UPageColumns>
    </div>
  </section>
</template>
