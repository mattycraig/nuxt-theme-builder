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
  <section class="py-16 sm:py-24">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Get in touch
        </h2>
        <p class="text-lg text-(--ui-text-muted)">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>
      <UAuthForm
        title=""
        :fields="fields"
        :submit="{ label: 'Send Message', color: 'primary' }"
      />
    </div>
  </section>
</template>
