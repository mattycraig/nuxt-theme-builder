<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const errorData: Record<
  string,
  { statusCode: number; statusMessage: string; message: string; icon: string }
> = {
  "404": {
    statusCode: 404,
    statusMessage: "Page Not Found",
    message: "The page you're looking for doesn't exist or has been moved.",
    icon: "i-lucide-file-question",
  },
  "500": {
    statusCode: 500,
    statusMessage: "Internal Server Error",
    message:
      "Something went wrong on our end. Please try again later or contact support if the problem persists.",
    icon: "i-lucide-server-crash",
  },
  "403": {
    statusCode: 403,
    statusMessage: "Forbidden",
    message:
      "You don't have permission to access this resource. Please contact your administrator.",
    icon: "i-lucide-shield-ban",
  },
  "429": {
    statusCode: 429,
    statusMessage: "Too Many Requests",
    message:
      "You've sent too many requests in a short period. Please slow down and try again shortly.",
    icon: "i-lucide-timer",
  },
  "503": {
    statusCode: 503,
    statusMessage: "Service Unavailable",
    message:
      "The service is temporarily unavailable for maintenance. Please check back soon.",
    icon: "i-lucide-hard-hat",
  },
};

const tabItems: TabsItem[] = Object.entries(errorData).map(
  ([code, { statusMessage, icon }]) => ({
    label: code,
    icon,
    value: code,
    description: statusMessage,
  }),
);

const activeError = ref("404");

const currentError = computed(() => errorData[activeError.value]);

const helpLinks = [
  {
    icon: "i-lucide-book-open",
    label: "Documentation",
    description: "Browse our guides and API docs",
    color: "primary" as const,
  },
  {
    icon: "i-lucide-message-circle",
    label: "Community",
    description: "Get help from the community",
    color: "secondary" as const,
  },
  {
    icon: "i-lucide-life-buoy",
    label: "Support",
    description: "Open a support ticket",
    color: "success" as const,
  },
];
</script>

<template>
  <div class="min-h-[60vh] flex flex-col">
    <!-- Error code switcher using UTabs -->
    <div class="flex flex-col items-center gap-3 pt-8 pb-4 px-4">
      <UBadge
        label="Preview different error states"
        variant="subtle"
        color="neutral"
        size="sm"
        icon="i-lucide-bug"
      />
      <UTabs
        v-model="activeError"
        :items="tabItems"
        :content="false"
        variant="pill"
        color="primary"
        size="sm"
      />
    </div>

    <!-- UError component -->
    <div class="flex-1 flex items-center justify-center pb-8 px-4">
      <div class="w-full max-w-2xl">
        <UError
          :error="currentError"
          :clear="false"
          :ui="{
            root: 'min-h-0 py-8',
            statusCode: 'text-base font-semibold',
            statusMessage:
              'mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance',
            message: 'mt-4 text-base sm:text-lg text-balance max-w-md mx-auto',
            links: 'flex-col mt-4',
          }"
        >
          <!-- Custom links slot with our action buttons -->
          <template #links>
            <!-- Contextual hint per error type -->
            <div class="mt-6 text-left">
              <UAlert
                v-if="activeError === '404'"
                icon="i-lucide-info"
                color="info"
                variant="subtle"
                title="Tip"
                description="Double-check the URL for typos, or use the search feature to find what you're looking for."
              />
              <UAlert
                v-else-if="activeError === '500'"
                icon="i-lucide-alert-triangle"
                color="error"
                variant="subtle"
                title="What happened?"
                description="Our server encountered an unexpected condition. The team has been notified and is working on a fix."
              />
              <UAlert
                v-else-if="activeError === '403'"
                icon="i-lucide-shield-alert"
                color="warning"
                variant="subtle"
                title="Access Denied"
                description="Make sure you're logged in with the correct account, or request access from your administrator."
              />
              <UAlert
                v-else-if="activeError === '429'"
                icon="i-lucide-clock"
                color="warning"
                variant="subtle"
                title="Rate Limited"
                description="Wait a moment before retrying. If you need higher limits, consider upgrading your plan."
              />
              <UAlert
                v-else-if="activeError === '503'"
                icon="i-lucide-wrench"
                color="neutral"
                variant="subtle"
                title="Scheduled Maintenance"
                description="We're performing scheduled maintenance to improve our services. Check our status page for updates."
              />
            </div>
            <div
              class="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <UButton
                label="Go Home"
                icon="i-lucide-home"
                size="lg"
                color="primary"
              />
              <UButton
                label="Go Back"
                icon="i-lucide-arrow-left"
                size="lg"
                variant="outline"
                color="neutral"
              />
              <UButton
                label="Contact Support"
                icon="i-lucide-mail"
                size="lg"
                variant="ghost"
                color="neutral"
              />
            </div>
          </template>
        </UError>

        <!-- Additional help resources -->
        <USeparator class="my-6" />

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <UCard
            v-for="link in helpLinks"
            :key="link.label"
            class="text-center hover:ring-(--ui-primary)/40 transition-shadow"
            :ui="{ root: 'cursor-pointer' }"
          >
            <div class="space-y-2">
              <UIcon
                :name="link.icon"
                :class="`size-6 mx-auto text-(--ui-${link.color})`"
              />
              <p class="font-semibold text-sm text-(--ui-text-highlighted)">
                {{ link.label }}
              </p>
              <p class="text-xs text-(--ui-text-muted)">
                {{ link.description }}
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
