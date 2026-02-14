<script setup lang="ts">
const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Your message...",
  },
];

const officeDetails = [
  {
    icon: "i-lucide-building-2",
    label: "Headquarters",
    value: "San Francisco, CA",
  },
  { icon: "i-lucide-clock", label: "Hours", value: "Mon–Fri, 9 AM – 6 PM" },
  { icon: "i-lucide-phone", label: "Phone", value: "+1 (555) 123-4567" },
];
</script>

<template>
  <section class="relative overflow-hidden px-6 py-20 sm:py-28">
    <div class="relative max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-0">
        <!-- Left: mock map card (inspired by HeroSplit mock UI) -->
        <div class="map-slide-in">
          <div
            class="rounded-2xl lg:rounded-r-none border border-(--ui-border) bg-(--ui-bg-elevated) shadow-2xl overflow-hidden h-full"
          >
            <!-- Window chrome bar -->
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
                maps — our-office
              </span>
            </div>

            <!-- Stylized map visualization -->
            <div
              class="relative p-6 sm:p-8 min-h-[320px] flex flex-col justify-between"
            >
              <!-- Grid pattern simulating map -->
              <div
                class="absolute inset-0 contact-map-grid opacity-[0.06]"
                aria-hidden="true"
              />

              <!-- Decorative "roads" -->
              <div
                class="absolute top-1/3 left-0 right-0 h-px bg-(--ui-border)"
                aria-hidden="true"
              />
              <div
                class="absolute top-2/3 left-0 right-0 h-px bg-(--ui-border)"
                aria-hidden="true"
              />
              <div
                class="absolute top-0 bottom-0 left-1/3 w-px bg-(--ui-border)"
                aria-hidden="true"
              />
              <div
                class="absolute top-0 bottom-0 left-2/3 w-px bg-(--ui-border)"
                aria-hidden="true"
              />

              <!-- Location pin -->
              <div class="relative flex-1 flex items-center justify-center">
                <div class="relative">
                  <div
                    class="absolute inset-0 size-16 rounded-full bg-(--ui-primary)/15 blur-xl animate-pulse"
                    aria-hidden="true"
                  />
                  <div
                    class="relative size-14 rounded-full bg-(--ui-primary)/10 border-2 border-(--ui-primary)/30 flex items-center justify-center"
                  >
                    <UIcon
                      name="i-lucide-map-pin"
                      class="size-7 text-(--ui-primary)"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              <!-- Office info strip -->
              <div class="relative space-y-3 pt-6">
                <div
                  v-for="detail in officeDetails"
                  :key="detail.label"
                  class="flex items-center gap-3"
                >
                  <UIcon
                    :name="detail.icon"
                    class="size-4 text-(--ui-primary) shrink-0"
                    aria-hidden="true"
                  />
                  <span class="text-sm text-(--ui-text-muted)">
                    <span class="font-semibold text-(--ui-text-highlighted)"
                      >{{ detail.label }}:</span
                    >
                    {{ detail.value }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: form card -->
        <div class="form-slide-in">
          <div
            class="rounded-2xl lg:rounded-l-none border border-(--ui-border) lg:border-l-0 bg-(--ui-bg) p-6 sm:p-8 h-full flex flex-col justify-center"
          >
            <div class="space-y-2 mb-8">
              <h2
                class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) tracking-tight"
              >
                Send us a message
              </h2>
              <p class="text-(--ui-text-muted)">
                We'll get back to you as soon as possible.
              </p>
            </div>

            <UAuthForm
              title=""
              :fields="fields"
              :submit="{
                label: 'Send Message',
                color: 'primary',
                icon: 'i-lucide-send',
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-map-grid {
  background-image:
    linear-gradient(currentColor 1px, transparent 1px),
    linear-gradient(90deg, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}

.map-slide-in {
  animation: slideInLeft 0.7s ease-out both;
}

.form-slide-in {
  animation: slideInRight 0.7s ease-out both;
  animation-delay: 0.15s;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .map-slide-in,
  .form-slide-in {
    animation: none;
  }
}
</style>
