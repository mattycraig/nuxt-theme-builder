<script setup lang="ts">
const features = [
  {
    icon: "i-lucide-palette",
    title: "Visual Theme Builder",
    description:
      "Design your perfect color scheme with our intuitive visual editor. See changes in real-time.",
  },
  {
    icon: "i-lucide-code",
    title: "Export Ready",
    description:
      "Export your theme as app.config.ts, CSS variables, or JSON. Copy and paste into your project.",
  },
  {
    icon: "i-lucide-moon",
    title: "Dark Mode Support",
    description:
      "Every theme automatically supports light and dark modes with proper contrast ratios.",
  },
  {
    icon: "i-lucide-component",
    title: "125+ Components",
    description:
      "Built on Nuxt UI v4 with over 125 beautifully crafted components ready to use.",
  },
  {
    icon: "i-lucide-smartphone",
    title: "Fully Responsive",
    description:
      "Every component and layout is designed to look great on any screen size.",
  },
  {
    icon: "i-lucide-zap",
    title: "Lightning Fast",
    description:
      "Built on Nuxt 4 with Tailwind CSS v4 for optimal performance and tiny bundle sizes.",
  },
];

const stats = [
  { value: "125+", label: "Components" },
  { value: "17", label: "Color Palettes" },
  { value: "10K+", label: "Developers" },
  { value: "99.9%", label: "Uptime" },
];

const testimonials = [
  {
    quote:
      "The theme builder saved us hours of design work. We had a beautiful, consistent design system in minutes.",
    name: "Sarah Chen",
    role: "Lead Designer at TechCorp",
    avatar: "SC",
  },
  {
    quote:
      "Incredible tool for prototyping. Being able to see changes live across all components is a game changer.",
    name: "Marcus Rivera",
    role: "Frontend Engineer at StartupXYZ",
    avatar: "MR",
  },
  {
    quote:
      "We use the theme builder for every new project. The export feature makes integration effortless.",
    name: "Alex Kim",
    role: "CTO at DesignLab",
    avatar: "AK",
  },
];

const logos = ["Nuxt", "Vue.js", "Tailwind", "Vercel", "Netlify", "Cloudflare"];
</script>

