<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Atmospheric orbs -->
    <div
      class="pointer-events-none absolute -top-20 right-0 size-[28rem] rounded-full bg-(--ui-primary)/12 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-28 -left-20 size-[20rem] rounded-full bg-(--ui-secondary)/8 blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <!-- Text content -->
        <div>
          <div class="ecom-feat-stagger">
            <UBadge
              label="Deal of the Day"
              color="primary"
              variant="subtle"
              size="lg"
              class="mb-5"
            />
          </div>

          <h2
            class="ecom-feat-stagger [animation-delay:80ms] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5"
          >
            <span
              class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              Enterprise
            </span>
            <span class="text-(--ui-text-highlighted)"> Theme Kit</span>
          </h2>

          <p
            class="ecom-feat-stagger [animation-delay:160ms] text-lg text-(--ui-text-muted) leading-relaxed mb-8 max-w-lg"
          >
            Everything you need to build a production-grade application.
            Includes 100+ components, 12 page templates, and a comprehensive
            design system with Figma and code assets.
          </p>

          <!-- Price block -->
          <div
            class="ecom-feat-stagger [animation-delay:240ms] flex items-center gap-4 mb-8"
          >
            <span
              class="text-4xl sm:text-5xl font-black bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              $199
            </span>
            <div class="flex flex-col">
              <span class="text-lg text-(--ui-text-muted) line-through"
                >$349</span
              >
              <UBadge
                label="43% off"
                color="primary"
                variant="subtle"
                size="sm"
              />
            </div>
          </div>

          <div
            class="ecom-feat-stagger [animation-delay:320ms] flex flex-wrap items-center gap-3"
          >
            <UButton
              label="Buy Now"
              icon="i-lucide-shopping-cart"
              color="primary"
              size="xl"
              trailing
            />
            <UButton
              label="Compare Plans"
              variant="outline"
              color="neutral"
              size="xl"
            />
          </div>
        </div>

        <!-- Product image with floating elements -->
        <div class="relative ecom-feat-slide">
          <div
            class="overflow-hidden rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-elevated) shadow-2xl"
          >
            <img
              src="https://picsum.photos/seed/featured-product/800/600"
              alt="Enterprise Theme Kit"
              class="w-full h-auto object-cover"
              loading="lazy"
              width="800"
              height="600"
            >
          </div>

          <!-- Floating discount badge -->
          <div
            class="absolute -top-3 -right-3 ecom-feat-float rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur-sm shadow-lg px-4 py-3 text-center"
          >
            <p
              class="text-2xl font-black bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              43%
            </p>
            <p
              class="text-xs font-semibold text-(--ui-text-muted) uppercase tracking-wide"
            >
              off
            </p>
          </div>

          <!-- Floating social proof -->
          <div
            class="absolute -bottom-3 -left-3 ecom-feat-float [animation-delay:0.7s] rounded-xl border border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur-sm shadow-lg px-4 py-2.5 flex items-center gap-2.5"
          >
            <UIcon
              name="i-lucide-flame"
              class="size-5 text-orange-500 shrink-0"
              aria-hidden="true"
            />
            <span class="text-sm font-medium text-(--ui-text-highlighted)"
              >2,847 sold this week</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecom-feat-stagger {
  animation: ecomFeatUp 0.7s ease-out both;
}

.ecom-feat-slide {
  animation: ecomSlideIn 0.8s ease-out both;
  animation-delay: 0.15s;
}

.ecom-feat-float {
  animation: ecomFloatUp 0.6s ease-out both;
  animation-delay: 0.5s;
}

@keyframes ecomFeatUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ecomSlideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes ecomFloatUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ecom-feat-stagger,
  .ecom-feat-slide,
  .ecom-feat-float {
    animation: none;
  }
}
</style>
