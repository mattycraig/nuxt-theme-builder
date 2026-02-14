<script setup lang="ts">
const features = [
  "Unlimited projects",
  "All components & blocks",
  "Light & dark mode",
  "Export to all formats",
  "Priority email support",
  "Free updates for life",
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Concentric decorative rings -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[40rem] rounded-full border border-(--ui-primary)/8"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[28rem] rounded-full border border-(--ui-secondary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[16rem] rounded-full border border-(--ui-primary)/12"
      aria-hidden="true"
    />

    <!-- Center glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[20rem] rounded-full bg-(--ui-primary)/8 blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
      <div class="pricing-stagger">
        <UPageCard class="text-center shadow-2xl">
          <div class="space-y-6 p-2">
            <!-- Badge + heading -->
            <div>
              <UBadge
                label="Lifetime Deal"
                color="primary"
                variant="subtle"
                size="sm"
                class="mb-4"
              />
              <h2
                class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-2"
              >
                One plan. Everything included.
              </h2>
              <p class="text-(--ui-text-muted)">
                Simple pricing with no tiers to compare.
              </p>
            </div>

            <!-- Price with decorative line -->
            <div class="relative">
              <div
                class="absolute inset-x-0 top-1/2 h-px bg-(--ui-border)/60"
                aria-hidden="true"
              />
              <div
                class="relative inline-flex items-baseline gap-1 bg-(--ui-bg) px-4"
              >
                <span
                  class="text-5xl font-extrabold text-(--ui-text-highlighted)"
                  >$49</span
                >
                <span class="text-(--ui-text-muted)">/ lifetime</span>
              </div>
            </div>

            <!-- Feature list -->
            <ul class="space-y-3 text-left" role="list">
              <li
                v-for="feature in features"
                :key="feature"
                class="flex items-center gap-2.5"
              >
                <span
                  class="flex items-center justify-center size-5 rounded-full bg-(--ui-primary)/10 shrink-0"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="text-(--ui-primary) size-3.5"
                    aria-hidden="true"
                  />
                </span>
                <span class="text-(--ui-text-muted)">{{ feature }}</span>
              </li>
            </ul>

            <UButton
              label="Get Lifetime Access"
              size="xl"
              color="primary"
              block
              icon="i-lucide-arrow-right"
              trailing
            />
          </div>
        </UPageCard>
      </div>

      <!-- Micro social proof -->
      <div class="pricing-float text-center mt-8">
        <div class="inline-flex items-center gap-3">
          <!-- Avatar stack -->
          <div class="flex -space-x-2" aria-hidden="true">
            <div
              class="size-7 rounded-full bg-(--ui-primary)/20 border-2 border-(--ui-bg) flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-user"
                class="size-3.5 text-(--ui-primary)"
              />
            </div>
            <div
              class="size-7 rounded-full bg-(--ui-secondary)/20 border-2 border-(--ui-bg) flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-user"
                class="size-3.5 text-(--ui-secondary)"
              />
            </div>
            <div
              class="size-7 rounded-full bg-(--ui-primary)/30 border-2 border-(--ui-bg) flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-user"
                class="size-3.5 text-(--ui-primary)"
              />
            </div>
          </div>
          <p class="text-sm text-(--ui-text-muted)">
            Joined by
            <strong class="text-(--ui-text-highlighted)">2,400+</strong>
            developers
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-stagger {
  animation: pricingFadeUp 0.7s ease-out both;
}

.pricing-float {
  animation: pricingFloatUp 0.5s ease-out both;
  animation-delay: 0.5s;
}

@keyframes pricingFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pricingFloatUp {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-stagger,
  .pricing-float {
    animation: none;
  }
}
</style>
