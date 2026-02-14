<template>
  <!-- CTA variant 1: Simple centered -->
  <section
    class="rounded-xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden"
  >
    <div class="px-6 py-16 text-center">
      <h2
        class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-3"
      >
        Ready to get started?
      </h2>
      <p class="text-(--ui-text-muted) max-w-md mx-auto mb-6">
        Start building your theme in minutes. No account required — everything
        runs in your browser.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <UButton
          label="Start Building"
          size="lg"
          color="primary"
          icon="i-lucide-rocket"
        />
        <UButton
          label="View Examples"
          size="lg"
          variant="outline"
          color="neutral"
        />
      </div>
    </div>
  </section>

  <!-- CTA variant 2: With background accent -->
  <section
    class="rounded-xl bg-(--ui-primary)/5 border border-(--ui-primary)/20 overflow-hidden"
  >
    <div
      class="px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-8 max-w-4xl mx-auto"
    >
      <div>
        <h2 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
          Export your theme now
        </h2>
        <p class="text-(--ui-text-muted)">
          Copy your theme configuration as
          <code class="text-sm bg-(--ui-bg-elevated) px-1.5 py-0.5 rounded"
            >app.config.ts</code
          >, CSS, or JSON.
        </p>
      </div>
      <div class="flex gap-3 shrink-0">
        <UButton
          label="Export Theme"
          color="primary"
          size="lg"
          icon="i-lucide-download"
        />
      </div>
    </div>
  </section>

  <!-- CTA variant 3: Newsletter style -->
  <section
    class="rounded-xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden"
  >
    <div class="px-6 py-12 max-w-lg mx-auto text-center">
      <UIcon
        name="i-lucide-mail"
        class="size-10 text-(--ui-primary) mb-4"
        aria-hidden="true"
      />
      <h2 class="text-xl font-bold text-(--ui-text-highlighted) mb-2">
        Stay in the loop
      </h2>
      <p class="text-sm text-(--ui-text-muted) mb-6">
        Get notified about new components, presets, and theme builder updates.
      </p>
      <div class="flex gap-2">
        <UInput
          placeholder="you@example.com"
          type="email"
          class="flex-1"
          size="lg"
          aria-label="Email address"
        />
        <UButton label="Subscribe" color="primary" size="lg" />
      </div>
      <p class="text-xs text-(--ui-text-muted) mt-3">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  </section>
</template>
