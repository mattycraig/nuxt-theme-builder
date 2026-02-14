<template>
  <section class="px-6 py-14 sm:py-20">
    <div
      class="mx-auto max-w-xl rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) p-8 sm:p-10"
    >
      <div class="text-center">
        <UIcon
          name="i-lucide-mail"
          class="size-8 text-(--ui-primary) mb-4 mx-auto"
          aria-hidden="true"
        />

        <h2
          class="text-xl sm:text-2xl font-bold tracking-tight text-(--ui-text-highlighted) mb-2"
        >
          Stay in the loop
        </h2>
        <p class="text-sm text-(--ui-text-muted) mb-6 leading-relaxed">
          Get the latest updates, tutorials, and product news. No spam,
          unsubscribe anytime.
        </p>

        <!-- Subscriber count trust signal -->
        <div
          class="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-(--ui-primary)/5 border border-(--ui-primary)/15"
        >
          <UIcon
            name="i-lucide-users"
            class="size-3.5 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="text-xs font-medium text-(--ui-primary)">
            Join 8,200+ subscribers
          </span>
        </div>

        <!-- Email form -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
          <UInput
            placeholder="you@example.com"
            icon="i-lucide-mail"
            size="lg"
            type="email"
            class="flex-1"
            aria-label="Email address"
          />
          <UButton
            label="Subscribe"
            icon="i-lucide-send"
            size="lg"
            color="primary"
            trailing
            class="shrink-0"
          />
        </div>

        <!-- Privacy trust line -->
        <p class="text-xs text-(--ui-text-dimmed) flex items-center justify-center gap-1">
          <UIcon
            name="i-lucide-shield-check"
            class="size-3"
            aria-hidden="true"
          />
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  </section>
</template>
