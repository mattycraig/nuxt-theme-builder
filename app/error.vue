<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const statusCode = computed(() => props.error?.statusCode ?? 500);

const errorMeta: Record<
  number,
  { message: string; alertTitle: string; alertDescription: string; alertIcon: string; alertColor: string }
> = {
  404: {
    message: "The page you're looking for doesn't exist or has been moved.",
    alertTitle: "Tip",
    alertDescription:
      "Double-check the URL for typos, or use the navigation to find what you're looking for.",
    alertIcon: "i-lucide-info",
    alertColor: "info",
  },
  403: {
    message:
      "You don't have permission to access this resource. Please contact your administrator.",
    alertTitle: "Access Denied",
    alertDescription:
      "Make sure you're logged in with the correct account, or request access from your administrator.",
    alertIcon: "i-lucide-shield-alert",
    alertColor: "warning",
  },
  429: {
    message:
      "You've sent too many requests in a short period. Please slow down and try again shortly.",
    alertTitle: "Rate Limited",
    alertDescription:
      "Wait a moment before retrying. If you need higher limits, consider upgrading your plan.",
    alertIcon: "i-lucide-clock",
    alertColor: "warning",
  },
  500: {
    message:
      "Something went wrong on our end. Please try again later or contact support if the problem persists.",
    alertTitle: "What happened?",
    alertDescription:
      "Our server encountered an unexpected condition. The team has been notified and is working on a fix.",
    alertIcon: "i-lucide-alert-triangle",
    alertColor: "error",
  },
  503: {
    message:
      "The service is temporarily unavailable for maintenance. Please check back soon.",
    alertTitle: "Service Unavailable",
    alertDescription:
      "We're performing maintenance to improve our services. Please check back shortly.",
    alertIcon: "i-lucide-wrench",
    alertColor: "neutral",
  },
};

const fallbackMeta = {
  message: "An unexpected error occurred. Please try again.",
  alertTitle: "Something went wrong",
  alertDescription: "If this problem persists, please contact support.",
  alertIcon: "i-lucide-alert-triangle",
  alertColor: "error",
};

const currentMeta = computed(
  () => errorMeta[statusCode.value] ?? fallbackMeta,
);

const currentError = computed(() => ({
  statusCode: statusCode.value,
  statusMessage:
    props.error?.statusMessage ?? currentMeta.value.message,
  message: currentMeta.value.message,
}));

function handleGoBack() {
  clearError();
  // Short delay so clearError propagates before navigation
  setTimeout(() => window.history.back(), 50);
}

useHead({
  title: computed(
    () =>
      `${statusCode.value} - ${props.error?.statusMessage ?? "Error"} - Nuxt UI Theme Builder`,
  ),
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-(--ui-bg)">
    <div class="flex-1 flex justify-center pb-8 px-4">
      <div class="w-full max-w-2xl my-auto">
        <div class="flex justify-center">
          <SharedAppLogo size="lg" />
        </div>

        <UError
          as="div"
          :error="currentError"
          :clear="false"
          :ui="{
            root: 'min-h-0 py-8',
            statusCode: 'text-base font-semibold',
            statusMessage:
              'mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance',
            message:
              'mt-4 text-base sm:text-lg text-balance max-w-md mx-auto',
            links: 'flex-col mt-4',
          }"
        >
          <template #links>
            <!-- Contextual hint for the error type -->
            <div class="mt-6 text-left">
              <UAlert
                :icon="currentMeta.alertIcon"
                :color="currentMeta.alertColor as any"
                variant="subtle"
                :title="currentMeta.alertTitle"
                :description="currentMeta.alertDescription"
              />
            </div>

            <div
              class="flex flex-wrap flex-row items-center justify-center gap-3"
            >
              <UButton
                label="Go Home"
                icon="i-lucide-home"
                size="lg"
                color="primary"
                to="/"
                @click="clearError()"
              />
              <UButton
                label="Go Back"
                icon="i-lucide-arrow-left"
                size="lg"
                variant="outline"
                color="neutral"
                @click="handleGoBack"
              />
              <UButton
                label="Contact Support"
                icon="i-lucide-mail"
                size="lg"
                variant="ghost"
                color="neutral"
                to="/contact"
                @click="clearError()"
              />
            </div>
          </template>
        </UError>


      </div>
    </div>
  </div>
</template>
