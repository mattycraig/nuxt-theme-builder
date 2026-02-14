<template>
  <section class="px-6 py-10 sm:py-14">
    <div
      class="mx-auto max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) px-6 py-5"
    >
      <div class="text-center sm:text-left">
        <p
          class="text-lg font-semibold text-(--ui-text-highlighted) leading-snug"
        >
          Start building today.
        </p>
        <p class="text-sm text-(--ui-text-muted)">
          Free plan available — no credit card needed.
        </p>
      </div>
      <UButton
        label="Get Started"
        size="lg"
        color="primary"
        icon="i-lucide-arrow-right"
        trailing
        class="shrink-0"
      />
    </div>
  </section>
</template>
