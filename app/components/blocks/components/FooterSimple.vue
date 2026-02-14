<template>
  <footer class="border-t border-(--ui-border) bg-(--ui-bg) py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-palette"
            class="size-5 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="font-semibold text-(--ui-text-highlighted)"
            >ThemeBuilder</span
          >
        </div>
        <nav aria-label="Footer navigation">
          <ul class="flex items-center gap-6">
            <li>
              <a
                href="#"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
                >Privacy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
                >Terms</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
                >Contact</a
              >
            </li>
          </ul>
        </nav>
        <p class="text-sm text-(--ui-text-muted)">
          &copy; 2025 ThemeBuilder. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
