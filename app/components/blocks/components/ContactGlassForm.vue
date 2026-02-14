<script setup lang="ts">
const fields = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
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
    placeholder: "How can we help?",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden px-6 py-20 sm:py-28">
    <!-- Dot grid pattern -->
    <div
      class="absolute inset-0 contact-dot-grid opacity-[0.04]"
      aria-hidden="true"
    />

    <!-- Glow spot behind card -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[30rem] rounded-full bg-(--ui-primary)/10 blur-[100px]"
      aria-hidden="true"
    />

    <!-- Frosted glass card -->
    <div
      class="relative mx-auto max-w-xl rounded-3xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl p-8 sm:p-12 shadow-2xl contact-glass-enter"
    >
      <div class="text-center mb-8 space-y-3">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase"
        >
          Get In Touch
        </p>
        <h2
          class="text-3xl sm:text-4xl font-bold tracking-tight text-(--ui-text-highlighted) leading-[1.15]"
        >
          We'd love to hear from you
        </h2>
        <p class="text-(--ui-text-muted) max-w-md mx-auto leading-relaxed">
          Drop us a message and we'll get back to you within 24 hours.
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
  </section>
</template>

<style scoped>
.contact-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

.contact-glass-enter {
  animation: glassRise 0.7s ease-out both;
}

@keyframes glassRise {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-glass-enter {
    animation: none;
  }
}
</style>
