<script setup lang="ts">
const features = [
  {
    title: "Visual Editing",
    description:
      "See every change instantly across all components as you build your theme.",
    icon: "i-lucide-eye",
  },
  {
    title: "Semantic Tokens",
    description:
      "Use named color roles — primary, secondary, neutral — instead of raw hex values.",
    icon: "i-lucide-palette",
  },
  {
    title: "Dark Mode Ready",
    description:
      "Every theme supports independent light and dark mode configurations.",
    icon: "i-lucide-moon",
  },
  {
    title: "One-Click Export",
    description:
      "Export your theme as app.config.ts, CSS variables, or JSON with a single action.",
    icon: "i-lucide-download",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Cross-hatch pattern -->
    <div
      class="absolute inset-0 content-crosshatch opacity-[0.03]"
      aria-hidden="true"
    />

    <!-- Dual glow spots -->
    <div
      class="pointer-events-none absolute -top-16 left-1/4 size-[24rem] rounded-full bg-(--ui-primary)/8 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-16 right-1/4 size-[20rem] rounded-full bg-(--ui-secondary)/6 blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="max-w-2xl mx-auto text-center mb-14 content-stagger">
        <p
          class="text-sm font-semibold tracking-widest uppercase text-(--ui-primary) mb-4"
        >
          Why Choose Us
        </p>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.15] mb-5"
        >
          Design meets
          <span
            class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >engineering</span
          >
        </h2>
        <p class="text-lg text-(--ui-text-muted) leading-relaxed">
          Our platform bridges the gap between design intent and production
          code, giving teams a shared language for visual quality.
        </p>
      </div>

      <!-- Feature grid — bento-style cards -->
      <div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="content-stagger group relative rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/60 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-lg hover:shadow-(--ui-primary)/5"
          :style="{ animationDelay: `${(index + 1) * 100}ms` }"
        >
          <!-- Icon -->
          <div
            class="size-12 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
          >
            <UIcon
              :name="feature.icon"
              class="size-6 text-(--ui-primary)"
              aria-hidden="true"
            />
          </div>

          <h3 class="text-lg font-bold text-(--ui-text-highlighted) mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-(--ui-text-muted) leading-relaxed">
            {{ feature.description }}
          </p>

          <!-- Corner accent -->
          <div
            class="absolute top-0 right-0 size-16 overflow-hidden rounded-tr-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          >
            <div
              class="absolute -top-8 -right-8 size-16 rotate-45 bg-(--ui-primary)/8"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-crosshatch {
  background-image:
    linear-gradient(45deg, currentColor 1px, transparent 1px),
    linear-gradient(-45deg, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

.content-stagger {
  animation: contentFadeUp 0.6s ease-out both;
}

@keyframes contentFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-stagger {
    animation: none;
  }
}
</style>
