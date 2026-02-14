<script setup lang="ts">
const links = [
  { label: "Features", to: "#" },
  { label: "Pricing", to: "#" },
  { label: "Blog", to: "#" },
  { label: "Support", to: "#" },
];
</script>

<template>
  <header class="relative">
    <!-- Utility bar -->
    <div
      class="relative bg-(--ui-bg-elevated) border-b border-(--ui-border)/50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-9">
          <div
            class="hidden sm:flex items-center gap-4 text-xs text-(--ui-text-dimmed)"
          >
            <span class="flex items-center gap-1.5">
              <UIcon name="i-lucide-mail" class="size-3.5" aria-hidden="true" />
              hello@example.com
            </span>
            <USeparator orientation="vertical" class="h-3" />
            <span class="flex items-center gap-1.5">
              <UIcon
                name="i-lucide-globe"
                class="size-3.5"
                aria-hidden="true"
              />
              English
            </span>
          </div>
          <div class="flex items-center gap-3 text-xs ml-auto">
            <a
              href="#"
              class="text-(--ui-text-dimmed) hover:text-(--ui-text-muted) transition-colors"
            >
              Help Center
            </a>
            <USeparator orientation="vertical" class="h-3" />
            <a
              href="#"
              class="text-(--ui-text-dimmed) hover:text-(--ui-text-muted) transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main nav bar -->
    <div class="relative bg-(--ui-bg) border-b border-(--ui-border)">
      <!-- Decorative gradient line between the two bars -->
      <div
        class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--ui-primary)]/20 to-transparent"
        aria-hidden="true"
      />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Brand (larger, editorial style) -->
          <div class="flex items-center gap-3">
            <div
              class="size-10 rounded-xl bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] flex items-center justify-center shadow-md shadow-(--ui-primary)/15"
            >
              <UIcon
                name="i-lucide-palette"
                class="size-5 text-white"
                aria-hidden="true"
              />
            </div>
            <div class="leading-tight">
              <span
                class="block text-lg font-extrabold text-(--ui-text-highlighted) tracking-tight"
              >
                ThemeBuilder
              </span>
              <span
                class="block text-[11px] text-(--ui-text-dimmed) uppercase tracking-widest font-medium"
              >
                Design System Studio
              </span>
            </div>
          </div>

          <!-- Navigation with pill-shaped active indicator style -->
          <nav aria-label="Main navigation">
            <ul class="hidden md:flex items-center gap-0.5">
              <li v-for="link in links" :key="link.label">
                <a
                  :href="link.to"
                  class="px-4 py-2 text-sm font-medium text-(--ui-text-muted) rounded-full transition-all duration-200 hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <UButton
              icon="i-lucide-search"
              variant="ghost"
              color="neutral"
              size="sm"
              aria-label="Search"
            />
            <UButton
              label="Get Started"
              color="primary"
              size="sm"
              icon="i-lucide-arrow-right"
              trailing
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
