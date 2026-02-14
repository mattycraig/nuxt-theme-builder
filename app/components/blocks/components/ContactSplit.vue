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
    placeholder: "Your message...",
  },
];

const info = [
  { icon: "i-lucide-mail", label: "Email", value: "hello@themebuilder.dev" },
  {
    icon: "i-lucide-map-pin",
    label: "Address",
    value: "123 Design Street, San Francisco, CA",
  },
  { icon: "i-lucide-clock", label: "Hours", value: "Mon–Fri, 9 AM – 6 PM PST" },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12">
        <div>
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
          >
            Contact us
          </h2>
          <p class="text-lg text-(--ui-text-muted) mb-8">
            Fill out the form and we'll get back to you within 24 hours.
          </p>
          <div class="space-y-6">
            <div
              v-for="item in info"
              :key="item.label"
              class="flex items-start gap-3"
            >
              <UIcon
                :name="item.icon"
                class="size-5 text-(--ui-primary) mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p class="text-sm font-semibold text-(--ui-text-highlighted)">
                  {{ item.label }}
                </p>
                <p class="text-sm text-(--ui-text-muted)">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>
        <UPageCard>
          <UAuthForm
            title=""
            :fields="fields"
            :submit="{ label: 'Send Message', color: 'primary' }"
          />
        </UPageCard>
      </div>
    </div>
  </section>
</template>
