<script setup lang="ts">
const socials = [
  { icon: "i-lucide-github", label: "GitHub", followers: "12.4k" },
  { icon: "i-lucide-twitter", label: "Twitter", followers: "8.1k" },
  { icon: "i-lucide-youtube", label: "YouTube", followers: "5.7k" },
  { icon: "i-lucide-linkedin", label: "LinkedIn", followers: "3.2k" },
];

const quickLinks = [
  "Documentation",
  "Components",
  "Templates",
  "Changelog",
  "Pricing",
  "Blog",
];

const legalLinks = ["Privacy", "Terms", "Cookies"];
</script>

<template>
  <footer class="relative isolate overflow-hidden">
    <!-- Warm gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5"
      aria-hidden="true"
    />

    <!-- Decorative rings -->
    <div
      class="pointer-events-none absolute -top-16 -right-16 size-[18rem] rounded-full border border-(--ui-primary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-20 -left-12 size-[14rem] rounded-full border border-(--ui-secondary)/8"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-1/3 right-1/4 size-[8rem] rounded-full border border-(--ui-primary)/5"
      aria-hidden="true"
    />

    <div class="relative border-t border-(--ui-border)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <!-- Social platforms section -->
        <div class="text-center mb-12">
          <p
            class="text-sm font-semibold text-(--ui-primary) tracking-wider uppercase mb-2"
          >
            Join our community
          </p>
          <h2
            class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) tracking-tight mb-8"
          >
            Let&rsquo;s build together
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <a
              v-for="social in socials"
              :key="social.label"
              href="#"
              class="group flex flex-col items-center gap-2 rounded-xl border border-(--ui-border) bg-(--ui-bg) p-4 transition-all duration-300 hover:border-(--ui-primary)/40 hover:shadow-md"
            >
              <UIcon
                :name="social.icon"
                class="size-6 text-(--ui-text-muted) group-hover:text-(--ui-primary) transition-colors"
                aria-hidden="true"
              />
              <span class="text-sm font-medium text-(--ui-text-highlighted)">
                {{ social.label }}
              </span>
              <span class="text-xs text-(--ui-text-muted)">
                {{ social.followers }} followers
              </span>
            </a>
          </div>
        </div>

        <!-- Quick links as badges -->
        <div class="text-center mb-10">
          <p class="text-sm text-(--ui-text-muted) mb-4">Quick links</p>
          <nav aria-label="Quick navigation">
            <div class="flex flex-wrap items-center justify-center gap-2">
              <a v-for="link in quickLinks" :key="link" href="#">
                <UBadge
                  :label="link"
                  variant="subtle"
                  color="neutral"
                  size="md"
                  class="cursor-pointer transition-all duration-200 hover:ring-1 hover:ring-(--ui-primary)/30 hover:shadow-sm"
                />
              </a>
            </div>
          </nav>
        </div>

        <!-- Bottom bar -->
        <USeparator />
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
        >
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-palette"
              class="size-5 text-(--ui-primary)"
              aria-hidden="true"
            />
            <span class="font-semibold text-(--ui-text-highlighted)">
              ThemeBuilder
            </span>
          </div>
          <nav aria-label="Legal">
            <div class="flex items-center gap-5">
              <a
                v-for="link in legalLinks"
                :key="link"
                href="#"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
              >
                {{ link }}
              </a>
            </div>
          </nav>
          <p class="text-sm text-(--ui-text-muted)">&copy; 2025 ThemeBuilder</p>
        </div>
      </div>
    </div>
  </footer>
</template>
