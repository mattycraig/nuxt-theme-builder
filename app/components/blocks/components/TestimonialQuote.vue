<template>
  <section class="py-16 sm:py-24">
    <UPageSection
      headline="What People Say"
      title="Our users speak for themselves"
    >
      <div class="max-w-3xl mx-auto text-center space-y-8">
        <UIcon
          name="i-lucide-quote"
          class="size-12 text-(--ui-primary) opacity-30 mx-auto"
          aria-hidden="true"
        />
        <blockquote
          class="text-xl sm:text-2xl font-medium text-(--ui-text-highlighted) leading-relaxed"
        >
          "Switching to this platform was the best decision we made all year.
          Our design workflow is 10x faster, and every project ships with a
          polished, consistent look."
        </blockquote>
        <div class="flex items-center justify-center gap-3">
          <UAvatar text="JD" size="lg" color="primary" />
          <div class="text-left">
            <p class="font-semibold text-(--ui-text-highlighted)">
              Jamie Dawson
            </p>
            <p class="text-sm text-(--ui-text-muted)">
              VP of Product at Acme Inc
            </p>
          </div>
        </div>
      </div>
    </UPageSection>
  </section>
</template>