<template>
  <div class="bg-(--ui-bg)">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-[var(--ui-primary)]/5 via-transparent to-[var(--ui-secondary)]/5"
      />

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-20"
      >
        <div class="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <!-- Headline badge -->
          <div class="flex justify-center">
            <UBadge
              label="✨ Introducing Theme Builder v2.0"
              variant="subtle"
              color="primary"
              size="lg"
            />
          </div>

          <!-- Title -->
          <h1
            class="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
          >
            Build Beautiful
            <span class="text-(--ui-primary)">Themes</span>
            <br class="hidden sm:inline" >
            in Minutes
          </h1>

          <!-- Description -->
          <p
            class="text-lg sm:text-xl text-(--ui-text-muted) max-w-2xl mx-auto"
          >
            The visual theme builder for Nuxt UI. Design, preview, and export
            your perfect design system with real-time component previews.
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <UButton
              label="Get Started Free"
              icon="i-lucide-arrow-right"
              trailing
              size="xl"
              color="primary"
            />
            <UButton
              label="View on GitHub"
              icon="i-lucide-github"
              size="xl"
              variant="outline"
              color="neutral"
            />
          </div>

          <!-- Social proof -->
          <div class="flex items-center justify-center gap-2 pt-4">
            <UAvatarGroup :max="5" size="sm">
              <UAvatar text="JD" color="primary" />
              <UAvatar text="SC" color="secondary" />
              <UAvatar text="MR" color="success" />
              <UAvatar text="AK" color="info" />
              <UAvatar text="LW" color="warning" />
              <UAvatar text="TP" color="error" />
            </UAvatarGroup>
            <p class="text-sm text-(--ui-text-muted)">
              Loved by
              <strong class="text-(--ui-text-highlighted)">10,000+</strong>
              developers
            </p>
          </div>
        </div>

        <!-- Hero visual -->
        <div class="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div
            class="rounded-xl border border-(--ui-border) shadow-2xl overflow-hidden bg-(--ui-bg-elevated)"
          >
            <div
              class="flex items-center gap-2 px-4 py-3 border-b border-(--ui-border) bg-(--ui-bg-muted)"
            >
              <div class="flex gap-1.5">
                <div class="size-3 rounded-full bg-red-400" />
                <div class="size-3 rounded-full bg-yellow-400" />
                <div class="size-3 rounded-full bg-green-400" />
              </div>
              <div class="flex-1 flex justify-center">
                <div
                  class="bg-(--ui-bg) rounded-md px-4 py-1 text-xs text-(--ui-text-muted) border border-(--ui-border)"
                >
                  theme-builder.nuxt.dev
                </div>
              </div>
            </div>
            <div class="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <UButton label="Primary" color="primary" block />
              <UButton label="Secondary" color="secondary" block />
              <UButton label="Success" color="success" block />
              <UButton label="Warning" color="warning" block />
              <UBadge
                label="New Feature"
                color="primary"
                variant="subtle"
                class="justify-center"
              />
              <UBadge
                label="Beta"
                color="secondary"
                variant="soft"
                class="justify-center"
              />
              <UBadge
                label="Stable"
                color="success"
                variant="outline"
                class="justify-center"
              />
              <UBadge
                label="Deprecated"
                color="error"
                variant="solid"
                class="justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logos Section -->
    <section
      class="border-y border-(--ui-border) bg-(--ui-bg-muted)/50 py-8 sm:py-12"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm font-medium text-(--ui-text-dimmed) mb-6">
          TRUSTED BY DEVELOPERS AT
        </p>
        <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <span
            v-for="logo in logos"
            :key="logo"
            class="text-lg sm:text-xl font-bold text-(--ui-text-muted) opacity-50 hover:opacity-80 transition-opacity"
          >
            {{ logo }}
          </span>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <UBadge
            label="Features"
            variant="subtle"
            color="primary"
            class="mb-4"
          />
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
          >
            Everything you need to build themes
          </h2>
          <p class="text-lg text-(--ui-text-muted)">
            A comprehensive toolkit for designing, previewing, and exporting
            your Nuxt UI themes.
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <UCard v-for="feature in features" :key="feature.title">
            <div class="space-y-3">
              <div
                class="inline-flex items-center justify-center size-10 rounded-lg bg-(--ui-primary)/10"
              >
                <UIcon
                  :name="feature.icon"
                  class="size-5 text-(--ui-primary)"
                />
              </div>
              <h3 class="font-semibold text-(--ui-text-highlighted)">
                {{ feature.title }}
              </h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      class="py-16 sm:py-20 bg-(--ui-bg-elevated) border-y border-(--ui-border)"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-3xl sm:text-4xl font-extrabold text-(--ui-primary)">
              {{ stat.value }}
            </p>
            <p class="text-sm text-(--ui-text-muted) mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Highlight Section -->
    <section class="py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <UBadge label="Live Preview" variant="subtle" color="secondary" />
            <h2
              class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)"
            >
              See changes in real time
            </h2>
            <p class="text-lg text-(--ui-text-muted)">
              Every adjustment you make is instantly reflected across all 125+
              components. No refresh needed, no waiting — just design and see.
            </p>
            <ul class="space-y-3">
              <li
                v-for="item in [
                  'Instant color updates',
                  'Live radius adjustments',
                  'Font preview across all text',
                  'Dark mode toggle',
                ]"
                :key="item"
                class="flex items-center gap-3"
              >
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-5 text-(--ui-success) shrink-0"
                />
                <span class="text-(--ui-text)">{{ item }}</span>
              </li>
            </ul>
            <UButton
              label="Try it now"
              icon="i-lucide-arrow-right"
              trailing
              color="secondary"
            />
          </div>

          <!-- Visual placeholder -->
          <div
            class="space-y-4 p-6 rounded-xl border border-(--ui-border) bg-(--ui-bg-muted)"
          >
            <div class="space-y-3">
              <UInput
                placeholder="Search components..."
                icon="i-lucide-search"
                size="lg"
                class="w-full"
              />
              <div class="grid grid-cols-2 gap-3">
                <UButton label="Solid" color="primary" block />
                <UButton
                  label="Outline"
                  color="primary"
                  variant="outline"
                  block
                />
                <UButton label="Soft" color="secondary" variant="soft" block />
                <UButton
                  label="Ghost"
                  color="secondary"
                  variant="ghost"
                  block
                />
              </div>
              <UAlert
                title="Preview Alert"
                description="This alert updates with your theme changes."
                color="info"
                icon="i-lucide-info"
              />
              <div class="flex gap-2">
                <UBadge label="Tag 1" color="primary" variant="subtle" />
                <UBadge label="Tag 2" color="secondary" variant="subtle" />
                <UBadge label="Tag 3" color="success" variant="subtle" />
              </div>
              <UProgress :value="65" color="primary" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 sm:py-24 bg-(--ui-bg-muted)/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
          >
            Loved by developers
          </h2>
          <p class="text-lg text-(--ui-text-muted)">
            See what developers are saying about the Theme Builder.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard v-for="testimonial in testimonials" :key="testimonial.name">
            <div class="space-y-4">
              <div class="flex gap-1">
                <UIcon
                  v-for="i in 5"
                  :key="i"
                  name="i-lucide-star"
                  class="size-4 text-(--ui-warning)"
                />
              </div>
              <p class="text-sm text-(--ui-text) leading-relaxed italic">
                "{{ testimonial.quote }}"
              </p>
              <div class="flex items-center gap-3 pt-2">
                <UAvatar :text="testimonial.avatar" size="sm" color="primary" />
                <div>
                  <p class="text-sm font-semibold text-(--ui-text-highlighted)">
                    {{ testimonial.name }}
                  </p>
                  <p class="text-xs text-(--ui-text-muted)">
                    {{ testimonial.role }}
                  </p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 sm:py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          class="rounded-2xl bg-gradient-to-br from-[var(--ui-primary)]/10 to-[var(--ui-secondary)]/10 border border-(--ui-border) p-8 sm:p-12 space-y-6"
        >
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)"
          >
            Ready to build your theme?
          </h2>
          <p class="text-lg text-(--ui-text-muted) max-w-xl mx-auto">
            Start designing your custom Nuxt UI theme today. It's free, fast,
            and fun.
          </p>
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <UButton
              label="Start Building"
              icon="i-lucide-palette"
              size="xl"
              color="primary"
            />
            <UButton
              label="Read the Docs"
              icon="i-lucide-book-open"
              size="xl"
              variant="outline"
              color="neutral"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-(--ui-border) py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-palette" class="size-5 text-(--ui-primary)" />
            <span class="font-semibold text-(--ui-text-highlighted)"
              >Theme Builder</span
            >
          </div>
          <div class="flex items-center gap-4">
            <UButton
              label="Twitter"
              variant="ghost"
              color="neutral"
              size="sm"
            />
            <UButton label="GitHub" variant="ghost" color="neutral" size="sm" />
            <UButton
              label="Discord"
              variant="ghost"
              color="neutral"
              size="sm"
            />
          </div>
          <p class="text-sm text-(--ui-text-dimmed)">
            &copy; 2026 Theme Builder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
