<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Dot-grid pattern -->
    <div
      class="absolute inset-0 ecom-store-grid opacity-[0.03]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <!-- Text -->
        <div>
          <div class="ecom-store-stagger">
            <p
              class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
            >
              Your Storefront
            </p>
          </div>
          <h2
            class="ecom-store-stagger [animation-delay:80ms] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5"
          >
            <span class="text-(--ui-text-highlighted)">Sell with </span>
            <span
              class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              confidence
            </span>
          </h2>
          <p
            class="ecom-store-stagger [animation-delay:160ms] text-lg text-(--ui-text-muted) leading-relaxed mb-8 max-w-lg"
          >
            A fully themed storefront with product cards, cart integration, and
            checkout flow — all matching your brand palette perfectly.
          </p>

          <!-- Mini stats -->
          <div
            class="ecom-store-stagger [animation-delay:240ms] grid grid-cols-3 gap-4 mb-8"
          >
            <div
              v-for="stat in [
                { value: '2.4k+', label: 'Products' },
                { value: '99.8%', label: 'Uptime' },
                { value: '< 1s', label: 'Load time' },
              ]"
              :key="stat.label"
              class="text-center"
            >
              <p
                class="text-xl font-bold bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
              >
                {{ stat.value }}
              </p>
              <p
                class="text-xs font-medium text-(--ui-text-muted) uppercase tracking-wide mt-1"
              >
                {{ stat.label }}
              </p>
            </div>
          </div>

          <div
            class="ecom-store-stagger [animation-delay:320ms] flex flex-wrap items-center gap-3"
          >
            <UButton
              label="Launch Store"
              icon="i-lucide-arrow-right"
              color="primary"
              size="xl"
              trailing
            />
            <UButton
              label="View Demo"
              variant="outline"
              color="neutral"
              size="xl"
            />
          </div>
        </div>

        <!-- Mock storefront card -->
        <div class="relative ecom-store-slide">
          <div
            class="rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-2xl overflow-hidden"
          >
            <!-- Window chrome -->
            <div
              class="flex items-center gap-2 px-4 py-3 border-b border-(--ui-border)"
            >
              <span
                class="size-3 rounded-full bg-red-400/80"
                aria-hidden="true"
              />
              <span
                class="size-3 rounded-full bg-yellow-400/80"
                aria-hidden="true"
              />
              <span
                class="size-3 rounded-full bg-green-400/80"
                aria-hidden="true"
              />
              <span
                class="ml-3 text-xs text-(--ui-text-muted) font-mono truncate"
              >
                mystore.com/products
              </span>
            </div>

            <!-- Mock storefront content -->
            <div class="p-5 space-y-4">
              <!-- Search bar mock -->
              <div
                class="flex items-center gap-2 rounded-lg border border-(--ui-border)/60 bg-(--ui-bg)/60 px-3 py-2"
              >
                <UIcon
                  name="i-lucide-search"
                  class="size-4 text-(--ui-text-muted)"
                  aria-hidden="true"
                />
                <div
                  class="h-2 w-24 rounded-full bg-(--ui-border)"
                  aria-hidden="true"
                />
                <div
                  class="ml-auto h-6 w-16 rounded-md bg-(--ui-primary)/15 flex items-center justify-center"
                >
                  <div
                    class="h-2 w-10 rounded-full bg-(--ui-primary)/40"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <!-- Mini product grid -->
              <div class="grid grid-cols-3 gap-2.5">
                <div
                  v-for="n in 3"
                  :key="n"
                  class="rounded-lg border border-(--ui-border)/50 bg-(--ui-bg)/50 overflow-hidden"
                >
                  <div
                    class="h-16 w-full"
                    :class="
                      n === 1
                        ? 'bg-(--ui-primary)/10'
                        : n === 2
                          ? 'bg-(--ui-secondary)/10'
                          : 'bg-(--ui-primary)/6'
                    "
                    aria-hidden="true"
                  />
                  <div class="p-2 space-y-1.5">
                    <div
                      class="h-2 w-full rounded-full bg-(--ui-border)"
                      aria-hidden="true"
                    />
                    <div
                      class="h-2 w-8 rounded-full bg-(--ui-primary)/30"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              <!-- Color swatch strip -->
              <div class="flex gap-1.5" aria-hidden="true">
                <div
                  class="flex-1 h-7 rounded-lg bg-(--ui-color-primary-600)"
                />
                <div
                  class="flex-1 h-7 rounded-lg bg-(--ui-color-primary-500)"
                />
                <div
                  class="flex-1 h-7 rounded-lg bg-(--ui-color-primary-400)"
                />
                <div
                  class="flex-1 h-7 rounded-lg bg-(--ui-color-primary-300)"
                />
                <div
                  class="flex-1 h-7 rounded-lg bg-(--ui-color-primary-200)"
                />
              </div>
            </div>
          </div>

          <!-- Floating order notification -->
          <div
            class="absolute -bottom-3 -left-3 ecom-store-float rounded-xl border border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur-sm shadow-lg px-4 py-2.5 flex items-center gap-2.5"
          >
            <UIcon
              name="i-lucide-package-check"
              class="size-5 text-green-500 shrink-0"
              aria-hidden="true"
            />
            <span class="text-sm font-medium text-(--ui-text-highlighted)">
              New order received!
            </span>
          </div>

          <!-- Floating revenue badge  -->
          <div
            class="absolute -top-3 -right-3 ecom-store-float [animation-delay:0.7s] rounded-xl border border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur-sm shadow-lg px-3 py-2 text-center"
          >
            <p
              class="text-xs font-semibold text-(--ui-text-muted) uppercase tracking-wide"
            >
              Revenue
            </p>
            <p
              class="text-lg font-bold bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              +24%
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecom-store-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

.ecom-store-stagger {
  animation: ecomStoreUp 0.7s ease-out both;
}

.ecom-store-slide {
  animation: ecomStoreSlide 0.8s ease-out both;
  animation-delay: 0.15s;
}

.ecom-store-float {
  animation: ecomStoreFloat 0.6s ease-out both;
  animation-delay: 0.5s;
}

@keyframes ecomStoreUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ecomStoreSlide {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes ecomStoreFloat {
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
  .ecom-store-stagger,
  .ecom-store-slide,
  .ecom-store-float {
    animation: none;
  }
}
</style>
