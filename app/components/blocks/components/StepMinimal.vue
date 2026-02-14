<template>
  <section class="py-12 sm:py-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 justify-center text-center sm:text-left"
      >
        <div class="flex-1">
          <p class="text-sm font-bold text-(--ui-primary)">Step 1</p>
          <p class="text-(--ui-text-muted) mt-1">
            Choose a preset or start from scratch.
          </p>
        </div>
        <UIcon
          name="i-lucide-chevron-right"
          class="hidden sm:block size-5 text-(--ui-text-muted) flex-shrink-0"
          aria-hidden="true"
        />
        <div class="flex-1">
          <p class="text-sm font-bold text-(--ui-primary)">Step 2</p>
          <p class="text-(--ui-text-muted) mt-1">
            Customize every token visually.
          </p>
        </div>
        <UIcon
          name="i-lucide-chevron-right"
          class="hidden sm:block size-5 text-(--ui-text-muted) flex-shrink-0"
          aria-hidden="true"
        />
        <div class="flex-1">
          <p class="text-sm font-bold text-(--ui-primary)">Step 3</p>
          <p class="text-(--ui-text-muted) mt-1">
            Export and integrate in seconds.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
