<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Miscellaneous</h3>

    <!-- Separator -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Separator</p>
    <USeparator class="mb-6" />

    <!-- Keyboard shortcuts -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Keyboard Shortcuts</p>
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <span class="text-sm">Copy: <UKbd>Ctrl</UKbd> + <UKbd>C</UKbd></span>
      <span class="text-sm">Paste: <UKbd>Ctrl</UKbd> + <UKbd>V</UKbd></span>
      <span class="text-sm">Save: <UKbd>Ctrl</UKbd> + <UKbd>S</UKbd></span>
      <span class="text-sm">Undo: <UKbd>Ctrl</UKbd> + <UKbd>Z</UKbd></span>
    </div>

    <!-- Skeleton loading -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Skeleton Loading</p>
    <div class="space-y-3 mb-6">
      <div class="flex items-center gap-3">
        <USkeleton class="h-10 w-10 rounded-full" />
        <div class="space-y-2 flex-1">
          <USkeleton class="h-4 w-3/4 rounded" />
          <USkeleton class="h-3 w-1/2 rounded" />
        </div>
      </div>
      <USkeleton class="h-4 w-full rounded" />
      <USkeleton class="h-4 w-5/6 rounded" />
      <USkeleton class="h-32 w-full rounded-lg" />
    </div>

    <!-- Tooltips -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Tooltips</p>
    <div class="flex flex-wrap gap-3">
      <UTooltip text="This is a helpful tooltip">
        <UButton label="Hover me" color="primary" variant="outline" />
      </UTooltip>
      <UTooltip text="Edit this document">
        <UButton
          icon="i-lucide-pencil"
          color="neutral"
          variant="ghost"
          aria-label="Edit this document"
        />
      </UTooltip>
      <UTooltip text="Remove from favorites">
        <UButton
          icon="i-lucide-heart"
          color="error"
          variant="soft"
          aria-label="Remove from favorites"
        />
      </UTooltip>
    </div>
  </section>
</template>
