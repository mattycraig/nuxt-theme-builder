<script setup lang="ts">
const error404 = {
  statusCode: 404,
  statusMessage: "Page Not Found",
  message: "The page you're looking for doesn't exist or has been moved.",
};

const error500 = {
  statusCode: 500,
  statusMessage: "Internal Server Error",
  message:
    "Something went wrong on our end. Please try again later or contact support if the problem persists.",
};

const activeError = ref<"404" | "500" | "403">("404");

const error403 = {
  statusCode: 403,
  statusMessage: "Forbidden",
  message:
    "You don't have permission to access this resource. Please contact your administrator.",
};

const errors: Record<string, typeof error404> = {
  "404": error404,
  "500": error500,
  "403": error403,
};
</script>

<template>
  <div class="min-h-[60vh] flex flex-col">
    <!-- Switcher -->
    <div class="flex items-center justify-center gap-2 pt-8 pb-4">
      <UBadge
        label="Preview different error states:"
        variant="subtle"
        color="neutral"
        size="sm"
      />
      <UButton
        v-for="code in ['404', '500', '403']"
        :key="code"
        :label="code"
        size="sm"
        :variant="activeError === code ? 'solid' : 'outline'"
        :color="activeError === code ? 'primary' : 'neutral'"
        @click="activeError = code as '404' | '500' | '403'"
      />
    </div>

    <!-- Error display -->
    <div class="flex-1 flex items-center justify-center pb-12">
      <div class="text-center space-y-6 max-w-lg mx-auto px-6">
        <!-- Status code -->
        <p
          class="text-8xl sm:text-9xl font-black text-(--ui-primary) opacity-20"
        >
          {{ errors[activeError].statusCode }}
        </p>

        <!-- Status message -->
        <h1 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          {{ errors[activeError].statusMessage }}
        </h1>

        <!-- Description -->
        <p class="text-lg text-(--ui-text-muted) max-w-md mx-auto">
          {{ errors[activeError].message }}
        </p>

        <!-- Actions -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
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

        <!-- Additional help -->
        <USeparator class="my-6" />

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <UCard class="text-center">
            <div class="space-y-2">
              <UIcon
                name="i-lucide-book-open"
                class="size-6 text-(--ui-primary) mx-auto"
              />
              <p class="font-semibold text-sm">Documentation</p>
              <p class="text-xs text-(--ui-text-muted)">
                Browse our guides and API docs
              </p>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="space-y-2">
              <UIcon
                name="i-lucide-message-circle"
                class="size-6 text-(--ui-secondary) mx-auto"
              />
              <p class="font-semibold text-sm">Community</p>
              <p class="text-xs text-(--ui-text-muted)">
                Get help from the community
              </p>
            </div>
          </UCard>
          <UCard class="text-center">
            <div class="space-y-2">
              <UIcon
                name="i-lucide-life-buoy"
                class="size-6 text-(--ui-success) mx-auto"
              />
              <p class="font-semibold text-sm">Support</p>
              <p class="text-xs text-(--ui-text-muted)">
                Open a support ticket
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
