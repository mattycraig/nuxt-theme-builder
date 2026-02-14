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
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "What's this about?",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell us everything...",
  },
];

const info = [
  {
    icon: "i-lucide-mail",
    label: "Email",
    value: "hello@themebuilder.dev",
  },
  {
    icon: "i-lucide-map-pin",
    label: "Address",
    value: "123 Design Street, San Francisco, CA",
  },
  {
    icon: "i-lucide-clock",
    label: "Business Hours",
    value: "Mon–Fri, 9 AM – 6 PM PST",
  },
  {
    icon: "i-lucide-phone",
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden px-6 py-20 sm:py-28">
    <!-- Decorative gradient orbs -->
    <div
      class="pointer-events-none absolute -top-24 left-1/4 size-[36rem] rounded-full bg-(--ui-primary)/12 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-32 right-1/4 size-[24rem] rounded-full bg-(--ui-secondary)/8 blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Left: info column with staggered entrance -->
        <div class="contact-stagger space-y-8">
          <div>
            <p
              class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
            >
              Contact Us
            </p>
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4"
            >
              <span
                class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
              >
                Let's start
              </span>
              <span class="text-(--ui-text-highlighted)"> a conversation</span>
            </h2>
            <p class="text-lg text-(--ui-text-muted) max-w-md leading-relaxed">
              We'd love to hear about your project. Fill out the form or reach
              us through any of the channels below.
            </p>
          </div>

          <div class="space-y-5">
            <div
              v-for="(item, i) in info"
              :key="item.label"
              class="contact-stagger flex items-start gap-4 group"
              :style="{ animationDelay: `${(i + 2) * 100}ms` }"
            >
              <div
                class="size-10 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center shrink-0 group-hover:bg-(--ui-primary)/20 transition-colors duration-200"
              >
                <UIcon
                  :name="item.icon"
                  class="size-5 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p class="text-sm font-semibold text-(--ui-text-highlighted)">
                  {{ item.label }}
                </p>
                <p class="text-sm text-(--ui-text-muted)">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: form in elevated card -->
        <div class="contact-stagger [animation-delay:200ms]">
          <div
            class="rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-elevated) p-6 sm:p-8 shadow-xl"
          >
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
.contact-stagger {
  animation: contactFadeUp 0.7s ease-out both;
}

@keyframes contactFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-stagger {
    animation: none;
  }
}
</style>
