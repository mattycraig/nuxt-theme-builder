<script setup lang="ts">
const contactInfo = [
  {
    icon: "i-lucide-mail",
    label: "Email",
    value: "hello@themebuilder.dev",
    detail: "Typical response within 2 hours",
  },
  {
    icon: "i-lucide-phone",
    label: "Phone",
    value: "+1 (555) 123-4567",
    detail: "Mon–Fri, 9 AM – 6 PM PST",
  },
  {
    icon: "i-lucide-map-pin",
    label: "Office",
    value: "123 Design Street",
    detail: "San Francisco, CA 94102",
  },
];

const socials = [
  { icon: "i-lucide-twitter", label: "Twitter" },
  { icon: "i-lucide-github", label: "GitHub" },
  { icon: "i-lucide-linkedin", label: "LinkedIn" },
];
</script>

<template>
  <section class="relative isolate overflow-hidden px-6 py-20 sm:py-28">
    <!-- Dot grid background -->
    <div
      class="absolute inset-0 contact-dot-grid opacity-[0.04]"
      aria-hidden="true"
    />

    <!-- Dual glow spots -->
    <div
      class="pointer-events-none absolute top-1/4 -left-20 size-[20rem] rounded-full bg-(--ui-primary)/8 blur-[80px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-1/4 -right-20 size-[20rem] rounded-full bg-(--ui-secondary)/8 blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-14 space-y-4 dotgrid-stagger">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase"
        >
          Reach Out
        </p>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          Get in touch with us
        </h2>
        <p
          class="text-lg text-(--ui-text-muted) max-w-lg mx-auto leading-relaxed"
        >
          We're here to help and answer any question you might have.
        </p>
      </div>

      <!-- Floating contact panels -->
      <div class="grid sm:grid-cols-3 gap-5 mb-10">
        <div
          v-for="(item, i) in contactInfo"
          :key="item.label"
          class="dotgrid-stagger group relative rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/70 backdrop-blur-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-(--ui-primary)/5 hover:border-(--ui-primary)/30"
          :style="{ animationDelay: `${(i + 2) * 100}ms` }"
        >
          <div
            class="mx-auto mb-4 size-12 rounded-full bg-(--ui-primary)/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
          >
            <UIcon
              :name="item.icon"
              class="size-5 text-(--ui-primary)"
              aria-hidden="true"
            />
          </div>
          <p class="font-semibold text-(--ui-text-highlighted) mb-1">
            {{ item.label }}
          </p>
          <p class="text-sm text-(--ui-primary) font-medium mb-1">
            {{ item.value }}
          </p>
          <p class="text-xs text-(--ui-text-muted)">{{ item.detail }}</p>
        </div>
      </div>

      <!-- Social row -->
      <div
        class="dotgrid-stagger [animation-delay:600ms] flex items-center justify-center gap-3"
      >
        <span class="text-sm text-(--ui-text-muted)">Follow us:</span>
        <div
          v-for="s in socials"
          :key="s.label"
          class="size-10 rounded-full border border-(--ui-border)/50 bg-(--ui-bg)/70 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:border-(--ui-primary)/40 hover:bg-(--ui-primary)/10 cursor-pointer"
        >
          <UIcon
            :name="s.icon"
            class="size-4 text-(--ui-text-muted) hover:text-(--ui-primary)"
            :aria-label="s.label"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

.dotgrid-stagger {
  animation: dotgridFadeUp 0.6s ease-out both;
}

@keyframes dotgridFadeUp {
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
  .dotgrid-stagger {
    animation: none;
  }
}
</style>
