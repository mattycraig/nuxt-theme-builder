<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Soft glow behind the quote -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[28rem] rounded-full bg-(--ui-primary)/8 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Top decorative gradient line -->
      <div
        class="mx-auto mb-12 w-16 h-px bg-gradient-to-r from-transparent via-[var(--ui-primary)] to-transparent"
        aria-hidden="true"
      />

      <!-- Oversized decorative quotation marks -->
      <div class="relative inline-block">
        <span
          class="absolute -top-10 -left-6 text-[8rem] sm:text-[10rem] font-serif leading-none text-(--ui-primary) opacity-10 select-none"
          aria-hidden="true"
          >&ldquo;</span
        >
      </div>

      <blockquote
        class="relative text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug sm:leading-snug tracking-tight max-w-3xl mx-auto"
      >
        <span
          class="bg-gradient-to-r from-[var(--ui-text-highlighted)] via-[var(--ui-text-highlighted)] to-[var(--ui-text-muted)] bg-clip-text text-transparent"
        >
          Switching to this platform was the best decision we made all year. Our
          design workflow is 10x faster, and every project ships with a
          polished, consistent look.
        </span>
      </blockquote>

      <div class="relative inline-block mt-4">
        <span
          class="text-[8rem] sm:text-[10rem] font-serif leading-none text-(--ui-primary) opacity-10 select-none"
          aria-hidden="true"
          >&rdquo;</span
        >
      </div>

      <!-- Bottom decorative gradient line -->
      <div
        class="mx-auto mt-2 mb-10 w-16 h-px bg-gradient-to-r from-transparent via-[var(--ui-border)] to-transparent"
        aria-hidden="true"
      />

      <!-- Author -->
      <div class="flex items-center justify-center gap-4">
        <UAvatar text="JD" size="xl" color="primary" />
        <div class="text-left">
          <p class="text-lg font-semibold text-(--ui-text-highlighted)">
            Jamie Dawson
          </p>
          <p class="text-sm text-(--ui-text-muted)">
            VP of Product at Acme Inc
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
