<script setup lang="ts">
const features = [
  "50+ themed components",
  "Figma design file",
  "Dark mode included",
  "Free updates",
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Dot-grid background -->
    <div
      class="absolute inset-0 ecom-dot-grid opacity-[0.035]"
      aria-hidden="true"
    />

    <!-- Centered glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-(--ui-primary)/8 blur-[120px]"
      aria-hidden="true"
    />

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="ecom-detail-enter rounded-3xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        <div class="grid md:grid-cols-2">
          <!-- Image -->
          <div class="relative overflow-hidden">
            <img
              src="https://picsum.photos/seed/product-detail/600/600"
              alt="Pro Design System"
              class="w-full aspect-square object-cover"
              loading="lazy"
              width="600"
              height="600"
            >
            <!-- Floating badge -->
            <div
              class="absolute bottom-4 left-4 ecom-float rounded-xl border border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur-sm shadow-lg px-3 py-2 flex items-center gap-2"
            >
              <UIcon
                name="i-lucide-star"
                class="size-4 text-amber-500"
                aria-hidden="true"
              />
              <span class="text-sm font-semibold text-(--ui-text-highlighted)"
                >4.9 Rating</span
              >
            </div>
          </div>

          <!-- Details -->
          <div class="flex flex-col justify-center p-6 sm:p-10 space-y-5">
            <div class="ecom-detail-stagger">
              <UBadge
                label="Best Seller"
                color="primary"
                variant="subtle"
                class="mb-3"
              />
              <h2
                class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) tracking-tight"
              >
                Pro Design System
              </h2>
            </div>

            <p
              class="ecom-detail-stagger [animation-delay:80ms] text-3xl font-extrabold bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              $79
            </p>

            <p
              class="ecom-detail-stagger [animation-delay:160ms] text-(--ui-text-muted) leading-relaxed"
            >
              A comprehensive design system with 50+ themed components, Figma
              file, and production-ready Nuxt UI configuration. Perfect for SaaS
              and dashboard projects.
            </p>

            <ul class="ecom-detail-stagger [animation-delay:240ms] space-y-2.5">
              <li
                v-for="feat in features"
                :key="feat"
                class="flex items-center gap-2.5 text-sm text-(--ui-text-muted)"
              >
                <div
                  class="flex size-5 items-center justify-center rounded-full bg-(--ui-primary)/12"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="size-3 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
                {{ feat }}
              </li>
            </ul>

            <div
              class="ecom-detail-stagger [animation-delay:320ms] flex items-center gap-3 pt-2"
            >
              <UButton
                label="Add to Cart"
                icon="i-lucide-shopping-cart"
                color="primary"
                size="lg"
              />
              <UButton label="Preview" variant="outline" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecom-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

.ecom-detail-enter {
  animation: ecomDetailIn 0.7s ease-out both;
}

.ecom-detail-stagger {
  animation: ecomFadeUp 0.6s ease-out both;
}

.ecom-float {
  animation: ecomFloatIn 0.6s ease-out both;
  animation-delay: 0.5s;
}

@keyframes ecomDetailIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes ecomFadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ecomFloatIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ecom-detail-enter,
  .ecom-detail-stagger,
  .ecom-float {
    animation: none;
  }
}
</style>
