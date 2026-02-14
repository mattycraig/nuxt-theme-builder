<script setup lang="ts">
const links = [
  { label: "Features", to: "#" },
  { label: "Pricing", to: "#" },
  { label: "Enterprise", to: "#" },
];
</script>

<template>
  <header class="relative overflow-hidden bg-(--ui-primary)">
    <!-- Diagonal mesh pattern -->
    <div
      class="pointer-events-none absolute inset-0 header-mesh opacity-[0.06]"
      aria-hidden="true"
    />

    <!-- Top-right glow -->
    <div
      class="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-white/10 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Brand (inverted) -->
        <div class="flex items-center gap-2.5">
          <div
            class="size-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <UIcon
              name="i-lucide-palette"
              class="size-4 text-white"
              aria-hidden="true"
            />
          </div>
          <span class="font-bold text-white tracking-tight">
            ThemeBuilder
          </span>

          <!-- Live status -->
          <span
            class="hidden sm:inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs font-medium text-white/80"
          >
            <span
              class="size-1.5 rounded-full bg-green-400 header-pulse"
              aria-hidden="true"
            />
            Live
          </span>
        </div>

        <!-- Navigation (inverted) -->
        <nav aria-label="Main navigation">
          <ul class="hidden sm:flex items-center gap-1">
            <li v-for="link in links" :key="link.label">
              <a
                :href="link.to"
                class="px-3 py-1.5 text-sm font-medium text-white/70 rounded-lg transition-all duration-200 hover:text-white hover:bg-white/10"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Actions (inverted) -->
        <div class="flex items-center gap-2">
          <UButton
            label="Sign In"
            variant="link"
            size="sm"
            class="text-white/70 hover:text-white"
          />
          <UButton
            label="Get Started"
            color="neutral"
            size="sm"
            class="bg-white text-(--ui-primary) hover:bg-white/90 font-semibold"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-mesh {
  background-image:
    linear-gradient(
      30deg,
      #fff 12%,
      transparent 12.5%,
      transparent 87%,
      #fff 87.5%,
      #fff
    ),
    linear-gradient(
      150deg,
      #fff 12%,
      transparent 12.5%,
      transparent 87%,
      #fff 87.5%,
      #fff
    ),
    linear-gradient(
      30deg,
      #fff 12%,
      transparent 12.5%,
      transparent 87%,
      #fff 87.5%,
      #fff
    ),
    linear-gradient(
      150deg,
      #fff 12%,
      transparent 12.5%,
      transparent 87%,
      #fff 87.5%,
      #fff
    ),
    linear-gradient(
      60deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25.5%,
      transparent 75%,
      rgba(255, 255, 255, 0.15) 75%,
      rgba(255, 255, 255, 0.15)
    ),
    linear-gradient(
      60deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25.5%,
      transparent 75%,
      rgba(255, 255, 255, 0.15) 75%,
      rgba(255, 255, 255, 0.15)
    );
  background-size: 40px 70px;
  background-position:
    0 0,
    0 0,
    20px 35px,
    20px 35px,
    0 0,
    20px 35px;
}

.header-pulse {
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header-pulse {
    animation: none;
  }
}
</style>
